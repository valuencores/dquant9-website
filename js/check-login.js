// 나의 자산 페이지 로그인 체크
document.addEventListener('DOMContentLoaded', function() {
    // 모든 "나의 자산" 링크 찾기
    const myAssetsLinks = document.querySelectorAll('a[href="my-assets.html"]');
    
    myAssetsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const loggedInUser = localStorage.getItem('loggedInUser');
            
            if (!loggedInUser) {
                e.preventDefault();
                alert('로그인이 필요한 서비스입니다.\n먼저 로그인해주세요.');
                
                // 로그인 모달 열기 (있는 경우)
                const loginBtn = document.getElementById('loginBtn');
                if (loginBtn) {
                    loginBtn.click();
                }
            }
            // 로그인되어 있으면 정상적으로 페이지 이동
        });
    });
    
    // 나의 정보 페이지도 동일하게 처리
    const myInfoLinks = document.querySelectorAll('a[href="my-info.html"]');
    
    myInfoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const loggedInUser = localStorage.getItem('loggedInUser');
            
            if (!loggedInUser) {
                e.preventDefault();
                alert('로그인이 필요한 서비스입니다.\n먼저 로그인해주세요.');
                
                // 로그인 모달 열기 (있는 경우)
                const loginBtn = document.getElementById('loginBtn');
                if (loginBtn) {
                    loginBtn.click();
                }
            }
        });
    });
});
