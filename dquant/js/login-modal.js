// 로그인 모달 HTML 생성 및 삽입
document.addEventListener('DOMContentLoaded', function() {
    // 로그인 모달 HTML
    const loginModalHTML = `
        <div id="loginModal" class="auth-modal" style="display: none;">
            <div class="auth-modal-overlay"></div>
            <div class="auth-modal-content">
                <button class="auth-modal-close" id="closeLoginModal">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="auth-modal-header">
                    <h2 class="auth-modal-title">로그인</h2>
                    <p class="auth-modal-subtitle">D-QUANT 9.0에 오신 것을 환영합니다</p>
                </div>
                
                <form id="loginForm" class="auth-form">
                    <div class="auth-form-group">
                        <label for="loginEmail">이메일</label>
                        <div class="auth-input-wrapper">
                            <i class="fas fa-envelope"></i>
                            <input type="email" id="loginEmail" placeholder="이메일을 입력하세요" required>
                        </div>
                    </div>
                    
                    <div class="auth-form-group">
                        <label for="loginPassword">비밀번호</label>
                        <div class="auth-input-wrapper">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="loginPassword" placeholder="비밀번호를 입력하세요" required>
                            <button type="button" class="password-toggle-btn" data-target="loginPassword">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="auth-form-options">
                        <label class="remember-email-label">
                            <input type="checkbox" id="rememberEmail">
                            <span>이메일 기억하기</span>
                        </label>
                    </div>
                    
                    <button type="submit" class="auth-submit-btn">로그인</button>
                    
                    <div class="auth-modal-footer">
                        <p>계정이 없으신가요? <a href="signup.html" class="modal-switch-link">회원가입</a></p>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // 로그인 모달 CSS
    const loginModalCSS = `
        <style>
            .auth-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }
            
            .auth-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
            }
            
            .auth-modal-content {
                position: relative;
                background: linear-gradient(135deg, #0a0e27 0%, #12162e 100%);
                border: 1px solid rgba(0, 242, 255, 0.2);
                border-radius: 16px;
                padding: 2.5rem;
                width: 100%;
                max-width: 450px;
                box-shadow: 0 20px 60px rgba(0, 242, 255, 0.2);
                animation: modalSlideIn 0.3s ease-out;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .auth-modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.5);
                font-size: 1.5rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                transition: all 0.3s;
            }
            
            .auth-modal-close:hover {
                color: #00f2ff;
                background: rgba(0, 242, 255, 0.1);
            }
            
            .auth-modal-header {
                text-align: center;
                margin-bottom: 2rem;
            }
            
            .auth-modal-title {
                font-size: 2rem;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 0.5rem;
            }
            
            .auth-modal-subtitle {
                font-size: 0.95rem;
                color: rgba(255, 255, 255, 0.6);
            }
            
            .auth-form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .auth-form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .auth-form-group label {
                font-size: 0.95rem;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .auth-input-wrapper {
                position: relative;
                display: flex;
                align-items: center;
            }
            
            .auth-input-wrapper i.fa-envelope,
            .auth-input-wrapper i.fa-lock {
                position: absolute;
                left: 1rem;
                color: rgba(255, 255, 255, 0.4);
                font-size: 1rem;
            }
            
            .auth-input-wrapper input {
                width: 100%;
                padding: 1rem 3.5rem 1rem 3rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                color: #ffffff;
                font-size: 1rem;
                transition: all 0.3s;
            }
            
            .auth-input-wrapper input:focus {
                outline: none;
                border-color: #00f2ff;
                background: rgba(255, 255, 255, 0.08);
                box-shadow: 0 0 0 3px rgba(0, 242, 255, 0.1);
            }
            
            .password-toggle-btn {
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.4);
                cursor: pointer;
                padding: 0.5rem;
                transition: color 0.3s;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .password-toggle-btn:hover {
                color: #00f2ff;
            }
            
            .password-toggle-btn i {
                font-size: 1.2rem;
                pointer-events: none;
            }
            
            .auth-form-options {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .remember-email-label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
            }
            
            .remember-email-label input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
            }
            
            .auth-submit-btn {
                width: 100%;
                padding: 1rem;
                background: linear-gradient(135deg, #00f2ff 0%, #00b8d4 100%);
                border: none;
                border-radius: 8px;
                color: #0a0a0a;
                font-size: 1.1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s;
                margin-top: 0.5rem;
            }
            
            .auth-submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 242, 255, 0.3);
            }
            
            .auth-modal-footer {
                text-align: center;
                margin-top: 1.5rem;
            }
            
            .auth-modal-footer p {
                font-size: 0.9rem;
                color: rgba(255, 255, 255, 0.6);
            }
            
            .modal-switch-link {
                color: #00f2ff;
                text-decoration: none;
                font-weight: 600;
                transition: opacity 0.3s;
            }
            
            .modal-switch-link:hover {
                opacity: 0.8;
            }
            
            @media (max-width: 768px) {
                .auth-modal-content {
                    padding: 2rem 1.5rem;
                    max-width: 95%;
                }
                
                .auth-modal-title {
                    font-size: 1.75rem;
                }
                
                .auth-input-wrapper input {
                    padding: 0.875rem 0.875rem 0.875rem 2.75rem;
                    font-size: 0.95rem;
                }
                
                .auth-submit-btn {
                    padding: 0.875rem;
                    font-size: 1rem;
                }
            }
        </style>
    `;
    
    // CSS를 head에 추가
    document.head.insertAdjacentHTML('beforeend', loginModalCSS);
    
    // 모달을 body에 추가
    document.body.insertAdjacentHTML('beforeend', loginModalHTML);
    
    // 로그인 버튼 이벤트 리스너
    const loginBtns = document.querySelectorAll('#loginBtn, #mobileLoginBtn, #mobileLoginBtn2');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginForm = document.getElementById('loginForm');
    
    // 로그인 모달 열기
    loginBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            
            // 저장된 이메일 불러오기
            const rememberedEmail = localStorage.getItem('rememberedEmail');
            if (rememberedEmail) {
                document.getElementById('loginEmail').value = rememberedEmail;
                document.getElementById('rememberEmail').checked = true;
            }
        });
    });
    
    // 로그인 모달 닫기
    closeLoginModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });
    
    // 오버레이 클릭 시 닫기
    loginModal.querySelector('.auth-modal-overlay').addEventListener('click', function() {
        loginModal.style.display = 'none';
    });
    
    // 비밀번호 보기/숨기기 - 로그인 모달 전용
    const passwordToggleBtn = loginModal.querySelector('.password-toggle-btn');
    if (passwordToggleBtn) {
        passwordToggleBtn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            console.log('비밀번호 토글 버튼 클릭됨');
            console.log('targetId:', targetId);
            console.log('input:', input);
            console.log('현재 input.type:', input ? input.type : 'null');
            
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    if (icon) {
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                    }
                    console.log('비밀번호 표시로 변경');
                } else {
                    input.type = 'password';
                    if (icon) {
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                    }
                    console.log('비밀번호 숨김으로 변경');
                }
            } else {
                console.error('input 요소를 찾을 수 없습니다:', targetId);
            }
        });
    } else {
        console.error('password-toggle-btn을 찾을 수 없습니다');
    }
    
    // 로그인 폼 제출
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberEmail = document.getElementById('rememberEmail').checked;
        
        // 이메일 기억하기
        if (rememberEmail) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        try {
            // 회원 정보 조회
            const response = await fetch(`tables/members_v2?search=${encodeURIComponent(email)}&limit=100`);
            const result = await response.json();
            
            if (result.data && result.data.length > 0) {
                // 이메일이 정확히 일치하는 회원 찾기
                const member = result.data.find(m => m.email === email);
                
                if (member) {
                    // 비밀번호 확인
                    if (member.password === password) {
                        // 로그인 성공
                        localStorage.setItem('loggedInUser', email);
                        alert('로그인되었습니다!');
                        loginModal.style.display = 'none';
                        
                        // 로그인 버튼을 로그아웃 버튼으로 변경
                        updateLoginStatus();
                        
                        // 현재 페이지가 index.html이면 새로고침
                        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                            window.location.reload();
                        }
                    } else {
                        alert('비밀번호가 일치하지 않습니다.');
                    }
                } else {
                    alert('등록되지 않은 이메일입니다.');
                }
            } else {
                alert('등록되지 않은 이메일입니다.');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    });
    
    // 로그인 상태 업데이트
    function updateLoginStatus() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const loginBtns = document.querySelectorAll('#loginBtn, #mobileLoginBtn2');
        const loginTexts = document.querySelectorAll('.login-text');
        
        if (loggedInUser) {
            // 로그인됨 -> 로그아웃 버튼으로 변경
            loginBtns.forEach(btn => {
                btn.textContent = '로그아웃';
                btn.onclick = function(e) {
                    e.preventDefault();
                    if (confirm('로그아웃하시겠습니까?')) {
                        localStorage.removeItem('loggedInUser');
                        alert('로그아웃되었습니다.');
                        window.location.href = 'index.html';
                    }
                };
            });
            
            loginTexts.forEach(text => {
                text.textContent = '로그아웃';
            });
        }
    }
    
    // 페이지 로드 시 로그인 상태 확인
    updateLoginStatus();
});
