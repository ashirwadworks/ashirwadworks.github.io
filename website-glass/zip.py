# Packs ./site into ashirwad-works-site.zip with web-style (forward slash) paths.  Run: python zip.py
import zipfile, os
here = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(here, 'ashirwad-works-site.zip')
site = os.path.join(here, 'site')
n = 0
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    for r, d, f in os.walk(site):
        for x in f:
            p = os.path.join(r, x)
            z.write(p, os.path.relpath(p, site).replace(os.sep, '/')); n += 1
names = zipfile.ZipFile(out).namelist()
print(n, 'files,', os.path.getsize(out) // 1024, 'KB, backslash paths:', any(chr(92) in x for x in names), [x for x in names if x in ('assets/main.js', 'assets/style.css', '_headers', 'index.html')])
