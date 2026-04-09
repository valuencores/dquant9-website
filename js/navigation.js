// 네비게이션 및 인터랙션 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 현재 페이지 네비게이션 하이라이트
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // 스크롤 시 네비게이션 그림자 효과
    const globalNav = document.querySelector('.global-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            globalNav.classList.add('scrolled');
        } else {
            globalNav.classList.remove('scrolled');
        }
    });
    
    // "자세히 알아보기" 버튼 (홈페이지)
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features-section');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // CTA 버튼 (홈페이지)
    const ctaSignupBtn = document.getElementById('ctaSignupBtn');
    if (ctaSignupBtn) {
        ctaSignupBtn.addEventListener('click', function() {
            const signupModal = document.getElementById('signupModal');
            if (signupModal) {
                signupModal.classList.add('active');
            }
        });
    }
});

// 부드러운 앵커 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
