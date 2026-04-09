/**
 * 투자금액 데이터 마이그레이션 스크립트
 * 
 * 목적: 만원 단위로 저장된 투자금액을 원 단위로 변환
 * 예시: 5000 (5천만원) → 50,000,000원
 * 
 * 사용 방법:
 * 1. admin-login.html 로그인
 * 2. admin-dashboard.html 페이지 이동
 * 3. F12 개발자 도구 > Console 탭
 * 4. 이 파일 내용 전체 복사 & 붙여넣기 > Enter
 * 5. 마이그레이션 완료 후 F5 새로고침
 * 
 * 주의: 이 스크립트는 한 번만 실행하세요!
 */

(async function migrateInvestmentAmounts() {
    console.log('🔄 투자금액 마이그레이션 시작...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
        // 1. 모든 회원 데이터 가져오기
        console.log('📥 회원 데이터 조회 중...');
        const response = await fetch('tables/members_v2?limit=1000');
        
        if (!response.ok) {
            throw new Error('회원 데이터 조회 실패: ' + response.status);
        }
        
        const result = await response.json();
        const members = result.data || [];
        
        console.log(`✅ 총 ${members.length}명의 회원 데이터를 찾았습니다.`);
        
        if (members.length === 0) {
            console.log('⚠️  마이그레이션할 회원이 없습니다.');
            return;
        }
        
        // 2. 투자금액이 1,000,000 미만인 회원 필터링 (만원 단위로 저장된 회원)
        const membersToMigrate = members.filter(member => {
            const amount = member.investmentAmount || 0;
            // 1,000,000 미만이면 만원 단위로 저장된 것으로 판단
            return amount > 0 && amount < 1000000;
        });
        
        console.log(`\n🎯 마이그레이션 대상: ${membersToMigrate.length}명`);
        
        if (membersToMigrate.length === 0) {
            console.log('✅ 모든 회원의 투자금액이 이미 원 단위로 설정되어 있습니다.');
            return;
        }
        
        console.log('\n📊 마이그레이션 대상 회원:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        let totalOldAmount = 0;
        let totalNewAmount = 0;
        let successCount = 0;
        let failCount = 0;
        
        // 3. 각 회원의 투자금액 변환 및 업데이트
        for (let i = 0; i < membersToMigrate.length; i++) {
            const member = membersToMigrate[i];
            const oldAmount = member.investmentAmount || 0;
            const newAmount = oldAmount * 10000; // 만원 → 원 (0을 4개 추가)
            
            totalOldAmount += oldAmount;
            totalNewAmount += newAmount;
            
            console.log(`\n${i + 1}. ${member.memberName || '이름없음'} (${member.investorLevel || '-'})`);
            console.log(`   이전: ${oldAmount.toLocaleString()}원 (표시용)`);
            console.log(`   변경: ${newAmount.toLocaleString()}원`);
            console.log(`   배당률: ${member.dividendRate || '-'}`);
            
            try {
                // 회원 데이터 업데이트
                const updateData = {
                    ...member,
                    investmentAmount: newAmount,
                    // 누적 배당금도 비례해서 조정 (만약 있다면)
                    accumulatedDividend: member.accumulatedDividend ? member.accumulatedDividend * 10000 : 0
                };
                
                // id, gs_project_id, gs_table_name, created_at, updated_at 제거 (시스템 필드)
                delete updateData.id;
                delete updateData.gs_project_id;
                delete updateData.gs_table_name;
                delete updateData.created_at;
                delete updateData.updated_at;
                
                const updateResponse = await fetch(`tables/members_v2/${member.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData)
                });
                
                if (!updateResponse.ok) {
                    throw new Error(`업데이트 실패: ${updateResponse.status}`);
                }
                
                console.log('   ✅ 업데이트 완료');
                successCount++;
                
                // API 부하 방지
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.error(`   ❌ 오류 발생: ${error.message}`);
                failCount++;
            }
        }
        
        // 4. 최종 결과 출력
        console.log('\n' + '='.repeat(60));
        console.log('🎉 투자금액 마이그레이션 완료!');
        console.log('='.repeat(60));
        console.log(`✅ 성공: ${successCount}명`);
        console.log(`❌ 실패: ${failCount}명`);
        console.log(`\n📊 투자금액 변경 내역:`);
        console.log(`   이전 총합: ${totalOldAmount.toLocaleString()}원 (표시용)`);
        console.log(`   변경 총합: ${totalNewAmount.toLocaleString()}원`);
        console.log(`   변경 총합: ${(totalNewAmount / 10000).toLocaleString()}만원`);
        console.log(`\n✨ 페이지를 새로고침(F5)하여 변경사항을 확인하세요!`);
        console.log('='.repeat(60));
        
        // 5. 통계 재계산 트리거
        if (typeof updateStatistics === 'function') {
            console.log('\n🔄 통계 데이터 업데이트 중...');
            await loadMembers();
            console.log('✅ 통계 업데이트 완료');
        }
        
    } catch (error) {
        console.error('\n❌ 마이그레이션 중 오류 발생:', error);
        console.error('상세 정보:', error.message);
    }
})();
