# 도메인 연결 가이드 - www.dquant9.com

## 📅 업데이트 일시: 2026-03-08

---

## 🌐 도메인 정보

### ✅ **공식 도메인**
- **메인 도메인:** `https://www.dquant9.com`
- **프로토콜:** HTTPS (보안 연결)
- **도메인 상태:** ✅ 연결됨

---

## 🔗 주요 페이지 URL

### 📱 **사용자 페이지**
| 페이지 | 도메인 URL | 직접 경로 URL |
|--------|-----------|--------------|
| 메인 페이지 | `https://www.dquant9.com` | `https://www.dquant9.com/dquant/index.html` |
| 회원가입 | `https://www.dquant9.com/dquant/signup.html` | - |
| 로그인 | `https://www.dquant9.com/dquant/login.html` | - |
| 시뮬레이션 | `https://www.dquant9.com/dquant/simulation.html` | - |
| 내 자산 | `https://www.dquant9.com/dquant/my-assets.html` | - |
| 내 정보 | `https://www.dquant9.com/dquant/my-info.html` | - |
| 전문가 상담 | `https://www.dquant9.com/dquant/consultation.html` | - |
| 고객센터 | `https://www.dquant9.com/dquant/support.html` | - |
| 팀 소개 | `https://www.dquant9.com/dquant/team.html` | - |

### 👔 **관리자 페이지**
| 페이지 | 도메인 URL | 로그인 정보 |
|--------|-----------|------------|
| 관리자 로그인 | `https://www.dquant9.com/dquant/admin-login.html` | Email: `valuencores@gmail.com`<br>Password: `@vnc1201` |
| 관리자 대시보드 | `https://www.dquant9.com/dquant/admin-dashboard.html` | (로그인 후 접속) |
| 회원 상세 정보 | `https://www.dquant9.com/dquant/member-detail.html?id={회원ID}` | (로그인 후 접속) |

---

## 🚨 도메인 연결 문제 해결

### **증상: 도메인 접속 시 오류 발생**

#### 1️⃣ **DNS 전파 대기**
- **설명:** 도메인 DNS 설정이 전 세계에 전파되는데 최대 **48시간** 소요
- **해결책:** 24~48시간 후 다시 접속 시도
- **확인 방법:** [DNS Propagation Checker](https://www.whatsmydns.net)에서 `dquant9.com` 검색

#### 2️⃣ **DNS 설정 확인**
도메인 등록업체(가비아, 후이즈, GoDaddy 등)에서 다음을 확인하세요:

**A 레코드 설정 (권장):**
```
Type: A
Host: @
Value: [서버 IP 주소]
TTL: 3600
```

**CNAME 레코드 설정 (대안):**
```
Type: CNAME
Host: www
Value: [배포 서버 도메인]
TTL: 3600
```

#### 3️⃣ **브라우저 캐시 삭제**
1. **Chrome/Edge:** `Ctrl + Shift + Delete` → 캐시 이미지 및 파일 삭제
2. **Safari:** `Command + Option + E`
3. **Firefox:** `Ctrl + Shift + Delete` → 캐시 삭제

#### 4️⃣ **직접 경로로 접속 (임시 해결책)**
도메인 루트가 작동하지 않을 경우, 전체 경로로 직접 접속:
```
https://www.dquant9.com/dquant/index.html
```

#### 5️⃣ **서버 설정 확인**

##### **Apache 서버 (.htaccess 설정)**
프로젝트 루트에 `.htaccess` 파일이 생성되어 있습니다:
- ✅ 루트 접속 → `/dquant/index.html` 자동 리다이렉트
- ✅ `/admin` → `/dquant/admin-login.html` 자동 리다이렉트
- ✅ 404 오류 → `/dquant/index.html` 리다이렉트

##### **Nginx 서버 (nginx.conf 설정)**
서버 관리자에게 다음 설정을 요청하세요:
```nginx
server {
    listen 80;
    server_name dquant9.com www.dquant9.com;
    root /path/to/project;
    index index.html;
    
    # 루트 접속 시 dquant/index.html로 리다이렉트
    location = / {
        return 301 /dquant/index.html;
    }
    
    # 기본 라우팅
    location / {
        try_files $uri $uri/ /dquant/index.html;
    }
    
    # 관리자 경로
    location /admin {
        return 301 /dquant/admin-login.html;
    }
}
```

---

## 📊 현재 프로젝트 구조

```
프로젝트 루트/
├── index.html              ← 루트 리다이렉트 페이지 (dquant/index.html로 이동)
├── .htaccess              ← Apache 서버 URL 리라이트 설정
└── dquant/
    ├── index.html         ← 실제 메인 페이지
    ├── signup.html
    ├── login.html
    ├── admin-login.html
    ├── admin-dashboard.html
    ├── admin-dashboard.js
    ├── member-detail.html
    ├── simulation.html
    ├── my-assets.html
    ├── my-info.html
    ├── consultation.html
    ├── support.html
    ├── team.html
    ├── css/
    │   └── *.css
    ├── js/
    │   └── *.js
    └── images/
        └── *.png, *.jpg, *.svg
```

---

## ✅ 테스트 방법

### 1. **루트 도메인 접속**
```
https://www.dquant9.com
```
- ✅ 예상 결과: `/dquant/index.html`로 자동 리다이렉트
- ❌ 오류 발생 시: 직접 경로로 접속 `https://www.dquant9.com/dquant/index.html`

### 2. **관리자 페이지 접속**
```
https://www.dquant9.com/dquant/admin-login.html
```
- 로그인 정보:
  - Email: `valuencores@gmail.com`
  - Password: `@vnc1201`

### 3. **모든 페이지 테스트**
위의 **주요 페이지 URL** 표에서 각 URL을 클릭하여 정상 작동 확인

---

## 🛠️ 추가 지원

### **기술 지원 필요 시**
1. **DNS 설정 문제:** 도메인 등록업체 고객센터 문의
2. **서버 설정 문제:** 호스팅 업체 기술 지원팀 문의
3. **프로젝트 파일 문제:** 개발자에게 문의

### **현재 상태 확인**
```bash
# 도메인 DNS 조회
nslookup www.dquant9.com

# 도메인 응답 확인
curl -I https://www.dquant9.com

# 서버 응답 시간 확인
ping www.dquant9.com
```

---

## 📞 연락처

- **이메일:** valuencores@gmail.com
- **전화:** 02-356-6771
- **운영 시간:** 평일 09:00 - 18:00

---

**마지막 업데이트:** 2026-03-08  
**버전:** v6.0.9  
**상태:** ✅ 도메인 연결 가이드 완료
