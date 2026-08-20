import os
import re

files = [
    "src/routes/banki.tsx",
    "src/routes/girudoterapiya.tsx",
    "src/routes/ketgut.tsx",
    "src/routes/klassicheskii-massazh.tsx",
    "src/routes/limfaticheskii-massazh.tsx",
    "src/routes/limfodrenazhnyi-massazh.tsx",
    "src/routes/vektornyi-massazh.tsx"
]

def clean_and_reorder_list(items, mandatory_keywords):
    # Remove empty or whitespace items
    items = [i.strip() for i in items if i.strip()]
    
    mandatory = []
    others = []
    
    # Identify mandatory items based on keywords in order
    # Course, Cold, Location
    course_item = None
    cold_item = None
    location_item = None
    
    for item in items:
        is_man = False
        if "Нужен ли курс?" in item:
            course_item = item
            is_man = True
        elif any(k in item for k in ["после простуды", "Можно ли ставить", "Можно ли применять"]):
            cold_item = item
            is_man = True
        elif "Где находится кабинет и как записаться?" in item:
            location_item = item
            is_man = True
        
        if not is_man:
            others.append(item)
            
    res = others
    if course_item: res.append(course_item)
    if cold_item: res.append(cold_item)
    if location_item: res.append(location_item)
    return res

def process_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Fix faq array
    faq_match = re.search(r'const faq = \[(.*?)\];', content, re.DOTALL)
    if faq_match:
        faq_items_str = faq_match.group(1)
        items = []
        depth = 0
        current = ""
        for char in faq_items_str:
            if char == '{': depth += 1
            current += char
            if char == '}':
                depth -= 1
                if depth == 0:
                    items.append(current.strip())
                    current = ""
            elif char == ',' and depth == 0:
                if current.strip(): items.append(current.strip())
                current = ""
        
        new_items = clean_and_reorder_list(items, [])
        new_faq_str = "const faq = [\n  " + ",\n  ".join(new_items) + ",\n];"
        content = content.replace(faq_match.group(0), new_faq_str)

    # Fix content.faq if exists
    content_faq_match = re.search(r'faq: \[(.*?)\](,?)\s*(\},|\s*\})', content, re.DOTALL)
    if content_faq_match:
        faq_items_str = content_faq_match.group(1)
        items = []
        depth = 0
        current = ""
        for char in faq_items_str:
            if char == '{': depth += 1
            current += char
            if char == '}':
                depth -= 1
                if depth == 0:
                    items.append(current.strip())
                    current = ""
            elif char == ',' and depth == 0:
                if current.strip(): items.append(current.strip())
                current = ""
        
        new_items = clean_and_reorder_list(items, [])
        new_faq_str = "faq: [\n    " + ",\n    ".join(new_items) + ",\n  ]"
        content = content.replace(content_faq_match.group(0), new_faq_str + content_faq_match.group(2) + content_faq_match.group(3))

    # Fix JSON-LD
    json_ld_match = re.search(r'children: JSON\.stringify\(\{(.*?)\}\)', content, re.DOTALL)
    if json_ld_match:
        full_json_text = json_ld_match.group(1)
        faq_page_match = re.search(r'"@type":\s*"FAQPage",.*?"mainEntity":\s*\[(.*?)\]', full_json_text, re.DOTALL)
        if faq_page_match:
            items_str = faq_page_match.group(1)
            items = []
            depth = 0
            current = ""
            for char in items_str:
                if char == '{': depth += 1
                current += char
                if char == '}':
                    depth -= 1
                    if depth == 0:
                        items.append(current.strip())
                        current = ""
                elif char == ',' and depth == 0:
                    if current.strip(): items.append(current.strip())
                    current = ""
            
            new_items = clean_and_reorder_list(items, [])
            new_items_str = "\n                    " + ",\n                    ".join(new_items)
            
            new_faq_page_part = faq_page_match.group(0).replace(items_str, new_items_str)
            new_full_json_text = full_json_text.replace(faq_page_match.group(0), new_faq_page_part)
            content = content.replace(full_json_text, new_full_json_text)

    with open(file_path, 'w') as f:
        f.write(content)

for f in files:
    if os.path.exists(f):
        process_file(f)
        print(f"Fixed {f}")

