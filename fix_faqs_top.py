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

    # Remove existing instances of the question first
    # 1. Remove from JSON-LD
    # Need to match the whole object { "@type": "Question", "name": "Какой результат после первого сеанса?", ... }
    # This regex is a bit greedy but should work for the standard structure we have
    content = re.sub(r'\{\s*"@type":\s*"Question",\s*"?name"?:\s*"Какой результат после первого сеанса\?",.*?\}(?:,\s*)?', '', content, flags=re.DOTALL)
    
    # 2. Remove from faq constant
    content = re.sub(r'\{\s*q:\s*"Какой результат после первого сеанса\?",\s*a:.*?\}(?:,\s*)?', '', content, flags=re.DOTALL)

    # Now insert at the top of arrays
    # JSON-LD
    json_ld_entry = '{\n                  "@type": "Question",\n                  "name": "Какой результат после первого сеанса?",\n                  "acceptedAnswer": {\n                    "@type": "Answer",\n                    "text": "' + ans + '"\n                  }\n                }'
    content = re.sub(r'(mainEntity":\s*\[)', r'\1\n                ' + json_ld_entry + ',', content)

    # faq array
    faq_entry = '{ q: "Какой результат после первого сеанса?", a: "' + ans + '" },'
    content = re.sub(r'(faq:\s*\[)', r'\1\n    ' + faq_entry, content)
    
    # Cleanup trailing commas in JSON-LD if any (just in case)
    content = content.replace(',]', ']')
    content = content.replace(', }', ' }')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for fn in ANSWERS.keys():
    update_file(fn)
