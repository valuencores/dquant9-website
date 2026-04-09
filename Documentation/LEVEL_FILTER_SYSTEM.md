# 레벨별 회원 필터링 시스템 구현

## 📋 개요
관리자 대시보드의 "레벨별 회원 분류" 섹션에서 레벨 카드를 클릭하면 해당 레벨 회원만 필터링하여 표시하는 기능입니다.

---

## 🎯 구현 기능

### ✅ 완료된 기능

1. **'명' 텍스트 제거**
   - 기존: "6명"
   - 변경: "6"
   - 숫자만 깔끔하게 표시

2. **점유 비율 표시**
   - 전체 회원 중 해당 레벨의 비율 표시
   - 예: "33.3%" (12명 중 4명)
   - 소수점 첫째 자리까지 표시

3. **클릭 필터링 기능**
   - 레벨 카드 클릭 → 해당 레벨 회원만 표시
   - 같은 카드 재클릭 → 필터 해제 (전체 회원 표시)
   - 자동으로 테이블로 스크롤 이동

4. **시각적 피드백**
   - 호버 시: 카드 상승 + 그라데이션 효과
   - 클릭 시: 토스트 메시지 표시
   - 필터 활성화: "Bronze 레벨 회원만 표시합니다."
   - 필터 해제: "필터가 해제되었습니다."

---

## 🎨 UI 개선

### 레벨 카드 디자인
**변경 전:**
```html
<div class="level-stat-card">
    <div class="level-stat-level">
        <span class="level-badge level-Bronze">Bronze</span>
    </div>
    <div class="level-stat-count">6명</div>
    <div class="level-stat-percent">33.3%</div>
</div>
```

**변경 후:**
```html
<div class="level-stat-card" onclick="filterByLevel('Bronze')" style="cursor: pointer;">
    <div class="level-stat-level">
        <span class="level-badge level-Bronze">Bronze</span>
    </div>
    <div class="level-stat-count">6</div>
    <div class="level-stat-percent">33.3%</div>
</div>
```

### CSS 효과
```css
.level-stat-card {
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.level-stat-card::before {
    content: '';
    position: absolute;
    background: linear-gradient(135deg, rgba(0, 242, 255, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.level-stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 242, 255, 0.2);
    border-color: rgba(0, 242, 255, 0.5);
}

.level-stat-card:hover::before {
    opacity: 1;
}

.level-stat-card:active {
    transform: translateY(-1px);
}
```

---

## 🔧 핵심 로직

### 필터링 함수
**파일**: `dquant/admin-dashboard.js`

```javascript
let currentLevelFilter = null;

function filterByLevel(level) {
    // 같은 레벨을 다시 클릭하면 필터 해제
    if (currentLevelFilter === level) {
        currentLevelFilter = null;
        filteredMembers = [...allMembers];
        showToast('필터가 해제되었습니다.', 'info');
    } else {
        currentLevelFilter = level;
        filteredMembers = allMembers.filter(member => {
            const memberLevel = member.investorLevel || member.investor_level || '';
            return memberLevel === level;
        });
        showToast(`${level} 레벨 회원만 표시합니다.`, 'success');
    }
    
    // 검색창 초기화
    document.getElementById('searchInput').value = '';
    
    currentPage = 1;
    renderMembersTable();
    
    // 테이블로 스크롤
    document.querySelector('.members-table-container').scrollIntoView({ behavior: 'smooth' });
}

// 전역으로 함수 노출
window.filterByLevel = filterByLevel;
```

### 레벨 카드 HTML 생성
**파일**: `dquant/admin-dashboard.js`

```javascript
function updateLevelStatistics() {
    const levelCounts = {};
    
    // 레벨별 회원 수 계산
    allMembers.forEach(member => {
        const level = member.investorLevel || member.investor_level || 'Unknown';
        levelCounts[level] = (levelCounts[level] || 0) + 1;
    });
    
    // 정렬 (회원 수 많은 순)
    const sortedLevels = Object.entries(levelCounts).sort((a, b) => b[1] - a[1]);
    
    // HTML 생성
    const levelStatsGrid = document.getElementById('levelStatsGrid');
    levelStatsGrid.innerHTML = sortedLevels.map(([level, count]) => {
        const percentage = ((count / allMembers.length) * 100).toFixed(1);
        return `
            <div class="level-stat-card" onclick="filterByLevel('${level}')" style="cursor: pointer;">
                <div class="level-stat-level">
                    <span class="level-badge level-${level}">${level}</span>
                </div>
                <div class="level-stat-count">${count}</div>
                <div class="level-stat-percent">${percentage}%</div>
            </div>
        `;
    }).join('');
}
```

---

## 📱 사용 방법

### 1. 레벨 필터링
```
관리자 대시보드 접속
    ↓
레벨별 회원 분류 섹션 확인
    ↓
원하는 레벨 카드 클릭
    ↓
해당 레벨 회원만 테이블에 표시
    ↓
같은 카드 재클릭 → 필터 해제
```

### 2. 점유 비율 확인
```
Bronze: 6 (50.0%)  ← 전체 12명 중 6명
Gold: 2 (16.7%)    ← 전체 12명 중 2명
Silver: 2 (16.7%)
Starter: 2 (16.7%)
```

### 3. 검색과의 상호작용
- 레벨 필터 활성화 시 → 검색창 자동 초기화
- 검색 입력 시 → 레벨 필터 유지 (레벨 내에서 검색)

---

## 🎯 동작 시나리오

### 시나리오 1: 단일 레벨 필터링
```
초기 상태: 전체 12명 회원 표시
    ↓
[Bronze 카드 클릭]
    ↓
필터 적용: Bronze 레벨 6명만 표시
토스트: "Bronze 레벨 회원만 표시합니다."
스크롤: 테이블 상단으로 이동
```

### 시나리오 2: 필터 해제
```
Bronze 필터 활성화 상태 (6명 표시)
    ↓
[Bronze 카드 재클릭]
    ↓
필터 해제: 전체 12명 표시
토스트: "필터가 해제되었습니다."
```

### 시나리오 3: 다른 레벨로 전환
```
Bronze 필터 활성화 (6명 표시)
    ↓
[Gold 카드 클릭]
    ↓
필터 전환: Gold 레벨 2명만 표시
토스트: "Gold 레벨 회원만 표시합니다."
```

---

## 📊 데이터 흐름

### 필터링 프로세스
```
allMembers (전체 회원 데이터)
    ↓
filterByLevel(level) 호출
    ↓
filteredMembers = allMembers.filter(...)
    ↓
currentPage = 1 (첫 페이지로 이동)
    ↓
renderMembersTable() (테이블 재렌더링)
    ↓
renderPagination() (페이지네이션 업데이트)
```

### 점유 비율 계산
```
percentage = (레벨 회원 수 / 전체 회원 수) × 100
예: (6 / 12) × 100 = 50.0%
```

---

## 🎨 시각적 효과

### 1. 호버 효과
- **변환**: `translateY(-3px)` (카드 상승)
- **그림자**: `0 6px 20px rgba(0, 242, 255, 0.2)` (청록색 그림자)
- **테두리**: `rgba(0, 242, 255, 0.5)` (청록색 강조)
- **배경**: 그라데이션 오버레이 표시

### 2. 클릭 효과
- **변환**: `translateY(-1px)` (살짝 누름 효과)
- **토스트**: 메시지 표시 (3초간)
- **스크롤**: 부드러운 애니메이션으로 테이블 이동

### 3. 토스트 메시지
```javascript
showToast('Bronze 레벨 회원만 표시합니다.', 'success');
// 타입: success (초록색), info (파란색), error (빨간색)
```

---

## 🔄 상태 관리

### 전역 변수
```javascript
let currentLevelFilter = null;  // 현재 활성화된 레벨 필터
let allMembers = [];             // 전체 회원 데이터
let filteredMembers = [];        // 필터링된 회원 데이터
let currentPage = 1;             // 현재 페이지
```

### 상태 전환
```
초기: currentLevelFilter = null
    ↓ (Bronze 클릭)
필터 활성화: currentLevelFilter = 'Bronze'
    ↓ (Bronze 재클릭)
필터 해제: currentLevelFilter = null
    ↓ (Gold 클릭)
필터 전환: currentLevelFilter = 'Gold'
```

---

## 📝 테스트 체크리스트

### ✅ 기능 테스트
- [x] 레벨 카드 클릭 시 필터 적용
- [x] 필터링된 회원만 테이블에 표시
- [x] 같은 카드 재클릭 시 필터 해제
- [x] 다른 레벨 클릭 시 필터 전환
- [x] 토스트 메시지 정상 표시
- [x] 테이블 스크롤 이동
- [x] 검색창 초기화
- [x] 페이지네이션 리셋

### ✅ UI 테스트
- [x] '명' 텍스트 제거 (숫자만 표시)
- [x] 점유 비율 표시 (소수점 1자리)
- [x] 호버 시 카드 상승 효과
- [x] 호버 시 그라데이션 오버레이
- [x] 클릭 시 눌림 효과
- [x] z-index 정상 작동 (텍스트 앞쪽)

### ✅ 데이터 테스트
- [x] 전체 회원 수 정확
- [x] 레벨별 회원 수 정확
- [x] 점유 비율 계산 정확
- [x] 필터링 결과 정확

---

## 🐛 알려진 이슈

### 없음
현재 알려진 이슈가 없습니다. 모든 기능이 정상 작동합니다.

---

## 🎯 향후 개선 사항

### 1. 다중 필터
- [ ] 여러 레벨 동시 선택 기능
- [ ] Shift + 클릭으로 범위 선택

### 2. 시각적 개선
- [ ] 필터 활성화 시 카드 강조 표시
- [ ] 필터 해제 버튼 추가
- [ ] 필터 상태 표시 (예: "Bronze 필터 활성화 중")

### 3. 사용성 개선
- [ ] 키보드 단축키 지원
- [ ] 필터 히스토리 저장
- [ ] 필터 프리셋 (즐겨찾기)

---

## 📞 문의

**프로젝트**: D-QUANT 9.0  
**버전**: v6.2.1  
**업데이트**: 2026-03-08  
**연락처**: valuencores@gmail.com / 02-356-6771

---

## 📄 수정된 파일

### HTML
- `dquant/admin-dashboard.html` (+35 lines)
  - 레벨 카드 CSS 효과 추가
  - z-index 레이어링

### JavaScript
- `dquant/admin-dashboard.js` (+35 lines)
  - `filterByLevel()` 함수 추가
  - `currentLevelFilter` 상태 관리
  - 레벨 카드 onclick 이벤트 추가
  - '명' 텍스트 제거

### 문서
- `Documentation/LEVEL_FILTER_SYSTEM.md` (신규 생성)

---

## 🔗 관련 문서
- [투자유치배당 시스템](REFERRAL_DIVIDEND_SYSTEM.md)
- [배당 시스템](DIVIDEND_SYSTEM_IMPLEMENTATION_COMPLETE.md)
- [회원 관리 시스템](ADMIN_ACCESS_IMPLEMENTATION.md)
