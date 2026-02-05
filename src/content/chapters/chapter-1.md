---
title: "Chapter 1 : 오리엔테이션"
tags:
  - 에이전트
  - Agent
  - RAG
  - LangChain
  - LangGraph
---
#에이전트 #Agent #RAG #LangChain #LangGraph 

## <font color="#ffc000">Step 1: 사전 준비사항</font>
### <font color="#ffc000">1-1. 개발 환경 설정</font>
-  [Python 다운로드](https://www.python.org/downloads/)
	- Python 3.11 이상 버전 다운로드
	- 권장 버전 - [Python 3.12.9](https://www.python.org/downloads/release/python-3129)
	- Windows: 64-bit installer 선택
	- Mac: macOS installer 선택
- [Git 다운로드](https://git-scm.com/downloads)
	- 운영체제에 맞는 설치 파일을 다운로드
	- Windows - x64 Setup 선택

```PowerShell
# Python 터미널 빠른 설치 (선택사항)
winget install Python.Python.3.12

# Git 터미널 빠른 설치 (선택사항)
winget install Git.Git
```

### <font color="#ffc000">1-2. 프로젝트 생성</font>
- 내 컴퓨터 - 새 폴더 생성
	- 마우스 우측 클릭 - 터미널에서 열기
	- ⬇️⬇️⬇️ 아래 명령어 순차적으로 입력
`
```PowerShell
# Python 가상환경 생성
python -m venv venv

# 가상환경 활성화 (Windows)
venv\Scripts\activate

# pip 버전 업그레이드
python.exe -m pip install --upgrade pip
```

> [!quote] 가상환경을 활성화하면 프로젝트마다 독립된 파이썬 패키지 환경을 만들어 버전 충돌을 방지합니다. VSCode, Cursor 등 에디터를 사용할 경우 Ctrl + Shift + P를 눌러 Python: Select Interpreter를 검색한 후, 가상환경을 지정해야 합니다.

### <font color="#ffc000">1-3. 노코드 툴 활용</font>
- Cursor AI
	- AI 기반 코드 편집기
	- Visual Studio Code 기반 통합 IDE
	- Claude Code의 경우 CLI 방식
	- [Cursor](https://cursor.com/home) - 다운로드 및 설치
	- 새 폴더 생성 - 프로그램 실행 - 오픈 폴더
- Windsurf AI
	- AI 기반 코드 편집기
	- Visual Studio Code 기반 통합 IDE
	- 무료 플랜 제공 (일일 사용량 제한 있음)
	- [Windsurf](https://windsurf.com) - 다운로드 및 설치
	- 새 폴더 생성 - 프로그램 실행 - 오픈 폴더
- Google Antigravity
	- AI 기반 코드 편집기
	- Visual Studio Code 기반 통합 IDE
	- 개인 사용자에게 무료 제공
	- [Google Antigravity](https://antigravity.google) - 다운로드 및 설치
	- 새 폴더 생성 - 프로그램 실행 - 오픈 폴더

## <font color="#ffc000">Step 2: RAG란 무엇인가?</font>

![[agent_image_01.png]]
### <font color="#ffc000">2-1. RAG의 개념</font>
- 정의
	- Relevance-Augmented Generation의 약자로, 정보 생성 및 검색 작업에서 사용되는 기술
- 특징
	- 질문자의 요구에 맞는 데이터를 검색한 후 텍스트를 생성하여 답변의 정확성을 높임
- 비교
	- ChatGPT 채팅창 🆚 ChatGPT 프로젝트 🆚 나만의 GPTs 🆚 RAG 🆚 파인튜닝

> [!info] ChatGPT와 차이점
> ChatGPT 같은 LLM 모델은 사전 훈련된 데이터에만 의존하여 제한적인 응답을 제공합니다. 
> 반면 RAG는 실시간으로 갱신되는 데이터를 활용해 최신 정보를 반영합니다. 
> 
> 실시간 뉴스나 전문 분야의 데이터베이스를 활용하여 전문성 있는 답변을 생성할 수 있죠. 
> 이런 특징으로 인해 RAG는 더욱 유연하고 정확한 응답을 제공할 수 있습니다.

## <font color="#ffc000">Step 3: RAG의 작동원리</font>

![[agent_image_02.png]]
![[agent_image_03.png]]
- 인덱싱 - 외부 데이터 소스(코드 파일, PDF, 텍스트 문서, 이미지, 스프레드시트, JSON, URL 등)에서 정보를 추출하여 검색 가능한 벡터 형태로 변환

- 데이터를 벡터로 변환하는 이유는 무엇일까요?
	- 효율적인 검색
		- 텍스트를 수치화된 벡터로 변환하면 유사도 검색이 매우 빠르고 효율적으로 수행 가능
	- 의미적 유사성
		- 벡터 공간에서는 비슷한 의미를 가질수록 가까운 거리에 위치하므로 의미 기반 검색 가능
	- 기계학습 호환성
		- AI 모델은 벡터화된 입력을 처리하도록 설계되어 있어, 모델들과 쉽게 통합 가능

### <font color="#ffc000">3-1. 로드(Load)</font>
- 다양한 형식의 데이터를 로드
- 불어올 PDF 파일의 경로를 설정

![[Genesis_2026.pdf]]

```Python
# PDF 문서 로드
# PDF 파일 경로 설정
import os
current_dir = os.path.dirname(os.path.abspath(__file__))  # 현재 파일의 디렉토리
file_path = os.path.join(current_dir, "Genesis_2026.pdf")  # PDF 파일 경로
```

- PyPDF - PDF 파일을 읽고 텍스트를 추출하는 문서 로더
	- PyPDF 로더를 사용하기 위한 라이브러리를 터미널에서 설치
	- 설치 명령어 - `pip install langchain-community pypdf`
	- PyPDF 로더를 활용하여 PDF 파일을 로드하고, 문서의 페이지 수를 확인

```Python
# PyPDF 문서 로드
from langchain_community.document_loaders import PyPDFLoader
loader = PyPDFLoader(file_path)
docs = loader.load()
print(f"\n=== 일반 로드 결과 ===")
print(f"문서 페이지 수: {len(docs)}")
```

- 일반적인 로드 방식
	- 모든 문서를 한 번에 메모리에 로드
	- 작은 문서에 적합
	- 모든 처리가 완료될 때까지 대기

```Python
docs = loader.load()
print(f"\n=== 일반 로드 결과 ===")
print(f"문서 페이지 수: {len(docs)}")
```

- 제너레이터 방식(Lazy Load)
	- 문서를 한 페이지씩 순차적으로 로드
	- 대용량 문서 처리에 적합
	- 필요한 페이지만 처리 가능

```Python
print(f"\n=== 제너레이터 방식 로드 결과 ===")
for i, doc in enumerate(loader.lazy_load()):
    if i >= 10:  # 10페이지까지만 출력하고 멈춤
        break
    print(f"페이지 {i+1}")
    print(f"{doc.page_content[:100]}...")  # 100글자만 출력
    print("\n")
```

- 비동기 방식(Async Load)
	- 비동기적으로 문서를 로드
	- 여러 문서를 동시에 처리할 때 효율적
	- 서버 환경에서 유용

```Python
import asyncio
async def load_docs_async():
    print(f"\n=== 비동기 방식 로드 결과 ===")
    adocs = await loader.aload()
    print(f"비동기 로드 페이지 수: {len(adocs)}")
asyncio.run(load_docs_async())
```

### <font color="#ffc000">3-2. 분할(Split)</font>
- 로드된 문서를 작은 청크(chunks)로 분할
- 분할 방식 종류
	- CharacterTextSplitter
		- 문자 기반 분할
		- 지정된 문자를 기준으로 텍스트를 분할
		- "안녕하세요. 반갑습니다." → `["안녕하세요", "반갑습니다"]`
	- RecursiveCharacterTextSplitter
		- 재귀적 분할
		- 우선순위에 따라 순차적으로 분할
		- 먼저 단락으로 나누고 → 문장으로 나누고 → 단어로 나눔
	- Semantic TextSplitter
		- 의미론적 분할
		- 텍스트의 의미를 고려하여 분할
		- "고양이는 귀엽습니다. 강아지도 귀엽습니다." → 하나의 청크

- RecursiveCharacterTextSplitter
	- RecursiveCharacterTextSplitter 라이브러리를 터미널에서 설치
	- 설치 명령어 - `pip install langchain langchain-text-splitters`
	- 로드된 PDF 파일을 분할하고, 결과를 확인

```Python
# PDF 문서 분할 
# RecursiveCharacterTextSplitter 문서 분할
from langchain_text_splitters import RecursiveCharacterTextSplitter
text_splitter = RecursiveCharacterTextSplitter(
    separators=["\n\n", "\n", ".", " "],  # 분할 구분자 우선순위
    chunk_size=1000,  # 청크 크기 (글자 수)
    chunk_overlap=200,  # 청크 간 중복 영역 (글자 수)
    length_function=len  # 길이 계산 함수
)

splits = text_splitter.split_documents(docs)
print(f"\n=== 문서 분할 결과 ===")
print(f"분할된 청크 수: {len(splits)}")
print(f"\n=== 첫 번째 청크 내용 예시 ===")
print(splits[0].page_content)
```

### <font color="#ffc000">3-3. 임베드(Embed)</font>
- OpenAI 임베딩 모델을 사용해 문서를 벡터로 변환
	- 임베딩 모델을 사용하기 위한 라이브러리를 터미널에서 설치
	- 설치 명령어 - `pip install langchain-openai python-dotenv openai`
	- 환경변수 파일 생성 명령어 - `python -c "with open('.env', 'w', encoding='utf-8') as f: f.write('OPENAI_API_KEY=사용자_API_키')"`

```Python
# OpenAI 임베딩
from dotenv import load_dotenv
load_dotenv()  # .env 파일 로드
from langchain_openai import OpenAIEmbeddings  # OpenAI 임베딩 모듈
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",  # 임베딩 모델 선택
    dimensions=1536,  # 벡터 개수 설정
)

print(f"\n=== 임베딩 테스트 결과 ===")
test_vector = embeddings.embed_query(splits[0].page_content)
print(f"임베딩 벡터 차원 수: {len(test_vector)}")
print(f"임베딩 벡터 예시 (앞 5개): {test_vector[:5]}...")
```

### <font color="#ffc000">3-4. 저장소(Store)</font>
- Chroma 벡터 저장소를 생성하여 변환된 벡터를 저장
	- 벡터 저장소 라이브러리를 터미널에서 설치
	- 설치 명령어 - `pip install chromadb langchain_chroma`

```Python
# Chroma 저장소 생성
from langchain_community.vectorstores import Chroma  # Chroma 벡터 저장소
vectorstore = Chroma.from_documents(
    documents=splits,  # 분할된 문서 목록
    embedding=embeddings,  # 임베딩 모델
    persist_directory="./.chroma_db"  # 벡터 저장소 저장 경로
)

print("\n=== 벡터 저장소 생성 완료 ===")
print(f"저장 위치: {os.path.abspath('./.chroma_db')}")
```

## <font color="#ffc000">Step 4: RAG 시스템 구축</font>
![[agent_image_04.png]]
![[agent_image_05.png]]
![[agent_image_06.png]]

### <font color="#ffc000">4-1. 검색(Retrieve)</font>
- 검색기(Retriever)
	- 벡터 저장소에서 관련 문서를 검색하는 컴포넌트
	- 사용자의 질문과 가장 관련성 높은 문서를 찾아 반환
	- 상위 3개의 가장 관련성 높은 문서를 검색하여 결과를 테스트

```Python
# 필수 라이브러리 임포트
import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

# .env 파일 로드
load_dotenv()

# OpenAI 임베딩 모델 초기화 (벡터 저장소와 동일한 설정 필요)
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    dimensions=1536,
)

# 기존 벡터 저장소 로드
print("\n=== 벡터 저장소 로드 중 ===")
vectorstore = Chroma(
    persist_directory="./.chroma_db",  # Genesis_1.py에서 생성한 저장소 경로
    embedding_function=embeddings
)

# 검색기(Retriever) 설정
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})  # 상위 3개 결과 검색

# 검색기 테스트
query = "타이어가 펑크났어. 해결책을 알려줘"
print(f"\n=== 기본 검색 테스트 ===")
print(f"검색어: {query}")

results = vectorstore.similarity_search(query, k=3)
print("\n=== 검색 결과 ===")
for i, doc in enumerate(results, 1):
    print(f"\n[검색 결과 {i}]")
    print(f"페이지: {doc.metadata.get('page', 'N/A')}")
    print(f"내용: {doc.page_content}\n")
```

### <font color="#ffc000">4-2. 에이전트(Agent)</font>
- 도구(Tools)를 활용하여 복잡한 작업을 자동으로 수행하는 지능형 시스템
- 사용자의 질문을 분석하고, 필요한 도구를 선택하여 실행한 뒤, 결과를 종합하여 답변 생성
- 에이전트 구성 요소
	- LLM
		- 질문을 이해하고 답변을 생성하는 두뇌
		- 어떤 도구를 사용할지 결정
	- Tools
		- 에이전트가 실행할 수 있는 기능들
	-  System Prompt
		- 에이전트의 역할과 행동 방식을 정의

- 벡터 저장소를 로드하고, Retriever를 Tool로 변환하여 에이전트에 연결
- 에이전트 - 검색 필요 판단 → search_manual 도구 실행 → 문서 3개 → LLM 답변
	- 벡터 저장소 라이브러리를 터미널에서 설치
	- 설치 명령어 - `pip install langgraph`

> [!question] LangGraph란?
> LangGraph는 LangChain에서 제공하는 에이전트 오케스트레이션 라이브러리입니다. 
> 에이전트가 여러 도구를 순차적으로 실행하고, 결과를 조합하여 복잡한 작업을 수행할 수 있도록 지원합니다.

```Python
# 필수 라이브러리 임포트
import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

# .env 파일 로드
load_dotenv()

# OpenAI 임베딩 모델 초기화 (벡터 저장소와 동일한 설정 필요)
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    dimensions=1536,
)

# 기존 벡터 저장소 로드
print("\n=== 벡터 저장소 로드 중 ===")
vectorstore = Chroma(
    persist_directory="./.chroma_db",  # Genesis_1.py에서 생성한 저장소 경로
    embedding_function=embeddings
)

# 검색기(Retriever) 설정
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})  # 상위 3개 결과 검색

# 추가 라이브러리 임포트
from langchain.agents import create_agent
from langchain.tools import tool
from langchain_openai import ChatOpenAI

# Retriever를 Tool로 변환 (공식 방식)
@tool(response_format="content_and_artifact")
def search_manual(query: str):
    """제네시스 차량 매뉴얼을 검색합니다. 차량 문제, 기능 사용법, 유지보수 정보 등을 찾을 때 사용하세요."""
    # Retriever로 검색
    retrieved_docs = vectorstore.similarity_search(query, k=3)
    
    # 검색된 문서를 문자열로 포맷팅
    if not retrieved_docs:
        return "관련 정보를 찾을 수 없습니다.", []
    
    serialized = "\n\n".join(
        f"[페이지 {doc.metadata.get('page', 'N/A')}]\n{doc.page_content}"
        for doc in retrieved_docs
    )
    
    # content와 artifact(원본 문서) 모두 반환
    return serialized, retrieved_docs

# LLM 모델 초기화
model = ChatOpenAI(
    model="gpt-4.1",
    temperature=0.2
)

# 에이전트 생성
tools = [search_manual]
prompt = (
    "당신은 현대자동차 제네시스 매뉴얼 전문가입니다.\n"
    "사용자의 질문에 친절하고 전문적으로 답변해주세요.\n"
    "특히 안전과 관련된 내용은 반드시 강조해서 설명해주세요.\n\n"
    "매뉴얼을 검색할 때는 search_manual 도구를 사용하세요."
)

agent = create_agent(model, tools, system_prompt=prompt)

# Q&A 대화형 인터페이스
print("\n=== 제네시스 매뉴얼 Q&A 챗봇 ===")
print("종료하려면 'q' 또는 'quit'를 입력하세요.\n")

while True:
    user_question = input("질문: ")
    
    if user_question.lower() in ['q', 'quit', '종료']:
        print("\n챗봇을 종료합니다.")
        break
    
    if not user_question.strip():
        continue
    
    try:
        # 에이전트 실행
        result = agent.invoke({
            "messages": [{"role": "user", "content": user_question}]
        })
        
        # 최종 답변 출력
        final_message = result["messages"][-1]
        print(f"\n답변: {final_message.content}\n")
        print("-" * 70 + "\n")
        
    except Exception as e:
        print(f"\n오류 발생: {e}\n")
        continue
```
