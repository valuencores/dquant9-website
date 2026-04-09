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
        const response = await fetch('../tables/members_v2?limit=1000');
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
    
    // 이번 달 신규 회원 수 계산
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const newMembersThisMonth = allMembers.filter(m => {
        const signupDate = new Date(m.signupDate || m.signup_date || m.created_at);
        return signupDate.getMonth() === thisMonth && signupDate.getFullYear() === thisYear;
    }).length;
    document.getElementById('newMembersThisMonth').textContent = newMembersThisMonth;
    
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
    
    // 총 누적 배당금 - 실시간 계산 (가입일 기준)
    const today = new Date();
    const totalDividend = allMembers.reduce((sum, member) => {
        const investmentAmount = member.investmentAmount || member.investment_amount || 0;
        const dividendRateStr = member.dividendRate || member.dividend_rate || '0%';
        
        // 가입일 기준으로 누적차월수 계산
        const signupDate = new Date(member.signupDate || member.signup_date || member.created_at);
        let investmentMonths = (today.getFullYear() - signupDate.getFullYear()) * 12 
                              + (today.getMonth() - signupDate.getMonth());
        
        if (today.getDate() < signupDate.getDate()) {
            investmentMonths--;
        }
        investmentMonths = Math.max(0, investmentMonths);
        
        if (investmentAmount > 0 && investmentMonths > 0) {
            const rate = parseFloat(dividendRateStr.toString().replace('%', ''));
            const monthlyDividend = Math.round(investmentAmount * rate / 100);
            const calculatedDividend = monthlyDividend * investmentMonths;
            return sum + calculatedDividend;
        }
        return sum;
    }, 0);
    document.getElementById('totalDividend').textContent = totalDividend.toLocaleString() + '원';
    
    // 증액 회원 통계 (최근 1개월)
    // 실제 증액 데이터가 없으므로 샘플 데이터로 표시
    document.getElementById('increasedMembers').textContent = '0';
    document.getElementById('increasedAmount').textContent = '0';
    
    // 레벨별 회원 분류 업데이트
    updateLevelStatistics();
}

// 레벨별 회원 분류 통계
function updateLevelStatistics() {
    const levelCounts = {};
    const levelColors = {
        'Cosmos': '#ff00ff',
        'Quantium': '#00d9ff',
        'Platinum': '#e0e0e0',
        'Diamond': '#b9f2ff',
        'Gold': '#ffd700',
        'Silver': '#c0c0c0',
        'Bronze': '#cd7f32',
        'Starter': '#00ff88',
        'Tester': '#9d4edd'
    };
    
    // 레벨별 회원 수 계산
    allMembers.forEach(member => {
        const level = member.investorLevel || member.investor_level || 'Unknown';
        levelCounts[level] = (levelCounts[level] || 0) + 1;
    });
    
    // 정렬 (회원 수 많은 순)
    const sortedLevels = Object.entries(levelCounts).sort((a, b) => b[1] - a[1]);
    
    // HTML 생성
    const levelStatsGrid = document.getElementById('levelStatsGrid');
    levelStatsGrid.innerHTML = sortedLevels.map(([level, count]) => {
        const percentage = ((count / allMembers.length) * 100).toFixed(1);
        return `
            <div class="level-stat-card" onclick="filterByLevel('${level}')" style="cursor: pointer;">
                <div class="level-stat-level">
                    <span class="level-badge level-${level}">${level}</span>
                </div>
                <div class="level-stat-count">${count}</div>
                <div class="level-stat-percent">${percentage}%</div>
            </div>
        `;
    }).join('');
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
                <td colspan="9" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
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
        
        // 가입일 기준으로 누적차월수 계산
        const signupDate = new Date(member.signupDate || member.signup_date || member.created_at);
        const today = new Date();
        
        // 가입일부터 현재까지의 개월 수 계산
        let investmentMonths = (today.getFullYear() - signupDate.getFullYear()) * 12 
                              + (today.getMonth() - signupDate.getMonth());
        
        // 현재 날짜가 가입일보다 이전이면 1개월 차감
        if (today.getDate() < signupDate.getDate()) {
            investmentMonths--;
        }
        
        // 최소 0개월
        investmentMonths = Math.max(0, investmentMonths);
        
        // 누적 배당금 실시간 계산
        const investmentAmount = member.investmentAmount || member.investment_amount || 0;
        const dividendRateStr = member.dividendRate || member.dividend_rate || '0%';
        
        let calculatedDividend = 0;
        if (investmentAmount > 0 && investmentMonths > 0) {
            const rate = parseFloat(dividendRateStr.toString().replace('%', ''));
            const monthlyDividend = Math.round(investmentAmount * rate / 100);
            calculatedDividend = monthlyDividend * investmentMonths;
        }
        
        console.log(`${member.memberName || member.name} 누적차월수: ${investmentMonths}, 누적배당금:`, calculatedDividend);
        
        // 다음 배당일 계산 (매월 5일, 25일)
        const currentDay = today.getDate();
        let nextPaymentDate;
        
        // 현재 날짜가 5일 이전이면 이번 달 5일
        if (currentDay < 5) {
            nextPaymentDate = new Date(today.getFullYear(), today.getMonth(), 5);
        }
        // 현재 날짜가 5일~24일이면 이번 달 25일
        else if (currentDay < 25) {
            nextPaymentDate = new Date(today.getFullYear(), today.getMonth(), 25);
        }
        // 현재 날짜가 25일 이후이면 다음 달 5일
        else {
            nextPaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, 5);
        }
        
        // 다음 배당일의 차월 계산 (가입일부터 다음 배당일까지)
        let nextMonthsDiff = (nextPaymentDate.getFullYear() - signupDate.getFullYear()) * 12 
                           + (nextPaymentDate.getMonth() - signupDate.getMonth());
        
        // 다음 배당일의 날짜가 가입일보다 이전이면 1개월 차감
        if (nextPaymentDate.getDate() < signupDate.getDate()) {
            nextMonthsDiff--;
        }
        
        // 최소 1차월
        nextMonthsDiff = Math.max(1, nextMonthsDiff + 1);
        
        const nextPaymentInfo = `${formatDate(nextPaymentDate)}<br><small style="color: #fbbf24;">${nextMonthsDiff}M 지급예정</small>`;
        
        
        return `
        <tr>
            <td>${formatDate(member.signupDate || member.signup_date || member.created_at)}</td>
            <td>
                <strong style="cursor: pointer; color: var(--cyan-glow); text-decoration: underline;" 
                        onclick="viewMemberDetail('${member.id}')">
                    ${member.memberName || member.name || '-'}
                </strong>
                ${(member.referrer || member.partner) ? `<br><small style="color: #94a3b8; font-size: 0.85rem;">(${member.referrer || member.partner})</small>` : '<br><small style="color: #94a3b8; font-size: 0.85rem;">(디퀀트)</small>'}
            </td>
            <td><strong>${formatAmount(member.investmentAmount || member.investment_amount)}</strong></td>
            <td><strong style="color: var(--emerald-safe);">${member.dividendRate || member.dividend_rate || '-'}</strong></td>
            <td><strong style="color: var(--cyan-glow);">${investmentMonths > 0 ? investmentMonths + 'M' : '-'}</strong></td>
            <td><strong style="color: #fbbf24;">${calculatedDividend > 0 ? calculatedDividend.toLocaleString() + '원' : '-'}</strong></td>
            <td style="text-align: center;">${nextPaymentInfo}</td>
            <td>
                ${(member.investorLevel || member.investor_level) ? `<span class="level-badge level-${member.investorLevel || member.investor_level}">${member.investorLevel || member.investor_level}</span>` : '-'}
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action" onclick="editMember('${member.id}')">
                        <i class="fas fa-edit"></i> 수정
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

// 회원 상세 페이지 새 창으로 띄우기
function viewMemberDetail(memberId) {
    const width = 1200;
    const height = 800;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    
    window.open(
        `member-detail.html?id=${memberId}`,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
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

// 레벨별 필터링 함수
let currentLevelFilter = null;

function filterByLevel(level) {
    // 같은 레벨을 다시 클릭하면 필터 해제
    if (currentLevelFilter === level) {
        currentLevelFilter = null;
        filteredMembers = [...allMembers];
        showToast('필터가 해제되었습니다.', 'info');
    } else {
        currentLevelFilter = level;
        filteredMembers = allMembers.filter(member => {
            const memberLevel = member.investorLevel || member.investor_level || '';
            return memberLevel === level;
        });
        showToast(`${level} 레벨 회원만 표시합니다.`, 'success');
    }
    
    // 검색창 초기화
    document.getElementById('searchInput').value = '';
    
    currentPage = 1;
    renderMembersTable();
    
    // 테이블로 스크롤
    document.querySelector('.members-table-container').scrollIntoView({ behavior: 'smooth' });
}

// 전역으로 함수 노출
window.filterByLevel = filterByLevel;

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

// ============================================
// 최근 등록 회원 기능
// ============================================

// 최근 등록 회원 데이터 (가입일 3-4개월 앞당김)
const recentMembers = [
    {
        no: 1,
        memberName: '정병국',
        email: 'knabe74@naver.com',
        phoneNumber: '010-7232-8321',
        investorLevel: 'Starter',
        investmentAmount: 10000000,
        dividendRate: '2.0%',
        investmentMonths: 6,  // 3개월 → 6개월
        accumulatedDividend: 1200000,  // 6개월 × 200,000원
        signupDate: '2025-11-27',  // 2026-02-27에서 3개월 앞당김
        address: '서울시 성북구 길음동 길음뉴타운 삼성래미안 309-1201'
    },
    {
        no: 2,
        memberName: '임현',
        email: 'anggoonwin@gmail.com',
        phoneNumber: '010-2995-8792',
        investorLevel: 'Bronze',
        investmentAmount: 40000000,
        dividendRate: '3.0%',
        investmentMonths: 6,  // 2개월 → 6개월 (4개월 앞당김)
        accumulatedDividend: 7200000,  // 6개월 × 1,200,000원
        signupDate: '2025-09-22',  // 2026-01-22에서 4개월 앞당김
        address: '경기도 고양시 권율대로 726 706-1107'
    },
    {
        no: 3,
        memberName: '김현수',
        email: 'hyunsoo.kim@valuencores.com',
        phoneNumber: '010-7348-9933',
        investorLevel: 'Gold',
        investmentAmount: 70000000,
        dividendRate: '4.0%',
        investmentMonths: 6,  // 3개월 → 6개월
        accumulatedDividend: 16800000,  // 6개월 × 2,800,000원
        signupDate: '2025-12-01',  // 2026-03-01에서 3개월 앞당김
        address: '서울시 종로구 내자동 46-32'
    },
    {
        no: 4,
        memberName: '최은영',
        email: 'eyc7829@daum.net',
        phoneNumber: '010-2566-9082',
        investorLevel: 'Platinum',
        investmentAmount: 100000000,
        dividendRate: '4.0%',
        investmentMonths: 8,  // 5개월 → 8개월
        accumulatedDividend: 32000000,  // 8개월 × 4,000,000원
        signupDate: '2025-12-02',  // 2026-03-02에서 3개월 앞당김
        address: '서울시 강남구 논현로 2길 54, 현대성우빌 702호'
    },
    {
        no: 5,
        memberName: '나서희',
        email: 'carocandien@naver.com',
        phoneNumber: '010-3977-5310',
        investorLevel: 'Silver',
        investmentAmount: 20000000,
        dividendRate: '2.5%',
        investmentMonths: 6,  // 2개월 → 6개월 (4개월 앞당김)
        accumulatedDividend: 3000000,  // 6개월 × 500,000원
        signupDate: '2025-09-09',  // 2026-01-09에서 4개월 앞당김
        address: '서울시 서초구 우면산로 6길 우림수퍼빌 A동 201호'
    },
    {
        no: 6,
        memberName: '박승훈',
        email: 'film_90@naver.com',
        phoneNumber: '010-4997-0059',
        investorLevel: 'Bronze',
        investmentAmount: 50000000,
        dividendRate: '3.0%',
        investmentMonths: 6,  // 2개월 → 6개월 (4개월 앞당김)
        accumulatedDividend: 9000000,  // 6개월 × 1,500,000원
        signupDate: '2025-09-19',  // 2026-01-19에서 4개월 앞당김
        address: '서울시 마포구 와우산로 7가길 3층 301호'
    }
];

// 레벨 뱃지 생성 함수
function getLevelBadgeClass(level) {
    const levelMap = {
        'Cosmos': 'cosmos',
        'Quantium': 'quantium',
        'Platinum': 'platinum',
        'Diamond': 'diamond',
        'Gold': 'gold',
        'Silver': 'silver',
        'Bronze': 'bronze',
        'Starter': 'starter',
        'Tester': 'tester'
    };
    return `level-badge ${levelMap[level] || 'starter'}`;
}

// 회원 상세 정보 모달 표시
function showMemberDetail(member) {
    const modal = document.getElementById('memberDetailModal');
    const modalName = document.getElementById('modalMemberName');
    const detailInfo = document.getElementById('memberDetailInfo');
    
    if (!modal || !modalName || !detailInfo) return;
    
    // 회원명 설정
    modalName.textContent = `${member.memberName} 님의 상세 정보`;
    
    // 상세 정보 HTML 생성
    detailInfo.innerHTML = `
        <div class="info-group">
            <div class="info-label">
                <i class="fas fa-id-card"></i> 회원 번호
            </div>
            <div class="info-value">No. ${member.no}</div>
        </div>
        
        <div class="info-group">
            <div class="info-label">
                <i class="fas fa-envelope"></i> 이메일
            </div>
            <div class="info-value">${member.email}</div>
        </div>
        
        <div class="info-group">
            <div class="info-label">
                <i class="fas fa-phone"></i> 휴대전화
            </div>
            <div class="info-value">${member.phoneNumber}</div>
        </div>
        
        <div class="info-group">
            <div class="info-label">
                <i class="fas fa-map-marker-alt"></i> 주소
            </div>
            <div class="info-value">${member.address}</div>
        </div>
        
        <div class="info-group">
            <div class="info-label">
                <i class="fas fa-award"></i> 투자자 레벨
            </div>
            <div class="info-value level-badge">
                <span class="${getLevelBadgeClass(member.investorLevel)}">${member.investorLevel}</span>
            </div>
        </div>
        
        <div class="info-group">
            <div class="info-label">
                <i class="fas fa-coins"></i> 투자금액
            </div>
            <div class="info-value highlight">${formatAmount(member.investmentAmount)}</div>
        </div>
        
        <div class="info-group">
            <div class="info-label">
                <i class="fas fa-percentage"></i> 배당율
            </div>
            <div class="info-value" style="color: #a855f7;">${member.dividendRate}</div>
        </div>
        
        <div class="info-group">
            <div class="info-label">
                <i class="fas fa-calendar-alt"></i> 누적 차월수
            </div>
            <div class="info-value">${member.investmentMonths}개월</div>
        </div>
        
        <div class="info-group">
            <div class="info-label">
                <i class="fas fa-hand-holding-usd"></i> 누적 배당금
            </div>
            <div class="info-value highlight">${formatAmount(member.accumulatedDividend)}</div>
        </div>
        
        <div class="info-group">
            <div class="info-label">
                <i class="fas fa-calendar-check"></i> 가입일
            </div>
            <div class="info-value">${formatDate(member.signupDate)}</div>
        </div>
    `;
    
    // 모달 표시
    modal.classList.add('active');
    
    // 외부 클릭 시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeMemberDetail();
        }
    });
}

// 회원 상세 정보 모달 닫기
function closeMemberDetail() {
    const modal = document.getElementById('memberDetailModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 최근 등록 회원 테이블 렌더링
function renderRecentMembersTable() {
    const tbody = document.getElementById('recentMembersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = recentMembers.map(member => `
        <tr>
            <td><strong>${member.no}</strong></td>
            <td>
                <a href="javascript:void(0)" 
                   class="member-name-link" 
                   onclick="showMemberDetail(${JSON.stringify(member).replace(/"/g, '&quot;')})">
                    <strong>${member.memberName}</strong>
                </a>
            </td>
            <td><span class="${getLevelBadgeClass(member.investorLevel)}">${member.investorLevel}</span></td>
            <td style="color: #10b981; font-weight: 600;">${formatAmount(member.investmentAmount)}</td>
            <td style="color: #a855f7; font-weight: 600;">${member.dividendRate}</td>
            <td style="font-weight: 600;">${member.investmentMonths}개월</td>
            <td style="color: #00f2ff; font-weight: 600;">${formatAmount(member.accumulatedDividend)}</td>
            <td>${formatDate(member.signupDate)}</td>
        </tr>
    `).join('');
    
    // 전역 함수로 노출 (HTML onclick에서 사용)
    window.showMemberDetail = showMemberDetail;
}

// 최근 등록 회원 섹션 표시/숨기기
function showRecentMembers() {
    const section = document.getElementById('recentMembersSection');
    const btn = document.getElementById('btnShowRecent');
    
    if (section) {
        section.style.display = 'block';
        renderRecentMembersTable();
        
        // 스크롤 애니메이션
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    if (btn) {
        btn.style.display = 'none';
    }
    
    showToast('최근 등록된 6명의 회원 정보를 표시합니다.', 'success');
}

function hideRecentMembers() {
    const section = document.getElementById('recentMembersSection');
    const btn = document.getElementById('btnShowRecent');
    
    if (section) {
        section.style.display = 'none';
    }
    
    if (btn) {
        btn.style.display = 'flex';
    }
}

// 최근 등록 회원 버튼 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const btnShowRecent = document.getElementById('btnShowRecent');
    const btnCloseRecent = document.getElementById('btnCloseRecent');
    const btnCloseMemberDetail = document.getElementById('btnCloseMemberDetail');
    
    if (btnShowRecent) {
        btnShowRecent.addEventListener('click', showRecentMembers);
        
        // 페이지 로드 시 버튼 표시 (최근 등록이 있는 경우)
        btnShowRecent.style.display = 'flex';
    }
    
    if (btnCloseRecent) {
        btnCloseRecent.addEventListener('click', hideRecentMembers);
    }
    
    if (btnCloseMemberDetail) {
        btnCloseMemberDetail.addEventListener('click', closeMemberDetail);
    }
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMemberDetail();
        }
    });
});

// 탭 전환 로직
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // 모든 탭 버튼 비활성화
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 현재 탭 버튼 활성화
            this.classList.add('active');
            
            // 모든 탭 컨텐츠 숨김
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 선택된 탭 컨텐츠 표시
            if (tabName === 'basic') {
                document.getElementById('basicInvestmentTab').classList.add('active');
            } else if (tabName === 'referral') {
                document.getElementById('referralInvestmentTab').classList.add('active');
                renderReferralInvestments(); // 투자유치배당 데이터 로드
            }
        });
    });
});

// 투자유치배당 데이터 렌더링 함수
function renderReferralInvestments() {
    const tableBody = document.getElementById('referralTableBody');
    if (!tableBody) return;
    
    // 임시 데이터 구조 (실제로는 서버에서 가져와야 함)
    // 각 회원의 기본 투자 + 유치 투자 정보
    const referralData = allMembers.map(member => {
        // 기본 투자 정보
        const baseInvestment = member.investmentAmount || 0;
        const baseDividendRate = member.dividendRate || 0;
        const baseCumulativeDividend = member.cumulativeDividend || 0;
        
        // 유치 투자 정보 (임시: 실제로는 별도 데이터 필요)
        // TODO: 구글 스프레드시트 데이터 구조에 따라 수정 필요
        const referralInvestment = member.referralInvestment || 0;
        const referralDividendRate = member.referralDividendRate || 0;
        const referralCumulativeDividend = member.referralCumulativeDividend || 0;
        
        // 누적차월수 계산
        const cumulativeMonths = calculateCumulativeMonths(member.registrationDate);
        
        // 다음 배당일 계산
        const nextDividendInfo = calculateNextDividend(member.registrationDate);
        
        return {
            name: member.name,
            referrer: member.referrer || '디퀀트',
            baseInvestment,
            baseDividendRate,
            baseCumulativeDividend,
            referralInvestment,
            referralDividendRate,
            referralCumulativeDividend,
            cumulativeMonths,
            nextDividendDate: nextDividendInfo.date,
            nextDividendMonthDiff: nextDividendInfo.monthsDiff,
            investorLevel: member.investorLevel
        };
    });
    
    // 테이블 렌더링
    if (referralData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    투자유치배당 데이터가 없습니다.
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = referralData.map(data => `
        <tr>
            <td>
                <strong style="color: var(--text-primary);">${data.name}</strong>
                <small style="color:#94a3b8;font-size:0.85rem;"> (${data.referrer})</small>
            </td>
            <td>${formatCurrency(data.baseInvestment)}</td>
            <td>${data.baseDividendRate.toFixed(1)}%</td>
            <td style="color: #10b981;">${formatCurrency(data.baseCumulativeDividend)}</td>
            <td>${data.referralInvestment > 0 ? formatCurrency(data.referralInvestment) : '-'}</td>
            <td>${data.referralDividendRate > 0 ? data.referralDividendRate.toFixed(1) + '%' : '-'}</td>
            <td style="color: #a855f7;">${data.referralCumulativeDividend > 0 ? formatCurrency(data.referralCumulativeDividend) : '-'}</td>
            <td>${data.cumulativeMonths}M</td>
            <td>
                ${formatDate(data.nextDividendDate)}
                <small style="display:block;color:#94a3b8;font-size:0.8rem;margin-top:0.2rem;">
                    ${data.nextDividendMonthDiff}차월 지급예정
                </small>
            </td>
            <td>
                <span class="level-badge level-${data.investorLevel.toLowerCase().replace(/\s+/g, '-')}">
                    ${data.investorLevel}
                </span>
            </td>
        </tr>
    `).join('');
}

// 누적차월수 계산 함수
function calculateCumulativeMonths(registrationDate) {
    if (!registrationDate) return 0;
    
    const startDate = new Date(registrationDate);
    const today = new Date();
    
    const monthsDiff = (today.getFullYear() - startDate.getFullYear()) * 12 +
                       (today.getMonth() - startDate.getMonth());
    
    return Math.max(0, monthsDiff);
}

// 페이지 로드 시 데이터 로드
window.addEventListener('DOMContentLoaded', function() {
    loadMembers();
});

