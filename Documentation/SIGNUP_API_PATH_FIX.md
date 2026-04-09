# 회원가입 API 경로 수정 보고서

**프로젝트**: D-QUANT 9.0  
**날짜**: 2026-03-08  
**버전**: v6.2.21 (hotfix)  
**작업자**: AI Assistant  
**우선순위**: 🔴 Critical (회원가입 기능 장애)

---

## 🚨 문제 상황

### 발생한 오류
```
www.genspark.ai 내용:
회원가입 중 오류가 발생했습니다: {"detail":"Method Not Allowed"}
```

### 오류 원인
회원가입 폼 제출 시 `tables/members_v2` 엔드포인트로 POST 요청을 보낼 때 **상대 경로**를 사용하여 발생한 문제입니다.

**문제가 된 코드**:
```javascript
const response = await fetch('tables/members_v2', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});
```

**상대 경로 문제**:
- 현재 페이지: `https://www.genspark.ai/dquant/signup.html`
- 요청 URL: `https://www.genspark.ai/dquant/tables/members_v2` ❌ (잘못된 경로)
- 올바른 URL: `https://www.genspark.ai/tables/members_v2` ✅

---

## ✅ 해결 방법

### 수정 내용

#### 1. 회원가입 API 경로 수정

**Before** (Line 1812):
```javascript
const response = await fetch('tables/members_v2', {
    method: 'POST',
    ...
});
```

**After**:
```javascript
const response = await fetch('/tables/members_v2', {
    method: 'POST',
    ...
});
```

#### 2. 이메일 중복 확인 API 경로 수정

**Before** (Line 1667):
```javascript
const response = await fetch(`tables/members_v2?search=${encodeURIComponent(email)}&limit=100`);
```

**After**:
```javascript
const response = await fetch(`/tables/members_v2?search=${encodeURIComponent(email)}&limit=100`);
```

---

## 🔍 기술적 분석

### 상대 경로 vs 절대 경로

| 경로 타입 | 예시 | 현재 페이지가 /dquant/signup.html일 때 |
|---------|------|----------------------------------------|
| **상대 경로** | `tables/members_v2` | `/dquant/tables/members_v2` ❌ |
| **절대 경로** | `/tables/members_v2` | `/tables/members_v2` ✅ |
| **전체 URL** | `https://example.com/tables/members_v2` | `https://example.com/tables/members_v2` ✅ |

### 왜 상대 경로가 문제였는가?

1. **현재 디렉토리 기준**:
   - 상대 경로 `tables/members_v2`는 현재 페이지의 디렉토리를 기준으로 해석됩니다
   - 현재 페이지: `/dquant/signup.html`
   - 해석된 경로: `/dquant/tables/members_v2` (존재하지 않음)

2. **절대 경로 사용 시**:
   - 절대 경로 `/tables/members_v2`는 도메인 루트를 기준으로 해석됩니다
   - 현재 페이지와 관계없이 항상: `/tables/members_v2`

---

## 📊 수정 파일

### `dquant/signup.html`

**수정 라인**:
- Line 1667: 이메일 중복 확인 API 경로
- Line 1812: 회원가입 제출 API 경로

**변경 사항**:
```diff
- const response = await fetch('tables/members_v2', {
+ const response = await fetch('/tables/members_v2', {
```

```diff
- const response = await fetch(`tables/members_v2?search=${encodeURIComponent(email)}&limit=100`);
+ const response = await fetch(`/tables/members_v2?search=${encodeURIComponent(email)}&limit=100`);
```

---

## 🧪 테스트 시나리오

### 1. 회원가입 프로세스

**테스트 단계**:
1. `/dquant/signup.html` 접속
2. 모든 필수 정보 입력:
   - 초대코드: `DQ92603`
   - 성명: 테스트 회원
   - 주민번호: `900101-1`
   - 휴대전화: `010-1234-5678`
   - 이메일: `test@example.com`
   - 비밀번호: `Test1234!@`
3. 약관 전체 동의 체크
4. "회원가입" 버튼 클릭

**예상 결과**:
- ✅ 회원가입 성공 알림
- ✅ `/tables/members_v2`로 POST 요청 성공
- ✅ 메인 페이지로 리디렉션

### 2. 이메일 중복 확인

**테스트 단계**:
1. 이메일 입력란에 이메일 입력
2. "확인" 버튼 클릭

**예상 결과**:
- ✅ 기존 이메일: "이미 등록된 이메일 주소입니다" 메시지
- ✅ 신규 이메일: "등록가능한 이메일 주소입니다" 메시지
- ✅ `/tables/members_v2?search=...` GET 요청 성공

---

## 🔧 추가 권장 사항

### 1. 모든 API 호출 경로 점검

프로젝트 전체에서 API 호출 시 상대 경로를 사용하는 곳이 있는지 확인 필요:

```bash
# 상대 경로로 tables/ 호출하는 곳 찾기
grep -r "fetch('tables/" dquant/
grep -r "fetch(\`tables/" dquant/
```

### 2. 일관된 경로 사용 원칙

**권장 사항**:
- ✅ API 호출 시 항상 **절대 경로** 사용 (`/tables/...`)
- ✅ 정적 리소스는 상대 경로 사용 (`css/style.css`, `js/script.js`)
- ✅ 페이지 이동은 상대 경로 사용 (`index.html`, `my-assets.html`)

### 3. 환경별 Base URL 관리

개발/스테이징/프로덕션 환경별로 다른 API 서버를 사용하는 경우:

```javascript
// config.js
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://www.genspark.ai';

// 사용 예시
const response = await fetch(`${API_BASE_URL}/tables/members_v2`, {
    method: 'POST',
    ...
});
```

---

## 📝 검증 체크리스트

### 회원가입 기능

- [x] 회원가입 폼 제출 시 API 경로 수정
- [x] 이메일 중복 확인 API 경로 수정
- [ ] 실제 회원가입 테스트 수행 (사용자 테스트 필요)
- [ ] 브라우저 콘솔에서 네트워크 요청 확인

### 다른 페이지 점검

- [ ] 로그인 페이지 API 호출 확인
- [ ] 나의 자산 페이지 API 호출 확인
- [ ] 나의 정보 페이지 API 호출 확인
- [ ] 관리자 페이지 API 호출 확인

---

## 🎯 예상 효과

### 즉시 효과
- ✅ 회원가입 기능 정상 작동
- ✅ "Method Not Allowed" 오류 해결
- ✅ 이메일 중복 확인 정상 작동

### 장기 효과
- ✅ API 경로 일관성 확보
- ✅ 향후 유사 문제 예방
- ✅ 코드 유지보수성 향상

---

## 🚀 배포 가이드

### 1. 파일 업로드
```bash
# 수정된 파일 업로드
dquant/signup.html
```

### 2. 브라우저 캐시 삭제
사용자에게 브라우저 캐시 삭제 안내:
- Chrome: `Ctrl+Shift+Delete` → 캐시된 이미지 및 파일 삭제
- 또는 시크릿 모드에서 테스트

### 3. 테스트
1. 회원가입 페이지 접속
2. 이메일 중복 확인 기능 테스트
3. 회원가입 완료 테스트

---

## 📋 관련 문서

- RESTful Table API 문서: `README.md` (API Endpoints 섹션)
- 회원가입 페이지 구현: `dquant/signup.html`
- 회원 데이터 스키마: `members_v2` 테이블

---

## 🎉 최종 결론

**문제 원인**: 상대 경로 사용으로 인한 잘못된 API 엔드포인트 호출

**해결 방법**: 절대 경로(`/tables/members_v2`)로 변경

**수정 파일**: `dquant/signup.html` (2개 라인 수정)

**상태**: ✅ 수정 완료, 테스트 대기 중

---

**수정 완료일**: 2026-03-08  
**다음 단계**: 사용자 실제 테스트 및 검증
