# 🌐 카페24 도메인 분리 배포 가이드

![Status](https://img.shields.io/badge/status-ready-brightgreen.svg)
![Domains](https://img.shields.io/badge/domains-2-blue.svg)
![Updated](https://img.shields.io/badge/updated-2026--03--08-orange.svg)

**두 개의 독립 도메인 완벽 분리 구조**

---

## 📋 **최종 배포 구조**

```
카페24 호스팅
│
├── 📁 valuencores/              →  www.valuencores.com
│   └── ValuenCores 기업 사이트 (Independent)
│
└── 📁 dquant/                   →  www.dquant9.com
    └── D-QUANT 9.0 플랫폼 (Independent)
```

---

## 🎯 **변경 사항 (2026-03-08)**

### **Before** ❌
```
site2/  →  www.valuencores.com
dquant/ →  www.dquant9.com
```

### **After** ✅
```
valuencores/  →  www.valuencores.com  (폴더명 변경)
dquant/       →  www.dquant9.com      (유지)
```

---

## 📁 **폴더 구조**

### **1. ValuenCores 사이트** (`valuencores/` 폴더)

```
valuencores/
├── index.html                  (25.0 KB) - 메인 페이지
├── css/
│   └── style.css               (22.3 KB) - 스타일시트
├── js/
│   ├── canvas-animations.js    (21.9 KB) - 캔버스 애니메이션
│   └── main.js                 (6.0 KB) - 메인 JavaScript
├── images/
│   └── og-thumbnail.jpg        (93.1 KB) - OG 이미지
└── README.md                   (7.7 KB) - 문서
```

**도메인**: `www.valuencores.com`  
**타입**: Single Page Application (SPA)  
**섹션**: Hero, Core, Rhythm, Structure, Algorithm, AI, Flow, Business Divisions, Governance, Team, Contact

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
├── css/, js/, images/
└── README.md                   (294 KB) - 문서
```

**도메인**: `www.dquant9.com`  
**타입**: Multi-Page Application  
**페이지**: 11개 HTML 페이지

---

## 🚀 **카페24 FTP 업로드 방법**

### **방법 1: FileZilla (권장)**

#### **접속 정보**
```
호스트: ftp.cafe24.com
사용자명: [카페24 아이디]
비밀번호: [FTP 비밀번호]
포트: 21
```

#### **업로드 절차**

**1단계: ValuenCores 업로드**
```
로컬 경로: valuencores/
원격 경로: /www/valuencores/

업로드 파일:
✓ index.html
✓ css/style.css
✓ js/canvas-animations.js
✓ js/main.js
✓ images/og-thumbnail.jpg
✓ README.md
```

**2단계: D-QUANT 업로드**
```
로컬 경로: dquant/
원격 경로: /www/dquant/

업로드 파일:
✓ 11개 HTML 파일
✓ css/ 폴더 (2개 파일)
✓ js/ 폴더 (10개 파일)
✓ images/ 폴더 (3개 파일)
✓ admin-dashboard.js
✓ admin-dashboard-ext.js
✓ README.md
```

---

## 🌐 **카페24 도메인 연결 설정**

### **1. 카페24 관리자 접속**
```
URL: https://admin.cafe24.com
로그인: 카페24 아이디/비밀번호
```

### **2. 도메인 관리 메뉴**
```
호스팅 관리 → 도메인 관리 → 도메인 연결
```

### **3. www.valuencores.com 설정**

```
┌─────────────────────────────────────────┐
│ 도메인 추가                              │
├─────────────────────────────────────────┤
│ 도메인명: www.valuencores.com           │
│ 연결 경로: /www/valuencores/            │
│ 인덱스 파일: index.html                 │
│ SSL 인증서: Let's Encrypt (자동)        │
└─────────────────────────────────────────┘
```

**설정 값**:
- **도메인**: `www.valuencores.com`
- **루트 디렉토리**: `/www/valuencores/`
- **인덱스 파일**: `index.html`
- **SSL**: 자동 발급 (Let's Encrypt)

### **4. www.dquant9.com 설정**

```
┌─────────────────────────────────────────┐
│ 도메인 추가                              │
├─────────────────────────────────────────┤
│ 도메인명: www.dquant9.com               │
│ 연결 경로: /www/dquant/                 │
│ 인덱스 파일: index.html                 │
│ SSL 인증서: Let's Encrypt (자동)        │
└─────────────────────────────────────────┘
```

**설정 값**:
- **도메인**: `www.dquant9.com`
- **루트 디렉토리**: `/www/dquant/`
- **인덱스 파일**: `index.html`
- **SSL**: 자동 발급 (Let's Encrypt)

---

## 🔒 **DNS 설정 (필수)**

### **카페24에서 도메인 구매한 경우**

DNS는 자동으로 설정됩니다. ✅

### **외부 도메인 연결 시**

#### **A 레코드 설정**
```
타입: A
호스트: @
값: [카페24 서버 IP]
TTL: 3600
```

#### **CNAME 레코드 설정**
```
타입: CNAME
호스트: www
값: [카페24 제공 주소]
TTL: 3600
```

---

## 📝 **.htaccess 설정**

### **valuencores/.htaccess**

```apache
# HTTPS 강제 리다이렉션
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 캐싱 설정
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>

# 압축 설정
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# 보안 헤더
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

### **dquant/.htaccess**

```apache
# HTTPS 강제 리다이렉션
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# .html 확장자 제거
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}\.html -f
RewriteRule ^(.*)$ $1.html [NC,L]

# 캐싱 설정
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>

# 압축 설정
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# 보안 헤더
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# 에러 페이지
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html
```

---

## ✅ **배포 전 체크리스트**

### **파일 업로드 확인**
- [ ] valuencores/ 폴더 전체 업로드 완료
- [ ] dquant/ 폴더 전체 업로드 완료
- [ ] 이미지 파일 정상 업로드
- [ ] CSS/JS 파일 정상 업로드

### **도메인 연결 확인**
- [ ] www.valuencores.com DNS 설정 완료
- [ ] www.dquant9.com DNS 설정 완료
- [ ] 카페24 도메인 연결 설정 완료
- [ ] SSL 인증서 자동 발급 확인

### **기능 테스트**
- [ ] www.valuencores.com 접속 테스트
- [ ] www.dquant9.com 접속 테스트
- [ ] HTTPS 리다이렉션 확인
- [ ] 크로스 링크 동작 확인

### **반응형 테스트**
- [ ] 모바일 (iPhone, Android)
- [ ] 태블릿 (iPad, Galaxy Tab)
- [ ] 데스크톱 (Chrome, Safari, Firefox)

### **성능 테스트**
- [ ] PageSpeed Insights (85점 이상)
- [ ] GTmetrix (A등급)
- [ ] 페이지 로딩 속도 (3초 이내)

---

## 🧪 **배포 후 테스트 URL**

### **ValuenCores**
```
✅ https://www.valuencores.com/
✅ https://www.valuencores.com/#hero
✅ https://www.valuencores.com/#core
✅ https://www.valuencores.com/#divisions
✅ https://www.valuencores.com/#contact
```

### **D-QUANT 9.0**
```
✅ https://www.dquant9.com/
✅ https://www.dquant9.com/team
✅ https://www.dquant9.com/simulation
✅ https://www.dquant9.com/my-assets
✅ https://www.dquant9.com/support
```

### **크로스 링크**
```
✅ ValuenCores → D-QUANT 링크 클릭 테스트
✅ D-QUANT → ValuenCores 링크 클릭 테스트
```

---

## 📊 **배포 타임라인**

```
1단계: FTP 업로드 (30분)
├─ valuencores/ 업로드 (10분)
└─ dquant/ 업로드 (20분)

2단계: 도메인 연결 (15분)
├─ www.valuencores.com 설정 (7분)
└─ www.dquant9.com 설정 (8분)

3단계: SSL 인증서 (10분)
└─ Let's Encrypt 자동 발급

4단계: .htaccess 설정 (10분)
├─ valuencores/.htaccess
└─ dquant/.htaccess

5단계: 테스트 (20분)
├─ 기능 테스트 (10분)
└─ 반응형 테스트 (10분)

총 소요 시간: 약 85분 (1시간 25분)
```

---

## 🔧 **문제 해결**

### **1. 도메인이 연결되지 않음**
```
원인: DNS 전파 대기 시간
해결: 24~48시간 대기 (일반적으로 1시간 이내)
확인: https://www.whatsmydns.net/
```

### **2. SSL 인증서 오류**
```
원인: 자동 발급 대기 중
해결: 카페24 관리자 → SSL 관리 → 수동 갱신
시간: 10~30분
```

### **3. 이미지가 표시되지 않음**
```
원인: 경로 오류
해결: 
- valuencores: /images/og-thumbnail.jpg
- dquant: /images/valuencores-logo.png
```

### **4. CSS/JS 로딩 실패**
```
원인: MIME 타입 오류
해결: .htaccess에 AddType 추가
AddType text/css .css
AddType application/javascript .js
```

---

## 📞 **지원 정보**

### **카페24 고객센터**
- **전화**: 1544-6644 (24시간)
- **이메일**: help@cafe24.com
- **관리자**: https://admin.cafe24.com

### **기술 지원**
- **ValuenCores**: valuencores@gmail.com
- **D-QUANT**: 02-356-6771
- **주소**: 서울시 종로구 효자로 15 (통의동) 다모여빌딩 2층

---

## 📚 **추가 리소스**

### **최적화 가이드**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

### **모니터링 도구**
- Google Analytics
- Google Search Console
- Cloudflare (선택)

---

## 🎉 **배포 완료 후 체크리스트**

- [ ] 두 도메인 모두 HTTPS로 접속 가능
- [ ] 모든 페이지 정상 로딩
- [ ] 크로스 링크 동작 확인
- [ ] Google Analytics 설정
- [ ] Google Search Console 등록
- [ ] Sitemap 제출
- [ ] robots.txt 생성
- [ ] 소셜 미디어 공유 테스트

---

## 📋 **빠른 참조**

```bash
# FTP 접속
ftp ftp.cafe24.com
user: [카페24_아이디]
pass: [FTP_비밀번호]

# 업로드 경로
valuencores/ → /www/valuencores/
dquant/ → /www/dquant/

# 파일 권한
chmod 755 valuencores/
chmod 755 dquant/
chmod 644 *.html
chmod 644 *.css
chmod 644 *.js
```

---

**작성일**: 2026-03-08  
**버전**: 2.0  
**상태**: ✅ **배포 준비 완료**

---

🚀 **모든 준비가 완료되었습니다!**

**valuencores/** 폴더와 **dquant/** 폴더를 카페24에 업로드하고,  
각각의 도메인을 연결하면 두 사이트가 독립적으로 운영됩니다!

---

**다음 단계**:
1. FileZilla로 FTP 접속
2. valuencores/ 폴더 업로드 → /www/valuencores/
3. dquant/ 폴더 업로드 → /www/dquant/
4. 카페24 관리자에서 도메인 연결
5. SSL 인증서 자동 발급 확인
6. 테스트 및 최종 확인

**예상 완료 시간**: 약 1시간 30분
