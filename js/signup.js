// 회원가입 모달 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const signupModal = document.getElementById('signupModal');
    const signupBtn = document.getElementById('signupBtn');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const signupForm = document.getElementById('signupForm');
    
    // 전체 동의 체크박스
    const agreeAll = document.getElementById('agreeAll');
    const agreePrivacy = document.getElementById('agreePrivacy');
    const agreeInvestment = document.getElementById('agreeInvestment');
    const agreeSecurity = document.getElementById('agreeSecurity');
    
    // 모달 열기
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            signupModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // 모달 닫기 함수
    function closeModal() {
        signupModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 닫기 버튼 클릭
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // 오버레이 클릭
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && signupModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // 전체 동의 체크박스 기능
    if (agreeAll) {
        agreeAll.addEventListener('change', function() {
            const isChecked = this.checked;
            agreePrivacy.checked = isChecked;
            agreeInvestment.checked = isChecked;
            agreeSecurity.checked = isChecked;
        });
    }
    
    // 개별 체크박스 변경 시 전체 동의 체크박스 업데이트
    [agreePrivacy, agreeInvestment, agreeSecurity].forEach(checkbox => {
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                const allChecked = agreePrivacy.checked && agreeInvestment.checked && agreeSecurity.checked;
                agreeAll.checked = allChecked;
            });
        }
    });
    
    // 휴대전화 번호 자동 포맷팅
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 3 && value.length <= 7) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length > 7) {
                value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
            }
            
            e.target.value = value;
        });
    }
    
    // 초대코드 대문자 변환
    const inviteCodeInput = document.getElementById('inviteCode');
    if (inviteCodeInput) {
        inviteCodeInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.toUpperCase();
        });
    }
    
    // 폼 제출 처리
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 필수 약관 동의 확인
            if (!agreePrivacy.checked || !agreeInvestment.checked || !agreeSecurity.checked) {
                alert(currentNavigationLanguage === 'ko' 
                    ? '필수 약관에 모두 동의해주세요.' 
                    : 'Please agree to all required terms.');
                return;
            }
            
            // 폼 데이터 수집
            const formData = {
                fullName: document.getElementById('fullName').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                inviteCode: document.getElementById('inviteCode').value || null,
                agreements: {
                    privacy: agreePrivacy.checked,
                    investment: agreeInvestment.checked,
                    security: agreeSecurity.checked
                },
                timestamp: new Date().toISOString()
            };
            
            // 콘솔에 출력 (실제로는 서버로 전송)
            console.log('회원가입 데이터:', formData);
            
            // 성공 메시지
            const message = currentNavigationLanguage === 'ko' 
                ? `회원가입이 완료되었습니다!\n\n환영합니다, ${formData.fullName}님!\n등록하신 이메일로 확인 메일을 발송했습니다.`
                : `Sign up completed!\n\nWelcome, ${formData.fullName}!\nA confirmation email has been sent to your registered email.`;
            
            alert(message);
            
            // 폼 초기화 및 모달 닫기
            signupForm.reset();
            closeModal();
            
            // 실제 구현 시:
            // - 서버로 데이터 전송
            // - 이메일 인증 프로세스
            // - 로그인 세션 생성
            // - 대시보드로 리다이렉트
        });
    }
    
    // 약관 자세히 보기 링크
    document.querySelectorAll('.agreement-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const agreementType = this.closest('.agreement-item').querySelector('span').textContent;
            
            const message = currentNavigationLanguage === 'ko'
                ? `${agreementType}\n\n약관 내용이 여기에 표시됩니다.\n\n실제 구현 시 상세 약관 페이지로 이동하거나\n별도의 모달로 약관 전문을 표시합니다.`
                : `${agreementType}\n\nTerms content will be displayed here.\n\nIn actual implementation, navigate to a detailed terms page\nor display the full terms in a separate modal.`;
            
            alert(message);
        });
    });
});
