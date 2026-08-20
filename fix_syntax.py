import os
import re

def fix_syntax_girudoterapiya():
    filepath = "src/routes/girudoterapiya.tsx"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The file has a broken mainEntity start
    # mainEntity: [ },
    content = content.replace('mainEntity: [\n                },', 'mainEntity: [')
    content = content.replace('mainEntity: [ },', 'mainEntity: [')
    
    # Fix the closing braces if they are redundant or missing
    # Looking at the code--view output:
    # 155: ... first сеансу." } }] }] }) }] }),
    # 156:   component: GirudoterapiyaPage });
    
    # Let's count the structure:
    # createFileRoute(...)({
    #   head: ...
    #   loader: ...
    #   component: ...
    # })
    
    # The head() has:
    # head: () => ({
    #   meta: [...],
    #   script: [{
    #     type: 'application/ld+json',
    #     children: JSON.stringify({
    #       '@context': '...',
    #       '@graph': [
    #         { '@type': 'MedicalBusiness', ... },
    #         { '@type': 'FAQPage', mainEntity: [...] }
    #       ]
    #     })
    #   }]
    # })
    
    # So the closing should be:
    # ] } ] }) }] })
    
    # Re-apply a known good tail for the head section
    # We find the end of the location answer and fix from there
    loc_ans = "дам необходимые рекомендации по подготовке к вашему первому сеансу."
    pattern = re.escape(loc_ans) + r'.*?component: GirudoterapiyaPage \}\);'
    
    fixed_tail = loc_ans + '" } }] }] }) }] }),\n  component: GirudoterapiyaPage });'
    content = re.sub(pattern, fixed_tail, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_syntax_girudoterapiya()
print("Fixed girudoterapiya syntax")
