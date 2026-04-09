# 🚀 도메인 연결 빠른 시작 가이드

## ⏱️ 5분 안에 도메인 연결하기

---

## 📋 필요한 것
- ✅ 도메인: `www.dquant9.com` (이미 구매됨)
- ✅ 프로젝트: D-QUANT 9.0 (이미 개발됨)
- ⏳ **필요:** Publish 탭에서 배포

---

## 🎯 3단계로 완료하기

### **1단계: Publish 탭에서 배포** (⏱️ 2분)

#### 방법:
1. 화면 상단 **"Publish"** 탭 클릭
2. **"Publish Project"** 버튼 클릭
3. 배포 완료 대기 (1-5분)

#### 결과:
```
✅ 배포 URL: https://[your-project].genspark.ai
✅ 서버 IP: xxx.xxx.xxx.xxx
```

**이 정보를 복사하세요! 다음 단계에서 필요합니다.**

---

### **2단계: DNS 설정** (⏱️ 3분)

#### 도메인 업체 접속:
- **가비아:** my.gabia.com
- **후이즈:** whois.co.kr
- **기타:** 도메인 구매한 사이트

#### DNS 레코드 추가:

**A 레코드:**
```
Type: A
Host: @
Value: [Step 1에서 받은 IP]
TTL: 3600
```

**CNAME 레코드:**
```
Type: CNAME
Host: www
Value: [Step 1에서 받은 도메인]
TTL: 3600
```

#### 저장 버튼 클릭!

---

### **3단계: 대기 및 테스트** (⏱️ 2-6시간)

#### DNS 전파 대기:
- ⏰ **일반적으로:** 2-6시간
- ⏰ **최대:** 48시간

#### 전파 확인:
https://www.whatsmydns.net 에서 `dquant9.com` 검색

#### 테스트:
```
https://www.dquant9.com/domain-test.html
```

---

## 🆘 문제 발생 시

### "주의 요함" 오류가 나온다면?

#### ✅ **즉시 확인:**
1. Publish 탭에서 배포했나요?
   - **NO** → Step 1로 돌아가기
   - **YES** → DNS 설정 확인

2. DNS 설정을 저장했나요?
   - **NO** → Step 2로 돌아가기
   - **YES** → 2-6시간 대기

3. 6시간 이상 지났나요?
   - **NO** → 조금 더 대기
   - **YES** → DNS 설정 재확인

---

## 💡 임시 해결책

### DNS 전파 완료 전까지 이 URL 사용:

**메인 페이지:**
```
https://www.genspark.ai/api/code_sandbox_light/preview/4cd1f08e-a30f-4cc7-a848-d444f382f0a8/dquant/index.html
```

**관리자 대시보드:**
```
https://www.genspark.ai/api/code_sandbox_light/preview/4cd1f08e-a30f-4cc7-a848-d444f382f0a8/dquant/admin-dashboard.html
```

이 URL들은 **지금 바로** 작동합니다!

---

## 📞 도움 요청

### 막히면 연락하세요:

**개발자:**
- 📧 valuencores@gmail.com
- ☎️ 02-356-6771

**도메인 업체:**
- 가비아: 1544-4755
- 후이즈: 1544-2882

---

## ✅ 성공 체크리스트

도메인 연결 성공 시:
- [x] `https://www.dquant9.com` 접속 → 메인 페이지 표시
- [x] 브라우저에 🔒 자물쇠 아이콘 표시 (HTTPS)
- [x] 모든 이미지와 링크 정상 작동
- [x] 관리자 로그인 가능

---

## 🎯 다음 단계

도메인 연결 후:
1. SSL 인증서 자동 발급 확인
2. 모든 페이지 테스트
3. 모바일 반응형 확인
4. 성능 모니터링 시작

---

**소요 시간:** 배포 5분 + DNS 대기 2-6시간  
**난이도:** ⭐⭐☆☆☆ (쉬움)  
**상태:** 📝 가이드 완료

**시작하세요! → Publish 탭으로 이동**
