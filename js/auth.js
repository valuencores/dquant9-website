/**
 * 디퀀트나인 인증 시스템
 * 모든 페이지에서 로그인 상태 확인 및 메뉴 업데이트
 */

// 로그인 상태 확인
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
}

// 로그인 메뉴명 업데이트
function updateLoginMenu() {
    const user = checkLoginStatus();
    const loginBtns = document.querySelectorAll('#loginBtn, #mobileLoginBtn2');
    const signupBtns = document.querySelectorAll('#signupBtn, #mobileSignupBtn2');
    
    if (user) {
        // 로그인된 상태: "로그아웃" 표시 (밝은 보라색)
        loginBtns.forEach(btn => {
            // 텍스트 업데이트
            const textSpan = btn.querySelector('.login-text');
            if (textSpan) {
                // 햄버거 메뉴 (span이 있는 경우)
                textSpan.textContent = '로그아웃';
                textSpan.style.color = '#B794F4'; // 밝은 보라색
                textSpan.style.fontWeight = '600';
            } else {
                // PC 메뉴 (span이 없는 경우)
                btn.textContent = '로그아웃';
                btn.style.color = '#B794F4'; // 밝은 보라색
                btn.style.fontWeight = '600';
            }
            
            // 아이콘 업데이트
            const icon = btn.querySelector('.login-icon');
            if (icon) {
                icon.classList.remove('fa-sign-in-alt');
                icon.classList.add('fa-sign-out-alt');
                icon.style.color = '#B794F4'; // 밝은 보라색
            }
        });
        
        // 회원가입 버튼 숨기기
        signupBtns.forEach(btn => {
            btn.style.display = 'none';
            console.log('회원가입 버튼 숨김:', btn);
        });
        
        console.log('로그인 상태 - 회원가입 버튼 숨김 처리 완료');
    } else {
        // 로그아웃 상태: "로그인" 표시 (기본 색상)
        loginBtns.forEach(btn => {
            // 텍스트 업데이트
            const textSpan = btn.querySelector('.login-text');
            if (textSpan) {
                // 햄버거 메뉴 (span이 있는 경우)
                textSpan.textContent = '로그인';
                textSpan.style.color = ''; // 기본 색상으로 복원
                textSpan.style.fontWeight = '';
            } else {
                // PC 메뉴 (span이 없는 경우)
                btn.textContent = '로그인';
                btn.style.color = ''; // 기본 색상으로 복원
                btn.style.fontWeight = '';
            }
            
            // 아이콘 업데이트
            const icon = btn.querySelector('.login-icon');
            if (icon) {
                icon.classList.remove('fa-sign-out-alt');
                icon.classList.add('fa-sign-in-alt');
                icon.style.color = ''; // 기본 색상으로 복원
            }
        });
        
        // 회원가입 버튼 표시
        signupBtns.forEach(btn => {
            btn.style.display = '';
            console.log('회원가입 버튼 표시:', btn);
        });
        
        console.log('로그아웃 상태 - 회원가입 버튼 표시 처리 완료');
    }
}

// 로그아웃 처리
function handleLogout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        localStorage.removeItem('loggedInUser');
        alert('로그아웃되었습니다.');
        // 메인 페이지로 리다이렉트
        window.location.href = 'index.html';
    }
}

// 로그인 버튼 클릭 핸들러
function handleLoginClick(e) {
    e.preventDefault();
    
    const user = checkLoginStatus();
    
    if (user) {
        // 로그인된 상태: 로그아웃 처리
        handleLogout();
    } else {
        // 로그아웃 상태: 로그인 모달 표시
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.style.display = 'flex';
        }
    }
}

// 로그인 폼 제출 핸들러
async function handleLoginSubmit(e, loginForm) {
    e.preventDefault();
    
    const emailInput = loginForm.querySelector('#loginEmail, input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : '';
    
    if (!email) {
        alert('이메일을 입력해주세요.');
        return;
    }
    
    try {
        // 이메일로 회원 조회
        const response = await fetch(`tables/members_v2?search=${encodeURIComponent(email)}&limit=1000`);
        const result = await response.json();
        
        const member = result.data?.find(m => 
            (m.email || m.memberEmail) === email
        );
        
        if (member) {
            // 로그인 성공
            const userData = {
                email: member.email || member.memberEmail,
                name: member.name || member.memberName,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('loggedInUser', JSON.stringify(userData));
            
            alert(`환영합니다, ${userData.name}님!`);
            
            // 로그인 모달 닫기
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                loginModal.style.display = 'none';
            }
            
            // 로그인 메뉴 업데이트
            updateLoginMenu();
            
            // 현재 페이지가 my-assets.html이면 리로드
            if (window.location.pathname.includes('my-assets.html')) {
                location.reload();
            }
        } else {
            alert('등록되지 않은 이메일입니다.');
        }
    } catch (error) {
        console.error('로그인 오류:', error);
        alert('로그인 중 오류가 발생했습니다.');
    }
}

// 로그인 시스템 초기화
function initLoginSystem() {
    // 페이지 로드 시 로그인 상태 확인 및 메뉴 업데이트
    updateLoginMenu();
    
    // 로그인 버튼에 이벤트 리스너 추가
    const loginBtns = document.querySelectorAll('#loginBtn, #mobileLoginBtn2');
    loginBtns.forEach(btn => {
        btn.addEventListener('click', handleLoginClick);
    });
    
    // 로그인 폼이 있으면 제출 이벤트 리스너 추가
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => handleLoginSubmit(e, loginForm));
    }
    
    // 로그인 모달 닫기 버튼
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }
    
    // 모달 배경 클릭 시 닫기
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }
}

// 페이지 로드 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoginSystem);
} else {
    initLoginSystem();
}
