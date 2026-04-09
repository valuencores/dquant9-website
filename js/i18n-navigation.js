// 네비게이션 및 홈페이지 다국어 번역
const navigationTranslations = {
    ko: {
        nav: {
            home: '디퀀트나인',
            simulation: '투자운용 시뮬레이션',
            assets: '나의 자산',
            login: '로그인',
            logout: '로그아웃',
            signup: '회원가입',
            support: '고객센터'
        },
        auth: {
            signupTitle: '회원가입',
            signupNotice: '모든 입력 항목은 필수 입력사항입니다.',
            inviteCodeLabel: '초대코드',
            inviteCodePlaceholder: '초대코드를 입력하세요 (필수)',
            nameLabel: '성명(실명)',
            namePlaceholder: '실명을 입력하세요',
            passwordLabel: '비밀번호',
            passwordPlaceholder: '비밀번호를 입력하세요',
            passwordConfirmLabel: '비밀번호 확인',
            passwordConfirmPlaceholder: '비밀번호를 다시 입력하세요',
            emailLabel: '이메일',
            emailPlaceholder: '이메일을 입력하세요',
            emailCodeLabel: '이메일 인증코드',
            emailCodePlaceholder: '인증코드 6자리를 입력하세요',
            btnSendCode: '인증코드 전송',
            timerText: '남은 시간',
            loginTitle: '로그인',
            rememberEmail: '이메일 기억하기',
            forgotPassword: '비밀번호를 잊으셨나요?',
            forgotPasswordTitle: '비밀번호 찾기',
            forgotPasswordNotice: '가입하신 이메일 주소를 입력해주세요.<br>비밀번호 재설정 링크를 보내드립니다.',
            forgotEmailPlaceholder: '가입하신 이메일을 입력하세요',
            btnSendResetLink: '재설정 링크 전송',
            backToLogin: '로그인으로 돌아가기',
            resetPasswordTitle: '새 비밀번호 설정',
            resetPasswordNotice: '새로운 비밀번호를 입력해주세요.',
            verificationCodeLabel: '인증 코드',
            verificationCodePlaceholder: '이메일로 받은 6자리 코드 입력',
            newPasswordLabel: '새 비밀번호',
            newPasswordPlaceholder: '새 비밀번호를 입력하세요',
            newPasswordConfirmLabel: '새 비밀번호 확인',
            newPasswordConfirmPlaceholder: '새 비밀번호를 다시 입력하세요',
            passwordHint: '8자 이상, 영문/숫자/특수문자 포함',
            btnChangePassword: '비밀번호 변경',
            btnLogin: '로그인'
        },
        home: {
            hero: {
                badge: 'PROFESSIONAL GRADE Ver 9.0',
                title: '변동성을 수익으로 바꾼다',
                cashFlow: '매일 쌓이는 수익, 매월 지급되는 현금 흐름',
                description: '24시간 멈추지 않는 시장 변동성.\n그것은 위험이 아닙니다. <strong style="color: var(--cyan-glow);">구조가 없을 뿐입니다.</strong>\n\nD-QUANT 9.0은 AI 알고리즘으로 상승·하락장 관계없이\n<strong style="color: var(--emerald-safe);">시장 무관 수익 구조</strong>를 만듭니다.',
                ctaSimulation: '수익 시뮬레이션 →',
                ctaContact: '투자 상담 신청'
            },
            problem: {
                header: 'Problem Definition',
                title: '변동성은 위험이 아니다.<br><span class="highlight">구조가 없을 뿐이다.</span>',
                mainTitle: '변동성은 위험이 아니다.<br><span style="color: #ef4444;">구조가 없을 뿐이다.</span>',
                volatilityTitle: '급등락에 휘둘리는 투자',
                volatilityDesc: '24시간 멈추지 않는 시장 변동성으로 인한 감정 소모와 판단 피로 누적',
                hodlTitle: '단방향 투자의 한계',
                hodlDesc: 'HODL 전략의 근본적 한계, 하락장에서 속수무책으로 손실만 확대',
                emotionTitle: '감정적 판단의 오류',
                emotionDesc: '극단적 시장 상황에서 감정에 휘둘려 고점 매수, 저점 매도 반복',
                problem1Title: '급등락에 휘둘리는 투자',
                problem1Desc: '24시간 멈추지 않는 시장 변동성으로 인한 감정 소모와 판단 피로 누적',
                problem2Title: '단방향 투자의 한계',
                problem2Desc: 'HODL 전략의 근본적 한계, 하락장에서 속수무책으로 손실만 확대',
                problem3Title: '감정적 판단의 오류',
                problem3Desc: '극단적 시장 상황에서 감정에 휘둘려 고점 매수, 저점 매도 반복',
                solutionTitle: '변동성은 위험이 아닙니다. 구조가 없을 뿐입니다.',
                solutionDesc: '지금부터 그 <strong style="color: var(--emerald-safe);">구조(Structure)</strong>를 공개합니다.'
            },
            philosophy: {
                header: 'BACKGROUND & PHILOSOPHY',
                title1: '핵심',
                title2: '구조',
                description: 'D-Quant 9.0은 밸류앤코어스의 철학이 구현된 결과물입니다. 시장의 표면적 움직임(<strong>Core</strong>)을 찾아내고, 이를 지속 가능한 수익으로 전환할 수 있는 견고한 <strong>구조(Structure)</strong>를 설계합니다.',
                quote: '자산의 가치는<br><strong style="color: var(--emerald-safe);">구조화될 때</strong><br>비로소 힘을 갖는다.',
                author: 'Value&Cores Philosophy',
                circleCoreTitle: '핵심',
                circleCoreSubtitle: 'Market Essence',
                circleStructureTitle: '구조',
                circleStructureSubtitle: 'Sustainable Profit',
                transformText: 'TRANSFORM',
                labelVolatility: 'Volatility',
                labelStability: 'Stability'
            },
            solutionOverview: {
                header: 'SOLUTION OVERVIEW',
                title: '변동성을 흐름으로 바꾸는 구조',
                solution1Title: '변동성을 수익으로',
                solution1Desc: '시장의 모든 급등락 움직임을 포착하여<br>수익 기회로 전환합니다.',
                solution2Title: '시장 무관 수익 구조',
                solution2Desc: '상승·하락장 관계없이 관계없이<br>구조적 수익을 창출합니다.',
                solution3Title: '정기 안정 지급',
                solution3Desc: '매일 쌓인 수익을 매월 정산하여<br>안정적 현금 흐름을 제공합니다.',
                footer: '지금부터 그 <strong>구조(Structure)</strong>를 공개합니다.'
            },
            aiSystem: {
                header: 'AI ALGORITHM SYSTEM',
                title: 'AI 알고리즘 기반 가상자산 선물 투자 시스템',
                subtitle: '인공지능이 발견하고, 알고리즘이 실행하는 지능형 투자 구조.',
                riskTitle: '리스크 헷지',
                riskDesc: '시장 변동성을 양방향으로 헷지하여 리스크를 관리합니다. (EMH, Kyle, Glosten-Milgrom, Ho-Stoll 모형 학습 기반 재귀 가능)',
                keypointTitle: '커플 포인트 발굴',
                keypointDesc: '인간의 감정과 인식으로는 절대할 수 없는 수익 구간을 AI가 발견합니다. (리벨럴링 Sec. & Min. Segmentation)',
                lossTitle: '손실 방지 알고리즘',
                lossDesc: '99.9% 손실 방지 메커니즘으로 자산을 보호합니다. (Portfolio Rebalancing 등)',
                globalTitle: '글로벌 거래소 분석',
                globalDesc: '바이낸스, 비트맥스, 코인베이스 등 글로벌 3대 거래소의 거래 투자자 및 자금 흐름 및 투자 흐름을 실시간 분석하고(Trade Trace Analysis 기반)고 전세계 국지부자의 투자 동선과 의향 흐름을 분석합니다. (Investor\'s Semantics Analysis 활용)',
                autoTitle: '자능형 진입 알고리즘',
                autoDesc: '최적의 Long / Short 진입 모드를 AI가 선택하여 실행합니다. (Signal Aggregation / Market Regime Switching 기반)',
                discoveryTitle: 'DISCOVERY',
                discoveryDesc: 'AI가 실시간으로 시장의 모든 변동성을 분석하고,<br><strong>가장 높은 수익 확률의 기회</strong>를 포착합니다.',
                managementTitle: 'MANAGEMENT',
                managementDesc: '알고리즘이 24/7 자동으로 포지션을 관리하고,<br><strong>감정 개입 없이 체계적 실행</strong>을 수행합니다.',
                protectionTitle: 'PROTECTION',
                protectionDesc: '다중 보호 장치로 극단적 변동성에서도 자산을 보호하고,<br><strong>손실 최소화 메커니즘</strong>을 가동합니다.'
            },
            aiLearning: {
                header: 'AI LEARNING STRUCTURE',
                title: '인간의 한계를 넘어서는 AI 학습 구조',
                subtitle: '개인투자자의 취향한 감정 투자와 기관 투자자의 투자 흐름 데이터를 극복하는 방법.',
                feature1Title: '글로벌 자본 시장 학습',
                feature1Desc: '글로벌 금융 시장 데이터와 경영하여학 학습하고 투자자 심리를 분석합니다.',
                feature2Title: '투자 리더들의 원칙',
                feature2Desc: '워렌 버핏의 투자 리더십의 개념을 학습한 투자 원칙을 실은 학습니다.',
                feature3Title: '거시/미시경제 분석',
                feature3Desc: '발굴된 안종적인 거시경제 및 미시경제 데이터를 실시간 분석합니다.',
                feature4Title: '거상자산 흐름 분석',
                feature4Desc: '거상자산의 학습 투자 모드 및 거래 메커 거래소의 거래량 흐름을 분석합니다.',
                feature5Title: '투자 모드 및 거래 메커',
                feature5Desc: '거상자산의 학습 투자 및 거래 메이저 거래소에 기반한 메커니즘을 학습합니다.',
                resultBadge: 'AI POWERED RESULT',
                resultLabel: '개인 투자자 대비 학습 효과',
                resultDetail1: '전략적 공격, 전략적 방어',
                resultDetail2: '진전한 투자자 패드스냐'
            },
            counterTrend: {
                header: 'COUNTER-TREND STRATEGY',
                titleRed: '과열되면 팔고',
                titleBlue: '폭락하면 산다',
                subtitle: '추세를 따르지 않고, 변동성을 역이용하여 수익을 창출하는 평균 회귀(Mean Reversion) 메커니즘.',
                col1Title: '동시 다변적 양방향 접근',
                col1Note: '공포에매수(Long), 탐욕에매도(Short) -역발상접근',
                col2Title: '역추세 해지 & 재감지 재진입',
                algoExecution: 'ALGORITHM EXECUTION',
                reentryTableHeader: '재감지 재진입 (10% 단도)',
                tableLevel: '단계',
                tableEntry: '비중',
                tableNote: '진행 의도',
                tableRow1: '신호 탐색 동 최저.',
                tableRow2: '추세 지속 대응.',
                tableRow3: '리스크 관리 강화.',
                tableRow4: '완도 도달 후 대기.',
                tableFooter: '시스템 로직에 의한 자동 진입, 투자 실행',
                col3Title: '일별 수익 누적',
                dailyTargetLabel: 'DAILY TARGET',
                dailyTargetNote: '매일 쌓아 월단위 정산'
            },
            strategyDetail: {
                header: 'Counter-Trend Strategy Detail',
                title: '역추세 전략의 과학적 메커니즘',
                subtitle: '평균 회귀(Mean Reversion) 기반의 체계적 접근.',
                card1Title: '평균 회귀 원리',
                card2Title: '체감식 재진입 구조',
                card3Title: '통계적 근거',
                riskNote1: '신호 탐색, 최저.',
                riskNote2: '추세 지속 대응.',
                riskNote3: '리스크 관리 강화.',
                riskNote4: '완도 도달 후 대기.',
                exposureLabel: 'Total Exposure Limit',
                successTitle: '평균 회귀 확률',
                successItem1: '24~72시간 내 회귀',
                successItem2: '2018, 2022년 백테스팅 검증 완료'
            },
            methodology: {
                header: 'METHODOLOGY SIGNIFICANCE',
                title: 'D-Quant 9.0의 투자 방법론적 의의',
                subtitle: '최신 가상자산 선물투자 방법론의 통합적 접근.',
                quote: '"변동성을 구조로, 구조를 수익으로."',
                quoteEn: 'Turning Volatility into Structure, Structure into Profit',
                badgeLabel: '통합된 4가지 요소',
                card1Title: '양적 거래',
                card1Desc: '통계적 모델과 알고리즘 기반의<br>자동 실행 시스템',
                card2Title: 'AI 및 머신러닝',
                card2Desc: 'LLM 기반 시장 분석 및<br>자동 전략 최적화 머신러닝',
                card3Title: '리스크 관리 최우선',
                card3Desc: '3중 보호, 9단계 검증,<br>Safety First 원칙 적용',
                card4Title: '투명한 현금 흐름',
                card4Desc: '일일 수익 누적 확정 및<br>월단위 현금 지급 구조'
            },
            verification: {
                header: 'PERFORMANCE VERIFICATION',
                title: '검증된 성과, 신뢰할 수 있는 수치',
                subtitle: 'D-QUANT 9.0은 단순한 이론이 아닙니다. <strong style="color: var(--cyan-glow);">실제 성과로 검증된 시스템</strong>입니다.',
                backtestBadge: 'BACKTEST RESULT',
                backtestTitle: '백테스트 성과',
                monthlyBadge: 'MONTHLY RETURNS',
                monthlyTitle: '월별 수익률',
                riskBadge: 'RISK METRICS',
                riskTitle: '리스크 지표',
                cumulative: '누적 수익률',
                sharpe: 'Sharpe Ratio',
                avgMonthly: '월수익구간',
                winRate: '진입시 승률',
                riskScore: 'Risk Score',
                maxDrawdown: '최대 손실률 (MDD)',
                volatility: '변동성 (Volatility)',
                recovery: '회복 기간',
                ctaText: '실제 수익 시뮬레이션으로 당신의 투자 성과를 직접 확인해보세요.',
                ctaButton: '수익 시뮬레이션 시작',
                rate: '월 평균 목표 수익률',
                rateNote: '투자 금액에 따라 차등 적용',
                development: '개발 기간',
                developmentNote: '102명의 지속가능 투자자<br>패턴 학습',
                algorithm: '알고리즘',
                algorithmNote: '구글 딥마인드 사용<br>LLM 및 알고리즘 학습',
                leadership: '디지털 금융 리더십',
                leadershipNote: 'KAIST 금융공학, 한양대,<br>외대 박사 출신 연구자 개발 참여'
            },
            revenue: {
                header: 'PREDICTABLE REVENUE STRUCTURE',
                title: '예측 가능한 수익 구조',
                subtitle: '일일 변동성 차익이 매일 확정 수익으로 전환되는 시스템.',
                badge: 'CASH FLOW SYSTEM',
                dailyLabel: 'Daily Volatility Capture',
                dailyInfoTitle: '일일 수익 적립',
                dailyInfoDesc: '시장 변동성을 활용하여<br>매일 안정적인 차익을 실현합니다.',
                accumulationBadge: '매일 쌓이는 수익',
                accumulationNote: '재투자 선택 시 복리 효과로 장기 자산 증식 가능',
                monthlyLabel: 'Monthly Return',
                monthlyInfoTitle: '월간 목표 지급 / 변환시 24~42%',
                monthlyInfoSubtitle: '투자금액에 따라 설계 이율',
                monthlyInfoDesc: '매일 일일 확정된 수익을 지급하며<br>지급 이전 모든 선택권은<br>복리 재투자 옵션을 제공합니다.'
            },
            risk: {
                header: 'RISK MANAGEMENT',
                titleHighlight: '감지하고 대응한다.',
                card1Title: '거래소 유동주목<br>자동 체의 시스템',
                card1Desc: '상장 폐지 위험 및 이상 거래 급등 감지 시<br>알고리즘이 즉각적으로 포트폴리오에서<br>영구 배제하여 원천적 위험 차단.',
                status1: 'Active Filtering',
                card2Title: '변동성 임계치<br>30% 제한<br><span class="subtitle">(Capped)</span>',
                card2Desc: '일일 변동성 30% 이상의 비정상 구간은<br>높낮 붙기는 엔드로피 간주하여 절입 차단.<br>시스템의 예측 기능 범위 내 운용.',
                status2: 'Volatility Control',
                card3Title: '안전성 절대 우위<br>원칙 <span class="subtitle">(Safety First)</span>',
                card3Desc: '수익성과 안정성 충돌 시 무조건 안정성 선택.<br>허용 리스크 범위를 0.1%라도 초과하는<br>고수익 기회는 과감하게 포기.',
                status3: 'Protocol Active'
            },
            cashflow: {
                header: 'CASH FLOW STRUCTURE',
                titleHighlight: '매월 흐르는 구조.',
                dailyTitle: 'Daily Stacking',
                dailySubtitle: '매일의 변동성을 수익으로 쌓습니다.',
                dailyTarget: 'Daily Target',
                monthlyTitle: 'Monthly Payout',
                monthlySubtitle: '매월 말일, 수익이 확정 지급됩니다.',
                feature1Title: '생활비 걱정 감소',
                feature1Desc: '매월 확정된 입금으로 고정 지출을 해결합니다.',
                feature2Title: '재투자 선택권',
                feature2Desc: '수익 재투자로 복리 효과를 선택할 수 있습니다.',
                feature3Title: '장기적 주도권',
                feature3Desc: '시장에 휘둘리지 않는 자금 흐름제어를 회복합니다.',
                quotePart1: '수익이 흐르면,',
                quotePart2: '삶이 멈추지 않는다.'
            },
            finalCta: {
                badge: 'START NOW',
                title: '지금 바로 실감하세요',
                description: '<strong style="color: var(--cyan-glow);">당신의 예상 수익</strong>을 직접 시뮬레이션하고,<br>D-QUANT 9.0의 구조적 투자 시스템을 경험해보세요.',
                buttonPrimary: '수익 시뮬레이션 시작',
                buttonSecondary: '투자 상담 신청',
                security: '철저한 보안 및 개인정보 보호 시스템 적용'
            },
            structure: {
                title: 'D-QUANT 9.0 STRUCTURE',
                defense1: '1st DEFENSE',
                defense2: '2nd DEFENSE',
                defense3: '3rd DEFENSE',
                core: 'CORE SYSTEM',
                feature1Title: '종목 선택',
                feature1Label: 'FILTERING',
                feature1Desc: '시총 상위 우량 종목 선택, 리스크 원천 배제',
                feature2Title: '양방향 전략',
                feature2Label: 'HEDGING',
                feature2Desc: '롱/숏 동시 운용, 시장 무관 절대 수익 추구',
                feature3Title: '자동 실행',
                feature3Label: 'SYSTEM',
                feature3Desc: '감정 배제 알고리즘, 24시간 시스템 자동 대응'
            },
            strengths: {
                label: 'D-QUANT 9.0 STRENGTHS',
                title: 'D-Quant 9.0의 핵심 경쟁력',
                subtitle: '최선 가상자산 선물투자 방법론의 5가지 차별점.',
                badge: 'COMPETITIVE EDGE',
                strength1Title: '변동성 역이용 전략',
                strength1Desc: '시장의 급등락을 위협이 아닌 수익 기회로 전환합니다. 평균 회귀(Mean Reversion) 메커니즘을 통해 구조적 수익을 창출합니다.',
                strength2Title: '과학적 리스크 관리',
                strength2Desc: '3중 방어(Filtering, Hedging, System)와 9단계 검증 프로세스로 다중 리스크 관리 체계를 구축했습니다.',
                strength3Title: '고도화된 AI 학습',
                strength3Desc: '단순 차트 분석을 넘어 글로벌 자료 사용 데이터, 거시/미시 경제, LLM 기반 사용 백업 분석을 결합합니다.',
                strength4Title: '안정적인 현금 흐름 제공',
                strength4Desc: '일일 0.3~0.5% 수익 목표로 예측 가능한 수익을 창출. 일일 벌목 30% 이상의 비정상 급등락을 진입을 차단하여, 수익성보다 안정성을 확보 우선합니다.',
                strength5Title: '보수적 운용 원칙',
                strength5Desc: '일일 벌목 30% 이상의 비정상 급등락은 진입을 차단하여, 수익성보다 안정성을 확보 우선합니다.'
            },
            infrastructure: {
                header: 'GLOBAL INFRASTRUCTURE',
                topTier: 'TOP-TIER',
                subtitle: '검증된 글로벌 거래소의 풍부한 유동성과<br>24/7 무중단 시스템으로 안정적인 수익 실행을 보장합니다.',
                metric1Title: 'Real-time Monitoring',
                metric1Desc: '365일 작동지 않는 시장 감시.',
                metric2Title: 'Verified Data',
                metric2Desc: '장기 허위정 백데스팅 검증 완료.',
                metric3Title: 'Liquidity & Security',
                metric3Desc: '최상위 유동성 및 보안 등급.'
            },
            cta: {
                title: '지금 바로 실감하세요',
                description: '투자 시뮬레이션으로 <strong style="color: var(--text-primary);">당신의 예상 수익</strong>을 확인하고,<br>D-QUANT 9.0의 힘을 직접 경험하세요.',
                btnSimulation: '수익 시뮬레이션 시작',
                btnContact: '투자 상담 신청',
                note: '보안이 철저하게 관리되며, 개인정보는 안전하게 보호됩니다.'
            },
            safety: {
                title: '안전성 보장',
                custodyTitle: '자산 보관',
                custodyDesc: '제도권 증권사를 통한 안전한 자산 보관 및 관리',
                contractTitle: '투명한 계약',
                contractDesc: '명확한 투자 계약서와 정기적인 운용 보고서 제공',
                protectionTitle: '투자자 보호',
                protectionDesc: '금융 규정 준수 및 투자자 권익 보호 시스템 완비'
            },
            footer: {
                home: '홈',
                simulator: '시뮬레이터',
                assets: '나의 자산',
                company: '회사 소개',
                disclaimer: '본 시뮬레이션은 디퀀트나인의 투자자, 파트너의 이해를 돕기 위한 것이며, 월고정지급식과 복리지급식 시뮬레이션 결과는 투자운용 계약 원칙에 의거하여 확정된 결과값을 산출합니다.'
            }
        },
        assets: {
            title: '나의 자산',
            subtitle: '투자 포트폴리오 및 자산 현황을 확인하세요',
            comingSoon: '곧 서비스됩니다',
            comingSoonDesc: '나의 자산 페이지는 현재 개발 중입니다.<br>곧 다양한 자산 관리 기능을 만나보실 수 있습니다.',
            goToSimulation: '투자 시뮬레이션으로 이동'
        },
        signup: {
            title: '회원가입',
            name: '성명',
            phone: '휴대전화',
            email: '이메일 주소',
            invite: '초대 코드 (선택)',
            agreePrivacy: '개인정보 수집 및 활용에 동의합니다 (필수)',
            agreeInvestment: '투자협업 조건 및 계약에 동의합니다 (필수)',
            agreeSecurity: '비밀 유지 및 보안 준수를 확약합니다 (필수)',
            submit: '회원가입 완료'
        },

    },
    en: {
        nav: {
            home: 'dQuant9',
            simulation: 'Investment Simulation',
            assets: 'My Assets',
            login: 'Login',
            logout: 'Logout',
            signup: 'Sign Up',
            support: 'Support'
        },
        auth: {
            signupTitle: 'Sign Up',
            signupNotice: 'All fields are required.',
            inviteCodeLabel: 'Invite Code',
            inviteCodePlaceholder: 'Enter your invite code (Required)',
            nameLabel: 'Full Name',
            namePlaceholder: 'Enter your full legal name',
            passwordLabel: 'Password',
            passwordPlaceholder: 'Enter your password',
            passwordConfirmLabel: 'Confirm Password',
            passwordConfirmPlaceholder: 'Re-enter your password',
            emailLabel: 'Email',
            emailPlaceholder: 'Enter your email',
            emailCodeLabel: 'Email Verification Code',
            emailCodePlaceholder: 'Enter 6-digit verification code',
            btnSendCode: 'Send Code',
            timerText: 'Time Remaining',
            loginTitle: 'Login',
            rememberEmail: 'Remember Email',
            forgotPassword: 'Forgot your password?',
            forgotPasswordTitle: 'Reset Password',
            forgotPasswordNotice: 'Enter your registered email address.<br>We will send you a password reset link.',
            forgotEmailPlaceholder: 'Enter your registered email',
            btnSendResetLink: 'Send Reset Link',
            backToLogin: 'Back to Login',
            resetPasswordTitle: 'Set New Password',
            resetPasswordNotice: 'Please enter your new password.',
            verificationCodeLabel: 'Verification Code',
            verificationCodePlaceholder: 'Enter 6-digit code from email',
            newPasswordLabel: 'New Password',
            newPasswordPlaceholder: 'Enter new password',
            newPasswordConfirmLabel: 'Confirm New Password',
            newPasswordConfirmPlaceholder: 'Re-enter new password',
            passwordHint: 'Min 8 characters, include letters/numbers/symbols',
            btnChangePassword: 'Change Password',
            btnLogin: 'Login'
        },
        home: {
            hero: {
                title: 'D-QUANT 9.0',
                subtitleEn: 'A New Era in Quantitative Trading Systems',
                subtitleKo: 'Transforming the World of Quantitative Trading',
                description: 'dQuant9 is a next-generation quantitative trading system that generates stable and sustainable returns through the investment of time.'
            },
            problem: {
                header: 'Problem Definition',
                title: 'Volatility is not risk.<br><span class="highlight">It just lacks structure.</span>',
                mainTitle: 'Volatility is not risk.<br><span style="color: #ef4444;">It just lacks structure.</span>',
                volatilityTitle: 'Investment Swayed by Volatility',
                volatilityDesc: '24/7 market volatility causes emotional exhaustion and decision fatigue',
                hodlTitle: 'Limits of Unidirectional Investment',
                hodlDesc: 'Fundamental limitations of HODL strategy, helplessly amplifying losses in bear markets',
                emotionTitle: 'Errors in Emotional Judgment',
                emotionDesc: 'Repeatedly buying high and selling low, swayed by emotions in extreme market conditions',
                title: 'Do you have these investment problems?',
                problem1Title: 'Investment Swayed by Volatility',
                problem1Desc: '24/7 market volatility causes emotional exhaustion and decision fatigue',
                problem2Title: 'Limits of Unidirectional Investment',
                problem2Desc: 'Fundamental limitations of HODL strategy, helplessly amplifying losses in bear markets',
                problem3Title: 'Errors in Emotional Judgment',
                problem3Desc: 'Repeatedly buying high and selling low, swayed by emotions in extreme market conditions',
                solutionTitle: 'Volatility is not risk. It just lacks structure.',
                solutionDesc: 'Now we reveal that <strong style="color: var(--emerald-safe);">Structure</strong>.'
            },
            philosophy: {
                header: 'BACKGROUND & PHILOSOPHY',
                title1: 'Core',
                title2: 'Structure',
                description: 'D-Quant 9.0 is the embodiment of Value&Cores\' philosophy. We identify the core essence of market movements (<strong>Core</strong>) and design a robust <strong>Structure</strong> that can transform them into sustainable profits.',
                quote: 'The value of assets<br><strong style="color: var(--emerald-safe);">gains power</strong><br>only when structured.',
                author: 'Value&Cores Philosophy',
                circleCoreTitle: 'Core',
                circleCoreSubtitle: 'Market Essence',
                circleStructureTitle: 'Structure',
                circleStructureSubtitle: 'Sustainable Profit',
                transformText: 'TRANSFORM',
                labelVolatility: 'Volatility',
                labelStability: 'Stability'
            },
            solutionOverview: {
                header: 'SOLUTION OVERVIEW',
                title: 'Structure that Turns Volatility into Flow',
                solution1Title: 'Volatility into Profit',
                solution1Desc: 'Capture all market fluctuations<br>and turn them into profit opportunities.',
                solution2Title: 'Market-Agnostic Profit Structure',
                solution2Desc: 'Generate structural profits<br>regardless of bull or bear markets.',
                solution3Title: 'Regular Stable Payment',
                solution3Desc: 'Daily accumulated profits settled monthly<br>providing stable cash flow.',
                footer: 'Now we reveal that <strong>Structure</strong>.'
            },
            aiSystem: {
                header: 'AI ALGORITHM SYSTEM',
                title: 'AI-Based Cryptocurrency Futures Investment System',
                subtitle: 'AI discovers opportunities, algorithms execute intelligent investment structure.',
                riskTitle: 'Risk Hedging',
                riskDesc: 'Manage risk by hedging market volatility in both directions. (Based on EMH, Kyle, Glosten-Milgrom, Ho-Stoll model learning)',
                keypointTitle: 'Key Point Discovery',
                keypointDesc: 'AI discovers profit zones that are impossible for human emotion and perception. (Relabeling Sec. & Min. Segmentation)',
                lossTitle: 'Loss Prevention Algorithm',
                lossDesc: 'Protect assets with 99.9% loss prevention mechanism. (Portfolio Rebalancing, etc.)',
                globalTitle: 'Global Exchange Analysis',
                globalDesc: 'Real-time analysis of investor funds and investment flows from top 3 global exchanges including Binance, BitMEX, Coinbase (Trade Trace Analysis based), analyzing investment trends of global wealthy investors. (Investor\'s Semantics Analysis)',
                autoTitle: 'Intelligent Entry Algorithm',
                autoDesc: 'AI selects and executes optimal Long / Short entry mode. (Based on Signal Aggregation / Market Regime Switching)'
            },
            aiLearning: {
                header: 'AI LEARNING STRUCTURE',
                title: 'AI Learning Structure Beyond Human Limits',
                subtitle: 'Method to overcome emotional investing of individual investors and investment flow data of institutional investors.',
                feature1Title: 'Global Capital Market Learning',
                feature1Desc: 'Learn global financial market data and management science, analyze investor psychology.',
                feature2Title: 'Investment Leaders\' Principles',
                feature2Desc: 'Learn investment principles based on Warren Buffett\'s investment leadership concepts.',
                feature3Title: 'Macro/Microeconomic Analysis',
                feature3Desc: 'Real-time analysis of discovered stable macroeconomic and microeconomic data.',
                feature4Title: 'Virtual Asset Flow Analysis',
                feature4Desc: 'Analyze transaction volume flows from learning investment modes and trading mechanism exchanges.',
                feature5Title: 'Investment Mode & Trading Mechanism',
                feature5Desc: 'Learn mechanisms based on major exchanges for virtual asset learning investment and trading.',
                resultBadge: 'AI POWERED RESULT',
                resultLabel: 'Learning Effect vs. Individual Investors',
                resultDetail1: 'Strategic Attack, Strategic Defense',
                resultDetail2: 'Advanced Investor Patterns'
            },
            counterTrend: {
                header: 'COUNTER-TREND STRATEGY',
                titleRed: 'Sell when Overheated',
                titleBlue: 'Buy when Crashed',
                subtitle: 'A Mean Reversion mechanism that generates profits by leveraging volatility against the trend, rather than following it.',
                col1Title: 'Simultaneous Multi-Directional Approach',
                col1Note: 'Buy on Fear (Long), Sell on Greed (Short) - Contrarian Approach',
                col2Title: 'Counter-Trend Exit & Re-Detection Re-Entry',
                algoExecution: 'ALGORITHM EXECUTION',
                reentryTableHeader: 'Re-Detection Re-Entry (10% Stepped)',
                tableLevel: 'Level',
                tableEntry: 'Weight',
                tableNote: 'Intent Progress',
                tableRow1: 'Signal exploration, minimum.',
                tableRow2: 'Trend continuation response.',
                tableRow3: 'Enhanced risk management.',
                tableRow4: 'Wait after full level reached.',
                tableFooter: 'Automatic entry and execution by system logic',
                col3Title: 'Daily Profit Accumulation',
                dailyTargetLabel: 'DAILY TARGET',
                dailyTargetNote: 'Accumulate daily for monthly settlement'
            },
            strategyDetail: {
                header: 'Counter-Trend Strategy Detail',
                title: 'Scientific Mechanism of Counter-Trend Strategy',
                subtitle: 'A systematic approach based on Mean Reversion.',
                card1Title: 'Mean Reversion Principle',
                card2Title: 'Stepped Re-Entry Structure',
                card3Title: 'Statistical Evidence',
                riskNote1: 'Signal exploration, minimum.',
                riskNote2: 'Trend continuation response.',
                riskNote3: 'Enhanced risk management.',
                riskNote4: 'Wait after full level reached.',
                exposureLabel: 'Total Exposure Limit',
                successTitle: 'Mean Reversion Probability',
                successItem1: 'Reversion within 24~72 hours',
                successItem2: '2018, 2022 backtesting verification completed'
            },
            methodology: {
                header: 'METHODOLOGY SIGNIFICANCE',
                title: 'Investment Methodology Significance of D-Quant 9.0',
                subtitle: 'An integrated approach to the latest crypto futures investment methodology.',
                quote: '"Turning Volatility into Structure, Structure into Profit"',
                quoteEn: 'Turning Volatility into Structure, Structure into Profit',
                badgeLabel: '4 Integrated Elements',
                card1Title: 'Quantitative Trading',
                card1Desc: 'Statistical models and algorithm-based<br>automated execution system',
                card2Title: 'AI & Machine Learning',
                card2Desc: 'LLM-based market analysis and<br>automatic strategy optimization ML',
                card3Title: 'Risk Management Priority',
                card3Desc: 'Triple protection, 9-step verification,<br>Safety First principle applied',
                card4Title: 'Transparent Cash Flow',
                card4Desc: 'Daily profit accumulation confirmed<br>and monthly cash payment structure'
            },
            verification: {
                header: 'PERFORMANCE VERIFICATION',
                title: 'Verified Performance, Reliable Metrics',
                subtitle: 'D-QUANT 9.0 is not just theory. <strong style="color: var(--cyan-glow);">A system verified by actual performance</strong>.',
                backtestBadge: 'BACKTEST RESULT',
                backtestTitle: 'Backtest Performance',
                monthlyBadge: 'MONTHLY RETURNS',
                monthlyTitle: 'Monthly Returns',
                riskBadge: 'RISK METRICS',
                riskTitle: 'Risk Metrics',
                cumulative: 'Cumulative Return',
                sharpe: 'Sharpe Ratio',
                avgMonthly: 'Monthly Range',
                winRate: 'Entry Win Rate',
                riskScore: 'Risk Score',
                maxDrawdown: 'Max Drawdown (MDD)',
                volatility: 'Volatility',
                recovery: 'Recovery Period',
                ctaText: 'Experience your investment performance directly with real profit simulation.',
                ctaButton: 'Start Profit Simulation',
                rate: 'Monthly Target Return',
                rateNote: 'Differential application by investment amount',
                development: 'Development Period',
                developmentNote: 'Pattern learning from 102<br>sustainable investors',
                algorithm: 'Algorithm',
                algorithmNote: 'Google DeepMind<br>LLM & Algorithm Training',
                leadership: 'Digital Finance Leadership',
                leadershipNote: 'KAIST Financial Engineering,<br>Hanyang Univ., HUFS Ph.D. Researchers'
            },
            revenue: {
                header: 'PREDICTABLE REVENUE STRUCTURE',
                title: 'Predictable Revenue Structure',
                subtitle: 'A system that converts daily volatility profits into guaranteed returns every day.',
                badge: 'CASH FLOW SYSTEM',
                dailyLabel: 'Daily Volatility Capture',
                dailyInfoTitle: 'Daily Profit Accumulation',
                dailyInfoDesc: 'Realize stable profits daily<br>by leveraging market volatility.',
                accumulationBadge: 'Daily Accumulating Returns',
                accumulationNote: 'Long-term asset growth possible through compound effect when reinvesting',
                monthlyLabel: 'Monthly Return',
                monthlyInfoTitle: 'Monthly Target Payment / 24~42% Annual',
                monthlyInfoSubtitle: 'Rate designed by investment amount',
                monthlyInfoDesc: 'Daily confirmed returns are paid out,<br>and all options before payment<br>offer compound reinvestment choices.'
            },
            risk: {
                header: 'RISK MANAGEMENT',
                titleHighlight: 'Detect and Respond in Advance.',
                card1Title: 'Exchange Liquidity Monitor<br>Auto Filtering System',
                card1Desc: 'When delisting risk or abnormal trading surge is detected,<br>the algorithm immediately excludes from portfolio<br>for fundamental risk prevention.',
                status1: 'Active Filtering',
                card2Title: 'Volatility Threshold<br>30% Cap<br><span class="subtitle">(Capped)</span>',
                card2Desc: 'Abnormal ranges with daily volatility over 30%<br>are considered excessive entropy and entry is blocked.<br>Operate within system prediction capability.',
                status2: 'Volatility Control',
                card3Title: 'Safety Absolute Priority<br>Principle <span class="subtitle">(Safety First)</span>',
                card3Desc: 'When profitability and stability conflict, always choose stability.<br>High-yield opportunities exceeding allowed risk range<br>by even 0.1% are boldly abandoned.',
                status3: 'Protocol Active'
            },
            safety: {
                title: 'Safety Assurance',
                custodyTitle: 'Asset Custody',
                custodyDesc: 'Safe asset custody and management through regulated securities firms',
                contractTitle: 'Transparent Contracts',
                contractDesc: 'Clear investment contracts and regular operation reports provided',
                protectionTitle: 'Investor Protection',
                protectionDesc: 'Compliance with financial regulations and investor protection systems in place'
            },
            cashflow: {
                header: 'CASH FLOW STRUCTURE',
                titleHighlight: 'Monthly Flowing Structure.',
                dailyTitle: 'Daily Stacking',
                dailySubtitle: 'Stack daily volatility into profits.',
                dailyTarget: 'Daily Target',
                monthlyTitle: 'Monthly Payout',
                monthlySubtitle: 'Profits are confirmed and paid out at the end of each month.',
                feature1Title: 'Reduced Living Expense Worries',
                feature1Desc: 'Resolve fixed expenses with monthly confirmed deposits.',
                feature2Title: 'Reinvestment Option',
                feature2Desc: 'Choose compound effect through profit reinvestment.',
                feature3Title: 'Long-term Control',
                feature3Desc: 'Recover cash flow control without being swayed by the market.',
                quotePart1: 'When profits flow,',
                quotePart2: 'life never stops.'
            },
            finalCta: {
                badge: 'START NOW',
                title: 'Experience It Right Now',
                description: 'Simulate <strong style="color: var(--cyan-glow);">your expected returns</strong> directly,<br>and experience D-QUANT 9.0\'s structured investment system.',
                buttonPrimary: 'Start Profit Simulation',
                buttonSecondary: 'Request Investment Consultation',
                security: 'Rigorous security and personal information protection systems applied'
            },
            structure: {
                title: 'D-QUANT 9.0 STRUCTURE',
                defense1: '1st DEFENSE',
                defense2: '2nd DEFENSE',
                defense3: '3rd DEFENSE',
                core: 'CORE SYSTEM',
                feature1Title: 'Asset Selection',
                feature1Label: 'FILTERING',
                feature1Desc: 'Select top market cap blue-chip assets, eliminate risk at source',
                feature2Title: 'Bi-directional Strategy',
                feature2Label: 'HEDGING',
                feature2Desc: 'Simultaneous long/short operation, market-agnostic absolute returns',
                feature3Title: 'Automated Execution',
                feature3Label: 'SYSTEM',
                feature3Desc: 'Emotion-free algorithm, 24/7 automated system response'
            },
            strengths: {
                label: 'D-QUANT 9.0 STRENGTHS',
                title: 'Core Competitive Advantages of D-Quant 9.0',
                subtitle: '5 Key Differentiators of the Best Virtual Asset Futures Investment Methodology.',
                badge: 'COMPETITIVE EDGE',
                strength1Title: 'Volatility Exploitation Strategy',
                strength1Desc: 'Transform market surges and drops into profit opportunities, not threats. Generate structural returns through Mean Reversion mechanisms.',
                strength2Title: 'Scientific Risk Management',
                strength2Desc: 'Built a multi-layered risk management system with triple defense (Filtering, Hedging, System) and 9-step verification process.',
                strength3Title: 'Advanced AI Learning',
                strength3Desc: 'Beyond simple chart analysis, combines global data usage, macro/micro economics, and LLM-based analysis backup.',
                strength4Title: 'Stable Cash Flow Provision',
                strength4Desc: 'Generate predictable returns with daily 0.3~0.5% profit targets. Block entry on abnormal surges/drops exceeding 30%, prioritizing stability over profitability.',
                strength5Title: 'Conservative Operation Principles',
                strength5Desc: 'Block entry on abnormal surges/drops exceeding 30%, prioritizing stability over profitability.'
            },
            infrastructure: {
                header: 'GLOBAL INFRASTRUCTURE',
                topTier: 'TOP-TIER',
                subtitle: 'Guaranteed stable profit execution with abundant liquidity from verified global exchanges<br>and 24/7 non-stop systems.',
                metric1Title: 'Real-time Monitoring',
                metric1Desc: '365-day continuous market surveillance.',
                metric2Title: 'Verified Data',
                metric2Desc: 'Long-term backtesting verification completed.',
                metric3Title: 'Liquidity & Security',
                metric3Desc: 'Top-tier liquidity and security ratings.'
            },
            footer: {
                home: 'Home',
                simulator: 'Simulator',
                assets: 'My Assets',
                company: 'About Company',
                disclaimer: 'This simulation is provided to help dQuant9 investors and partners understand. Monthly fixed payment and compound interest simulation results are calculated based on investment management contract principles.'
            }
        },
        assets: {
            title: 'My Assets',
            subtitle: 'Check your investment portfolio and asset status',
            comingSoon: 'Coming Soon',
            comingSoonDesc: 'The My Assets page is currently under development.<br>Various asset management features will be available soon.',
            goToSimulation: 'Go to Investment Simulation'
        },
        signup: {
            title: 'Sign Up',
            name: 'Full Name',
            phone: 'Mobile Phone',
            email: 'Email Address',
            invite: 'Invitation Code (Optional)',
            agreePrivacy: 'I agree to the collection and use of personal information (Required)',
            agreeInvestment: 'I agree to the investment collaboration terms and contract (Required)',
            agreeSecurity: 'I pledge to maintain confidentiality and comply with security measures (Required)',
            submit: 'Complete Sign Up'
        },

    }
};

// 현재 언어 설정
let currentNavigationLanguage = 'ko';

// 번역 함수
function translateNavigation(lang) {
    console.log('🌍 translateNavigation 호출됨! 언어:', lang);
    currentNavigationLanguage = lang;
    const translations = navigationTranslations[lang];
    
    if (!translations) {
        console.error('❌ 번역 데이터가 없습니다:', lang);
        return;
    }
    
    console.log('✅ 번역 데이터 로드 성공');
    
    // 모든 data-i18n 속성을 가진 요소 찾기
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`📝 번역할 요소 개수: ${elements.length}`);
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations;
        
        // 중첩된 객체 탐색
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                translation = null;
                break;
            }
        }
        
        if (translation) {
            // innerHTML을 사용하여 HTML 태그 지원 (br 등)
            if (element.tagName === 'INPUT' && element.getAttribute('placeholder') !== null) {
                element.setAttribute('placeholder', translation);
            } else {
                element.innerHTML = translation;
            }
        } else {
            console.warn('⚠️ 번역 키를 찾을 수 없음:', key);
        }
    });
    
    console.log('✅ 번역 완료!');
    
    // 언어 버튼 활성화 상태 업데이트
    document.querySelectorAll('.lang-btn, .lang-toggle-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 i18n-navigation.js 로드됨!');
    
    // 언어 선택 버튼 이벤트 (.lang-btn 및 .lang-toggle-btn 모두 지원)
    const langButtons = document.querySelectorAll('.lang-btn, .lang-toggle-btn');
    console.log(`🔘 언어 버튼 개수: ${langButtons.length}`);
    
    langButtons.forEach(btn => {
        console.log(`🔘 버튼 추가: ${btn.dataset.lang}, 클래스: ${btn.className}`);
        btn.addEventListener('click', function(e) {
            console.log('🖱️ 언어 버튼 클릭됨!', this.dataset.lang);
            const lang = this.dataset.lang;
            translateNavigation(lang);
            
            // 기존 i18n.js의 changeLanguage 함수가 있으면 호출
            if (typeof changeLanguage === 'function') {
                changeLanguage(lang);
            }
        });
    });
    
    // 초기 번역 적용
    console.log('📖 초기 번역 적용 중...');
    translateNavigation(currentNavigationLanguage);
});
