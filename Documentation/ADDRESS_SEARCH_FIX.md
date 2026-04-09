# 주소 검색 기능 수정 보고서

**작성일**: 2026-03-08  
**버전**: v6.2.23  
**우선순위**: 🟡 MEDIUM

---

## 📋 문제 상황

### 증상
회원가입 페이지에서 "주소 검색" 버튼을 클릭해도 Daum 우편번호 검색 창이 나타나지 않음.

### 원인
1. **프로토콜 상대 경로 문제**: `//t1.daumcdn.net/...` 형식이 일부 환경에서 로드 실패
2. **오류 처리 부재**: API 로드 실패 시 사용자에게 안내 없음
3. **대체 방법 없음**: 검색이 실패해도 직접 입력할 방법이 없음

---

## ✅ 해결 방법

### 1. HTTPS 프로토콜 명시

#### Before
```html
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
```

#### After
```html
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
```

**변경 이유**: 프로토콜 상대 경로(`//`)보다 명시적인 HTTPS가 안정적

---

### 2. API 로드 확인 및 오류 처리

#### 페이지 로드 시 자동 확인
```javascript
window.addEventListener('load', function() {
    console.log('🔍 페이지 로드 완료');
    console.log('🔍 Daum Postcode API 상태:', 
        typeof daum !== 'undefined' && typeof daum.Postcode !== 'undefined' 
        ? '✅ 로드됨' 
        : '❌ 로드 실패'
    );
    
    if (typeof daum === 'undefined' || typeof daum.Postcode === 'undefined') {
        console.warn('⚠️ Daum Postcode API가 로드되지 않았습니다.');
        // 직접 입력 모드로 전환
        document.getElementById('signupPostcode').removeAttribute('readonly');
        document.getElementById('signupAddress').removeAttribute('readonly');
        document.getElementById('signupPostcode').placeholder = '우편번호 직접 입력 (선택)';
        document.getElementById('signupAddress').placeholder = '주소 직접 입력 (선택)';
    }
});
```

---

### 3. 주소 검색 버튼에 대체 로직 추가

#### 강화된 주소 검색 함수
```javascript
document.getElementById('btnSearchAddress').addEventListener('click', function() {
    console.log('🏠 주소 검색 버튼 클릭됨');
    
    // 1단계: API 로드 확인
    if (typeof daum === 'undefined' || typeof daum.Postcode === 'undefined') {
        console.error('❌ Daum Postcode API가 로드되지 않았습니다.');
        alert('주소 검색 기능을 사용할 수 없습니다.\n\n직접 우편번호와 주소를 입력해주세요.\n\n예시:\n우편번호: 03080\n주소: 서울특별시 종로구 청와대로 1');
        
        // 입력 필드 활성화
        document.getElementById('signupPostcode').removeAttribute('readonly');
        document.getElementById('signupAddress').removeAttribute('readonly');
        return;
    }
    
    // 2단계: Postcode 실행
    try {
        new daum.Postcode({
            oncomplete: function(data) {
                console.log('✅ 주소 선택 완료:', data);
                document.getElementById('signupPostcode').value = data.zonecode;
                document.getElementById('signupAddress').value = data.address;
                document.getElementById('signupAddressDetail').focus();
            },
            onclose: function() {
                console.log('📭 주소 검색 창 닫힘');
            }
        }).open();
    } catch (error) {
        console.error('❌ 주소 검색 오류:', error);
        alert('주소 검색 중 오류가 발생했습니다.\n직접 입력해주세요.');
        document.getElementById('signupPostcode').removeAttribute('readonly');
        document.getElementById('signupAddress').removeAttribute('readonly');
    }
});
```

---

## 📝 수정된 파일

### `dquant/signup.html`

**수정 내역**:
1. **라인 1570**: 스크립트 URL을 `https://`로 변경
2. **라인 1572-1592**: 페이지 로드 시 API 확인 로직 추가
3. **라인 1611-1645**: 주소 검색 버튼에 오류 처리 추가

---

## 🔄 동작 흐름

### Case 1: API 정상 로드 ✅

```
페이지 로드
    ↓
Daum API 로드 확인
    ↓
콘솔: "✅ 로드됨"
    ↓
사용자가 "주소 검색" 클릭
    ↓
Daum 우편번호 창 열림
    ↓
주소 선택
    ↓
자동 입력 완료
```

### Case 2: API 로드 실패 ❌

```
페이지 로드
    ↓
Daum API 로드 실패
    ↓
콘솔: "❌ 로드 실패"
    ↓
입력 필드 자동 활성화 (readonly 제거)
    ↓
placeholder: "우편번호 직접 입력"
    ↓
사용자가 "주소 검색" 클릭
    ↓
Alert: "직접 입력해주세요"
    ↓
사용자가 직접 입력
```

---

## 🧪 테스트 방법

### 1. 정상 작동 테스트

```
1. dquant/signup.html 페이지를 완전히 새로고침 (Ctrl + Shift + R)
2. F12 콘솔 확인:
   🔍 페이지 로드 완료
   🔍 Daum Postcode API 상태: ✅ 로드됨
3. "주소 검색" 버튼 클릭
4. ✅ Daum 우편번호 검색 창이 팝업으로 나타남
5. 주소 검색 및 선택
6. ✅ 우편번호와 주소 자동 입력됨
```

### 2. API 로드 실패 시나리오 테스트

네트워크를 차단하고 테스트:
```
1. F12 → Network 탭 → Throttling: Offline
2. 페이지 새로고침
3. 콘솔 확인:
   ⚠️ Daum Postcode API가 로드되지 않았습니다.
4. "주소 검색" 버튼 클릭
5. ✅ Alert 메시지: "직접 입력해주세요"
6. ✅ 입력 필드가 활성화되어 직접 입력 가능
```

### 3. 직접 입력 테스트

```
1. 우편번호 필드에 "03080" 입력
2. 주소 필드에 "서울특별시 종로구 청와대로 1" 입력
3. 상세주소 필드에 "101호" 입력
4. ✅ 회원가입 진행 가능
```

---

## 📊 콘솔 로그 가이드

### 정상 작동 시
```
🔍 페이지 로드 완료
🔍 Daum Postcode API 상태: ✅ 로드됨
🏠 주소 검색 버튼 클릭됨
✅ 주소 선택 완료: {zonecode: "03080", address: "서울특별시 종로구 청와대로 1", ...}
```

### API 로드 실패 시
```
🔍 페이지 로드 완료
🔍 Daum Postcode API 상태: ❌ 로드 실패
⚠️ Daum Postcode API가 로드되지 않았습니다. 직접 입력 모드로 전환합니다.
🏠 주소 검색 버튼 클릭됨
❌ Daum Postcode API가 로드되지 않았습니다.
```

---

## 💡 사용자 안내 메시지

### Alert 메시지 (API 로드 실패 시)
```
주소 검색 기능을 사용할 수 없습니다.

직접 우편번호와 주소를 입력해주세요.

예시:
우편번호: 03080
주소: 서울특별시 종로구 청와대로 1
```

---

## 🔧 추가 개선사항

### 향후 고려사항

1. **로딩 인디케이터**
   - API 로드 중 표시
   - 사용자에게 대기 시간 안내

2. **자동 완성 기능**
   - 주소 입력 시 자동 완성 제안
   - Daum API 대신 다른 주소 API 사용

3. **유효성 검증**
   - 우편번호 형식 검증 (5자리 숫자)
   - 주소 최소 길이 검증

4. **백업 API**
   - Daum API 실패 시 다른 주소 검색 API 사용
   - 예: 카카오 주소 API, 공공데이터 주소 API

---

## ✅ 체크리스트

- [x] HTTPS 프로토콜로 변경
- [x] API 로드 확인 로직 추가
- [x] 오류 처리 및 사용자 안내 추가
- [x] 직접 입력 대체 방법 제공
- [x] 콘솔 로그 추가
- [x] readonly 속성 동적 제거
- [x] placeholder 텍스트 업데이트
- [x] 문서화 완료

---

## 🎯 기대 효과

### Before (수정 전)
- ❌ API 로드 실패 시 버튼 클릭해도 반응 없음
- ❌ 사용자가 문제를 인지하지 못함
- ❌ 직접 입력 불가능 (readonly)
- ❌ 오류 메시지 없음

### After (수정 후)
- ✅ API 로드 상태 자동 확인
- ✅ 실패 시 명확한 안내 메시지
- ✅ 직접 입력 가능 (readonly 제거)
- ✅ 상세한 콘솔 로그
- ✅ 사용자 경험 개선

---

## 📞 문제 발생 시

### 여전히 주소 검색이 작동하지 않는다면

1. **브라우저 콘솔 확인** (F12)
   - Daum API 로드 상태 확인
   - 오류 메시지 확인

2. **네트워크 탭 확인**
   - Daum CDN 요청 성공 여부
   - 응답 상태 코드 확인

3. **직접 입력 사용**
   - 우편번호: 5자리 숫자 (예: 03080)
   - 주소: 전체 주소 입력
   - 상세주소: 동/호수 입력

4. **대체 방법**
   - 네이버 주소 검색: https://new.land.naver.com/address
   - 카카오 지도: https://map.kakao.com/
   - 주소를 복사하여 직접 입력

---

**✅ 수정 완료: 이제 주소 검색이 정상 작동하며, API 로드 실패 시에도 직접 입력이 가능합니다.**
