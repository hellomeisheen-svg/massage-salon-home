import re
import os

files = [
    "src/routes/banki.tsx",
    "src/routes/girudoterapiya.tsx",
    "src/routes/ketgut.tsx",
    "src/routes/klassicheskii-massazh.tsx",
    "src/routes/limfaticheskii-massazh.tsx",
    "src/routes/limfodrenazhnyi-massazh.tsx",
    "src/routes/vektornyi-massazh.tsx"
]

uniform_location = "Где находится кабинет и как записаться?"
uniform_location_answer = "Кабинет расположен в посёлке Трудовое. Принимаю по предварительной записи. Записаться можно через Max — я уточню удобное время и дам необходимые рекомендации по подготовке к вашему первому сеансу."

def update_faq(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Find the faq array
    match = re.search(r'faq: \[(.*?)\]', content, re.DOTALL)
    if not match:
        print(f"FAQ array not found in {file_path}")
        return
    
    faq_array = match.group(1)
    
    # Process items
    items = re.findall(r'\{ q: "(.*?)", a: "(.*?)" \}', faq_array)
    
    new_items = []
    
    # Extract needed questions
    q_location = None
    q_post_cold = None
    q_course = None
    others = []
    
    for q, a in items:
        clean_q = q.replace("\\u00A0", " ")
        if "Где находится" in clean_q or "как записаться" in clean_q:
            q_location = (q, uniform_location_answer)
        elif "после простуды" in clean_q:
            q_post_cold = (q, a)
        elif "Нужен ли курс" in clean_q:
            q_course = ("Нужен ли курс?", a)
        else:
            others.append((q, a))
            
    # Assemble: q_course, q_post_cold, q_location
    if q_course: new_items.append(q_course)
    if q_post_cold: new_items.append(q_post_cold)
    if q_location: new_items.append(q_location)
    new_items.extend(others)
    
    # Construct new faq string
    new_faq_array = "faq: ["
    for q, a in new_items:
        new_faq_array += f'\n    {{ q: "{q}", a: "{a}" }},'
    new_faq_array += "\n  ],"
    
    new_content = content.replace(f"faq: [{faq_array}]", new_faq_array)
    
    with open(file_path, 'w') as f:
        f.write(new_content)
    print(f"Updated {file_path}")

for f in files:
    update_faq(f)
