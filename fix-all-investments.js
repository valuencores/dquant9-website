/**
 * 모든 회원 투자금액 일괄 수정 스크립트
 * 현재 금액에 × 10,000 (0을 4개 추가)
 * 
 * 사용 방법:
 * 1. admin-dashboard.html 페이지에서
 * 2. F12 > Console
 * 3. 이 파일 내용 복사 & 붙여넣기
 * 4. Enter
 */

(async function fixAllInvestments() {
    console.log('🚀 모든 회원 투자금액 × 10,000 시작...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
        // 1. 모든 회원 조회
        const response = await fetch('tables/members_v2?limit=1000');
        if (!response.ok) throw new Error('회원 조회 실패');
        
        const result = await response.json();
        const members = result.data || [];
        
        console.log(`\n📊 총 ${members.length}명의 회원 발견\n`);
        
        let successCount = 0;
        let skipCount = 0;
        let failCount = 0;
        let totalBefore = 0;
        let totalAfter = 0;
        
        // 2. 각 회원 처리
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            const oldAmount = member.investmentAmount || 0;
            
            console.log(`\n[${i + 1}/${members.length}] ${member.memberName || '이름없음'}`);
            
            if (oldAmount === 0) {
                console.log('  ⏭️  투자금액 없음 - 건너뜀');
                skipCount++;
                continue;
            }
            
            const newAmount = oldAmount * 10000;
            totalBefore += oldAmount;
            totalAfter += newAmount;
            
            console.log(`  이전: ${oldAmount.toLocaleString()}원`);
            console.log(`  변경: ${newAmount.toLocaleString()}원`);
            
            // 3. 업데이트 데이터 준비
            const updateData = {
                memberName: member.memberName,
                idNumber: member.idNumber,
                email: member.email,
                password: member.password,
                phoneNumber: member.phoneNumber,
                address: member.address,
                referrer: member.referrer,
                signupDate: member.signupDate,
                investmentDate: member.investmentDate,
                investmentAmount: newAmount,  // ← 수정된 금액
                dividendRate: member.dividendRate,
                investorLevel: member.investorLevel,
                investmentMonths: member.investmentMonths,
                accumulatedDividend: member.accumulatedDividend,
                notes: member.notes
            };
            
            // 4. 서버에 업데이트 요청
            try {
                const updateResponse = await fetch(`tables/members_v2/${member.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData)
                });
                
                if (updateResponse.ok) {
                    console.log(`  ✅ 수정 완료`);
                    successCount++;
                } else {
                    const errorText = await updateResponse.text();
                    console.log(`  ❌ 수정 실패: ${errorText}`);
                    failCount++;
                }
            } catch (error) {
                console.log(`  ❌ 오류: ${error.message}`);
                failCount++;
            }
            
            // API 부하 방지
            await new Promise(resolve => setTimeout(resolve, 150));
        }
        
        // 5. 최종 결과
        console.log('\n' + '━'.repeat(50));
        console.log('✨ 작업 완료!');
        console.log('━'.repeat(50));
        console.log(`✅ 성공: ${successCount}명`);
        console.log(`⏭️  건너뜀: ${skipCount}명`);
        console.log(`❌ 실패: ${failCount}명`);
        console.log(`\n💰 투자금액 합계:`);
        console.log(`   이전: ${totalBefore.toLocaleString()}원`);
        console.log(`   변경: ${totalAfter.toLocaleString()}원`);
        console.log(`   증가: ${(totalAfter / totalBefore).toFixed(0)}배`);
        console.log('\n🔄 F5 키를 눌러 페이지를 새로고침하세요!');
        console.log('━'.repeat(50));
        
    } catch (error) {
        console.error('\n❌ 치명적 오류:', error);
        console.error('상세:', error.message);
    }
})();
