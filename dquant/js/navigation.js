/**
 * D-QUANT 9.0 - 공통 네비게이션 JavaScript
 * 모든 페이지에서 동일한 네비게이션 동작 제공
 * 
 * @version 1.0.0
 * @date 2026-03-08
 */

(function() {
    'use strict';

    // DOM이 로드된 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }

    function initNavigation() {
        console.log('[Navigation] Initializing...');

        // 네비게이션 요소 가져오기
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const navLinks = document.getElementById('navLinks');
        const mobileOverlay = document.getElementById('mobileOverlay');
        
        // 버튼 요소
        const signupBtn = document.getElementById('signupBtn');
        const loginBtn = document.getElementById('loginBtn');
        const mobileSignupBtn2 = document.getElementById('mobileSignupBtn2');
        const mobileLoginBtn2 = document.getElementById('mobileLoginBtn2');

        // 모바일 메뉴 열기
        function openMobileMenu() {
            if (navLinks) {
                navLinks.classList.add('active');
                console.log('[Navigation] Mobile menu opened');
            }
            if (mobileOverlay) {
                mobileOverlay.classList.add('active');
            }
            document.body.style.overflow = 'hidden';
        }

        // 모바일 메뉴 닫기
        function closeMobileMenu() {
            if (navLinks) {
                navLinks.classList.remove('active');
                console.log('[Navigation] Mobile menu closed');
            }
            if (mobileOverlay) {
                mobileOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }

        // 모바일 메뉴 토글 버튼
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMobileMenu();
            });
        }

        // 모바일 메뉴 닫기 버튼
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        // 모바일 오버레이 클릭 시 닫기
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', function() {
                closeMobileMenu();
            });
        }

        // ESC 키로 모바일 메뉴 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // 회원가입 버튼 (데스크톱)
        if (signupBtn) {
            signupBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'signup.html';
            });
        }

        // 회원가입 버튼 (모바일)
        if (mobileSignupBtn2) {
            mobileSignupBtn2.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'signup.html';
            });
        }

        // 로그인 버튼 (데스크톱) - index.html에서만 모달, 다른 페이지는 login.html로 이동
        if (loginBtn) {
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // index.html인 경우 로그인 모달 열기
                const loginModal = document.getElementById('loginModal');
                if (loginModal) {
                    // 로그인 상태 확인
                    const loggedInUser = localStorage.getItem('loggedInUser');
                    if (loggedInUser) {
                        // 이미 로그인된 경우
                        try {
                            const user = JSON.parse(loggedInUser);
                            const confirmed = confirm(`${user.memberName}님으로 로그인되어 있습니다.\n로그아웃하시겠습니까?`);
                            if (confirmed) {
                                // 로그아웃 처리
                                if (typeof logout === 'function') {
                                    logout();
                                }
                            }
                        } catch (error) {
                            console.error('로그인 정보 파싱 오류:', error);
                        }
                    } else {
                        // 로그인 모달 열기
                        loginModal.style.display = 'block';
                        
                        // 저장된 이메일 자동 입력
                        const rememberedEmail = localStorage.getItem('rememberedEmail');
                        const loginEmailInput = document.getElementById('loginEmail');
                        if (rememberedEmail && loginEmailInput) {
                            loginEmailInput.value = rememberedEmail;
                        }
                    }
                } else {
                    // 다른 페이지에서는 login.html로 이동
                    window.location.href = 'login.html';
                }
            });
        }

        // 로그인 버튼 (모바일)
        if (mobileLoginBtn2) {
            mobileLoginBtn2.addEventListener('click', function(e) {
                e.preventDefault();
                closeMobileMenu();
                
                // index.html인 경우 로그인 모달 열기
                const loginModal = document.getElementById('loginModal');
                if (loginModal) {
                    loginModal.style.display = 'block';
                    
                    // 저장된 이메일 자동 입력
                    const rememberedEmail = localStorage.getItem('rememberedEmail');
                    const loginEmailInput = document.getElementById('loginEmail');
                    if (rememberedEmail && loginEmailInput) {
                        loginEmailInput.value = rememberedEmail;
                    }
                } else {
                    // 다른 페이지에서는 login.html로 이동
                    window.location.href = 'login.html';
                }
            });
        }

        // 현재 페이지에 따라 active 클래스 추가
        setActiveNavLink();
        
        // 로그인 상태 확인 및 UI 업데이트
        updateLoginState();

        console.log('[Navigation] Initialized successfully');
    }

    /**
     * 현재 페이지에 따라 네비게이션 링크에 active 클래스 추가
     */
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    /**
     * 로그인 상태에 따라 UI 업데이트
     */
    function updateLoginState() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        
        if (loggedInUser && loginBtn) {
            try {
                const user = JSON.parse(loggedInUser);
                // 로그인 버튼을 "Logout"으로 변경
                loginBtn.textContent = 'Logout';
                loginBtn.classList.add('logged-in');
                loginBtn.setAttribute('data-i18n', 'nav-logout');
                
                // 회원가입 버튼 숨기기
                if (signupBtn) {
                    signupBtn.style.display = 'none';
                }
                
                console.log('[Navigation] Login state updated for:', user.memberName);
            } catch (error) {
                console.error('[Navigation] Failed to parse login info:', error);
            }
        }
    }

    // 전역 함수로 노출 (다른 스크립트에서 사용 가능)
    window.DQuantNavigation = {
        updateLoginState: updateLoginState,
        version: '1.0.0'
    };

})();
