# 도메인 연결 문제 해결 가이드

## 🚨 문제: "주의 요함" 오류 발생

### 증상
```
https://www.dquant9.com/domain-test.html
```
접속 시 **"주의 요함"** 또는 **404 오류** 발생

---

## ✅ 해결 방법

### 🔴 **1단계: Publish 탭에서 배포 (필수!)**

**가장 중요한 단계입니다!**

#### 배포 방법:
1. 화면 상단의 **"Publish"** 탭 클릭
2. **"Publish Project"** 또는 **"Deploy"** 버튼 클릭
3. 배포 완료 대기 (1-5분)
4. 배포 URL 확인 및 복사

#### 배포 후 제공되는 정보:
- **배포 URL:** `https://[project-id].genspark.ai` 또는 유사한 형식
- **서버 IP 주소:** DNS A 레코드 설정에 사용

---

### 🟡 **2단계: DNS 설정**

#### 도메인 등록업체에서 설정:

**Option A: A 레코드 (권장)**
```
Type: A
Host: @ (또는 비워두기)
Points to: [Step 1에서 받은 서버 IP]
TTL: 3600 (1시간)
```

**Option B: CNAME 레코드**
```
Type: CNAME
Host: www
Points to: [Step 1에서 받은 배포 도메인]
TTL: 3600
```

#### 주요 도메인 업체별 설정 방법:

##### **가비아 (Gabia)**
1. My가비아 로그인
2. 서비스 관리 > 도메인 관리
3. DNS 정보 > DNS 관리
4. 레코드 추가 > A 또는 CNAME
5. 저장

##### **후이즈 (Whois)**
1. 후이즈 로그인
2. 도메인 관리 > 네임서버 관리
3. DNS 레코드 수정
4. A 레코드 추가
5. 저장 후 적용

##### **GoDaddy**
1. GoDaddy 로그인
2. My Products > Domains
3. DNS 클릭
4. Add Record > A 또는 CNAME
5. Save

---

### 🟢 **3단계: DNS 전파 대기**

**대기 시간:** 24~48시간 (일반적으로 2~6시간 내 전파)

#### DNS 전파 확인:
1. **온라인 도구 사용:**
   - https://www.whatsmydns.net
   - `dquant9.com` 입력
   - 전 세계 DNS 서버에서 전파 상태 확인

2. **명령어로 확인:**
   ```bash
   # Windows
   nslookup www.dquant9.com
   
   # Mac/Linux
   dig www.dquant9.com
   ```

3. **브라우저 확인:**
   - 시크릿 모드로 접속
   - 캐시 영향 배제

---

### 🔵 **4단계: 테스트**

#### 테스트 체크리스트:

- [ ] **루트 도메인:**
  ```
  https://www.dquant9.com
  ```
  → 메인 페이지로 리다이렉트 확인

- [ ] **도메인 테스트 페이지:**
  ```
  https://www.dquant9.com/domain-test.html
  ```
  → 연결 상태 및 정보 확인

- [ ] **메인 페이지 (직접 경로):**
  ```
  https://www.dquant9.com/dquant/index.html
  ```
  → 정상 로딩 확인

- [ ] **관리자 로그인:**
  ```
  https://www.dquant9.com/dquant/admin-login.html
  ```
  → 로그인 폼 표시 확인

---

## 🛠️ 추가 문제 해결

### ❌ **문제 1: "주의 요함" 오류**

#### 원인:
- Publish 탭에서 배포하지 않음
- DNS 설정이 잘못됨
- DNS가 아직 전파되지 않음

#### 해결:
1. **Publish 탭에서 배포 확인**
2. DNS 설정 다시 확인
3. 24시간 대기 후 재시도

---

### ❌ **문제 2: 404 Not Found**

#### 원인:
- 파일 경로가 잘못됨
- 서버에 파일이 업로드되지 않음

#### 해결:
1. Publish 탭에서 **"Re-publish"** 클릭
2. 배포 완료 확인
3. 파일 경로 확인:
   ```
   /dquant/index.html
   /dquant/admin-dashboard.html
   ```

---

### ❌ **문제 3: SSL 인증서 오류**

#### 원인:
- HTTPS가 아직 설정되지 않음

#### 해결:
1. Publish 플랫폼에서 SSL 자동 발급 확인
2. Let's Encrypt 무료 SSL 사용
3. 도메인 업체에서 SSL 인증서 구매

---

## 📞 지원 요청

### 도움이 필요하면:

#### **Publish 플랫폼 지원:**
- Genspark 고객센터 문의
- 배포 관련 문제

#### **도메인 업체 지원:**
- 가비아: 1544-4755
- 후이즈: 1544-2882
- DNS 설정 관련 문제

#### **프로젝트 개발자:**
- 이메일: valuencores@gmail.com
- 전화: 02-356-6771
- 웹사이트 기능 관련 문제

---

## 🎯 현재 사용 가능한 URL (임시)

### DNS 전파 완료 전까지 사용:

**메인 페이지:**
```
https://www.genspark.ai/api/code_sandbox_light/preview/4cd1f08e-a30f-4cc7-a848-d444f382f0a8/dquant/index.html
```

**관리자 대시보드:**
```
https://www.genspark.ai/api/code_sandbox_light/preview/4cd1f08e-a30f-4cc7-a848-d444f382f0a8/dquant/admin-dashboard.html
```

**관리자 로그인:**
```
https://www.genspark.ai/api/code_sandbox_light/preview/4cd1f08e-a30f-4cc7-a848-d444f382f0a8/dquant/admin-login.html
```

**도메인 테스트:**
```
https://www.genspark.ai/api/code_sandbox_light/preview/4cd1f08e-a30f-4cc7-a848-d444f382f0a8/domain-test.html
```

---

## 📋 체크리스트

도메인 연결을 위한 완전한 체크리스트:

### **배포 단계:**
- [ ] Publish 탭에서 "Publish Project" 클릭
- [ ] 배포 완료 확인 (녹색 체크 또는 "Published" 상태)
- [ ] 배포 URL 복사

### **DNS 설정 단계:**
- [ ] 도메인 등록업체 로그인
- [ ] DNS 관리 페이지 접속
- [ ] A 레코드 추가 (@ 또는 root, 배포 IP 입력)
- [ ] CNAME 레코드 추가 (www, 배포 도메인 입력)
- [ ] 저장 및 적용

### **대기 및 확인 단계:**
- [ ] 2~6시간 대기
- [ ] whatsmydns.net에서 전파 상태 확인
- [ ] 브라우저 시크릿 모드로 접속 테스트
- [ ] 캐시 삭제 후 재접속

### **최종 테스트:**
- [ ] https://www.dquant9.com 접속
- [ ] https://www.dquant9.com/domain-test.html 접속
- [ ] https://www.dquant9.com/dquant/admin-login.html 접속
- [ ] 모바일에서 접속 테스트

---

## 📊 예상 타임라인

| 단계 | 소요 시간 | 상태 |
|------|----------|------|
| Publish 배포 | 1-5분 | ⏱️ 즉시 |
| DNS 설정 | 5-10분 | ⏱️ 즉시 |
| DNS 전파 | 2-48시간 | ⏳ 대기 |
| 최종 테스트 | 10분 | ✅ 완료 |

**총 소요 시간:** 2~48시간 (일반적으로 2~6시간)

---

## 🎉 성공 확인

도메인 연결이 성공하면:

1. ✅ `https://www.dquant9.com` → 메인 페이지 로딩
2. ✅ `https://www.dquant9.com/domain-test.html` → "정상 작동" 표시
3. ✅ 모든 링크와 이미지 정상 표시
4. ✅ HTTPS (🔒) 자물쇠 아이콘 표시

---

**마지막 업데이트:** 2026-03-08  
**버전:** v6.0.9  
**작성자:** D-QUANT 9.0 개발팀
