import os
import json
import re

# Answers for each service
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
    if not os.path.exists(filepath):
        print(f"File {filepath} not found")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    answer = ANSWERS.get(filename)
    if not answer:
        print(f"No answer for {filename}")
        return

    # 1. Update JSON-LD mainEntity
    # We want to insert it at the beginning of the mainEntity array.
    # mainEntity: [
    #   { ... }
    # ]
    json_ld_entry = {
        "@type": "Question",
        "name": "Какой результат после первого сеанса?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": answer
        }
    }
    json_ld_str = json.dumps(json_ld_entry, ensure_ascii=False)
    
    # Try to find existing question and move/update it, or insert new one
    if "Какой результат после первого сеанса?" in content:
        # Remove existing one first to ensure it's at the top
        # This is tricky with regex, let's try to just find the array and prepend
        pass

    # Simplified approach: replace the first occurrence of a question object in mainEntity
    # Or just look for mainEntity: [ and prepend
    content = re.sub(r'(mainEntity":\s*\[\s*)', r'\1' + json_ld_str + ",", content)

    # 2. Update faq constant
    faq_entry = f'{{ q: "Какой результат после первого сеанса?", a: "{answer}" }},'
    
    # Find the faq array and prepend
    # faq: [
    #   { ... }
    # ]
    content = re.sub(r'(faq:\s*\[\s*)', r'\1' + faq_entry + "\n    ", content)

    # Cleanup: remove duplicates if they exist
    # (Matches duplicate questions in the same array)
    # This is a bit risky but we can try to find identical 'q' values
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filename}")

for filename in ANSWERS.keys():
    update_file(filename)
