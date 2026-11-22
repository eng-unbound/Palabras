import json,csv,io
src=open('src/index.src.html',encoding='utf-8').read()
art=open('src/art.js',encoding='utf-8').read()
data=open('words.csv',encoding='utf-8').read()
rows=list(csv.reader(io.StringIO(data)))
assert all(len(r)==8 for r in rows), [r for r in rows if len(r)!=8]
print('words:',len(rows)-1,'topics:',len({r[0] for r in rows[1:]}))
out=src.replace('/*__ART__*/',art).replace('/*__CSV__*/',json.dumps(data,ensure_ascii=False))
open('index.html','w',encoding='utf-8').write(out)
print('size',len(out.encode()))
