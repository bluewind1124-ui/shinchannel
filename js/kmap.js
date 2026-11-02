/* 지사 위치 지도 그리기 (외부 지도 서버 없이 SVG) — 본 홈페이지 · 지사 소개 페이지 공용
   필요: js/korea-map.js, js/branches.js
   KMAP.draw(상자, 'all' | 'metro', 지사목록, {link, onHover}) */
window.KMAP = (function(){
  var METRO = {lng0:126.70, lng1:127.22, lat0:37.43, lat1:37.80};
  /* 수도권 확대 지도에서 이름표가 겹치지 않게 놓을 방향 */
  var LBL = {acemullae:'l', epercul:'bl', jamsil:'t', songpa:'b', heritage:'l', thedream:'t', therich:'l', bucheon:'b', ilsan:'r', uijeongbu:'r'};
  /* 본사: 서울 용산구 한강대로 257, 14층(갈월동, 청룡빌딩) */
  var HQ = {name:'본사', addr:'서울 용산구 한강대로 257, 14층(갈월동, 청룡빌딩)', lat:37.5442, lng:126.9724,
            map:'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EC%9A%A9%EC%82%B0%EA%B5%AC%20%ED%95%9C%EA%B0%95%EB%8C%80%EB%A1%9C%20257'};
  function hqCss(){
    if(document.getElementById('kmapHqCss')) return;
    var st=document.createElement('style'); st.id='kmapHqCss';
    st.textContent='.kpin.hqp{z-index:4}'
      +'.kpin.hqp i{left:-11px;top:-11px;width:22px;height:22px;border-radius:5px;background:#CD9B34;border:3px solid #0F2340;transform:rotate(45deg)}'
      +'.kpin.hqp i::before{content:"";position:absolute;left:4px;top:4px;width:8px;height:8px;background:#0F2340;border-radius:1px}'
      +'.kpin.hqp:hover i,.kpin.hqp.hl i{transform:rotate(45deg) scale(1.2);background:#CD9B34;border-color:#0F2340}'
      +'.kpin.hqp.lab span{opacity:1;background:#0F2340;color:#fff;border-color:#0F2340;font-weight:800}'
      +'.kpin.hqp.d-b span{top:16px}.kpin i::after{pointer-events:none}'
      +'.kpin.hqp:not(.lab) i{left:-7px;top:-7px;width:14px;height:14px;border-width:2px}.kpin.hqp:not(.lab) i::before{left:2px;top:2px;width:6px;height:6px}';
    document.head.appendChild(st);
  }
  var esc = function(s){return String(s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var inMetro = function(b){return b.lng>=METRO.lng0&&b.lng<=METRO.lng1&&b.lat>=METRO.lat0&&b.lat<=METRO.lat1};
  var short = function(n){return String(n).replace(/ ?금융지사$|지사$/,'')};
  var link = function(b){return 'branch.html?id='+encodeURIComponent(b.id)};

  function draw(box, mode, B, opt){
    var M = window.KOREA_MAP, XY = window.KOREA_XY; opt = opt || {};
    if(!M || !box) return;
    var vb;
    if(mode==='metro'){var a0=XY(METRO.lat1,METRO.lng0),a1=XY(METRO.lat0,METRO.lng1);vb=[a0[0],a0[1],a1[0]-a0[0],a1[1]-a0[1]];}
    else vb=[-10,-10,M.w+20,M.h+20];
    var svg = '<svg viewBox="'+vb.join(' ')+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true">';
    M.paths.forEach(function(p,i){svg += '<path class="pv'+(p.c==='11'?' seoul':'')+'" style="animation-delay:'+(i*0.03)+'s" d="'+p.d+'"/>'});
    if(mode!=='metro'){
      M.labels.forEach(function(l){svg += '<text class="pl'+(l.big?' big':'')+'" x="'+l.x+'" y="'+l.y+'">'+l.t+'</text>'});
      var c0=XY(METRO.lat1,METRO.lng0),c1=XY(METRO.lat0,METRO.lng1);
      svg += '<rect class="mbox" x="'+c0[0]+'" y="'+c0[1]+'" width="'+(c1[0]-c0[0])+'" height="'+(c1[1]-c0[1])+'"/>';
    } else {
      var sx=XY(37.488,127.0); svg += '<text class="pl seoul-l" x="'+sx[0]+'" y="'+sx[1]+'">서울</text>';
    }
    svg += '</svg>';
    box.innerHTML = svg;
    box.style.aspectRatio = vb[2]+' / '+vb[3];
    B.forEach(function(b,i){
      if(b.lat==null||b.lng==null) return;
      var m = inMetro(b); if(mode==='metro'&&!m) return;
      var q = XY(b.lat,b.lng), x=(q[0]-vb[0])/vb[2]*100, y=(q[1]-vb[1])/vb[3]*100;
      var a = document.createElement('a');
      a.className = 'kpin'+(mode==='metro'||!m?' lab':'')+' d-'+(mode==='metro'?(LBL[b.id]||'r'):'r');
      a.href = (opt.link||link)(b); a.dataset.id = b.id; a.title = b.name+(b.addr?' · '+b.addr:'');
      a.style.left = x+'%'; a.style.top = y+'%'; a.style.animationDelay = (0.4+i*0.08)+'s';
      a.innerHTML = '<i></i><span>'+esc(short(b.name))+'</span>';
      if(opt.onHover){a.addEventListener('mouseenter',function(){opt.onHover(b.id,true)});a.addEventListener('mouseleave',function(){opt.onHover(b.id,false)});}
      box.appendChild(a);
    });
    if(opt.noHq) return;
    hqCss();
    var hq = XY(HQ.lat,HQ.lng), h = document.createElement('a');
    h.className = 'kpin hqp'+(mode==='metro'?' lab':'')+' d-b';
    h.href = HQ.map; h.target = '_blank'; h.rel = 'noopener';
    h.title = '한국보험금융 본사 · '+HQ.addr;
    h.style.left = ((hq[0]-vb[0])/vb[2]*100)+'%'; h.style.top = ((hq[1]-vb[1])/vb[3]*100)+'%'; h.style.animationDelay = '0.3s';
    h.innerHTML = '<i></i><span>본사</span>';
    box.appendChild(h);
  }
  return {draw:draw, HQ:HQ, inMetro:inMetro, short:short, link:link, esc:esc, METRO:METRO};
})();
