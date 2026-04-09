# ValuenCores Website

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![Status](https://img.shields.io/badge/status-imported-green.svg)

**"Multiple cores. One principle."**

ValuenCores 공식 웹사이트 - 불균형을 구조로, 구조를 흐름으로 전환하는 기업 철학을 담은 웹사이트입니다.

---

## 📋 **사이트 구조**

### **섹션 구성**

1. **Hero Section**
   - 캔버스 애니메이션 배경
   - "VALUENCORES" 메인 타이틀
   - "Multiple cores. One principle." 서브타이틀
   - 3가지 핵심 메시지: Find the Core / Build the Structure / Create Repeatable Value

2. **Core Section** (light gray)
   - 텍스트: Finding imbalance
   - 캔버스 비주얼
   - 레이아웃: 텍스트 우측

3. **Rhythm Section** (light gray)
   - 텍스트: Recognizing patterns
   - 캔버스 비주얼
   - 레이아웃: 이미지 좌측

4. **Structure Section** (medium gray)
   - 텍스트: Building systems
   - 캔버스 비주얼
   - 레이아웃: 텍스트 우측

5. **Algorithm Section** (medium gray)
   - 텍스트: Automating execution
   - 캔버스 비주얼
   - 레이아웃: 이미지 좌측

6. **AI Section** (darker gray)
   - 텍스트: Scaling infinitely
   - 캔버스 비주얼
   - 레이아웃: 텍스트 우측

7. **Flow Section** (darker gray)
   - 텍스트: Creating value continuously
   - 캔버스 비주얼
   - 레이아웃: 이미지 좌측

8. **Business Divisions Section** (darker gray)
   - 3개 사업부문 카드
   - Division 1: Asset Structure (자산 구조화)
   - Division 2: Content Structure (콘텐츠 구조화)
   - Division 3: Physical Flow Structure (물리적 흐름 구조화)
   - Orb 애니메이션

9. **Governance Structure Section**
   - Tier 1: ValuenCores Inc. + D.Cooperative Foundation
   - Tier 2: Investors Committee
   - Tier 3: 4개 부서 (Quantum AI R&D, Stakeholder Communication, Strategic Planning & PM, Trade Business)

10. **Team Section**
    - 경영진 및 연구진 소개

11. **Contact Section**
    - 연락처 정보
    - 주소: 서울시 종로구 효자로 15 (통의동) 다모여빌딩 2층
    - 이메일: valuencores@gmail.com

---

## 🎨 **디자인 특징**

### **색상 팔레트**
- **배경 그라데이션**: Light Gray → Medium Gray → Dark Gray → Darker Gray
- **텍스트**: White / Off-white
- **강조 색상**: 미니멀 (주로 텍스트와 라인)

### **애니메이션**
- **Hero Canvas**: 파티클/네트워크 애니메이션
- **Section Canvas**: 각 섹션별 고유 캔버스 애니메이션
  - core-canvas
  - rhythm-canvas
  - structure-canvas
  - algorithm-canvas
  - ai-canvas
  - flow-canvas
- **Orbs Canvas**: Business Divisions 섹션의 궤도 애니메이션

### **레이아웃**
- **반응형**: 모바일/태블릿/데스크톱 지원
- **번갈아 배치**: 텍스트 좌우 교대 배치로 시각적 리듬 생성
- **미니멀**: 여백과 타이포그래피 중심

---

## 📁 **파일 구조**

```
site2/
├── index.html                    (24.8 KB) - 메인 HTML
├── css/
│   └── style.css                 (21.9 KB) - 전체 스타일시트
├── js/
│   ├── canvas-animations.js      (21.9 KB) - 캔버스 애니메이션
│   └── main.js                   (6.0 KB) - 메인 JavaScript
└── images/
    └── og-thumbnail.jpg          (93.1 KB) - OG 이미지
```

**총 파일**: 5개  
**총 용량**: ~167.7 KB

---

## 🔧 **기술 스택**

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, Custom Properties
- **JavaScript (Vanilla)**: 
  - Canvas API
  - Intersection Observer
  - Smooth Scroll
- **Fonts**: Google Fonts (Inter)
- **최적화**: 
  - Cloudflare CDN
  - 이미지 최적화
  - 코드 최소화

---

## 📱 **반응형 브레이크포인트**

```css
/* Mobile First Approach */
Default: 0px ~ 767px (Mobile)
768px ~ 1023px (Tablet)
1024px+ (Desktop)
```

---

## 🌐 **SEO & Social Meta Tags**

### **Open Graph (카카오톡/Facebook)**
- og:title: ValuenCores — Multiple cores. One principle.
- og:description: We turn imbalance into structure, and structure into flow.
- og:image: images/og-thumbnail.jpg (1365x768)
- og:url: https://www.valuencores.com/

### **Twitter Card**
- twitter:card: summary_large_image
- twitter:title: ValuenCores — Multiple cores. One principle.
- twitter:image: images/og-thumbnail.jpg

---

## 🎯 **핵심 메시지**

### **철학**
```
Find the Core.
Build the Structure.
Create Repeatable Value.
```

### **프로세스**
```
Core → Rhythm → Structure → Algorithm → AI → Flow
(불균형 발견 → 패턴 인식 → 시스템 구축 → 자동화 → AI 확장 → 가치 흐름)
```

### **3대 사업 구조**
1. **Asset Structure**: 디지털 자산 구조화 및 자동 거래
2. **Content Structure**: AI 기반 콘텐츠 시스템 구축
3. **Physical Flow Structure**: 글로벌 물류/무역 최적화

---

## 📊 **미리보기**

사이트는 다음과 같은 순서로 스크롤됩니다:

```
┌─────────────────────────┐
│  HERO (Canvas Animation) │  ← 다크 배경, 파티클
├─────────────────────────┤
│  CORE (Light Gray)       │  ← 텍스트 우측
├─────────────────────────┤
│  RHYTHM (Light Gray)     │  ← 이미지 좌측
├─────────────────────────┤
│  STRUCTURE (Mid Gray)    │  ← 텍스트 우측
├─────────────────────────┤
│  ALGORITHM (Mid Gray)    │  ← 이미지 좌측
├─────────────────────────┤
│  AI (Dark Gray)          │  ← 텍스트 우측
├─────────────────────────┤
│  FLOW (Dark Gray)        │  ← 이미지 좌측
├─────────────────────────┤
│  BUSINESS DIVISIONS      │  ← 3개 카드 + Orb 애니메이션
├─────────────────────────┤
│  GOVERNANCE STRUCTURE    │  ← 조직도 (3단계)
├─────────────────────────┤
│  TEAM                    │  ← 멤버 프로필
├─────────────────────────┤
│  CONTACT                 │  ← 연락처 정보
└─────────────────────────┘
```

---

## 🚀 **다음 단계: D-QUANT 사이트 통합**

### **통합 계획**

1. **네비게이션 통합**
   - ValuenCores → D-QUANT 9.0 링크
   - D-QUANT 9.0 → ValuenCores 링크

2. **브랜드 일관성**
   - 색상 팔레트 통일
   - 타이포그래피 조화
   - 애니메이션 스타일 매칭

3. **콘텐츠 연결**
   - "Asset Structure" → D-QUANT 9.0 플랫폼
   - Team 섹션 통합
   - Contact 정보 통일

4. **기술 통합**
   - 공통 CSS 변수
   - 공통 JavaScript 유틸리티
   - 통일된 폰트/아이콘

---

## 📞 **Contact Information**

**Company**: ValuenCores Inc. (밸류앤코어스 주식회사)  
**Address**: 서울특별시 종로구 효자로 15 (통의동) 다모여빌딩 2층  
**Email**: valuencores@gmail.com  
**Website**: https://www.valuencores.com/  

---

## 📄 **License**

© 2026 ValuenCores Inc. All rights reserved.

---

---

## 📝 **Changelog**

### **v1.1.0** (2026-03-08)
- ✅ **텍스트 크기 50% 증가 적용**
  - `.section-subtitle`: `clamp(13px, 1.5vw, 15px)` → `clamp(19.5px, 2.25vw, 22.5px)`
  - `.section-body`: `clamp(13px, 1.3vw, 15px)` → `clamp(19.5px, 1.95vw, 22.5px)`
  - `.section-title` (타이틀)은 크기 유지: `clamp(28px, 5vw, 52px)`
- 📊 **적용 범위**: 모든 섹션 (Core, Rhythm, Structure, Algorithm, AI, Flow, Business Divisions)
- 🎯 **효과**: 가독성 대폭 향상, 모바일/태블릿/데스크톱 모두 반응형 유지

### **v1.0.0** (2026-03-08)
- ✅ Site2에서 ValuenCores 폴더로 이동
- ✅ D-QUANT 9.0 크로스 네비게이션 추가
- ✅ 초기 배포 준비 완료

---

**Last Updated**: 2026-03-08  
**Version**: 1.1.0  
**Status**: ✅ Typography Enhanced & Ready for Deployment
