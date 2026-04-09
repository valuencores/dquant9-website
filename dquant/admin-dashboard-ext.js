// admin-dashboard.js 확장 - 투자금액 및 누적배당금 쉼표 포맷팅

// 페이지 로드 시 투자금액과 누적배당금 필드에 쉼표 포맷팅 이벤트 추가
document.addEventListener('DOMContentLoaded', function() {
    const investmentAmountInput = document.getElementById('investmentAmount');
    const accumulatedDividendInput = document.getElementById('accumulatedDividend');
    
    // 투자금액 입력 시 쉼표 포맷팅 (원 단위)
    if (investmentAmountInput) {
        investmentAmountInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/,/g, ''); // 쉼표 제거
            
            // 숫자만 남기기
            value = value.replace(/[^\d]/g, '');
            
            if (value) {
                // 쉼표 추가
                e.target.value = Number(value).toLocaleString('ko-KR');
                
                // 배당률 자동 설정 (1억원 = 100,000,000원)
                const numValue = parseInt(value);
                const dividendRateSelect = document.getElementById('dividendRate');
                
                if (numValue >= 100000000) { // 1억원 이상
                    dividendRateSelect.value = '4.0%';
                    dividendRateSelect.disabled = true;
                    dividendRateSelect.style.opacity = '0.7';
                } else if (numValue > 0) {
                    dividendRateSelect.disabled = false;
                    dividendRateSelect.style.opacity = '1';
                }
            }
        });
    }
    
    // 누적배당금 입력 시 쉼표 포맷팅 (원 단위)
    if (accumulatedDividendInput) {
        accumulatedDividendInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/,/g, ''); // 쉼표 제거
            
            // 숫자만 남기기
            value = value.replace(/[^\d]/g, '');
            
            if (value) {
                // 쉼표 추가
                e.target.value = Number(value).toLocaleString('ko-KR');
            }
        });
    }
});

// 숫자에서 쉼표 제거하여 실제 값 가져오기
function getNumberValue(formattedString) {
    if (!formattedString) return 0;
    return parseInt(formattedString.replace(/,/g, '')) || 0;
}

// 누적 차월수 자동 계산
function calculateAccumulatedMonths(signupDate) {
    if (!signupDate) return 0;
    
    const signup = new Date(signupDate);
    const now = new Date();
    
    const yearsDiff = now.getFullYear() - signup.getFullYear();
    const monthsDiff = now.getMonth() - signup.getMonth();
    
    return yearsDiff * 12 + monthsDiff;
}

// 총 일차 계산
function calculateTotalDays(signupDate) {
    if (!signupDate) return 0;
    
    const signup = new Date(signupDate);
    const now = new Date();
    
    const diffTime = Math.abs(now - signup);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}
