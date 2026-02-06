---
title: "Chapter 6 : n8n AI 에이전트 제작 기초"
tags:
  - 에이전트
  - Agent
  - n8n
  - MCP
  - A2A
  - 컨텍스트엔지니어링
  - 솔라피
  - Solapi
  - CRM
---
#에이전트 #Agent #n8n #MCP #A2A #컨텍스트엔지니어링 #솔라피 #Solapi #CRM

## <font color="#ffc000">Step 1: MCP 작동 원리</font>

![MCP 생태계](https://img1.daumcdn.net/thumb/R1280x0.fwebp/?fname=https://t1.daumcdn.net/brunch/service/user/aPda/image/NSIrbZoRRo8FJ7_1hmy9mc51FGc)

>[!info] MCP(Model Context Protocol)는 AI 애플리케이션이 외부(데이터 소스 및 도구)와 표준화방식으로 소통할 수 있게 하는 클라이언트-서버 프로토콜입니다. USB-C처럼 하나의 표준으로 모든 연결을 가능하게 합니다.

### <font color="#ffc000">1-1. MCP 특징</font>
- AI가 외부와 단절 → 표준화된 연결
- 각기 다른 언어 사용 → 만국 공용어 제공
- 중복 개발 비용 → 개발 비용 절약
- 디지털 바벨탑 → AI를 위한 USB-C 포트
### <font color="#ffc000">1-2. MCP 구조</font>
- MCP 호스트
	- 프로젝트 매니저 - 전체 목표 파악 및 조율
	- AI 애플리케이션 - Claude, Cursor 등
- MCP 클라이언트
	- 연락 담당자 - 1:1 전담 연결 관리
	- 호스트 내부 컴포넌트 - Claude MCP, Curor MCP 등
- MCP 서버
	- 각 분야 전문가 - 특정 도구/데이터 연결
	- 데이터 소스 - Notion, Google Drive 등
	- 도구 - GitHub, 파일 시스템, 웹 검색 등

>[!quote] MCP 작업 예시
>```
>사용자 : 구글 드라이브에서 회의록을 읽고 후속 미팅을 준비해줘.
>```
>```
>호스트 : 사용자 요청 분석
>필요한 MCP 서버 파악 : 구글 드라이브 + 구글 캘린더
>작업 계획 수립
>```
>```
>클라이언트 : MCP 서버 연결
>구글 드라이브 MCP 서버 연결
>구글 캘린더 MCP 서버 연결
>표준 프로토콜로 각 서버와 통신
>```
>```
>서버 : MCP 서버 실행
>Google Drive MCP 서버 → 회의록 파일 검색 및 읽기
>Google Calendar MCP 서버 → 일정 확인 및 미팅 시간 제안
>```

### <font color="#ffc000">1-3. MCP 서버</font>
- 리소스
	- 정보를 읽기 위한 데이터 원천
	- 앱 제어
	- 로컬 파일, DB 기록
- 프롬프트
	- 효율적 사용을 위한 템플릿
	- 사용자 제어
	- 단계별 작업 가이드
- 도구
	- 실제 작업 행동
	- AI 제어
	- 파일 생성, 이메일 발송
- 보안
	- 표준화된 프로토콜
		- 통신 규약
		- JSON-RPC 2.0
	- 샌드박스 환경
		- 격리된 실행 환경
		- 제한된 권한 실행
		- 파일 시스템, 네트워크 접근 제어
- 배포
	- 로컬 MCP 서버
		- 내 컴퓨터에서 실행
		- 로컬 파일 처리 최적화
	- 원격 MCP 서버
		- 클라우드에서 실행
		- HTTP 통신

>[!important] 호스트는 사용자 요청에 따라 사용 가능한 MCP 서버와 도구 목록을 확인합니다. 서버의 코드를 읽을 수 없기 때문에  도구의 이름과 설명(Description)만 보고 선택을 결정합니다. 마치 음식점 메뉴판만 보고 음식을 주문한 것과 비슷합니다.

>[!warning] 나쁜 도구 설명 예시
>```json
>{
>  "name": "search",
>  "description": "검색"
>}
>```
>```
>→ AI가 언제, 어떻게 사용해야 할지 판단 불가
>```

>[!success] 좋은 도구 설명 예시
>```json
>{
>  "name": "search_database",
>  "description": "MySQL 데이터베이스에서 고객 정보를 검색합니다. 이름, 이메일, 전화번호로 검색 가능하며, 부분 일치를 지원합니다. 최대 100개 결과 반환."
>}
>```

## <font color="#ffc000">Step 2: 글로벌 에이전트 설정</font>
### <font color="#ffc000">2-1. When chat message received</font>
- 워크플로우 - 🟢활성화
- 노드 기능 - Chat Trigger
- 노드 이름 - When chat message received
- 노드 설정
    - Make Chat Publicly Available - 🟢활성화
    - Mode - Embedded Chat
    - Authentication - None
    - Options - Add Field
	    - Allowed Origins (CORS) - `*`
### <font color="#ffc000">2-2. Global AI Agent</font>
- 노드 기능 - AI Agent
- 노드 이름 - Global AI Agent
- 노드 설정
	- Source for Prompt - Connected Chat Trigger Node
	- Prompt (User Message) - `{{ $json.chatInput }}`
	- Require Specific Output Format - 🔴비활성화
	- Enable Fallback Model - 🔴비활성화
	- Options - Add Option
		- System Message - ⬇️⬇️⬇️ 아래 참조

```Markdown
## 개요
너는 사용자의 여러 종류의 요청을 처리하는 어시스턴트야. 
너의 역할은 사용자의 요청에 맞는 적절한 도구로 요청을 처리하는 것이야.

사용자의 요청에 의해 
1) 이메일 기능 (이메일 전송, 이메일 답장, 이메일 삭제, 목록 조회, 초안 작성, 읽음 처리)
2) 이메일 라벨 (이메일 라벨 추가, 이메일 라벨 제거) 
3) 연락처 기능 (연락처 조회, 수정, 추가)
4) 스케줄 기능 (캘린더 일정 체크, 일정 조회, 상세내용 조회, 일정 생성, 일정 수정, 일정 삭제)
5) 문자 발송 기능 (SMS 발송, 카카오톡 발송)
을 직접 수행해야 해.

## 도구
- Think Tool: 복합적인 여러가지 업무를 나눠서 처리해야하거나, 진행 간에 막히거나 에러가 발생하는 경우 사용
- Date Time Tool: 날짜 및 시간과 관련된 모든 경우 사용
- Calculator Tool: 계산이 필요한 모든 경우 사용
- Email Tools: 이메일 기능이 필요한 경우 사용 (이메일 전송, 이메일 답장, 이메일 삭제, 목록 조회, 초안 작성, 읽음 처리)
- Label Tools: 이메일 라벨 기능이 필요한 경우 사용 (이메일 라벨 추가, 이메일 라벨 제거)
- Contacts Tools: 연락처 기능이 필요한 경우 사용 (연락처 조회, 수정, 추가)
- Event Tools: 캘린더 기능이 필요한 경우 사용 (캘린더 일정 체크, 일정 조회, 상세내용 조회, 일정 생성, 일정 수정, 일정 삭제)
- SMS Tools: 문자 발송 기능이 필요한 경우 사용 (SMS 발송, 카카오 친구톡 발송)

### Email Tools 도구 목록
- Send Email: 새 이메일 전송
- Reply Email: 수신 메일에 대한 답변 이메일 전송
- Draft Email: 이메일 초안 작성
- List Email: 이메일 목록 검색 및 조회
  - 검색어, 발신자, 날짜 범위 상태로 필터링 가능
- Mark Email: 메일을 읽음 상태로 표시
  - MessageID가 필요하므로, List 도구로 먼저 조회 필수
- Delete Email: 메일 삭제
  - MessageID가 필요하므로, List 도구로 먼저 조회 필수

#### Email Tools 절대 규칙
- 현재 날짜/시간: {{ $now }}
- 모든 이메일은 전문적으로 HTML 형식으로 작성할 것
- 모든 이메일은 "Datawave"로 서명할 것

### Label Tools 도구 목록
- Add Label: 메일에 라벨 추가
  - MessageID가 필요하므로, List 도구로 먼저 조회 필수
  - 추가 가능한 라벨: 결제알림, 광고알림, 뉴스레터, 보안알림, 업무메일
  - 보안알림: Label_1597234543685942092	
  - 결제알림: Label_1799038423469103139
  - 뉴스레터: Label_4049371095390126770
  - 업무메일: Label_4669846905685131528
  - 광고알림: Label_969110601076925077
- Removal Label: 메일에 라벨 삭제
  - MessageID가 필요하므로, List 도구로 먼저 조회 필수
  - 제거 가능한 라벨: 결제알림, 광고알림, 뉴스레터, 보안알림, 업무메일
  - 보안알림: Label_1597234543685942092	
  - 결제알림: Label_1799038423469103139
  - 뉴스레터: Label_4049371095390126770
  - 업무메일: Label_4669846905685131528
  - 광고알림: Label_969110601076925077

#### Label Tools 절대 규칙
- 현재 날짜/시간: {{ $now }}
- 존재하지 않는 라벨을 추가하려고 하면 먼저 사용자에게 라벨 생성을 요청할 것

### Contacts Tools 도구 목록
- Read Contacts: 연락처 정보 조회
- Update Contact: 연락처 정보 업데이트
- Append Contact: 연락처 신규 추가

### Contacts Tools: 절대 규칙
- 현재 날짜/시간: {{ $now }}

### Event Tools 도구 목록
- Check Event: 특정 시간대 일정 체크
- List Event: 일정 조회시 사용
- Create Event: 이벤트를 생성시 사용
- View Event: 특정 이벤트 상세 조회
  - Event ID가 필요하므로,List Event 도구로 먼저 조회 필수
- Update Event: 특정 이벤트 내용 수정
  - Event ID가 필요하므로,List Event 도구로 먼저 조회 필수
- Delete Event: 특정 이벤트 삭제
  - Event ID가 필요하므로,List Event 도구로 먼저 조회 필수

## Event Tool 절대 규칙
- 현재 날짜/시간: {{ $now }}
- 이벤트의 지속 시간이 지정되지 않은 경우 1시간으로 가정

### SMS Tools 도구 목록
- Solapi SMS: 수신자에게 문자 메시지 발송
- Solapi Friends: 수신자에게 카카오 친구톡 발송

## SMS Tools 절대 규칙
- 현재 날짜/시간: {{ $now }}
- 수신자 번호가 지정되지 않은 경우 사용자에게 요청합니다.
- 카카오 친구톡 버튼 형식 (웹링크만 지원):
  - 형식: [{"buttonName":"버튼명","buttonType":"WL","linkMo":"https://..."}]
  - 예시: [{"buttonName":"홈페이지","buttonType":"WL","linkMo":"https://datawave.kr"}]
  - 전화 버튼: {"buttonName":"전화하기","buttonType":"WL","linkMo":"tel:01012345678"}
  - 버튼 없으면: []
  - 최대 5개, 버튼명 14자 이내
  - linkMo 필드 필수 (모바일 웹 URL)

## 작업 원칙
- 절대 직접 답변하지 말 것
- 모든 작업은 반드시 해당 도구를 통해 수행
- 도구 호출 결과만 사용자에게 전달
- 추측이나 가정으로 답변 금지

## 규칙
- 다음 작업 수행 시 먼저 Contacts Tool로 연락처 정보를 조회한 후 진행:
  - 이메일 전송
  - 이메일 초안 작성
  - 참석자를 포함한 캘린더 이벤트 생성
  - 문자 메시지 발송
- 연락처 정보가 없으면 사용자에게 직접 입력 요청

## 세부 지침
1) 사용자 요청에 따라 필요한 도구를 호출할 것
2) 작업을 처리하기 전에 Think 도구를 사용하여 계획을 수립할 것.
3) Think 도구를 이용해서 매 단계별로 올바른 단계를 수행했는지 확인할 것. 매번 호출해야함.
4) 도구 호출 없이는 절대 답변하지 말 것

## 예시
- 입력: Daniel에게 미팅 일정 문의 이메일을 보내야 한다.
  - 작업: Think로 작업 계획 수립
  - 작업: Read Contacts를 사용하여 Daniel의 이메일 주소를 가져온다.
  - 작업: Send Email를 사용하여 이메일을 전송한다. "Daniel에게 이메일을 보내 미팅을 잡을 날짜/시간 물어본다. 그의 이메일 주소는 [이메일 주소]입니다"
- 출력: Daniel에게 이메일이 전송되었어요. 다른 도움이 필요하세요?
```

### <font color="#ffc000">2-3. OpenRouter Chat Model</font>
- 모델 설정 - OpenRouter Chat Model
- 노드 이름 - OpenRouter Chat Model
- 계정 연결 - Credential to connect with
    - Create new credential
	    - API Key - [OpenRouter API Keys](https://openrouter.ai/settings/keys)
- 노드 설정
    - Model - From list - anthropic/claude-sonnet-4.5
### <font color="#ffc000">2-4. Simple Memory</font>
- 메모리 설정 - Simple Memory
- 노드 이름 - Simple Memory
- 노드 설정
	- Session ID - Connected Chat Trigger Node
	- Session Key From Previous Node - `{{ $json.sessionId }}`
	- Context Window Length - 10
### <font color="#ffc000">2-5. Calculator</font>
- 툴 설정 - Calculator
- 노드 이름 - Calculator
### <font color="#ffc000">2-6. Think</font>
- 툴 설정 - Think Tool
- 노드 이름 - Think
- 노드 설정
    - Think Tool Description - 기본값 사용

 >[!quote] Think Tool은 AI 에이전트가 복잡한 작업을 수행할 때 중간 사고 과정을 명시적으로 기록하는 메타인지 도구입니다. Chain-of-Thought 방식으로 단계별 추론 과정을 남기며 작업합니다.

### <font color="#ffc000">2-7. Date Time</font>
- 툴 설정 - Date & Time Tool
- 노드 이름 - Date Time
- 노드 설정
	- Tool Description - Set Automatically
	- Operation - Get Current Date
	- Include Current Time - 🟢활성화
	- Output Field Name - currentDate
	- Options - Add Option
		- Timezone - Asia/Seoul
### <font color="#ffc000">2-8. Webhook</font>
- 노드 기능 - Webhook
- 노드 이름 - Webhook
- 노드 설정
	- Webhook URLs - Production URL
	- HTTP Method - GET
	- Path - assistant
	- Authentication - None
	- Respond - Using 'Response to Wehbook' Node
### <font color="#ffc000">2-9. Response to Webhook</font>
- 노드 기능 - Response to Webhok
- 노드 이름 - Response to Webhok
- 노드 설정
	- Respond With - Text
	- Response Body - ⬇️⬇️⬇️ 아래 참조
	- apiUrl 값을 Chat URL 값으로 변경
	- 예시 - `apiUrl: 'https://daniel8824.app.n8n.cloud/webhook/83178e75-3a70-450d-910b-3f3a1eedd8d0/chat'`

```HTML
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datawave AI | 프리미엄 금융 분석 솔루션</title>
    
    <!-- Meta Tags -->
    <meta name="description" content="NYSE와 LSE 50년 경력, Datawave의 프리미엄 AI 주식 분석 리포트.">
    <meta name="keywords" content="주식분석, 핀테크, AI 투자, 다크모드, Alpha Vantage">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        :root {
            /* Premium Dark Theme Palette */
            --bg-body: #050505;
            --bg-card: #121212;
            --bg-card-hover: #1e1e1e;
            
            --primary: #D4AF37; /* Premium Gold */
            --primary-light: #F4C430;
            --primary-dark: #AA8C2C;
            
            --accent: #2c2c2c;
            
            --text-main: #ffffff;
            --text-muted: #a1a1aa;
            --text-dim: #52525b;
            
            --border: #27272a;
            --border-hover: #D4AF37;
            
            --gradient-hero: radial-gradient(circle at 50% 0%, #2a2a2a 0%, #050505 100%);
            --shadow-glow: 0 0 20px rgba(212, 175, 55, 0.15);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Pretendard', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: var(--bg-body);
            color: var(--text-main);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
            word-break: keep-all;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
        }

        /* Header */
        header {
            position: fixed;
            top: 0; left: 0; right: 0;
            background: rgba(5, 5, 5, 0.85);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 70px;
        }

        .logo {
            display: flex; align-items: center; gap: 10px;
            font-size: 20px; font-weight: 700; color: var(--text-main); text-decoration: none;
            letter-spacing: -0.01em;
        }
        
        .logo-icon {
            color: var(--primary);
            font-size: 22px;
        }

        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-links a {
            color: var(--text-muted); text-decoration: none; font-weight: 500; font-size: 15px; 
            transition: color 0.3s;
        }
        .nav-links a:hover { color: var(--primary); }
        
        .btn-header {
            padding: 10px 20px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: #000 !important;
            border-radius: 6px;
            font-weight: 700;
            font-size: 14px;
            text-decoration: none;
        }
        .btn-header:hover { opacity: 0.9; box-shadow: var(--shadow-glow); }

        /* Hero */
        .hero {
            padding: 160px 0 100px;
            background: var(--gradient-hero);
            text-align: center;
            position: relative;
        }
        
        .hero::after {
            content: '';
            position: absolute;
            top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 800px; height: 600px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 60%);
            pointer-events: none;
            z-index: 0;
        }

        .hero-content { position: relative; z-index: 1; max-width: 840px; margin: 0 auto; }

        .hero-badge {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 6px 14px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            border-radius: 100px;
            font-size: 13px; font-weight: 600; color: var(--primary);
            margin-bottom: 28px;
            backdrop-filter: blur(10px);
        }

        .hero h1 {
            font-size: 56px; font-weight: 800; line-height: 1.2;
            letter-spacing: -0.02em; margin-bottom: 24px; color: var(--text-main);
        }
        
        .hero h1 .highlight {
            background: linear-gradient(to right, #fff 20%, #a1a1aa 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        
        .hero h1 .gold { color: var(--primary); }

        .hero-description {
            font-size: 18px; color: var(--text-muted); margin-bottom: 40px;
            font-weight: 400; line-height: 1.6; max-width: 600px; margin-left: auto; margin-right: auto;
        }
        
        .cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        
        .btn {
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            padding: 14px 28px; border-radius: 8px;
            font-size: 16px; font-weight: 600; text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: var(--primary); color: #000;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
            background: var(--primary-light);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.05); color: var(--text-main);
            border: 1px solid var(--border); backdrop-filter: blur(10px);
        }
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1); border-color: var(--text-muted);
        }

        /* Sections General */
        .section-header { text-align: center; max-width: 700px; margin: 0 auto 60px; }
        .section-badge {
            font-size: 12px; font-weight: 700; letter-spacing: 0.05em; color: var(--primary);
            text-transform: uppercase; margin-bottom: 20px; display: block;
        }
        .section-title { 
            font-size: 36px; font-weight: 700; color: var(--text-main); 
            margin-bottom: 20px; letter-spacing: -0.01em; 
            line-height: 1.3;
        }
        .section-description { font-size: 17px; color: var(--text-muted); line-height: 1.6; }

        /* TradingView Section */
        .tradingview-section {
            padding: 40px 0 80px;
            background: var(--bg-body);
            border-bottom: 1px solid var(--border);
        }
        .tradingview-widget-container {
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        /* Popular Tickers (Grid) */
        .popular-tickers { padding: 100px 0; background: #0a0a0a; }
        
        .tickers-grid {
            display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;
        }
        
        .ticker-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px; padding: 28px 16px;
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
            transition: all 0.3s ease; cursor: pointer;
            position: relative; overflow: hidden; text-align: center;
        }
        
        .ticker-card::before {
            content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
            background: var(--primary); transform: scaleX(0); transition: transform 0.3s ease;
        }
        
        .ticker-card:hover {
            transform: translateY(-4px); border-color: var(--primary);
            background: var(--bg-card-hover); box-shadow: var(--shadow-glow);
        }
        .ticker-card:hover::before { transform: scaleX(1); }

        .ticker-logo { font-size: 36px; margin-bottom: 4px; line-height: 1; }
        .ticker-info h3 { font-size: 18px; color: var(--text-main); margin-bottom: 4px; font-weight: 700; }
        .ticker-info p { font-size: 13px; color: var(--text-muted); margin: 0; }
        
        .ticker-badge {
            padding: 4px 10px; background: rgba(212, 175, 55, 0.1);
            color: var(--primary); border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 100px; font-size: 11px; font-weight: 600;
        }

        .tickers-cta {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            text-align: center;
            padding-top: 60px; border-top: 1px solid var(--border); margin-top: 60px;
        }
        .tickers-cta p { font-size: 18px; color: var(--text-main); margin-bottom: 24px; word-break: keep-all; }

        /* Workflow */
        .workflow { padding: 100px 0; background: var(--bg-body); text-align: center; }
        
        .workflow-image-wrapper {
            margin-top: 40px;
            display: flex;
            justify-content: center;
            width: 100%;
        }
        .workflow-image {
            max-width: 100%;
            height: auto;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            border: 1px solid var(--border);
        }

        /* Features (App Style) */
        .features { padding: 100px 0; background: #0a0a0a; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        
        .feature-card {
            background: var(--bg-card); border: 1px solid var(--border);
            border-radius: 16px; padding: 32px; transition: all 0.3s ease;
            display: flex; flex-direction: column; align-items: flex-start;
        }
        .feature-card:hover { border-color: var(--border-hover); background: var(--bg-card-hover); }
        
        .feature-icon {
            width: 48px; height: 48px;
            background: linear-gradient(135deg, var(--primary) 0%, #8a7018 100%);
            border-radius: 10px; display: flex; align-items: center; justify-content: center;
            font-size: 20px; color: #000; margin-bottom: 20px;
        }
        
        .feature-card h3 { font-size: 18px; color: var(--text-main); margin-bottom: 10px; font-weight: 700; }
        .feature-card p { font-size: 15px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; flex-grow: 1; }
        
        .feature-tags { margin-top: auto; }
        .tag {
            padding: 4px 8px; background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border); border-radius: 4px;
            font-size: 11px; color: var(--text-muted); margin-right: 4px; display: inline-block;
        }

        /* Data Sources Section (New) */
        .sources { padding: 100px 0; background: var(--bg-body); }
        .sources-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .source-card {
            background: var(--bg-card); border: 1px solid var(--border);
            border-radius: 16px; padding: 32px; text-align: center;
            transition: all 0.3s ease;
        }
        .source-card:hover { transform: translateY(-4px); border-color: var(--primary); }
        .source-logo {
            font-size: 32px; color: var(--primary); margin-bottom: 16px;
        }
        .source-card h3 { font-size: 18px; margin-bottom: 8px; color: var(--text-main); }
        .source-card p { font-size: 14px; color: var(--text-muted); }

        /* Framework & Stats */
        .framework { padding: 100px 0; background: #0a0a0a; }
        .framework-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        
        .framework-card {
            background: var(--bg-card); border: 1px solid var(--border);
            border-radius: 12px; padding: 24px; display: flex; align-items: center; justify-content: space-between;
            transition: border-color 0.3s;
        }
        .framework-card:hover { border-color: var(--primary); }
        .framework-card h4 { font-size: 16px; color: var(--text-main); display: flex; align-items: center; gap: 12px; margin: 0; font-weight: 600; }
        .framework-card h4 i { color: var(--primary); width: 24px; text-align: center; }
        
        .stats { padding: 80px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--bg-body); }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .stat-item { text-align: center; }
        .stat-number { font-size: 48px; font-weight: 800; color: var(--primary); margin-bottom: 4px; letter-spacing: -0.02em; }
        .stat-label { font-size: 14px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }

        /* CTA Box */
        .cta-section { padding: 120px 0; background: var(--bg-body); }
        .cta-card {
            background: linear-gradient(145deg, #1a1a1a 0%, #050505 100%);
            border: 1px solid var(--border);
            border-radius: 24px; padding: 60px 40px; text-align: center;
            position: relative; overflow: hidden;
            max-width: 900px; margin: 0 auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }
        
        .cta-card::before {
            content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 60%); pointer-events: none;
        }
        .cta-card::after {
            content: ''; position: absolute; bottom: 0; right: 0; width: 300px; height: 300px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%); pointer-events: none;
        }

        .cta-card h2 { font-size: 32px; font-weight: 700; margin-bottom: 16px; color: var(--text-main); position: relative; z-index: 1; }
        .cta-card p { font-size: 16px; color: var(--text-muted); margin-bottom: 40px; position: relative; z-index: 1; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6; }
        
        .cta-content {
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 60px;
            position: relative; 
            z-index: 1;
            flex-wrap: wrap;
        }
        
        .qr-code-wrapper { 
            background: #fff; 
            padding: 16px; 
            border-radius: 20px; 
            box-shadow: 0 15px 35px rgba(0,0,0,0.3); 
            text-align: center;
        }
        .qr-code-wrapper img { display: block; width: 160px; height: 160px; }
        .qr-code-wrapper p { margin-top: 12px; color: #000; font-size: 13px; font-weight: 800; letter-spacing: 0.05em; }
        
        .cta-buttons-wrapper { 
            text-align: left; 
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        /* Footer */
        footer { padding: 80px 0 40px; background: #080808; border-top: 1px solid #222; }
        .footer-content { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
        .footer-logo { color: var(--text-main); font-weight: 700; font-size: 18px; display: flex; align-items: center; gap: 8px; }
        .footer-links h4 { color: var(--text-main); margin-bottom: 20px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; }
        .footer-links ul { list-style: none; }
        .footer-links li { margin-bottom: 12px; }
        .footer-links a { color: #888; text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .footer-links a:hover { color: var(--primary); }
        
        .social-links { display: flex; gap: 12px; margin-top: 10px; }
        .social-links a { 
            width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
            background: rgba(255,255,255,0.05); color: var(--text-main); border-radius: 8px; transition: all 0.2s;
        }
        .social-links a:hover { background: var(--primary); color: #000; transform: translateY(-2px); }

        /* Responsive */
        @media (max-width: 1024px) {
            .hero h1 { font-size: 42px; }
            .tickers-grid { grid-template-columns: repeat(3, 1fr); }
            .features-grid, .sources-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
            .hero { padding: 120px 0 60px; }
            .hero h1 { font-size: 32px; }
            .tickers-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .features-grid, .sources-grid, .framework-grid, .stats-grid, .footer-content { grid-template-columns: 1fr; }
            .nav-links { display: none; }
            .cta-content { flex-direction: column; gap: 30px; text-align: center; }
            .cta-buttons-wrapper { text-align: center; align-items: center; }
            .ticker-card { padding: 20px 12px; }
        }
    </style>
</head>
<body>

    <!-- Header -->
    <header id="header">
        <div class="container">
            <div class="header-content">
                <a href="#" class="logo">
                    <span class="logo-icon"><i class="fas fa-chart-pie"></i></span>
                    <span>Datawave AI</span>
                </a>
                <nav class="nav-links">
                    <a href="#tickers">시장 현황</a>
                    <a href="#features">분석 도구</a>
                    <a href="#sources">데이터</a>
                    <a href="#framework">투자 전략</a>
                    <a href="#contact" class="btn-header">분석 시작하기</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge">
                    <i class="fas fa-check-circle"></i> 검증된 금융 전문가 AI
                </div>
                <h1>
                    <span class="highlight">현명한 투자자</span>를 위한<br>
                    <span class="gold">프리미엄 AI 분석 리포트</span>
                </h1>
                <p class="hero-description">
                    NYSE & LSE 50년 경력 전문가의 노하우와 최첨단 AI 기술의 만남.<br>
                    Datawave AI가 당신의 포트폴리오를 완벽하게 분석합니다.
                </p>
                <div class="cta-buttons">
                    <a href="#contact" class="btn btn-primary">
                        <i class="fas fa-robot"></i> 무료 분석 받기
                    </a>
                    <a href="#tickers" class="btn btn-secondary">
                        <i class="fas fa-globe"></i> 시장 현황 보기
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- TradingView Widget Section -->
    <section class="tradingview-section">
        <div class="container">
            <div class="tradingview-widget-container">
              <div class="tradingview-widget-container__widget"></div>
              <div class="tradingview-widget-copyright"><a href="https://kr.tradingview.com/markets/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
              <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-tickers.js" async>
              {
              "symbols": [
                { "proName": "NASDAQ:TSLA", "title": "" },
                { "proName": "NASDAQ:NVDA", "title": "" },
                { "proName": "NASDAQ:AAPL", "title": "" },
                { "proName": "NASDAQ:META", "title": "" },
                { "proName": "NASDAQ:AMZN", "title": "" },
                { "proName": "NASDAQ:NFLX", "title": "" },
                { "proName": "NASDAQ:PLTR", "title": "" },
                { "proName": "NASDAQ:MSFT", "title": "" },
                { "proName": "NASDAQ:GOOGL", "title": "" },
                { "proName": "NASDAQ:INTC", "title": "" }
              ],
              "colorTheme": "dark",
              "locale": "kr",
              "largeChartUrl": "",
              "isTransparent": false,
              "showSymbolLogo": true
            }
              </script>
            </div>
        </div>
    </section>

    <!-- Popular Tickers Section -->
    <section class="popular-tickers" id="tickers">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Market Watch</span>
                <h2 class="section-title">핵심 분석 자산</h2>
                <p class="section-description">
                    Datawave AI가 집중 모니터링하는 글로벌 Top 10 테크 기업
                </p>
            </div>

            <div class="tickers-grid">
                <div class="ticker-card" data-ticker="TSLA">
                    <div class="ticker-logo">🚗</div>
                    <div class="ticker-info"><h3>TSLA</h3><p>Tesla, Inc.</p></div>
                    <div class="ticker-badge">EV Leader</div>
                </div>
                <div class="ticker-card" data-ticker="NVDA">
                    <div class="ticker-logo">🎮</div>
                    <div class="ticker-info"><h3>NVDA</h3><p>NVIDIA Corp.</p></div>
                    <div class="ticker-badge">AI Chip</div>
                </div>
                <div class="ticker-card" data-ticker="AAPL">
                    <div class="ticker-logo">🍎</div>
                    <div class="ticker-info"><h3>AAPL</h3><p>Apple Inc.</p></div>
                    <div class="ticker-badge">Tech Giant</div>
                </div>
                <div class="ticker-card" data-ticker="META">
                    <div class="ticker-logo">♾️</div>
                    <div class="ticker-info"><h3>META</h3><p>Meta Platforms</p></div>
                    <div class="ticker-badge">Social</div>
                </div>
                <div class="ticker-card" data-ticker="AMZN">
                    <div class="ticker-logo">📦</div>
                    <div class="ticker-info"><h3>AMZN</h3><p>Amazon.com</p></div>
                    <div class="ticker-badge">E-Commerce</div>
                </div>
                <div class="ticker-card" data-ticker="NFLX">
                    <div class="ticker-logo">🎬</div>
                    <div class="ticker-info"><h3>NFLX</h3><p>Netflix, Inc.</p></div>
                    <div class="ticker-badge">Streaming</div>
                </div>
                <div class="ticker-card" data-ticker="PLTR">
                    <div class="ticker-logo">🔍</div>
                    <div class="ticker-info"><h3>PLTR</h3><p>Palantir</p></div>
                    <div class="ticker-badge">Big Data</div>
                </div>
                <div class="ticker-card" data-ticker="MSFT">
                    <div class="ticker-logo">💻</div>
                    <div class="ticker-info"><h3>MSFT</h3><p>Microsoft</p></div>
                    <div class="ticker-badge">Cloud</div>
                </div>
                <div class="ticker-card" data-ticker="GOOGL">
                    <div class="ticker-logo">🔎</div>
                    <div class="ticker-info"><h3>GOOGL</h3><p>Alphabet</p></div>
                    <div class="ticker-badge">Search</div>
                </div>
                <div class="ticker-card" data-ticker="INTC">
                    <div class="ticker-logo">🔧</div>
                    <div class="ticker-info"><h3>INTC</h3><p>Intel Corp.</p></div>
                    <div class="ticker-badge">Semi</div>
                </div>
            </div>

            <div class="tickers-cta">
                <p>지금 바로 텔레그램 챗봇에게 위 종목에 대한 심층 분석을 요청하세요.</p>
                <a href="https://t.me/daniel8824_testing_bot" target="_blank" rel="noopener nofollow" class="btn btn-primary">
                    <i class="fab fa-telegram-plane"></i> 분석 요청 시작하기
                </a>
            </div>
        </div>
    </section>

    <!-- Workflow Image Section -->
    <section class="workflow">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Processing Core</span>
                <h2 class="section-title">자동화된 인텔리전스</h2>
                <p class="section-description">
                    정량 데이터 수집부터 정성 분석까지, 4단계 완전 자동화 프로세스
                </p>
            </div>
            <div class="workflow-image-wrapper">
                <img src="https://publish-01.obsidian.md/access/384f5b99b4a72111068888340c2a7430/90_Settings/92_Attachments/financial_02.png" alt="n8n Workflow - Datawave Stock Analysis" class="workflow-image">
            </div>
        </div>
    </section>

    <!-- Features Section (Split: Tools) -->
    <section class="features" id="features">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Advanced Tools</span>
                <h2 class="section-title">첨단 분석 도구</h2>
                <p class="section-description">
                    월스트리트 수준의 분석을 가능하게 하는 AI 기반 도구들
                </p>
            </div>

            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-draw-polygon"></i></div>
                    <h3>Chart Pattern AI</h3>
                    <p>Chart-img API로 생성된 차트를 Vision AI가 분석하여 패턴과 매매 시점을 포착합니다.</p>
                    <div class="feature-tags">
                        <span class="tag">Vision AI</span><span class="tag">Pattern</span>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-brain"></i></div>
                    <h3>Gemini Expert Agent</h3>
                    <p>구글의 최신 Gemini 모델이 50년 경력의 월스트리트 전문가 페르소나로 종합 의견을 제시합니다.</p>
                    <div class="feature-tags">
                        <span class="tag">LLM</span><span class="tag">Expert View</span>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-file-alt"></i></div>
                    <h3>Pro Report Gen</h3>
                    <p>복잡한 분석 결과를 한눈에 파악할 수 있는 HTML 포맷의 전문 투자 보고서로 발행합니다.</p>
                    <div class="feature-tags">
                        <span class="tag">HTML</span><span class="tag">JSON</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Data Sources Section (Split: Data) -->
    <section class="sources" id="sources">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Data Engine</span>
                <h2 class="section-title">검증된 데이터 소스</h2>
                <p class="section-description">
                    글로벌 금융 시장의 실시간 데이터를 빈틈없이 수집합니다
                </p>
            </div>

            <div class="sources-grid">
                <div class="source-card">
                    <div class="source-logo"><i class="fas fa-chart-bar"></i></div>
                    <h3>Alpha Vantage Core</h3>
                    <p>TIME_SERIES, INCOME_STATEMENT 등 118개의 전문 금융 지표를 실시간 API로 분석합니다.</p>
                </div>
                <div class="source-card">
                    <div class="source-logo"><i class="fab fa-yahoo"></i></div>
                    <h3>Yahoo Finance API</h3>
                    <p>Tavily Search API를 통해 전 세계 금융 뉴스와 주가 히스토리를 정밀하게 크롤링합니다.</p>
                </div>
                <div class="source-card">
                    <div class="source-logo"><i class="fas fa-newspaper"></i></div>
                    <h3>Investing.com Feed</h3>
                    <p>Firecrawl 기술을 활용하여 Investing.com의 최신 시장 동향과 속보를 즉시 반영합니다.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Framework Section -->
    <section class="framework" id="framework">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Technical Strategy</span>
                <h2 class="section-title">10대 기술적 분석 프레임워크</h2>
                <p class="section-description">
                    Datawave만의 독자적인 기술적 분석 알고리즘
                </p>
            </div>
            <div class="framework-grid">
                <div class="framework-card">
                    <h4><i class="fas fa-chart-bar"></i> Candlestick Pattern</h4>
                    <p class="tag">Trend Signal</p>
                </div>
                <div class="framework-card">
                    <h4><i class="fas fa-wave-square"></i> MACD Oscillator</h4>
                    <p class="tag">Momentum</p>
                </div>
                <div class="framework-card">
                    <h4><i class="fas fa-chart-area"></i> Bollinger Bands</h4>
                    <p class="tag">Volatility</p>
                </div>
                <div class="framework-card">
                    <h4><i class="fas fa-ruler-combined"></i> Fibonacci Retracement</h4>
                    <p class="tag">Support/Resistance</p>
                </div>
                <div class="framework-card">
                    <h4><i class="fas fa-balance-scale-right"></i> OBV Analysis</h4>
                    <p class="tag">Volume Flow</p>
                </div>
                <div class="framework-card">
                    <h4><i class="fas fa-strikethrough"></i> Moving Averages (MA)</h4>
                    <p class="tag">Trend Line</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <section class="stats">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">50+</div><div class="stat-label">Years Experience</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">118</div><div class="stat-label">Analysis Tools</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">10</div><div class="stat-label">Technical Indicators</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">0.1s</div><div class="stat-label">Data Latency</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" id="contact">
        <div class="container">
            <div class="cta-card">
                <h2>더 스마트하게 투자하세요</h2>
                <p>
                    더 이상 감에 의존하지 마세요. 데이터가 증명하는 투자를 시작하세요.<br>
                    Datawave AI 챗봇이 당신의 개인 애널리스트가 되어드립니다.
                </p>
                <div class="cta-content">
                    <div class="qr-code-wrapper">
                        <img src="https://publish-01.obsidian.md/access/384f5b99b4a72111068888340c2a7430/90_Settings/92_Attachments/financial_01.png" alt="Telegram Bot QR Code" width="140">
                        <p style="margin-top: 10px; color: #000; font-size: 12px; font-weight: 700;">SCAN TO START</p>
                    </div>
                    <div class="cta-buttons-wrapper">
                        <a href="https://t.me/daniel8824_testing_bot" target="_blank" rel="noopener nofollow" class="btn btn-primary" style="font-size: 18px; padding: 16px 40px;">
                            <i class="fab fa-telegram-plane"></i> 텔레그램 챗봇 연결
                        </a>
                        <p style="font-size: 13px; color: var(--text-muted); margin-top: 10px;">* 별도의 가입 절차 없이 즉시 사용 가능합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <span class="logo-icon" style="margin-right: 10px;"><i class="fas fa-chart-line"></i></span>
                        <span>Datawave AI</span>
                    </div>
                    <p style="margin-top: 20px; font-size: 14px; color: var(--text-muted); line-height: 1.6;">
                        NYSE & LSE 50년 경력 베테랑 분석가 페르소나<br>
                        Google Gemini & Alpha Vantage 기술 기반
                    </p>
                </div>
                <div class="footer-links">
                    <h4>플랫폼</h4>
                    <ul>
                        <li><a href="#tickers">시장 현황</a></li>
                        <li><a href="#features">분석 도구</a></li>
                        <li><a href="#framework">투자 전략</a></li>
                        <li><a href="#sources">데이터 소스</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>고객 지원</h4>
                    <ul>
                        <li><a href="#">이용 가이드</a></li>
                        <li><a href="#">시스템 상태</a></li>
                        <li><a href="#">문의하기</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>커뮤니티</h4>
                    <div class="social-links" style="margin-top: 10px;">
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-github"></i></a>
                        <a href="https://t.me/daniel8824_testing_bot" target="_blank" rel="noopener nofollow"><i class="fab fa-telegram"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom" style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #222; text-align: center;">
                <p style="font-size: 13px; color: #555;">&copy; 2025 Datawave AI. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script>
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.style.background = 'rgba(5, 5, 5, 0.95)';
            } else {
                header.style.background = 'rgba(5, 5, 5, 0.8)';
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    </script>
</body>
</html>
```

## <font color="#ffc000">Step 3: Email MCP Server</font>
### <font color="#ffc000">3-1. Email MCP Server</font>
- 노드 기능 - MCP Server Trigger
- 노드 이름 - Email MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - Create new credential 
		- 계정 이름 - n8n Bearer account
		- Bearer Token - [UUID](https://www.uuidgenerator.net/) 복사 및 저장
		- Allowed HTTP Request Domains - All
	- Path - email
### <font color="#ffc000">3-2. Email Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Email Tools
- 노드 설정
    - Endpoint
        - Email MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All

### <font color="#ffc000">3-3. Email Tools 도구 목록</font>

> [!quote] Email Tools 도구 목록
>
> **이메일 전송 도구**
> Send Email - 새 이메일 전송
> Reply Email - 수신 메일에 대한 답변 이메일 전송
> Draft Email - 이메일 초안 작성
>
> **이메일 조회 도구**
> List Email - 이메일 목록 검색 및 조회
>
> **이메일 관리 도구**
> Mark Email - 메일을 읽음 상태로 표시
> Delete Email - 메일 삭제

```JSON
{
  "nodes": [
    {
      "parameters": {
        "sendTo": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('To', `수신자 이메일 주소`, 'string') }}",
        "subject": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Subject', `이메일 제목 (형식: [글머리 단어] 이메일 제목, 예시: [문의] 프로젝트 다음 미팅 날짜 및 안건 )`, 'string') }}",
        "message": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Message', `HTML 문자열로 작성된 이메일 본문`, 'string') }}",
        "options": {
          "appendAttribution": false,
          "bccList": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('BCC', `숨은 참조 이메일 주소`, 'string') }}",
          "ccList": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('CC', `참조 이메일 주소`, 'string') }}"
        }
      },
      "type": "n8n-nodes-base.gmailTool",
      "typeVersion": 2.1,
      "position": [
        -80,
        496
      ],
      "id": "ba6b03ea-c18f-4827-adb2-1fdd7ae18f6b",
      "name": "Send Email",
      "webhookId": "9ff4db97-1a33-455e-80bd-b7cd429a96c4",
      "credentials": {
        "gmailOAuth2": {
          "id": "V1EU2knokbFJGeti",
          "name": "Gmail account"
        }
      }
    },
    {
      "parameters": {
        "operation": "reply",
        "messageId": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Message_ID', `답장 보낼 대상 이메일 메세지 ID`, 'string') }}",
        "message": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Message', `HTML 문자열로 작성된 이메일 본문`, 'string') }}",
        "options": {
          "appendAttribution": false,
          "bccList": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('BCC', `답장 보낼 숨은 참조 이메일 주소`, 'string') }}",
          "ccList": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('CC', `답장 보낼 참조 이메일 주소`, 'string') }}"
        }
      },
      "type": "n8n-nodes-base.gmailTool",
      "typeVersion": 2.1,
      "position": [
        48,
        496
      ],
      "id": "c8c810e8-ac15-44a8-b0f1-60dfa4928d96",
      "name": "Reply Email",
      "webhookId": "8efff97e-01ae-4198-894d-542379fce027",
      "credentials": {
        "gmailOAuth2": {
          "id": "V1EU2knokbFJGeti",
          "name": "Gmail account"
        }
      }
    },
    {
      "parameters": {
        "resource": "draft",
        "subject": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Subject', `이메일 제목 (형식: [글머리 단어] 이메일 제목, 예시: [문의] 프로젝트 다음 미팅 날짜 및 안건 )`, 'string') }}",
        "emailType": "html",
        "message": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Message', `HTML 문자열로 작성된 이메일 본문`, 'string') }}",
        "options": {
          "bccList": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('BCC', `숨은 참조 이메일 주소`, 'string') }}",
          "ccList": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('CC', `참조 이메일 주소`, 'string') }}",
          "threadId": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Thread_ID', `이메일 스레드 ID`, 'string') }}",
          "sendTo": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('To_Email', `수신자 이메일 주소`, 'string') }}"
        }
      },
      "type": "n8n-nodes-base.gmailTool",
      "typeVersion": 2.1,
      "position": [
        176,
        496
      ],
      "id": "21489d24-c99b-4976-a906-9ae7f6c401fb",
      "name": "Draft Email",
      "webhookId": "8efff97e-01ae-4198-894d-542379fce027",
      "credentials": {
        "gmailOAuth2": {
          "id": "V1EU2knokbFJGeti",
          "name": "Gmail account"
        }
      }
    },
    {
      "parameters": {
        "operation": "getAll",
        "limit": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Limit', `조회할 이메일 개수`, 'number') }}",
        "filters": {
          "q": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Search', `이메일 검색어 필터링`, 'string') }}",
          "receivedAfter": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Received_After', `기준 날짜 이후 이메일만 조회하도록 필터링`, 'string') }}",
          "receivedBefore": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Received_Before', `기준 날짜 이전 이메일만 조회하도록 필터링`, 'string') }}",
          "sender": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Sender', `보낸 사람만 조회하도록 필터링`, 'string') }}"
        }
      },
      "type": "n8n-nodes-base.gmailTool",
      "typeVersion": 2.1,
      "position": [
        -80,
        688
      ],
      "id": "e7138b73-aeeb-4ab6-8411-dbcc21d66898",
      "name": "List Email",
      "webhookId": "8efff97e-01ae-4198-894d-542379fce027",
      "credentials": {
        "gmailOAuth2": {
          "id": "V1EU2knokbFJGeti",
          "name": "Gmail account"
        }
      }
    },
    {
      "parameters": {
        "operation": "markAsRead",
        "messageId": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Message_ID', `이메일 메세지 ID`, 'string') }}"
      },
      "type": "n8n-nodes-base.gmailTool",
      "typeVersion": 2.1,
      "position": [
        48,
        688
      ],
      "id": "45b5c242-1ee6-44ab-84fd-835ad66ce90e",
      "name": "Mark Email",
      "webhookId": "4c89e39d-52ad-4063-8608-b0405f47086e",
      "credentials": {
        "gmailOAuth2": {
          "id": "V1EU2knokbFJGeti",
          "name": "Gmail account"
        }
      }
    },
    {
      "parameters": {
        "operation": "delete",
        "messageId": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Message_ID', `삭제할 메일 ID`, 'string') }}"
      },
      "type": "n8n-nodes-base.gmailTool",
      "typeVersion": 2.1,
      "position": [
        176,
        688
      ],
      "id": "a0f1d0de-8494-487c-b8ea-fdc2f32016e0",
      "name": "Delete Email",
      "webhookId": "4c89e39d-52ad-4063-8608-b0405f47086e",
      "credentials": {
        "gmailOAuth2": {
          "id": "V1EU2knokbFJGeti",
          "name": "Gmail account"
        }
      }
    }
  ],
  "connections": {
    "Send Email": {
      "ai_tool": [
        []
      ]
    },
    "Reply Email": {
      "ai_tool": [
        []
      ]
    },
    "Draft Email": {
      "ai_tool": [
        []
      ]
    },
    "List Email": {
      "ai_tool": [
        []
      ]
    },
    "Mark Email": {
      "ai_tool": [
        []
      ]
    },
    "Delete Email": {
      "ai_tool": [
        []
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "ed29603280f689e433d162d6eb2f4c0ef594feb614602d9f72d06ccb3a8d3e19"
  }
}
```

## <font color="#ffc000">Step 4: Label MCP Server</font>
### <font color="#ffc000">4-1. Label MCP Server</font>
- 노드 기능 - MCP Server Trigger
- 노드 이름 - Label MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Path - label
### <font color="#ffc000">4-2. Label Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Label Tools
- 노드 설정
    - Endpoint
        - Label MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All
### <font color="#ffc000">4-3. Label Tools 도구 목록</font>

> [!example] Label Tools 도구 목록
> 
>라벨 관리 도구
> Add Label - 메일에 라벨 추가
> Remove Label - 메일에서 라벨 제거

> [!danger] 메일 라벨 ID 확인
> Gmail 메일함 설정에서 라벨 생성
> Gmail Tool에서 Get many labels 선택
> Return All 활성화 후 Execute step
> Label ID가 Label 로 시작하는 라벨 정리

```JSON
{
  "nodes": [
    {
      "parameters": {
        "operation": "addLabels",
        "messageId": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Message_ID', `라벨을 추가할 메일 ID`, 'string') }}",
        "labelIds": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Label_Names_or_IDs', `보안알림: Label_1597234543685942092\t\n결제알림: Label_1799038423469103139\n뉴스레터: Label_4049371095390126770\n업무메일: Label_4669846905685131528\n광고알림: Label_969110601076925077`, 'string') }}"
      },
      "type": "n8n-nodes-base.gmailTool",
      "typeVersion": 2.1,
      "position": [
        320,
        496
      ],
      "id": "20ed56bf-5aee-452d-847d-05033bc4020e",
      "name": "Add Label",
      "webhookId": "4c89e39d-52ad-4063-8608-b0405f47086e",
      "credentials": {
        "gmailOAuth2": {
          "id": "V1EU2knokbFJGeti",
          "name": "Gmail account"
        }
      }
    },
    {
      "parameters": {
        "operation": "removeLabels",
        "messageId": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Message_ID', `라벨을 삭제할 메일 ID`, 'string') }}",
        "labelIds": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Label_Names_or_IDs', `보안알림: Label_1597234543685942092\t\n결제알림: Label_1799038423469103139\n뉴스레터: Label_4049371095390126770\n업무메일: Label_4669846905685131528\n광고알림: Label_969110601076925077`, 'string') }}"
      },
      "type": "n8n-nodes-base.gmailTool",
      "typeVersion": 2.1,
      "position": [
        464,
        496
      ],
      "id": "7dee8da8-544a-4b7a-90cc-f66b5d2d59b6",
      "name": "Remove Label",
      "webhookId": "4c89e39d-52ad-4063-8608-b0405f47086e",
      "credentials": {
        "gmailOAuth2": {
          "id": "V1EU2knokbFJGeti",
          "name": "Gmail account"
        }
      }
    }
  ],
  "connections": {
    "Add Label": {
      "ai_tool": [
        []
      ]
    },
    "Remove Label": {
      "ai_tool": [
        []
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "ed29603280f689e433d162d6eb2f4c0ef594feb614602d9f72d06ccb3a8d3e19"
  }
}
```

## <font color="#ffc000">Step 5: Contacts MCP Server</font>
### <font color="#ffc000">5-1. Contacts MCP Server</font>
- 노드 기능 - MCP Server Trigger
- 노드 이름 - Contacts MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Path - contacts
### <font color="#ffc000">5-2. Contacts Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Contracts Tools
- 노드 설정
    - Endpoint
        - Contacts MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All
### <font color="#ffc000">5-3. Contacts Tools 도구 목록</font>

> [!note] Contacts Tools 도구 목록
> **연락처 조회 도구**
> Read Contacts - 연락처 목록 조회
>
> **연락처 추가 도구**
> Append Contact - 새로운 연락처 추가
>
> **연락처 수정 도구**
> Update Contact - 기존 연락처 정보 업데이트

> [!Check] 시트 연동 및 초기화 문제
> Document 재설정 시 기존 AI 매핑 초기화
> 코드 파일 복사 붙여넣기 후 예시에 따라 세팅

```JSON
{
  "nodes": [
    {
      "parameters": {
        "operation": "update",
        "documentId": {
          "__rl": true,
          "value": "1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs",
          "mode": "list",
          "cachedResultName": "Contacts",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "시트1",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs/edit#gid=0"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "name": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('name__using_to_match_', `업데이트를 위해 매핑할 이름값`, 'string') }}",
            "phone": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('phone', `연락처 대상자 휴대폰 번호`, 'string') }}",
            "email": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('email', `연락처 대상자 이메일 주소`, 'string') }}",
            "department": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('department', `연락처 대상자 소속 부서`, 'string') }}",
            "task_completion": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('task_completion', `연락처 대상자 작업 완료 여부`, 'string') }}",
            "start_date": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('start_date', `연락처 대상자 입사 날짜`, 'string') }}"
          },
          "matchingColumns": [
            "name"
          ],
          "schema": [
            {
              "id": "name",
              "displayName": "name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "phone",
              "displayName": "phone",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "email",
              "displayName": "email",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "department",
              "displayName": "department",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "start_date",
              "displayName": "start_date",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "task_completion",
              "displayName": "task_completion",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "row_number",
              "displayName": "row_number",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "number",
              "canBeUsedToMatch": true,
              "readOnly": true,
              "removed": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheetsTool",
      "typeVersion": 4.7,
      "position": [
        752,
        496
      ],
      "id": "87ec6361-5a44-4a21-a22b-0f239e721d2e",
      "name": "Update Contact",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "KKndhIOqMyfVMSRi",
          "name": "Google Sheets account"
        }
      }
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": {
          "__rl": true,
          "value": "1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs",
          "mode": "list",
          "cachedResultName": "Contacts",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "시트1",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs/edit#gid=0"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "name": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('name', `연락처 대상자 이름`, 'string') }}",
            "phone": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('phone', `연락처 대상자 휴대폰 번호`, 'string') }}",
            "email": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('email', `연락처 대상자 이메일 주소`, 'string') }}",
            "department": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('department', `연락처 대상자 소속 부서`, 'string') }}",
            "task_completion": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('task_completion', `연락처 대상자 작업 완료 여부`, 'string') }}",
            "start_date": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('start_date', `연락처 대상자 입사 날짜`, 'string') }}"
          },
          "matchingColumns": [
            "name"
          ],
          "schema": [
            {
              "id": "name",
              "displayName": "name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "phone",
              "displayName": "phone",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "email",
              "displayName": "email",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "department",
              "displayName": "department",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "start_date",
              "displayName": "start_date",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "task_completion",
              "displayName": "task_completion",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheetsTool",
      "typeVersion": 4.7,
      "position": [
        896,
        496
      ],
      "id": "c60d3d85-094f-4367-a8b3-645639c25412",
      "name": "Append Contact",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "KKndhIOqMyfVMSRi",
          "name": "Google Sheets account"
        }
      }
    },
    {
      "parameters": {
        "documentId": {
          "__rl": true,
          "value": "1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs",
          "mode": "list",
          "cachedResultName": "Contacts",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "시트1",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs/edit#gid=0"
        },
        "options": {
          "dataLocationOnSheet": {
            "values": {
              "rangeDefinition": "specifyRangeA1",
              "range": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Range', `조회할 셀 범위 지정`, 'string') }}"
            }
          }
        }
      },
      "type": "n8n-nodes-base.googleSheetsTool",
      "typeVersion": 4.7,
      "position": [
        624,
        496
      ],
      "id": "1c3165dd-ee8d-4715-b0c9-51892a6ede3f",
      "name": "Read Contacts1",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "KKndhIOqMyfVMSRi",
          "name": "Google Sheets account"
        }
      }
    }
  ],
  "connections": {
    "Update Contact": {
      "ai_tool": [
        []
      ]
    },
    "Append Contact": {
      "ai_tool": [
        []
      ]
    },
    "Read Contacts1": {
      "ai_tool": [
        []
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "ed29603280f689e433d162d6eb2f4c0ef594feb614602d9f72d06ccb3a8d3e19"
  }
}
```

## <font color="#ffc000">Step 6: Event MCP Server</font>
### <font color="#ffc000">6-1. Event MCP Serverr</font>
- 노드 기능 - MCP Server Trigger
- 노드 이름 - Event MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Path - event
### <font color="#ffc000">6-2. Event Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Event Tools
- 노드 설정
    - Endpoint
        - Event MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All
### <font color="#ffc000">6-3. Event Tools 도구 목록</font>

> [!info] Event Tools 도구 목록
> **일정 생성 도구**
> Create Event - 새로운 일정 생성
>
> **일정 조회 도구**
> List Event - 일정 목록 조회
> View Event - 특정 일정 상세 조회
> Check Event - 특정 시간대 일정 가능 여부 확인
>
> **일정 관리 도구**
> Update Event - 기존 일정 수정
> Delete Event - 일정 삭제

```JSON
{
  "nodes": [
    {
      "parameters": {
        "resource": "calendar",
        "calendar": {
          "__rl": true,
          "value": "i6435862@gmail.com",
          "mode": "list",
          "cachedResultName": "i6435862@gmail.com"
        },
        "timeMin": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Start_Time', `확인 시작 시간 (사용자 요청에 따라 결정)`, 'string') }}",
        "timeMax": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('End_Time', `확인 종료 시간 (사용자 요청에 따라 결정)`, 'string') }}",
        "options": {}
      },
      "type": "n8n-nodes-base.googleCalendarTool",
      "typeVersion": 1.3,
      "position": [
        1040,
        496
      ],
      "id": "8ad55fa5-a5b4-4346-a163-639522599a8e",
      "name": "Check Event",
      "credentials": {
        "googleCalendarOAuth2Api": {
          "id": "W6JuRay10hnrXIMV",
          "name": "Google Calendar account"
        }
      }
    },
    {
      "parameters": {
        "operation": "getAll",
        "calendar": {
          "__rl": true,
          "value": "i6435862@gmail.com",
          "mode": "list",
          "cachedResultName": "i6435862@gmail.com"
        },
        "limit": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Limit', `조회할 일정 개수`, 'number') }}",
        "timeMin": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('After', `확인 시작 시간 (사용자 요청에 따라 결정)`, 'string') }}",
        "timeMax": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Before', `확인 종료 시간 (사용자 요청에 따라 결정)`, 'string') }}",
        "options": {}
      },
      "type": "n8n-nodes-base.googleCalendarTool",
      "typeVersion": 1.3,
      "position": [
        1152,
        496
      ],
      "id": "a8fa96f1-a806-4c4a-b6cf-83631eaa5669",
      "name": "List Event",
      "credentials": {
        "googleCalendarOAuth2Api": {
          "id": "W6JuRay10hnrXIMV",
          "name": "Google Calendar account"
        }
      }
    },
    {
      "parameters": {
        "operation": "update",
        "calendar": {
          "__rl": true,
          "value": "i6435862@gmail.com",
          "mode": "list",
          "cachedResultName": "i6435862@gmail.com"
        },
        "eventId": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Event_ID', `스케줄 ID`, 'string') }}",
        "updateFields": {
          "attendeesUi": {
            "values": {
              "attendees": [
                "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('attendees0_Attendees', `추가할 참석자`, 'string') }}"
              ]
            }
          },
          "description": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Description', `수정할 스케줄 설명`, 'string') }}",
          "end": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('End', `수정할 종료 일자 (e.g. 2025-08-11 00:00:00)`, 'string') }}",
          "location": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Location', `수정한 스케줄 장소`, 'string') }}",
          "start": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Start', `수정할 시작 일자 (e.g. 2025-08-18 00:00:00)`, 'string') }}",
          "summary": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Summary', `수정할 스케줄 요약`, 'string') }}"
        }
      },
      "type": "n8n-nodes-base.googleCalendarTool",
      "typeVersion": 1.3,
      "position": [
        1152,
        672
      ],
      "id": "573641d5-cdba-4877-bc6e-487c112c88c1",
      "name": "Update Event",
      "credentials": {
        "googleCalendarOAuth2Api": {
          "id": "W6JuRay10hnrXIMV",
          "name": "Google Calendar account"
        }
      }
    },
    {
      "parameters": {
        "operation": "delete",
        "calendar": {
          "__rl": true,
          "value": "i6435862@gmail.com",
          "mode": "list",
          "cachedResultName": "i6435862@gmail.com"
        },
        "eventId": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Event_ID', `삭제할 스케줄 ID`, 'string') }}",
        "options": {}
      },
      "type": "n8n-nodes-base.googleCalendarTool",
      "typeVersion": 1.3,
      "position": [
        1264,
        672
      ],
      "id": "d1841699-5f9d-494b-bae8-f86ba5a02515",
      "name": "Delete Event",
      "credentials": {
        "googleCalendarOAuth2Api": {
          "id": "W6JuRay10hnrXIMV",
          "name": "Google Calendar account"
        }
      }
    },
    {
      "parameters": {
        "calendar": {
          "__rl": true,
          "value": "i6435862@gmail.com",
          "mode": "list",
          "cachedResultName": "i6435862@gmail.com"
        },
        "start": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Start', `스케줄 시작일자 (e.g. 2025-08-11 00:00:00)`, 'string') }}",
        "end": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('End', `스케줄 종료일자(e.g. 2025-08-11  00:00:00)`, 'string') }}",
        "additionalFields": {
          "attendees": [
            "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('attendees0_Attendees', `스케줄 참석자`, 'string') }}"
          ],
          "description": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Description', `스케줄 설명`, 'string') }}",
          "location": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Location', `스케줄 장소`, 'string') }}",
          "summary": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Summary', `스케줄 요약`, 'string') }}"
        }
      },
      "type": "n8n-nodes-base.googleCalendarTool",
      "typeVersion": 1.3,
      "position": [
        1040,
        672
      ],
      "id": "f7e87a46-6158-4b76-adbd-c43303ed2d86",
      "name": "Create Event",
      "credentials": {
        "googleCalendarOAuth2Api": {
          "id": "W6JuRay10hnrXIMV",
          "name": "Google Calendar account"
        }
      }
    },
    {
      "parameters": {
        "operation": "get",
        "calendar": {
          "__rl": true,
          "value": "i6435862@gmail.com",
          "mode": "list",
          "cachedResultName": "i6435862@gmail.com"
        },
        "eventId": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Event_ID', `스케줄 ID`, 'string') }}",
        "options": {
          "returnNextInstance": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Return_Next_Instance_of_Recurring_Event', `반복 혹은 단독 일정 확인`, 'boolean') }}"
        }
      },
      "type": "n8n-nodes-base.googleCalendarTool",
      "typeVersion": 1.3,
      "position": [
        1264,
        496
      ],
      "id": "07bb6fa9-bbdd-466a-91f2-e8930b3efe86",
      "name": "View Event",
      "credentials": {
        "googleCalendarOAuth2Api": {
          "id": "W6JuRay10hnrXIMV",
          "name": "Google Calendar account"
        }
      }
    }
  ],
  "connections": {
    "Check Event": {
      "ai_tool": [
        []
      ]
    },
    "List Event": {
      "ai_tool": [
        []
      ]
    },
    "Update Event": {
      "ai_tool": [
        []
      ]
    },
    "Delete Event": {
      "ai_tool": [
        []
      ]
    },
    "Create Event": {
      "ai_tool": [
        []
      ]
    },
    "View Event": {
      "ai_tool": [
        []
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "ed29603280f689e433d162d6eb2f4c0ef594feb614602d9f72d06ccb3a8d3e19"
  }
}
```

## <font color="#ffc000">Step 7: SMS MCP Server</font>
### <font color="#ffc000">7-1. SMS MCP Server</font>
- 노드 기능 - MCP Server Trigger
- 노드 이름 - SMS MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Path - sms
### <font color="#ffc000">7-2. SMS Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - SMS Tools
- 노드 설정
    - Endpoint
        - SMS MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All
### <font color="#ffc000">7-3. SMS Tools 도구 목록</font>

> [!important] SMS Tools 도구 목록
> 문자 발송 도구
> Solapi SMS - 일반 SMS 문자 발송
> Solapi Friends - 카카오톡 친구톡 발송

> [!quote] 별도 노드 설치 및 채널 가입
> 노드 패널 - Solapi 검색 - 인스톨 노드
> [Solapi](https://solapi.com) 회원가입 및 로그인 - 대시보드
> 새로운 API Key - API Key 복사 및 붙여넣기
> Secret 조회 - API Secret 복사 및 붙여넣기
> 카카오톡 사용하려면 [비즈니스 채널 가입](https://business.kakao.com)

```JSON
{
  "nodes": [
    {
      "parameters": {
        "authentication": "apiKey",
        "to": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('To', `수신자 휴대폰 번호`, 'string') }}",
        "from": "01032018824",
        "text": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Text', `SMS 내용`, 'string') }}",
        "subject": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Subject', `SMS 제목`, 'string') }}"
      },
      "type": "n8n-nodes-solapi.solapiTool",
      "typeVersion": 1,
      "position": [
        1408,
        496
      ],
      "id": "f72065ca-a9ad-4635-96fe-d9c773eb92ec",
      "name": "Solapi SMS",
      "credentials": {
        "solapiApiKeyApi": {
          "id": "P677HmMeytcV4v0W",
          "name": "Solapi Key account"
        }
      }
    },
    {
      "parameters": {
        "authentication": "apiKey",
        "operation": "sendKakaoCTA",
        "to": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('To', `수신자 휴대폰 번호`, 'string') }}",
        "text": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Text', `SMS 내용`, 'string') }}",
        "channelId": "KA01PF251208091350483Ia5bPS3PtZX",
        "fromForKakao": "01032018824",
        "buttonsJson": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Buttons__JSON_Array_', `버튼 목록 (JSON Array). 웹링크만 지원.\n형식: [{\"buttonName\":\"버튼명\",\"buttonType\":\"WL\",\"linkMo\":\"https://...\"}]\n전화: {\"buttonName\":\"전화\",\"buttonType\":\"WL\",\"linkMo\":\"tel:01012345678\"}\n버튼 없음: []\n최대 5개, 버튼명 14자 이내`, 'string') }}"
      },
      "type": "n8n-nodes-solapi.solapiTool",
      "typeVersion": 1,
      "position": [
        1552,
        496
      ],
      "id": "e091da0d-f475-44a4-b2fc-96c3f63f197a",
      "name": "Solapi Friends",
      "credentials": {
        "solapiApiKeyApi": {
          "id": "P677HmMeytcV4v0W",
          "name": "Solapi Key account"
        }
      }
    }
  ],
  "connections": {
    "Solapi SMS": {
      "ai_tool": [
        []
      ]
    },
    "Solapi Friends": {
      "ai_tool": [
        []
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "ed29603280f689e433d162d6eb2f4c0ef594feb614602d9f72d06ccb3a8d3e19"
  }
}
```

## <font color="#ffc000">Step 8: Genspark MCP Server</font>
### <font color="#ffc000">8-1. 젠스파크 MCP 추가</font>
- 새로운 MCP 서버 추가
	- Genspark - 도구 선택 - 추가
	- 새로운 MCP 서버 추가
	- Email MCP, Label MCP, Contacts MCP, Event MCP, SMS MCP 
		- 서버 이름 - 각 MCP 이름
		- 서버 유형 - SSE
		- 서버 URL - 각 MCP 엔드포인트
			- 예시 - `https://daniel8824.app.n8n.cloud/mcp/stock`
		- 설명 - 각 MCP 설명
		- 요청 헤더 - `{"Authorization": "Bearer MY_N8N_AUTH_TOKEN"}`

## <font color="#ffc000">실습 파일</font>
### <font color="#ffc000"> 관련 파일 및 URL</font>
- [Personal Assistant 워크플로우](https://github.com/daniel8824-del/n8n-datawave/blob/ca81427a74cc0b258c18e161ba3cfca1e96a81c2/Personal%20Assistant.json) - Download raw file
	- Create workflow - Import from File - Personal Assistant.json

