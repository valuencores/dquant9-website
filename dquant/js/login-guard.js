// 로그인 가드 - 로그인 필요한 페이지 접근 시 확인
(function() {
    // 이미 이벤트 리스너가 추가된 요소를 추적
    const processedElements = new WeakSet();
    
    // 로그인 확인 함수
    function checkLoginStatus() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        return loggedInUser ? JSON.parse(loggedInUser) : null;
    }

    // 로그인 페이지로 이동 함수
    function redirectToLogin() {
        console.log('로그인 페이지로 이동');
        
        // 현재 페이지 URL을 세션 스토리지에 저장 (로그인 후 돌아오기 위해)
        sessionStorage.setItem('returnUrl', window.location.href);
        
        // 로그인 페이지로 이동
        window.location.href = 'login.html';
    }

    // 로그인 필요 페이지로 이동 시 확인
    function guardLoginRequiredLinks() {
        // 나의 자산 페이지 링크들
        const myAssetsLinks = document.querySelectorAll('a[href="my-assets.html"]');
        
        myAssetsLinks.forEach(link => {
            // 이미 처리된 요소는 건너뛰기
            if (processedElements.has(link)) {
                return;
            }
            processedElements.add(link);
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('나의 자산 링크 클릭됨');
                
                const user = checkLoginStatus();
                console.log('로그인 상태:', user);
                
                if (!user) {
                    // 로그인되지 않은 경우
                    console.log('비로그인 상태 - Alert 표시');
                    const confirmLogin = window.confirm('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?');
                    console.log('사용자 응답:', confirmLogin ? '확인' : '취소');
                    
                    if (confirmLogin === true) {
                        console.log('로그인 페이지로 이동 시작');
                        redirectToLogin();
                    } else {
                        console.log('사용자가 취소함');
                    }
                } else {
                    // 로그인된 경우 페이지 이동
                    console.log('로그인 상태 - 페이지 이동');
                    window.location.href = 'my-assets.html';
                }
            }, true); // 캡처 단계에서 실행
        });

        // 나의 정보 페이지 링크들
        const myInfoLinks = document.querySelectorAll('a[href="my-info.html"]');
        
        myInfoLinks.forEach(link => {
            // 이미 처리된 요소는 건너뛰기
            if (processedElements.has(link)) {
                return;
            }
            processedElements.add(link);
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('나의 정보 링크 클릭됨');
                
                const user = checkLoginStatus();
                console.log('로그인 상태:', user);
                
                if (!user) {
                    // 로그인되지 않은 경우
                    console.log('비로그인 상태 - Alert 표시');
                    const confirmLogin = window.confirm('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?');
                    console.log('사용자 응답:', confirmLogin ? '확인' : '취소');
                    
                    if (confirmLogin === true) {
                        console.log('로그인 페이지로 이동 시작');
                        redirectToLogin();
                    } else {
                        console.log('사용자가 취소함');
                    }
                } else {
                    // 로그인된 경우 페이지 이동
                    console.log('로그인 상태 - 페이지 이동');
                    window.location.href = 'my-info.html';
                }
            }, true); // 캡처 단계에서 실행
        });

        // 회원 아이콘 (btn-my-info-icon)
        const myInfoIcons = document.querySelectorAll('.btn-my-info-icon');
        
        myInfoIcons.forEach(icon => {
            // 이미 처리된 요소는 건너뛰기
            if (processedElements.has(icon)) {
                return;
            }
            processedElements.add(icon);
            
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('회원 아이콘 클릭됨');
                
                const user = checkLoginStatus();
                console.log('로그인 상태:', user);
                
                if (!user) {
                    // 로그인되지 않은 경우
                    console.log('비로그인 상태 - Alert 표시');
                    const confirmLogin = window.confirm('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?');
                    console.log('사용자 응답:', confirmLogin ? '확인' : '취소');
                    
                    if (confirmLogin === true) {
                        console.log('로그인 페이지로 이동 시작');
                        redirectToLogin();
                    } else {
                        console.log('사용자가 취소함');
                    }
                } else {
                    // 로그인된 경우 페이지 이동
                    console.log('로그인 상태 - 페이지 이동');
                    window.location.href = 'my-info.html';
                }
            }, true); // 캡처 단계에서 실행
        });

        console.log('로그인 가드 초기화 완료');
        console.log('나의 자산 링크:', myAssetsLinks.length, '개');
        console.log('나의 정보 링크:', myInfoLinks.length, '개');
        console.log('회원 아이콘:', myInfoIcons.length, '개');
    }

    // DOM 로드 완료 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', guardLoginRequiredLinks);
    } else {
        guardLoginRequiredLinks();
    }

    // 동적으로 추가된 요소를 위해 MutationObserver 사용 (중복 방지)
    let observerTimeout = null;
    const observer = new MutationObserver(function(mutations) {
        // 여러 변경이 한 번에 발생할 수 있으므로 디바운스 적용
        if (observerTimeout) {
            clearTimeout(observerTimeout);
        }
        
        observerTimeout = setTimeout(function() {
            let hasNewElements = false;
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    hasNewElements = true;
                }
            });
            
            if (hasNewElements) {
                console.log('새로운 요소 감지 - 로그인 가드 재적용');
                guardLoginRequiredLinks();
            }
        }, 100); // 100ms 디바운스
    });

    // body 요소 감시 시작
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
})();
