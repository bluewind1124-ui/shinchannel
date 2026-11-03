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
  ,{
    no: 1, id: 'bucheon',
    name: '부천지사',
    en: 'BUCHEON BRANCH',
    addr: '경기도 부천시 소사구 경인로 386, 1층 (소사본동, 엠제이타워)',
    ceo: '정원',
    tel: '010-3536-3097',          // 기존 명단 번호 (PPT 대표번호: 031-207-8800)
    lat: 37.48203, lng: 126.80371,
    tagline: '당신은 당당한 전문가입니다',
    intro: '영업 스킬보다 사람과 문화를 먼저 생각하는 한국보험금융 신채널 부천지사입니다. 1호선·서해선 소사역 바로 옆에 있어 인천·부천·금천·구로 어디서든 오가기 좋고, 업무 공간과 교육장, 고객접견실, 미팅룸, 그린 라운지를 갖췄습니다. 신입은 기초 교육부터, 경력은 여러 보험사 상품과 좋은 문화 속에서 함께 성장합니다.',
    philosophy: '영업 스킬보다 사람과 문화를 먼저 생각하는 지사',
    video: 'img/bucheon/tour.mp4',
    poster: 'img/bucheon/poster.jpg',
    hero: 'img/bucheon/hero.jpg',   // 첫 화면 배경
    spaces: [
      { tag: 'WELCOME', t: '소사역 앞, 신채널 부천지사', d: '한국보험금융 신채널 부천지사에 오신 것을 환영합니다', img: 'img/bucheon/g01.jpg' },
      { tag: 'OUR VALUE', t: '사랑과 행복이 넘치는 지사', d: '영업 스킬보다 사람과 문화를 먼저 생각합니다', img: 'img/bucheon/g02.jpg' },
      { tag: 'CULTURE', t: '고마운 사람, 부천지사', d: '동료를 고마운 사람으로 대하는 문화', img: 'img/bucheon/g03.jpg' },
      { tag: 'WORKSPACE', t: '밝고 넓은 업무 공간', d: '개인 업무석과 게시판, 함께 일하는 사무실', img: 'img/bucheon/g04.jpg' },
      { tag: 'VISION', t: '당신이 꿈꾸는 행복한 미래', d: '고객, 설계사, 가족까지 모두의 내일을 함께 만듭니다', img: 'img/bucheon/g05.jpg' },
      { tag: 'GREEN LOUNGE', t: '잠시 쉬어 가는 창가', d: '초록이 가득한 그린 라운지', img: 'img/bucheon/g06.jpg' },
      { tag: 'CONSULTING', t: '고객과 마주 앉는 상담 공간', d: '고객접견실, 고객을 자신 있게 지사로 초대하세요', img: 'img/bucheon/g07.jpg' },
      { tag: 'LOUNGE', t: '1:1 맞춤 무료상담', d: '보험금 청구 상담 · 다이렉트 자동차보험 비교견적', img: 'img/bucheon/g08.jpg' },
      { tag: 'MEETING ROOM', t: '팀 미팅과 동료 상담', d: '머리를 맞대고 함께 고민하는 미팅룸', img: 'img/bucheon/g09.jpg' },
      { tag: 'TOGETHER', t: '이름을 불러 주는 동료들', d: '차 한 잔 나누며 서로를 응원하는 자리', img: 'img/bucheon/g10.jpg' },
      { tag: 'EDUCATION', t: '상품 · 실무 교육 전용 공간', d: '처음 시작하는 분도 기초부터 배웁니다', img: 'img/bucheon/g11.jpg' },
      { tag: 'TRAINING', t: '정기 교육과 화상 조회', d: '상품 판매 포인트와 실무를 꾸준히 공유합니다', img: 'img/bucheon/g12.jpg' }
    ],
    closing: { t: '이제, 당신의 차례입니다', d: '당신의 내일을, 부천에서', img: 'img/bucheon/g13.jpg' }
  }
  ,{ no: 2, id: 'ilsan', name: '일산지사', addr: '경기도 고양시 일산동구 호수로 358-39, 605호·606호(백석동, 동문굿모닝타워1차)', ceo: '김소윤', tel: '010-6522-8088', lat: 37.64037, lng: 126.78676 }
  ,{ no: 3, id: 'thedream', name: '더드림지사', addr: '서울특별시 동대문구 왕산로 15, 4층(신설동, 남서울빌딩)', ceo: '박용하', tel: '010-6345-2654', lat: 37.57653, lng: 127.0253 }
  ,{
    no: 5, id: 'songpa',
    name: '송파지사',
    en: 'SONGPA BRANCH',
    addr: '서울 송파구 중대로 109 대동빌딩 7층 701호',
    ceo: '고현전',
    tel: '010-6311-5118',
    lat: 37.50389, lng: 127.12996,
    tagline: '함께 성장하고 함께 성공하는 지사',
    intro: '함께 성장하고 함께 성공하는 한국보험금융 신채널 송파지사입니다. 탁 트인 창가 업무 공간에서 영업에만 집중할 수 있도록 사무 업무는 지사가 든든하게 뒷받침하고, 교육전문가가 맡는 단계별 교육으로 어렵지 않게 배워 현장에서 바로 활용합니다. 작은 정보와 노하우도 아낌없이 나누고, 탓하지 않고 서로 격려하는 문화를 지켜 갑니다.',
    philosophy: '일하는 문화, 함께하는 문화, 긍정과 배려의 문화',
    video: 'img/songpa/tour.mp4',
    poster: 'img/songpa/poster.jpg',
    hero: 'img/songpa/hero.jpg',   // 첫 화면 배경
    spaces: [
      { tag: 'WELCOME', t: '한국보험금융 신채널 송파지사', d: '함께 성장하고 함께 성공하는 지사에 오신 것을 환영합니다', img: 'img/songpa/g01.jpg' },
      { tag: 'LOCATION', t: '인프라가 잘 갖춰진 주변 환경', d: '대동빌딩 7층, 쾌적하고 편리한 환경에서 근무합니다', img: 'img/songpa/g02.jpg' },
      { tag: 'WORKSPACE', t: '오직 업무에만 집중하는 공간', d: '탁 트인 창가 업무 공간, 밝은 분위기', img: 'img/songpa/g03.jpg' },
      { tag: 'SUPPORT', t: '최고의 사무지원', d: '영업에만 집중하도록 사무 업무는 지사가 든든하게', img: 'img/songpa/g04.jpg' },
      { tag: 'EDUCATION', t: '체계적인 교육시스템', d: '교육전문가가 맡는 쉽고 완성도 높은 단계별 교육', img: 'img/songpa/g05.jpg' },
      { tag: 'TOGETHER', t: '서로를 배려하고 나누는 문화', d: '작은 정보와 노하우도 아낌없이 나누며 함께 성장합니다', img: 'img/songpa/g06.jpg' },
      { tag: 'POSITIVE', t: '“긍정의 힘이 미래를 바꾸고 성공을 만든다”', d: '긍정적 에너지와 열정으로 서로 격려하는 문화', img: 'img/songpa/g07.jpg' }
    ],
    closing: { t: '이제, 당신의 차례입니다', d: '당신의 내일을, 송파에서', img: 'img/songpa/g08.jpg' }
  }
  ,{ no: 6, id: 'chuncheon', name: '춘천지사', addr: '강원특별자치도 춘천시 안마산로 107-1, 제4층 제404호·405호(퇴계동, 에스엠프라자)', ceo: '이미순', tel: '010-5371-2854', lat: 37.84902, lng: 127.74763 }
  ,{ no: 7, id: 'uijeongbu', name: '의정부지사', addr: '경기도 의정부시 신흥로 220, 6층 (의정부동, 솔벗빌딩)', ceo: '정영진', tel: '010-7352-1863', lat: 37.73548, lng: 127.04345 }
  ,{
    no: 8, id: 'jamsil',
    name: '잠실지사',
    en: 'JAMSIL BRANCH',
    addr: '서울 송파구 오금로 111, 11층 (방이동, 세기빌딩)',
    ceo: '김영국',
    tel: '010-9660-3370',          // 기존 명단 번호 (PPT 지사 번호: 02-6956-6763)
    lat: 37.5126, lng: 127.10825,
    tagline: '송파의 중심, 잠실 석촌호수 입지',
    intro: '석촌호수 바로 앞, 2호선·8호선·9호선이 지나는 송파의 중심에 자리한 한국보험금융 신채널 잠실지사입니다. 116평 규모의 단독 사용 사무실에 업무 책상 41석, 독립된 대규모 교육장과 TA ROOM, 회의실, 임원실, 석촌호수뷰 직원 휴게실을 갖췄습니다. 정례화된 조회 교육과 상품 특화 학습회, 1:1 고객 PT, 지사장·교육매니저 동반 영업, 법인·VVIP 고객 세미나로 설계사의 영업을 지원합니다.',
    philosophy: '설계사를 위한 최상의 환경, 최상의 영업 지원',
    video: 'img/jamsil/tour.mp4',
    poster: 'img/jamsil/poster.jpg',
    hero: 'img/jamsil/hero.jpg',   // 첫 화면 배경
    spaces: [
      { tag: 'WELCOME', t: '송파의 중심, 잠실지사', d: '한국보험금융 신채널 잠실지사에 오신 것을 환영합니다', img: 'img/jamsil/g01.jpg' },
      { tag: 'WORKSPACE', t: '116평 단독 사용 사무실', d: '업무 책상 총 41석, 넓은 책상 간격', img: 'img/jamsil/g02.jpg' },
      { tag: 'WORKSPACE', t: '넓고 쾌적한 업무 공간', d: '여유 있는 동선, 창가를 따라 이어지는 업무석', img: 'img/jamsil/g03.jpg' },
      { tag: 'EDUCATION', t: '독립된 대규모 교육장', d: '정례화된 조회 교육과 상품 특화 학습회', img: 'img/jamsil/g04.jpg' },
      { tag: 'MEETING ROOM', t: '독립 공간 회의실', d: '1:1 고객 PT도 편안하게', img: 'img/jamsil/g05.jpg' },
      { tag: 'FOCUS', t: '분리된 TA ROOM', d: '독립된 공간에서 통화에만 집중', img: 'img/jamsil/g06.jpg' },
      { tag: 'EXECUTIVE', t: '고능률 설계사를 위한 분리된 임원실', d: '마케팅 임원들을 위한 독립 공간', img: 'img/jamsil/g07.jpg' },
      { tag: 'EXECUTIVE', t: '창밖으로 석촌호수가 보이는 방', d: '임원실에서 바라보는 호수와 도심', img: 'img/jamsil/g08.jpg' },
      { tag: 'REFRESH', t: '석촌호수뷰 직원 휴게실', d: '일만큼 휴식도 중요하니까', img: 'img/jamsil/g09.jpg' },
      { tag: 'LOUNGE', t: '잠깐 쉬어 가는 테이블', d: '차 한 잔, 간식 한 입의 여유', img: 'img/jamsil/g10.jpg' },
      { tag: 'VIEW', t: '업무 공간이 힐링이 되는 곳', d: '창밖으로 펼쳐지는 석촌호수', img: 'img/jamsil/g11.jpg' },
      { tag: 'PARTY', t: 'VIP 고객 · 후보자 초대 와인 파티', d: '결국 설계사들을 위한 자리', img: 'img/jamsil/g12.jpg' },
      { tag: 'REWARD', t: '열심히 일하고, 보상도 확실히', d: '잠실지사 분기별 행사', img: 'img/jamsil/g13.jpg' }
    ],
    closing: { t: '이제, 당신의 차례입니다', d: '당신의 내일을, 잠실에서', img: 'img/jamsil/g14.jpg' }
  }
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
  ,{
    no: 10, id: 'seosan',
    name: '서산지사',
    en: 'SEOSAN BRANCH',
    addr: '충청남도 서산시 호수공원3로 52 행운빌딩 7층',
    ceo: '김인태',
    tel: '010-4537-7910',          // 기존 명단 번호 (지사 대표번호: 041-429-9234)
    lat: 36.77572, lng: 126.44724,
    tagline: '매달 성장하는 가족 같은 지사',
    intro: '2026년 5월 문을 연 한국보험금융 신채널 서산지사입니다. 서산 호수공원 중심, 행운빌딩 7층에 자리해 호수공원을 바라보며 일합니다. 2027년 상반기에는 호수공원 초록광장(2층)과 430대 규모 주차장(1층~지하 1층)이 완공될 예정입니다. 대표번호 041-429-9234.',
    philosophy: '매달 성장하는 가족 같은 지사',
    video: 'img/seosan/tour.mp4',
    poster: 'img/seosan/poster.jpg',
    hero: 'img/seosan/hero.jpg',   // 첫 화면 배경
    spaces: [
      { tag: 'WELCOME', t: '매달 성장하는 가족 같은 지사', d: '2026년 5월 문을 연 한국보험금융 신채널 서산지사', img: 'img/seosan/g01.jpg' },
      { tag: 'LOCATION', t: '호수공원 중심, 행운빌딩 7층', d: '2027년 상반기 초록광장(2층) · 430대 주차장 완공 예정 (조감도)', img: 'img/seosan/infra.jpg' },
      { tag: 'WORKSPACE', t: '햇살 드는 넓은 사무실', d: '창가를 따라 이어지는 개인 업무석', img: 'img/seosan/g02.jpg' },
      { tag: 'OPEN OFFICE', t: '함께 일하는 오픈 오피스', d: '파티션 데스크 · 개인 수납장 · 화이트보드', img: 'img/seosan/g03.jpg' },
      { tag: 'TEAM', t: '매달 함께 성장하는 동료들', d: '가족 같은 분위기 속에서 일합니다', img: 'img/seosan/g04.jpg' },
      { tag: 'EDUCATION', t: '함께 보고, 함께 배우는 공간', d: '프로젝터 · 스크린을 갖춘 사무실', img: 'img/seosan/g05.jpg' },
      { tag: 'LEADERSHIP', t: '지사장과 마주 앉는 자리', d: '지사장실 상담 테이블', img: 'img/seosan/g06.jpg' },
      { tag: 'MEETING', t: '대형 화면을 갖춘 상담 테이블', d: '자료를 함께 보며 이야기 나누는 자리', img: 'img/seosan/g07.jpg' },
      { tag: 'REFRESH', t: '잠깐의 여유, 탕비실', d: '커피 · 전자레인지 · 냉장고 · 정수기', img: 'img/seosan/g08.jpg' }
    ],
    closing: { t: '이제, 당신의 차례입니다', d: '당신의 내일을, 서산에서', img: 'img/seosan/g09.jpg' }
  }
  ,{ no: 11, id: 'therich', name: '더리치지사', addr: '서울 중구 퇴계로 324, 성우빌딩 7층', ceo: '김효정', tel: '010-2035-1613', lat: 37.56119, lng: 126.98823 }
  ,{ no: 12, id: 'acemullae', name: '에이스문래지사', addr: '서울시 영등포구 당산로41길 11, SKV1센터 W동 1312호', ceo: '심규훈', tel: '010-6286-1189', lat: 37.53091, lng: 126.89787 }
  ,{ no: 13, id: 'epercul', name: '에퍼컬지사', addr: '서울시 영등포구 문래동3가 55-20 에이스하이테크시티 1동 315호', ceo: '김미화', tel: '010-4712-0766', lat: 37.51702, lng: 126.89591 }
];
