# D-QUANT 9.0 - 공통 네비게이션 통합 가이드

**작성일**: 2026-03-08  
**버전**: 1.0.0  
**목적**: 모든 페이지에 동일한 네비게이션 UI 및 동작 적용

---

## 📋 개요

모든 HTML 페이지(team.html, simulation.html, my-assets.html, my-info.html, consultation.html, support.html, signup.html)에 **공통 네비게이션 CSS와 JavaScript**를 적용하여 일관된 사용자 경험을 제공합니다.

---

## 🎯 통합 완료된 파일

### 1. CSS 파일
- **경로**: `dquant/css/navigation.css`
- **크기**: 11.5 KB
- **기능**: 
  - 네비게이션 바 스타일
  - 데스크톱/태블릿/모바일 반응형 디자인
  - 메뉴 아이템별 특수 효과 (나의 자산, 나의 정보, 고객센터)
  - 애니메이션 및 hover 효과

### 2. JavaScript 파일
- **경로**: `dquant/js/navigation.js`
- **크기**: 7.9 KB
- **기능**:
  - 모바일 햄버거 메뉴 토글
  - 로그인/로그아웃 상태 관리
  - 현재 페이지 active 링크 자동 설정
  - 회원가입/로그인 버튼 이벤트 처리

---

## 🚀 적용 방법

### 단계 1: CSS 파일 링크 추가

모든 HTML 페이지의 `<head>` 섹션에 다음 코드를 추가합니다:

```html
<!-- 공통 네비게이션 CSS -->
<link rel="stylesheet" href="css/navigation.css">
```

**추가 위치**: 다른 CSS 파일보다 먼저 로드 (권장)

**예시**:
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>D-QUANT 9.0</title>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- 공통 네비게이션 CSS -->
    <link rel="stylesheet" href="css/navigation.css">
    
    <!-- 페이지별 CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>
```

---

### 단계 2: JavaScript 파일 로드

모든 HTML 페이지의 `</body>` 태그 직전에 다음 코드를 추가합니다:

```html
<!-- 공통 네비게이션 JavaScript -->
<script src="js/navigation.js"></script>
```

**추가 위치**: 다른 스크립트보다 먼저 로드 (권장)

**예시**:
```html
    <!-- 공통 네비게이션 JavaScript -->
    <script src="js/navigation.js"></script>
    
    <!-- ADMIN 버튼 (필요한 페이지만) -->
    <script src="js/admin-access.js"></script>
    
    <!-- 페이지별 JavaScript -->
    <script src="js/main.js"></script>
</body>
</html>
```

---

### 단계 3: 네비게이션 HTML 표준화

모든 페이지의 `<nav>` 섹션을 다음 표준 구조로 교체합니다:

```html
<!-- Navigation -->
<nav class="glass-nav">
    <div class="nav-container">
        <a href="index.html" class="nav-brand">
            <i class="fas fa-chart-line"></i>
            <span>D-QUANT 9.0</span>
        </a>
        
        <ul class="nav-links" id="navLinks">
            <button class="mobile-menu-close" id="mobileMenuClose">
                <i class="fas fa-times"></i>
            </button>
            <li><a href="https://www.valuencores.com" target="_blank"><i class="fas fa-building"></i> ValuenCores</a></li>
            <li><a href="index.html">디퀀트나인</a></li>
            <li><a href="team.html">D.Insight</a></li>
            <li><a href="simulation.html">투자운용 시뮬레이션</a></li>
            <li><a href="my-assets.html"><i class="fas fa-wallet"></i> 나의 자산</a></li>
            <li><a href="my-info.html"><i class="fas fa-user-circle"></i> 나의 정보</a></li>
            <li><a href="support.html"><i class="fas fa-headset"></i> 고객센터</a></li>
            <li><a href="#" id="mobileSignupBtn2"><i class="fas fa-user-plus"></i> 회원가입</a></li>
            <li><a href="#" id="mobileLoginBtn2"><i class="fas fa-sign-in-alt"></i> 로그인</a></li>
        </ul>
        
        <!-- 모바일 오버레이 -->
        <div class="mobile-overlay" id="mobileOverlay"></div>
        
        <div class="nav-actions">
            <a href="my-info.html" class="btn-my-info-icon">
                <i class="fas fa-user-circle"></i>
            </a>
            <a href="#" class="nav-link-text" id="signupBtn">회원가입</a>
            <a href="#" class="nav-link-text" id="loginBtn">로그인</a>
            <a href="support.html" class="nav-link-text">고객센터</a>
            
            <button class="mobile-menu-toggle" id="mobileMenuToggle">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </div>
</nav>
```

---

## 📝 페이지별 적용 체크리스트

| 페이지 | CSS 추가 | JS 추가 | HTML 교체 | 테스트 완료 |
|--------|----------|---------|-----------|-------------|
| ✅ index.html | ✅ | ✅ | ✅ | ✅ |
| ⬜ team.html | ⬜ | ⬜ | ⬜ | ⬜ |
| ⬜ simulation.html | ⬜ | ⬜ | ⬜ | ⬜ |
| ⬜ my-assets.html | ⬜ | ⬜ | ⬜ | ⬜ |
| ⬜ my-info.html | ⬜ | ⬜ | ⬜ | ⬜ |
| ⬜ consultation.html | ⬜ | ⬜ | ⬜ | ⬜ |
| ⬜ support.html | ⬜ | ⬜ | ⬜ | ⬜ |
| ⬜ signup.html | ⬜ | ⬜ | ⬜ | ⬜ |

---

## 🔧 기능 설명

### 1. 데스크톱 네비게이션
- **로고**: D-QUANT 9.0 (클릭 시 index.html 이동)
- **외부 링크**: ValuenCores 웹사이트
- **메인 메뉴**: 디퀀트나인, D.Insight, 투자운용 시뮬레이션
- **특수 메뉴**: 나의 자산, 나의 정보, 고객센터 (그라데이션 효과)
- **우측 버튼**: 나의 정보 아이콘, 회원가입, 로그인, 고객센터

### 2. 모바일 네비게이션
- **햄버거 아이콘**: 우측 상단에 표시
- **슬라이드 메뉴**: 우측에서 좌측으로 슬라이드 인
- **오버레이**: 메뉴 외부 클릭 시 자동 닫기
- **ESC 키**: 메뉴 닫기

### 3. 자동 기능
- **현재 페이지 강조**: 활성 링크에 `active` 클래스 자동 추가
- **로그인 상태 감지**: localStorage 확인 후 "Logout" 표시
- **회원가입 버튼 숨김**: 로그인 시 자동 숨김

---

## 🎨 커스터마이징

### CSS 변수 수정
`navigation.css` 파일의 상단에서 색상 변경 가능:

```css
:root {
    --cyan-glow: #00f2ff;
    --emerald-safe: #10b981;
    --text-primary: #ffffff;
    --text-secondary: rgba(255,255,255,0.7);
}
```

### 메뉴 순서 변경
네비게이션 HTML의 `<ul class="nav-links">` 내부에서 `<li>` 순서를 변경하면 됩니다.

### 애니메이션 속도 조정
```css
.nav-links {
    transition: right 0.3s ease; /* 0.3s를 원하는 속도로 변경 */
}
```

---

## 🧪 테스트 시나리오

### 데스크톱 (1920×1080)
1. ✅ 모든 메뉴 링크 클릭 가능
2. ✅ Hover 효과 정상 작동
3. ✅ 로그인/로그아웃 상태 표시
4. ✅ 현재 페이지 active 강조

### 태블릿 (768×1024)
1. ✅ 메뉴 간격 조정
2. ✅ 텍스트 크기 최적화

### 모바일 (375×667)
1. ✅ 햄버거 메뉴 표시
2. ✅ 슬라이드 메뉴 작동
3. ✅ 오버레이 클릭 시 닫기
4. ✅ 모든 링크 터치 가능

---

## 🐛 문제 해결

### 문제 1: 네비게이션이 표시되지 않음
**원인**: CSS 파일 경로 오류  
**해결**: `<link rel="stylesheet" href="css/navigation.css">` 경로 확인

### 문제 2: 햄버거 메뉴가 작동하지 않음
**원인**: JavaScript 파일 로드 오류  
**해결**: `<script src="js/navigation.js"></script>` 경로 확인 및 콘솔 에러 체크

### 문제 3: 로그인 상태가 반영되지 않음
**원인**: localStorage 데이터 없음  
**해결**: index.html에서 로그인 후 다른 페이지 확인

### 문제 4: Active 링크가 강조되지 않음
**원인**: 파일명 불일치  
**해결**: 링크의 `href` 속성과 실제 파일명이 일치하는지 확인

---

## 📚 관련 파일

- `dquant/css/navigation.css` - 네비게이션 스타일
- `dquant/js/navigation.js` - 네비게이션 동작
- `dquant/js/admin-access.js` - ADMIN 버튼 (선택적)
- `Documentation/NAVIGATION_INTEGRATION_GUIDE.md` - 이 문서

---

## ✅ 완료 확인

모든 페이지에 적용 후 다음을 확인하세요:

1. ✅ CSS 파일 로드 확인 (개발자 도구 → Network 탭)
2. ✅ JavaScript 파일 로드 확인
3. ✅ 콘솔에 `[Navigation] Initialized successfully` 메시지 표시
4. ✅ 데스크톱/모바일 모두 정상 작동
5. ✅ 모든 링크 클릭 가능
6. ✅ 로그인 상태 반영

---

**문서 버전**: 1.0.0  
**최종 업데이트**: 2026-03-08  
**작성자**: D-QUANT 9.0 Development Team
