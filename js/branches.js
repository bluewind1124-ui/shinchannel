/* =========================================================
   신채널 지사 명단 · 지사 소개 자료
   - 명단 표에는 지사명 · 주소 · 지사장 · 전화번호만 보입니다.
   - 위치(lat, lng)를 넣으면 지도에 표시됩니다.
   - 빈 칸('')은 화면에 「확인 중」으로 나옵니다.
   - 출처: 신채널 연락처(확장).xlsx 「지사사무실주소」 시트 (2026.10.29)
     지사장 자택 · 총무 정보는 넣지 않습니다.
   - no: 명단 순서 (엑셀 구분 번호)
   ========================================================= */
window.BRANCHES = [
  {
    no: 4, id: 'heritage',
    name: '헤리티지 금융지사',
    en: 'HERITAGE FINANCE',
    addr: '서울특별시 광진구 천호대로 676, 2층(구의동)',
    ceo: '옥영훈',
    tel: '010-9192-9992',
    lat: 37.55077, lng: 127.08997,
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
  ,{ no: 1, id: 'bucheon', name: '부천지사', addr: '경기도 부천시 소사구 경인로 386, 1층 (소사본동, 엠제이타워)', ceo: '정원', tel: '010-3536-3097', lat: 37.48203, lng: 126.80371 }
  ,{ no: 2, id: 'ilsan', name: '일산지사', addr: '경기도 고양시 일산동구 호수로 358-39, 605호·606호(백석동, 동문굿모닝타워1차)', ceo: '김소윤', tel: '010-6522-8088', lat: 37.64037, lng: 126.78676 }
  ,{ no: 3, id: 'thedream', name: '더드림지사', addr: '서울특별시 동대문구 왕산로 15, 4층(신설동, 남서울빌딩)', ceo: '박용하', tel: '010-6345-2654', lat: 37.57653, lng: 127.0253 }
  ,{ no: 5, id: 'songpa', name: '송파지사', addr: '서울 송파구 중대로 109 대동빌딩 7층 701호', ceo: '고현전', tel: '010-6311-5118', lat: 37.50389, lng: 127.12996 }
  ,{ no: 6, id: 'chuncheon', name: '춘천지사', addr: '강원특별자치도 춘천시 안마산로 107-1, 제4층 제404호·405호(퇴계동, 에스엠프라자)', ceo: '이미순', tel: '010-5371-2854', lat: 37.84902, lng: 127.74763 }
  ,{ no: 7, id: 'uijeongbu', name: '의정부지사', addr: '경기도 의정부시 신흥로 220, 6층 (의정부동, 솔벗빌딩)', ceo: '정영진', tel: '010-7352-1863', lat: 37.73548, lng: 127.04345 }
  ,{ no: 8, id: 'jamsil', name: '잠실지사', addr: '서울 송파구 오금로 111, 11층 (방이동, 세기빌딩)', ceo: '김영국', tel: '010-9660-3370', lat: 37.5126, lng: 127.10825 }
  ,{
    no: 9, id: 'daejeon',
    name: '대전지사',
    en: 'DAEJEON BRANCH',
    addr: '대전광역시 서구 대덕대로 239, 11층',
    ceo: '성지훈',
    tel: '010-2040-2349',
    lat: 36.34163, lng: 127.37375,
    tagline: '대전의 중심, 둔산동에서',
    intro: '2026년 6월 새로 문을 연 한국보험금융 신채널 대전지사입니다. 100평 이상의 사무실에 52석 개인형 책상, 지점마다 프린터를 갖췄고, 원수사 설계·교육 매니저가 매일 오전 9시부터 오후 5시까지 지사에 상주합니다. 지하철역 5분 이내, 세종에서 25분 거리입니다.',
    philosophy: '실적을 강조하는 사무실이 아닌, 기본 UP에 충실한 사람 중심의 지사',
    video: 'img/daejeon/tour.mp4',
    poster: 'img/daejeon/poster.jpg',
    hero: 'img/daejeon/hero.jpg',   // 첫 화면 배경
    spaces: [
      { tag: 'WELCOME', t: '대전의 중심, 둔산동에서', d: '한국보험금융 신채널 대전지사에 오신 것을 환영합니다', img: 'img/daejeon/g01.jpg' },
      { tag: 'GRAND OPEN', t: '2026년 6월, 새롭게 문을 열었습니다', d: '대교빌딩 11층, 새로 꾸민 사무실', img: 'img/daejeon/g02.jpg' },
      { tag: 'ACCESS', t: '출퇴근도, 업무 동선도 가깝게', d: '지하철역 5분 이내 · 우체국 · 은행 1분 거리', img: 'img/daejeon/g03.jpg' },
      { tag: 'SUPPORT', t: '원수사 매니저가 매일 함께합니다', d: '설계 · 교육 매니저 지사 상주, 오전 9시 ~ 오후 5시', img: 'img/daejeon/g04.jpg' },
      { tag: 'WORKSPACE', t: '100평 이상, 탁 트인 사무실', d: '여유 있는 동선, 넓은 근무 환경', img: 'img/daejeon/g05.jpg' },
      { tag: 'WORKSPACE', t: '나만의 개인 업무 공간', d: '52석 개인형 책상 · 파티션 데스크', img: 'img/daejeon/g06.jpg' },
      { tag: 'CONVENIENCE', t: '지점마다 전용 프린터', d: '기다리지 않고, 내 자리 가까이에서 바로 출력', img: 'img/daejeon/g07.jpg' },
      { tag: 'CLEAN OFFICE', t: '매일 1~2회 청소', d: '언제나 깨끗한 사무실 환경', img: 'img/daejeon/g08.jpg' },
      { tag: 'CULTURE', t: '실적보다, 기본에 충실한 지사', d: '매일 9시 정시 교육 조회 · 2달마다 수요일 2부 조회', img: 'img/daejeon/g09.jpg' },
      { tag: 'MANAGEMENT', t: '혼자 두지 않는 3단계 관리', d: '지사장 1차 · 지점장 2차 · CM(코칭매니저) 3차', img: 'img/daejeon/g10.jpg' },
      { tag: 'TEAM', t: '밥 잘 사주는 선배가 많은 곳', d: '언니 · 오빠 · 누나 · 동생이 함께하는 지사', img: 'img/daejeon/g11.jpg' },
      { tag: 'NETWORK', t: '대전에서, 충청 전역으로', d: '당진 지점 개설 · 청주 예정 · 충청 전 지역 리크루팅', img: 'img/daejeon/g12.jpg' }
    ],
    closing: { t: '이제, 당신의 차례입니다', d: '당신의 내일을, 대전에서', img: 'img/daejeon/g13.jpg' }
  }
  ,{ no: 10, id: 'seosan', name: '서산지사', addr: '충청남도 서산시 호수공원3로 52 행운빌딩 7층', ceo: '김인태', tel: '010-4537-7910', lat: 36.77572, lng: 126.44724 }
  ,{ no: 11, id: 'therich', name: '더리치지사', addr: '서울 중구 퇴계로 324, 성우빌딩 7층', ceo: '김효정', tel: '010-2035-1613', lat: 37.56119, lng: 126.98823 }
  ,{ no: 12, id: 'acemullae', name: '에이스문래지사', addr: '서울시 영등포구 당산로41길 11, SKV1센터 W동 1312호', ceo: '심규훈', tel: '010-6286-1189', lat: 37.53091, lng: 126.89787 }
  ,{ no: 13, id: 'epercul', name: '에퍼컬지사', addr: '서울시 영등포구 문래동3가 55-20 에이스하이테크시티 1동 315호', ceo: '김미화', tel: '010-4712-0766', lat: 37.51702, lng: 126.89591 }
];
