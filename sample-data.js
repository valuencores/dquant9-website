// 샘플 회원 데이터 생성 스크립트
// 관리자 대시보드에서 브라우저 콘솔에 붙여넣기하여 실행

async function createSampleMembers() {
    const sampleMembers = [
        {
            memberName: '김코스모스',
            idNumber: '8501011',
            phoneNumber: '010-1000-0001',
            address: '[06234] 서울특별시 강남구 테헤란로 1',
            referrer: '디퀀트나인',
            email: 'cosmos@example.com',
            password: 'Sample1234!',
            investmentDate: '2025-11-15',
            investmentAmount: 300000000,  // 3억원
            dividendRate: '4.0%',
            investorLevel: 'Cosmos',
            investmentMonths: 3,
            accumulatedDividend: 3000000,  // 300만원
            signupDate: '2025-11-15T00:00:00.000Z'
        },
        {
            memberName: '이퀀티엄',
            idNumber: '8701011',
            phoneNumber: '010-2000-0002',
            address: '[06234] 서울특별시 강남구 테헤란로 2',
            referrer: '디퀀트나인',
            email: 'quantium@example.com',
            password: 'Sample1234!',
            investmentDate: '2026-01-05',
            investmentAmount: 250000000,  // 2.5억원
            dividendRate: '4.0%',
            investorLevel: 'Quantium',
            investmentMonths: 2,
            accumulatedDividend: 16666667,  // 약 1667만원
            signupDate: '2025-12-20T00:00:00.000Z'
        },
        {
            memberName: '이플래티넘',
            idNumber: '8901011',
            phoneNumber: '010-3000-0003',
            address: '[06234] 서울특별시 강남구 테헤란로 3',
            referrer: '디퀀트나인',
            email: 'platinum@example.com',
            password: 'Sample1234!',
            investmentDate: '2025-11-15',
            investmentAmount: 200000000,  // 2억원
            dividendRate: '4.0%',
            investorLevel: 'Platinum',
            investmentMonths: 3,
            accumulatedDividend: 2000000,  // 200만원
            signupDate: '2025-11-15T00:00:00.000Z'
        },
        {
            memberName: '박다이아',
            idNumber: '9001011',
            phoneNumber: '010-4000-0004',
            address: '[06234] 서울특별시 강남구 테헤란로 4',
            referrer: '디퀀트나인',
            email: 'diamond@example.com',
            password: 'Sample1234!',
            investmentDate: '2025-11-15',
            investmentAmount: 100000000,  // 1억원
            dividendRate: '4.0%',
            investorLevel: 'Diamond',
            investmentMonths: 3,
            accumulatedDividend: 1000000,  // 100만원
            signupDate: '2026-01-10T00:00:00.000Z'
        },
        {
            memberName: '정골드',
            idNumber: '9101011',
            phoneNumber: '010-5000-0005',
            address: '[06234] 서울특별시 강남구 테헤란로 5',
            referrer: '디퀀트나인',
            email: 'gold@example.com',
            password: 'Sample1234!',
            investmentDate: '2025-11-15',
            investmentAmount: 70000000,  // 7천만원
            dividendRate: '3.0%',
            investorLevel: 'Gold',
            investmentMonths: 3,
            accumulatedDividend: 525000,  // 52.5만원
            signupDate: '2025-11-15T00:00:00.000Z'
        },
        {
            memberName: '최실버',
            idNumber: '9201011',
            phoneNumber: '010-6000-0006',
            address: '[06234] 서울특별시 강남구 테헤란로 6',
            referrer: '디퀀트나인',
            email: 'silver@example.com',
            password: 'Sample1234!',
            investmentDate: '2025-11-15',
            investmentAmount: 50000000,  // 5천만원
            dividendRate: '2.5%',
            investorLevel: 'Silver',
            investmentMonths: 3,
            accumulatedDividend: 312500,  // 31.25만원
            signupDate: '2025-11-15T00:00:00.000Z'
        },
        {
            memberName: '강브론즈',
            idNumber: '9301011',
            phoneNumber: '010-7000-0007',
            address: '[06234] 서울특별시 강남구 테헤란로 7',
            referrer: '디퀀트나인',
            email: 'bronze@example.com',
            password: 'Sample1234!',
            investmentDate: '2025-11-15',
            investmentAmount: 30000000,  // 3천만원
            dividendRate: '2.0%',
            investorLevel: 'Bronze',
            investmentMonths: 3,
            accumulatedDividend: 150000,  // 15만원
            signupDate: '2025-11-15T00:00:00.000Z'
        },
        {
            memberName: '윤스타터',
            idNumber: '9401011',
            phoneNumber: '010-8000-0008',
            address: '[06234] 서울특별시 강남구 테헤란로 8',
            referrer: '디퀀트나인',
            email: 'starter@example.com',
            password: 'Sample1234!',
            investmentDate: '2025-11-15',
            investmentAmount: 10000000,  // 1천만원
            dividendRate: '2.0%',
            investorLevel: 'Starter',
            investmentMonths: 3,
            accumulatedDividend: 50000,  // 5만원
            signupDate: '2025-11-15T00:00:00.000Z'
        },
        {
            memberName: '임테스터',
            idNumber: '9501011',
            phoneNumber: '010-9000-0009',
            address: '[06234] 서울특별시 강남구 테헤란로 9',
            referrer: '디퀀트나인',
            email: 'tester@example.com',
            password: 'Sample1234!',
            investmentDate: '2026-02-10',
            investmentAmount: 8000000,  // 800만원
            dividendRate: '2.0%',
            investorLevel: 'Tester',
            investmentMonths: 1,
            accumulatedDividend: 133333,  // 약 13만원
            signupDate: '2026-02-05T00:00:00.000Z'
        }
    ];

    console.log('샘플 회원 데이터 생성 시작...');
    
    for (const member of sampleMembers) {
        try {
            const response = await fetch('tables/members_v2', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(member)
            });
            
            if (response.ok) {
                console.log(`✅ ${member.memberName} 추가 완료`);
            } else {
                console.error(`❌ ${member.memberName} 추가 실패`);
            }
            
            // API 요청 간 짧은 대기
            await new Promise(resolve => setTimeout(resolve, 100));
            
        } catch (error) {
            console.error(`❌ ${member.memberName} 오류:`, error);
        }
    }
    
    console.log('샘플 회원 데이터 생성 완료!');
    console.log('페이지를 새로고침하여 결과를 확인하세요.');
}

// 실행
createSampleMembers();
