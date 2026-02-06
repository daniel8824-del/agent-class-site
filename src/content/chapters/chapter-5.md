---
title: "Chapter 5 : n8n AI 에이전트 제작 기초"
tags:
  - 에이전트
  - Agent
  - n8n
  - RAG
  - Supabase
  - Embeddings
  - Reranker
  - Cohere
---
#에이전트 #Agent #n8n #RAG #Supabase #Embeddings #Reranker #Cohere 

## <font color="#ffc000">전체 워크플로우 이미지</font>

![](https://publish-01.obsidian.md/access/384f5b99b4a72111068888340c2a7430/90_Settings/92_Attachments/agent_image_23.png)

## <font color="#ffc000">Step 1: n8n 웹호스팅</font>
### <font color="#ffc000">1-1. n8n 클라우드</font>
- 회원가입 및 로그인
- 최초 가입 시 14일 무료 사용
### <font color="#ffc000">1-2. Railway 호스팅</font>
- [Railway](https://railway.com) 
	- [[데이터 클래스 레일웨이 호스팅]]
	- 회원가입 및 로그인
	- Hobby 버전 - $5

![[Pasted image 20251205084516.png]]

## <font color="#ffc000">Step 2: RAG 시스템</font>

![](https://imagedelivery.net/IEMzXmjRvW0g933AN5ejrA/assetsbulletsitefiles-29351d77-094e-8084-a538-e26cd29e592b-attachmentc4945414-4438-4f6e-bd0a-630f096716b0imagepng/format=auto,w=1288)

![](https://imagedelivery.net/IEMzXmjRvW0g933AN5ejrA/assetsbulletsitefiles-29351d77-094e-80b8-8191-e39ce7a361ad-attachment635e059a-2b5f-40dc-8c43-59fe2e4a750cimagepng/format=auto,w=2560)

![](https://imagedelivery.net/IEMzXmjRvW0g933AN5ejrA/assetsbulletsitefiles-29351d77-094e-80c4-8df0-db57a441ec32-attachment796a5519-c002-4f95-9f45-96ef7264abe3imagepng/format=auto,w=1288)

### <font color="#ffc000">2-1. When chat message received</font>
- 워크플로우 - 🟢활성화
- 노드 기능 - Chat Trigger
- 노드 이름 - When chat message received
- 노드 설정
    - Make Chat Publicly Available - 🟢활성화
    - Mode - Hosted Chat
    - Authentication - None
    - Initial Messages - `Hi there! 👋 My name is Daniel. How can I assist you today?`
### <font color="#ffc000">2-2. AI Agent</font>
- 노드 기능 - AI Agent
- 노드 이름 - AI Agent
- 노드 설정
	- Source for Prompt - Connected Chat Trigger Node
	- Prompt (User Message) - `{{ $json.chatInput }}`
	- Require Specific Output Format - 🔴비활성화
	- Enable Fallback Model - 🔴비활성화
### <font color="#ffc000">2-3. OpenAI Chat Model</font>
- 모델 설정 - OpenAI Chat Model
- 노드 이름 - OpenAI Chat Model
- 계정 연결 - Credential to connect with
    - Create new credential
	    - API Key - [OpenAI 플랫폼 API Keys](https://platform.openai.com/settings/organization/api-keys)
- 노드 설정
    - Model - From list - gpt-4.1
    - Use Responses API - 🟢활성화
### <font color="#ffc000">2-4. Supabase 데이터베이스 생성</font>
- [Supabase](https://supabase.com)
	-  회원가입 및 로그인
	- Create a new organization
		- Name - 본인 이름
		- Type - Personal
		- Plan - Free - $0/month
		- Create organization🖱️
	- Create a new project
		- Project name - RAG
		- Database password - 본인 비밀번호
		- Region - Northeast Asia (Seoul)
		- Create new project🖱️

![](https://publish-01.obsidian.md/access/384f5b99b4a72111068888340c2a7430/90_Settings/92_Attachments/public_image_13.png)

![](https://publish-01.obsidian.md/access/384f5b99b4a72111068888340c2a7430/90_Settings/92_Attachments/public_image_12.png)

![](https://publish-01.obsidian.md/access/384f5b99b4a72111068888340c2a7430/90_Settings/92_Attachments/public_image_14.png)

![](https://publish-01.obsidian.md/access/384f5b99b4a72111068888340c2a7430/90_Settings/92_Attachments/public_image_15.png)

### <font color="#ffc000">2-5. Postgres Chat Memory</font>
- 메모리 설정 - Postgres Chat Memory
- 노드 이름 - Postgres Chat Memory
- 계정 연결 - Credential to connect with
    - Create new credential
        - Connect - Method - Session pooler - View parameters
            - host - aws-1-ap-northeast-2.pooler.supabase.com
            - port - 5432
            - database - postgres
            - user - 사용자 엔드포인트
- 노드 설정
	- Session ID - Connected Chat Trigger Node
	- Session Key From Previous Node - `{{ $json.sessionId }}`
	- Table Name - n8n_chat_histories
	- Context Window Length - 5
### <font color="#ffc000">2-6. Supabase Vector Chain</font>
- 툴 설정 - Supabase Vector Store
- 노드 이름 - Supabase Vector Chain
- 계정 연결 - Credential to connect with
	- Create new credential
		- Host - [Supabase](https://supabase.com) - Project Settings - Data API - URL
		- Service Role Secret - [Supabase](https://supabase.com) - Project Settings - API Keys - Secret keys
- 노드 설정
	- Operation Mode
		- Retrieve Documents (As Tool for AI Agent)
	- Table Name
		-  [Supabase](https://supabase.com) - SQL Editor - Quickstarts - Langchain - Run
		- Table Name - From list - documents
	- Limit - 3
	- Include Metadata - 🟢활성화
	- Rerank Results - 🟢활성화
### <font color="#ffc000">2-7. Embeddings Chain</font>
- 임베딩 설정 - Embeddings AI
- 노드 이름 - Embeddings Chain
- 계정 연결 - Credential to connect with
    - Create new credential
	    - API Key - [OpenAI 플랫폼 API Keys](https://platform.openai.com/settings/organization/api-keys)
- 노드 설정
	- Model - text-embedding-3-small
### <font color="#ffc000">2-8. Reranker Cohere</font>
- 리랭커 설정 - Reranker Cohere
- 노드 이름 - Reranker Cohere
- 계정 연결 - Credential to connect with
    - Create new credential
	    - API Key - [Cohere API Keys](https://dashboard.cohere.com/api-keys)
- 노드 설정
	- Model - rerank-v3.5
	- Top N - 3

## <font color="#ffc000">Step 3: RAG 인덱싱</font>
### <font color="#ffc000">3-1. On form submission</font>
- 노드 기능 - On form submission
- 노드 이름 - On form submission
- 노드 설정
	- Authentication - None
	- Form Title - Rag documents
	- Form Description - PDF 파일 업로드
	- Form Elements 
		* Field Name - PDF docuements
		* Element Type -  File
		* Multiple Files - 🔴비활성화
		* Accepted File Types - .pdf
		* Required Field - 활성화
	* Respond When - Form Is Submitted
- 노드 테스트
	- https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%83%81%EB%B2%95
	- 대한민국 상법 법령 PDF 파운로드 - 업로드
### <font color="#ffc000">3-2. Supabase Vector Indexing</font>
- 노드 기능 - Supabase Vector Store - Add documents to vector store
- 노드 이름 - Supabase Vector Indexing
- 계정 연결 - Credential to connect with
	- Create new credential
		- Host - [Supabase](https://supabase.com) - Project Settings - Data API - URL
		- Service Role Secret - [Supabase](https://supabase.com) - Project Settings - API Keys - Secret keys
- 노드 설정
	- Operation Mode - Insert Documents
	- Table Name - From list - documents
	- Embedding Batch Size - 200
### <font color="#ffc000">3-3. Embeddings Indexing</font>
- 임베딩 설정 - Embeddings AI
- 노드 이름 - Embeddings Indexing
- 계정 연결 - Credential to connect with
    - Create new credential
	    - API Key - [OpenAI 플랫폼 API Keys](https://platform.openai.com/settings/organization/api-keys)
- 노드 설정
	- Model - text-embedding-3-small
### <font color="#ffc000">3-4. Default Data Loader</font>
- 도큐먼트 설정 - Default Data Loader
- 노드 이름 - Default Data Loader
- 노드 설정
	- Type of Data - Binary
	- Mode - Load All Input Data
	- Data Format - Automatically Detect by Mime Type
	- Text Splitting - Custom
### <font color="#ffc000">3-5. Recursive Character Text Splitter</font>
- 스플리터 설정 - Recursive Character Text Splitter
- 노드 이름 - Recursive Character Text Splitter
- 노드 설정
	- Chunk Size - 800
	- Chunk Overlap - 200







