// 관리자 인증 확인
function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const adminEmail = localStorage.getItem('adminEmail');
    
    if (isLoggedIn !== 'true' || !adminEmail) {
        window.location.href = 'admin-login.html';
        return false;
    }
    
    // 관리자 이메일 표시
    document.getElementById('adminEmailDisplay').textContent = adminEmail;
    return true;
}

// 페이지 로드 시 인증 확인
if (!checkAdminAuth()) {
    throw new Error('Unauthorized access');
}

// 전역 변수
let currentPage = 1;
const itemsPerPage = 10;
let allMembers = [];
let filteredMembers = [];

// 토스트 메시지 표시 함수
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 날짜 포맷 함수 (YY.MM.DD 형식)
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2); // 끝 두자리
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

// 금액 포맷 함수 (원 단위)
function formatAmount(amount) {
    if (!amount) return '-';
    return `${Number(amount).toLocaleString()}원`;
}

// 만원 단위 포맷 함수
function formatAmountInManwon(amount) {
    if (!amount) return '-';
    const manwon = Math.round(amount / 10000);
    return `${manwon.toLocaleString()}만원`;
}

// 회원 데이터 로드
async function loadMembers() {
    try {
        console.log('회원 데이터 로딩 시작...');
        const response = await fetch('tables/members_v2?limit=1000');
        const result = await response.json();
        
        console.log('API 응답:', result);
        console.log('회원 데이터 개수:', result.data ? result.data.length : 0);
        
        allMembers = result.data || [];
        filteredMembers = [...allMembers];
        
        console.log('allMembers:', allMembers);
        console.log('filteredMembers:', filteredMembers);
        
        updateStatistics();
        renderMembersTable();
        
    } catch (error) {
        console.error('회원 데이터 로드 실패:', error);
        showToast('회원 데이터를 불러오는데 실패했습니다.', 'error');
    }
}

// 통계 업데이트
function updateStatistics() {
    // 전체 회원 수
    document.getElementById('totalMembers').textContent = allMembers.length;
    
    // 총 투자금액 (만원 단위로 표시)
    const totalInvestment = allMembers.reduce((sum, member) => {
        return sum + (member.investmentAmount || member.investment_amount || 0);
    }, 0);
    document.getElementById('totalInvestment').textContent = formatAmountInManwon(totalInvestment);
    
    // 투자 회원 (투자금액이 있는 회원)
    const activeCount = allMembers.filter(m => (m.investmentAmount || m.investment_amount) > 0).length;
    document.getElementById('activeMembers').textContent = activeCount;
    
    // 평균 배당률
    const membersWithDividend = allMembers.filter(m => m.dividendRate || m.dividend_rate);
    if (membersWithDividend.length > 0) {
        const avgDividend = membersWithDividend.reduce((sum, member) => {
            const rate = (member.dividendRate || member.dividend_rate || '0%').toString().replace('%', '');
            return sum + parseFloat(rate);
        }, 0) / membersWithDividend.length;
        document.getElementById('avgDividend').textContent = avgDividend.toFixed(2) + '%';
    }
    
    // 총 누적 배당금 - 실시간 계산
    const totalDividend = allMembers.reduce((sum, member) => {
        const investmentAmount = member.investmentAmount || member.investment_amount || 0;
        const dividendRateStr = member.dividendRate || member.dividend_rate || '0%';
        const investmentMonths = member.investmentMonths || member.investment_months || 0;
        
        if (investmentAmount > 0 && investmentMonths > 0) {
            const rate = parseFloat(dividendRateStr.toString().replace('%', ''));
            const monthlyDividend = Math.round(investmentAmount * rate / 100);
            const calculatedDividend = monthlyDividend * investmentMonths;
            return sum + calculatedDividend;
        }
        return sum;
    }, 0);
    document.getElementById('totalDividend').textContent = totalDividend.toLocaleString() + '원';
}

// 회원 테이블 렌더링
function renderMembersTable() {
    console.log('renderMembersTable 호출됨');
    console.log('filteredMembers.length:', filteredMembers.length);
    
    const tbody = document.getElementById('membersTableBody');
    
    // 페이지네이션 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageMembers = filteredMembers.slice(startIndex, endIndex);
    
    console.log('currentPage:', currentPage);
    console.log('itemsPerPage:', itemsPerPage);
    console.log('startIndex:', startIndex);
    console.log('endIndex:', endIndex);
    console.log('pageMembers.length:', pageMembers.length);
    
    if (pageMembers.length === 0) {
        console.log('회원 없음 - 빈 메시지 표시');
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    등록된 회원이 없습니다.
                </td>
            </tr>
        `;
        renderPagination();
        return;
    }
    
    console.log('회원 목록 렌더링 시작...');
    console.log('pageMembers:', pageMembers);
    
    tbody.innerHTML = pageMembers.map(member => {
        console.log('회원 렌더링:', member.memberName || member.name, member);
        
        // 누적 배당금 실시간 계산
        const investmentAmount = member.investmentAmount || member.investment_amount || 0;
        const dividendRateStr = member.dividendRate || member.dividend_rate || '0%';
        const investmentMonths = member.investmentMonths || member.investment_months || 0;
        
        let calculatedDividend = 0;
        if (investmentAmount > 0 && investmentMonths > 0) {
            const rate = parseFloat(dividendRateStr.toString().replace('%', ''));
            const monthlyDividend = Math.round(investmentAmount * rate / 100);
            calculatedDividend = monthlyDividend * investmentMonths;
        }
        
        console.log(`${member.memberName || member.name} 누적배당금:`, calculatedDividend);
        
        return `
        <tr>
            <td>${formatDate(member.signupDate || member.signup_date || member.created_at)}</td>
            <td><strong>${member.memberName || member.name || '-'}</strong></td>
            <td><strong>${formatAmount(member.investmentAmount || member.investment_amount)}</strong></td>
            <td><strong style="color: var(--emerald-safe);">${member.dividendRate || member.dividend_rate || '-'}</strong></td>
            <td><strong style="color: var(--cyan-glow);">${(member.investmentMonths || member.investment_months) ? (member.investmentMonths || member.investment_months) + '개월' : '-'}</strong></td>
            <td><strong style="color: #fbbf24;">${calculatedDividend > 0 ? calculatedDividend.toLocaleString() + '원' : '-'}</strong></td>
            <td>
                ${(member.investorLevel || member.investor_level) ? `<span class="level-badge level-${member.investorLevel || member.investor_level}">${member.investorLevel || member.investor_level}</span>` : '-'}
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action" onclick="editMember('${member.id}')">
                        <i class="fas fa-eye"></i> 보기
                    </button>
                    <button class="btn-action danger" onclick="deleteMember('${member.id}', '${member.memberName || member.name}')">
                        <i class="fas fa-trash"></i> 삭제
                    </button>
                </div>
            </td>
        </tr>
    `}).join('');
    
    console.log('회원 목록 렌더링 완료');
    
    renderPagination();
}

// 페이지네이션 렌더링
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> 이전
        </button>
    `;
    
    // 페이지 버튼
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        html += `
            <button onclick="changePage(${i})" ${i === currentPage ? 'class="active"' : ''}>
                ${i}
            </button>
        `;
    }
    
    html += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            다음 <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    html += `<span class="page-info">${currentPage} / ${totalPages} 페이지</span>`;
    
    pagination.innerHTML = html;
}

// 페이지 변경
function changePage(page) {
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderMembersTable();
    
    // 테이블 상단으로 스크롤
    document.querySelector('.members-table-container').scrollIntoView({ behavior: 'smooth' });
}

// 검색 기능
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredMembers = [...allMembers];
    } else {
        filteredMembers = allMembers.filter(member => {
            const name = member.memberName || member.name || '';
            return name.toLowerCase().includes(searchTerm);
        });
    }
    
    currentPage = 1;
    renderMembersTable();
});

// 새로고침 버튼
document.getElementById('btnRefresh').addEventListener('click', function() {
    showToast('데이터를 새로고침합니다...', 'info');
    loadMembers();
});

// 회원 추가 버튼
document.getElementById('btnAddMember').addEventListener('click', function() {
    openModal();
});

// 모달 열기
function openModal(memberId = null) {
    const modal = document.getElementById('editMemberModal');
    const form = document.getElementById('memberForm');
    const modalTitle = document.getElementById('modalTitle');
    
    form.reset();
    
    if (memberId) {
        // 편집 모드
        modalTitle.innerHTML = '<i class="fas fa-user-circle"></i> 회원 정보 보기';
        const member = allMembers.find(m => m.id === memberId);
        
        if (member) {
            document.getElementById('memberId').value = member.id;
            document.getElementById('memberName').value = member.memberName || member.name || '';
            
            // 주민번호 분리 (예: "900101-1" -> "900101"과 "1"로 분리)
            const idNumber = member.idNumber || member.id_number || '';
            if (idNumber.includes('-')) {
                const parts = idNumber.split('-');
                document.getElementById('idNumber1').value = parts[0] || '';
                document.getElementById('idNumber2').value = parts[1] || '';
            } else if (idNumber.length >= 7) {
                document.getElementById('idNumber1').value = idNumber.substring(0, 6);
                document.getElementById('idNumber2').value = idNumber.substring(6, 7);
            } else {
                document.getElementById('idNumber1').value = '';
                document.getElementById('idNumber2').value = '';
            }
            
            document.getElementById('email').value = member.email || '';
            document.getElementById('phoneNumber').value = member.phoneNumber || member.phone || '';
            
            // 주소 조합: postcode + address + address_detail
            let fullAddress = '';
            if (member.postcode || member.address) {
                fullAddress = `[${member.postcode || ''}] ${member.address || ''} ${member.address_detail || ''}`.trim();
            }
            document.getElementById('address').value = member.address || fullAddress || '';
            
            document.getElementById('referrer').value = member.referrer || '';
            document.getElementById('investmentDate').value = (member.investmentDate || member.investment_date) ? (member.investmentDate || member.investment_date).split('T')[0] : '';
            document.getElementById('dividendPaymentDate').value = (member.dividendPaymentDate || member.dividend_payment_date) ? (member.dividendPaymentDate || member.dividend_payment_date).split('T')[0] : '';
            // 투자금액 쉼표 포맷팅 (원 단위)
            const amount = member.investmentAmount || member.investment_amount || '';
            document.getElementById('investmentAmount').value = amount ? Number(amount).toLocaleString('ko-KR') : '';
            document.getElementById('dividendRate').value = member.dividendRate || member.dividend_rate || '';
            document.getElementById('investorLevel').value = member.investorLevel || member.investor_level || '';
            document.getElementById('investmentMonths').value = member.investmentMonths || member.investment_months || '';
            document.getElementById('notes').value = member.notes || '';
        }
    } else {
        // 추가 모드
        modalTitle.innerHTML = '<i class="fas fa-user-plus"></i> 새 회원 추가';
        document.getElementById('memberId').value = '';
    }
    
    // 배당률 필드 초기 설정 (투자금액 기준 자동 계산)
    updateDividendRate();
    
    // 누적 배당금도 자동 계산
    calculateAccumulatedDividend();
    
    modal.style.display = 'block';
}

// 투자금액에 따른 배당률 자동 업데이트 함수
function updateDividendRate() {
    const amountStr = document.getElementById('investmentAmount').value.replace(/,/g, '');
    const amount = parseInt(amountStr) || 0;
    const dividendRateSelect = document.getElementById('dividendRate');
    
    if (amount > 0) {
        let rate = '';
        if (amount <= 10000000) {
            rate = '2.5%';
        } else if (amount <= 50000000) {
            rate = '3.0%';
        } else if (amount < 100000000) {
            rate = '3.5%';
        } else {
            rate = '4.0%';
        }
        dividendRateSelect.value = rate;
    } else {
        dividendRateSelect.value = '';
    }
    
    // 누적 배당금도 자동 계산
    calculateAccumulatedDividend();
}

// 누적 배당금 자동 계산 함수
function calculateAccumulatedDividend() {
    const amountStr = document.getElementById('investmentAmount').value.replace(/,/g, '');
    const amount = parseInt(amountStr) || 0;
    const rateStr = document.getElementById('dividendRate').value;
    const months = parseInt(document.getElementById('investmentMonths').value) || 0;
    
    if (amount > 0 && rateStr && months > 0) {
        const rate = parseFloat(rateStr.replace('%', ''));
        const monthlyDividend = Math.round(amount * rate / 100);
        const accumulatedDividend = monthlyDividend * months;
        
        document.getElementById('accumulatedDividend').value = accumulatedDividend.toLocaleString('ko-KR');
    } else {
        document.getElementById('accumulatedDividend').value = '0';
    }
}

// 모달 닫기
function closeModal() {
    document.getElementById('editMemberModal').style.display = 'none';
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('btnCancelModal').addEventListener('click', closeModal);

// 모달 외부 클릭 시 닫기
window.addEventListener('click', function(e) {
    const modal = document.getElementById('editMemberModal');
    if (e.target === modal) {
        closeModal();
    }
});

// 회원 편집
function editMember(memberId) {
    openModal(memberId);
}

// 회원 삭제
async function deleteMember(memberId, memberName) {
    if (!confirm(`정말로 "${memberName}" 회원을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
        return;
    }
    
    try {
        const response = await fetch(`tables/members_v2/${memberId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showToast('회원이 삭제되었습니다.', 'success');
            loadMembers();
        } else {
            throw new Error('삭제 실패');
        }
    } catch (error) {
        console.error('회원 삭제 실패:', error);
        showToast('회원 삭제에 실패했습니다.', 'error');
    }
}

// 폼 제출
document.getElementById('memberForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const memberId = document.getElementById('memberId').value;
    const investmentAmountStr = document.getElementById('investmentAmount').value.replace(/,/g, ''); // 쉼표 제거
    const investmentAmount = parseInt(investmentAmountStr) || 0;
    
    const accumulatedDividendStr = document.getElementById('accumulatedDividend').value.replace(/,/g, ''); // 쉼표 제거
    const accumulatedDividend = parseInt(accumulatedDividendStr) || 0;
    
    // 투자금액에 따른 배당률 자동 설정 (시뮬레이션 페이지 기준)
    let dividendRate = '';
    if (investmentAmount > 0) {
        if (investmentAmount <= 10000000) {
            // 1천만원 이하: 2.5%
            dividendRate = '2.5%';
        } else if (investmentAmount <= 50000000) {
            // 5천만원 이하: 3.0%
            dividendRate = '3.0%';
        } else if (investmentAmount < 100000000) {
            // 1억원 미만: 3.5%
            dividendRate = '3.5%';
        } else {
            // 1억원 이상: 4.0%
            dividendRate = '4.0%';
        }
    }
    
    // 주민번호 합치기 (예: "900101"과 "1" -> "900101-1")
    const idNumber1 = document.getElementById('idNumber1').value.trim();
    const idNumber2 = document.getElementById('idNumber2').value.trim();
    const idNumber = (idNumber1 && idNumber2) ? `${idNumber1}-${idNumber2}` : '';
    
    const memberData = {
        // camelCase 필드 (기존 관리자 시스템용)
        memberName: document.getElementById('memberName').value,
        idNumber: idNumber,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        address: document.getElementById('address').value,
        referrer: document.getElementById('referrer').value,
        investmentDate: document.getElementById('investmentDate').value || null,
        dividendPaymentDate: document.getElementById('dividendPaymentDate').value || null,
        investmentAmount: investmentAmount,
        dividendRate: dividendRate,
        investorLevel: document.getElementById('investorLevel').value,
        investmentMonths: parseInt(document.getElementById('investmentMonths').value) || 0,
        accumulatedDividend: accumulatedDividend,
        notes: document.getElementById('notes').value,
        
        // snake_case 필드 (회원가입 시스템 호환용)
        name: document.getElementById('memberName').value,
        id_number: idNumber,
        phone: document.getElementById('phoneNumber').value,
        investment_date: document.getElementById('investmentDate').value || null,
        dividend_payment_date: document.getElementById('dividendPaymentDate').value || null,
        investment_amount: investmentAmount,
        dividend_rate: dividendRate,
        investor_level: document.getElementById('investorLevel').value,
        investment_months: parseInt(document.getElementById('investmentMonths').value) || 0,
        accumulated_dividend: accumulatedDividend
    };
    
    // 신규 회원인 경우 가입일 추가
    if (!memberId) {
        memberData.signupDate = new Date().toISOString();
    }
    
    try {
        let response;
        
        if (memberId) {
            // 수정
            response = await fetch(`tables/members_v2/${memberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(memberData)
            });
        } else {
            // 신규 등록
            response = await fetch('tables/members_v2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(memberData)
            });
        }
        
        if (response.ok) {
            showToast(memberId ? '회원 정보가 수정되었습니다.' : '새 회원이 추가되었습니다.', 'success');
            closeModal();
            loadMembers();
        } else {
            throw new Error('저장 실패');
        }
    } catch (error) {
        console.error('회원 정보 저장 실패:', error);
        showToast('회원 정보 저장에 실패했습니다.', 'error');
    }
});

// 로그아웃
document.getElementById('btnLogout').addEventListener('click', function() {
    if (confirm('정말로 로그아웃 하시겠습니까?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('adminLoginTime');
        
        showToast('로그아웃 되었습니다.', 'success');
        
        setTimeout(() => {
            window.location.href = 'admin-login.html';
        }, 1000);
    }
});

// 투자금액 입력 시 배당률 자동 설정 및 포맷팅
document.getElementById('investmentAmount').addEventListener('input', function(e) {
    // 숫자만 추출
    let value = e.target.value.replace(/,/g, '');
    
    // 숫자가 아닌 문자 제거
    value = value.replace(/[^\d]/g, '');
    
    // 빈 값이면 처리 중단
    if (!value) {
        e.target.value = '';
        updateDividendRate();
        return;
    }
    
    // 숫자로 변환하고 쉼표 추가
    const numValue = parseInt(value);
    e.target.value = numValue.toLocaleString('ko-KR');
    
    // 배당률 자동 설정
    updateDividendRate();
});

// 누적 차월 입력 시 누적 배당금 자동 계산
document.getElementById('investmentMonths').addEventListener('input', function() {
    calculateAccumulatedDividend();
});

// 배당률 변경 시 누적 배당금 자동 계산
document.getElementById('dividendRate').addEventListener('change', function() {
    calculateAccumulatedDividend();
});

// 페이지 로드 시 데이터 로드
window.addEventListener('DOMContentLoaded', function() {
    loadMembers();
});
