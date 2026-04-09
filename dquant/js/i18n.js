// 다국어 번역 데이터
const translations = {
    ko: {
        page: {
            title: '투자운용 시뮬레이션 보드',
            subtitle: '디지털 대전환과 퀀텀 투자의 시대, DQ9과 함께 \'시간의 투자\'로 안정적인 투자수익을 기대하세요.'
        },
        input: {
            title: '투자 조건 설정',
            investmentType: '투자 방식',
            lumpsum: '고정식 (일시납)',
            recurring: '적립식 (월납)',
            investmentTypeInfo: '고정식은 투자운용계약시점에 투자금액을 일시에 납입하여 투자금을 고정합니다. 적립식은 월단위로 약정금액을 납부하는 방식입니다.',
            lumpsumAmount: '투자 금액',
            recurringAmount: '월 납입 금액',
            custom: '직접입력',
            paymentMethod: '수익 지급 방식',
            compound: '복리지급식',
            monthly: '월고정지급식',
            paymentMethodInfo: '일반 회원에게는 기본옵션으로 월고정지급식만을 제공합니다. 복리지급식은 별도의 계약에 의거한 파트너십 운용 조건에 해당하며, 복리지급식의 결과는 참고용입니다.',
            compoundPaymentInfo: '"복리지급식" 방식은 투자파트너 계약 조건에 해당하며, 복리지급시기는 1년, 2년, 3년, 4년, 5년 등 연간 지급 조건입니다.',
            interestRate: '월 수익률',
            interestRateInfo: '월 수익률은 투자금액에 따라 자동으로 설정됩니다. (1천만원: 2.5%, 5천만원 이하: 3.0%, 1억원 미만: 3.5%, 1억원 이상: 4.0%)',
            calculate: '계산하기'
        },
        results: {
            title: '투자 수익 시뮬레이션',
            period: '기간',
            principal: '원금',
            dividend: '배당수익',
            interest: '배당수익',
            total: '총 금액',
            noData: '계산 버튼을 눌러 결과를 확인하세요'
        },
        currency: {
            krw: '원',
            usd: '달러',
            eur: '유로',
            jpy: '엔'
        },
        comment: {
            title: '투자 분석'
        },
        footer: {
            rights: 'All rights reserved.',
            disclaimer: '본 시뮬레이션은 디퀀트나인의 투자자, 파트너의 이해를 돕기 위한 것이며, 월고정지급식과 복리지급식 시뮬레이션 결과는 투자운용 계약 원칙에 의거하여 확정된 결과값을 산출합니다.'
        },
        periods: {
            months: '개월',
            years: '년'
        }
    },
    en: {
        page: {
            title: 'Investment Management Simulation Board',
            subtitle: 'In the era of digital transformation and quantum investment, expect stable investment returns through \'Time Investment\' with DQ9.'
        },
        input: {
            title: 'Investment Configuration',
            investmentType: 'Investment Type',
            lumpsum: 'Fixed (Lump Sum)',
            recurring: 'Recurring (Monthly)',
            investmentTypeInfo: 'Fixed investment involves paying the entire investment amount at once at the contract point. Recurring investment involves paying a fixed amount monthly.',
            lumpsumAmount: 'Investment Amount',
            recurringAmount: 'Monthly Payment',
            custom: 'Custom',
            paymentMethod: 'Payment Method',
            compound: 'Compound Interest',
            monthly: 'Monthly Fixed Payment',
            paymentMethodInfo: 'General members are provided with monthly fixed payment as the default option only. Compound interest is subject to partnership operation conditions under a separate contract, and the compound interest results are for reference only.',
            compoundPaymentInfo: '"Compound Interest" method is subject to investment partner contract terms, with annual payment conditions at 1, 2, 3, 4, and 5 years.',
            interestRate: 'Monthly Interest Rate',
            interestRateInfo: 'Monthly interest rate is automatically set based on investment amount. (10M: 2.5%, ≤50M: 3.0%, <100M: 3.5%, ≥100M: 4.0%)',
            calculate: 'Calculate'
        },
        results: {
            title: 'Investment Return Simulation',
            period: 'Period',
            principal: 'Principal',
            dividend: 'Dividend',
            interest: 'Dividend',
            total: 'Total Amount',
            noData: 'Click the Calculate button to view results'
        },
        currency: {
            krw: 'KRW',
            usd: 'USD',
            eur: 'EUR',
            jpy: 'JPY'
        },
        comment: {
            title: 'Investment Analysis'
        },
        footer: {
            rights: 'All rights reserved.',
            disclaimer: 'This simulation is provided to help dQuant9 investors and partners understand. The monthly fixed payment and compound interest simulation results are calculated based on the investment management contract principles.'
        },
        periods: {
            months: 'months',
            years: 'years'
        }
    }
};

// 현재 언어 상태
let currentLanguage = 'ko';

// 언어 변경 함수
function changeLanguage(lang) {
    currentLanguage = lang;
    updatePageLanguage();
    
    // 언어 버튼 활성화 상태 업데이트
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 페이지 언어 업데이트
function updatePageLanguage() {
    const t = translations[currentLanguage];
    
    // data-i18n 속성을 가진 모든 요소 업데이트
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = t;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            element.textContent = value;
        }
    });
    
    // HTML lang 속성 업데이트
    document.documentElement.lang = currentLanguage;
    
    // 플레이스홀더 업데이트
    updatePlaceholders();
}

// 플레이스홀더 업데이트
function updatePlaceholders() {
    const lumpsumInput = document.getElementById('lumpsumCustomValue');
    const recurringInput = document.getElementById('recurringCustomValue');
    
    if (currentLanguage === 'ko') {
        lumpsumInput.placeholder = '금액을 입력하세요';
        recurringInput.placeholder = '월 납입 금액을 입력하세요';
    } else {
        lumpsumInput.placeholder = 'Enter amount';
        recurringInput.placeholder = 'Enter monthly payment';
    }
}

// 번역 가져오기 함수
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        value = value[k];
    }
    
    return value || key;
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 언어 버튼 이벤트 리스너
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.dataset.lang);
        });
    });
    
    // 초기 언어 설정
    updatePageLanguage();
});
