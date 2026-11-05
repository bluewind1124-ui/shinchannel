/* 발표 모드 (1탄 · 2탄 · CIS용 공용): 홈페이지를 1920x1080 장표로 나눠 PPT처럼 넘깁니다 (reveal.js)
   시작: 왼쪽 아래 「발표」 버튼 또는 P 키 → 같은 페이지가 발표 모드(?deck=1)로 다시 열림
   다음: 클릭 · 스페이스 · → · ↓ · PageDown (발표 리모컨)    이전: 오른쪽 클릭 · ← · ↑ · PageUp
   F: 전체 화면 · Esc/O: 전체 장 보기 · B 또는 .: 화면 가리기 · Home/End: 처음/끝 · Q 또는 「발표 끝내기」: 홈페이지로
   - 화면보다 작은 장은 화면에 차도록 키우고, 넘치는 장은 그 장만 줄입니다.
   - 긴 구간은 덩어리(카드·표·그림) 단위로 나누고, 덩어리 하나가 너무 클 때만 줄 단위로 나눕니다. */
(function(){
  if (window.__present) return; window.__present = true;
  var main = document.querySelector('main'); if (!main) return;
  var root = document.documentElement;
  var Q = location.search;
  var DECK = /[?&]deck=1(&|$)/.test(Q) || (window.SC_DECK === 1 && !/[?&]deck=0(&|$)/.test(Q));
  function urlFor(on){
    var q = new URLSearchParams(location.search);
    if (on) q.set('deck', '1'); else if (window.SC_DECK === 1) q.set('deck', '0'); else q.delete('deck');
    var s = q.toString(); return location.pathname + (s ? '?' + s : '');
  }
  var typing = function(t){ return t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable); };
  var introOpen = function(){ var it = document.querySelector('.intro'); if (!it || !it.isConnected) return false; var c = getComputedStyle(it); return c.display !== 'none' && c.visibility !== 'hidden' && c.opacity !== '0'; };

  /* ───────── 일반 화면: 「발표」 버튼 ───────── */
  if (!DECK) {
    var css0 = document.createElement('style');
    css0.textContent =
      '.pm-btn{position:fixed;left:20px;bottom:76px;z-index:65;display:flex;align-items:center;gap:8px;height:44px;padding:0 16px 0 12px;border-radius:999px;border:1px solid rgba(205,155,52,.75);background:rgba(15,35,64,.92);color:#E6CF97;font:700 14px "IBM Plex Sans KR",sans-serif;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.25)}' +
      '.pm-btn:hover{background:#0F2340;color:#fff}.pm-btn svg{width:18px;height:18px}' +
      '@media (max-width:768px){.pm-btn{display:none}}';
    document.head.appendChild(css0);
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'pm-btn'; btn.title = '발표 모드 (P)';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8M10 8.5v4l3.5-2z"/></svg>발표';
    btn.addEventListener('click', function(){ location.href = urlFor(true); });
    var mount = function(){ document.body.appendChild(btn); };
    if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
    document.addEventListener('keydown', function(e){
      if (typing(e.target) || e.ctrlKey || e.metaKey || e.altKey || introOpen()) return;
      if (e.key === 'p' || e.key === 'P' || e.key === 'ㅔ') { e.preventDefault(); location.href = urlFor(true); }
    });
    return;
  }

  /* ───────── 발표 모드 ───────── */
  if (!window.Reveal) { location.replace(urlFor(false)); return; }
  root.classList.add('deck');
  var W = 1920, H = 1080, M = 48, B = H - M * 2;          // 위아래 여백 48px, 내용은 984px 이내

  /* 1) 화면 폭 단위(vw·vh)를 1920x1080 기준 고정값으로, 휴대폰·태블릿용 설정은 끔 (어떤 화면이든 PC 장표 그대로) */
  function px(n, u){
    var f = u === 'vw' || u === 'vmax' ? W / 100 : H / 100;
    return +(parseFloat(n) * f).toFixed(2) + 'px';
  }
  function media(q){
    return q.replace(/\((max|min)-(width|height):\s*([\d.]+)px\)/g, function(m, mm, dim, n){
      var lim = dim === 'width' ? W : H, ok = mm === 'max' ? +n >= lim : +n <= lim;
      return ok ? '(min-width:0px)' : '(max-width:1px)';
    });
  }
  function conv(t){
    return t.replace(/(-?\d*\.?\d+)(vw|vh|svh|dvh|lvh|vmin|vmax)\b/g, function(m, n, u){ return px(n, u); })
            .replace(/@media([^{]*)\{/g, function(m, q){ return '@media' + media(q) + '{'; });
  }
  [].forEach.call(document.querySelectorAll('style'), function(s){ if (!s.hasAttribute('data-deck')) s.textContent = conv(s.textContent); });
  [].forEach.call(document.querySelectorAll('[style]'), function(e){
    var v = e.getAttribute('style'); if (/v(w|h|min|max)\b/.test(v)) e.setAttribute('style', conv(v));
  });

  /* 2) reveal.js 스타일 + 발표 화면 스타일 */
  var st = document.createElement('style'); st.setAttribute('data-deck', '');
  st.textContent = (window.REVEAL_CSS || '') +
    'html,body{height:100%}' +
    '.reveal-viewport{line-height:1.7;background:#0B1A33}' +
    '.reveal>.slides{text-align:left;display:block;flex:none;align-items:normal}' +
    '.reveal .slides>section{padding:0;box-sizing:border-box;overflow:hidden}' +
    '.reveal .slides>section[data-rv-disp=grid]:not([style*="display: none"]){display:grid!important}' +
    '.reveal .slides>section[data-rv-disp=flex]:not([style*="display: none"]){display:flex!important}' +
    '.reveal .slides>section.rv-foot{background:#0F2340}' +
    '.reveal .slides>section.rv-foot footer{margin:0}' +
    '.rv-more{font-size:.8em;opacity:.65;letter-spacing:0;margin-left:6px}' +
    '#hd,#progress,.top-btn,.fab,.pm-btn{display:none!important}' +
    '.sys-wrap{grid-template-columns:1fr!important}.sys-wrap>nav{display:none!important}' +   /* 2탄 영업 시스템: 왼쪽 목차 빼고 내용만 장별로 */
    'main{display:none}' +
    'html.rv-measure main{display:block;width:1920px}' +
    'html:not(.rv-built) body>*:not(.intro):not(script){visibility:hidden}' +
    'html.rv-measure,html.rv-measure body{overflow:auto!important;height:auto}' +
    'html.rv-measure .reveal{width:1920px!important;height:auto!important;overflow:visible!important}' +
    'html.rv-measure .reveal .slides{position:relative!important;inset:auto!important;width:1920px!important;height:auto!important}' +
    'html.rv-measure .reveal .slides>section{display:block!important;position:relative!important}' +
    'html.rv-measure .reveal .slides>section[data-rv-disp=grid]{display:grid!important}' +
    'html.rv-measure .reveal .slides>section[data-rv-disp=flex]{display:flex!important}' +
    '.reveal .controls{color:#CD9B34}' +
    '.reveal .progress{color:#CD9B34;height:4px}' +
    '.reveal .slide-number{background:rgba(15,35,64,.78);color:#E6CF97;font:700 15px "IBM Plex Sans KR",sans-serif;padding:6px 12px;border-radius:999px;right:20px;bottom:16px}' +
    '.rv-exit{position:fixed;right:16px;top:14px;z-index:40;height:36px;padding:0 14px;border-radius:999px;border:1px solid rgba(205,155,52,.6);background:rgba(15,35,64,.72);color:#E6CF97;font:700 13px "IBM Plex Sans KR",sans-serif;cursor:pointer;opacity:.35;transition:opacity .3s}' +
    '.rv-exit:hover{opacity:1}';
  document.head.appendChild(st);
  var rv = document.createElement('div'); rv.className = 'reveal'; rv.innerHTML = '<div class="slides"></div>';
  document.body.appendChild(rv);

  /* 3) 장표 만들기 */
  function inFlow(el){
    var c = getComputedStyle(el);
    return c.display !== 'none' && c.position !== 'absolute' && c.position !== 'fixed';
  }
  function stripIds(n){
    if (n.nodeType !== 1) return n;
    n.removeAttribute('id');
    n.querySelectorAll('[id]').forEach(function(e){ e.removeAttribute('id'); });
    return n;
  }
  function shell(node){ var s = node.cloneNode(false); s.removeAttribute('id'); s.classList.add('rv-piece'); return s; }
  function rowsOf(node){                          // 같은 높이에 놓인 자식끼리 한 줄로 묶기
    var rows = [], last = null;
    [].forEach.call(node.children, function(k){
      if (!inFlow(k)) { if (last) last.push(k); return; }
      var t = Math.round(k.getBoundingClientRect().top);
      if (last && Math.abs(t - last.top) < 6) last.push(k);
      else { last = [k]; last.top = t; rows.push(last); }
    });
    return rows;
  }
  /* 한 화면보다 훨씬 큰 덩어리만 줄 단위로 쪼갬 (같은 모양 상자를 복제해 나눠 담음) */
  function split(node, depth){
    if (node.offsetHeight <= B || depth > 3) return [node];
    var rows = rowsOf(node), gap = getComputedStyle(node).rowGap;
    gap = (gap && gap !== 'normal') ? gap : '0px';
    if (rows.length < 2) {
      if (rows.length === 1 && rows[0].length === 1) {
        var inner = split(rows[0][0], depth + 1);
        if (inner.length > 1) {
          var out = [node], prev = node;
          inner.slice(1).forEach(function(p){
            var sh = shell(node); sh.appendChild(p); prev.after(sh); prev = sh; out.push(sh);
          });
          return fixGaps(out, '0px');
        }
      }
      return [node];
    }
    var res = [node], prev2 = node;
    rows.slice(1).forEach(function(r){
      var sh = shell(node); r.forEach(function(e){ sh.appendChild(e); }); prev2.after(sh); prev2 = sh; res.push(sh);
    });
    fixGaps(res, gap);
    var all = [];
    res.forEach(function(p){ all = all.concat(split(p, depth + 1)); });
    return all;
  }
  function fixGaps(list, gap){
    list.forEach(function(p, i){
      if (i > 0) p.style.marginTop = gap;
      if (i < list.length - 1) p.style.marginBottom = '0px';
    });
    return list;
  }
  function spans(kids, wrap){
    var tops = kids.map(function(k){ return inFlow(k) ? k.getBoundingClientRect().top : null; });
    var wr = wrap.getBoundingClientRect(), end = wr.bottom - parseFloat(getComputedStyle(wrap).paddingBottom || 0);
    return kids.map(function(k, i){
      if (tops[i] === null) return 0;
      var nx = end;
      for (var j = i + 1; j < kids.length; j++) if (tops[j] !== null) { nx = tops[j]; break; }
      return Math.max(0, nx - tops[i]);
    });
  }
  function isHead(el){
    return /^H[1-4]$/.test(el.tagName) || el.classList.contains('eyebrow') || el.classList.contains('sec-lead') || el.classList.contains('path-h') || el.classList.contains('sec-title') || el.classList.contains('chap') || el.classList.contains('blk-hd');
  }

  /* 내용이 실제로 차지하는 폭 (글자·그림 기준) */
  function inkBox(s){                              // [왼쪽, 오른쪽] (장 기준, 1920 단위)
    var R = s.getBoundingClientRect(), q = s.offsetWidth / (R.width || 1), L = 1e9, Rr = -1e9;
    var rg = document.createRange();
    [].filter.call(s.children, inFlow).forEach(function(k){       // 배경 장식은 빼고 본문만
      var tw = document.createTreeWalker(k, NodeFilter.SHOW_TEXT), n;
      while ((n = tw.nextNode())) {
        if (!n.textContent.trim()) continue;
        var pe = n.parentElement; if (pe && pe.closest('[aria-hidden="true"]')) continue;
        rg.selectNodeContents(n); var b = rg.getBoundingClientRect(); if (!b.width) continue;
        L = Math.min(L, b.left); Rr = Math.max(Rr, b.right);
      }
      k.querySelectorAll('img,svg,video,canvas').forEach(function(e){
        var b = e.getBoundingClientRect(); if (b.width < 24 || b.height < 24) return;
        if (e.closest('[aria-hidden="true"]') && getComputedStyle(e).position === 'absolute') return;
        L = Math.min(L, b.left); Rr = Math.max(Rr, b.right);
      });
    });
    return Rr > L ? [(L - R.left) * q, (Rr - R.left) * q] : [0, W];
  }
  function inkWidth(s){ var b = inkBox(s); return b[1] - b[0]; }
  function setZoom(kids, z){ kids.forEach(function(k){ k.style.zoom = z === 1 ? '' : z; }); }
  /* 장 하나를 1920x1080에 맞추기: 작으면 화면에 차게 키우고, 넘치면 그 장만 줄이고, 남는 위아래는 가운데로 */
  function fit(s, first){
    if (!s.getClientRects().length) return;
    var kids = [].filter.call(s.children, inFlow);
    setZoom(kids, 1);
    s.style.paddingTop = s.style.paddingBottom = '0px';
    s.style.height = 'auto';
    var h = s.offsetHeight, z = 1;
    if (first) {
      var g = 1;
      if (!s.hasAttribute('data-rv-disp') && h > 40) {
        g = Math.min(1.45, B / h, (W - 160) / inkWidth(s));
        if (g < 1.06) g = 1;
        while (g > 1) {                            // 키운 뒤 가로로 넘치면 조금씩 덜 키움
          setZoom(kids, g);
          var ib = inkBox(s);
          if (ib[0] >= 8 && ib[1] <= W - 8 && s.offsetHeight <= B) break;
          g = g - 0.05 < 1.06 ? 1 : g - 0.05;
        }
      }
      s.setAttribute('data-rv-z', g.toFixed(2));
    }
    var want = parseFloat(s.getAttribute('data-rv-z') || '1');
    if (want !== 1) { setZoom(kids, want); z = want; h = s.offsetHeight; }
    if (h > H || (h > B && !s.hasAttribute('data-rv-disp'))) {
      z = z * B / h; setZoom(kids, z); h = s.offsetHeight;
    }
    var pad = Math.max(0, (H - h) / 2);
    s.style.paddingTop = s.style.paddingBottom = pad + 'px';
    s.style.height = H + 'px';
  }

  function build(){
    root.classList.add('rv-measure');
    document.querySelectorAll('.rv,[data-rv]').forEach(function(e){ e.classList.add('in'); });   // 나타나기 효과는 미리 다 보이게 (1탄·CIS .rv, 2탄 data-rv)
    var deck = rv.querySelector('.slides');
    var secs = [].filter.call(main.children, function(s){ return s.tagName === 'SECTION'; });
    var out = [];

    secs.forEach(function(s){
      var d = getComputedStyle(s).display;
      if (d === 'none') return;
      if (d !== 'block') s.setAttribute('data-rv-disp', d);
      s.style.paddingTop = s.style.paddingBottom = '0px';
      var wrap = s.querySelector(':scope>.wrap');
      if (s.offsetHeight <= B || !wrap || d !== 'block') { out.push(s); return; }

      /* 덩어리(카드·표·그림)는 되도록 통째로: 한 화면의 1.4배를 넘는 것만 줄 단위로 나눔 */
      [].slice.call(wrap.children).forEach(function(k){ if (k.offsetHeight > B * 1.4) split(k, 0); });
      var kids = [].slice.call(wrap.children), sp = spans(kids, wrap);
      var eb = (kids[0] && kids[0].classList.contains('eyebrow')) ? kids[0] : null, ebH = eb ? sp[0] : 0;
      var chunks = [[]], cur = 0;
      kids.forEach(function(k, i){
        var lim = B - (chunks.length > 1 ? ebH : 0), c = chunks[chunks.length - 1];
        if (c.length && cur + sp[i] > lim) {
          var carry = [];
          while (c.length && isHead(c[c.length - 1].el)) carry.unshift(c.pop());   // 제목만 따로 남지 않게 다음 장으로
          chunks.push(carry); cur = carry.reduce(function(a, x){ return a + x.sp; }, 0);
        }
        chunks[chunks.length - 1].push({ el: k, sp: sp[i] }); cur += sp[i];
      });
      chunks = chunks.filter(function(c){ return c.length; });
      /* 너무 적은 장은 앞/뒤 장과 합치기 (조금 넘치면 그 장만 살짝 축소) */
      var sum = function(c){ return c.reduce(function(a, x){ return a + x.sp; }, 0); };
      for (var ci = chunks.length - 1; ci >= 0 && chunks.length > 1; ci--) {
        var me = sum(chunks[ci]);
        if (me >= B * 0.3) continue;
        var pv = ci > 0 ? sum(chunks[ci - 1]) : Infinity, nx = ci < chunks.length - 1 ? sum(chunks[ci + 1]) : Infinity;
        if (pv <= nx && pv + me <= B * 1.15) { chunks[ci - 1] = chunks[ci - 1].concat(chunks[ci]); chunks.splice(ci, 1); }
        else if (nx + me <= B * 1.15) { chunks[ci + 1] = chunks[ci].concat(chunks[ci + 1]); chunks.splice(ci, 1); }
      }
      if (chunks.length === 1) { out.push(s); return; }

      var decor = [].filter.call(s.children, function(c){ return c !== wrap; });
      chunks.forEach(function(c, ci){
        if (ci === 0) { out.push(s); return; }
        var sec = s.cloneNode(false); sec.removeAttribute('id'); sec.classList.add('rv-cont');
        decor.forEach(function(x){ sec.appendChild(stripIds(x.cloneNode(true))); });
        var w = wrap.cloneNode(false); w.removeAttribute('id'); sec.appendChild(w);
        if (eb && c[0].el !== eb) {
          var e = stripIds(eb.cloneNode(true));
          e.insertAdjacentHTML('beforeend', ' <span class="rv-more">(계속)</span>');
          w.appendChild(e);
        }
        c.forEach(function(x){ w.appendChild(x.el); });
        out.push(sec);
      });
    });

    out.forEach(function(s){ deck.appendChild(s); });
    var ft = document.querySelector('footer');
    if (ft) { var fs = document.createElement('section'); fs.className = 'rv-foot'; fs.appendChild(ft); deck.appendChild(fs); }

    [].forEach.call(deck.children, function(s){ fit(s, true); });
    root.classList.remove('rv-measure');
    root.classList.add('rv-built');
    window.dispatchEvent(new Event('resize'));       // 장표 크기에 맞춰 그림·움직임 위치 다시 계산
    start();
  }

  function exit(){ location.href = urlFor(false); }
  function start(){
    Reveal.initialize({
      width: W, height: H, margin: 0, minScale: 0.05, maxScale: 4,
      center: false, hash: false, controls: true, controlsTutorial: false, progress: true,
      slideNumber: 'c/t', transition: 'fade', backgroundTransition: 'fade',
      viewDistance: 3, help: false, keyboard: true, overview: true
    }).then(function(){
      var deck = rv.querySelector('.slides');
      /* 탭·자동 전환으로 내용 높이가 바뀌어도 잘리지 않게 지금 장을 다시 맞춤 */
      var refit = function(){ var c = Reveal.getCurrentSlide(); if (c) fit(c, false); };
      Reveal.on('slidechanged', function(){ refit(); window.dispatchEvent(new Event('resize')); });
      setInterval(refit, 500);
      var ACT = 'a,button,input,select,textarea,label,summary,video,iframe,[role=button],[role=tab],[tabindex],[onclick],.hc';
      deck.addEventListener('click', function(e){                     // 한 번 클릭 = 다음 장
        if (e.defaultPrevented || e.button !== 0 || Reveal.isOverview()) return;
        if (e.target.closest && e.target.closest(ACT)) return;           // 버튼·탭·링크는 원래 기능
        if (String(window.getSelection ? getSelection() : '')) return;
        Reveal.next();
      });
      deck.addEventListener('contextmenu', function(e){ e.preventDefault(); Reveal.prev(); });
      var x = document.createElement('button'); x.type = 'button'; x.className = 'rv-exit'; x.textContent = '발표 끝내기';
      x.addEventListener('click', exit); document.body.appendChild(x);
      document.addEventListener('keydown', function(e){
        if (typing(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === 'q' || e.key === 'Q' || e.key === 'ㅂ') { e.preventDefault(); exit(); }
      });
      /* 처음 누를 때 전체 화면으로 (브라우저는 사용자가 누른 뒤에만 허용) */
      var asked = false;
      var full = function(){
        if (asked) return; asked = true;
        var el = root, rq = el.requestFullscreen || el.webkitRequestFullscreen;
        if (rq && !document.fullscreenElement) { try { var p = rq.call(el); if (p && p.catch) p.catch(function(){}); } catch (e) {} }
      };
      document.addEventListener('pointerdown', full, true);
      document.addEventListener('keydown', function(e){ if (!/^(F|f|ㄹ|Escape)$/.test(e.key)) full(); }, true);
      /* 첫 화면 앞 연출(운무·번개)이 떠 있는 동안에는 장이 넘어가지 않게 */
      if (introOpen()) {
        Reveal.configure({ keyboard: false });
        var t = setInterval(function(){
          if (!introOpen()) { clearInterval(t); Reveal.configure({ keyboard: true }); }
        }, 300);
      }
    });
  }

  function go(){
    var f = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    f.then(function(){ setTimeout(build, 200); });
  }
  if (document.readyState === 'complete') go(); else addEventListener('load', go);
})();
