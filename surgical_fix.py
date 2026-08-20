import os
import re

ANSWERS = {
    "banki.tsx": "Большинство отмечают чувство лёгкости и уменьшение мышечного напряжения уже после первого посещения. Вакуумное воздействие мягко прогревает ткани и помогает разгрузить зоны, которые больше всего страдают от статичной нагрузки.",
    "girudoterapiya.tsx": "Многие отмечают облегчение уже в первые сутки: снижается мышечное напряжение, улучшается сон и общее самочувствие. Эффект от гирудотерапии часто нарастает постепенно в течение нескольких дней.",
    "ketgut.tsx": "Многие отмечают внутреннее спокойствие и снижение уровня стресса, а также более глубокое чувство насыщения. В первые дни может уходить лишняя жидкость, что даёт ощущение лёгкости в теле и уменьшение отёков.",
    "klassicheskii-massazh.tsx": "Уже после первого сеанса заметно снижается общее мышечное напряжение, уходит чувство усталости и возвращается бодрость. Тело становится более податливым, а движения — свободными и комфортными.",
    "limfaticheskii-massazh.tsx": "Вы почувствуете заметную лёгкость в теле и уменьшение чувства тяжести в ногах. Мягкий ручной лимфодренаж помогает тканям разгрузиться, что часто сопровождается улучшением настроения и приливом сил.",
    "limfodrenazhnyi-massazh.tsx": "Основной результат — ощущение глубокой лёгкости и «разгрузки» всего тела. Уходит чувство распирания в тканях, движения становятся свободнее, а общее самочувствие значительно улучшается уже к концу сеанса.",
    "vektornyi-massazh.tsx": "Обычно появляется приятная усталость и лёгкость. Точная работа по анатомическим линиям помогает освободить глубокие зажимы, которые могли копиться годами, возвращая телу естественную свободу движений."
}

def fix_file(filename):
    filepath = os.path.join("src/routes", filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    ans = ANSWERS[filename]
    new_lines = []
    in_json_ld_faq = False
    in_faq_const = False
    json_ld_faq_start_idx = -1
    faq_const_start_idx = -1
    
    # 1. First pass: Find the arrays
    for i, line in enumerate(lines):
        if '"@type": "FAQPage"' in line or "'@type': 'FAQPage'" in line:
            in_json_ld_faq = True
        if in_json_ld_faq and 'mainEntity": [' in line:
            json_ld_faq_start_idx = i
            in_json_ld_faq = False
        
        if 'faq: [' in line:
            faq_const_start_idx = i

    # 2. Reconstruct the file
    # We'll just read the whole thing and do targeted string replacements for the arrays
    content = "".join(lines)
    
    # Surgical replacement of JSON-LD FAQ items
    # We look for the mainEntity array and replace its content
    # pattern: mainEntity": [ (anything) ]
    def json_ld_replacer(match):
        prefix = match.group(1)
        items_str = match.group(2)
        # Extract existing items, excluding "Result" if it exists
        # This is hard with regex, so let's just use a set of rules
        items = re.findall(r'\{\s*"@type":\s*"Question",.*?\}(?=\s*(?:,|$))', items_str, re.DOTALL)
        
        # Filter out existing "Result" question
        items = [item for item in items if "Какой результат после первого сеанса?" not in item]
        
        # New "Result" item
        new_item = '{\n                  "@type": "Question",\n                  "name": "Какой результат после первого сеанса?",\n                  "acceptedAnswer": {\n                    "@type": "Answer",\n                    "text": "' + ans + '"\n                  }\n                }'
        
        # Put result first
        final_items = [new_item] + items
        return prefix + "\n                " + ",\n                ".join(final_items) + " ]"

    content = re.sub(r'(mainEntity":\s*\[)(.*?)(\s*\])', json_ld_replacer, content, flags=re.DOTALL)

    # Surgical replacement of faq constant items
    def faq_replacer(match):
        prefix = match.group(1)
        items_str = match.group(2)
        items = re.findall(r'\{\s*q:\s*".*?",\s*a:\s*".*?"\s*\}', items_str, re.DOTALL)
        
        # Filter out existing "Result" question
        items = [item for item in items if "Какой результат после первого сеанса?" not in item]
        
        # New "Result" item
        new_item = '{ q: "Какой результат после первого сеанса?", a: "' + ans + '" }'
        
        final_items = [new_item] + items
        return prefix + "\n    " + ",\n    ".join(final_items) + " ]"

    content = re.sub(r'(faq:\s*\[)(.*?)(\s*\])', faq_replacer, content, flags=re.DOTALL)

    # Cleanup potential syntax errors
    content = re.sub(r',+', ',', content)
    content = re.sub(r'\[\s*,', '[', content)
    content = re.sub(r',\s*\]', ' ]', content)
    
    # Fix the specific broken closing tags if they exist
    # (The previous script might have left some)
    content = re.sub(r'\}\s*\}\s*\}\s*\}\s*\}\s*\)\s*\}\s*\}\s*\)', '} }] }) }] })', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for fn in ANSWERS.keys():
    try:
        fix_file(fn)
        print(f"Fixed {fn}")
    except Exception as e:
        print(f"Error fixing {fn}: {e}")
