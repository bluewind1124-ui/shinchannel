/* 신채널 홈페이지 소리: 첫 연출의 천둥 소리 + 첫 화면부터 잔잔하고 밝은 배경음악(BGM)
   - 음원 파일 없이 브라우저가 그 자리에서 직접 만들어 내는 소리입니다(저작권 걱정 없음).
   - 브라우저는 사용자가 한 번 누르기 전에는 소리를 막을 수 있어, 그때는 「소리 켜기」 버튼을 보여 줍니다.
   - 왼쪽 아래 ♪ 버튼으로 켜고 끌 수 있고, 끈 상태는 다음 방문에도 기억합니다.
   쓰는 법: window.SND.rumble(세기 0~1) · SND.thunder() · SND.startBgm(늦춤ms) */
(function(){
  var AC=window.AudioContext||window.webkitAudioContext;
  var KEY='sc_sound_off';
  function rd(){try{return localStorage.getItem(KEY)==='1'}catch(e){return false}}
  function wr(v){try{v?localStorage.setItem(KEY,'1'):localStorage.removeItem(KEY)}catch(e){}}
  var off=rd(), ctx=null, master=null, fxBus=null, musBus=null, verb=null, bgmOn=false, bgmWanted=false, schedT=0, timer=0, step=0, btn=null;

  if(!AC){window.SND={rumble:function(){},thunder:function(){},startBgm:function(){},unlocked:function(){return false}};return;}

  /* ── 기본 준비 ── */
  function init(){
    if(ctx)return ctx;
    try{ if(navigator.audioSession)navigator.audioSession.type='playback'; }catch(e){} /* 아이폰 무음 스위치 대응 */
    ctx=new AC();
    master=ctx.createGain();master.gain.value=off?0:1;
    var lim=ctx.createWaveShaper(),cv=new Float32Array(2048);for(var i=0;i<2048;i++){var x=i/1023.5-1;cv[i]=Math.tanh(x*1.6)/Math.tanh(1.6);}
    lim.curve=cv;master.gain.value=off?0:1;var pre=ctx.createGain();pre.gain.value=.6;master.connect(pre);pre.connect(lim);lim.connect(ctx.destination); /* 큰 소리도 찢어지지 않게 부드럽게 눌러 줌 */
    verb=ctx.createConvolver();verb.buffer=impulse(3.2,2.2);
    var vg=ctx.createGain();vg.gain.value=.55;verb.connect(vg);vg.connect(master);
    fxBus=ctx.createGain();fxBus.gain.value=1;fxBus.connect(master);
    musBus=ctx.createGain();musBus.gain.value=0;musBus.connect(master);
    return ctx;
  }
  function impulse(sec,decay){
    var n=Math.floor(ctx.sampleRate*sec),b=ctx.createBuffer(2,n,ctx.sampleRate);
    for(var c=0;c<2;c++){var d=b.getChannelData(c);for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,decay);}
    return b;
  }
  var noiseCache={};
  function noise(sec,kind){ /* kind: white / brown */
    var k=kind+sec;if(noiseCache[k])return noiseCache[k];
    var n=Math.floor(ctx.sampleRate*sec),b=ctx.createBuffer(2,n,ctx.sampleRate);
    for(var c=0;c<2;c++){var d=b.getChannelData(c),last=0;
      for(var i=0;i<n;i++){var w=Math.random()*2-1;
        if(kind==='brown'){last=(last+.02*w)/1.02;d[i]=last*3.5;}else d[i]=w;}}
    return noiseCache[k]=b;
  }
  function running(){return ctx&&ctx.state==='running';}
  function unlock(){
    init();
    if(ctx.state!=='running'){var p=ctx.resume();if(p&&p.then)p.then(after);} else after();
  }
  function after(){ if(running()){ if(bgmWanted&&!bgmOn&&!off)bgmGo(600); paint(); } }

  /* ── 천둥 ── */
  function src(buf,t,gainEnv,filt){
    var s=ctx.createBufferSource();s.buffer=buf;
    var g=ctx.createGain();g.gain.setValueAtTime(0,t);
    var node=s;(filt||[]).forEach(function(f){node.connect(f);node=f;});
    node.connect(g);gainEnv(g.gain,t);return {s:s,g:g};
  }
  function bq(type,f,q){var b=ctx.createBiquadFilter();b.type=type;b.frequency.value=f;if(q)b.Q.value=q;return b;}
  function toFx(g,wet){g.connect(fxBus);var w=ctx.createGain();w.gain.value=wet;g.connect(w);w.connect(verb);}

  /* 멀리서 우르릉 (번쩍일 때) */
  function rumble(power){
    if(!running()||off)return;power=power||.5;
    var t=ctx.currentTime+.15,len=3.2;
    var lp=bq('lowpass',260,.7),r=src(noise(6,'brown'),t,function(p,t){p.linearRampToValueAtTime(.55*power,t+.5);p.setTargetAtTime(0,t+.9,.8);},[lp]);
    lp.frequency.setValueAtTime(320,t);lp.frequency.exponentialRampToValueAtTime(110,t+len);
    toFx(r.g,.7);r.s.start(t,Math.random()*2);r.s.stop(t+len+1);
  }

  /* 큰 번개: 찢어지는 소리 + 땅이 울리는 굉음 + 길게 끄는 여운 */
  function thunder(){
    if(!running()||off)return;
    var t=ctx.currentTime+.02;
    /* ① 쩌억 — 날카로운 균열음 여러 번 */
    [0,.035,.07,.12,.19].forEach(function(d,k){
      var hp=bq('highpass',1800-k*250),bp=bq('peaking',3200,1);bp.gain.value=6;
      var c=src(noise(1,'white'),t+d,function(p,tt){p.linearRampToValueAtTime(.55-k*.07,tt+.004);p.exponentialRampToValueAtTime(.001,tt+.09+k*.03);},[hp,bp]);
      toFx(c.g,.6);c.s.start(t+d,Math.random()*.5);c.s.stop(t+d+.4);
    });
    /* ② 콰광 — 낮고 묵직한 폭발음 */
    var lp=bq('lowpass',900,.8);
    var b=src(noise(6,'brown'),t+.03,function(p,tt){p.linearRampToValueAtTime(1.2,tt+.06);p.exponentialRampToValueAtTime(.5,tt+1.1);p.setTargetAtTime(0,tt+1.6,1.4);},[lp]);
    lp.frequency.setValueAtTime(1100,t);lp.frequency.exponentialRampToValueAtTime(90,t+5);
    toFx(b.g,.8);b.s.start(t+.03,Math.random());b.s.stop(t+7);
    /* ③ 쿠웅 — 가슴을 울리는 아주 낮은 소리 */
    var o=ctx.createOscillator(),og=ctx.createGain();o.type='sine';
    o.frequency.setValueAtTime(70,t);o.frequency.exponentialRampToValueAtTime(30,t+2.5);
    og.gain.setValueAtTime(0,t);og.gain.linearRampToValueAtTime(.7,t+.05);og.gain.setTargetAtTime(0,t+.4,.7);
    o.connect(og);og.connect(fxBus);o.start(t);o.stop(t+4);
    /* ④ 우르르릉 — 하늘을 굴러가는 여운(불규칙하게 커졌다 작아짐) */
    var lp2=bq('lowpass',300,.6);
    var rr=src(noise(6,'brown'),t+.5,function(p,tt){
      var v=[.9,.5,1,.45,.75,.3,.5,.18,.25,0];v.forEach(function(x,i){p.linearRampToValueAtTime(x*.9,tt+.25+i*.55+Math.random()*.15);});
    },[lp2]);
    lp2.frequency.setValueAtTime(380,t+.5);lp2.frequency.exponentialRampToValueAtTime(80,t+6);
    toFx(rr.g,1);rr.s.start(t+.5,Math.random()*2);rr.s.stop(t+7);
  }

  /* ── 배경음악: 잔잔하고 밝은 피아노·현악 느낌 (72 BPM, C–G–Am–F 계열) ── */
  var BPM=72, E=60/BPM/2; /* 8분음표 길이 */
  var CH=[ /* 화음(미디 번호): 베이스, 화음 3음 */
    {b:48,c:[60,64,67]},{b:43,c:[59,62,67]},{b:45,c:[60,64,69]},{b:41,c:[60,65,69]},
    {b:48,c:[60,64,67]},{b:40,c:[59,64,67]},{b:41,c:[60,65,69]},{b:43,c:[59,62,65]}
  ];
  var PENTA=[72,74,76,79,81,84];
  function hz(m){return 440*Math.pow(2,(m-69)/12);}
  function pad(m,t,dur){
    [-6,6].forEach(function(dt){
      var o=ctx.createOscillator(),g=ctx.createGain(),f=bq('lowpass',1400,.3);
      o.type='triangle';o.frequency.value=hz(m);o.detune.value=dt;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.022,t+1.2);g.gain.setValueAtTime(.022,t+dur-1);g.gain.linearRampToValueAtTime(0,t+dur+.6);
      o.connect(f);f.connect(g);g.connect(musBus);var w=ctx.createGain();w.gain.value=.6;g.connect(w);w.connect(verb);
      o.start(t);o.stop(t+dur+.8);
    });
  }
  function bell(m,t,vol,len){ /* 맑은 피아노·종소리 */
    var o=ctx.createOscillator(),o2=ctx.createOscillator(),g=ctx.createGain(),g2=ctx.createGain();
    o.type='sine';o.frequency.value=hz(m);o2.type='sine';o2.frequency.value=hz(m)*2.005;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0005,t+len);
    g2.gain.value=.18;o2.connect(g2);g2.connect(g);o.connect(g);
    g.connect(musBus);var w=ctx.createGain();w.gain.value=.9;g.connect(w);w.connect(verb);
    o.start(t);o2.start(t);o.stop(t+len+.1);o2.stop(t+len+.1);
  }
  function bass(m,t,dur){
    var o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=hz(m);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.09,t+.05);g.gain.exponentialRampToValueAtTime(.001,t+dur);
    o.connect(g);g.connect(musBus);o.start(t);o.stop(t+dur+.1);
  }
  var ARP=[0,1,2,1,3,2,1,2];
  function sched(){
    if(!bgmOn)return;
    while(schedT<ctx.currentTime+1.2){
      var bar=Math.floor(step/8)%CH.length,i=step%8,ch=CH[bar],t=schedT;
      if(i===0){pad(ch.c[0],t,E*8);pad(ch.c[1],t,E*8);pad(ch.c[2],t,E*8);bass(ch.b,t,E*7);}
      if(i===4)bass(ch.b+12,t,E*3);
      var n=ARP[i],note=n<3?ch.c[n]+12:ch.c[0]+24;
      bell(note,t,.05+(i===0?.02:0),1.6);
      /* 가끔 위에서 반짝이는 선율 */
      if((i===2||i===6)&&Math.random()<.35){var m=PENTA[Math.floor(Math.random()*PENTA.length)];
        if(ch.c.some(function(c){return (c%12)===(m%12)})||Math.random()<.5)bell(m+12,t+E*.5,.03,2.2);}
      schedT+=E*(i%2?0.94:1.06);step++; /* 살짝 흔들리는 박자 */
    }
  }
  function bgmGo(delay){
    if(bgmOn||off||!running())return;
    bgmOn=true;schedT=ctx.currentTime+(delay||0)/1000;step=0;
    musBus.gain.cancelScheduledValues(ctx.currentTime);
    musBus.gain.setValueAtTime(0,ctx.currentTime);musBus.gain.setValueAtTime(0,schedT);
    musBus.gain.linearRampToValueAtTime(1.3,schedT+4);
    clearInterval(timer);timer=setInterval(sched,250);sched();
    paint();
  }
  function startBgm(delay){bgmWanted=true;if(running())bgmGo(delay);else paint();}

  /* 켜기/끄기 */
  function setOff(v){
    off=v;wr(v);init();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(v?0:1,ctx.currentTime,.25);
    if(!v){unlock();bgmWanted=true;if(running()&&!bgmOn)bgmGo(300);}
    paint();
  }

  /* ── 왼쪽 아래 ♪ 버튼 ── */
  function css(){
    var s=document.createElement('style');
    s.textContent='.snd-btn{position:fixed;left:20px;bottom:20px;z-index:65;display:flex;align-items:center;gap:8px;height:44px;min-width:44px;padding:0 12px;border-radius:999px;border:1px solid rgba(205,155,52,.75);background:rgba(15,35,64,.86);color:#fff;font:700 13px/1 "IBM Plex Sans KR","Noto Sans KR",sans-serif;cursor:pointer;box-shadow:0 6px 18px rgba(15,35,64,.25);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:background .3s}'+
      '.snd-btn:hover{background:rgba(205,155,52,.9);color:#0F2340}'+
      '.snd-btn svg{width:18px;height:18px;flex:none}'+
      '.snd-btn .eq{display:flex;align-items:flex-end;gap:2px;height:14px}.snd-btn .eq i{width:3px;background:#E6C77F;border-radius:1px;height:4px}'+
      '.snd-btn.play .eq i{animation:sndEq 1s ease-in-out infinite}.snd-btn.play .eq i:nth-child(2){animation-delay:.25s}.snd-btn.play .eq i:nth-child(3){animation-delay:.5s}'+
      '@keyframes sndEq{0%,100%{height:4px}50%{height:14px}}'+
      '.snd-btn.ask{animation:sndAsk 2s ease-in-out infinite}@keyframes sndAsk{0%,100%{box-shadow:0 0 0 0 rgba(205,155,52,.55)}50%{box-shadow:0 0 0 8px rgba(205,155,52,0)}}'+
      '.snd-intro{position:absolute;left:24px;bottom:24px;z-index:3;border:1px solid rgba(230,199,127,.7);background:rgba(10,24,48,.55);color:#fff;font:600 13px "IBM Plex Sans KR","Noto Sans KR",sans-serif;padding:8px 16px;border-radius:999px;cursor:pointer;animation:sndAsk 2s ease-in-out infinite}'+
      '.snd-intro:hover{background:rgba(205,155,52,.45)}'+
      '@media (max-width:760px){.snd-btn{left:14px;bottom:14px;height:40px;min-width:40px}.snd-intro{left:16px;bottom:20px}}'+
      '@media print{.snd-btn{display:none}}';
    document.head.appendChild(s);
  }
  var IC_ON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  var IC_OFF='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/></svg>';
  function paint(){
    if(!btn)return;
    var playing=!off&&running()&&bgmOn, ask=!off&&!running();
    btn.className='snd-btn'+(playing?' play':'')+(ask?' ask':'');
    btn.innerHTML=off?IC_OFF+'<span>소리 꺼짐</span>':ask?IC_ON+'<span>소리 켜기</span>':IC_ON+'<span class="eq"><i></i><i></i><i></i></span>';
    btn.setAttribute('aria-label',off?'소리 켜기':'소리 끄기');
    btn.title=off?'눌러서 배경음악 켜기':ask?'눌러서 소리 듣기':'눌러서 소리 끄기';
    var ib=document.querySelector('.snd-intro');if(ib&&(off||running()))ib.remove();
  }
  function mount(){
    css();
    btn=document.createElement('button');btn.type='button';
    btn.addEventListener('click',function(e){e.stopPropagation();
      if(off)setOff(false); else if(!running())unlock(); else setOff(true);});
    document.body.appendChild(btn);
    /* 첫 연출 화면 위 「소리 켜고 보기」 (소리가 막혀 있을 때만) */
    var it=document.getElementById('intro');
    if(!it)startBgm(0); /* 첫 연출이 없는 화면은 바로 BGM */
    if(it&&!off){
      init();
      if(!running()){
        var ib=document.createElement('button');ib.type='button';ib.className='snd-intro';ib.innerHTML='🔊 소리 켜고 보기';
        ib.addEventListener('click',function(e){e.stopPropagation();unlock();ib.remove();});
        it.appendChild(ib);
      }
    }
    paint();
  }
  /* 화면 어디든 처음 누르면 소리 잠금 풀기 */
  ['pointerdown','keydown','touchend'].forEach(function(ev){
    document.addEventListener(ev,function h(){if(!off)unlock();},{capture:true,passive:true});
  });
  /* 다른 탭으로 가면 잠시 멈춤 */
  document.addEventListener('visibilitychange',function(){
    if(!ctx)return;if(document.hidden)ctx.suspend();else if(!off)ctx.resume().then&&ctx.resume().then(paint);
  });

  /* 소리 잠금 상태를 미리 확인 (재방문 등으로 바로 켜지는 브라우저도 있음) */
  try{init();if(ctx.state!=='running')ctx.resume();}catch(e){}

  window.SND={rumble:rumble,thunder:thunder,startBgm:startBgm,unlocked:running,setOff:setOff};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
