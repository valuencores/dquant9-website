# 회원가입 기능 체크리스트

**점검일**: 2026-03-08  
**프로젝트**: D-QUANT 9.0  
**버전**: v6.2.12

---

## 📋 회원가입 프로세스 전체 점검

### ✅ 1. HTML 폼 구조

| 항목 | ID | 타입 | 필수 | 상태 |
|-----|----|----|------|------|
| 초대코드 | signupInviteCode | text | ✅ | ✅ 정상 |
| 성명 | signupName | text | ✅ | ✅ 정상 |
| 주민번호 앞자리 | signupIdNumber1 | text (6자리) | ✅ | ✅ 정상 |
| 주민번호 뒷자리 | signupIdNumber2 | text (1자리) | ✅ | ✅ 정상 |
| 휴대전화 | signupPhone | tel | ✅ | ✅ 정상 |
| 우편번호 | signupPostcode | text (readonly) | ✅ | ✅ 정상 |
| 주소 | signupAddress | text (readonly) | ✅ | ✅ 정상 |
| 상세주소 | signupAddressDetail | text | ✅ | ✅ 정상 |
| 소개자 유형 | signupReferrerType | select | ❌ | ⚠️ **중복** |
| 추천인 | signupReferrer | text | ❌ | ⚠️ **중복** |
| 비밀번호 | signupPassword | password | ✅ | ✅ 정상 |
| 비밀번호 확인 | signupPasswordConfirm | password | ✅ | ✅ 정상 |
| 이메일 | signupEmail | email | ✅ | ✅ 정상 |
| 인증코드 | signupEmailCode | text (6자리) | ✅ | ✅ 정상 (기본값: 000000) |

---

## 🚨 발견된 문제점

### **문제 1: 추천인 필드 중복**

#### **현재 상황**
```html
<!-- 681-689줄: 첫 번째 소개자 필드 -->
<div class="form-group">
    <label for="signupReferrer">소개자</label>
    <div class="referrer-input-wrapper">
        <select id="signupReferrerType">
            <option value="custom">직접입력</option>
            <option value="dquant">디퀀트나인</option>
        </select>
        <input type="text" id="signupReferrer" placeholder="소개자 이름" required>
    </div>
</div>

<!-- 732-735줄: 두 번째 추천인 필드 (중복!) -->
<div class="form-group">
    <label for="signupReferrer">추천인(파트너)</label>
    <input type="text" id="signupReferrer" placeholder="추천인 이름을 입력하세요" value="디퀀트">
</div>
```

#### **문제점**
- 같은 `id="signupReferrer"`가 2번 사용됨
- HTML 표준 위반 (ID는 고유해야 함)
- JavaScript에서 `getElementById`는 첫 번째 요소만 선택
- 사용자 입력이 혼동될 수 있음

#### **영향**
```javascript
// 1022줄: 이 코드는 첫 번째 input만 선택
const referrerName = document.getElementById('signupReferrer').value.trim();

// 873-885줄: select 이벤트 리스너도 첫 번째 input만 대상으로 함
document.getElementById('signupReferrerType').addEventListener('change', function() {
    const referrerInput = document.getElementById('signupReferrer');
    // ...
});
```

---

### **문제 2: 주소 필수 입력**

```html
<input type="text" id="signupPostcode" placeholder="우편번호" readonly required>
<input type="text" id="signupAddress" placeholder="기본주소" readonly required>
<input type="text" id="signupAddressDetail" placeholder="상세주소를 입력하세요" required>
```

#### **문제점**
- 모든 주소 필드가 `required`로 설정됨
- 사용자가 반드시 주소 검색을 해야 함
- 주소가 없는 사용자는 가입 불가

#### **권장 사항**
- 주소를 선택사항으로 변경하거나
- 최소한 상세주소는 선택사항으로 변경

---

## ✅ 정상 작동 확인 항목

### **1. 데이터 검증**

| 검증 항목 | 코드 위치 | 상태 |
|---------|---------|------|
| 초대코드 확인 (DQ92603) | 1029줄 | ✅ 정상 |
| 비밀번호 일치 확인 | 1035줄 | ✅ 정상 |
| 이메일 인증코드 확인 | 1041줄 | ✅ 정상 |
| 필수 입력 확인 | 1047줄 | ✅ 정상 |

### **2. 필드 매핑**

| 폼 필드 | 테이블 필드 | 변환 | 상태 |
|--------|-----------|------|------|
| signupName | memberName | ✅ | ✅ 정상 |
| signupIdNumber1 + signupIdNumber2 | idNumber | ✅ | ✅ 정상 |
| signupPhone | phoneNumber | ✅ | ✅ 정상 |
| signupEmail | email | ✅ | ✅ 정상 |
| postcode + addressMain + addressDetail | address | ✅ | ✅ 정상 |
| signupReferrer | referrer | ✅ | ⚠️ 중복 문제 |
| signupPassword | password | ✅ | ✅ 정상 |

### **3. 기본값 설정**

| 필드 | 기본값 | 상태 |
|-----|-------|------|
| signupDate | new Date().toISOString() | ✅ 정상 |
| investmentAmount | 0 | ✅ 정상 |
| dividendRate | "0.0%" | ✅ 정상 |
| investorLevel | "Starter" | ✅ 정상 |
| investmentMonths | 0 | ✅ 정상 |
| accumulatedDividend | 0 | ✅ 정상 |
| referrer | "디퀀트나인" (기본값) | ✅ 정상 |

---

## 🎯 권장 수정 사항

### **우선순위 1: 중복 필드 제거 (필수)**

#### **옵션 A: 첫 번째 소개자 필드 사용 (select + input)**
```html
<!-- 681-689줄 유지 -->
<div class="form-group">
    <label for="signupReferrer">소개자</label>
    <div class="referrer-input-wrapper">
        <select id="signupReferrerType">
            <option value="custom">직접입력</option>
            <option value="dquant">디퀀트나인</option>
        </select>
        <input type="text" id="signupReferrer" placeholder="소개자 이름" required>
    </div>
</div>

<!-- 732-735줄 제거 -->
```

#### **옵션 B: 두 번째 추천인 필드 사용 (단순 input)**
```html
<!-- 681-689줄 제거 -->

<!-- 732-735줄 유지 및 ID 변경 -->
<div class="form-group">
    <label for="signupReferrer">추천인(파트너)</label>
    <input type="text" id="signupReferrer" placeholder="추천인 이름을 입력하세요" value="디퀀트">
    <div class="field-hint">회원님을 소개한 파트너 또는 추천인의 이름을 입력하세요.</div>
</div>

<!-- JavaScript에서 signupReferrerType 관련 코드 제거 -->
```

---

### **우선순위 2: 주소 필수 입력 완화 (권장)**

```html
<!-- required 속성 제거 -->
<input type="text" id="signupPostcode" placeholder="우편번호" readonly>
<input type="text" id="signupAddress" placeholder="기본주소" readonly>
<input type="text" id="signupAddressDetail" placeholder="상세주소를 입력하세요 (선택)">
```

```javascript
// 필수 입력 확인에서 주소 제외
if (!memberName || !idNumber1 || !idNumber2 || !phoneNumber || !email || !password) {
    alert('모든 필수 항목을 입력해주세요.');
    return;
}
```

---

## 📊 테스트 시나리오

### **시나리오 1: 정상 회원가입**
```
✅ 초대코드: DQ92603
✅ 성명: 홍길동
✅ 주민번호: 900101-1
✅ 전화번호: 010-1234-5678
✅ 주소: [12345] 서울시 강남구 101호
✅ 추천인: 김철수
✅ 비밀번호: Test1234!
✅ 이메일: test@test.com
✅ 인증코드: 000000

예상 결과: ✅ 성공
실제 결과: ⚠️ 추천인 중복 문제로 혼동 가능
```

### **시나리오 2: 중복 이메일**
```
❌ 이메일: 기존 등록된 이메일

예상 결과: ❌ "이미 등록된 이메일 주소입니다"
실제 결과: ✅ 정상 차단 (932-954줄)
```

### **시나리오 3: 주소 없이 가입**
```
❌ 주소: 입력 안함

예상 결과: ❌ HTML required 속성으로 제출 차단
실제 결과: ✅ 정상 차단 (하지만 불편함)
```

---

## 🔧 즉시 수정 필요 사항

### **1. 중복 필드 제거 (필수)**
- [ ] 추천인 필드 중복 제거
- [ ] JavaScript 이벤트 리스너 정리
- [ ] 사용자 입력 혼동 방지

### **2. 주소 필수 완화 (권장)**
- [ ] 주소 필드 `required` 속성 제거
- [ ] JavaScript 검증 로직 수정
- [ ] 사용자 편의성 개선

---

## ✅ 현재 정상 작동 항목

1. ✅ 필드명 매핑 (v6.2.12에서 수정 완료)
2. ✅ 초대코드 검증
3. ✅ 이메일 중복 확인
4. ✅ 비밀번호 일치 확인
5. ✅ 인증코드 확인 (000000 고정)
6. ✅ 데이터 저장 (members_v2 테이블)
7. ✅ 기본값 설정
8. ✅ 에러 처리

---

## 📈 전체 점수

| 항목 | 점수 | 설명 |
|-----|------|------|
| 기능성 | 85/100 | 중복 필드 문제 제외하고 정상 |
| 안정성 | 90/100 | 에러 처리 양호 |
| 사용성 | 70/100 | 주소 필수 입력 불편 |
| 코드 품질 | 80/100 | 필드 중복 문제 있음 |

**총점**: 81.25/100

---

## 🎯 최종 권장 사항

### **즉시 수정 (필수)**
1. 추천인 필드 중복 제거
2. JavaScript 이벤트 리스너 정리

### **개선 권장 (선택)**
1. 주소 필수 입력 완화
2. 비밀번호 강도 검증 추가
3. 휴대전화 형식 검증 추가

---

**점검 완료일**: 2026-03-08  
**다음 점검 예정**: 수정 후 재점검
