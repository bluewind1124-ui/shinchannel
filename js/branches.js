/* =========================================================
   신채널 지사 명단 · 지사 소개 자료
   - 명단 표에는 지사명 · 주소 · 지사장 · 전화번호만 보입니다.
   - 위치(lat, lng)를 넣으면 지도에 표시됩니다.
   - 빈 칸('')은 화면에 「확인 중」으로 나옵니다.
   ========================================================= */
window.BRANCHES = [
  {
    id: 'heritage',
    name: '헤리티지 금융지사',
    en: 'HERITAGE FINANCE',
    addr: '',      // 지사 주소 (확인 필요)
    ceo: '',       // 지사장 이름 (확인 필요)
    tel: '',       // 전화번호 (확인 필요)
    lat: null, lng: null,   // 지도 위치 (주소 확인 후 입력)
    tagline: '당신의 커리어가 시작되는 곳',
    intro: '한국보험금융 직영채널 헤리티지 지사입니다. 햇살 가득한 오픈 오피스와 개인 업무 공간, 교육·세미나실, 독립 TA ROOM, 고객 상담실까지. FC가 영업에만 집중할 수 있는 공간을 갖췄습니다.',
    philosophy: '나의 전문성은 고객을 위한 최소한의 배려다',
    video: 'img/heritage/tour.mp4',
    poster: 'img/heritage/poster.jpg',
    hero: 'img/heritage/hero.jpg',   // 첫 화면 배경
    spaces: [
      { tag: 'WELCOME', t: '당신의 커리어가 시작되는 곳', d: '헤리티지 금융지사에 오신 것을 환영합니다', img: 'img/heritage/g01.jpg' },
      { tag: 'OUR PHILOSOPHY', t: '고객을 위한 최소한의 배려', d: '헤리티지 금융지사가 지켜 가는 원칙', img: 'img/heritage/g02.jpg' },
      { tag: 'WORKSPACE', t: '햇살 가득한 오픈 오피스', d: '탁 트인 창가, 쾌적한 업무 환경', img: 'img/heritage/g03.jpg' },
      { tag: 'WORKSPACE', t: '나만의 개인 업무 공간', d: '파티션 데스크 · 개인 수납장 · 사무 장비 완비', img: 'img/heritage/g04.jpg' },
      { tag: 'TEAM', t: '함께 성장하는 동료들', d: '같은 목표를 향해 달리는 FC들의 공간', img: 'img/heritage/g05.jpg' },
      { tag: 'EDUCATION', t: '체계적인 교육과 세미나', d: '프로젝터 · 스크린을 갖춘 전용 회의실. 신입부터 리더까지, 단계별 육성 시스템', img: 'img/heritage/g06.jpg' },
      { tag: 'FOCUS', t: '집중을 위한 독립 TA ROOM', d: '고객과의 소중한 통화에만 몰입하세요', img: 'img/heritage/g07.jpg' },
      { tag: 'SUPPORT', t: '설계 매니저 전용 존', d: '든든한 설계 지원이 영업의 힘이 됩니다', img: 'img/heritage/g08.jpg' },
      { tag: 'COACHING', t: '영업이사 · 교육팀장 밀착 코칭', d: '혼자가 아닌, 함께 만드는 성과', img: 'img/heritage/g09.jpg' },
      { tag: 'CONSULTING', t: '품격 있는 고객 상담실', d: '고객에게 신뢰를 주는 프라이빗 공간', img: 'img/heritage/g10.jpg' },
      { tag: 'LEADERSHIP', t: '다음 리더는, 바로 당신', d: '성장의 길이 열려 있는 조직', img: 'img/heritage/g11.jpg' },
      { tag: 'REFRESH', t: '잠깐의 여유, 티타임 존', d: '창가 햇살 아래 커피 한 잔', img: 'img/heritage/g12.jpg' }
    ],
    closing: { t: '이제, 당신의 차례입니다', d: '당신의 내일을, 헤리티지에서', img: 'img/heritage/g13.jpg' }
  }
];
