"""올릴 때마다 '최신 번호'를 새로 찍습니다 (git commit 직전에 자동 실행).

- build.txt 에 새 번호를 적고
- 각 페이지 안의 번호(BUILD)와, 페이지가 불러오는 js·css 주소 뒤 ?b=번호 를 같은 값으로 바꿉니다.
- 페이지는 열릴 때와 다시 볼 때 build.txt 를 확인해, 번호가 다르면 스스로 최신 화면으로 다시 엽니다.
  (그래서 Ctrl+F5 없이도 올린 내용이 바로 보입니다)
"""
import datetime, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ['index.html', 'v2/index.html', 'r2/index.html', 'branch.html', 'branches.html']
BUILD = datetime.datetime.now().strftime('%Y%m%d%H%M%S')

def checker(build):
    return ('<script>/* 최신 확인: 올린 뒤 브라우저가 옛 화면을 보여 주면 스스로 최신으로 다시 엽니다 */'
            '(function(){var B="' + build + '",p=location.protocol;if(p!=="http:"&&p!=="https:")return;'
            r'var R=(/\/(v2|r2)\//.test(location.pathname)?"../":"")+"build.txt";'
            'function chk(){if(!window.fetch)return;fetch(R+"?t="+Date.now(),{cache:"no-store"})'
            '.then(function(r){return r.ok?r.text():""}).then(function(t){t=(t||"").trim();'
            'if(!/^\\d{14}$/.test(t)||t<=B)return;var q=new URLSearchParams(location.search);if(q.get("b")===t)return;'
            'q.set("b",t);location.replace(location.pathname+"?"+q.toString()+location.hash);}).catch(function(){});}'
            'chk();document.addEventListener("visibilitychange",function(){if(!document.hidden)chk();});})();</script>')

CHECK_RE = re.compile(r'<script>/\* 최신 확인:.*?</script>', re.S)
ASSET_RE = re.compile(r'((?:src|href)="(?:\.\./)?(?:js|css)/[^"?]+\.(?:js|css))(?:\?b=\d+)?"')
CS = '<meta charset="utf-8">'

def stamp(path):
    s = open(path, encoding='utf-8').read()
    new = checker(BUILD)
    if CHECK_RE.search(s):
        s = CHECK_RE.sub(lambda m: new, s, count=1)
    else:
        assert s.count(CS) == 1, path
        s = s.replace(CS, CS + '\n' + new, 1)
    s = ASSET_RE.sub(lambda m: m.group(1) + '?b=' + BUILD + '"', s)
    open(path, 'w', encoding='utf-8', newline='').write(s)

for p in PAGES:
    stamp(os.path.join(ROOT, p))
open(os.path.join(ROOT, 'build.txt'), 'w', encoding='utf-8', newline='\n').write(BUILD + '\n')
print('build', BUILD)
