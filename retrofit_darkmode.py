import os
import re

directories = [
    'src/app/(public)',
    'src/components/shared',
    'src/components/sections',
    'src/components/ui'
]

replacements = {
    r'\bbg-white\b': 'bg-white dark:bg-slate-950',
    r'\bbg-slate-50\b': 'bg-slate-50 dark:bg-slate-900',
    r'\bbg-slate-100\b': 'bg-slate-100 dark:bg-slate-800',
    r'\btext-slate-900\b': 'text-slate-900 dark:text-white',
    r'\btext-slate-800\b': 'text-slate-800 dark:text-slate-200',
    r'\btext-slate-700\b': 'text-slate-700 dark:text-slate-300',
    r'\btext-slate-600\b': 'text-slate-600 dark:text-slate-400',
    r'\btext-slate-500\b': 'text-slate-500 dark:text-slate-400',
    r'\bborder-slate-100\b': 'border-slate-100 dark:border-slate-800',
    r'\bborder-slate-200\b': 'border-slate-200 dark:border-slate-700',
    r'\bhover:bg-slate-50\b': 'hover:bg-slate-50 dark:hover:bg-slate-800',
    r'\bhover:bg-slate-100\b': 'hover:bg-slate-100 dark:hover:bg-slate-800',
}

for d in directories:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original = content
                for pattern, replacement in replacements.items():
                    # Only replace if the replacement isn't already there
                    # A bit tricky with regex, we can just do simple replace 
                    # and then fix duplicates.
                    
                    # Instead of regex search, let's just do text replace 
                    # but carefully avoid duplicating.
                    content = re.sub(pattern, lambda m: m.group(0) if 'dark:' in content[m.start()-10:m.end()+25] else replacement, content)

                # Fix potential duplicates like `dark:bg-slate-950 dark:bg-slate-950`
                content = content.replace('bg-white dark:bg-slate-950 dark:bg-slate-950', 'bg-white dark:bg-slate-950')
                content = content.replace('text-slate-900 dark:text-white dark:text-white', 'text-slate-900 dark:text-white')
                
                if content != original:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated {path}")
print("Done")
