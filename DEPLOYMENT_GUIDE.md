# 🚀 카페24 배포 가이드

![Status](https://img.shields.io/badge/status-ready-brightgreen.svg)
![Domains](https://img.shields.io/badge/domains-2-blue.svg)

**두 개의 도메인으로 분리된 웹사이트 구조**

---

## 📋 **배포 구조**

```
카페24 호스팅
│
├── www.valuencores.com  →  site2/ 폴더
│   └── ValuenCores 기업 사이트
│
└── www.dquant9.com      →  dquant/ 폴더
    └── D-QUANT 9.0 플랫폼
```

---

## 📁 **파일 구조**

### **1. ValuenCores 사이트** (`site2/` 폴더)

```
site2/
├── index.html                  (24.8 KB) - 메인 페이지
├── css/
│   └── style.css               (22.3 KB) - 스타일시트 (네비게이션 업데이트됨)
├── js/
│   ├── canvas-animations.js    (21.9 KB) - 캔버스 애니메이션
│   └── main.js                 (6.0 KB) - 메인 JavaScript
├── images/
│   └── og-thumbnail.jpg        (93.1 KB) - OG 이미지
└── README.md                   (5.4 KB) - 문서
```

**주요 페이지**:
- 메인: index.html
- 섹션: Hero, Core, Rhythm, Structure, Algorithm, AI, Flow, Business Divisions, Governance, Team, Contact

**크로스 링크**:
- ✅ 네비게이션에 "D-QUANT 9.0" 링크 추가 (https://www.dquant9.com)

---

### **2. D-QUANT 9.0 사이트** (`dquant/` 폴더)

```
dquant/
├── index.html                  (372 KB) - 메인 페이지
├── team.html                   (51 KB) - 팀 소개
├── simulation.html             (37 KB) - 투자 시뮬레이터
├── my-assets.html              (44 KB) - 나의 자산
├── my-info.html                (45 KB) - 나의 정보
├── consultation.html           (48 KB) - 상담 문의
├── support.html                (84 KB) - 고객센터
├── signup.html                 (49 KB) - 회원가입
├── login.html                  (19 KB) - 로그인
├── admin-dashboard.html        (40 KB) - 관리자 대시보드
├── admin-login.html            (18 KB) - 관리자 로그인
│
├── css/
│   ├── style.css               (20 KB) - 메인 스타일
│   └── navigation.css          (7 KB) - 네비게이션 스타일
│
├── js/
│   ├── calculator.js           (28 KB) - 계산기
│   ├── auth.js                 (7 KB) - 인증
│   ├── login-guard.js          (8 KB) - 로그인 가드
│   ├── login-modal.js          (17 KB) - 로그인 모달
│   ├── check-login.js          (3 KB) - 로그인 체크
│   ├── i18n-navigation.js      (50 KB) - 다국어 네비게이션
│   ├── signup.js               (6 KB) - 회원가입
│   ├── navigation.js           (3 KB) - 네비게이션
│   ├── i18n.js                 (7 KB) - 다국어
│   └── main.js                 (9 KB) - 메인 JavaScript
│
├── images/
│   ├── valuencores-logo.png    (36 KB)
│   ├── dq9-featured-image.png  (34 KB)
│   └── dquant-9.0-featured.png (115 KB)
│
├── admin-dashboard.js          (24 KB) - 관리자 기능
├── admin-dashboard-ext.js      (3 KB) - 관리자 확장
└── README.md                   (294 KB) - 문서
```

**크로스 링크**:
- ✅ 네비게이션에 "ValuenCores" 링크 추가 (https://www.valuencores.com)

---

## 🌐 **도메인 연결 방법**

### **카페24 호스팅 설정**

#### **1. 도메인 관리**
```
카페24 관리자 → 도메인 관리 → 도메인 연결
```

#### **2. www.valuencores.com 설정**
1. 도메인 추가: `www.valuencores.com`
2. 루트 디렉토리: `/site2/`
3. 인덱스 파일: `index.html`

#### **3. www.dquant9.com 설정**
1. 도메인 추가: `www.dquant9.com`
2. 루트 디렉토리: `/dquant/`
3. 인덱스 파일: `index.html`

---

## 📤 **FTP 업로드 방법**

### **FileZilla 사용**

```
1. FTP 접속 정보 입력
   - 호스트: ftp.cafe24.com (또는 카페24 제공 FTP 주소)
   - 사용자명: 카페24 아이디
   - 비밀번호: FTP 비밀번호
   - 포트: 21

2. site2/ 폴더 업로드
   - 로컬: site2/ 폴더 전체 선택
   - 원격: /www/site2/ (또는 /public_html/site2/)
   
3. dquant/ 폴더 업로드
   - 로컬: dquant/ 폴더 전체 선택
   - 원격: /www/dquant/ (또는 /public_html/dquant/)
```

---

## 🔒 **.htaccess 설정** (권장)

### **site2/.htaccess** (ValuenCores)

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}\.html -f
RewriteRule ^(.*)$ $1.html [NC,L]

# Error pages
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### **dquant/.htaccess** (D-QUANT 9.0)

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}\.html -f
RewriteRule ^(.*)$ $1.html [NC,L]

# Error pages
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## ✅ **배포 전 체크리스트**

### **파일 확인**
- [ ] site2/ 폴더 내 모든 파일 존재 확인
- [ ] dquant/ 폴더 내 모든 파일 존재 확인
- [ ] 이미지 파일 업로드 확인
- [ ] CSS/JS 파일 업로드 확인

### **링크 확인**
- [ ] ValuenCores → D-QUANT 링크 작동
- [ ] D-QUANT → ValuenCores 링크 작동
- [ ] 모든 내부 링크 정상 작동
- [ ] 이미지 경로 정상

### **도메인 확인**
- [ ] www.valuencores.com DNS 설정 완료
- [ ] www.dquant9.com DNS 설정 완료
- [ ] SSL 인증서 설치 (HTTPS)
- [ ] 리다이렉션 테스트 (HTTP → HTTPS)

### **반응형 확인**
- [ ] 모바일에서 정상 표시
- [ ] 태블릿에서 정상 표시
- [ ] 데스크톱에서 정상 표시

### **성능 확인**
- [ ] 페이지 로딩 속도 (3초 이내)
- [ ] 이미지 최적화
- [ ] CSS/JS 압축
- [ ] 브라우저 캐싱 설정

---

## 🧪 **테스트 URL**

배포 후 다음 URL들을 테스트하세요:

### **ValuenCores**
```
✅ https://www.valuencores.com/
✅ https://www.valuencores.com/#hero
✅ https://www.valuencores.com/#divisions
✅ https://www.valuencores.com/#contact
```

### **D-QUANT 9.0**
```
✅ https://www.dquant9.com/
✅ https://www.dquant9.com/team.html
✅ https://www.dquant9.com/simulation.html
✅ https://www.dquant9.com/my-assets.html
✅ https://www.dquant9.com/support.html
```

### **크로스 링크**
```
✅ ValuenCores → D-QUANT 링크 클릭
✅ D-QUANT → ValuenCores 링크 클릭
```

---

## 📊 **배포 후 모니터링**

### **Google Analytics 설정** (권장)

```html
<!-- ValuenCores & D-QUANT 공통 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### **Google Search Console 등록**

1. https://search.google.com/search-console
2. 두 도메인 모두 등록
   - www.valuencores.com
   - www.dquant9.com
3. Sitemap 제출
   - `/sitemap.xml`

---

## 🔧 **문제 해결**

### **1. 크로스 링크가 작동하지 않음**
```
원인: target="_blank" 속성 누락
해결: 모든 외부 링크에 target="_blank" rel="noopener" 추가
```

### **2. 이미지가 표시되지 않음**
```
원인: 상대 경로 오류
해결: 
- site2/images/ → ../images/ 또는 /images/
- dquant/images/ → ../images/ 또는 /images/
```

### **3. CSS/JS가 로드되지 않음**
```
원인: MIME 타입 오류
해결: .htaccess에 AddType 추가
AddType text/css .css
AddType application/javascript .js
```

### **4. HTTPS 리다이렉션 안됨**
```
원인: .htaccess RewriteRule 미설정
해결: 위의 .htaccess 코드 사용
```

---

## 📞 **지원**

**카페24 고객센터**:
- 전화: 1544-6644
- 이메일: help@cafe24.com
- 관리자: admin.cafe24.com

**기술 지원**:
- ValuenCores: valuencores@gmail.com
- D-QUANT 9.0: 02-356-6771

---

## 🎉 **배포 완료 후**

1. **소셜 미디어 공유 테스트**
   - 카카오톡 미리보기
   - Facebook 공유
   - Twitter 카드

2. **SEO 최적화**
   - robots.txt 생성
   - sitemap.xml 생성
   - Meta 태그 확인

3. **성능 최적화**
   - Google PageSpeed Insights 테스트
   - GTmetrix 테스트
   - 이미지 WebP 변환 (선택)

---

**배포 날짜**: 2026-03-08  
**버전**: 1.0  
**상태**: ✅ **배포 준비 완료**

---

## 📋 **빠른 명령어**

```bash
# FTP 연결 (Linux/Mac)
ftp ftp.cafe24.com
> user [카페24_아이디]
> pass [FTP_비밀번호]
> cd /www
> mkdir site2
> mkdir dquant

# 파일 권한 설정
chmod 755 site2/
chmod 755 dquant/
chmod 644 site2/*.html
chmod 644 dquant/*.html
```

---

🚀 **모든 준비가 완료되었습니다!** 

카페24 호스팅에 업로드하고 도메인을 연결하면 두 사이트가 정상적으로 작동할 것입니다.
