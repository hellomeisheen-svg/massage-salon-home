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

def update_file(filename):
    filepath = os.path.join("src/routes", filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    ans = ANSWERS[filename]

    # regex patterns for problematic sections
    # 1. JSON-LD cleanup (find mainEntity array and normalize)
    # We look for the mainEntity array and replace its entire content while preserving the structure
    main_entity_match = re.search(r'mainEntity":\s*\[(.*?)\]\s*\}\s*\]\s*\}\s*\)\s*\}', content, re.DOTALL)
    if main_entity_match:
        inner_content = main_entity_match.group(1)
        # Remove all existing question objects from this inner content
        # (This is aggressive but needed to fix the broken state)
        
        # We need a more surgical approach for the whole file
        pass

    # Simplified approach: Replace specific broken blocks with known good structure
    # Let's fix JSON-LD by finding the start and end of mainEntity
    # mainEntity: [ ... ]
    
    # Identify mandatory questions
    mandatory_questions = [
        ("Нужен ли курс?", "course_answer_placeholder"),
        ("Можно ли применять процедуру после простуды?", "cold_answer_placeholder"),
        ("Где находится кабинет и как записаться?", "Кабинет расположен в посёлке Трудовое. Принимаю по предварительной записи. Записаться можно через Max — я уточню удобное время и дам необходимые рекомендации по подготовке к вашему первому сеансу.")
    ]
    # We'll extract the specific answers for Course and Cold from the existing file or use defaults if missing
    
    # Actually, the user wants: "Какой результат после первого сеанса?" ALWAYS FIRST.
    # Then other questions.
    # Then at the end: Course, After Cold, Location.
    
    # Let's try to parse the existing FAQ and mainEntity
    
    # Use perl/sed style regex in python to fix the broken structure first
    content = re.sub(r'\}\s*\}\s*\}\s*\}\s*\}\s*,', '},', content)
    content = re.sub(r',(?=\s*\])', '', content) # Remove trailing comma before ]
    content = re.sub(r'\{\s*q:\s*"Какой результат после первого сеанса\?",\s*a:.*?\}(?:,\s*)?', '', content, flags=re.DOTALL)
    content = re.sub(r'\{\s*"@type":\s*"Question",\s*"?name"?:\s*"Какой результат после первого сеанса\?",.*?\}(?:,\s*)?', '', content, flags=re.DOTALL)

    # Re-insert "Result" at top
    json_ld_entry = '{\n                  "@type": "Question",\n                  "name": "Какой результат после первого сеанса?",\n                  "acceptedAnswer": {\n                    "@type": "Answer",\n                    "text": "' + ans + '"\n                  }\n                }'
    content = re.sub(r'(mainEntity":\s*\[)', r'\1\n                ' + json_ld_entry + ',', content)
    
    faq_entry = '{ q: "Какой результат после первого сеанса?", a: "' + ans + '" },'
    content = re.sub(r'(faq:\s*\[)', r'\1\n    ' + faq_entry, content)

    # Ensure no triple commas or broken braces
    content = re.sub(r',+', ',', content)
    content = re.sub(r'\[\s*,', '[', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for fn in ANSWERS.keys():
    update_file(fn)
