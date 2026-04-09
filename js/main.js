// 메인 애플리케이션 초기화 및 이벤트 핸들러

// 페이지 로드 완료 시 실행
window.addEventListener('DOMContentLoaded', function() {
    console.log('dQuant9 Compound Interest Calculator initialized');
    
    // 부드러운 스크롤 동작
    initSmoothScroll();
    
    // 숫자 입력 필드 포맷팅
    initNumberFormatting();
    
    // 키보드 단축키
    initKeyboardShortcuts();
    
    // 애니메이션 효과
    initAnimations();
});

// 부드러운 스크롤
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 숫자 입력 필드 포맷팅
function initNumberFormatting() {
    const lumpsumInput = document.getElementById('lumpsumCustomValue');
    const recurringInput = document.getElementById('recurringCustomValue');
    
    // 숫자 포맷팅 함수 (천단위 쉼표)
    function formatNumber(value) {
        // 숫자만 추출
        const numbers = value.replace(/[^\d]/g, '');
        if (!numbers) return '';
        
        // 천단위 쉼표 추가
        return parseInt(numbers).toLocaleString('ko-KR');
    }
    
    // 1만원 단위로 반올림
    function roundToTenThousand(value) {
        const numbers = value.replace(/[^\d]/g, '');
        if (!numbers) return '';
        
        const amount = parseInt(numbers);
        const rounded = Math.round(amount / 10000) * 10000;
        return rounded.toLocaleString('ko-KR');
    }
    
    // 입력 이벤트 처리
    function handleInput(e) {
        const input = e.target;
        const cursorPosition = input.selectionStart;
        const oldValue = input.value;
        const oldLength = oldValue.length;
        
        // 포맷팅
        const formatted = formatNumber(oldValue);
        input.value = formatted;
        
        // 커서 위치 조정
        const newLength = formatted.length;
        const diff = newLength - oldLength;
        input.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
    }
    
    // blur 시 1만원 단위로 반올림
    function handleBlur(e) {
        const input = e.target;
        if (input.value) {
            const rounded = roundToTenThousand(input.value);
            input.value = rounded;
        }
    }
    
    // 엔터키로 계산 실행
    function handleKeypress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('calculateBtn').click();
        }
    }
    
    // 이벤트 리스너 등록
    if (lumpsumInput) {
        lumpsumInput.addEventListener('input', handleInput);
        lumpsumInput.addEventListener('blur', handleBlur);
        lumpsumInput.addEventListener('keypress', handleKeypress);
    }
    
    if (recurringInput) {
        recurringInput.addEventListener('input', handleInput);
        recurringInput.addEventListener('blur', handleBlur);
        recurringInput.addEventListener('keypress', handleKeypress);
    }
}

// 키보드 단축키
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter: 계산 실행
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('calculateBtn').click();
        }
        
        // Ctrl/Cmd + L: 언어 전환
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            const currentLang = currentLanguage;
            const newLang = currentLang === 'ko' ? 'en' : 'ko';
            changeLanguage(newLang);
        }
    });
}

// 애니메이션 효과
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 관찰할 요소들 (필요시 활성화)
    // document.querySelectorAll('.form-group').forEach(el => {
    //     el.style.opacity = '0';
    //     el.style.transform = 'translateY(20px)';
    //     el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    //     observer.observe(el);
    // });
}

// 유틸리티 함수들

// 숫자를 한국어 단위로 변환
function toKoreanNumber(num) {
    const units = ['', '만', '억', '조'];
    const result = [];
    let unitIndex = 0;
    
    while (num > 0) {
        const part = num % 10000;
        if (part > 0) {
            result.unshift(part.toLocaleString() + units[unitIndex]);
        }
        num = Math.floor(num / 10000);
        unitIndex++;
    }
    
    return result.join(' ') || '0';
}

// 로컬 스토리지에 마지막 계산 결과 저장
function saveLastCalculation(params) {
    try {
        localStorage.setItem('dquant9_last_calculation', JSON.stringify(params));
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

// 마지막 계산 결과 불러오기
function loadLastCalculation() {
    try {
        const saved = localStorage.getItem('dquant9_last_calculation');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
    }
    return null;
}

// 디버그 모드 (콘솔에서 활성화 가능)
window.dQuant9Debug = {
    version: '1.0.0',
    getCurrentParams: function() {
        const type = document.querySelector('.btn-option[data-type].active')?.dataset.type;
        const method = document.querySelector('.btn-option[data-method].active')?.dataset.method;
        const rate = document.querySelector('.btn-rate.active')?.dataset.rate;
        return { type, method, rate };
    },
    getResults: function() {
        return calculationResults;
    },
    exportResults: function() {
        if (!calculationResults) {
            console.log('No calculation results available');
            return;
        }
        
        const csv = [
            ['Period (months)', 'Principal', 'Interest', 'Total'],
            ...calculationResults.map(r => [r.months, r.principal, r.interest, r.total])
        ].map(row => row.join(',')).join('\n');
        
        console.log('CSV Export:\n' + csv);
        return csv;
    }
};

// 성능 모니터링 (개발 모드)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Development mode enabled');
    
    // 계산 성능 측정
    const originalPerformCalculation = window.performCalculation;
    if (typeof originalPerformCalculation === 'function') {
        window.performCalculation = function() {
            const start = performance.now();
            const result = originalPerformCalculation.apply(this, arguments);
            const end = performance.now();
            console.log(`Calculation completed in ${(end - start).toFixed(2)}ms`);
            return result;
        };
    }
}

// 에러 핸들링
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // 프로덕션에서는 에러 리포팅 서비스로 전송 가능
});

// 브라우저 호환성 체크
function checkBrowserCompatibility() {
    const requiredFeatures = [
        'fetch',
        'Promise',
        'localStorage',
        'Chart'
    ];
    
    const missingFeatures = requiredFeatures.filter(feature => {
        return typeof window[feature] === 'undefined';
    });
    
    if (missingFeatures.length > 0) {
        console.warn('Missing browser features:', missingFeatures);
        // 사용자에게 브라우저 업데이트 권장 메시지 표시 가능
    }
}

checkBrowserCompatibility();

console.log('%c dQuant9 Calculator ', 'background: #0066FF; color: white; font-size: 16px; font-weight: bold; padding: 8px;');
console.log('%c Compound Interest Calculator v1.0.0 ', 'background: #00D4AA; color: white; font-size: 12px; padding: 4px;');
console.log('Type dQuant9Debug in console for debug commands');
