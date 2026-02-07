// State Management
let state = {
    waitList: [
        { id: 101, title: '눈에 갇힌 외딴 산장에서', author: '히가시노 게이고', publishDate: '1992-01-01', classCode: '800', category: '관심작가' },
        { id: 102, title: '아름다운 흉기', author: '히가시노 게이고', publishDate: '1992-01-01', classCode: '800', category: '관심작가' },
        { id: 103, title: '동급생', author: '히가시노 게이고', publishDate: '1993-01-01', classCode: '800', category: '관심작가' },
        { id: 104, title: '분신', author: '히가시노 게이고', publishDate: '1993-01-01', classCode: '800', category: '관심작가' },
        { id: 105, title: '시노부 선생님, 안녕!', author: '히가시노 게이고', publishDate: '1993-01-01', classCode: '800', category: '관심작가' },
        { id: 106, title: '수상한 사람들', author: '히가시노 게이고', publishDate: '1994-01-01', classCode: '800', category: '관심작가' },
        { id: 107, title: '옛날에 내가 죽은 집', author: '히가시노 게이고', publishDate: '1994-01-01', classCode: '800', category: '관심작가' },
        { id: 108, title: '무지개를 연주하는 소년', author: '히가시노 게이고', publishDate: '1994-01-01', classCode: '800', category: '관심작가' },
        { id: 109, title: '파라렐 월드 러브 스토리', author: '히가시노 게이고', publishDate: '1995-01-01', classCode: '800', category: '관심작가' },
        { id: 110, title: '그 시절 우리는 바보였습니다', author: '히가시노 게이고', publishDate: '1995-01-01', classCode: '800', category: '관심작가' },
        { id: 111, title: '괴소소설', author: '히가시노 게이고', publishDate: '1995-01-01', classCode: '800', category: '관심작가' },
        { id: 112, title: '천공의 벌', author: '히가시노 게이고', publishDate: '1995-01-01', classCode: '800', category: '관심작가' },
        { id: 113, title: '명탐정의 규칙', author: '히가시노 게이고', publishDate: '1996-01-01', classCode: '800', category: '관심작가' },
        { id: 114, title: '둘 중 누군가 그녀를 죽였다', author: '히가시노 게이고', publishDate: '1996-01-01', classCode: '800', category: '관심작가' },
        { id: 115, title: '독소소설', author: '히가시노 게이고', publishDate: '1996-01-01', classCode: '800', category: '관심작가' },
        { id: 116, title: '악의', author: '히가시노 게이고', publishDate: '1996-01-01', classCode: '800', category: '관심작가' },
        { id: 117, title: '명탐정의 저주', author: '히가시노 게이고', publishDate: '1996-01-01', classCode: '800', category: '관심작가' },
        { id: 118, title: '탐정 갈릴레오', author: '히가시노 게이고', publishDate: '1998-01-01', classCode: '800', category: '관심작가' },
        { id: 119, title: '비밀', author: '히가시노 게이고', publishDate: '1998-01-01', classCode: '800', category: '관심작가' },
        { id: 120, title: '내가 그를 죽였다', author: '히가시노 게이고', publishDate: '1999-01-01', classCode: '800', category: '관심작가' },
        { id: 121, title: '백야행', author: '히가시노 게이고', publishDate: '1999-01-01', classCode: '800', category: '관심작가' },
        { id: 122, title: '거짓말, 딱 한 개만 더', author: '히가시노 게이고', publishDate: '2000-01-01', classCode: '800', category: '관심작가' },
        { id: 123, title: '예지몽', author: '히가시노 게이고', publishDate: '2000-01-01', classCode: '800', category: '관심작가' },
        { id: 124, title: '짝사랑', author: '히가시노 게이고', publishDate: '2001-01-01', classCode: '800', category: '관심작가' },
        { id: 125, title: '추리소설가의 살인사건', author: '히가시노 게이고', publishDate: '2001-01-01', classCode: '800', category: '관심작가' },
        { id: 126, title: '레이크사이드', author: '히가시노 게이고', publishDate: '2002-01-01', classCode: '800', category: '관심작가' },
        { id: 127, title: '아들 도키오', author: '히가시노 게이고', publishDate: '2002-01-01', classCode: '800', category: '관심작가' },
        { id: 128, title: '게임의 이름은 유괴', author: '히가시노 게이고', publishDate: '2002-01-01', classCode: '800', category: '관심작가' },
        { id: 129, title: '편지', author: '히가시노 게이고', publishDate: '2003-01-01', classCode: '800', category: '관심작가' },
        { id: 130, title: '살인의 문', author: '히가시노 게이고', publishDate: '2003-01-01', classCode: '800', category: '관심작가' },
        { id: 131, title: '비정근', author: '히가시노 게이고', publishDate: '2003-01-01', classCode: '800', category: '관심작가' },
        { id: 132, title: '환야', author: '히가시노 게이고', publishDate: '2004-01-01', classCode: '800', category: '관심작가' },
        { id: 133, title: '방황하는 칼날', author: '히가시노 게이고', publishDate: '2004-01-01', classCode: '800', category: '관심작가' },
        { id: 134, title: '흑소소설', author: '히가시노 게이고', publishDate: '2005-01-01', classCode: '800', category: '관심작가' },
        { id: 135, title: '용의자 X의 헌신', author: '히가시노 게이고', publishDate: '2005-01-01', classCode: '800', category: '관심작가' },
        { id: 136, title: '꿈은 토리노를 달리고', author: '히가시노 게이고', publishDate: '2006-01-01', classCode: '800', category: '관심작가' },
        { id: 137, title: '붉은 손가락', author: '히가시노 게이고', publishDate: '2006-01-01', classCode: '800', category: '관심작가' },
        { id: 138, title: '사명과 영혼의 경계', author: '히가시노 게이고', publishDate: '2006-01-01', classCode: '800', category: '관심작가' },
        { id: 139, title: '밤에 피는 해바라기', author: '히가시노 게이고', publishDate: '2007-01-01', classCode: '800', category: '관심작가' },
        { id: 140, title: '다잉 아이', author: '히가시노 게이고', publishDate: '2007-01-01', classCode: '800', category: '관심작가' },
        { id: 141, title: '유성의 인연', author: '히가시노 게이고', publishDate: '2008-01-01', classCode: '800', category: '관심작가' },
        { id: 142, title: '갈릴레오의 고뇌', author: '히가시노 게이고', publishDate: '2008-01-01', classCode: '800', category: '관심작가' },
        { id: 143, title: '성녀의 구제', author: '히가시노 게이고', publishDate: '2008-01-01', classCode: '800', category: '관심작가' },
        { id: 144, title: '패러독스 13', author: '히가시노 게이고', publishDate: '2009-01-01', classCode: '800', category: '관심작가' },
        { id: 145, title: '신참자', author: '히가시노 게이고', publishDate: '2009-01-01', classCode: '800', category: '관심작가' },
        { id: 146, title: '뻐꾸기 알은 누구의 것인가', author: '히가시노 게이고', publishDate: '2010-01-01', classCode: '800', category: '관심작가' },
        { id: 147, title: '백은의 잭', author: '히가시노 게이고', publishDate: '2010-01-01', classCode: '800', category: '관심작가' },
        { id: 148, title: '기린의 날개', author: '히가시노 게이고', publishDate: '2011-01-01', classCode: '800', category: '관심작가' },
        { id: 149, title: '한여름의 방정식', author: '히가시노 게이고', publishDate: '2011-01-01', classCode: '800', category: '관심작가' },
        { id: 150, title: '매스커레이드 호텔', author: '히가시노 게이고', publishDate: '2011-01-01', classCode: '800', category: '관심작가' },
        { id: 151, title: '허상의 어릿광대', author: '히가시노 게이고', publishDate: '2012-01-01', classCode: '800', category: '관심작가' },
        { id: 152, title: '플래티나 데이터', author: '히가시노 게이고', publishDate: '2012-01-01', classCode: '800', category: '관심작가' },
        { id: 153, title: '몽환화', author: '히가시노 게이고', publishDate: '2013-01-01', classCode: '800', category: '관심작가' },
        { id: 154, title: '기도의 막이 내릴 때', author: '히가시노 게이고', publishDate: '2013-01-01', classCode: '800', category: '관심작가' },
        { id: 155, title: '왜소소설', author: '히가시노 게이고', publishDate: '2012-01-01', classCode: '800', category: '관심작가' },
        { id: 156, title: '공허한 십자가', author: '히가시노 게이고', publishDate: '2014-01-01', classCode: '800', category: '관심작가' },
        { id: 157, title: '인어가 잠든 집', author: '히가시노 게이고', publishDate: '2015-01-01', classCode: '800', category: '관심작가' },
        { id: 158, title: '라플라스의 마녀', author: '히가시노 게이고', publishDate: '2015-01-01', classCode: '800', category: '관심작가' },
        { id: 159, title: '위험한 비너스', author: '히가시노 게이고', publishDate: '2016-01-01', classCode: '800', category: '관심작가' },
        { id: 160, title: '질풍론도', author: '히가시노 게이고', publishDate: '2013-01-01', classCode: '800', category: '관심작가' },
        { id: 161, title: '연애의 행방', author: '히가시노 게이고', publishDate: '2016-01-01', classCode: '800', category: '관심작가' },
        { id: 162, title: '매스커레이드 이브', author: '히가시노 게이고', publishDate: '2014-01-01', classCode: '800', category: '관심작가' },
        { id: 163, title: '나미야 잡화점의 기적', author: '히가시노 게이고', publishDate: '2012-01-01', classCode: '800', category: '관심작가' },
        { id: 164, title: '마력의 태동', author: '히가시노 게이고', publishDate: '2018-01-01', classCode: '800', category: '관심작가' },
        { id: 165, title: '침묵의 퍼레이드', author: '히가시노 게이고', publishDate: '2018-01-01', classCode: '800', category: '관심작가' },
        { id: 166, title: '희망의 끈', author: '히가시노 게이고', publishDate: '2019-01-01', classCode: '800', category: '관심작가' },
        { id: 167, title: '매스커레이드 나이트', author: '히가시노 게이고', publishDate: '2017-01-01', classCode: '800', category: '관심작가' },
        { id: 168, title: '녹나무의 파수꾼', author: '히가시노 게이고', publishDate: '2020-03-01', classCode: '800', category: '관심작가' },
        { id: 169, title: '블랙 쇼맨과 이름 없는 마을의 살인', author: '히가시노 게이고', publishDate: '2020-11-01', classCode: '800', category: '관심작가' },
        { id: 170, title: '백조와 박쥐', author: '히가시노 게이고', publishDate: '2021-04-01', classCode: '800', category: '관심작가' },
        { id: 171, title: '투명한 나선', author: '히가시노 게이고', publishDate: '2021-09-01', classCode: '800', category: '관심작가' },
        { id: 172, title: '마녀와 보낸 7일', author: '히가시노 게이고', publishDate: '2023-03-01', classCode: '800', category: '관심작가' },
        { id: 173, title: '가공범', author: '히가시노 게이고', publishDate: '2024-01-01', classCode: '800', category: '관심작가' },
        // Batch 2 - Various Authors
        { id: 201, title: '담장 너머 베베나', author: '단요', publishDate: '2023-01-01', classCode: '800', category: '관심작가' },
        { id: 202, title: '트윈: 대체 가능', author: '단요', publishDate: '2023-01-01', classCode: '800', category: '관심작가' },
        { id: 203, title: '캐리커처', author: '단요', publishDate: '2024-01-01', classCode: '800', category: '관심작가' },
        { id: 204, title: '우리가 열 번을 나고 죽을 때', author: '성해나', publishDate: '2023-01-01', classCode: '800', category: '관심작가' },
        { id: 205, title: '내 여자의 열매', author: '한강', publishDate: '2000-01-01', classCode: '800', category: '관심작가' },
        { id: 206, title: '그대의 차가운 손', author: '한강', publishDate: '2002-01-01', classCode: '800', category: '관심작가' },
        { id: 207, title: '붉은 꽃 이야기', author: '한강', publishDate: '2003-01-01', classCode: '800', category: '관심작가' },
        { id: 208, title: '가만가만 부르는 노래', author: '한강', publishDate: '2007-01-01', classCode: '800', category: '관심작가' },
        { id: 209, title: '바람이 분다, 가라', author: '한강', publishDate: '2010-01-01', classCode: '800', category: '관심작가' },
        { id: 210, title: '희랍어 시간', author: '한강', publishDate: '2011-01-01', classCode: '800', category: '관심작가' },
        { id: 211, title: '노랑무늬영원', author: '한강', publishDate: '2012-01-01', classCode: '800', category: '관심작가' },
        { id: 212, title: '서랍에 저녁을 넣어 두었다', author: '한강', publishDate: '2013-01-01', classCode: '800', category: '관심작가' },
        { id: 213, title: '흰', author: '한강', publishDate: '2016-01-01', classCode: '800', category: '관심작가' },
        { id: 214, title: '빛과 실', author: '한강', publishDate: '2013-01-01', classCode: '800', category: '관심작가' },
        { id: 215, title: '죽지 않고 어른이 되는 법', author: '강지영', publishDate: '2022-01-01', classCode: '800', category: '관심작가' },
        { id: 216, title: '거의 황홀한 순간', author: '강지영', publishDate: '2021-01-01', classCode: '800', category: '관심작가' },
        { id: 217, title: '살인자의 쇼핑몰', author: '강지영', publishDate: '2020-01-01', classCode: '800', category: '관심작가' },
        { id: 218, title: '하품은 맛있다', author: '강지영', publishDate: '2019-01-01', classCode: '800', category: '관심작가' },
        { id: 219, title: '인간보다 인간적인', author: '강지영', publishDate: '2018-01-01', classCode: '800', category: '관심작가' },
        { id: 220, title: '양의 실수', author: '강지영', publishDate: '2017-01-01', classCode: '800', category: '관심작가' },
        { id: 221, title: '기린 위의 가마괴', author: '강지영', publishDate: '2016-01-01', classCode: '800', category: '관심작가' },
        { id: 222, title: '잃어버린 이름들의 낙원', author: '허주은', publishDate: '2023-01-01', classCode: '800', category: '관심작가' },
        { id: 223, title: '위저드 베이커리', author: '구병모', publishDate: '2009-01-01', classCode: '800', category: '관심작가' },
        { id: 224, title: '고의는 아니지만', author: '구병모', publishDate: '2011-01-01', classCode: '800', category: '관심작가' },
        { id: 225, title: '방주로 오세요', author: '구병모', publishDate: '2012-01-01', classCode: '800', category: '관심작가' },
        { id: 226, title: '피그말리온 아이들', author: '구병모', publishDate: '2012-01-01', classCode: '800', category: '관심작가' },
        { id: 227, title: '그것이 나만은 아니기를', author: '구병모', publishDate: '2015-01-01', classCode: '800', category: '관심작가' },
        { id: 228, title: '빨간 구두당', author: '구병모', publishDate: '2015-01-01', classCode: '800', category: '관심작가' },
        { id: 229, title: '한 스푼의 시간', author: '구병모', publishDate: '2016-01-01', classCode: '800', category: '관심작가' },
        { id: 230, title: '네 이웃의 식탁', author: '구병모', publishDate: '2018-01-01', classCode: '800', category: '관심작가' },
        { id: 231, title: '단 하나의 문장', author: '구병모', publishDate: '2018-01-01', classCode: '800', category: '관심작가' },
        { id: 232, title: '버드 스트라이크', author: '구병모', publishDate: '2019-01-01', classCode: '800', category: '관심작가' },
        { id: 233, title: '파쇄', author: '구병모', publishDate: '2023-01-01', classCode: '800', category: '관심작가' },
        { id: 234, title: '단지 소설일 뿐이네', author: '구병모', publishDate: '2024-01-01', classCode: '800', category: '관심작가' },
        { id: 235, title: '철창', author: '구병모', publishDate: '2025-01-01', classCode: '800', category: '관심작가' },
        { id: 236, title: '우리 집에 왜 왔니?', author: '정해연', publishDate: '2023-01-01', classCode: '800', category: '관심작가' },
        { id: 237, title: '누굴 죽였을까', author: '정해연', publishDate: '2023-01-01', classCode: '800', category: '관심작가' },
        { id: 238, title: '2인조', author: '정해연', publishDate: '2022-01-01', classCode: '800', category: '관심작가' },
        { id: 239, title: '드라이브', author: '정해연', publishDate: '2021-01-01', classCode: '800', category: '관심작가' },
        { id: 240, title: '매듭의 끝', author: '정해연', publishDate: '2020-01-01', classCode: '800', category: '관심작가' },
        { id: 241, title: '엄마가 죽었다.', author: '정해연', publishDate: '2019-01-01', classCode: '800', category: '관심작가' },
        { id: 242, title: '유괴의 날', author: '정해연', publishDate: '2019-01-01', classCode: '800', category: '관심작가' },
        { id: 243, title: '구원의 날', author: '정해연', publishDate: '2020-01-01', classCode: '800', category: '관심작가' },
        { id: 244, title: '선택의 날', author: '정해연', publishDate: '2021-01-01', classCode: '800', category: '관심작가' },
        // Batch 2 - Science & Philosophy
        { id: 301, title: '모든 순간의 물리학', author: '카를로 로벨리', publishDate: '2016-01-01', classCode: '400', category: '물리학' },
        { id: 302, title: '시간은 흐르지 않는다', author: '카를로 로벨리', publishDate: '2017-01-01', classCode: '400', category: '물리학' },
        { id: 303, title: '나 없이 존재하지 않는 세상', author: '카를로 로벨리', publishDate: '2021-01-01', classCode: '400', category: '물리학' },
        { id: 304, title: '세상물정의 물리학', author: '김범준', publishDate: '2015-01-01', classCode: '400', category: '물리학' },
        { id: 305, title: '물리와 철학', author: '베르너 하이젠베르크', publishDate: '1958-01-01', classCode: '400', category: '물리학' },
        { id: 306, title: '우주에서 가장 위대한 생각들', author: '숀 캐럴', publishDate: '2022-01-01', classCode: '400', category: '물리학' },
        { id: 307, title: '양자와 장', author: '숀 캐럴', publishDate: '2019-01-01', classCode: '400', category: '물리학' },
        { id: 308, title: '날마다 천체물리', author: '닐 디그래스 타이슨', publishDate: '2017-01-01', classCode: '400', category: '물리학' },
        { id: 309, title: '대통령을 위한 물리학', author: 'Richard A. Muller', publishDate: '2008-01-01', classCode: '400', category: '물리학' },
        { id: 310, title: '떨림과 울림', author: '김상욱', publishDate: '2018-01-01', classCode: '400', category: '물리학' },
        { id: 311, title: '상대성이론', author: '아인슈타인', publishDate: '1916-01-01', classCode: '400', category: '물리학' },
        { id: 312, title: '우주의 구조', author: '브라이언 그린', publishDate: '2004-01-01', classCode: '400', category: '물리학' },
        { id: 313, title: '그림으로 보는 시간의 역사', author: '스티븐 호킹', publishDate: '1996-01-01', classCode: '400', category: '물리학' },
        { id: 314, title: '시간의 역사', author: '스티븐 호킹', publishDate: '1988-01-01', classCode: '400', category: '물리학' },
        { id: 315, title: '양자혁명', author: '만지트 쿠마르', publishDate: '2008-01-01', classCode: '400', category: '물리학' },
        { id: 316, title: '단 하나의 방정식', author: '미치오 카쿠', publishDate: '2021-01-01', classCode: '400', category: '물리학' },
        { id: 317, title: 'AI는 인간을 먹고 자란다', author: '마크 그레이엄', publishDate: '2021-01-01', classCode: '300', category: '기타' },
        { id: 318, title: '비트코인 없는 미래는 없다', author: '오테민 외', publishDate: '2024-01-01', classCode: '300', category: '기타' },
        { id: 319, title: '다크 심리학', author: '다크 사이드 프로젝트', publishDate: '2020-01-01', classCode: '100', category: '기타' },
        { id: 320, title: '인공지능은 나의 읽기-쓰기를 어떻게 바꿀까', author: '김성우', publishDate: '2024-01-01', classCode: '000', category: '기타' },
        { id: 321, title: '모든 것은 예측 가능하다', author: '톰 치버스', publishDate: '2021-01-01', classCode: '400', category: '기타' },
        { id: 322, title: '먼저 온 미래', author: '장용민', publishDate: '2023-01-01', classCode: '300', category: '기타' },
        { id: 323, title: '긴키 지방의 어느 장소에 대하여', author: '세스지', publishDate: '2023-01-01', classCode: '800', category: '기타' }
    ],
    // 대기도서목록
    mustRead: [],        // 읽어야할도서 (4 slots)
    reading: [
        { id: 307, title: '양자와 장', author: '숀 캐럴', publishDate: '2019-01-01', classCode: '400', category: '물리학', startDate: '2026-02-01T20:12:03Z' },
        { id: 222, title: '잃어버린 이름들의 낙원', author: '허주은', publishDate: '2023-01-01', classCode: '800', category: '관심작가', startDate: '2026-02-01T20:12:03Z' },
        { id: 215, title: '죽지 않고 어른이 되는 법', author: '강지영', publishDate: '2022-01-01', classCode: '800', category: '관심작가', startDate: '2026-02-01T20:12:03Z' }
    ],
    completed: [
        { id: 1, title: '방과 후', author: '히가시노 게이고', finishDate: '2025-10-01', classCode: '800', reReadCount: 0 },
        { id: 2, title: '졸업: 설월화 살인 게임', author: '히가시노 게이고', finishDate: '2025-10-01', classCode: '800', reReadCount: 0 },
        { id: 3, title: '하쿠바산장 살인사건', author: '히가시노 게이고', finishDate: '2025-10-01', classCode: '800', reReadCount: 0 },
        { id: 4, title: '학생가의 살인', author: '히가시노 게이고', finishDate: '2025-10-01', classCode: '800', reReadCount: 0 },
        { id: 5, title: '11문자 살인사건', author: '히가시노 게이고', finishDate: '2025-10-01', classCode: '800', reReadCount: 0 },
        { id: 6, title: '마구', author: '히가시노 게이고', finishDate: '2025-10-01', classCode: '800', reReadCount: 0 },
        { id: 7, title: '그녀는 다 계획이 있다', author: '히가시노 게이고', finishDate: '2025-10-01', classCode: '800', reReadCount: 0 },
        { id: 8, title: '오사카 소년 탐정단', author: '히가시노 게이고', finishDate: '2025-11-27', classCode: '800', reReadCount: 0 },
        { id: 9, title: '십자 저택의 피에로', author: '히가시노 게이고', finishDate: '2025-11-01', classCode: '800', reReadCount: 0 },
        { id: 10, title: '잠자는 숲', author: '히가시노 게이고', finishDate: '2025-11-17', classCode: '800', reReadCount: 0 },
        { id: 11, title: '조인계획', author: '히가시노 게이고', finishDate: '2025-11-21', classCode: '800', reReadCount: 0 },
        { id: 12, title: '살인현장은 구름 위', author: '히가시노 게이고', finishDate: '2025-11-30', classCode: '800', reReadCount: 0 },
        { id: 13, title: '브루투스의 심장', author: '히가시노 게이고', finishDate: '2025-12-06', classCode: '800', reReadCount: 0 },
        { id: 14, title: '탐정 클럽', author: '히가시노 게이고', finishDate: '2025-12-01', classCode: '800', reReadCount: 0 }, // 날짜 없음, 12월 1일로 가정
        { id: 15, title: '숙명', author: '히가시노 게이고', finishDate: '2025-12-17', classCode: '800', reReadCount: 0 },
        { id: 16, title: '범인 없는 살인의 밤', author: '히가시노 게이고', finishDate: '2026-01-03', classCode: '800', reReadCount: 0 },
        { id: 17, title: '가면산장 살인사건', author: '히가시노 게이고', finishDate: '2025-12-31', classCode: '800', reReadCount: 0 },
        { id: 18, title: '변신', author: '히가시노 게이고', finishDate: '2026-01-10', classCode: '800', reReadCount: 0 },
        { id: 19, title: '회랑정 살인사건', author: '히가시노 게이고', finishDate: '2026-01-17', classCode: '800', reReadCount: 0 },
        { id: 20, title: '교통경찰의 밤', author: '히가시노 게이고', finishDate: '2026-02-01', classCode: '800', reReadCount: 0 },
        // Batch 3 - Completed Books
        { id: 21, title: '마녀가 되는 주문', author: '단요', finishDate: '2025-01-01', classCode: '800', reReadCount: 0 },
        { id: 22, title: '피와 기름', author: '단요', finishDate: '2025-01-02', classCode: '800', reReadCount: 0 },
        { id: 23, title: '세계는 이렇게 바뀐다', author: '단요', finishDate: '2025-01-03', classCode: '800', reReadCount: 0 },
        { id: 24, title: '인버스', author: '단요', finishDate: '2025-01-04', classCode: '800', reReadCount: 0 },
        { id: 25, title: '두고 온 여름', author: '성해나', finishDate: '2025-02-01', classCode: '800', reReadCount: 0 },
        { id: 26, title: '빛을 걷으면 빛', author: '성해나', finishDate: '2025-02-15', classCode: '800', reReadCount: 0 },
        { id: 27, title: '혼모노', author: '성해나', finishDate: '2025-03-01', classCode: '800', reReadCount: 0 },
        { id: 28, title: '검은 사슴', author: '한강', finishDate: '2025-04-01', classCode: '800', reReadCount: 0 },
        { id: 29, title: '작별하지 않는다', author: '한강', finishDate: '2025-05-01', classCode: '800', reReadCount: 0 },
        { id: 30, title: '채식주의자', author: '한강', finishDate: '2025-06-01', classCode: '800', reReadCount: 0 },
        { id: 31, title: '부치하난의 우물', author: '장용민', finishDate: '2025-07-01', classCode: '800', reReadCount: 0 },
        { id: 32, title: '귀신나방', author: '장용민', finishDate: '2025-07-10', classCode: '800', reReadCount: 0 },
        { id: 33, title: '건축 무한 육면각체', author: '장용민', finishDate: '2025-07-20', classCode: '800', reReadCount: 0 },
        { id: 34, title: '불로의 인형', author: '장용민', finishDate: '2025-08-01', classCode: '800', reReadCount: 0 },
        { id: 35, title: '마지막 사도1', author: '장용민', finishDate: '2025-08-15', classCode: '800', reReadCount: 0 },
        { id: 36, title: '마지막 사도2', author: '장용민', finishDate: '2025-08-20', classCode: '800', reReadCount: 0 },
        { id: 37, title: '궁극의 아이 1', author: '장용민', finishDate: '2025-09-01', classCode: '800', reReadCount: 0 },
        { id: 38, title: '궁극의 아이 2', author: '장용민', finishDate: '2025-09-10', classCode: '800', reReadCount: 0 },
        { id: 39, title: '살인자의 쇼핑몰 1', author: '강지영', finishDate: '2024-01-01', classCode: '800', reReadCount: 0 },
        { id: 40, title: '살인자의 쇼핑몰 2', author: '강지영', finishDate: '2024-02-01', classCode: '800', reReadCount: 0 },
        { id: 41, title: '엘자의 하인', author: '강지영', finishDate: '2024-03-01', classCode: '800', reReadCount: 0 },
        { id: 42, title: '굿바이 파라다이스', author: '강지영', finishDate: '2024-04-01', classCode: '800', reReadCount: 0 },
        { id: 43, title: '프랑켄슈타인 가족 (2024)', author: '강지영', finishDate: '2024-12-01', classCode: '800', reReadCount: 0 },
        { id: 44, title: '프랑켄슈타인 가족 (2025)', author: '강지영', finishDate: '2025-01-15', classCode: '800', reReadCount: 0 },
        { id: 45, title: '심 여사는 킬러', author: '강지영', finishDate: '2025-03-20', classCode: '800', reReadCount: 0 },
        { id: 46, title: '붉은 궁', author: '허주은', finishDate: '2025-11-14', classCode: '800', reReadCount: 0 },
        { id: 47, title: '사라진 소녀들의 숲', author: '허주은', finishDate: '2025-11-16', classCode: '800', reReadCount: 0 },
        { id: 48, title: '늑대사이의 학', author: '허주은', finishDate: '2025-12-27', classCode: '800', reReadCount: 0 },
        { id: 49, title: '파과', author: '구병모', finishDate: '2025-08-01', classCode: '800', reReadCount: 0 },
        { id: 50, title: 'AI는 인간을 먹고 자란다', author: '마크 그레이엄', finishDate: '2025-11-23', classCode: '300', reReadCount: 0 },
        { id: 51, title: '경영, 이나모리 가즈오', author: '이나모리 가즈오', finishDate: '2025-12-28', classCode: '300', reReadCount: 0 }
    ],
    settings: {
        interestAuthors: ['히가시노 게이고', '단요', '성해나', '한강', '장용민', '허주은', '구병모', '정해연']
    },
    githubConfig: {
        user: '',
        repo: '',
        token: ''
    },
    currentView: 'dashboard'
};

// Filter Values
let filters = {
    author: '',
    year: '',
    month: '',
    group: '',
    class: ''
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initCharts();
    renderCurrentView();
    setupEventListeners();
    updateDate();
});

function updateDate() {
    const now = new Date();
    document.getElementById('current-date').textContent = now.toLocaleDateString('ko-KR', {
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
    });
}

// Navigation
function setupEventListeners() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    document.querySelectorAll('.sidebar nav li').forEach(li => {
        li.addEventListener('click', () => {
            document.querySelectorAll('.sidebar nav li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            state.currentView = li.dataset.view;
            resetFilters(); // 필터 초기화
            renderCurrentView();

            // Mobile: Close sidebar after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    // 필터 이벤트 리스너 추가
    document.getElementById('filter-author').addEventListener('change', (e) => {
        filters.author = e.target.value;
        renderCurrentView();
    });
    document.getElementById('filter-group').addEventListener('change', (e) => {
        filters.group = e.target.value;
        renderCurrentView();
    });
    document.getElementById('filter-class').addEventListener('input', (e) => {
        filters.class = e.target.value;
        renderCurrentView();
    });
    document.getElementById('filter-year').addEventListener('change', (e) => {
        filters.year = e.target.value;
        renderCurrentView();
    });
    document.getElementById('filter-month').addEventListener('change', (e) => {
        filters.month = e.target.value;
        renderCurrentView();
    });

    // Modal logic
    const modal = document.getElementById('book-modal');
    document.getElementById('add-book-btn').addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    document.getElementById('close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.getElementById('book-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addBookFromForm();
        modal.style.display = 'none';
        e.target.reset();
    });

    // Select Book Modal logic
    const selectModal = document.getElementById('select-book-modal');
    document.getElementById('close-select-modal').addEventListener('click', () => {
        selectModal.style.display = 'none';
    });
}

function resetFilters() {
    filters = { author: '', year: '', month: '', group: '', class: '' };
    document.getElementById('filter-author').value = '';
    document.getElementById('filter-year').value = '';
    document.getElementById('filter-month').value = '';
    document.getElementById('filter-group').value = '';
    document.getElementById('filter-class').value = '';
}

function updateFilterOptions(listName) {
    const filterAuthor = document.getElementById('filter-author');
    const filterYear = document.getElementById('filter-year');
    const filterMonth = document.getElementById('filter-month');

    const items = state[listName];
    const authors = [...new Set(items.map(b => b.author))].sort();

    // Extract years and months from publishDate or finishDate
    const dates = items.map(b => b.publishDate || b.finishDate).filter(d => d);
    const years = [...new Set(dates.map(d => d.split('-')[0]))].sort((a, b) => b - a);
    const months = [...new Set(dates.map(d => d.split('-')[1]))].sort((a, b) => a - b);

    const currentAuthor = filters.author;
    const currentYear = filters.year;
    const currentMonth = filters.month;

    filterAuthor.innerHTML = '<option value="">모든 작가</option>' +
        authors.map(a => `<option value="${a}" ${a === currentAuthor ? 'selected' : ''}>${a}</option>`).join('');

    filterYear.innerHTML = '<option value="">모든 년도</option>' +
        years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}년</option>`).join('');

    filterMonth.innerHTML = '<option value="">모든 월</option>' +
        months.map(m => `<option value="${m}" ${m === currentMonth ? 'selected' : ''}>${parseInt(m)}월</option>`).join('');
}

function renderCurrentView() {
    const views = ['dashboard-view', 'list-view', 'settings-view'];
    views.forEach(v => document.getElementById(v).style.display = 'none');

    const title = document.getElementById('view-title');

    switch (state.currentView) {
        case 'dashboard':
            document.getElementById('dashboard-view').style.display = 'block';
            title.textContent = '대시보드';
            renderDashboard();
            break;
        case 'to-read':
            document.getElementById('list-view').style.display = 'block';
            title.textContent = '대기도서목록';
            renderTable('waitList');
            break;
        case 'must-read':
            document.getElementById('list-view').style.display = 'block';
            title.textContent = '읽어야할도서';
            renderTable('mustRead');
            break;
        case 'reading':
            document.getElementById('list-view').style.display = 'block';
            title.textContent = '읽고있는도서';
            renderTable('reading');
            break;
        case 'completed':
            document.getElementById('list-view').style.display = 'block';
            title.textContent = '완독도서목록';
            renderTable('completed');
            break;
        case 'settings':
            document.getElementById('settings-view').style.display = 'block';
            title.textContent = '설정';
            renderSettings();
            break;
    }
}

// Data Handling
function addBookFromForm() {
    const book = {
        id: Date.now(),
        title: document.getElementById('book-title').value,
        author: document.getElementById('book-author').value,
        publishDate: document.getElementById('book-date').value,
        classCode: document.getElementById('book-class').value,
        registeredAt: new Date().toISOString(),
        category: '기타'
    };

    book.category = categorizeBook(book);
    state.waitList.push(book);
    saveState();
    checkMustReadSlots();
    renderCurrentView();
}

function categorizeBook(book) {
    if (state.settings.interestAuthors.includes(book.author)) return '관심작가';
    const code = book.classCode;
    if (code.includes('물리학') || (parseFloat(code) >= 420 && parseFloat(code) < 430)) return '물리학';
    return '기타';
}

function checkMustReadSlots() {
    // 4 Slots: Philosophy(0,1,2,9), Science(3,4,5), Literature(8 authors else), Keigo(Keigo 8)
    if (!state.mustRead || state.mustRead.length === 0) {
        state.mustRead = [null, null, null, null];
    }
    saveState();
}

function openSelectBookModal(index) {
    const slots = [
        { name: '철학/역사 (000,100,200,900)', filter: b => ['0', '1', '2', '9'].includes(b.classCode[0]) },
        { name: '과학/기술 (300,400,500)', filter: b => ['3', '4', '5'].includes(b.classCode[0]) },
        { name: '문학 (기타 작가 800)', filter: b => b.classCode[0] === '8' && b.author !== '히가시노 게이고' },
        { name: '히가시노 게이고 (800)', filter: b => b.classCode[0] === '8' && b.author === '히가시노 게이고' }
    ];

    const slot = slots[index];
    const eligible = state.waitList.filter(slot.filter);

    document.getElementById('slot-info').textContent = `Slot: ${slot.name} | 선택 가능한 도서: ${eligible.length}권`;

    const container = document.getElementById('select-book-body');
    container.innerHTML = '';

    if (eligible.length === 0) {
        container.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-muted)">선택 가능한 도서가 없습니다.</td></tr>';
    } else {
        eligible.forEach(book => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publishDate}</td>
                <td>${book.classCode}</td>
                <td><button class="primary-btn" onclick="selectBookForSlot(${book.id}, ${index})">선택</button></td>
            `;
            container.appendChild(tr);
        });
    }

    document.getElementById('select-book-modal').style.display = 'flex';
}

function selectBookForSlot(bookId, slotIndex) {
    const bookIndex = state.waitList.findIndex(b => b.id === bookId);
    if (bookIndex === -1) return;

    // Handle existing book in slot
    if (state.mustRead[slotIndex]) {
        const existingBook = state.mustRead[slotIndex];
        // Remove slot-specific field before returning to waitList
        delete existingBook.slotGroup;
        state.waitList.push(existingBook);
    }

    const book = state.waitList.splice(bookIndex, 1)[0];
    const slots = [
        '철학/역사 (000,100,200,900)',
        '과학/기술 (300,400,500)',
        '문학 (기타 작가 800)',
        '히가시노 게이고 (800)'
    ];

    state.mustRead[slotIndex] = { ...book, slotGroup: slots[slotIndex] };

    document.getElementById('select-book-modal').style.display = 'none';
    saveState();
    renderCurrentView();
}


// Actions
function startReading(index) {
    const book = state.mustRead[index];
    if (!book) return;

    book.startDate = new Date().toISOString();
    state.reading.push(book);
    state.mustRead[index] = null;

    checkMustReadSlots();
    saveState();
    renderCurrentView();
}

function finishReading(id) {
    const index = state.reading.findIndex(b => b.id === id);
    if (index === -1) return;

    const book = state.reading.splice(index, 1)[0];
    book.finishDate = new Date().toISOString();
    book.reReadCount = book.reReadCount || 0;
    book.isReRead = book.isReRead || false;

    state.completed.push(book);
    saveState();
    renderCurrentView();
}

function handleReRead(id) {
    if (confirm("지금 재독 기록을 남기시겠습니까?")) {
        const index = state.completed.findIndex(b => b.id === id);
        if (index === -1) return;

        const book = { ...state.completed[index] };
        book.reReadCount = (book.reReadCount || 0) + 1;
        book.isReRead = true;
        book.startDate = new Date().toISOString();
        delete book.finishDate;

        state.reading.push(book);
        state.completed[index].reReadCount = book.reReadCount; // Update count in history too? OR just keep history.
        // The requirement says "복사됨" (copied), so we keep the old record and add to reading.

        saveState();
        renderCurrentView();
    }
}

// Rendering
function renderDashboard() {
    initCharts();
}

function renderTable(listName) {
    const container = document.getElementById('table-body');
    const header = document.getElementById('table-header');
    const filterUI = document.getElementById('table-filters');

    // 필터 UI 제어 (대기도서목록, 완독도서목록에서만 표시)
    const isFilterable = (listName === 'waitList' || listName === 'completed');
    filterUI.style.display = isFilterable ? 'flex' : 'none';

    // 도서 추가 버튼 제어 (읽어야할도서에서는 숨김)
    const addBookBtn = document.getElementById('add-book-btn');
    if (addBookBtn) {
        addBookBtn.style.display = (listName === 'mustRead' || listName === 'reading') ? 'none' : 'block';
    }


    if (isFilterable) {
        updateFilterOptions(listName);
    }

    container.innerHTML = '';

    const columns = {
        waitList: ['제목', '작가', '출판일', '분류번호', '카테고리', '등록일'],
        mustRead: ['그룹', '제목', '작가', '출판일', '분류번호', '작업'],
        reading: ['제목', '작가', '시작일', '작업'],
        completed: ['제목', '작가', '완독일', '재독횟수', '작업']
    };

    header.innerHTML = columns[listName].map(c => `<th>${c}</th>`).join('');

    let items = listName === 'mustRead' ? state.mustRead : state[listName];

    // 필터 적용
    if (isFilterable) {
        items = items.filter(book => {
            const matchAuthor = !filters.author || book.author === filters.author;
            const dateStr = book.publishDate || book.finishDate || "";
            const [year, month] = dateStr.split('-');

            const matchYear = !filters.year || year === filters.year;
            const matchMonth = !filters.month || month === filters.month;
            const matchClass = !filters.class || book.classCode.includes(filters.class);

            let matchGroup = true;
            if (filters.group) {
                const code = book.classCode[0];
                const author = book.author;
                switch (filters.group) {
                    case 'phil': matchGroup = ['0', '1', '2', '9'].includes(code); break;
                    case 'sci': matchGroup = ['3', '4', '5'].includes(code); break;
                    case 'keigo': matchGroup = author === '히가시노 게이고'; break;
                    case 'lit': matchGroup = code === '8' && author !== '히가시노 게이고'; break;
                }
            }
            return matchAuthor && matchYear && matchMonth && matchClass && matchGroup;
        });
    }

    items.forEach((book, index) => {
        const tr = document.createElement('tr');

        if (listName === 'mustRead' && !book) {
            const slotNames = [
                '철학/역사 (0,1,2,9)',
                '과학/기술 (3,4,5)',
                '문학 (기타 작가 800)',
                '히가시노 게이고 (800)'
            ];
            tr.innerHTML = `<td>${slotNames[index]}</td><td colspan="5" style="text-align:center; color:var(--text-muted)"><button class="primary-btn" style="padding: 0.4rem 1rem; font-size: 0.8rem;" onclick="openSelectBookModal(${index})">불러오기</button></td>`;
        } else if (book) {
            if (listName === 'waitList') {
                tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.publishDate}</td><td>${book.classCode}</td><td>${book.category}</td><td>${new Date(book.registeredAt).toLocaleDateString()}</td>`;
            } else if (listName === 'mustRead') {
                tr.innerHTML = `<td>${book.slotGroup}</td><td>${book.title}</td><td>${book.author}</td><td>${book.publishDate}</td><td>${book.classCode}</td><td>
                    <button class="primary-btn" onclick="startReading(${index})">읽기 시작</button>
                    <button class="primary-btn" style="background: var(--text-muted); margin-left: 0.5rem;" onclick="openSelectBookModal(${index})">변경</button>
                </td>`;
            } else if (listName === 'reading') {
                tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${new Date(book.startDate).toLocaleDateString()}</td><td><button class="primary-btn" onclick="finishReading(${book.id})">완료</button></td>`;
            } else if (listName === 'completed') {
                tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${new Date(book.finishDate).toLocaleDateString()}</td><td>${book.reReadCount || 0}</td><td><button class="primary-btn" style="background:var(--accent)" onclick="handleReRead(${book.id})">재독</button></td>`;
            }
        }
        container.appendChild(tr);
    });
}

function renderSettings() {
    const list = document.getElementById('interest-authors-list');
    list.innerHTML = '';
    state.settings.interestAuthors.forEach(author => {
        const li = document.createElement('li');
        li.textContent = author;
        list.appendChild(li);
    });

    document.getElementById('add-author-btn').onclick = () => {
        const name = document.getElementById('new-author').value;
        if (name) {
            state.settings.interestAuthors.push(name);
            document.getElementById('new-author').value = '';
            saveState();
            renderSettings();
        }
    };

    // 데이터 내보내기 (Export)
    document.getElementById('export-btn').onclick = () => {
        const dataStr = JSON.stringify(state, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'antigravity_data.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // 데이터 가져오기 (Import)
    const fileInput = document.getElementById('import-file');
    document.getElementById('import-btn').onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedState = JSON.parse(event.target.result);
                if (confirm('데이터를 덮어쓰시겠습니까? 현재 기기의 기존 데이터는 사라집니다.')) {
                    state = importedState;
                    saveState();
                    location.reload(); // 리로드하여 전체 반영
                }
            } catch (err) {
                alert('잘못된 데이터 파일입니다.');
            }
        };
        reader.readAsText(file);
    };

    // GitHub 설정 저장
    const ghUser = document.getElementById('gh-user');
    const ghRepo = document.getElementById('gh-repo');
    const ghToken = document.getElementById('gh-token');

    if (ghUser) {
        ghUser.value = state.githubConfig.user || '';
        ghRepo.value = state.githubConfig.repo || '';
        ghToken.value = state.githubConfig.token || '';

        document.getElementById('save-gh-config-btn').onclick = () => {
            state.githubConfig.user = ghUser.value.trim();
            state.githubConfig.repo = ghRepo.value.trim();
            state.githubConfig.token = ghToken.value.trim();
            saveState();
            alert('GitHub 설정이 이 브라우저에 저장되었습니다.');
        };
    }

    // GitHub 자동 동기화 버튼
    const syncBtn = document.getElementById('sync-github-btn');
    if (syncBtn) {
        syncBtn.onclick = () => syncWithGitHub();
    }

    // GitHub 업데이트 코드 복사
    const copyBtn = document.getElementById('copy-github-code-btn');
    if (copyBtn) {
        copyBtn.onclick = () => {
            const stateCode = generateStateCode();
            navigator.clipboard.writeText(stateCode).then(() => {
                alert('GitHub app.js에 덮어쓸 코드가 복사되었습니다!\nGitHub에서 state 변수 부분을 이 코드로 교체하세요.');
            }).catch(err => {
                console.error('복사 실패:', err);
                alert('코드 복사에 실패했습니다.');
            });
        };
    }
}

async function syncWithGitHub() {
    const ghUser = document.getElementById('gh-user');
    const ghRepo = document.getElementById('gh-repo');
    const ghToken = document.getElementById('gh-token');
    const statusEl = document.getElementById('sync-status');

    // Read from fields directly in case they weren't saved yet
    const user = ghUser ? ghUser.value.trim() : state.githubConfig.user;
    const repo = ghRepo ? ghRepo.value.trim() : state.githubConfig.repo;
    const token = ghToken ? ghToken.value.trim() : state.githubConfig.token;

    if (!user || !repo || !token) {
        alert('GitHub 설정을 먼저 완료해 주세요 (사용자명, 저장소명, 토큰 입력 필수).');
        return;
    }

    if (!confirm('현재 데이터를 GitHub에 즉시 업데이트하시겠습니까?')) return;

    statusEl.textContent = 'GitHub 연결 중...';
    statusEl.style.color = 'var(--text-muted)';
    const filePath = 'app.js';
    const url = `https://api.github.com/repos/${user}/${repo}/contents/${filePath}`;

    try {
        // 1. Get current file data (to get SHA)
        console.log('Fetching SHA from:', url);
        const getRes = await fetch(url, {
            headers: { 'Authorization': `token ${token}` }
        });

        if (!getRes.ok) {
            let errorMsg = '파일 정보를 가져오지 못했습니다.';
            if (getRes.status === 401) errorMsg = '토큰이 유효하지 않습니다 (401 Unauthorized).';
            else if (getRes.status === 403) errorMsg = 'API 호출 한도 초과 또는 권한 부족 (403 Forbidden). 토큰에 repo 권한이 있는지 확인하세요.';
            else if (getRes.status === 404) errorMsg = `파일을 찾을 수 없습니다 (404 Not Found). 저장소 이름(${repo})과 경로(app.js)가 정확한지 확인하세요.`;
            throw new Error(`${errorMsg} (Status: ${getRes.status})`);
        }

        const fileData = await getRes.json();
        const sha = fileData.sha;

        // 2. Generate new content
        statusEl.textContent = '업데이트 준비 중...';
        const newCode = generateStateCode();

        // UTF-8 to Base64 (Reliable version)
        const utf8Encoder = new TextEncoder();
        const bytes = utf8Encoder.encode(newCode);
        const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
        const encodedContent = btoa(binString);

        // 3. Update file via API
        statusEl.textContent = 'GitHub로 전송 중...';
        const putRes = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update database from browser (${new Date().toLocaleString()})`,
                content: encodedContent,
                sha: sha
            })
        });

        if (putRes.ok) {
            statusEl.textContent = '✅ 동기화 완료!';
            statusEl.style.color = 'var(--primary-color)';
            alert('성공! GitHub의 데이터가 최신 상태로 업데이트되었습니다.');
        } else {
            const errData = await putRes.json();
            throw new Error(errData.message || '업데이트 요청 실패');
        }
    } catch (err) {
        console.error('동기화 에러:', err);
        statusEl.textContent = '❌ 동기화 실패';
        statusEl.style.color = 'var(--accent)';
        alert('동기화 실패:\n' + err.message);
    }
}

function generateStateCode() {
    // 현재 state에서 UI 상태 등 불필요한 값 제외하고 순수 데이터만 추출
    const cleanState = { ...state };
    delete cleanState.currentView; // 브라우저 상태는 초기값으로 유지하는 것이 좋음

    const jsonStr = JSON.stringify(cleanState, null, 4);
    return `let state = ${jsonStr};`;
}


let yearlyChart = null;
let groupChart = null;
let authorChart = null;

function initCharts() {
    const yearlyEl = document.getElementById('yearlyChart');
    const groupEl = document.getElementById('groupChart');
    const authorEl = document.getElementById('authorChart');

    if (!yearlyEl || !groupEl || !authorEl) return;

    const yearlyCtx = yearlyEl.getContext('2d');
    const groupCtx = groupEl.getContext('2d');
    const authorCtx = authorEl.getContext('2d');

    // 1. Yearly Data
    const yearlyData = {};
    state.completed.forEach(b => {
        if (b.finishDate) {
            const year = new Date(b.finishDate).getFullYear();
            yearlyData[year] = (yearlyData[year] || 0) + 1;
        }
    });

    if (yearlyChart) yearlyChart.destroy();
    yearlyChart = new Chart(yearlyCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(yearlyData),
            datasets: [{
                label: '권수',
                data: Object.values(yearlyData),
                backgroundColor: '#6366f1',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });

    // 2. Group Data
    const groupData = { '철학/역사': 0, '과학/기술': 0, '문학': 0, '히가시노': 0 };
    state.completed.forEach(b => {
        const code = (b.classCode && b.classCode.length > 0) ? b.classCode[0] : '8';
        if (['0', '1', '2', '9'].includes(code)) groupData['철학/역사']++;
        else if (['3', '4', '5'].includes(code)) groupData['과학/기술']++;
        else if (code === '8') {
            if (b.author === '히가시노 게이고') groupData['히가시노']++;
            else groupData['문학']++;
        }
    });

    if (groupChart) groupChart.destroy();
    groupChart = new Chart(groupCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(groupData),
            datasets: [{
                data: Object.values(groupData),
                backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
                borderWidth: 0
            }]
        },
        options: { cutout: '70%', responsive: true, maintainAspectRatio: false }
    });

    // 3. Author Treemap (Robust Version)
    const authorCounts = {};
    state.completed.forEach(b => {
        if (b.author && state.settings.interestAuthors.includes(b.author)) {
            authorCounts[b.author] = (authorCounts[b.author] || 0) + 1;
        }
    });

    const treemapData = Object.entries(authorCounts).map(([author, count]) => ({
        authorName: author,
        count: count
    }));

    if (authorChart) authorChart.destroy();

    if (treemapData.length === 0) {
        // 데이터가 없는 경우를 대비한 가상 데이터나 처리
        authorChart = null;
        return;
    }

    authorChart = new Chart(authorCtx, {
        type: 'treemap',
        data: {
            datasets: [{
                tree: treemapData,
                key: 'count',
                groups: ['authorName'],
                spacing: 2,
                borderRadius: 12,
                backgroundColor: (ctx) => {
                    const colors = [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(244, 63, 94, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(251, 191, 36, 0.8)',
                        'rgba(14, 165, 233, 0.8)'
                    ];
                    return colors[ctx.dataIndex % colors.length] || colors[0];
                },
                labels: {
                    display: true,
                    formatter: (ctx) => {
                        if (ctx.type !== 'data' || !ctx.raw) return '';
                        // v2.3.0에서는 ctx.raw.g가 그룹 이름을 가질 수 있음
                        return [ctx.raw.g, ctx.raw.v + '권'];
                    },
                    font: { size: 14, weight: '700', family: 'Outfit' },
                    color: '#ffffff'
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const name = ctx.raw.g || '알 수 없음';
                            const value = ctx.raw.v || 0;
                            return ` ${name}: ${value}권 완독`;
                        }
                    }
                }
            }
        }
    });
}

function saveState() {
    localStorage.setItem('antigravity_state', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('antigravity_state');
    if (saved) {
        const parsed = JSON.parse(saved);

        // Ensure all hardcoded items are present (Merge by ID)
        const hardcodedCompleted = state.completed;
        const hardcodedWaitList = state.waitList;

        // Merge Completed
        hardcodedCompleted.forEach(hBook => {
            if (!parsed.completed.find(b => b.id === hBook.id)) {
                parsed.completed.push(hBook);
            }
        });

        // Merge WaitList
        hardcodedWaitList.forEach(hBook => {
            if (!parsed.waitList.find(b => b.id === hBook.id) &&
                !parsed.reading.find(b => b.id === hBook.id) &&
                !parsed.completed.find(b => b.id === hBook.id) &&
                !(parsed.mustRead || []).find(b => b && b.id === hBook.id)) {
                parsed.waitList.push(hBook);
            }
        });

        // Merge Reading
        state.reading.forEach(rBook => {
            if (!parsed.reading.find(b => b.id === rBook.id) &&
                !parsed.completed.find(b => b.id === rBook.id)) {
                parsed.reading.push(rBook);
                // Remove from waitList if it was there
                parsed.waitList = parsed.waitList.filter(b => b.id !== rBook.id);
            }
        });

        state = parsed;
    }

    // Check MustRead slots
    checkMustReadSlots();
    // Save the merged state back to ensure it persists
    saveState();
}
