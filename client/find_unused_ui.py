import os
import re

ui_dir = "src/components/ui"
src_dir = "src"
ui_files = set(f for f in os.listdir(ui_dir) if f.endswith(('.ts', '.tsx')))

used_files = set()
for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.ts', '.tsx')):
            with open(os.path.join(root, f), 'r', encoding='utf-8') as file:
                content = file.read()
                # matches @/components/ui/NAME or ./ui/NAME or ../ui/NAME
                matches = re.findall(r'from\s+["\'](?:@/components/ui/|.*?/ui/)([^"\']+)["\']', content)
                for m in matches:
                    used_files.add(m + '.tsx')
                    used_files.add(m + '.ts')

unused = ui_files - used_files
print("Unused UI Components:")
for u in sorted(unused):
    print(u)
