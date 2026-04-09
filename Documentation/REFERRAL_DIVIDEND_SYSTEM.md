# 투자유치배당 시스템 구현 문서

## 📋 개요
회원이 타인을 유치하여 투자가 발생했을 때의 배당금을 관리하는 시스템입니다.  
관리자는 투자유치배당 현황을 조회할 수 있으며, 회원은 마이페이지에서 자신의 유치배당 현황을 확인할 수 있습니다.

---

## 🎯 구현 범위

### ✅ 완료된 기능
1. **관리자 대시보드 탭 시스템**
   - 기본 투자현황 탭
   - 투자유치배당현황 탭
   - 탭 전환 기능

2. **투자유치배당 리스트 페이지**
   - 회원명 (추천인)
   - 기본투자금액, 기본배당률, 기본누적배당금
   - 유치투자금액, 유치배당률, 유치누적배당금
   - 누적차월수, 다음배당일, 투자자 레벨

3. **마이페이지 투자유치배당 섹션**
   - 유치 투자금액
   - 유치 배당률
   - 유치 월 배당금
   - 유치 누적 배당금
   - 총 배당금 합계 (기본 + 유치)

4. **데이터 스키마**
   - `referral_investments` 테이블 생성
   - 회원별 유치 투자 정보 저장

---

## 📊 데이터 구조

### referral_investments 테이블
```javascript
{
  id: "고유 ID",
  member_id: "회원 ID (members_v2 테이블 참조)",
  member_name: "회원명",
  referral_investment_amount: "유치 투자금액",
  referral_dividend_rate: "유치 배당률 (%)",
  referral_cumulative_dividend: "유치 누적배당금",
  referred_member_name: "유치한 회원명",
  referred_member_id: "유치한 회원 ID",
  registration_date: "유치 등록일",
  notes: "비고"
}
```

---

## 🎨 UI 구조

### 관리자 대시보드 - 투자유치배당현황 탭
**위치**: `dquant/admin-dashboard.html` - 회원 현황 관리 섹션

**테이블 컬럼**:
- 회원명 (추천인)
- 기본투자금액
- 기본배당률
- 기본누적배당금
- 유치투자금액
- 유치배당률
- 유치누적배당금
- 누적차월수
- 다음배당일
- 투자자 레벨

**스타일**:
```css
.tab-button {
    padding: 0.7rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
}

.tab-button.active {
    background: rgba(0, 242, 255, 0.15);
    border-color: var(--cyan-glow);
    color: var(--cyan-glow);
}
```

### 마이페이지 - 투자유치배당 현황
**위치**: `dquant/my-assets.html` - 투자 정보 카드 다음

**정보 항목**:
- 유치 투자금액
- 유치 배당률
- 유치 월 배당금
- 유치 누적 배당금
- 총 배당금 합계 (기본 + 유치)

**스타일 특징**:
- 보라색 테마 (`#a855f7`)
- 반투명 배경 (`rgba(168, 85, 247, 0.05)`)
- 하이라이트 강조

---

## 🔧 핵심 기능

### 1. 탭 전환 로직
**파일**: `dquant/admin-dashboard.js`

```javascript
// 탭 버튼 클릭 이벤트
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // 탭 활성화
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // 컨텐츠 표시
        tabContents.forEach(content => content.classList.remove('active'));
        
        if (tabName === 'basic') {
            document.getElementById('basicInvestmentTab').classList.add('active');
        } else if (tabName === 'referral') {
            document.getElementById('referralInvestmentTab').classList.add('active');
            renderReferralInvestments(); // 데이터 로드
        }
    });
});
```

### 2. 투자유치배당 데이터 렌더링
**파일**: `dquant/admin-dashboard.js`

```javascript
function renderReferralInvestments() {
    const referralData = allMembers.map(member => {
        // 기본 투자 정보
        const baseInvestment = member.investmentAmount || 0;
        const baseDividendRate = member.dividendRate || 0;
        const baseCumulativeDividend = member.cumulativeDividend || 0;
        
        // 유치 투자 정보
        const referralInvestment = member.referralInvestment || 0;
        const referralDividendRate = member.referralDividendRate || 0;
        const referralCumulativeDividend = member.referralCumulativeDividend || 0;
        
        // 누적차월수 계산
        const cumulativeMonths = calculateCumulativeMonths(member.registrationDate);
        
        // 다음 배당일 계산
        const nextDividendInfo = calculateNextDividend(member.registrationDate);
        
        return { /* ... */ };
    });
    
    // 테이블 HTML 생성
    tableBody.innerHTML = referralData.map(data => `...`).join('');
}
```

### 3. 누적차월수 계산
**파일**: `dquant/admin-dashboard.js`

```javascript
function calculateCumulativeMonths(registrationDate) {
    if (!registrationDate) return 0;
    
    const startDate = new Date(registrationDate);
    const today = new Date();
    
    const monthsDiff = (today.getFullYear() - startDate.getFullYear()) * 12 +
                       (today.getMonth() - startDate.getMonth());
    
    return Math.max(0, monthsDiff);
}
```

---

## 📱 사용 방법

### 관리자
1. **관리자 로그인**
   ```
   URL: dquant/admin-dashboard.html
   계정: valuencores@gmail.com / @vnc1201
   ```

2. **투자유치배당현황 조회**
   - 회원 현황 관리 섹션으로 이동
   - [투자유치배당현황] 탭 클릭
   - 회원별 유치배당 정보 확인

3. **데이터 입력/수정**
   - 현재는 수동으로 `referral_investments` 테이블에 데이터 추가
   - 향후 관리자 UI를 통한 입력 기능 추가 예정

### 회원
1. **마이페이지 접속**
   ```
   URL: dquant/my-assets.html
   로그인: 회원 계정
   ```

2. **투자유치배당 확인**
   - "나의 자산" 메뉴 선택
   - 투자 정보 카드 하단에 "투자유치배당 현황" 섹션 표시
   - 유치 투자금액, 배당률, 누적배당금 확인

---

## 🔄 데이터 흐름

### 1. 유치 투자 발생
```
신규 회원 가입 (추천인 입력)
    ↓
관리자가 유치 투자 정보 입력
    ↓
referral_investments 테이블 저장
    ↓
대시보드/마이페이지 반영
```

### 2. 배당금 계산
```
유치 투자금액 × 유치 배당률 = 유치 월 배당금
유치 월 배당금 × 누적차월수 = 유치 누적배당금
기본 누적배당금 + 유치 누적배당금 = 총 누적배당금
```

---

## 🎯 향후 개선 사항

### 1. 구글 스프레드시트 연동
- [ ] 스프레드시트 데이터 구조 분석
- [ ] API 연동 또는 CSV 임포트 기능
- [ ] 자동 데이터 동기화

### 2. 관리자 UI 개선
- [ ] 유치 투자 정보 입력 폼 추가
- [ ] 유치 회원 검색/필터 기능
- [ ] 유치 배당 통계 대시보드

### 3. 자동화 기능
- [ ] 월별 배당금 자동 계산
- [ ] 배당 지급일 알림
- [ ] 유치 실적 리포트 생성

### 4. 마이페이지 기능
- [ ] 유치한 회원 목록 표시
- [ ] 유치 배당 상세 내역
- [ ] 유치 실적 그래프

---

## 📝 테스트 시나리오

### ✅ 관리자 대시보드 테스트
1. **탭 전환**
   - [x] 기본 투자현황 탭 클릭 → 기본 테이블 표시
   - [x] 투자유치배당현황 탭 클릭 → 유치 테이블 표시
   - [x] 탭 활성화 스타일 적용 확인

2. **데이터 표시**
   - [x] 회원명 + 추천인 표시
   - [x] 기본 투자 정보 표시
   - [x] 유치 투자 정보 표시 (있을 경우)
   - [x] 누적차월수 계산 정확성
   - [x] 다음배당일 계산 정확성

### ✅ 마이페이지 테스트
1. **투자유치배당 섹션**
   - [x] 유치 투자가 있는 경우 섹션 표시
   - [x] 유치 투자가 없는 경우 섹션 숨김
   - [x] 유치 정보 정확하게 표시
   - [x] 총 배당금 합계 계산 정확성

2. **스타일**
   - [x] 보라색 테마 적용
   - [x] 반응형 레이아웃
   - [x] 금액 포맷팅

---

## 🐛 알려진 이슈

### 1. 임시 데이터 구조
**현상**: 현재는 members_v2 테이블에 유치 정보가 없음  
**해결 방법**: 
- referral_investments 테이블에 실제 데이터 입력 필요
- 또는 members_v2에 유치 정보 컬럼 추가

### 2. 구글 스프레드시트 미연동
**현상**: 스프레드시트 데이터 자동 불러오기 미구현  
**해결 방법**:
- 스프레드시트 이미지 확인 후 구조 파악
- Google Sheets API 연동 또는 CSV 업로드 기능 개발

---

## 📞 문의

**프로젝트**: D-QUANT 9.0  
**버전**: v6.2.0  
**업데이트**: 2026-03-08  
**연락처**: valuencores@gmail.com / 02-356-6771

---

## 📄 관련 파일

### HTML
- `dquant/admin-dashboard.html` - 관리자 대시보드
- `dquant/my-assets.html` - 마이페이지

### JavaScript
- `dquant/admin-dashboard.js` - 관리자 로직

### 데이터
- `referral_investments` 테이블 - 유치 투자 정보

---

## 🔗 관련 문서
- [배당 시스템 구현 문서](DIVIDEND_SYSTEM_IMPLEMENTATION_COMPLETE.md)
- [회원 등록 시스템](ADMIN_ACCESS_IMPLEMENTATION.md)
- [추천인 시스템 구현](README.md#v611)
