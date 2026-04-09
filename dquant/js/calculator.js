// 환율 데이터 (기본값 - API 로드 전)
let exchangeRates = {
    KRW: 1,
    USD: 0.00075,  // 1 KRW = 0.00075 USD (약 1,333 KRW per USD)
    EUR: 0.00069,  // 1 KRW = 0.00069 EUR (약 1,450 KRW per EUR)
    JPY: 0.11      // 1 KRW = 0.11 JPY (약 9.1 KRW per JPY)
};

// 환율 기준값 (1 외화당 원화)
let exchangeRatesBase = {
    KRW: 1,
    USD: 1333,
    EUR: 1450,
    JPY: 9.1
};

// 환율 업데이트 시간
let lastExchangeRateUpdate = null;

// 통화 포맷팅 함수
function formatCurrency(amount, currency) {
    const convertedAmount = amount * exchangeRates[currency];
    
    const formats = {
        KRW: {
            locale: 'ko-KR',
            options: { 
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            },
            suffix: ' 원'
        },
        USD: {
            locale: 'en-US',
            options: { 
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            },
            prefix: '$'
        },
        EUR: {
            locale: 'de-DE',
            options: { 
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            },
            prefix: '€'
        },
        JPY: {
            locale: 'ja-JP',
            options: { 
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            },
            prefix: '¥'
        }
    };
    
    const format = formats[currency];
    const formatted = convertedAmount.toLocaleString(format.locale, format.options);
    
    if (format.prefix) {
        return format.prefix + formatted;
    } else if (format.suffix) {
        return formatted + format.suffix;
    }
    return formatted;
}

// 전역 변수
let calculationResults = null;
let currentCurrency = 'KRW';
let profitChart = null;

// 투자금액에 따른 수익률 자동 설정 함수
function setInterestRateByAmount(amount) {
    let targetRate;
    
    if (amount <= 10000000) {
        // 1천만원 이하: 2.5%
        targetRate = 2.5;
    } else if (amount <= 50000000) {
        // 5천만원 이하: 3.0%
        targetRate = 3.0;
    } else if (amount < 100000000) {
        // 1억원 미만: 3.5%
        targetRate = 3.5;
    } else {
        // 1억원 이상: 4.0%
        targetRate = 4.0;
    }
    
    // 수익률 버튼 업데이트
    document.querySelectorAll('.btn-rate').forEach(btn => {
        const rate = parseFloat(btn.dataset.rate);
        if (rate === targetRate) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 실시간 환율 가져오기 함수
async function fetchExchangeRates() {
    try {
        // exchangerate-api.com의 무료 API 사용 (KRW 기준)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/KRW');
        
        if (!response.ok) {
            throw new Error('환율 정보를 가져올 수 없습니다.');
        }
        
        const data = await response.json();
        
        // 환율 업데이트
        exchangeRates = {
            KRW: 1,
            USD: data.rates.USD || 0.00075,
            EUR: data.rates.EUR || 0.00069,
            JPY: data.rates.JPY || 0.11
        };
        
        // 기준 환율 (1 외화당 원화)
        exchangeRatesBase = {
            KRW: 1,
            USD: Math.round(1 / exchangeRates.USD),
            EUR: Math.round(1 / exchangeRates.EUR),
            JPY: Math.round(1 / exchangeRates.JPY * 100) / 100
        };
        
        // 업데이트 시간 저장
        lastExchangeRateUpdate = new Date();
        
        console.log('환율 업데이트 완료:', exchangeRatesBase);
        
        // 환율 정보 표시 업데이트
        updateExchangeRateDisplay();
        
        return true;
    } catch (error) {
        console.error('환율 로딩 실패:', error);
        // 기본값 사용
        return false;
    }
}

// 환율 정보 표시 업데이트
function updateExchangeRateDisplay() {
    const display = document.getElementById('exchangeRateInfo');
    if (!display) return;
    
    if (currentCurrency === 'KRW') {
        display.style.display = 'none';
        return;
    }
    
    const rate = exchangeRatesBase[currentCurrency];
    const updateTime = lastExchangeRateUpdate 
        ? lastExchangeRateUpdate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        : '';
    
    let rateText = '';
    if (currentCurrency === 'JPY') {
        rateText = currentLanguage === 'ko' 
            ? `100엔 = ${(rate * 100).toFixed(2)}원`
            : `100 JPY = ${(rate * 100).toFixed(2)} KRW`;
    } else {
        rateText = currentLanguage === 'ko' 
            ? `1${getCurrencySymbol(currentCurrency)} = ${rate.toLocaleString()}원`
            : `1 ${currentCurrency} = ${rate.toLocaleString()} KRW`;
    }
    
    display.innerHTML = `
        <i class="fas fa-sync-alt"></i>
        <span>${rateText}</span>
        ${updateTime ? `<span class="update-time">(${updateTime})</span>` : ''}
    `;
    display.style.display = 'flex';
}

// 통화 기호 가져오기
function getCurrencySymbol(currency) {
    const symbols = {
        USD: '$',
        EUR: '€',
        JPY: '¥',
        KRW: '₩'
    };
    return symbols[currency] || currency;
}

// 복리 계산 함수
function calculateCompoundInterest(params) {
    const { type, amount, rate, method } = params;
    // 기간: 3개월, 6개월, 12개월, 2년(24개월), 3년(36개월), 4년(48개월), 5년(60개월)
    const periods = [3, 6, 12, 24, 36, 48, 60]; // 개월
    const results = [];
    
    periods.forEach(months => {
        const years = months / 12;
        let principal, interest, total;
        
        if (type === 'lumpsum') {
            // 고정식 (일시불)
            if (method === 'compound') {
                // 복리지급식 - 월수익률 복리 계산
                total = amount * Math.pow(1 + rate, months);
                principal = amount;
                interest = total - principal;
            } else {
                // 월고정지급식 - 월수익률 단리
                const monthlyInterest = amount * rate;
                interest = monthlyInterest * months;
                principal = amount;
                total = principal + interest;
            }
        } else {
            // 적립식 (월납)
            if (method === 'compound') {
                // 복리지급식 - 월수익률 복리
                total = amount * ((Math.pow(1 + rate, months) - 1) / rate);
                principal = amount * months;
                interest = total - principal;
            } else {
                // 월고정지급식 - 적립식 단리
                principal = amount * months;
                // 적립식 월고정지급: 각 월별 투자금에 대한 이자 누적
                let totalInterest = 0;
                for (let i = 1; i <= months; i++) {
                    totalInterest += amount * rate * i;
                }
                interest = totalInterest;
                total = principal + interest;
            }
        }
        
        results.push({
            months,
            principal: Math.round(principal),
            interest: Math.round(interest),
            total: Math.round(total)
        });
    });
    
    return results;
}

// 결과 테이블 업데이트
function updateResultsTable(results, currency) {
    const tbody = document.getElementById('resultsTableBody');
    tbody.innerHTML = '';
    
    results.forEach(result => {
        const row = document.createElement('tr');
        
        let periodText;
        if (result.months < 12) {
            // 12개월 미만은 개월로 표시
            periodText = currentLanguage === 'ko' 
                ? `${result.months}${t('periods.months')}` 
                : `${result.months} ${t('periods.months')}`;
        } else {
            // 12개월 이상은 년으로 표시
            const years = result.months / 12;
            periodText = currentLanguage === 'ko' 
                ? `${years}${t('periods.years')}` 
                : `${years} ${t('periods.years')}`;
        }
        
        row.innerHTML = `
            <td class="period-cell">${periodText}</td>
            <td class="amount-cell">${formatCurrency(result.principal, currency)}</td>
            <td class="amount-cell interest-cell">${formatCurrency(result.interest, currency)}</td>
            <td class="amount-cell total-cell">${formatCurrency(result.total, currency)}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// 차트 업데이트
function updateChart(results, currency) {
    const ctx = document.getElementById('profitChart').getContext('2d');
    
    const labels = results.map(r => {
        if (r.months < 12) {
            // 12개월 미만
            return currentLanguage === 'ko' 
                ? `${r.months}개월` 
                : `${r.months}mo`;
        } else {
            // 12개월 이상
            const years = r.months / 12;
            return currentLanguage === 'ko' 
                ? `${years}년` 
                : `${years}yr`;
        }
    });
    
    const principalData = results.map(r => r.principal * exchangeRates[currency]);
    const interestData = results.map(r => r.interest * exchangeRates[currency]);
    const totalData = results.map(r => r.total * exchangeRates[currency]);
    
    // 기존 차트 삭제
    if (profitChart) {
        profitChart.destroy();
    }
    
    profitChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: currentLanguage === 'ko' ? '원금' : 'Principal',
                    data: principalData,
                    backgroundColor: 'rgba(139, 92, 246, 0.8)',
                    borderColor: 'rgba(139, 92, 246, 1)',
                    borderWidth: 2
                },
                {
                    label: currentLanguage === 'ko' ? '배당수익' : 'Dividend',
                    data: interestData,
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2
                },
                {
                    label: currentLanguage === 'ko' ? '총 금액' : 'Total',
                    data: totalData,
                    type: 'line',
                    backgroundColor: 'rgba(245, 158, 11, 0.3)',
                    borderColor: 'rgba(245, 158, 11, 1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 13,
                            weight: '600',
                            family: "'Inter', 'Noto Sans KR', sans-serif"
                        },
                        padding: 15,
                        usePointStyle: true,
                        color: '#CBD5E1'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleFont: {
                        size: 14,
                        weight: '700'
                    },
                    bodyFont: {
                        size: 13,
                        weight: '500'
                    },
                    padding: 12,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const value = context.parsed.y;
                            const formats = {
                                KRW: { suffix: ' 원', decimals: 0 },
                                USD: { prefix: '$', decimals: 2 },
                                EUR: { prefix: '€', decimals: 2 },
                                JPY: { prefix: '¥', decimals: 0 }
                            };
                            const format = formats[currency];
                            const formatted = value.toLocaleString(undefined, {
                                minimumFractionDigits: format.decimals,
                                maximumFractionDigits: format.decimals
                            });
                            label += format.prefix ? format.prefix + formatted : formatted + format.suffix;
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        color: '#94A3B8'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(71, 85, 105, 0.3)'
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#94A3B8',
                        callback: function(value) {
                            const formats = {
                                KRW: { suffix: '원', divisor: 10000, unit: '만' },
                                USD: { prefix: '$', divisor: 1000, unit: 'K' },
                                EUR: { prefix: '€', divisor: 1000, unit: 'K' },
                                JPY: { prefix: '¥', divisor: 10000, unit: '万' }
                            };
                            const format = formats[currency];
                            const displayValue = (value / format.divisor).toFixed(0);
                            if (format.prefix) {
                                return format.prefix + displayValue + format.unit;
                            } else {
                                return displayValue + format.unit + format.suffix;
                            }
                        }
                    }
                }
            }
        }
    });
}

// 코멘트 생성
// 받침 체크 함수
function hasFinalConsonant(text) {
    // 텍스트에서 마지막 한글 문자 찾기
    const koreanChar = text.match(/[\uac00-\ud7af]/g);
    if (!koreanChar || koreanChar.length === 0) {
        // 한글이 없으면 숫자나 영문자 확인 (숫자는 받침 없음으로 처리)
        const lastChar = text.trim().slice(-1);
        // 0,2,4,5,6,8: 받침 있음 (영/이/사/오/육/팔)
        // 1,3,7,9: 받침 없음 (일/삼/칠/구)
        if (/[024568]/.test(lastChar)) return true;
        if (/[1379]/.test(lastChar)) return false;
        return false;
    }
    
    const lastChar = koreanChar[koreanChar.length - 1];
    const charCode = lastChar.charCodeAt(0) - 0xac00;
    const finalConsonant = charCode % 28;
    return finalConsonant !== 0;
}

// 적절한 조사 선택
function getJosa(text, type) {
    const hasBatchim = hasFinalConsonant(text);
    
    switch(type) {
        case 'subject': // 이/가
            return hasBatchim ? '이' : '가';
        case 'object': // 을/를
            return hasBatchim ? '을' : '를';
        case 'direction': // 으로/로
            return hasBatchim ? '으로' : '로';
        default:
            return '';
    }
}

function generateComment(results, params) {
    const lastResult = results[results.length - 1];
    const totalReturn = ((lastResult.interest / lastResult.principal) * 100).toFixed(2);
    const monthlyAvgReturn = (totalReturn / lastResult.months).toFixed(2);
    
    let comment = '';
    
    // 기간 표시 (5년)
    const years = lastResult.months / 12;
    const periodText = currentLanguage === 'ko' ? `${years}년` : `${years} years`;
    const rateDisplay = (params.rate * 100).toFixed(1);
    
    if (currentLanguage === 'ko') {
        comment = `${periodText} (${lastResult.months}개월) 투자 시 월 ${rateDisplay}% 수익률로 총 수익률은 ${totalReturn}%입니다. `;
        
        if (params.type === 'lumpsum') {
            const initialAmount = formatCurrency(params.amount, 'KRW');
            const finalAmount = formatCurrency(lastResult.total, 'KRW');
            const josaInitial = getJosa(initialAmount, 'subject');
            const josaFinal = getJosa(finalAmount, 'direction');
            
            comment += `초기 투자금 ${initialAmount}${josaInitial} `;
            comment += `${finalAmount}${josaFinal} 증가합니다. `;
        } else {
            const monthlyAmount = formatCurrency(params.amount, 'KRW');
            const totalAmount = formatCurrency(lastResult.total, 'KRW');
            const josaTotalObj = getJosa(totalAmount, 'object');
            
            comment += `매월 ${monthlyAmount}씩 투자하여 `;
            comment += `총 ${totalAmount}${josaTotalObj} 모을 수 있습니다. `;
        }
        
        if (params.method === 'compound') {
            comment += `복리 효과로 시간이 지날수록 수익이 가속화됩니다. `;
        } else {
            comment += `매월 고정된 이자를 받아 안정적인 수익을 얻을 수 있습니다. `;
        }
        
        if (params.rate >= 0.035) {
            comment += `높은 월수익률로 장기 투자 시 큰 수익을 기대할 수 있습니다.`;
        } else {
            comment += `안정적인 월수익률로 꾸준한 자산 증식이 가능합니다.`;
        }
    } else {
        comment = `Total return after ${periodText} (${lastResult.months} months) with ${rateDisplay}% monthly rate is ${totalReturn}%. `;
        
        if (params.type === 'lumpsum') {
            comment += `Your initial investment of ${formatCurrency(params.amount, 'KRW')} `;
            comment += `will grow to ${formatCurrency(lastResult.total, 'KRW')}. `;
        } else {
            comment += `By investing ${formatCurrency(params.amount, 'KRW')} monthly, `;
            comment += `you can accumulate ${formatCurrency(lastResult.total, 'KRW')}. `;
        }
        
        if (params.method === 'compound') {
            comment += `Compound interest accelerates your returns over time. `;
        } else {
            comment += `Fixed monthly interest provides stable and predictable returns. `;
        }
        
        if (params.rate >= 0.035) {
            comment += `High monthly rate offers significant long-term growth potential.`;
        } else {
            comment += `Stable monthly rate ensures consistent asset growth.`;
        }
    }
    
    return comment;
}

// 코멘트 섹션 업데이트
function updateComment(results, params) {
    const commentSection = document.getElementById('commentSection');
    const commentText = document.getElementById('commentText');
    
    commentText.textContent = generateComment(results, params);
    commentSection.style.display = 'flex';
}

// 계산 실행
function performCalculation() {
    // 투자 방식
    const type = document.querySelector('.btn-option[data-type].active').dataset.type;
    
    // 투자 금액
    let amount;
    if (type === 'lumpsum') {
        const activeBtn = document.querySelector('#lumpsumAmountGroup .btn-amount.active');
        if (activeBtn.dataset.amount === 'custom') {
            const customValue = document.getElementById('lumpsumCustomValue').value;
            amount = parseFloat(customValue.replace(/,/g, ''));
        } else {
            amount = parseFloat(activeBtn.dataset.amount);
        }
    } else {
        const activeBtn = document.querySelector('#recurringAmountGroup .btn-amount.active');
        if (activeBtn.dataset.amount === 'custom') {
            const customValue = document.getElementById('recurringCustomValue').value;
            amount = parseFloat(customValue.replace(/,/g, ''));
        } else {
            amount = parseFloat(activeBtn.dataset.amount);
        }
    }
    
    // 입력 검증
    if (!amount || amount <= 0) {
        alert(currentLanguage === 'ko' ? '올바른 금액을 입력하세요.' : 'Please enter a valid amount.');
        return;
    }
    
    // 수익 지급 방식
    const method = document.querySelector('.btn-option[data-method].active').dataset.method;
    
    // 수익률
    const rate = parseFloat(document.querySelector('.btn-rate.active').dataset.rate) / 100;
    
    // 계산
    const params = { type, amount, rate, method };
    calculationResults = calculateCompoundInterest(params);
    
    // 결과 업데이트
    updateResultsTable(calculationResults, currentCurrency);
    updateChart(calculationResults, currentCurrency);
    updateComment(calculationResults, params);
    
    // 결과 섹션으로 스크롤
    document.querySelector('.results-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 투자 방식 선택
    document.querySelectorAll('.btn-option[data-type]').forEach(btn => {
        btn.addEventListener('click', function() {
            // 활성화 상태 변경
            document.querySelectorAll('.btn-option[data-type]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 금액 입력 그룹 표시/숨김
            const type = this.dataset.type;
            
            if (type === 'lumpsum') {
                document.getElementById('lumpsumAmountGroup').style.display = 'flex';
                document.getElementById('recurringAmountGroup').style.display = 'none';
            } else {
                document.getElementById('lumpsumAmountGroup').style.display = 'none';
                document.getElementById('recurringAmountGroup').style.display = 'flex';
            }
        });
    });
    
    // 고정식 금액 선택
    document.querySelectorAll('#lumpsumAmountGroup .btn-amount').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#lumpsumAmountGroup .btn-amount').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.amount === 'custom') {
                document.getElementById('lumpsumCustomInput').style.display = 'block';
            } else {
                document.getElementById('lumpsumCustomInput').style.display = 'none';
                
                // 금액에 따른 수익률 자동 설정
                const amount = parseFloat(this.dataset.amount);
                setInterestRateByAmount(amount);
            }
        });
    });
    
    // 고정식 직접입력 금액 변경 시
    document.getElementById('lumpsumCustomValue').addEventListener('input', function() {
        const amount = parseFloat(this.value.replace(/,/g, '')) || 0;
        if (amount > 0) {
            setInterestRateByAmount(amount);
        }
    });
    
    document.getElementById('lumpsumCustomValue').addEventListener('change', function() {
        const amount = parseFloat(this.value.replace(/,/g, '')) || 0;
        if (amount > 0) {
            setInterestRateByAmount(amount);
        }
    });
    
    // 적립식 금액 선택
    document.querySelectorAll('#recurringAmountGroup .btn-amount').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#recurringAmountGroup .btn-amount').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.amount === 'custom') {
                document.getElementById('recurringCustomInput').style.display = 'block';
            } else {
                document.getElementById('recurringCustomInput').style.display = 'none';
                
                // 월 납입금액 기준으로 수익률 설정 (월 납입금 자체를 기준으로)
                const monthlyAmount = parseFloat(this.dataset.amount);
                // 적립식은 월 납입금액을 기준으로 환산 (예: 월 100만원 = 연간 1,200만원)
                const estimatedAmount = monthlyAmount * 12;
                setInterestRateByAmount(estimatedAmount);
            }
        });
    });
    
    // 적립식 직접입력 금액 변경 시
    document.getElementById('recurringCustomValue').addEventListener('input', function() {
        const monthlyAmount = parseFloat(this.value.replace(/,/g, '')) || 0;
        if (monthlyAmount > 0) {
            const estimatedAmount = monthlyAmount * 12;
            setInterestRateByAmount(estimatedAmount);
        }
    });
    
    document.getElementById('recurringCustomValue').addEventListener('change', function() {
        const monthlyAmount = parseFloat(this.value.replace(/,/g, '')) || 0;
        if (monthlyAmount > 0) {
            const estimatedAmount = monthlyAmount * 12;
            setInterestRateByAmount(estimatedAmount);
        }
    });
    
    // 수익 지급 방식 선택
    document.querySelectorAll('.btn-option[data-method]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-option[data-method]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 복리지급식 안내문 표시/숨김
            const compoundInfo = document.getElementById('compoundPaymentInfo');
            if (this.dataset.method === 'compound') {
                compoundInfo.style.display = 'flex';
            } else {
                compoundInfo.style.display = 'none';
            }
        });
    });
    
    // 수익률 선택 - 이제 자동으로 설정되므로 클릭 이벤트 제거
    // 수익률은 투자금액에 따라 자동으로 설정됨
    
    // 통화 선택
    document.getElementById('currencySelect').addEventListener('change', function() {
        currentCurrency = this.value;
        
        // 환율 정보 표시 업데이트
        updateExchangeRateDisplay();
        
        if (calculationResults) {
            updateResultsTable(calculationResults, currentCurrency);
            updateChart(calculationResults, currentCurrency);
        }
    });
    
    // 계산 버튼
    document.getElementById('calculateBtn').addEventListener('click', performCalculation);
    
    // 초기 수익률 설정 (기본 선택: 1천만원 → 2.5%)
    setInterestRateByAmount(10000000);
    
    // 실시간 환율 로드
    fetchExchangeRates();
});
