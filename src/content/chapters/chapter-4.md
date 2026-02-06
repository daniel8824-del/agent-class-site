---
title: "Chapter 4 : n8n AI 에이전트 제작 기초"
tags:
  - 에이전트
  - Agent
  - n8n
  - 자동화
  - 캘린더
  - 회의록
---
#에이전트 #Agent #n8n #자동화 #캘린더 #회의록 

## <font color="#ffc000">전체 워크플로우 이미지</font>

![[agent_image_13.png]]
## <font color="#ffc000">Step 1: Docker Desktop 설치</font>
### <font color="#ffc000">1-1. Docker Desktop 다운로드</font>
![[agent_image_19.png]]
- [Docker 공식 사이트](https://www.docker.com/) - Products - Docker Desktop
- Download Docker Desktop
	- 운영체제에 맞는 설치 파일을 다운로드
	- 일반적으로 Windows는 AMD 64를 선택

> [!info] 시스템 사양 확인 방법
> 
> | OS | 확인 경로 | 표시 내용 | 선택 옵션 |
> |---|---|---|---|
> | **Windows** | 설정 > 시스템 > 정보 > 시스템 종류 | x64 기반 프로세서 | AMD64 |
> | **Windows** | 설정 > 시스템 > 정보 > 시스템 종류 | ARM64 기반 프로세서 | ARM64 |
> | **macOS** | Apple 메뉴 > 이 Mac에 관하여 | Apple M1/M2/M3 | Apple Silicon |
> | **macOS** | Apple 메뉴 > 이 Mac에 관하여 | Intel Core i5/i7 | Intel Chip |

### <font color="#ffc000">1-2. WSL 2 설치 (Windows 필수)</font>
![[agent_image_11.png]]
- Windows PowerShell 관리자 권한 실행
- 명령어 입력 - `wsl --install`
- 설치 완료 후 컴퓨터 재시작
- WSL 설치 확인 - `wsl --version`
### <font color="#ffc000">1-3. Docker Desktop 설치</font>
![[agent_image_09.png]]
- 다운로드한 설치 파일 실행
- Windows - Configuration 설정
	- ✅ Use WSL 2 instead of Hyper-V (recommended)
	- ✅ Add shortcut to desktop
- MacOS - 설치 마법사  따라 진행
- 설치 완료 후 컴퓨터 재시작
- Docker Desktop 실행
	- Docker Service Agreement 동의
	- Welcome to Docker - Personal
	- Docker 계정 생성 - 구글 로그인
	- Welcome Survey -Skip
	- Docker Desktop 메인 화면 진입

> [!summary] Docker는 애플리케이션을 설치 없이 독립된 가상 환경(컨테이너)에서 실행하는 도구입니다. 가상 컴퓨터처럼 작동하지만 훨씬 가볍고 빠르며, 내 컴퓨터 환경에 영향을 주지 않습니다.

## <font color="#ffc000">Step 2: n8n Docker 설치</font>
### <font color="#ffc000">2-1. n8n 이미지 다운로드</font>
![[agent_image_15.png]]
-  [[n8n 셀프 호스팅 Docker 설치 방법]]
- Docker Desktop 실행
- 상단 검색창에 `n8n` 입력
- n8nio/n8n 이미지 확인
	- n8nio/n8n 이미지 클릭
	- latest 버전 선택
	- Pull 버튼 클릭

>[!quote] 이미지(Image)는 애플리케이션을 실행하기 위한 설계도입니다. n8n 이미지를 다운로드하면 n8n을 실행할 준비가 완료됩니다.

### <font color="#ffc000">2-2. n8n 컨테이너 실행</font>
![[20251204_015818.png]]
- 좌측 메뉴 Images 탭 클릭
- n8nio/n8n 이미지 - Run 버튼 클릭
- Optional settings 펼치기
	- Container name - n8n
	- Host port - 5678
	- Volumes
		- Host path - `C:\Users\사용자명\.n8n`
		- Container path - `/home/node/.n8n`
- 좌측 메뉴 Containers 탭 클릭
- n8n 컨테이너 Running 상태 확인

> [!example] 컨테이너(Container)는 이미지를 바탕으로 실제로 실행되는 프로그램입니다. 설계도(이미지)로 집(컨테이너)을 지을 수 있는 것과 같습니다.

### <font color="#ffc000">2-3. n8n 브라우저 접속</font>
![[agent_image_16.png]]
- 웹 브라우저 실행
- 주소창 입력 - http://localhost:5678
- 계정 생성 - 로그인
- How are you using n8n? - Skip
- n8n 워크플로우 메인 화면 진입

## <font color="#ffc000">Step 3: Chat 트리거 설정</font>
### <font color="#ffc000">3-1. When chat message received</font>
- 노드 기능 - Chat Trigger
- 노드 이름 - When chat message received
- 노드 설정
    - Make Chat Publicly Available - 🔴비활성화
### <font color="#ffc000">3-2. Upload File</font>
- 노드 기능 - Google Drive - Upload a file
- 노드 이름 - Upload File
- 계정 연결 - Credential to connect with
	- Create new credential
		- Connect using - OAuth2
		- Client ID & Client Secret - [[n8n과 Google 계정 연동하기]]
- 노드 설정
    - Input Data Field Name - `data0`
    - File Name - `{{ $json.files[0].fileName }}`
    - Parent Drive - From list - My Drive
    - Parent Folder - From list - 사용자 폴더
- 노드 세팅
	- On Error - Continue

## <font color="#ffc000">Step 4: AI 에이전트 설정</font>
### <font color="#ffc000">4-1. AI Agent</font>
- 노드 기능 - AI Agent
- 노드 이름 - AI Agent
- 노드 설정
	- Source for Prompt - Define below
	- Prompt (User Message) - ⬇️⬇️⬇️ 유저 프롬프트 입력
	- Require Specific Output Format - 🔴비활성화
	- Enable Fallback Model - 🔴비활성화
	- Options - Add Option
	    - System Message - ⬇️⬇️⬇️ 시스템 프롬프트 입력

>[!question] 유저 프롬프트 (Expression Mode)
>```markdown
>채팅 메시지: {{ $('When chat message received').item.json.chatInput }}
>파일 링크: {{ $json.webContentLink }}
>```

>[!important] 시스템 프롬프트 (Expression Mode)
>```markdown
># AI 어시스턴트 시스템 프롬프트
>
>## 역할
>너는 똑똑하고 유능한 어시스턴트야. 오늘 날짜는 {{ $now.format('yyyy-MM-dd') }}야.
>
>너의 역할은 다음과 같아:
>
>---
>### 1. 일정 처리 (Google Calendar)
>
>#### 일정 생성 프로세스
>Step 1: Get Contacts
>- 시트에서 팀원 이메일 주소 확인
>
>Step 2: Get Schedule
>- 오늘 또는 요청된 날짜의 캘린더 일정 조회
>
>Step 3-A: 일정이 없는 경우
>- Create Schedule 도구로 새 일정 생성
> 
>Step 3-B: 기존 일정이 있는 경우
>- 기존 일정 정보를 사용자에게 제시
>
>#### 일정 변경/수정 처리
>수정 감지 기준:
>- 사용자가 명시적으로 "변경", "수정", "바꿔", "다시 잡아" 등을 언급
>- 기존 일정과 시간, 날짜, 참석자, 제목 중 하나 이상이 다른 경우
>
>수정 프로세스:
>1. 기존 일정 정보를 사용자에게 확인
>- 예: "현재 {날짜} {시간}에 '{일정명}' 일정이 있습니다."
>
>2. 사용자에게 명확히 확인 요청
>- "이 일정을 삭제하고 새로 만들까요?"
>
>3. 사용자 동의 시:
>- Delete Schedule: 기존 일정 삭제
>- Create Schedule: 새 일정 생성
>
>#### 중복 일정 처리
>같은 날짜에 여러 일정이 있는 경우:
>- 모든 일정을 나열하여 사용자에게 제시
>- 사용자가 어떤 일정을 수정/삭제할지 선택하도록 유도
>- 예: "해당 날짜에 3개의 일정이 있습니다. 어떤 일정을 수정하시겠습니까?"
>
>---
>### 2. 일정 리마인더 이메일 처리
>
>#### 이메일 발송 조건
>다음 상황에서 반드시 사용자에게 확인:
>- 새로운 일정 생성 완료 후
>- 기존 일정 수정 완료 후
>
>확인 질문 (필수):
>- "추가된 일정을 기반으로 리마인더 이메일을 보내드릴까요?"
>
>사용자 응답 처리:
>- 긍정 ("예", "응", "그래", "좋아", "네" 등): Send Email 도구로 이메일 발송
>- 부정 또는 무응답: 아무 작업 안 함
>
>이메일 내용 구성:
>- 제목: 
>  * 새 일정: [리마인더] {일정명} - {yyyy-MM-dd HH:mm}
>  * 수정된 일정: [리마인더] {일정명} 일정 변경 - {yyyy-MM-dd HH:mm}
>- 본문:
>  * 일정명
>  * 날짜/시간
>  * 수정된 경우: "변경되었습니다" 명시 + 변경 사항 상세 설명
>     - 시간 변경: "종료 시간: {이전} → {이후}"
>     - 참석자 변경: "참석자: {이전 인원수}명 → {이후 인원수}명으로 조정"
>  * 참석자 목록
>  * 장소
>
>---
>### 3. 파일 공유 처리
>
>사용자 메시지에 파일 링크가 포함된 경우:
>
>Google Drive 다운로드 링크 이메일 본문에 포함
>- 파일 링크 추출 (사용자 메시지에서)
>- Send Email (Google Drive 링크 포함)
>- 이메일 내용 추가: 회의 자료
>
>---
>### 4. 도구 사용 가이드
>- Get Contacts | 시트에서 팀원 이메일 확인 | 일정 생성/수정 전
>- Get Schedule | 구글 캘린더 일정 조회 | 일정/추가/수정/조회 시
>- Create Schedule | 새 일정 추가 | 일정 생성 시
>- Delete Schedule | 기존 일정 삭제 | 일정 수정 시 (사용자 확인 후)
>- Send Email | 리마인더 이메일 발송 | 일정 추가/수정 후 (사용자 동의 시)
>
>---
>## 날짜/시간 처리
>
>오늘 날짜: {{ $now.format('yyyy-MM-dd') }}
>
>날짜 계산 규칙:
>- "오늘": {{ $now.format('yyyy-MM-dd') }}
>- "내일": {{ $now.plus({ days: 1 }).format('yyyy-MM-dd') }}
>- "모레": {{ $now.plus({ days: 2 }).format('yyyy-MM-dd') }}
>- "어제": {{ $now.minus({ days: 1 }).format('yyyy-MM-dd') }}
>- "다음 주": {{ $now.plus({ weeks: 1 }).startOf('week').format('yyyy-MM-dd') }}
>- "다음 달": {{ $now.plus({ months: 1 }).format('yyyy-MM-dd') }}
>
>시간 처리:
>- 시간 미지정 시: 사용자에게 시간 확인 요청
>- 과거 날짜 요청 시: "과거 날짜입니다. 다시 확인해주세요" 알림
>
>중요:
>- 날짜 관련 도구 호출 시 반드시 구체적인 날짜(yyyy-MM-dd 형식)로 변환하여 전달
>- 사용자에게 일정 확인할 때도 구체적 날짜 명시
>- 예: "내일(2025-12-03) 일정을 조회하겠습니다"
>- 시간 미지정 시: 사용자에게 확인 요청
>- 과거 날짜: "과거 날짜입니다. 확인해주세요"
>
>---
>## 중요한 원칙
>
>### 해야 할 것 (DO)
>1. 사용자 확인 우선
>- 일정 삭제 전 반드시 확인
>- 이메일 발송 전 반드시 확인
>
>2. 정확한 정보 제공
>- 기존 일정 정보를 명확히 제시
>- 변경 사항을 구체적으로 설명
>
>3. 순차적 도구 실행
>- Get Contacts → Get Schedule → Create/Delete Schedule 순서 준수
>
>---
>### 하지 말아야 할 것 (DON'T)
>1. 임의 작업 금지
>- 사용자 동의 없이 이메일 발송
>- 확인 없이 일정 삭제
>
>2. 정보 추측 금지
>- 참석자 이메일을 임의로 가정
>- 시간대/날짜를 임의로 해석
> 
>3. 중복 작업 방지
>- 같은 일정을 여러 번 생성
>- 불필요한 도구 호출
>```

### <font color="#ffc000">4-2. OpenAI Chat Model</font>
- 모델 설정 - OpenAI Chat Model
- 노드 이름 - OpenAI Chat Model
- 계정 연결 - Credential to connect with
    - Create new credential
	    - API Key - [OpenAI 플랫폼 API Keys](https://platform.openai.com/settings/organization/api-keys)
- 노드 설정
    - Model - From list - gpt-4.1
    - Use Responses API - 🟢활성화
### <font color="#ffc000">4-3. Simple Memory</font>
- 메모리 설정 - Simple Memory
- 노드 이름 - Simple Memory
- 노드 설정
	- Session ID - Connected Chat Trigger Node
	- Session Key From Previous Node - `{{ $json.sessionId }}`
	- Context Window Length - 5
### <font color="#ffc000">4-4. Get Schedule</font>
- [구글 캘린더](https://calendar.google.com/calendar) - 일정 등록
- 툴 설정 - Google Calendar Tool
- 노드 이름 - Get Schedule
- 계정 연결 - Credential to connect with
	- Create new credential
		- Connect using - OAuth2
		- Client ID & Client Secret - [[n8n과 Google 계정 연동하기]]
- 노드 설정
	- Tool Description - Set Automatically
	- Resource - Event
	- Operation - Get Many
	- Calendar - From list - 사용자 캘린더
	- Return All - 🌟Let the model define this parameter
	- After - 🌟Let the model define this parameter
	- Before - 🌟Let the model define this parameter
### <font color="#ffc000">4-5. Delete Schedule</font>
- 툴 설정 - Google Calendar Tool
- 노드 이름 - Delete Schedule
- 계정 연결 - Credential to connect with
	- Create new credential
		- Connect using - OAuth2
		- Client ID & Client Secret - [[n8n과 Google 계정 연동하기]]
- 노드 설정
	- Tool Description - Set Automatically
	- Resource - Event
	- Operation - Delete
	- Calendar - From list - 사용자 캘린더
	- Event ID - 🌟Let the model define this parameter
### <font color="#ffc000">4-6. Create Schedule</font>
- 툴 설정 - Google Calendar Tool
- 노드 이름 - Create Schedule
- 계정 연결 - Credential to connect with
	- Create new credential
		- Connect using - OAuth2
		- Client ID & Client Secret - [[n8n과 Google 계정 연동하기]]
- 노드 설정
	- Tool Description - Set Automatically
	- Resource - Event
	- Operation - Create
	- Calendar - From list - 사용자 캘린더
	- Start - 🌟Let the model define this parameter
	- End - 🌟Let the model define this parameter
	- Use Default Reminders - 🟢활성화
	- Additional Fields - Add Field
		- Attendees - 🌟Let the model define this parameter
		- Description - 🌟Let the model define this parameter
		- Summary - 🌟Let the model define this parameter
### <font color="#ffc000">4-7. Get Contacts</font>
- [구글 시트](https://docs.google.com/spreadsheets/d/1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs/edit?usp=sharing) - 사본 만들기
- 툴 설정 - Google Sheets Tool
- 노드 이름 - Get Contacts
- 계정 연결 - Credential to connect with
	- Create new credential
		- Connect using - OAuth2
		- Client ID & Client Secret - [[n8n과 Google 계정 연동하기]]
- 노드 설정
	- Tool Description - Set Automatically
	- Resource - Sheet Within Document
	- Operation - Get Row(s)
	- Document - From list - 사용자 문서
	- Sheet - From list - 사용자 시트
	- Combine Filters - AND
### <font color="#ffc000">4-8. Send Email</font>
- [구글 시트](https://docs.google.com/spreadsheets/d/1uMNcJWCN4CEF5_g5KqrgqlRhiLutk18Ousb9I8RgKJs/edit?usp=sharing) - 사본 만들기
- 툴 설정 - Gmail Tool
- 노드 이름 - Send Email
- 계정 연결 - Credential to connect with
	- Create new credential
		- Connect using - OAuth2
		- Client ID & Client Secret - [[n8n과 Google 계정 연동하기]]
- 노드 설정
	- Tool Description - Set Automatically
	- Resource - Message
	- Operation - Send
	- To - 🌟Let the model define this parameter
	- Subject - 🌟Let the model define this parameter
	- Email Type - Text
	- Message - 🌟Let the model define this parameter
	- Options - Add Option
		- Append n8n Attribution - 🔴비활성화
		- CC - 🌟Let the model define this parameter
		- Sender Name - 🌟Let the model define this parameter
### <font color="#ffc000">4-9. Think Tool</font>
- 툴 설정 - Think Tool
- 노드 이름 - Think
- 노드 설정
    - Think Tool Description - 기본값 사용

 >[!quote] Think Tool은 AI 에이전트가 복잡한 작업을 수행할 때 중간 사고 과정을 명시적으로 기록하는 메타인지 도구입니다. Chain-of-Thought 방식으로 단계별 추론 과정을 남기며 작업합니다.
 
## <font color="#ffc000">Step 5: 싱글 턴 챗봇 테스트</font>
### <font color="#ffc000">5-1. When chat message received</font>
![[agent_image_21.png]]
- 워크플로우 - 🟢활성화
- 노드 기능 - Chat Trigger
- 노드 이름 - When chat message received
- 노드 설정
    - Make Chat Publicly Available - 🟢활성화
    - Mode - Hosted Chat
    - Authentication - None
    - Initial Messages - 안녕하세요! 👋 자비스입니다. 무엇을 도와드릴까요?
    - Options - Add Field
	    - Allowed Origins (CORS) - `*`
	    - Allow File Uploads - 🟢활성화
	    - Allowed File Mime Types - `*`
	    - Load Previous Session - Off
	    - Require Button Click to Start Chat - 🟢활성화
	    - Start Conversation Button Text - 새로운 대화
	    - Subtitle - Google Calendar 일정 관리 및 이메일 알림 어시스턴트
	    - Title - 구글 캘린더 에이전트

## <font color="#ffc000">Step 6: 멀티 턴 챗봇 테스트</font>
### <font color="#ffc000">6-1. When chat message received</font>
![[agent_image_22.png]]
- 노드 기능 - Chat Trigger
- 노드 이름 - When chat message received
- 노드 변경
	- Load Previous Session - From Memory
	- Response Mode - Using Response Nodes
	- Memory - AI 에이전트 Simple Memory 연결
	- Custom Chat Styling - ⬇️⬇️⬇️ 샘플 CSS 디자인
		- ChatGTP 혹은 Gemini 통해 CSS 요청

```CSS
:root {
  /* Google Calendar 색상 */
  --chat--color-primary: #4285f4;
  --chat--color-primary-shade-50: #3b78e7;
  --chat--color-primary-shade-100: #356bd9;
  --chat--color-secondary: #34a853;
  --chat--color-secondary-shade-50: #2e9549;
  --chat--color-white: #ffffff;
  --chat--color-light: #f8f9fa;
  --chat--color-light-shade-50: #e8eaed;
  --chat--color-light-shade-100: #dadce0;
  --chat--color-medium: #9aa0a6;
  --chat--color-dark: #202124;
  
  /* 레이아웃 */
  --chat--spacing: 1rem;
  --chat--border-radius: 1rem;
  --chat--transition-duration: 0.3s;
  
  /* 윈도우 */
  --chat--window--width: 420px;
  --chat--window--height: 680px;
  --chat--window--border-radius: 1.25rem;
  --chat--window--border: none;
  
  /* 헤더 */
  --chat--header--padding: 1.5rem;
  --chat--header--background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
  --chat--header--color: #ffffff;
  --chat--heading--font-size: 1.75em;
  
  /* 메시지 */
  --chat--message--font-size: 0.95rem;
  --chat--message--padding: 1rem 1.25rem;
  --chat--message--border-radius: 1.25rem;
  --chat--message--margin-bottom: 1rem;
  
  /* 봇 메시지 */
  --chat--message--bot--background: #ffffff;
  --chat--message--bot--color: #202124;
  --chat--message--bot--border: 1px solid #e8eaed;
  
  /* 사용자 메시지 - 파란색 배경 */
  --chat--message--user--background: #e8f0fe;
  --chat--message--user--color: #1967d2;
  --chat--message--user--border: 1px solid #d2e3fc;
  
  /* 버튼 */
  --chat--button--background: #4285f4;
  --chat--button--color: #ffffff;
  --chat--button--border-radius: 2rem;
  
  /* 전송 버튼 */
  --chat--input--send--button--background: #4285f4;
  --chat--input--send--button--color: #ffffff;
  
  /* 배경 */
  --chat--body--background: #f8f9fa;
  --chat--footer--background: transparent;
}

/* ============================================
   메시지 스타일만 커스텀
   ============================================ */

/* 메시지 공통 */
.chat-message {
  max-width: 80%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.chat-message:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* 사용자 메시지 - 파란색 테마 */
.chat-message--user {
  background: #e8f0fe;
  color: #1967d2;
  border: 1px solid #d2e3fc;
}

/* 봇 메시지 - 흰색 깔끔 */
.chat-message--bot {
  background: #ffffff;
  color: #202124;
  border: 1px solid #e8eaed;
}

/* ============================================
   헤더
   ============================================ */

.chat-header {
  border-radius: 1.25rem 1.25rem 0 0;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
}

/* ============================================
   윈도우
   ============================================ */

.chat-window {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* ============================================
   스크롤바
   ============================================ */

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #dadce0;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #9aa0a6;
}

/* ============================================
   토글 버튼
   ============================================ */

.chat-toggle {
  background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
  transition: all 0.3s ease;
}

.chat-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(66, 133, 244, 0.5);
}

.chat-toggle:active {
  transform: scale(0.95);
}

/* ============================================
   반응형
   ============================================ */

@media (max-width: 768px) {
  :root {
    --chat--window--width: 100vw;
    --chat--window--height: 100vh;
    --chat--window--border-radius: 0;
  }
  
  .chat-window {
    border-radius: 0;
  }
  
  .chat-header {
    border-radius: 0;
  }
  
  .chat-message {
    max-width: 85%;
  }
}
```

### <font color="#ffc000">6-2. Respond to Chat</font>
- 노드 기능 - Respond to Chat
- 노드 이름 - Respond to Chat
- 노드 설정
    - Message - `{{ $json.output }}`
    - Wait for User Reply - 🔴비활성화

## <font color="#ffc000">Step 7: 챗봇 개선 테스트</font>
### <font color="#ffc000">7-1. 시스템 프롬프트 개선</font>

>[!example] 시스템 프롬프트 개선
>```markdown
>다양한 테스트 진행 후 ChatGPT 혹은 Gemini를 통해서 시스템 프롬프트를 개선하세요.
>```

### <font color="#ffc000">7-2. Tool Description 입력</font>

>[!info] 에이전트는 사용자 요청에 따라 사용 가능한 도구 목록을 확인합니다. 직접 코드를 읽을 수 없기 때문에 도구의 이름과 설명(Description)만 보고 선택을 결정합니다. 마치 레스토랑 메뉴판만 보고 음식을 주문한 것과 비슷합니다.

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

>[!summary] 좋은 도구 설명 예시
>```json
>{
>  "name": "search_database",
>  "description": "MySQL 데이터베이스에서 고객 정보를 검색합니다. 이름, 이메일, 전화번호로 검색 가능하며, 부분 일치를 지원합니다. 최대 100개 결과 반환."
>}
>```

>[!danger] Tool Description 입력
>```markdown
>ChatGPT 혹은 Gemini를 통해서 Tool 노드의 Add a description 부분을 입력하세요.
>```
>```
>Tool Description을 Set Manually로 변경한 후 
>ChatGPT 혹은 Gemini를 통해서 Description을 입력하세요.
>```

## <font color="#ffc000">Step 8: 챗봇 회의록 요약 기능 추가</font>
### <font color="#ffc000">8-1. 실습 파일</font>
- 짧은 회의 - [링크 클릭](https://drive.google.com/file/d/1uYyp1fULsmklaMESjM2JmYwg24rVl-JW/view?usp=sharing)
- 긴 회의 - [링크 클릭](https://drive.google.com/file/d/1Ktk5YvVnweoWVHUVK1UegeHrsxxX88LQ/view?usp=sharing)
### <font color="#ffc000">8-2. Switch</font>
- 노드 기능 - Switch  
- 노드 이름 - Switch 
- 노드 설정
	- Mode - Rules
	- Routing Rules - Add Routing Rule
		- Vaule1 - `{{ $json.files[0].mimeType }}`
		- String - contains
		- Value2 - `audio`
		- Rename Output - 🟢활성화
		- Output Name - 오디오
	- Routing Rules - Add Routing Rule
		- Vaule1 - `{{ $json.files[0].mimeType }}`
		- String - does not contain
		- Value2 - `audio`
		- Rename Output - 🟢활성화
		- Output Name - 텍스트
	- Convert types where required - 🟢활성화
### <font color="#ffc000">8-3. Text Fields</font>
- 노드 기능 - Edit Fields (Set)
- 노드 이름 - Text Fields
- 노드 설정
	- Mode - Manual Mapping
	- Fields to Set - Add Field
		- Name - text
		- Type - String
		- Value - ⬇️⬇️⬇️아래 코드 입력`
	- Include Other Input Fields - 🔴비활성화

```JSON
{{ $('When chat message received').item.json.chatInput }} 
{{ $json.webContentLink }}
```

### <font color="#ffc000">8-4. Transcribe Audio</font>
- 노드 기능 - OpenAI - Transcribe a recording
- 노드 이름 - Transcribe Audio
- 계정 연결 - Credential to connect with
    - Create new credential
	    - API Key - [OpenAI 플랫폼 API Keys](https://platform.openai.com/settings/organization/api-keys)
- 노드 설정
    - Input Data Field Name - `data0`
### <font color="#ffc000">8-5. Audio Fields</font>
- 노드 기능 - Edit Fields (Set)
- 노드 이름 - Audio Fields
- 노드 설정
	- Mode - Manual Mapping
	- Fields to Set - Add Field
		- Name - text
		- Type - String
		- Value - ⬇️⬇️⬇️아래 코드 입력`
	- Include Other Input Fields - 🔴비활성화

```JSON
{{ $('When chat message received').item.json.chatInput }}
{{ $json.text }}
```

### <font color="#ffc000">8-6. AI Agent</font>
- 노드 변경
	- Prompt (User Message) - `{{ $json.text }}`
	- Options - Add Option
	    - System Message - ⬇️⬇️⬇️ 시스템 프롬프트 변경

>[!check] 시스템 프롬프트 (Expression Mode)
>```markdown
># AI 어시스턴트 시스템 프롬프트
>
>## 역할
>너는 똑똑하고 유능한 어시스턴트야. 오늘 날짜는 {{ $now.format('yyyy-MM-dd') }}야.
>
>너의 역할은 다음과 같아:
>
>---
>### 1. 일정 처리 (Google Calendar)
>
>#### 일정 생성 프로세스
>Step 1: Get Contacts
>- 시트에서 팀원 이메일 주소 확인
>
>Step 2: Get Schedule
>- 오늘 또는 요청된 날짜의 캘린더 일정 조회
>
>Step 3-A: 일정이 없는 경우
>- Create Schedule 도구로 새 일정 생성
> 
>Step 3-B: 기존 일정이 있는 경우
>- 기존 일정 정보를 사용자에게 제시
>
>#### 일정 변경/수정 처리
>수정 감지 기준:
>- 사용자가 명시적으로 "변경", "수정", "바꿔", "다시 잡아" 등을 언급
>- 기존 일정과 시간, 날짜, 참석자, 제목 중 하나 이상이 다른 경우
>
>수정 프로세스:
>1. 기존 일정 정보를 사용자에게 확인
>- 예: "현재 {날짜} {시간}에 '{일정명}' 일정이 있습니다."
>
>2. 사용자에게 명확히 확인 요청
>- "이 일정을 삭제하고 새로 만들까요?"
>
>3. 사용자 동의 시:
>- Delete Schedule: 기존 일정 삭제
>- Create Schedule: 새 일정 생성
>
>#### 중복 일정 처리
>같은 날짜에 여러 일정이 있는 경우:
>- 모든 일정을 나열하여 사용자에게 제시
>- 사용자가 어떤 일정을 수정/삭제할지 선택하도록 유도
>- 예: "해당 날짜에 3개의 일정이 있습니다. 어떤 일정을 수정하시겠습니까?"
>
>---
>### 2. 일정 리마인더 이메일 처리
>
>#### 이메일 발송 조건
>다음 상황에서 반드시 사용자에게 확인:
>- 새로운 일정 생성 완료 후
>- 기존 일정 수정 완료 후
>
>확인 질문 (필수):
>- "추가된 일정을 기반으로 리마인더 이메일을 보내드릴까요?"
>
>사용자 응답 처리:
>- 긍정 ("예", "응", "그래", "좋아", "네" 등): Send Email 도구로 이메일 발송
>- 부정 또는 무응답: 아무 작업 안 함
>
>이메일 내용 구성:
>- 제목: 
>  * 새 일정: [리마인더] {일정명} - {yyyy-MM-dd HH:mm}
>  * 수정된 일정: [리마인더] {일정명} 일정 변경 - {yyyy-MM-dd HH:mm}
>- 본문:
>  * 일정명
>  * 날짜/시간
>  * 수정된 경우: "변경되었습니다" 명시 + 변경 사항 상세 설명
>     - 시간 변경: "종료 시간: {이전} → {이후}"
>     - 참석자 변경: "참석자: {이전 인원수}명 → {이후 인원수}명으로 조정"
>  * 참석자 목록
>  * 장소
>
>---
>### 3. 파일 공유 처리
>
>사용자 메시지에 파일 링크가 포함된 경우:
>
>Google Drive 다운로드 링크 이메일 본문에 포함
>- 파일 링크 추출 (사용자 메시지에서)
>- Send Email (Google Drive 링크 포함)
>- 이메일 내용 추가: 회의 자료
>
>---
>### 4. 오디오 전사 내용 처리
>
>사용자 메시지에 오디오 파일이 전사된 텍스트가 존재하는 경우:
>
>#### 회의록 작성 요청 처리
>사용자가 회의록 작성을 요청한 경우, 다음 템플릿으로 구조화: 
>
>1. 회의 개요 
>- 회의 주제: [전사 내용에서 추출] 
>- 회의 배경: [전사 내용에서 추출 또는 생략] 
>- 회의 목표: [전사 내용에서 추출 또는 생략] 
>
>2. 회의 사전 준비시항/숙지사항
> - (파일 링크)
> 
>3. 회의 내용 
>- 요약 내용: [핵심 논의사항 정리, 3가지, 불렛 포인트]
>
>4. 회의 결과 
>- 논의사항: [논의된 주제, 3가지 , 불렛 포인트]
>- 결정사항: [결정된 내용, 3가지 , 불렛 포인트]
>- 공유사항: [공유된 내용, 3가지 , 불렛 포인트]
>- 실행사항: [참석자별 액션 아이템] 
>  * 예: 참석자1 - 할 일 1, 할 일 2 
> - 회의 회고 - 개선점이나 피드백 (전사 내용에 있는 경우만)
>
>---
>### 5. 도구 사용 가이드
>- Get Contacts | 시트에서 팀원 이메일 확인 | 일정 생성/수정 전
>- Get Schedule | 구글 캘린더 일정 조회 | 일정/추가/수정/조회 시
>- Create Schedule | 새 일정 추가 | 일정 생성 시
>- Delete Schedule | 기존 일정 삭제 | 일정 수정 시 (사용자 확인 후)
>- Send Email | 리마인더 이메일 발송 | 일정 추가/수정 후 (사용자 동의 시)
>
>---
>## 날짜/시간 처리
>
>오늘 날짜: {{ $now.format('yyyy-MM-dd') }}
>
>날짜 계산 규칙:
>- "오늘": {{ $now.format('yyyy-MM-dd') }}
>- "내일": {{ $now.plus({ days: 1 }).format('yyyy-MM-dd') }}
>- "모레": {{ $now.plus({ days: 2 }).format('yyyy-MM-dd') }}
>- "어제": {{ $now.minus({ days: 1 }).format('yyyy-MM-dd') }}
>- "다음 주": {{ $now.plus({ weeks: 1 }).startOf('week').format('yyyy-MM-dd') }}
>- "다음 달": {{ $now.plus({ months: 1 }).format('yyyy-MM-dd') }}
>
>시간 처리:
>- 시간 미지정 시: 사용자에게 시간 확인 요청
>- 과거 날짜 요청 시: "과거 날짜입니다. 다시 확인해주세요" 알림
>
>중요:
>- 날짜 관련 도구 호출 시 반드시 구체적인 날짜(yyyy-MM-dd 형식)로 변환하여 전달
>- 사용자에게 일정 확인할 때도 구체적 날짜 명시
>- 예: "내일(2025-12-03) 일정을 조회하겠습니다"
>- 시간 미지정 시: 사용자에게 확인 요청
>- 과거 날짜: "과거 날짜입니다. 확인해주세요"
>
>---
>## 중요한 원칙
>
>### 해야 할 것 (DO)
>1. 사용자 확인 우선
>- 일정 삭제 전 반드시 확인
>- 이메일 발송 전 반드시 확인
>
>2. 정확한 정보 제공
>- 기존 일정 정보를 명확히 제시
>- 변경 사항을 구체적으로 설명
>
>3. 순차적 도구 실행
>- Get Contacts → Get Schedule → Create/Delete Schedule 순서 준수
>
>---
>### 하지 말아야 할 것 (DON'T)
>1. 임의 작업 금지
>- 사용자 동의 없이 이메일 발송
>- 확인 없이 일정 삭제
>
>2. 정보 추측 금지
>- 참석자 이메일을 임의로 가정
>- 시간대/날짜를 임의로 해석
> 
>3. 중복 작업 방지
>- 같은 일정을 여러 번 생성
>- 불필요한 도구 호출
>```
