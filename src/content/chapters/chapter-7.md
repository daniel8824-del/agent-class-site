---
title: "Chapter 7 : n8n AI 에이전트 제작 기초"
tags:
  - 에이전트
  - Agent
  - n8n
  - MCP
  - A2A
  - 컨텍스트엔지니어링
  - 텔레그램
  - Telegram
---
#에이전트 #Agent #n8n #MCP #A2A #컨텍스트엔지니어링 #텔레그램 #Telegram 

## <font color="#ffc000">Step 1: 텔레그램 챗봇 세팅</font>
### <font color="#ffc000">1-1. Telegram Trigger</font>
- 노드 기능 - Telegram Trigger - On message
- 노드 이름 - Telegram Trigger
- 계정 연결 - Credential to connect with
    - Create new credential
        - 계정 이름 - Telegram Financial
        - Access Token - ⬇️⬇️⬇️ 1-2. Telegram Desktop 참고
        - Base URL - `https://api.telegram.org`
- 노드 설정
	- Webhook URLs - Production URL
	- Trigger On - message
### <font color="#ffc000">1-2. Telegram Desktop</font>
- 텔레그램 Mobile 앱 설치 - 계정 생성 - 로그인
- 텔레그램 Desktop 앱 설치 
	- https://desktop.telegram.org
	- 모바일 앱 접속 - 설정 - 기기 - 데스트탑 기기 연결 - QR코드 인증
- 텔레그램 BotFather 검색 및 실행
	- https://telegram.me/BotFather - START BOT 클릭
	- `/newbot` 명령어 입력 후 Bot 이름 설정 
		- 예시 -  Financial_Adviser_n8n_Bot
	- BotFather 답변 중에서 Access Token 확인 후 n8n 계정 연결
- 텔레그램 채팅창 실행
	- BotFather 답변 중에서 채팅창 URL 확인 후 START 클릭
### <font color="#ffc000">1-3. Switch</font>
- 노드 기능 - Switch  
- 노드 이름 - Switch
- 노드 설정
	- Mode - Rules
	- Routing Rules - Add Routing Rule
		- Vaule1 - `{{ $json.message.text }}`
		- String - exists
		- Rename Output - 🟢활성화
		- Output Name - 텍스트
	- Routing Rules - Add Routing Rule
		- Vaule1 - `{{ $json.message.voice.mime_type }}`
		- String - contains
		- Value2 - `audio`
		- Rename Output - 🟢활성화
		- Output Name - 오디오
	- Convert types where required - 🟢활성화
### <font color="#ffc000">1-4. Text Fields</font>
- 노드 기능 - Edit Fields (Set)
- 노드 이름 - Edit Fields
- 노드 연결 - Switch (텍스트) ▶️ Text Fields
- 계정 연결 - Credential to connect with - Telegram Financial
- 노드 설정
	- Mode - Manual Mapping
	- Fields to Set
		- `query` - String - `{{ $json.message.text }}`
	- Include Other Input Fields - 🔴비활성화
	- Options - Add Option
		- Ignore Type Conversion Errors - 🟢활성화
### <font color="#ffc000">1-5. Get a file</font>
- 노드 기능 - Telegram - Get a file
- 노드 이름 - Get a file
- 노드 연결 - Switch (오디오) ▶️ Get a file
- 계정 연결 - Credential to connect with
- 노드 설정
	- Resource - File
	- Operation - Get
	- File ID - `{{ $json.message.voice.file_id }}
	- Download - 🟢활성화`
### <font color="#ffc000">1-6. Transcribe a recording</font>
- 노드 기능 - OpenAI - Transcribe a recording
- 노드 이름 - Transcribe a recording
- 계정 연결 - Credential to connect with
    - Create new credential
	    - API Key - [OpenAI 플랫폼 API Keys](https://platform.openai.com/settings/organization/api-keys)
- 노드 설정
    - Input Data Field Name - data
### <font color="#ffc000">1-7. Audio Fields</font>
- 노드 기능 - Edit Fields (Set)
- 노드 이름 - Edit Fields
- 노드 설정
	- Mode - Manual Mapping
	- Fields to Set
		- `query` - String - `{{ $json.text }}`
	- Include Other Input Fields - 🔴비활성화
	- Options - Add Option
		- Ignore Type Conversion Errors - 🟢활성화

## <font color="#ffc000">Step 2: AI 에이전트 설정</font>
### <font color="#ffc000">2-1. AI Agent</font>
- 노드 기능 - AI Agent
- 노드 이름 - AI Agent
- 노드 설정
	- Source for Prompt (User Message) - Define below
	- Prompt (User Message) - `{{ $json.query }}`
	- Require Specific Output Format - 🔴비활성화
	- Enable Fallback Model - 🔴비활성화
	- Options - Add Option
		- System Message - [[Investing.com RSS 피드 프롬프트]]
		- Max Iterations - 20
		- Return Intermediate Steps - 🔴비활성화
		- Enable Streaming - 🔴비활성화
		- Batch Processing - Batch Size - 1
### <font color="#ffc000">2-2. OpenRouter Chat Model</font>
- 모델 설정 - OpenRouter Chat Model
- 노드 이름 - OpenRouter Chat Model
- 계정 연결 - Credential to connect with
    - Create new credential
	    - API Key - [OpenRouter API Keys](https://openrouter.ai/settings/keys)
- 노드 설정
    - Model - From list - anthropic/claude-sonnet-4.5`
### <font color="#ffc000">2-3. Simple Memory</font>
- 메모리 설정 - Simple Memory
- 노드 이름 - Simple Memory
- 노드 설정
	- Session ID - Define Below
	- Key - `{{ $('Telegram Trigger').item.json.message.chat.id }}`
	- Context Window Length - 5
### <font color="#ffc000">2-4. Think</font>
- 툴 설정 - Think Tool
- 노드 이름 - Think
- 노드 설정
    - Think Tool Description - 기본값 사용

 >[!quote] Think Tool은 AI 에이전트가 복잡한 작업을 수행할 때 중간 사고 과정을 명시적으로 기록하는 메타인지 도구입니다. Chain-of-Thought 방식으로 단계별 추론 과정을 남기며 작업합니다.

![[Pasted image 20251210161902.png]]
## <font color="#ffc000">Step 3: Yahoo MCP 설정</font>
### <font color="#ffc000">3-1. Yahoo MCP Server</font>
- 워크플로우 - 🟢활성화
- 노드 기능 - MCP Server Trigger
- 노드 이름 - Yahoo MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - Create new credential 
		- 계정 이름 - n8n Bearer account
		- Bearer Token - [UUID](https://www.uuidgenerator.net/) 복사 및 저장
		- Allowed HTTP Request Domains - All
	- Path - yahoo
### <font color="#ffc000">3-2. Internet Search</font>
- 툴 설정 - HTTP Request Tool
- 노드 이름 - Internet Search
- 노드 연결 - Yahoo MCP Server (Tools) ▶️ Internet Search
- 참조 문서 - [API Reference](https://docs.tavily.com/documentation/api-reference/endpoint/search)
- 노드 설정
	- Description - `인터넷을 활용해 특정 회사에 대한 추가 리서치가 필요할 때 사용하며, 필요한 정보를 수집한다.`
	- Method - POST
	- URL - `https://api.tavily.com/search`
	- Authentication - Generic Credential Type
	- Generic Auth Type - Header Auth
	- Header Auth - Create new credential
		- 계정 이름 - Header Tavily account
		- API 키 발급 - [Tavily API Keys](https://app.tavily.com/home#)
		- Name - Authorization
		- Value - `Bearer YOUR_TAVILY_API_KEY`
		- Allowed HTTP Request Domains - All
	- Send Query Parameters - 🔴비활성화
	- Send Headers - 🟢활성화
	- Specify Headers - Using Fields Below
	- Header Parameters - Add Parameter
		- Name - Content-Type
		- Value - `application/json`
	- Send Body - 🟢활성화
	- Body Content Type - JSON
	- Specify Body - Using JSON
	- JSON - ⬇️⬇️⬇️ 아래 코드 입력
	- Optimize Response - 🔴비활성화

```JSON
{
  "query": "{{ $fromAI('query','search term') }}",
  "topic": "{{ $fromAI('topic','The category of search. The value should be either general or news') }}",
  "search_depth": "basic",
  "chunks_per_source": 3,
  "max_results": 1,
  "time_range": month,
  "days": 7,
  "include_answer": false,
  "include_raw_content": false,
  "include_images": false,
  "include_image_descriptions": false,
  "include_domains": ["finance.yahoo.com"],
  "exclude_domains": []
}
```

### <font color="#ffc000">3-3. Get Price</font>
- 툴 설정 - HTTP Request Tool
- 노드 이름 - Get Price
- 노드 연결 - Yahoo MCP Server (Tools) ▶️ Get Price
- 참조 문서 - [API Reference](https://docs.tavily.com/documentation/api-reference/endpoint/extract)
- 노드 설정
	- Description - `특정 회사에 대한 주가 데이터가 필요할 때, Yahoo Finance에서 특정 회사의 주가 히스토리 데이터를 수집합니다.`
	- Method - POST
	- URL - `https://api.tavily.com/extract`
	- Authentication - Generic Credential Type
	- Generic Auth Type - Header Auth
	- Header Auth - Header Tavily account
	- Send Query Parameters - 🔴비활성화
	- Send Headers - 🟢활성화
	- Specify Headers - Using Fields Below
	- Header Parameters - Add Parameter
		- Name - Content-Type
		- Value - `application/json`
	- Send Body - 🟢활성화
	- Body Content Type - JSON
	- Specify Body - Using JSON
	- JSON - ⬇️⬇️⬇️ 아래 코드 입력
	- Optimize Response - 🔴비활성화

```JSON
{
 "urls": "{{$fromAI('url','https://finance.yahoo.com/quote/{ticker}/history/')}}",
  "include_images": false,
  "extract_depth": "basic"
}
```

### <font color="#ffc000">3-4. Get Income</font>
- 툴 설정 - HTTP Request Tool
- 노드 이름 - Get Income
- 노드 연결 - Yahoo MCP Server (Tools) ▶️ Get Income
- 참조 문서 - [API Reference](https://docs.tavily.com/documentation/api-reference/endpoint/extract)
- 노드 설정
	- Description - `특정 회사에 대한 손익계산서 데이터가 필요할때 Yahoo Finance에서 손익계산서 데이터를 수집합니다.`
	- Method - POST
	- URL - `https://api.tavily.com/extract`
	- Authentication - Generic Credential Type
	- Generic Auth Type - Header Auth
	- Header Auth - Header Tavily account
	- Send Query Parameters - 🔴비활성화
	- Send Headers - 🟢활성화
	- Specify Headers - Using Fields Below
	- Header Parameters - Add Parameter
		- Name - Content-Type
		- Value - `application/json`
	- Send Body - 🟢활성화
	- Body Content Type - JSON
	- Specify Body - Using JSON
	- JSON - ⬇️⬇️⬇️ 아래 코드 입력
	- Optimize Response - 🔴비활성화

```JSON
{
 "urls": "{{$fromAI('url','https://finance.yahoo.com/quote/{ticker}/financials/')}}",
  "include_images": false,
  "extract_depth": "basic"
}
```

### <font color="#ffc000">3-5. Get Sheet</font>
- 툴 설정 - HTTP Request Tool
- 노드 이름 - Get Sheet
- 노드 연결 - Yahoo MCP Server (Tools) ▶️ Get Sheet
- 참조 문서 - [API Reference](https://docs.tavily.com/documentation/api-reference/endpoint/extract)
- 노드 설정
	- Description - `특정 회사에 대한 재무제표 데이터가 필요할때 Yahoo Finance에서 재무제표 데이터를 수집합니다.`
	- Method - POST
	- URL - `https://api.tavily.com/extract`
	- Authentication - Generic Credential Type
	- Generic Auth Type - Header Auth
	- Header Auth - Header Tavily account
	- Send Query Parameters - 🔴비활성화
	- Send Headers - 🟢활성화
	- Specify Headers - Using Fields Below
	- Header Parameters - Add Parameter
		- Name - Content-Type
		- Value - `application/json`
	- Send Body - 🟢활성화
	- Body Content Type - JSON
	- Specify Body - Using JSON
	- JSON - ⬇️⬇️⬇️ 아래 코드 입력
	- Optimize Response - 🔴비활성화

```JSON
{
 "urls": "{{$fromAI('url','https://finance.yahoo.com/quote/{ticker}/balance-sheet/')}}",
  "include_images": false,
  "extract_depth": "basic"
}
```

### <font color="#ffc000">3-6. Get Cash</font>
- 툴 설정 - HTTP Request Tool
- 노드 이름 - Get Cash
- 노드 연결 - Yahoo MCP Server (Tools) ▶️ Get Cash
- 참조 문서 - [API Reference](https://docs.tavily.com/documentation/api-reference/endpoint/extract)
- 노드 설정
	- Description - `특정 회사에 대한 현금흐름표 데이터가 필요할때 Yahoo Finance에서 현금흐름표 데이터를 수집합니다.`
	- Method - POST
	- URL - `https://api.tavily.com/extract`
	- Authentication - Generic Credential Type
	- Generic Auth Type - Header Auth
	- Header Auth - Header Tavily account
	- Send Query Parameters - 🔴비활성화
	- Send Headers - 🟢활성화
	- Specify Headers - Using Fields Below
	- Header Parameters - Add Parameter
		- Name - Content-Type
		- Value - `application/json`
	- Send Body - 🟢활성화
	- Body Content Type - JSON
	- Specify Body - Using JSON
	- JSON - ⬇️⬇️⬇️ 아래 코드 입력
	- Optimize Response - 🔴비활성화

```JSON
{
 "urls": "{{$fromAI('url','https://finance.yahoo.com/quote/{ticker}/cash-flow/')}}",
  "include_images": false,
  "extract_depth": "basic"
}
```

### <font color="#ffc000">3-7. Yahoo Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Yahoo Tools
- 노드 연결 - AI Agent (Tool) ▶️ Yahoo Tools
- 노드 설정
    - Endpoint
        - Yahoo MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All

## <font color="#ffc000">Step 4: Alpha Vantage MCP 설정</font>
### <font color="#ffc000">4-1. Alpha Vantage MCP Server</font>
- 노드 기능 - MCP Server Trigger
- 노드 이름 - Alpha Vantage MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Path - vantage
### <font color="#ffc000">4-2. Alpha Vantage</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Alpha Vantage
- 노드 연결 - Alpha Vantage MCP Server (Tools) ▶️ Alpha Vantage
- 참조 문서 - [MCP + AI Agents](https://mcp.alphavantage.co)
- 노드 설정
    - Endpoint - `https://mcp.alphavantage.co/mcp`
    - Server Transport - HTTP Streamable
	- Authentication - Header Auth
	- Credential for Header Auth - Create new credential
		- 계정 이름 - Header Alpha Vantage account
		- API 키 발급 - [Alpha Vantage Get Free API Key](https://www.alphavantage.co)
		- Name - Authorization
		- Value - `Bearer YOUR_ALPHA_VANTAGE_API_KEY`
		- Allowed HTTP Request Domains - All
	- Tools to Include - All Except
	- Tools to Exclude - RSI
### <font color="#ffc000">4-3. Alpha Vantage Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Yahoo Tools
- 노드 연결 - AI Agent (Tool) ▶️ Alpha Vantage Tools
- 노드 설정
    - Endpoint
        - Alpha Vantage MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All

## <font color="#ffc000">Step 5: Investing MCP 설정</font>
### <font color="#ffc000">5-1. Investing MCP Server</font>
- 노드 기능 - MCP Server Trigger
- 노드 이름 - Investing MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Path - Investing
### <font color="#ffc000">5-2. RSS Read</font>
- 노드 기능 - RSS Read Tool
- 노드 이름 - RSS Read
- 노드 연결 - Investing MCP Server (Tools) ▶️ RSS Read
- 참조 문서 - [Investing.com RSS 피드](https://kr.investing.com/webmaster-tools/rss)
- 노드 설정
    - Description - [[Investing.com RSS 피드 프롬프트]]
    - URL - `🌟Let the model define this parameter`
    - Add a description - RSS Link
### <font color="#ffc000">5-3. Get RSS</font>
- 툴 설정 - HTTP Request Tool
- 노드 이름 - Get RSS
- 노드 연결 - Investing MCP Server (Tools) ▶️ Get RSS
- 참조 문서 - [API Documentation](https://docs.firecrawl.dev/features/scrape)
- 노드 설정
	- Description - `RSS Link를 입력해서 웹문서를 스크랩하는 도구입니다.`
	- Method - POST
	- URL - `https://api.firecrawl.dev/v2/scrape`
	- Authentication - Generic Credential Type
	- Generic Auth Type - Bearer Auth
	- Bearer Auth - Create new credential
		- 계정 이름 - Firecrawl Bearer account
		- Bearer Token - [Firecrawl API Keys](https://www.firecrawl.dev/app/api-keys)
		- Allowed HTTP Request Domains - All
	- Send Query Parameters - 🔴비활성화
	- Send Headers - 🔴비활성화`
	- Send Body - 🟢활성화
	- Body Content Type - JSON
	- Specify Body - Using Fields Below
	- Body Parameters - Add Parameter
		- Name - url
		- Value - `🌟Let the model define this parameter`
		- Add a description - `크롤링할 웹 링크`
	- Body Parameters - Add Parameter
		- Name - format
		- Value - `markdown`
	- Optimize Response - 🔴비활성화
### <font color="#ffc000">5-4. Investing Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Investing Tools
- 노드 연결 - AI Agent (Tool) ▶️ Investing Tools
- 노드 설정
    - Endpoint
        - Investing MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All

## <font color="#ffc000">Step 6: Chart MCP 설정</font>
### <font color="#ffc000">6-1. Chart MCP Server</font>
- 노드 기능 - MCP Server Trigger
- 노드 이름 - Chart MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Path - chart
### <font color="#ffc000">6-2. Get Chart</font>
- 툴 설정 - HTTP Request Tool
- 노드 이름 - Get Chart
- 노드 연결 - Chart MCP Server (Tools) ▶️ Get Chart
- 참조 문서 - [Chart-Img API Documentation](https://doc.chart-img.com/#advanced-chart-to-storage)
- 노드 설정
	- Description - `전달하는 symbol에 해당하는 종목을 studies에 나열된 분석차트 이미지로 생성하여 해당 차트를 이미지 인식 기반으로 분석을 요청하는 도구입니다.`
	- Method - GET
	- URL - `https://api.chart-img.com/v1/tradingview/advanced-chart/storage`
	- Authentication - Generic Credential Type
	- Generic Auth Type - Bearer Auth
	- Bearer Auth - Create new credential
		- 계정 이름 - Chart IMG Bearer account
		- Bearer Token - [Chart-Img API](https://chart-img.com/account/api)
		- Allowed HTTP Request Domains - All
	- Send Query Parameters - 🟢활성화
	- Specify Query Parameters - Using Fields Below
	- Query Parameters - Add Parameter
		- Name - interval
		- Value - `🌟Let the model define this parameter`
		- Add a description - `set tradingview chart interval* [1m, 3m, 5m, 15m, 30m, 45m, 1h, 2h, 3h, 4h, 1D, 1W, 1M, 3M, 6M, 1Y] exchange dependent`
	- Query Parameters - Add Parameter
		- Name - symbol
		- Value - `🌟Let the model define this parameter`
		- Add a description - `set tradingview symbol (e.g. NASDAQ:AAPL)`
	- Query Parameters - Add Parameter
		- Name - studies
		- Value - `🌟Let the model define this parameter`
		- Add a description - `여러개 요청시 comma로 구분합니다. (e.g. MACD,SSI)`
	- Send Headers - 🔴비활성화`
	- Send Body - 🔴비활성화
	- Options - Add Option - Response
		- Include Response Headers and Status - 🔴비활성화
		- Never Error - 🔴비활성화
		- Response Format - JSON
	- Optimize Response - 🔴비활성화
### <font color="#ffc000">6-3. Analyze image</font>
- 툴 설정 - Google Gemini Tool
- 노드 이름 - Analyze image
- 노드 연결 - Chart MCP Server (Tools) ▶️ Analyze image
- 계정 연결 - Credential to connect with
    - Create new credential
        - Host - `https://generativelanguage.googleapis.com`
        - API Key - [구글 AI 스튜디오 API 키](https://aistudio.google.com/api-keys)
        - Get API key - 새 키 만들기 - 키 이름 지정
        - 프로젝트 선택 - Create project - 프로젝트 이름 지정
        - 할당량 등급 - 결제 설정 - 결제 계정 연결 혹은 관리
        - Allowed HTTP Request Domains - All
- 노드 설정
	- Tool Description - Set Automatically
	- Resource - Image
	- Operation - Analyze Image
	- Model - From list - models/gemini-2.5-pro
	- Text Input - ⬇️⬇️⬇️ 아래 코드 입력
	- Input Type - Image URL(s)
	- URL(s) - `🌟Let the model define this parameter`
	- Add a description - `Get Chart에서 생성된 이미지 링크`
	- Simplify Output - 🟢활성화

```Markdown
1. 페르소나
당신은 뉴욕증권거래소(NYSE)와 런던증권거래소(LSE)에서 50년 이상 근무한 전문 재무 분석가입니다. 수십 년에 걸쳐 수많은 시장 사이클, 강세장, 약세장, 그리고 경제 변화를 직접 겪으며 분석해 온 당신의 주식 차트 기술적 분석 전문성은 타의 추종을 불허합니다.

2. 핵심 역할
당신의 역할은 제공된 재무 차트 이미지를 정밀하게 분석하고, 기술적 측면에 대한 포괄적인 통찰력을 제공하는 것입니다. 분석에는 캔들스틱 패턴, MACD 지표, 거래량 추세, 그리고 전반적인 시장 심리가 반드시 포함되어야 합니다. 차트에 대한 상세한 분석을 제공하고, 주요 관심 영역과 당신의 풍부한 시장 경험에서 비롯된 실행 가능한 통찰력을 명확히 제시해야 합니다.
```

### <font color="#ffc000">6-4. Generate image</font>
- 툴 설정 - Google Gemini Tool
- 노드 이름 - Generate image
- 노드 연결 - Chart MCP Server (Tools) ▶️ Generate image
- 계정 연결 - Credential to connect with - Google Gemini(PaLM) Api account
- 노드 설정
	- Tool Description - Set Automatically
	- Resource - Image
	- Operation - Generate an Image
	- Model - From list - models/gemini-3-pro-image-preview (Nano Banana Pro)
	- Prompt - `🌟Let the model define this parameter`
	- Add a description - `분석 내용에 대한 인포그래픽 이미지 생성`
### <font color="#ffc000">6-5. Chart Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Chart Tools
- 노드 연결 - AI Agent (Tool) ▶️ Chart Tools
- 노드 설정
    - Endpoint
        - Chart MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All

## <font color="#ffc000">Step 7: 텔레그램 수신 설정</font>
### <font color="#ffc000">7-1. Design Assistant</font>
- 노드 기능 - Google Gemini - Message a model
- 노드 이름 - Design Assistant
- 계정 연결 - Credential to connect with - Google Gemini(PaLM) Api account
- 노드 설정
	- Resource - Text
	- Operation - Message a Model
	- Model - From list - models/gemini-3-pro-preview
	- Messages
		- Prompt - `{{ $('AI Agent').item.json.output }}`
		- Role - User
	- Simplify Output - 🟢활성화
	- Output Content as JSON - 🔴비활성화
	- Options - Add Option
		- System Message - [[주식 분석 레포트 HTML 디자인 프롬프트]]
		- Code Execution - 🟢활성화
### <font color="#ffc000">7-2. Send a text message</font>
- 노드 기능 - Telegram - Send a text message
- 노드 이름 - Send a text message
- 노드 연결 - Design Assistant ▶️ Send a text message
- 계정 연결 - Credential to connect with - Telegram Financial
- 노드 설정
	- Resource - Message
	- Operation - Send Message
	- Chat ID - `{{ $('Telegram Trigger').item.json.message.chat.id }}`
	- Text - `{{ $('AI Agent').item.json.output }}`
	- Reply Markup - None
	- Additional Fields - Add Field
		- Append n8n Attribution - 🔴비활성화
### <font color="#ffc000">7-3. Convert to File</font>
- 노드 기능 - Convert to File - Convert to Text File
- 노드 이름 - Convert to File
- 노드 연결 - Design Assistant ▶️ Convert to File
- 노드 설정
	- Operation - Convert to Text File
	- Text Input Field - `content.parts[0].text`
	- Put Output File in Field - data
	- Options - Add Option
		- File Name - ⬇️⬇️⬇️ 아래 코드 입력

```JSON
{{ $json.content.parts[0].text.match(/<title>(.*?)<\/title>/i)?.[1]?.replace(/[^\w\s가-힣()-]/g, '')?.replace(/\s+/g, ' ') || 'report_' + $now.format('YYYY-MM-DD') }}.html
```

### <font color="#ffc000">7-4. Send a document</font>
- 노드 기능 - Telegram - Send a document
- 노드 이름 - Send a document
- 계정 연결 - Credential to connect with - Telegram Financial
- 노드 설정
	- Resource - Message
	- Operation - Send Document
	- Chat ID - `{{ $('Telegram Trigger').item.json.message.chat.id }}`
	- Binary File - 🟢활성화
	- Input Binary Field - data
	- Reply Markup - None

## <font color="#ffc000">Step 8: 웹훅 페이지 설정</font>
### <font color="#ffc000">8-1. Webhook</font>
- 워크플로우 - 🟢활성화
- 노드 기능 - Webhook
- 노드 이름 - Webhook
- 노드 설정
	- Webhook URLs - Production URL
	- HTTP Method - GET
	- Path - financial-report
	- Authentication - None
	- Respond - Using 'Response to Wehbook' Node
### <font color="#ffc000">8-2. Response to Webhook</font>
- 노드 기능 - Response to Webhok
- 노드 이름 - Response to Webhok
- 노드 설정
	- Respond With - Text
	- Response Body - [[주식 분석 레포트 MCP 에이전트 웹훅 스크립트]]
	- 샘플 텔레그램 챗봇 및 QR 코드, 워크플로우 URL을 본인 것으로 변경 후 저장
		- 샘플 텔래그램 챗봇 URL - `https://t.me/daniel8824_testing_bot`
		- 샘플 텥레그램 QR 코드 URL - `https://publish-01.obsidian.md/access/384f5b99b4a72111068888340c2a7430/90_Settings/92_Attachments/financial_01.png`
		- n8n 워크프로우 이미지 URL - `https://publish-01.obsidian.md/access/384f5b99b4a72111068888340c2a7430/90_Settings/92_Attachments/financial_02.png`

## <font color="#ffc000">Step 9: Genspark MCP Server</font>
### <font color="#ffc000">9-1. 젠스파크 MCP 추가</font>
- 새로운 MCP 서버 추가
	- Genspark - 도구 선택 - 추가
	- 새로운 MCP 서버 추가
	- Yahoo MCP, Alpha Vantage MCP, Investing MCP, Chart MCP 
		- 서버 이름 - 각 MCP 이름
		- 서버 유형 - SSE
		- 서버 URL - 각 MCP 엔드포인트
			- 예시 - `https://daniel8824.app.n8n.cloud/mcp/yahoo`
		- 설명 - 각 MCP 설명
		- 요청 헤더 - `{"Authorization": "Bearer MY_N8N_AUTH_TOKEN"}`
- 젠스파크 채팅 예시
	- https://www.genspark.ai/agents?id=9137f4ef-35d1-44b5-8dba-0d2204cd20be

## <font color="#ffc000">실습 파일</font>
### <font color="#ffc000"> 관련 파일 및 URL</font>
- [Financial Assistant 워크플로우](https://github.com/daniel8824-del/n8n-datawave/blob/0730d7bc42de306b466c61d4a2d086da8b115082/Financial%20Assistant.json) - Download raw file
	- Create workflow - Import from File - Financial Assistant.json
- [Financial MCP 워크플로우](https://github.com/daniel8824-del/n8n-datawave/blob/0730d7bc42de306b466c61d4a2d086da8b115082/Financial%20MCP.json) - Download raw file
	- Create workflow - Import from File - Financial MCP.json



