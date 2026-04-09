# EmailJS 설정 가이드

## 📧 이메일 전송 기능 구축

D-QUANT 9.0 투자 상담 페이지에서 이메일 자동 전송 기능을 사용하려면 EmailJS 서비스를 설정해야 합니다.

---

## 🚀 1단계: EmailJS 계정 생성

1. **EmailJS 웹사이트 방문**
   - URL: https://www.emailjs.com/
   - "Sign Up" 클릭

2. **무료 계정 생성**
   - 이메일 주소 입력
   - 비밀번호 설정
   - 계정 활성화 (이메일 확인)

3. **무료 플랜 제한**
   - 월 200회 이메일 전송
   - 추가 전송 필요 시 유료 플랜 고려

---

## ⚙️ 2단계: 이메일 서비스 연동

### Gmail 연동 (권장)

1. **EmailJS 대시보드 접속**
   - "Email Services" 메뉴 클릭
   - "Add New Service" 버튼 클릭

2. **Gmail 선택**
   - Gmail 아이콘 클릭
   - "Connect Account" 클릭

3. **Google 계정 인증**
   - `valuencores@gmail.com` 계정으로 로그인
   - EmailJS 권한 승인

4. **Service ID 확인**
   - 생성된 Service ID 복사 (예: `service_abc1234`)
   - 나중에 사용할 예정

---

## 📝 3단계: 이메일 템플릿 생성

### 관리자용 템플릿

1. **템플릿 생성**
   - "Email Templates" 메뉴 클릭
   - "Create New Template" 버튼

2. **템플릿 설정**
   - Template Name: `admin_template`
   - Subject: `[D-QUANT 9.0] 새로운 투자 상담 신청`

3. **템플릿 내용**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0a0e27; color: #00f2ff; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #0a0e27; }
        .value { padding: 10px; background: white; border-left: 3px solid #00f2ff; margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💼 새로운 투자 상담 신청</h1>
        </div>
        <div class="content">
            <p>D-QUANT 9.0 웹사이트에서 새로운 투자 상담 신청이 접수되었습니다.</p>
            
            <div class="field">
                <div class="label">📅 신청 일시</div>
                <div class="value">{{submitted_date}}</div>
            </div>
            
            <div class="field">
                <div class="label">👤 신청자 성명</div>
                <div class="value">{{user_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 이메일 주소</div>
                <div class="value">{{user_email}}</div>
            </div>
            
            <div class="field">
                <div class="label">🎯 상담 목적</div>
                <div class="value">{{purpose}}</div>
            </div>
            
            <div class="field">
                <div class="label">💬 상담 문의 내용</div>
                <div class="value">{{content}}</div>
            </div>
            
            <p style="margin-top: 30px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107;">
                ⚠️ <strong>빠른 시일 내에 고객에게 답변해주세요.</strong>
            </p>
        </div>
        <div class="footer">
            <p>이 메일은 D-QUANT 9.0 웹사이트에서 자동 발송되었습니다.</p>
            <p>밸류앤코어스(주) | www.valuencores.com</p>
        </div>
    </div>
</body>
</html>
```

4. **템플릿 저장**
   - "Save" 버튼 클릭
   - Template ID 확인 (자동 생성됨)

---

### 신청자용 템플릿

1. **새 템플릿 생성**
   - "Create New Template" 다시 클릭

2. **템플릿 설정**
   - Template Name: `user_template`
   - Subject: `[D-QUANT 9.0] 투자 상담 신청이 접수되었습니다`

3. **템플릿 내용**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0a0e27, #0f1824); color: #00f2ff; padding: 30px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
        .success-icon { font-size: 48px; margin-bottom: 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #0a0e27; }
        .value { padding: 10px; background: white; border-left: 3px solid #00f2ff; margin-top: 5px; }
        .notice { background: #e8f4f8; padding: 20px; border-radius: 8px; margin-top: 30px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .btn { display: inline-block; padding: 12px 30px; background: #00f2ff; color: #0a0e27; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="success-icon">✅</div>
            <h1>투자 상담 신청 완료</h1>
            <p>D-QUANT 9.0</p>
        </div>
        <div class="content">
            <p><strong>{{user_name}}</strong>님, 안녕하세요.</p>
            <p>D-QUANT 9.0 투자 상담 신청이 정상적으로 접수되었습니다.</p>
            
            <div class="field">
                <div class="label">📅 신청 일시</div>
                <div class="value">{{submitted_date}}</div>
            </div>
            
            <div class="field">
                <div class="label">🎯 상담 목적</div>
                <div class="value">{{purpose}}</div>
            </div>
            
            <div class="field">
                <div class="label">💬 문의 내용</div>
                <div class="value">{{content}}</div>
            </div>
            
            <div class="notice">
                <h3 style="margin-top: 0; color: #0a0e27;">📞 다음 단계</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>담당자가 영업일 기준 1~2일 내에 연락드릴 예정입니다.</li>
                    <li>추가 문의사항이 있으시면 회신 메일로 문의해주세요.</li>
                    <li>상담 시간: 평일 오전 9시 ~ 오후 6시</li>
                </ul>
            </div>
            
            <div style="text-align: center;">
                <a href="https://your-domain.com" class="btn">홈페이지 바로가기</a>
            </div>
        </div>
        <div class="footer">
            <p><strong>밸류앤코어스(주)</strong></p>
            <p>서울특별시 종로구 효자로 15 다모여빌딩 2층</p>
            <p>전화: 02-356-6771 | 이메일: valuencores@gmail.com</p>
            <p style="margin-top: 15px; color: #999;">
                이 메일은 발신 전용입니다. 문의사항은 위 연락처로 문의해주세요.
            </p>
        </div>
    </div>
</body>
</html>
```

4. **템플릿 저장**

---

## 🔑 4단계: Public Key 확인

1. **Account 메뉴 접속**
   - 우측 상단 계정 아이콘 클릭
   - "Account" 선택

2. **Public Key 복사**
   - "API Keys" 섹션에서 Public Key 확인
   - 복사 (예: `user_abc123xyz`)

---

## 💻 5단계: 코드에 키 입력

### consultation.html 파일 수정

1. **파일 열기**
   ```
   consultation.html
   ```

2. **3개 값 교체**

```javascript
// 1. Public Key 교체
emailjs.init("YOUR_PUBLIC_KEY"); 
// → emailjs.init("user_abc123xyz");

// 2. Service ID 교체 (2곳)
await emailjs.send('YOUR_SERVICE_ID', 'admin_template', adminEmailParams);
// → await emailjs.send('service_abc1234', 'admin_template', adminEmailParams);

await emailjs.send('YOUR_SERVICE_ID', 'user_template', userEmailParams);
// → await emailjs.send('service_abc1234', 'user_template', userEmailParams);
```

---

## ✅ 6단계: 테스트

### 테스트 절차

1. **웹사이트 접속**
   - consultation.html 페이지 열기

2. **상담 신청서 작성**
   - 성명: 테스트
   - 이메일: 본인 이메일
   - 목적: 아무거나 선택
   - 내용: 테스트 메시지

3. **제출**
   - "완료" 버튼 클릭
   - 콘솔 확인 (F12 → Console)

4. **이메일 확인**
   - valuencores@gmail.com 수신 확인
   - 본인 이메일 수신 확인

---

## 🔧 트러블슈팅

### 이메일이 전송되지 않는 경우

1. **콘솔 오류 확인**
   ```
   F12 → Console 탭
   ```

2. **흔한 오류**
   - `Invalid public key` → Public Key 재확인
   - `Service not found` → Service ID 재확인
   - `Template not found` → Template 이름 확인

3. **EmailJS 대시보드 확인**
   - "Logs" 메뉴에서 전송 기록 확인
   - 실패 원인 분석

### Gmail이 수신되지 않는 경우

1. **스팸 폴더 확인**
2. **Gmail 필터 확인**
3. **EmailJS Service 재연결**

---

## 📊 월간 전송량 관리

### 무료 플랜: 200회/월

**예상 사용량**:
- 1건 상담 = 2통 이메일 (관리자 + 신청자)
- 200회 ÷ 2 = **최대 100건 상담/월**

**초과 시 옵션**:
1. 유료 플랜 업그레이드
2. 다른 이메일 서비스 사용
3. 서버 구축 (Node.js + Nodemailer)

---

## 🎯 완료 체크리스트

- [ ] EmailJS 계정 생성
- [ ] Gmail 서비스 연동
- [ ] Service ID 확인
- [ ] 관리자 템플릿 생성 (`admin_template`)
- [ ] 신청자 템플릿 생성 (`user_template`)
- [ ] Public Key 확인
- [ ] consultation.html에 키 입력
- [ ] 테스트 이메일 전송
- [ ] valuencores@gmail.com 수신 확인
- [ ] 신청자 이메일 수신 확인

---

## 📞 문의

EmailJS 설정 관련 문의:
- EmailJS 공식 문서: https://www.emailjs.com/docs/
- 기술 지원: support@emailjs.com

D-QUANT 9.0 기술 지원:
- 이메일: valuencores@gmail.com
- 전화: 02-356-6771
