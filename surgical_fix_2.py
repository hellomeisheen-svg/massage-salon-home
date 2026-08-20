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
        content = f.read()

    ans = ANSWERS[filename]

    # JSON-LD cleanup
    # Remove any broken entries like " }," at the start of mainEntity
    content = re.sub(r'mainEntity":\s*\[\s*\},', 'mainEntity": [', content)
    
    # FAQ constant cleanup
    # Remove any broken entries at the start
    content = re.sub(r'faq:\s*\[\s*\},', 'faq: [', content)

    # Re-verify Result is first
    # 1. JSON-LD
    def json_ld_replacer(match):
        prefix = match.group(1)
        items_str = match.group(2)
        
        # Clean up items_str
        items_str = re.sub(r'^\s*\},', '', items_str).strip()
        
        items = re.findall(r'\{\s*"@type":\s*"Question",.*?\}(?=\s*(?:,|$))', items_str, re.DOTALL)
        
        # Unique by question name
        seen = set()
        unique_items = []
        for item in items:
            name_match = re.search(r'"name":\s*"(.*?)"', item)
            if name_match:
                name = name_match.group(1)
                if name not in seen:
                    unique_items.append(item)
                    seen.add(name)

        new_item = '{\n                  "@type": "Question",\n                  "name": "Какой результат после первого сеанса?",\n                  "acceptedAnswer": {\n                    "@type": "Answer",\n                    "text": "' + ans + '"\n                  }\n                }'
        
        # Filter out existing Result
        unique_items = [i for i in unique_items if "Какой результат после первого сеанса?" not in i]
        
        final = [new_item] + unique_items
        return prefix + "\n                " + ",\n                ".join(final) + " ]"

    content = re.sub(r'(mainEntity":\s*\[)(.*?)(\s*\])', json_ld_replacer, content, flags=re.DOTALL)

    # 2. FAQ Const
    def faq_replacer(match):
        prefix = match.group(1)
        items_str = match.group(2)
        
        items_str = re.sub(r'^\s*\},', '', items_str).strip()
        items = re.findall(r'\{\s*q:\s*".*?",\s*a:\s*".*?"\s*\}', items_str, re.DOTALL)
        
        seen = set()
        unique_items = []
        for item in items:
            q_match = re.search(r'q:\s*"(.*?)"', item)
            if q_match:
                q = q_match.group(1).replace(r'\u00A0', ' ')
                if q not in seen:
                    unique_items.append(item)
                    seen.add(q)

        new_item = '{ q: "Какой результат после первого сеанса?", a: "' + ans + '" }'
        unique_items = [i for i in unique_items if "Какой результат после первого сеанса?" not in i]
        
        final = [new_item] + unique_items
        return prefix + "\n    " + ",\n    ".join(final) + " ]"

    content = re.sub(r'(faq:\s*\[)(.*?)(\s*\])', faq_replacer, content, flags=re.DOTALL)

    # Final syntax pass for the common issue in girudoterapiya
    content = re.sub(r'\}\s*\}\s*\}\s*\}\s*\}\s*\}\s*\)\s*\}\s*\}\s*\)', '} }] }) }] })', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for fn in ANSWERS.keys():
    fix_file(fn)
    print(f"Fixed {fn}")
