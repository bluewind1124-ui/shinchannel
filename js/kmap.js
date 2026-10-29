/* 지사 위치 지도 그리기 (외부 지도 서버 없이 SVG) — 본 홈페이지 · 지사 소개 페이지 공용
   필요: js/korea-map.js, js/branches.js
   KMAP.draw(상자, 'all' | 'metro', 지사목록, {link, onHover}) */
window.KMAP = (function(){
  var METRO = {lng0:126.70, lng1:127.22, lat0:37.43, lat1:37.80};
  /* 수도권 확대 지도에서 이름표가 겹치지 않게 놓을 방향 */
  var LBL = {acemullae:'l', epercul:'bl', jamsil:'t', songpa:'b', heritage:'l', thedream:'t', therich:'l', bucheon:'b', ilsan:'r', uijeongbu:'r'};
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
      var sx=XY(37.545,126.99); svg += '<text class="pl seoul-l" x="'+sx[0]+'" y="'+sx[1]+'">서울</text>';
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
  }
  return {draw:draw, inMetro:inMetro, short:short, link:link, esc:esc, METRO:METRO};
})();
