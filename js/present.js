/* 발표 모드: 홈페이지를 PPT처럼 한 장씩 넘깁니다 (1탄 · 2탄 · CIS용 공용)
   시작: 왼쪽 아래 「발표」 버튼 또는 P 키
   다음: 마우스 왼쪽 클릭 · → · ↓ · PageDown · 스페이스 · Enter (프레젠터 「다음」 버튼)
   이전: 마우스 오른쪽 클릭 · ← · ↑ · PageUp · Backspace (프레젠터 「이전」 버튼)
   처음/끝: Home / End · 화면 가리기: B 또는 . · 끝내기: Esc
   한 화면보다 긴 장표는 그 장표 안에서 먼저 내려간 뒤 다음 장표로 넘어갑니다. */
(function(){
  if (window.__present) return; window.__present = true;
  var main = document.querySelector('main'); if (!main) return;
  var root = document.documentElement, on = false, fs = false, black = null, hintT = 0;

  var css = document.createElement('style');
  css.textContent =
    '.pm-btn{position:fixed;left:20px;bottom:76px;z-index:65;display:flex;align-items:center;gap:8px;height:44px;padding:0 16px 0 12px;border-radius:999px;border:1px solid rgba(205,155,52,.75);background:rgba(15,35,64,.92);color:#E6CF97;font:700 14px "IBM Plex Sans KR",sans-serif;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.25)}' +
    '.pm-btn:hover{background:#0F2340;color:#fff}.pm-btn svg{width:18px;height:18px}' +
    '@media (max-width:768px){.pm-btn{display:none}}' +
    'html.pm{scroll-behavior:auto!important}' +
    'html.pm #hd,html.pm header#hd,html.pm #progress,html.pm .top-btn,html.pm .fab,html.pm .pm-btn{display:none!important}' +
    'html.pm main>section{min-height:100vh;min-height:100dvh;box-sizing:border-box}' +
    'html.pm main>section.pm-c{display:flex;flex-direction:column;justify-content:center}' +
    'html.pm main{cursor:pointer}html.pm main a,html.pm main button,html.pm main [role=button],html.pm main [role=tab]{cursor:pointer}' +
    '.pm-no{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:400;padding:6px 14px;border-radius:999px;background:rgba(15,35,64,.78);color:#E6CF97;font:700 13px "IBM Plex Sans KR",sans-serif;letter-spacing:.04em;pointer-events:none;display:none}' +
    'html.pm .pm-no{display:block}' +
    '.pm-hint{position:fixed;left:50%;top:24px;transform:translateX(-50%);z-index:400;padding:12px 20px;border-radius:10px;background:rgba(15,35,64,.94);border:1px solid #CD9B34;color:#fff;font:500 14px/1.6 "IBM Plex Sans KR",sans-serif;text-align:center;pointer-events:none;opacity:0;transition:opacity .4s}' +
    '.pm-hint b{color:#E6CF97}.pm-hint.show{opacity:1}' +
    '.pm-black{position:fixed;inset:0;z-index:500;background:#000;cursor:pointer}';
  document.head.appendChild(css);

  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'pm-btn'; btn.title = '발표 모드 (P)';
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8M10 8.5v4l3.5-2z"/></svg>발표';
  var no = document.createElement('div'); no.className = 'pm-no'; no.setAttribute('aria-live', 'polite');
  var hint = document.createElement('div'); hint.className = 'pm-hint';
  hint.innerHTML = '<b>발표 모드</b><br>다음: 클릭 · → · PageDown &nbsp;|&nbsp; 이전: 오른쪽 클릭 · ← · PageUp &nbsp;|&nbsp; 끝내기: Esc';
  function mount(){ document.body.appendChild(btn); document.body.appendChild(no); document.body.appendChild(hint); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  function slides(){
    return [].filter.call(main.children, function(s){
      return s.tagName === 'SECTION' && s.offsetHeight > 0 && getComputedStyle(s).display !== 'none';
    });
  }
  var vh = function(){ return window.innerHeight; };
  var topOf = function(el){ return el.getBoundingClientRect().top + window.pageYOffset; };
  function cur(list){                       // 지금 화면 맨 위에 걸친 장표
    var y = 8;
    for (var i = list.length - 1; i >= 0; i--) if (list[i].getBoundingClientRect().top <= y) return i;
    return 0;
  }
  function go(y){
    y = Math.max(0, Math.round(y));
    try { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0, y); }
    paint();
  }
  function to(i){
    var l = slides(); i = Math.max(0, Math.min(l.length - 1, i));
    go(topOf(l[i]));
  }
  function next(){
    var l = slides(), i = cur(l), r = l[i].getBoundingClientRect();
    if (r.bottom > vh() + 130) {            // 긴 장표: 안에서 한 화면씩 (남은 게 아래 여백뿐이면 바로 다음 장표)
      var step = Math.min(vh() * 0.85, r.bottom - vh());
      return go(window.pageYOffset + step);
    }
    if (i < l.length - 1) to(i + 1);
    else { var f = document.querySelector('footer'); if (f) f.scrollIntoView(); paint(); }
  }
  function prev(){
    var l = slides(), i = cur(l), r = l[i].getBoundingClientRect();
    if (r.top < -4) return go(window.pageYOffset - Math.min(vh() * 0.85, -r.top));
    if (i > 0) to(i - 1);
  }
  function paint(){
    if (!on) return;
    var l = slides(); no.textContent = (cur(l) + 1) + ' / ' + l.length;
  }
  function center(){                        // 짧은 장표는 화면 가운데로
    slides().forEach(function(s){
      s.classList.remove('pm-c');
      if (getComputedStyle(s).display === 'block') s.classList.add('pm-c');
    });
  }

  function start(){
    if (on) return; on = true;
    var l0 = slides(), keep = l0[cur(l0)];
    root.classList.add('pm'); center();
    var el = root, rq = el.requestFullscreen || el.webkitRequestFullscreen;
    if (rq && !document.fullscreenElement) {
      try { var p = rq.call(el); fs = true; if (p && p.catch) p.catch(function(){ fs = false; }); } catch (e) { fs = false; }
    }
    setTimeout(function(){ go(topOf(keep)); }, 120);
    hint.classList.add('show'); clearTimeout(hintT); hintT = setTimeout(function(){ hint.classList.remove('show'); }, 3500);
  }
  function stop(){
    if (!on) return; on = false;
    var l = slides(), keep = l[cur(l)];
    root.classList.remove('pm'); hint.classList.remove('show');
    slides().forEach(function(s){ s.classList.remove('pm-c'); });
    if (black) { black.remove(); black = null; }
    if (fs && document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function(){});
    fs = false;
    setTimeout(function(){ var hd = document.getElementById('hd'); go(topOf(keep) - (hd ? hd.offsetHeight : 0)); }, 120);
  }
  function toggleBlack(){
    if (black) { black.remove(); black = null; return; }
    black = document.createElement('div'); black.className = 'pm-black';
    black.addEventListener('click', function(e){ e.stopPropagation(); toggleBlack(); });
    document.body.appendChild(black);
  }
  window.SCPresent = { start: start, stop: stop, next: next, prev: prev };

  btn.addEventListener('click', function(e){ e.stopPropagation(); start(); });
  document.addEventListener('fullscreenchange', function(){
    if (on && fs && !document.fullscreenElement) stop();   // 브라우저 Esc로 전체 화면이 풀리면 발표도 끝냄
  });

  var typing = function(t){ return t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable); };
  var introOpen = function(){ var it = document.querySelector('.intro'); if (!it || !it.isConnected) return false; var c = getComputedStyle(it); return c.display !== 'none' && c.visibility !== 'hidden' && c.opacity !== '0'; };

  document.addEventListener('keydown', function(e){
    if (typing(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key;
    if (!on) { if ((k === 'p' || k === 'P' || k === 'ㅔ') && !introOpen()) { e.preventDefault(); start(); } return; }
    if (introOpen()) return;
    if (black && k !== 'b' && k !== 'B' && k !== '.' && k !== 'ㅠ') { e.preventDefault(); toggleBlack(); return; }
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === ' ' || k === 'Spacebar' || k === 'Enter' || k === 'n' || k === 'N') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
    else if (k === 'Home') { e.preventDefault(); to(0); }
    else if (k === 'End') { e.preventDefault(); var l = slides(); to(l.length - 1); }
    else if (k === 'b' || k === 'B' || k === '.' || k === 'ㅠ') { e.preventDefault(); toggleBlack(); }
    else if (k === 'Escape' || k === 'Esc') { e.preventDefault(); stop(); }
  }, true);

  var ACT = 'a,button,input,select,textarea,label,summary,video,iframe,[role=button],[role=tab],[tabindex],[onclick],.hc';
  main.addEventListener('click', function(e){
    if (!on || e.defaultPrevented || e.button !== 0) return;
    if (e.target.closest && e.target.closest(ACT)) return;      // 버튼·탭·링크는 원래 기능
    var sel = window.getSelection && String(window.getSelection()); if (sel) return;
    next();
  });
  document.addEventListener('contextmenu', function(e){
    if (!on || introOpen()) return;
    if (e.target.closest && e.target.closest('main')) { e.preventDefault(); prev(); }
  });
  window.addEventListener('scroll', function(){ if (on) paint(); }, { passive: true });
  window.addEventListener('resize', function(){ if (on) { center(); paint(); } });
})();
