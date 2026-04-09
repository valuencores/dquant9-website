/**
 * 회원 가입일자 업데이트 스크립트
 * 모든 회원의 가입일자를 3~4개월 앞당깁니다.
 */

// 회원별 앞당길 개월 수 정의
const memberDateUpdates = {
    'knabe74@naver.com': 3,          // 정병국: 3개월
    'anggoonwin@gmail.com': 4,       // 임현: 4개월
    'hyunsoo.kim@valuencores.com': 3, // 김현수: 3개월
    'eyc7829@daum.net': 4,           // 최은영: 4개월
    'carocandien@naver.com': 3,      // 나서희: 3개월
    'film_90@naver.com': 4           // 박승훈: 4개월
};

// 업데이트된 회원 데이터
const updatedMembers = [
    {
        email: 'knabe74@naver.com',
        memberName: '정병국',
        signupDate: '2025-11-27T00:00:00.000Z',      // 2026-02-27 → 2025-11-27 (3개월)
        investmentDate: '2025-11-27T00:00:00.000Z',
        investmentMonths: 6  // 3개월 + 기존 3개월 = 6개월
    },
    {
        email: 'anggoonwin@gmail.com',
        memberName: '임현',
        signupDate: '2025-09-22T00:00:00.000Z',      // 2026-01-22 → 2025-09-22 (4개월)
        investmentDate: '2025-09-22T00:00:00.000Z',
        investmentMonths: 6  // 4개월 + 기존 2개월 = 6개월
    },
    {
        email: 'hyunsoo.kim@valuencores.com',
        memberName: '김현수',
        signupDate: '2025-12-01T00:00:00.000Z',      // 2026-03-01 → 2025-12-01 (3개월)
        investmentDate: '2025-12-01T00:00:00.000Z',
        investmentMonths: 6  // 3개월 + 기존 3개월 = 6개월
    },
    {
        email: 'eyc7829@daum.net',
        memberName: '최은영',
        signupDate: '2025-11-02T00:00:00.000Z',      // 2026-03-02 → 2025-11-02 (4개월)
        investmentDate: '2025-11-02T00:00:00.000Z',
        investmentMonths: 9  // 4개월 + 기존 5개월 = 9개월
    },
    {
        email: 'carocandien@naver.com',
        memberName: '나서희',
        signupDate: '2025-10-09T00:00:00.000Z',      // 2026-01-09 → 2025-10-09 (3개월)
        investmentDate: '2025-10-09T00:00:00.000Z',
        investmentMonths: 5  // 3개월 + 기존 2개월 = 5개월
    },
    {
        email: 'film_90@naver.com',
        memberName: '박승훈',
        signupDate: '2025-09-19T00:00:00.000Z',      // 2026-01-19 → 2025-09-19 (4개월)
        investmentDate: '2025-09-19T00:00:00.000Z',
        investmentMonths: 6  // 4개월 + 기존 2개월 = 6개월
    }
];

// 각 회원의 누적 배당금 계산
function calculateAccumulatedDividend(investmentAmount, dividendRate, months) {
    const rate = parseFloat(dividendRate) / 100;
    return Math.round(investmentAmount * rate * months);
}

// 전체 업데이트 정보 (누적 배당금 포함)
const fullUpdatedMembers = [
    {
        email: 'knabe74@naver.com',
        memberName: '정병국',
        signupDate: '2025-11-27T00:00:00.000Z',
        investmentDate: '2025-11-27T00:00:00.000Z',
        investmentMonths: 6,
        investmentAmount: 10000000,
        dividendRate: '2.0%',
        accumulatedDividend: calculateAccumulatedDividend(10000000, 2.0, 6)  // 1,200,000원
    },
    {
        email: 'anggoonwin@gmail.com',
        memberName: '임현',
        signupDate: '2025-09-22T00:00:00.000Z',
        investmentDate: '2025-09-22T00:00:00.000Z',
        investmentMonths: 6,
        investmentAmount: 40000000,
        dividendRate: '3.0%',
        accumulatedDividend: calculateAccumulatedDividend(40000000, 3.0, 6)  // 7,200,000원
    },
    {
        email: 'hyunsoo.kim@valuencores.com',
        memberName: '김현수',
        signupDate: '2025-12-01T00:00:00.000Z',
        investmentDate: '2025-12-01T00:00:00.000Z',
        investmentMonths: 6,
        investmentAmount: 70000000,
        dividendRate: '4.0%',
        accumulatedDividend: calculateAccumulatedDividend(70000000, 4.0, 6)  // 16,800,000원
    },
    {
        email: 'eyc7829@daum.net',
        memberName: '최은영',
        signupDate: '2025-11-02T00:00:00.000Z',
        investmentDate: '2025-11-02T00:00:00.000Z',
        investmentMonths: 9,
        investmentAmount: 100000000,
        dividendRate: '4.0%',
        accumulatedDividend: calculateAccumulatedDividend(100000000, 4.0, 9)  // 36,000,000원
    },
    {
        email: 'carocandien@naver.com',
        memberName: '나서희',
        signupDate: '2025-10-09T00:00:00.000Z',
        investmentDate: '2025-10-09T00:00:00.000Z',
        investmentMonths: 5,
        investmentAmount: 20000000,
        dividendRate: '2.5%',
        accumulatedDividend: calculateAccumulatedDividend(20000000, 2.5, 5)  // 2,500,000원
    },
    {
        email: 'film_90@naver.com',
        memberName: '박승훈',
        signupDate: '2025-09-19T00:00:00.000Z',
        investmentDate: '2025-09-19T00:00:00.000Z',
        investmentMonths: 6,
        investmentAmount: 50000000,
        dividendRate: '3.0%',
        accumulatedDividend: calculateAccumulatedDividend(50000000, 3.0, 6)  // 9,000,000원
    }
];

console.log('=== 회원 가입일자 업데이트 계획 ===');
fullUpdatedMembers.forEach(member => {
    console.log(`
회원명: ${member.memberName}
이메일: ${member.email}
가입일: ${member.signupDate}
누적차월수: ${member.investmentMonths}개월
투자금액: ${member.investmentAmount.toLocaleString()}원
배당율: ${member.dividendRate}
누적배당금: ${member.accumulatedDividend.toLocaleString()}원
    `);
});

// 총 누적 배당금
const totalAccumulatedDividend = fullUpdatedMembers.reduce((sum, member) => 
    sum + member.accumulatedDividend, 0);

console.log(`\n총 누적 배당금: ${totalAccumulatedDividend.toLocaleString()}원`);

// 업데이트할 데이터 (API 호출용)
console.log('\n=== API 업데이트 데이터 (JSON) ===');
console.log(JSON.stringify(fullUpdatedMembers, null, 2));
