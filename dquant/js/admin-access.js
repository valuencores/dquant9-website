/**
 * D-QUANT 9.0 Admin Access Button
 * 관리자 전용 접근 버튼 및 인증 시스템
 * 
 * @version 1.0.0
 * @date 2026-03-08
 */

(function() {
    'use strict';

    // 관리자 인증 정보
    const ADMIN_CREDENTIALS = {
        email: 'valuencores@gmail.com',
        password: '@vnc1201'
    };

    // 관리자 페이지 URL
    const ADMIN_PAGE_URL = 'https://www.genspark.ai/agents?id=4cd1f08e-a30f-4cc7-a848-d444f382f0a8';

    // 세션 스토리지 키
    const ADMIN_SESSION_KEY = 'dquant_admin_authenticated';

    /**
     * 관리자 인증 확인
     */
    function isAdminAuthenticated() {
        const authenticated = sessionStorage.getItem(ADMIN_SESSION_KEY);
        return authenticated === 'true';
    }

    /**
     * 관리자 인증 설정
     */
    function setAdminAuthentication(status) {
        if (status) {
            sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        } else {
            sessionStorage.removeItem(ADMIN_SESSION_KEY);
        }
    }

    /**
     * 관리자 로그인 프롬프트
     */
    function showAdminLoginPrompt() {
        return new Promise((resolve) => {
            // 커스텀 모달 생성
            const modal = document.createElement('div');
            modal.className = 'admin-auth-modal';
            modal.innerHTML = `
                <div class="admin-auth-overlay"></div>
                <div class="admin-auth-content">
                    <div class="admin-auth-header">
                        <h2>🔐 관리자 인증</h2>
                        <button class="admin-auth-close" aria-label="닫기">&times;</button>
                    </div>
                    <form class="admin-auth-form" id="adminAuthForm">
                        <div class="admin-form-group">
                            <label for="adminEmail">이메일</label>
                            <input 
                                type="email" 
                                id="adminEmail" 
                                placeholder="관리자 이메일을 입력하세요"
                                required
                                autocomplete="username"
                            >
                        </div>
                        <div class="admin-form-group">
                            <label for="adminPassword">비밀번호</label>
                            <div class="admin-password-wrapper">
                                <input 
                                    type="password" 
                                    id="adminPassword" 
                                    placeholder="비밀번호를 입력하세요"
                                    required
                                    autocomplete="current-password"
                                >
                                <button type="button" class="admin-password-toggle" aria-label="비밀번호 표시">
                                    <svg class="admin-eye-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
                                        <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="admin-auth-error" id="adminAuthError"></div>
                        <div class="admin-auth-actions">
                            <button type="button" class="admin-btn-cancel">취소</button>
                            <button type="submit" class="admin-btn-submit">로그인</button>
                        </div>
                    </form>
                </div>
            `;

            document.body.appendChild(modal);

            // 모달 요소 참조
            const overlay = modal.querySelector('.admin-auth-overlay');
            const closeBtn = modal.querySelector('.admin-auth-close');
            const cancelBtn = modal.querySelector('.admin-btn-cancel');
            const form = modal.querySelector('#adminAuthForm');
            const emailInput = modal.querySelector('#adminEmail');
            const passwordInput = modal.querySelector('#adminPassword');
            const passwordToggle = modal.querySelector('.admin-password-toggle');
            const errorDiv = modal.querySelector('#adminAuthError');

            // 포커스 설정
            setTimeout(() => emailInput.focus(), 100);

            // 비밀번호 토글
            passwordToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const svg = passwordToggle.querySelector('.admin-eye-icon');
                const currentType = passwordInput.type;
                
                console.log('비밀번호 토글 클릭, 현재 타입:', currentType);
                
                if (currentType === 'password') {
                    // 비밀번호 표시
                    passwordInput.type = 'text';
                    // 눈 감김 아이콘 (사선)
                    svg.innerHTML = `
                        <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"/>
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                    `;
                    passwordToggle.setAttribute('aria-label', '비밀번호 숨김');
                    passwordToggle.title = '비밀번호 숨김';
                    console.log('비밀번호 표시됨');
                } else {
                    // 비밀번호 숨김
                    passwordInput.type = 'password';
                    // 눈 뜸 아이콘
                    svg.innerHTML = `
                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
                        <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                    `;
                    passwordToggle.setAttribute('aria-label', '비밀번호 표시');
                    passwordToggle.title = '비밀번호 표시';
                    console.log('비밀번호 숨김됨');
                }
            });

            // 모달 닫기 함수
            const closeModal = () => {
                modal.classList.add('admin-auth-closing');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
                resolve(false);
            };

            // 닫기 이벤트
            closeBtn.addEventListener('click', closeModal);
            cancelBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);

            // ESC 키로 닫기
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);

            // 폼 제출 처리
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const email = emailInput.value.trim();
                const password = passwordInput.value;

                // 인증 확인
                if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
                    // 인증 성공
                    setAdminAuthentication(true);
                    errorDiv.textContent = '';
                    errorDiv.classList.remove('show');
                    
                    // 성공 메시지
                    errorDiv.className = 'admin-auth-success show';
                    errorDiv.textContent = '✓ 인증 성공! 관리자 페이지로 이동합니다...';
                    
                    setTimeout(() => {
                        modal.classList.add('admin-auth-closing');
                        setTimeout(() => {
                            document.body.removeChild(modal);
                        }, 300);
                        resolve(true);
                    }, 1000);
                } else {
                    // 인증 실패
                    errorDiv.className = 'admin-auth-error show';
                    errorDiv.textContent = '✗ 이메일 또는 비밀번호가 올바르지 않습니다.';
                    passwordInput.value = '';
                    passwordInput.focus();
                    
                    // 흔들기 애니메이션
                    form.classList.add('shake');
                    setTimeout(() => form.classList.remove('shake'), 500);
                }
            });

            // 모달 열기 애니메이션
            setTimeout(() => modal.classList.add('show'), 10);
        });
    }

    /**
     * 관리자 페이지로 이동
     * - 관리자로 로그인되어 있으면 → admin-dashboard.html로 즉시 이동
     * - 로그인되어 있지 않으면 → admin-login.html로 이동
     */
    async function goToAdminPage() {
        console.log('[ADMIN] 관리자 페이지 접근 시도');
        
        // localStorage에서 로그인 상태 확인
        const adminLoggedIn = localStorage.getItem('adminLoggedIn');
        const adminEmail = localStorage.getItem('adminEmail');
        
        // 관리자 로그인 상태 확인
        if (adminLoggedIn === 'true' && adminEmail === 'valuencores@gmail.com') {
            console.log('[ADMIN] ✅ 관리자 로그인 확인 → admin-dashboard.html로 이동');
            window.location.href = 'admin-dashboard.html';
            return;
        }
        
        // 일반 사용자 로그인 확인 (loggedInUser)
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            try {
                const user = JSON.parse(loggedInUser);
                console.log('[ADMIN] loggedInUser 확인:', user.email, 'isAdmin:', user.isAdmin);
                
                if (user.isAdmin && user.email === 'valuencores@gmail.com') {
                    console.log('[ADMIN] ✅ 관리자 권한 확인 → admin-dashboard.html로 이동');
                    // localStorage에 adminLoggedIn 설정
                    localStorage.setItem('adminLoggedIn', 'true');
                    localStorage.setItem('adminEmail', user.email);
                    window.location.href = 'admin-dashboard.html';
                    return;
                }
            } catch (error) {
                console.error('[ADMIN] 로그인 정보 파싱 오류:', error);
            }
        }
        
        // 로그인되지 않았으면 관리자 로그인 페이지로 이동
        console.log('[ADMIN] ⚠️ 로그인 필요 → admin-login.html로 이동');
        window.location.href = 'admin-login.html';
    }

    /**
     * ADMIN 버튼 생성 및 삽입
     */
    function createAdminButton() {
        // 이미 버튼이 있으면 생성하지 않음
        if (document.getElementById('adminAccessBtn')) {
            return;
        }

        const button = document.createElement('button');
        button.id = 'adminAccessBtn';
        button.className = 'admin-access-button';
        button.setAttribute('aria-label', '관리자 페이지');
        button.setAttribute('title', '관리자 페이지');
        button.innerHTML = `
            <span class="admin-icon">🔐</span>
            <span class="admin-text">ADMIN</span>
        `;

        button.addEventListener('click', goToAdminPage);

        document.body.appendChild(button);
    }

    /**
     * 스타일 주입
     */
    function injectStyles() {
        // 이미 스타일이 주입되었는지 확인
        if (document.getElementById('adminAccessStyles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'adminAccessStyles';
        style.textContent = `
            /* ADMIN 접근 버튼 */
            .admin-access-button {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1.25rem;
                background: linear-gradient(135deg, #ff1493, #ff6b6b);
                color: #ffffff;
                border: none;
                border-radius: 50px;
                font-size: 0.9rem;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(255, 20, 147, 0.4);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                opacity: 0.9;
            }

            .admin-access-button:hover {
                opacity: 1;
                transform: translateY(-2px);
                box-shadow: 0 6px 30px rgba(255, 20, 147, 0.6);
            }

            .admin-access-button:active {
                transform: translateY(0);
                box-shadow: 0 2px 10px rgba(255, 20, 147, 0.4);
            }

            .admin-icon {
                font-size: 1.2rem;
                animation: pulse-icon 2s ease-in-out infinite;
            }

            @keyframes pulse-icon {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            .admin-text {
                letter-spacing: 0.5px;
            }

            /* 모바일 대응 */
            @media (max-width: 768px) {
                .admin-access-button {
                    bottom: 20px;
                    right: 20px;
                    padding: 0.6rem 1rem;
                    font-size: 0.85rem;
                }
            }

            /* 관리자 인증 모달 */
            .admin-auth-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .admin-auth-modal.show {
                opacity: 1;
            }

            .admin-auth-modal.admin-auth-closing {
                opacity: 0;
            }

            .admin-auth-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 14, 39, 0.9);
                backdrop-filter: blur(10px);
            }

            .admin-auth-content {
                position: relative;
                width: 90%;
                max-width: 450px;
                background: linear-gradient(135deg, #12162e 0%, #1a1f3a 100%);
                border: 2px solid rgba(255, 20, 147, 0.3);
                border-radius: 20px;
                padding: 2rem;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                transform: scale(0.9);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .admin-auth-modal.show .admin-auth-content {
                transform: scale(1);
            }

            .admin-auth-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
            }

            .admin-auth-header h2 {
                color: #ff1493;
                font-size: 1.5rem;
                font-weight: 700;
                margin: 0;
            }

            .admin-auth-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.6);
                font-size: 2rem;
                line-height: 1;
                cursor: pointer;
                transition: color 0.3s;
                padding: 0;
                width: 32px;
                height: 32px;
            }

            .admin-auth-close:hover {
                color: #ff1493;
            }

            .admin-auth-form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }

            .admin-auth-form.shake {
                animation: shake 0.5s;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }

            .admin-form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .admin-form-group label {
                color: rgba(255, 255, 255, 0.9);
                font-size: 0.95rem;
                font-weight: 600;
            }

            .admin-form-group input {
                background: rgba(255, 255, 255, 0.05);
                border: 2px solid rgba(255, 20, 147, 0.2);
                border-radius: 10px;
                padding: 0.9rem 1rem;
                color: #ffffff;
                font-size: 1rem;
                transition: all 0.3s;
            }

            .admin-form-group input:focus {
                outline: none;
                background: rgba(255, 255, 255, 0.08);
                border-color: #ff1493;
                box-shadow: 0 0 0 4px rgba(255, 20, 147, 0.1);
            }

            .admin-password-wrapper {
                position: relative;
            }

            .admin-password-wrapper input {
                padding-right: 50px;
            }

            .admin-password-toggle {
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                color: rgba(255, 255, 255, 0.6);
                cursor: pointer;
                transition: all 0.3s;
                padding: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 38px;
                height: 38px;
            }

            .admin-eye-icon {
                width: 20px;
                height: 20px;
                transition: all 0.3s;
                pointer-events: none;
            }

            .admin-password-toggle:hover {
                background: rgba(255, 20, 147, 0.1);
                border-color: #ff1493;
                color: #ff1493;
            }
            
            .admin-password-toggle:hover .admin-eye-icon {
                transform: scale(1.15);
            }
            
            .admin-password-toggle:active {
                transform: translateY(-50%) scale(0.95);
            }

            .admin-auth-error,
            .admin-auth-success {
                padding: 0.75rem 1rem;
                border-radius: 8px;
                font-size: 0.9rem;
                font-weight: 500;
                opacity: 0;
                max-height: 0;
                overflow: hidden;
                transition: all 0.3s;
            }

            .admin-auth-error.show,
            .admin-auth-success.show {
                opacity: 1;
                max-height: 100px;
            }

            .admin-auth-error {
                background: rgba(255, 20, 147, 0.15);
                border-left: 4px solid #ff1493;
                color: #ff6b6b;
            }

            .admin-auth-success {
                background: rgba(0, 255, 136, 0.15);
                border-left: 4px solid #00ff88;
                color: #00ff88;
            }

            .admin-auth-actions {
                display: flex;
                gap: 1rem;
                margin-top: 0.5rem;
            }

            .admin-btn-cancel,
            .admin-btn-submit {
                flex: 1;
                padding: 0.9rem;
                border: none;
                border-radius: 10px;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s;
            }

            .admin-btn-cancel {
                background: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.8);
            }

            .admin-btn-cancel:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #ffffff;
            }

            .admin-btn-submit {
                background: linear-gradient(135deg, #ff1493, #ff6b6b);
                color: #ffffff;
                box-shadow: 0 4px 15px rgba(255, 20, 147, 0.3);
            }

            .admin-btn-submit:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(255, 20, 147, 0.5);
            }

            .admin-btn-submit:active {
                transform: translateY(0);
            }

            /* 모바일 대응 */
            @media (max-width: 768px) {
                .admin-auth-content {
                    width: 95%;
                    padding: 1.5rem;
                }

                .admin-auth-header h2 {
                    font-size: 1.3rem;
                }

                .admin-form-group input {
                    padding: 0.8rem 0.9rem;
                    font-size: 0.95rem;
                }

                .admin-btn-cancel,
                .admin-btn-submit {
                    padding: 0.8rem;
                    font-size: 0.95rem;
                }
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * 초기화
     */
    function init() {
        // DOM이 준비되면 실행
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                injectStyles();
                createAdminButton();
            });
        } else {
            injectStyles();
            createAdminButton();
        }
    }

    // 초기화 실행
    init();

    // 전역 접근을 위한 export (디버깅용)
    window.DQuantAdmin = {
        isAuthenticated: isAdminAuthenticated,
        logout: () => setAdminAuthentication(false),
        version: '1.0.0'
    };

})();
