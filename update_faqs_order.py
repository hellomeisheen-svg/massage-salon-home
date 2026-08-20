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

def reorder_faq(content):
    # Find the faq array content
    faq_match = re.search(r'const faq = \[(.*?)\];', content, re.DOTALL)
    if not faq_match:
        return content
    
    faq_items_str = faq_match.group(1)
    
    # Extract items manually to avoid issues with nested braces
    items = []
    depth = 0
    current_item = ""
    for char in faq_items_str:
        if char == '{':
            depth += 1
        current_item += char
        if char == '}':
            depth -= 1
            if depth == 0:
                items.append(current_item.strip())
                current_item = ""
        elif char == ',' and depth == 0:
            if current_item.strip():
                items.append(current_item.strip())
            current_item = ""

    # Specific questions to move to the end
    q1 = "Нужен ли курс?"
    q2_parts = ["Можно ли ставить", "Можно ли применять", "после простуды"]
    q3 = "Где находится кабинет и как записаться?"

    def is_q2(text):
        return any(p in text for p in q2_parts)

    mandatory_indices = []
    for i, item in enumerate(items):
        if q1 in item or is_q2(item) or q3 in item:
            mandatory_indices.append(i)
    
    # Sort indices to remove them from back to front
    mandatory_items = [items.pop(i) for i in sorted(mandatory_indices, reverse=True)]
    # Reverse mandatory items because they were popped in reverse order
    mandatory_items.reverse()
    
    # Order mandatory items as: Course, After Cold, Location
    course_item = next((item for item in mandatory_items if q1 in item), None)
    cold_item = next((item for item in mandatory_items if is_q2(item)), None)
    location_item = next((item for item in mandatory_items if q3 in item), None)
    
    ordered_mandatory = []
    if course_item: ordered_mandatory.append(course_item)
    if cold_item: ordered_mandatory.append(cold_item)
    if location_item: ordered_mandatory.append(location_item)
    
    # Combine back
    new_items = items + ordered_mandatory
    new_faq_str = "const faq = [\n  " + ",\n  ".join(new_items) + ",\n];"
    
    return content.replace(faq_match.group(0), new_faq_str)

def reorder_json_ld(content):
    # Find JSON-LD block
    json_ld_match = re.search(r'children: JSON\.stringify\(\{(.*?)\}\)', content, re.DOTALL)
    if not json_ld_match:
        return content
    
    full_match_text = json_ld_match.group(1)
    
    # Find the mainEntity array in FAQPage
    faq_page_match = re.search(r'"@type":\s*"FAQPage",.*?"mainEntity":\s*\[(.*?)\]', full_match_text, re.DOTALL)
    if not faq_page_match:
        return content
    
    items_str = faq_page_match.group(1)
    
    # Extract JSON items
    items = []
    depth = 0
    current_item = ""
    for char in items_str:
        if char == '{':
            depth += 1
        current_item += char
        if char == '}':
            depth -= 1
            if depth == 0:
                items.append(current_item.strip())
                current_item = ""
        elif char == ',' and depth == 0:
            if current_item.strip():
                items.append(current_item.strip())
            current_item = ""

    q1 = "Нужен ли курс?"
    q2_parts = ["Можно ли ставить", "Можно ли применять", "после простуды"]
    q3 = "Где находится кабинет и как записаться?"

    def is_q2(text):
        return any(p in text for p in q2_parts)

    mandatory_indices = []
    for i, item in enumerate(items):
        if q1 in item or is_q2(item) or q3 in item:
            mandatory_indices.append(i)
            
    mandatory_items = [items.pop(i) for i in sorted(mandatory_indices, reverse=True)]
    mandatory_items.reverse()
    
    course_item = next((item for item in mandatory_items if q1 in item), None)
    cold_item = next((item for item in mandatory_items if is_q2(item)), None)
    location_item = next((item for item in mandatory_items if q3 in item), None)
    
    ordered_mandatory = []
    if course_item: ordered_mandatory.append(course_item)
    if cold_item: ordered_mandatory.append(cold_item)
    if location_item: ordered_mandatory.append(location_item)
    
    new_items = items + ordered_mandatory
    # Try to detect indentation
    new_items_str = "\n                    " + ",\n                    ".join(new_items)
    
    new_faq_page_part = faq_page_match.group(0).replace(items_str, new_items_str)
    new_full_match_text = full_match_text.replace(faq_page_match.group(0), new_faq_page_part)
    
    return content.replace(full_match_text, new_full_match_text)

for file_path in files:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r') as f:
        content = f.read()
    
    content = reorder_faq(content)
    content = reorder_json_ld(content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"Updated {file_path}")

