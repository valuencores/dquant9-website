# 네비게이션 업데이트 완료 (v2.62.0)

## ✅ 완료된 페이지

### 1. **index.html** (메인 페이지)
- ✅ PC 우측 상단: [회원가입] | 로그인 | 고객센터
- ✅ 모바일 햄버거 메뉴: 디퀀트나인, D.Insight, 투자운용 시뮬레이션, [나의 자산] → 회원가입, 로그인, 고객센터
- ✅ D.Insight 아이콘 제거 (일반 링크로 변경)
- ✅ 나의 자산 그라데이션 박스 애니메이션
- ✅ JavaScript 이벤트: signupBtn, mobileSignupBtn, mobileLoginBtn

### 2. **simulation.html** (시뮬레이션 페이지)
- ✅ PC 우측 상단: [회원가입] | 로그인 | 고객센터
- ✅ 모바일 햄버거 메뉴: 전체 메뉴 포함
- ✅ D.Insight 아이콘 제거

### 3. **support.html** (고객센터)
- ✅ PC 우측 상단: [회원가입] | 로그인 | 고객센터 (활성화)
- ✅ 모바일 햄버거 메뉴: 전체 메뉴 포함
- ✅ 나의 자산 그라데이션 박스
- ✅ 모든 JavaScript 이벤트 완료

### 4. **team.html** (D.Insight 팀 소개)
- ✅ HTML 네비게이션 업데이트 완료
- ⚠️ CSS 스타일 추가 필요
- ⚠️ JavaScript 이벤트 추가 필요

## 🔧 통일된 네비게이션 구조

### PC (데스크톱) - 우측 상단
```
[회원가입] | 로그인 | 고객센터(또는 현재 페이지) | [☰]
  (버튼)     (링크)    (링크)
```

### 모바일 (햄버거 메뉴)
```
디퀀트나인
D.Insight  
투자운용 시뮬레이션
[나의 자산]  ← 그라데이션 애니메이션 박스
─────────────────────
회원가입
로그인
고객센터
```

## 🎨 스타일 가이드

### 회원가입 버튼
```css
.btn-signup {
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, var(--cyan-glow), var(--emerald-safe));
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.btn-signup:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 242, 255, 0.4);
}
```

### 나의 자산 그라데이션 박스
```css
.nav-links li:nth-of-type(4) a {
    padding: 0.5rem 1rem;
    border: 2px solid transparent;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(0,242,255,0.1), rgba(16,185,129,0.1));
    position: relative;
    overflow: hidden;
}

/* 애니메이션 테두리 */
.nav-links li:nth-of-type(4) a::before {
    content: '';
    position: absolute;
    top: -2px; left: -2px; right: -2px; bottom: -2px;
    background: linear-gradient(45deg, 
        var(--cyan-glow), var(--emerald-safe), 
        var(--cyan-glow), var(--emerald-safe));
    background-size: 300% 300%;
    border-radius: 8px;
    z-index: -1;
    animation: shimmerBorder 3s ease-in-out infinite;
    opacity: 0.8;
}

/* 반짝임 효과 */
.nav-links li:nth-of-type(4) a::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, 
        transparent, rgba(255,255,255,0.3), transparent);
    animation: shine 2s ease-in-out infinite;
}

@keyframes shimmerBorder {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

@keyframes shine {
    0% { left: -100%; }
    50%, 100% { left: 100%; }
}
```

## 📱 반응형 미디어 쿼리

### 데스크톱 (>992px)
```css
@media (min-width: 993px) {
    .nav-actions {
        display: flex !important;
    }
    .btn-signup {
        display: inline-block !important;
    }
    .mobile-menu-toggle {
        display: none !important;
    }
}
```

### 모바일 (≤992px)
```css
@media (max-width: 992px) {
    .nav-links {
        position: fixed;
        right: -100%;
        width: 320px;
        height: 100vh;
        /* 사이드 슬라이드 메뉴 */
    }
    
    .nav-links.mobile-active {
        right: 0;
    }
    
    .mobile-menu-actions {
        display: flex;
    }
    
    .mobile-menu-toggle {
        display: block;
    }
}
```

## 🔧 JavaScript 이벤트

### 필수 이벤트 리스너
```javascript
// PC 회원가입 버튼
signupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (signupModal) signupModal.style.display = 'flex';
});

// PC 로그인 링크
loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (loginModal) loginModal.style.display = 'flex';
});

// 모바일 회원가입
mobileSignupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    closeMobileMenu();
    setTimeout(() => {
        if (signupModal) signupModal.style.display = 'flex';
    }, 300);
});

// 모바일 로그인
mobileLoginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    closeMobileMenu();
    setTimeout(() => {
        if (loginModal) loginModal.style.display = 'flex';
    }, 300);
});

// 햄버거 메뉴 토글
mobileMenuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    navLinks.classList.add('mobile-active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// 메뉴 닫기
function closeMobileMenu() {
    navLinks.classList.remove('mobile-active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}
```

## ⚠️ 남은 작업

### team.html
- [ ] 모바일 메뉴 CSS 스타일 추가
- [ ] JavaScript 이벤트 리스너 추가
- [ ] 로그인/회원가입 모달 HTML 추가

### my-assets.html
- [ ] 네비게이션 구조 업데이트
- [ ] 회원가입 버튼 추가
- [ ] 모바일 메뉴 완성

### consultation.html
- [ ] 네비게이션 구조 업데이트
- [ ] 회원가입 버튼 추가
- [ ] 모바일 메뉴 완성

## 🎯 테스트 체크리스트

- [x] index.html - PC 회원가입 버튼 표시 및 클릭
- [x] index.html - 모바일 햄버거 메뉴 전체 항목 표시
- [x] simulation.html - PC 회원가입 버튼
- [x] simulation.html - 모바일 메뉴
- [x] support.html - 모든 기능 정상 작동
- [ ] team.html - 완전 테스트
- [ ] my-assets.html - 업데이트 필요
- [ ] consultation.html - 업데이트 필요

## 📝 참고사항

- 모든 페이지에서 **nth-of-type(4)** 를 사용하여 "나의 자산" 스타일 적용
- D.Insight 링크에서 아이콘 제거 (일반 텍스트 링크로 통일)
- 회원가입 버튼은 항상 로그인 **왼쪽**에 배치
- 모바일 메뉴에서는 회원가입이 로그인 **위**에 배치
- 고객센터 링크는 support.html로 연결
