# D-QUANT 9.0 ↔ ValuenCores 통합 계획

![Version](https://img.shields.io/badge/integration-v1.0-orange.svg)
![Status](https://img.shields.io/badge/status-planning-yellow.svg)

**목표**: 두 개의 독립적인 웹사이트를 하나의 통합 브랜드 경험으로 연결

---

## 🎯 **통합 전략**

### **브랜드 포지셔닝**

```
ValuenCores (기업 브랜드)
    │
    ├─ Asset Structure (자산 구조화)
    │   └─→ D-QUANT 9.0 플랫폼
    │
    ├─ Content Structure (콘텐츠 구조화)
    │
    └─ Physical Flow Structure (물리적 흐름)
```

**관계 정의**:
- **ValuenCores**: 모회사 / 기업 철학 사이트
- **D-QUANT 9.0**: 자산 구조화 사업부의 구체적 서비스 플랫폼

---

## 📊 **통합 단계**

### **Phase 1: 네비게이션 통합** 🔗

#### 1.1 ValuenCores → D-QUANT 링크 추가

**위치**: ValuenCores 사이트 상단 네비게이션
```html
<nav id="navbar">
  <div class="nav-inner">
    <a href="#hero" class="nav-logo">ValuenCores</a>
    <div class="nav-links">
      <a href="https://dquant9.com">D-QUANT 9.0</a>  <!-- 신규 -->
      <a href="#divisions">Business</a>
      <a href="#contact" class="nav-cta">Contact Us</a>
    </div>
  </div>
</nav>
```

#### 1.2 D-QUANT → ValuenCores 링크 추가

**위치**: D-QUANT 사이트 상단 네비게이션
```html
<ul class="nav-links" id="navLinks">
  <li><a href="https://valuencores.com">ValuenCores</a></li>  <!-- 신규 -->
  <li><a href="index.html">디퀀트나인</a></li>
  <li><a href="team.html">D.Insight</a></li>
  <!-- 기존 메뉴 유지 -->
</ul>
```

---

### **Phase 2: 시각적 일관성** 🎨

#### 2.1 색상 팔레트 통일

**ValuenCores 현재 색상**:
```css
/* 그레이스케일 위주 */
--bg-light-gray: #f5f5f5;
--bg-mid-gray: #e0e0e0;
--bg-dark-gray: #2a2a2a;
--bg-darker-gray: #1a1a1a;
--text-dark: #1a1a1a;
--text-light: #ffffff;
```

**D-QUANT 현재 색상**:
```css
/* 사이안/그린 강조 */
--cyan-glow: #00F2FF;
--emerald-safe: #10b981;
--bg-primary: #0a0e27;
--bg-secondary: #0f1824;
```

**통합 색상 시스템 제안**:
```css
:root {
  /* 공통 브랜드 색상 */
  --brand-cyan: #00F2FF;           /* D-QUANT 메인 */
  --brand-emerald: #10b981;        /* 수익/안전 */
  
  /* 배경 (ValuenCores 스타일 유지) */
  --bg-light: #f5f5f5;
  --bg-mid: #e0e0e0;
  --bg-dark: #1a1a1a;
  
  /* D-QUANT 배경 (다크 모드) */
  --bg-primary: #0a0e27;
  --bg-secondary: #0f1824;
  
  /* 텍스트 */
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.7);
  --text-dark: #1a1a1a;
}
```

#### 2.2 타이포그래피 통일

**ValuenCores**: Inter (Google Fonts)
**D-QUANT**: 시스템 폰트 혼용

**통합 제안**:
```css
/* 전체 사이트 통일 */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

#### 2.3 버튼 스타일 통일

**공통 버튼 컴포넌트**:
```css
.btn-primary {
  background: linear-gradient(135deg, var(--brand-cyan), var(--brand-emerald));
  color: #000;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--brand-cyan);
  color: var(--brand-cyan);
  padding: 1rem 2rem;
  border-radius: 8px;
}
```

---

### **Phase 3: 콘텐츠 연결** 📝

#### 3.1 ValuenCores "Asset Structure" 카드 업데이트

**현재**:
```html
<div class="division-card">
  <h3>Division 1: Asset Structure</h3>
  <p class="card-body">
    We don't predict markets. We structure movements within them...
  </p>
</div>
```

**개선**:
```html
<div class="division-card">
  <h3>Division 1: Asset Structure</h3>
  <p class="card-body">
    We don't predict markets. We structure movements within them...
  </p>
  <a href="https://dquant9.com" class="card-cta">
    Explore D-QUANT 9.0 Platform →
  </a>
</div>
```

#### 3.2 D-QUANT Hero 섹션에 ValuenCores 언급 추가

**추가 위치**: Hero 섹션 하단
```html
<section id="hero">
  <!-- 기존 콘텐츠 -->
  <div class="hero-footer">
    <p>A service of <a href="https://valuencores.com">ValuenCores</a> — Asset Structure Division</p>
  </div>
</section>
```

#### 3.3 Team 섹션 통합

**D-QUANT team.html**:
- R&D Division (4명)
- Planning & Mgmt. Division (3명)

**ValuenCores Team 섹션**:
- 동일 인물 프로필 유지
- 링크 추가: "Explore our research team at D-QUANT 9.0"

---

### **Phase 4: Footer 통합** 🦶

#### 4.1 공통 Footer 구조

**ValuenCores & D-QUANT 공통 Footer**:
```html
<footer class="unified-footer">
  <div class="footer-container">
    
    <!-- 브랜드 섹션 -->
    <div class="footer-brands">
      <div class="brand-block">
        <h4>ValuenCores</h4>
        <p>Multiple cores. One principle.</p>
        <a href="https://valuencores.com">Visit Site →</a>
      </div>
      <div class="brand-block">
        <h4>D-QUANT 9.0</h4>
        <p>Asset Structure Division</p>
        <a href="https://dquant9.com">Visit Platform →</a>
      </div>
    </div>
    
    <!-- 회사 정보 (통일) -->
    <div class="footer-company">
      <p class="company-name">밸류앤코어스(주) ValuenCores Inc.</p>
      <p class="company-address">서울특별시 종로구 효자로 15(통의동) 다모여빌딩 2층</p>
      <p class="company-contact">
        전화: 02-356-6771 | 이메일: valuencores@gmail.com
      </p>
    </div>
    
    <!-- 법적 면책조항 (통일) -->
    <div class="footer-disclaimer">
      <div class="disclaimer-icon">🛡️</div>
      <div class="disclaimer-content">
        <strong>법적 면책조항(免責) 안내</strong>
        <p>본 플랫폼은 자본시장법, 가상자산이용자보호법 및 협동조합법을 준수하며 
        투자자 보호를 최우선으로 합니다...</p>
      </div>
    </div>
    
    <!-- 저작권 -->
    <div class="footer-copyright">
      <p>© 2026 ValuenCores Inc. & D-QUANT 9.0. All rights reserved.</p>
    </div>
    
  </div>
</footer>
```

---

### **Phase 5: 크로스 프로모션** 📢

#### 5.1 ValuenCores에 D-QUANT 배너 추가

**위치**: Business Divisions 섹션 직후
```html
<section id="dquant-promo" class="promo-section">
  <div class="promo-inner">
    <h2>Experience Asset Structure in Action</h2>
    <p>D-QUANT 9.0 — Our AI-powered quantitative trading platform</p>
    <div class="promo-features">
      <div class="promo-feature">
        <span class="feature-icon">📊</span>
        <p>Daily 0.3~0.5% Target Return</p>
      </div>
      <div class="promo-feature">
        <span class="feature-icon">🤖</span>
        <p>Fully Automated AI Trading</p>
      </div>
      <div class="promo-feature">
        <span class="feature-icon">💰</span>
        <p>Monthly Fixed Payout</p>
      </div>
    </div>
    <a href="https://dquant9.com" class="promo-cta">Launch D-QUANT 9.0 →</a>
  </div>
</section>
```

#### 5.2 D-QUANT에 ValuenCores 소개 추가

**위치**: Hero 섹션 직후 (새 섹션)
```html
<section id="valuencores-intro" class="intro-section">
  <div class="intro-inner">
    <p class="intro-label">Part of ValuenCores Ecosystem</p>
    <h2>From Imbalance to Structure, Structure to Flow</h2>
    <p>D-QUANT 9.0 is the practical application of ValuenCores' core principle: 
    turning market imbalance into structured, repeatable value.</p>
    <a href="https://valuencores.com">Learn about our philosophy →</a>
  </div>
</section>
```

---

### **Phase 6: 기술적 통합** ⚙️

#### 6.1 공통 CSS 변수 파일

**파일**: `shared/brand.css`
```css
:root {
  /* 브랜드 색상 */
  --brand-cyan: #00F2FF;
  --brand-emerald: #10b981;
  --brand-dark: #0a0e27;
  
  /* 타이포그래피 */
  --font-primary: 'Inter', sans-serif;
  --font-size-h1: clamp(2.5rem, 5vw, 4rem);
  --font-size-h2: clamp(2rem, 4vw, 3rem);
  
  /* 간격 */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
  
  /* 애니메이션 */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

**적용**:
```html
<!-- ValuenCores -->
<link rel="stylesheet" href="../shared/brand.css" />
<link rel="stylesheet" href="css/style.css" />

<!-- D-QUANT -->
<link rel="stylesheet" href="../shared/brand.css" />
<link rel="stylesheet" href="css/navigation.css" />
```

#### 6.2 공통 JavaScript 유틸리티

**파일**: `shared/utils.js`
```javascript
// 스무스 스크롤
export function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth'
  });
}

// 네비게이션 활성화
export function activateNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}
```

#### 6.3 Analytics 통합

**Google Analytics 4 통합**:
```html
<!-- 공통 GA 코드 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'page_title': 'ValuenCores - Home'  // 또는 'D-QUANT 9.0 - Home'
  });
</script>
```

---

## 📋 **통합 체크리스트**

### **ValuenCores 사이트 수정 사항**

- [ ] 네비게이션에 D-QUANT 링크 추가
- [ ] Asset Structure 카드에 CTA 버튼 추가
- [ ] D-QUANT 프로모션 섹션 추가
- [ ] Footer에 D-QUANT 언급 추가
- [ ] 공통 CSS 변수 적용
- [ ] Team 섹션에 D-QUANT 링크 추가

### **D-QUANT 사이트 수정 사항**

- [ ] 네비게이션에 ValuenCores 링크 추가
- [ ] Hero 하단에 ValuenCores 언급 추가
- [ ] ValuenCores 소개 섹션 추가
- [ ] Footer 통합 (ValuenCores 정보 포함)
- [ ] 공통 CSS 변수 적용
- [ ] 색상 팔레트 조정 (필요시)

### **공통 작업**

- [ ] `shared/brand.css` 생성
- [ ] `shared/utils.js` 생성
- [ ] Google Analytics 설정
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 반응형 테스트
- [ ] SEO 메타 태그 조정
- [ ] OG 이미지 통일

---

## 🎨 **디자인 목 업**

### **통합 네비게이션 예시**

```
┌─────────────────────────────────────────────────────┐
│  ValuenCores    [D-QUANT 9.0] [Business] [Contact]  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  D-QUANT 9.0    [ValuenCores] [디퀀트나인] [D.Insight] [시뮬레이터]  │
└─────────────────────────────────────────────────────┘
```

### **Footer 통합 레이아웃**

```
┌────────────────────────────────────────────────┐
│  ValuenCores          |    D-QUANT 9.0         │
│  Multiple cores.      |    Asset Structure      │
│  One principle.       |    Division             │
│  [Visit Site →]       |    [Visit Platform →]  │
├────────────────────────────────────────────────┤
│  밸류앤코어스(주) ValuenCores Inc.               │
│  서울특별시 종로구 효자로 15(통의동) 다모여빌딩 2층  │
│  T. 02-356-6771 | E. valuencores@gmail.com     │
├────────────────────────────────────────────────┤
│  🛡️ 법적 면책조항(免責) 안내                     │
│  본 플랫폼은 자본시장법, 가상자산이용자보호법...   │
├────────────────────────────────────────────────┤
│  © 2026 ValuenCores Inc. & D-QUANT 9.0.        │
│  All rights reserved.                          │
└────────────────────────────────────────────────┘
```

---

## 📅 **구현 일정**

### **Week 1: 기초 통합**
- Day 1-2: 공통 CSS/JS 파일 생성
- Day 3-4: 네비게이션 링크 추가
- Day 5: Footer 통합

### **Week 2: 콘텐츠 통합**
- Day 1-2: 크로스 프로모션 섹션 추가
- Day 3-4: Team 섹션 연결
- Day 5: Contact 정보 통일

### **Week 3: 테스트 & 최적화**
- Day 1-2: 크로스 브라우저 테스트
- Day 3-4: 모바일 반응형 검증
- Day 5: SEO 최적화

### **Week 4: 배포**
- Day 1-2: 스테이징 환경 배포
- Day 3-4: QA 및 버그 수정
- Day 5: 프로덕션 배포

---

## 🎯 **예상 효과**

### **브랜드 일관성**
- ✅ 통일된 시각적 아이덴티티
- ✅ 명확한 브랜드 계층 구조
- ✅ 전문성 향상

### **사용자 경험**
- ✅ 원활한 사이트 간 이동
- ✅ 일관된 인터페이스
- ✅ 명확한 정보 구조

### **비즈니스 효과**
- ✅ 크로스 프로모션 효과
- ✅ SEO 시너지
- ✅ 브랜드 인지도 상승

---

## 📊 **성공 지표 (KPI)**

1. **교차 방문률**: ValuenCores → D-QUANT 전환율
2. **체류 시간**: 통합 후 평균 세션 시간 증가
3. **이탈률 감소**: 명확한 네비게이션으로 이탈 감소
4. **SEO 순위**: 브랜드 키워드 검색 순위 향상
5. **전환율**: D-QUANT 회원가입/상담 신청 증가

---

## 🚀 **다음 단계**

1. **승인 요청**: 통합 계획 검토 및 승인
2. **리소스 확보**: 디자인/개발 리소스 배정
3. **타임라인 확정**: 구체적인 일정 수립
4. **작업 시작**: Phase 1부터 순차 진행

---

**작성일**: 2026-03-08  
**버전**: 1.0  
**상태**: ✅ 계획 완료, 승인 대기
