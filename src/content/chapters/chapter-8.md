---
title: "Chapter 8 : n8n AI 에이전트 제작 기초"
tags:
  - 에이전트
  - Agent
  - n8n
  - MCP
  - A2A
  - Supabase
  - Postgres
  - 공공데이터
  - GIS
---
#에이전트 #Agent #n8n #MCP #A2A #Supabase #Postgres #공공데이터 #GIS 

## <font color="#ffc000">Step 1: 트리거 세팅</font>
### <font color="#ffc000">1-1. Schedule Trigger</font>
- 노드 기능 - On a schedule
- 노드 이름 - Schedule Trigger
- 노드 설정
	- Trigger Rules
		- Trigger Interval - Minutes
		- Minutes Between Triggers - 10

## <font color="#ffc000">Step 2: API 발급</font>
### <font color="#ffc000">2-1. 서울시 공공자전거 실시간 대여정보</font>
- [크롬 웹 스토어](https://chromewebstore.google.com) - [JSON-handle](https://chromewebstore.google.com/detail/json-handle/iahnhfdhidomcpggpaimmmahffihkfnj?hl=ko&utm_source=ext_sidebar) - 크롬에 추가 - 확장 프로그램 추가
- [서울 열린데이터 광장](https://data.seoul.go.kr) - 서울시 통합 회원가입 - 로그인
- [서울시 공공자전거 실시간 대여정보](https://data.seoul.go.kr/dataList/OA-15493/A/1/datasetView.do) - Open API - 인증키 신청
	- 서비스(사용) 환경 - 웹 사이트 개발
	- 사용URL - `https://www.naver.com`
	- 관리용 대표 이메일 - 본인 이메일
	- 활용용도 - 데이터 분석
	- 내용 - 데이터 분석
	- 인증키 발급 알림 - 인증키 안내 - 인증키 목록 - 인증키 복사
- 샘플 URL - `http://openapi.seoul.go.kr:8088/(인증키)/json/bikeList/1/5/`
### <font color="#ffc000">2-2. 서울시 공공자전거 대여소 정보</font>
- [서울시 공공자전거 대여소 정보](https://data.seoul.go.kr/dataList/OA-13252/F/1/datasetView.do) - Open API - 인증키 신청
- 샘플 URL - `http://openapi.seoul.go.kr:8088/(인증키)/json/tbCycleStationInfo/1/5/`
### <font color="#ffc000">2-3. 서울시 역사 마스터 정보</font>
- [서울시 역사 마스터 정보](https://data.seoul.go.kr/dataList/OA-21232/S/1/datasetView.do) - Open API - 인증키 신청
- 샘플 URL - `http://openapi.seoul.go.kr:8088/(인증키)/xml/subwayStationMaster/1/5/`
### <font color="#ffc000">2-4. 서울시 실시간 도시 데이터</font>
- [서울시 실시간 도시 데이터](https://data.seoul.go.kr/dataList/OA-21285/F/1/datasetView.do) - Open API - 인증키 신청
- 샘플 URL - `http://openapi.seoul.go.kr:8088/(인증키)/xml/citydata/1/5/광화문·덕수궁`
- CSV 명세서 - [구글 시트](https://docs.google.com/spreadsheets/d/1lGLqPAYzJ_VG4JdS5FOLNARXo6jJG8BsQfxHXvzS4Z4/edit?usp=sharing) 클릭 - 사본 만들기
### <font color="#ffc000">2-5. API Fields</font>
- 노드 기능 - Edit Fields (Set)
- 노드 이름 - Edit Fields
- 노드 설정
	- Mode - Manual Mapping
	- Fields to Set
		- `API KEY` - String - `7370516a74693634393954584a416d`
	- Include Other Input Fields - 🔴비활성화
	- Options - Add Option
		- Ignore Type Conversion Errors - 🟢활성화

## <font color="#ffc000">Step 3: 데이터 수집</font>
### <font color="#ffc000">3-1. Bycicle API (1-1000)</font>
- 노드 기능 - HTTP Request
- 노드 이름 - Bycicle API (1-1000)
- 노드 설정`
	- Method - GET
	- URL - `http://openapi.seoul.go.kr:8088/{{ $json['API KEY'] }}/json/bikeList/1/1000`
	- Authentication - None
	- Send Query Parameters - 🔴비활성화
	- Send Headers - 🔴비활성화
	- Send Body - 🔴비활성화
### <font color="#ffc000">3-2. Bycicle API (1001-2000)</font>
- 노드 기능 - HTTP Request
- 노드 이름 - Bycicle API (1001-2000)
- 노드 설정`
	- Method - GET
	- URL - `http://openapi.seoul.go.kr:8088/{{ $json['API KEY'] }}/json/bikeList/1001/2000`
	- Authentication - None
	- Send Query Parameters - 🔴비활성화
	- Send Headers - 🔴비활성화
	- Send Body - 🔴비활성화
### <font color="#ffc000">3-3. Bycicle API (2001-3000)</font>
- 노드 기능 - HTTP Request
- 노드 이름 - Bycicle API (2001-3000)
- 노드 설정`
	- Method - GET
	- URL - `http://openapi.seoul.go.kr:8088/{{ $json['API KEY'] }}/json/bikeList/2001/3000`
	- Authentication - None
	- Send Query Parameters - 🔴비활성화
	- Send Headers - 🔴비활성화
	- Send Body - 🔴비활성화
### <font color="#ffc000">3-4. Merge</font>
- 노드 기능 - [[Merge]]
- 노드 이름 - Merge
- 노드 설정
	- Mode - Append
	- Number of Inputs - 3
	    - Input 1 - Bycicle API (1-1000) ▶️ Merge
	    - Input 2 - Bycicle API (1001-2000) ▶️ Merge
	    - Input 3 - Bycicle API (2001-3000) ▶️ Merge
### <font color="#ffc000">3-5. Split Out</font>
- 노드 기능 - Split Out
- 노드 이름 - Split Out
- 노드 설정
    - Field To Split Out - `rentBikeStatus.row`
    - Include - No Other Fields

## <font color="#ffc000">Step 4: 데이터 저장</font>
### <font color="#ffc000">4-1. Convert to File</font>
- 노드 기능 - Convert to File - Convert to CSV
- 노드 이름 - Convert to CSV
- 노드 설정
	- Operation - Convert to CSV
	- Put Output File in Field - data
	- Options - Add option
		- File Name - bicycle.csv
### <font color="#ffc000">4-2. Supabase 프로젝트 생성</font>
- [Supabase](https://supabase.com) 접속 - Sign In - Sign In Now
- Create a new organization
	- Name - 본인 이름
	- Type - Personal
	- Plan - Free - $0/month
	- Create organization🖱️
- Create a new project
	- Project name - n8n-data-project
	- Database password - 본인 비밀번호
	- Region - Northeast Asia (Seoul)
	- Create new project🖱️
### <font color="#ffc000">4-3. Supabase 실시간 대여정보 테이블</font>
- 왼쪽 사이드바 - SQL Editor - ⬇️⬇️⬇️ 아래 쿼리 실행

> [!important] 서울시 공공자전거 실시간 대여정보 테이블 생성
> ```sql
> -- 기본 테이블 생성
> CREATE TABLE bicycle_seoul (
>     stationId text NOT NULL,
>     stationName text NOT NULL,
>     rackTotCnt int8 NOT NULL,
>     parkingBikeTotCnt int8 NOT NULL,
>     shared int8 NOT NULL,
>     stationLatitude float8 NOT NULL,
>     stationLongitude float8 NOT NULL,
>     PRIMARY KEY (stationId)
> );
> 
> -- 인덱스 생성 (검색 성능 향상)
> CREATE INDEX idx_stations_name ON bicycle_seoul(stationName);
> CREATE INDEX idx_stations_location ON bicycle_seoul(stationLatitude, stationLongitude);
> ```

### <font color="#ffc000">4-4. Bycicle Seoul</font>
- 노드 기능 - Postgres - Insert or update rows in a table
- 노드 이름 - Bicycle Seoul
- 계정 연결 - Credential to connect with
    - Create new credential
	- Connect - Method - Session pooler - View parameters
		- 계정 이름 - Postgres Bicycle
		- Host - aws-1-ap-northeast-2.pooler.supabase.com
		- Database - postgres
		- User - 사용자 엔드포인트
		- Password - 사용자 패스워드
		- Port - 5432
- 노드 설정
	- Operation - Insert or Update
	- Schema - public
	- Table - bicycle_seoul
	- Mapping Columns to match on - stationId
	- Values to Send
		- stationid (using to match) - `{{ $('Split Out').item.json.stationId }}`
		- stationname - `{{ $json.stationName }}`
		- racktotcnt - `{{ $json.rackTotCnt }}`
		- parkingbiketotcnt - `{{ $json.parkingBikeTotCnt }}`
		- shared - `{{ $json.shared }}`
		- stationlatitude - `{{ $json.stationLatitude }}`
		- stationlongitude - `{{ $json.stationLongitude }}`
### <font color="#ffc000">4-5. 그 외 데이터 수집 및 저장</font>
- 서울시 공공자전거 대여소 정보 - 데이터 수집 및 저장
- 서울시 역사 마스터 정보 - 데이터 수집 및 저장
- 서울시 실시간 도시 데이터 - 데이터 실시간 수집 및 저장 불가
- n8n 워크플로우
	- [[서울시 공공자전거 대여소 및 지하철 JSON 스크립트]] 복사 및 붙여넣기
### <font color="#ffc000">4-6. Supabase 대여소 정보 테이블</font>
- 왼쪽 사이드바 - SQL Editor - ⬇️⬇️⬇️ 아래 쿼리 실행

> [!quote] 서울시 공공자전거 대여소 정보 테이블 생성
> ```sql
> -- 정거장 마스터 데이터 테이블 생성
> CREATE TABLE bicycle_station (
>     rent_id text NOT NULL PRIMARY KEY,
>     sta_loc text NOT NULL,
>     rent_no text NOT NULL,
>     rent_nm text NOT NULL,
>     rent_id_nm text NOT NULL,
>     hold_num int8 NOT NULL,
>     sta_add1 text NOT NULL,
>     sta_add2 text,
>     sta_lat float8 NOT NULL,
>     sta_long float8 NOT NULL,
>     start_index int8,
>     end_index int8,
>     rnum int8
> );
> 
> -- 인덱스 생성 (검색 성능 향상)
> CREATE INDEX idx_bicycle_station_loc ON bicycle_station(sta_loc);
> CREATE INDEX idx_bicycle_station_name ON bicycle_station(rent_nm);
> CREATE INDEX idx_bicycle_station_location ON bicycle_station(sta_lat, sta_long);
> CREATE INDEX idx_bicycle_station_rent_no ON bicycle_station(rent_no);
> 
> -- 코멘트 추가 (문서화)
> COMMENT ON TABLE bicycle_station IS '서울시 공공자전거 정거장 마스터 데이터';
> COMMENT ON COLUMN bicycle_station.rent_id IS '정거장 고유 ID (예: ST-10)';
> COMMENT ON COLUMN bicycle_station.sta_loc IS '위치 구 (예: 마포구)';
> COMMENT ON COLUMN bicycle_station.rent_no IS '대여소 번호 (예: 00108)';
> COMMENT ON COLUMN bicycle_station.rent_nm IS '대여소 이름 (예: 서교동 사거리)';
> COMMENT ON COLUMN bicycle_station.rent_id_nm IS '대여소 전체 이름';
> COMMENT ON COLUMN bicycle_station.hold_num IS '거치대 총 개수';
> COMMENT ON COLUMN bicycle_station.sta_add1 IS '주소1 (도로명 주소)';
> COMMENT ON COLUMN bicycle_station.sta_add2 IS '주소2 (상세 주소)';
> COMMENT ON COLUMN bicycle_station.sta_lat IS '위도';
> COMMENT ON COLUMN bicycle_station.sta_long IS '경도';
> ```

### <font color="#ffc000">4-7. Bicycle Station</font>
- 노드 기능 - Supabase - Create a row
- 노드 이름 - Bicycle Station
- 계정 연결 - Credential to connect with
    - Create new credential
		- 계정 이름 - Supabase Bicycle
		- Host - [Supabase](https://supabase.com) - Project Settings - Data API - URL
		- Service Role Secret - [Supabase](https://supabase.com) - Project Settings - API Keys - Secret keys
- 노드 설정
	- Resource - Row
	- Operation - Create
	- Table Name or ID - bicycle_station
	- Data to Send - Define Below for Each Column
	- Fields to Send
		- rent_id (string) - `{{ $json.RENT_ID }}`
		- sta_loc (string) - `{{ $json.STA_LOC }}`
		- rent_no (string) - `{{ $json.RENT_NO }}`
		- rent_nm (string) - `{{ $json.RENT_NM }}`
		- rent_id_nim (string) - `{{ $json.RENT_ID_NM }}`
		- hold_num (integer) - `{{ $json.HOLD_NUM && $json.HOLD_NUM !== '' ? parseInt($json.HOLD_NUM) : 0 }}`
		- sta_add1 (string) - `{{ $json.STA_ADD1 }}`
		- sta_add2 (string) - `{{ $json.STA_ADD2 }}`
		- sta_lat (number) - `{{ parseFloat($json.STA_LAT) }}`
		- sta_long (number) - `{{ parseFloat($json.STA_LONG) }}`
		- start_index (integer) - `{{ parseInt($json.START_INDEX) }}`
		- end_index (integer) - `{{ parseInt($json.END_INDEX) }}`
		- rnum (integer) - `{{ parseInt($json.RNUM) }}`
- 노드 세팅 - 데이터 저장 후 Deactivated
### <font color="#ffc000">4-8. Supabase 관계형 테이블</font>
- 왼쪽 사이드바 - SQL Editor - ⬇️⬇️⬇️ 아래 쿼리 실행

> [!example] 누락된 대여소 정보 자동 추가
> ```sql
> -- 모든 누락된 정거장 자동 추가
> INSERT INTO bicycle_station (
>     rent_id, sta_loc, rent_no, rent_nm, rent_id_nm, 
>     hold_num, sta_add1, sta_lat, sta_long
> )
> SELECT DISTINCT ON (stationid)
>     stationid,
>     '미등록',        -- sta_loc (기본값)
>     '99999',         -- rent_no (임시 번호)
>     stationname,
>     stationname,     -- rent_id_nm (이름 복사)
>     racktotcnt,
>     '주소 미등록',    -- sta_add1 (기본값)
>     stationlatitude,
>     stationlongitude
> FROM bicycle_seoul
> WHERE stationid IN (
>     'ST-3411', 'ST-3412', 'ST-3413', 'ST-3414', 'ST-3415', 
>     'ST-3416', 'ST-3417', 'ST-3418', 'ST-3419', 'ST-3420', 
>     'ST-3421', 'ST-3422', 'ST-3423', 'ST-3424'
> );
> ```

> [!warning] 외래키(Foreign Key) 연결 설정
> ```sql
> -- bicycle_seoul → bicycle_station 외래키 추가
> ALTER TABLE bicycle_seoul
> ADD CONSTRAINT fk_bicycle_seoul_station
> FOREIGN KEY (stationid) 
> REFERENCES bicycle_station(rent_id)
> ON DELETE RESTRICT
> ON UPDATE CASCADE;
> ```

### <font color="#ffc000">4-9. Supabase 역사 마스터 테이블</font>
- 왼쪽 사이드바 - SQL Editor - ⬇️⬇️⬇️ 아래 쿼리 실행

> [!success] 서울시 역사 마스터 정보 테이블 생성
> ```sql
> -- 지하철역 마스터 데이터 테이블 생성
> CREATE TABLE subway_station (
>     station_id text NOT NULL PRIMARY KEY,
>     station_nm text NOT NULL,
>     line_nm text NOT NULL,
>     station_lat float8 NOT NULL,
>     station_long float8 NOT NULL
> );
> 
> -- 인덱스 생성 (검색 성능 향상)
> CREATE INDEX idx_subway_station_name ON subway_station(station_nm);
> CREATE INDEX idx_subway_station_line ON subway_station(line_nm);
> CREATE INDEX idx_subway_station_location ON subway_station(station_lat, station_long);
> 
> -- 코멘트 추가 (문서화)
> COMMENT ON TABLE subway_station IS '서울 지하철역 마스터 데이터';
> COMMENT ON COLUMN subway_station.station_id IS '역 고유 ID (예: 0150)';
> COMMENT ON COLUMN subway_station.station_nm IS '역 이름 (예: 서울역)';
> COMMENT ON COLUMN subway_station.line_nm IS '호선명 (예: 1호선)';
> COMMENT ON COLUMN subway_station.station_lat IS '위도 (LAT)';
> COMMENT ON COLUMN subway_station.station_long IS '경도 (LOT)';
> ```

### <font color="#ffc000">4-10. Subway Station</font>
- 노드 기능 - Supabase - Create a row
- 노드 이름 - Bicycle Station
- 계정 연결 - Supabase Bicycle
- 노드 설정
	- Resource - Row
	- Operation - Create
	- Table Name or ID - subway_station
	- Data to Send - Define Below for Each Column
	- Fields to Send
		- station_id (string) - `{{ $json.BLDN_ID }}`
		- station_nm (string) - `{{ $json.BLDN_NM }}`
		- line_nm (string) - `{{ $json.ROUTE }}`
		- station_lat (number) - `{{ parseFloat($json.LAT) }}`
		- station_long (number) - `{{ parseFloat($json.LOT) }}`
- 노드 세팅 - 데이터 저장 후 Deactivated
### <font color="#ffc000">4-11. PostGIS 활성화</font>
- 왼쪽 사이드바 - SQL Editor - ⬇️⬇️⬇️ 아래 쿼리 실행

> [!note] PostGIS 확장기능 활성화 (공간 데이터 처리)
> ```sql
> -- PostGIS 활성화
> CREATE EXTENSION IF NOT EXISTS postgis;
> 
> -- 설치 확인 (버전 조회)
> SELECT PostGIS_Version();
> ```

> [!danger] 자전거 정거장 공간 데이터 변환 및 인덱싱
> ```sql
> -- 1. geometry 컬럼 추가 (이미 있으면 스킵)
> DO $$ 
> BEGIN
>     IF NOT EXISTS (
>         SELECT 1 
>         FROM information_schema.columns 
>         WHERE table_name = 'bicycle_station' 
>         AND column_name = 'location'
>     ) THEN
>         ALTER TABLE bicycle_station 
>         ADD COLUMN location geography(Point, 4326);
>     END IF;
> END $$;
> 
> -- 2. 기존 위도/경도로 geometry 생성
> -- 주의: ST_MakePoint는 (경도, 위도) 순서입니다. (X, Y)
> UPDATE bicycle_station
> SET location = ST_SetSRID(
>     ST_MakePoint(sta_long, sta_lat), 
>     4326
> )::geography
> WHERE location IS NULL;  -- location이 비어있는 행만 업데이트
> 
> -- 3. 인덱스 생성 (공간 검색 성능 최적화)
> CREATE INDEX IF NOT EXISTS idx_bicycle_station_location 
> ON bicycle_station USING GIST(location);
> 
> -- 4. NOT NULL 제약 추가 (선택사항)
> DO $$ 
> BEGIN
>     ALTER TABLE bicycle_station 
>     ALTER COLUMN location SET NOT NULL;
> EXCEPTION
>     WHEN others THEN
>         RAISE NOTICE 'NOT NULL constraint already exists or failed';
> END $$;
> ```

> [!important] 지하철역 공간 데이터 변환 및 인덱싱
> ```sql
> -- 1. geometry 컬럼 추가
> DO $$ 
> BEGIN
>     IF NOT EXISTS (
>         SELECT 1 
>         FROM information_schema.columns 
>         WHERE table_name = 'subway_station' 
>         AND column_name = 'location'
>     ) THEN
>         ALTER TABLE subway_station 
>         ADD COLUMN location geography(Point, 4326);
>     END IF;
> END $$;
> 
> -- 2. 기존 위도/경도로 geometry 생성 (올바른 컬럼명 확인)
> UPDATE subway_station
> SET location = ST_SetSRID(
>     ST_MakePoint(station_long, station_lat), 
>     4326
> )::geography
> WHERE location IS NULL;
> 
> -- 3. 인덱스 생성
> CREATE INDEX IF NOT EXISTS idx_subway_station_location 
> ON subway_station USING GIST(location);
> 
> -- 4. NOT NULL 제약 추가
> DO $$ 
> BEGIN
>     ALTER TABLE subway_station 
>     ALTER COLUMN location SET NOT NULL;
> EXCEPTION
>     WHEN others THEN
>         RAISE NOTICE 'NOT NULL constraint already exists or failed';
> END $$;
> ```

## <font color="#ffc000">Step 5: MCP 서버 세팅</font>
### <font color="#ffc000">5-1. Seoul City MCP Server</font>
- 워크플로우 - 🟢활성화
- 노드 기능 - MCP Server Trigger
- 노드 이름 - Seoul City MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - Create new credential 
		- 계정 이름 - n8n Bearer account
		- Bearer Token - [UUID](https://www.uuidgenerator.net/) 복사 및 저장
		- Allowed HTTP Request Domains - All
	- Path - seoul-city
### <font color="#ffc000">5-2. Get City Location</font>
- 툴 설정 - Google Sheets Tool
- 노드 이름 - Get City Location
- 계정 연결 
	- n8n 클라우드 - 구글 계정 연동
	- 별도 호스팅 - [[n8n과 Google 계정 연동하기]]
- 노드 설정
	- CSV 명세서 - [구글 시트](https://docs.google.com/spreadsheets/d/1lGLqPAYzJ_VG4JdS5FOLNARXo6jJG8BsQfxHXvzS4Z4/edit?usp=sharing) 클릭 - 사본 만들기
	- Tool Description - Set Automatically
	- Resource - Sheet Within Document
	- Operation - Get Row(s)
	- Document - From list - 서울시 주요 120 장소 목록
	- Sheet - From list - 시트1
	- Filters - Add Filter
		- Column - AREA_NM
		- Value - `🌟Let the model define this parameter`
		- Add a description - ⬇️⬇️⬇️ 아래 내용 입력

> [!quote] 서울시 주요 120개 장소 Description
> ```markdown
> 시스템 역할
> 사용자의 자연어 입력(예: "광화문", "강남", "홍대")을 분석하여, 
> 서울시 실시간 도시데이터(Seoul City Data)가 제공하는 
> 120개 주요 장소(POI) 목록 중 가장 적합한 표준 지역명(AREA_NM)을 매칭합니다.
> 
> 매칭 예시 (User Input -> AI Output)
> - "광화문 가고 싶어"   -> "광화문·덕수궁"
> - "강남역 근처 사람 많아?" -> "강남역"
> - "홍대 약속 있어"     -> "홍대입구역(2호선)"
> - "성수동 카페 갈래"    -> "성수카페거리"
> 
> 관리 대상 장소 카테고리 (총 120개 POI)
> 1. 관광특구 (7곳)
>    - 강남 MICE, 동대문, 명동, 이태원, 잠실, 종로·청계, 홍대 관광특구
> 
> 2. 주요 지하철역
>    - 강남역, 홍대입구역(2호선), 잠실역, 신촌·이대역, 서울역, 
>    - 고속터미널역, 교대역, 건대입구역, 구로디지털단지역 등
> 
> 3. 발달상권
>    - 가로수길, 성수카페거리, 압구정로데오, 연남동, 용리단길, 
>    - 익선동, 북촌한옥마을, 해방촌 등
> 
> 4. 공원
>    - 뚝섬한강공원, 망원한강공원, 반포한강공원, 여의도한강공원, 
>    - 잠실한강공원, 남산공원, 서울숲공원, 올림픽공원 등
> ```

### <font color="#ffc000">5-3. Get City Data</font>
- 툴 설정 - HTTP Request Tool
- 노드 이름 - Get City Data
- 노드 설정
	- Description - ⬇️⬇️⬇️ 아래 내용 입력`
	- Method - GET
	- URL - `http://openapi.seoul.go.kr:8088/5a45416d4b693634373754567a5465/json/citydata/1/5/{{ encodeURIComponent($fromAI('area_name', '지역명 (예: 강남역, 홍대입구역(2호선), 광화문·덕수궁)', 'string')) }}`
	- Authentication - None
	- Send Query Parameters - 🔴비활성화
	- Send Headers - 🔴비활성화
	- Send Body - 🔴비활성화
	- Optimize Response - 🔴비활성화

> [!example] 서울시 실시간 도시데이터 API Description
> ```text
> 서울시 실시간 도시데이터 API - 특정 지역의 통합 실시간 정보 조회
> 
> 【API 개요】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 사용자가 입력한 장소명을 기반으로 120개 POI 중 매칭된 지역의 실시간 데이터를 제공합니다.
> 
> 【1. 공통 응답 필드】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> - list_total_count: 총 데이터 건수
> - RESULT.CODE: 요청결과 코드
> - RESULT.MESSAGE: 요청결과 메시지
> - AREA_NM: 핫스팟 장소명
> - AREA_CD: 핫스팟 코드명
> 
> 【2. 실시간 인구 현황 (LIVE_PPLTN_STTS)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 혼잡도 관련:
> - AREA_CONGEST_LVL: 장소 혼잡도 지표 (여유/보통/약간붐빔/붐빔)
> - AREA_CONGEST_MSG: 장소 혼잡도 메시지
> - AREA_PPLTN_MIN/MAX: 실시간 인구 지표 최소/최대값
> 
> 성별/연령별 비율:
> - MALE_PPLTN_RATE: 남성 인구 비율
> - FEMALE_PPLTN_RATE: 여성 인구 비율
> - PPLTN_RATE_0: 0~10세 비율
> - PPLTN_RATE_10~70: 10대~70대 비율
> 
> 거주지 구분:
> - RESNT_PPLTN_RATE: 상주 인구 비율
> - NON_RESNT_PPLTN_RATE: 비상주 인구 비율
> - PPLTN_TIME: 데이터 업데이트 시간
> - REPLACE_YN: 대체 데이터 여부
> 
> 예측 데이터:
> - FCST_YN: 예측값 제공 여부
> - FCST_PPLTN: 인구 예측값
> - FCST_TIME: 인구 예측시점
> - FCST_CONGEST_LVL: 예측 혼잡도
> - FCST_PPLTN_MIN/MAX: 예측 인구 최소/최대값
> 
> 【3. 도로 소통 현황 (ROAD_TRAFFIC_STTS)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 전체 도로 소통:
> - ROAD_TRAFFIC_SPD: 전체 도로 소통 평균 속도
> - ROAD_TRAFFIC_IDX: 전체 도로 소통 평균 현황
> - ROAD_TRAFFIC_TIME: 데이터 업데이트 시간
> - ROAD_MSG: 전체 도로 소통 메시지
> 
> 개별 도로 구간:
> - LINK_ID: 도로구간 LINK ID
> - ROAD_NM: 도로명
> - START_ND_CD/NM/XY: 시작 노드 코드/명/좌표
> - END_ND_CD/NM/XY: 종료 노드 코드/명/좌표
> - DIST: 도로구간 길이
> - SPD: 도로구간 평균 속도
> - IDX: 도로구간 소통 지표
> - XYLIST: 링크 아이디 좌표(보간점)
> 
> 【4. 주차장 현황 (PRK_STTS)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 기본 정보:
> - PRK_NM: 주차장명
> - PRK_CD: 주차장 코드
> - PRK_TYPE: 주차장 구분
> - CPCTY: 주차장 수용 가능 면수
> - CUR_PRK_CNT: 주차 가능 면수
> - CUR_PRK_TIME: 데이터 업데이트 시간
> - CUR_PRK_YN: 실시간 주차 현황 제공 여부
> 
> 요금 정보:
> - PAY_YN: 유무료 여부
> - RATES: 기본 주차 요금
> - TIME_RATES: 기본 주차 단위 시간
> - ADD_RATES: 추가 주차 단위 요금
> - ADD_TIME_RATES: 추가 주차 단위 시간
> 
> 위치 정보:
> - ROAD_ADDR: 도로명 주소
> - ADDRESS: 지번 주소
> - LAT: 위도
> - LNG: 경도
> 
> 【5. 지하철 실시간 도착 현황 (SUB_STTS)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 역 정보:
> - SUB_STN_NM: 지하철역명
> - SUB_STN_LINE: 지하철역 호선
> - SUB_STN_RADDR: 도로명 주소
> - SUB_STN_JIBUN: 지번 주소
> - SUB_STN_X/Y: 좌표 (경도/위도)
> - SUB_NT_STN: 다음역 코드
> - SUB_BF_STN: 이전역 코드
> 
> 열차 도착 정보:
> - SUB_ROUTE_NM: 지하철 노선명
> - SUB_LINE: 지하철 호선
> - SUB_ORD: 도착 예정 열차 순번
> - SUB_DIR: 지하철 방향
> - SUB_TERMINAL: 종착역
> - SUB_ARVTIME: 열차 도착 시간
> - SUB_ARMG1/2: 열차 도착 메시지
> - SUB_ARVINFO: 열차 도착 코드 정보
> 
> 교통약자 시설:
> - SUB_FACINFO: 교통약자 이용시설 현황
> - ELVTR_NM: 승강기명
> - OPR_SEC: 운행 구간
> - INSTL_PSTN: 설치 위치
> - USE_YN: 운행 상태
> - ELVTR_SE: 승강기 구분
> 
> 실시간 승하차 인원:
> - LIVE_SUB_PPLTN: 실시간 지하철 승하차 인원
> - SUB_ACML_GTON_PPLTN_MIN/MAX: 누적 승차 인원
> - SUB_ACML_GTOFF_PPLTN_MIN/MAX: 누적 하차 인원
> - SUB_30WTHN_GTON_PPLTN_MIN/MAX: 30분 이내 승차
> - SUB_30WTHN_GTOFF_PPLTN_MIN/MAX: 30분 이내 하차
> - SUB_10WTHN_GTON_PPLTN_MIN/MAX: 10분 이내 승차
> - SUB_10WTHN_GTOFF_PPLTN_MIN/MAX: 10분 이내 하차
> - SUB_5WTHN_GTON_PPLTN_MIN/MAX: 5분 이내 승차
> - SUB_5WTHN_GTOFF_PPLTN_MIN/MAX: 5분 이내 하차
> - SUB_STN_CNT: 장소 내 지하철역 개수
> - SUB_STN_TIME: 기준 년월
> 
> 【6. 버스정류소 현황 (BUS_STN_STTS)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 정류소 정보:
> - BUS_RESULT_MSG: 버스 데이터 호출 메시지
> - BUS_STN_ID: 정류소 ID
> - BUS_ARS_ID: 정류소 고유번호
> - BUS_STN_NM: 정류소명
> - BUS_STN_X/Y: 좌표 (경도/위도)
> 
> 노선 정보:
> - RTE_STN_NM: 노선 조회 기준 정류장명
> - RTE_NM: 노선명
> - RTE_ID: 노선 ID
> - RTE_SECT: 노선 구간
> - RTE_CONGEST: 노선 혼잡도
> - RTE_ARRV_TM: 노선 예상 도착 시간
> - RTE_ARRV_STN: 노선 최근 도착 정류장
> 
> 실시간 승하차 인원:
> - LIVE_BUS_PPLTN: 실시간 버스 승하차 인원
> - BUS_ACML_GTON_PPLTN_MIN/MAX: 누적 승차 인원
> - BUS_ACML_GTOFF_PPLTN_MIN/MAX: 누적 하차 인원
> - BUS_30WTHN_GTON_PPLTN_MIN/MAX: 30분 이내 승차
> - BUS_30WTHN_GTOFF_PPLTN_MIN/MAX: 30분 이내 하차
> - BUS_10WTHN_GTON_PPLTN_MIN/MAX: 10분 이내 승차
> - BUS_10WTHN_GTOFF_PPLTN_MIN/MAX: 10분 이내 하차
> - BUS_5WTHN_GTON_PPLTN_MIN/MAX: 5분 이내 승차
> - BUS_5WTHN_GTOFF_PPLTN_MIN/MAX: 5분 이내 하차
> - BUS_STN_CNT: 장소 내 버스정류장 개수
> - BUS_STN_TIME: 기준 년월
> 
> 【7. 사고통제 현황 (ACDNT_CNTRL_STTS)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> - ACDNT_OCCR_DT: 사고 발생 일시
> - EXP_CLR_DT: 통제 종료 예정 일시
> - ACDNT_TYPE: 사고 발생 유형
> - ACDNT_DTYPE: 사고 발생 세부 유형
> - ACDNT_INFO: 사고 통제 내용
> - ACDNT_X/Y: 사고 통제 지점 좌표
> - ACDNT_TIME: 데이터 업데이트 시간
> 
> 【8. 전기차충전소 현황 (CHARGER_STTS)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 충전소 정보:
> - STAT_NM: 전기차 충전소명
> - STAT_ID: 전기차 충전소 ID
> - STAT_ADDR: 전기차 충전소 주소
> - STAT_X/Y: 좌표 (경도/위도)
> - STAT_USETIME: 운영 시간
> - STAT_PARKPAY: 주차료 유무료 여부
> - STAT_LIMITYN: 이용자 제한
> - STAT_LIMITDETAIL: 이용 제한 사유
> - STAT_KINDDETAIL: 상세 유형
> 
> 충전기 정보:
> - CHARGER_ID: 충전기 ID
> - CHARGER_TYPE: 충전기 타입
> - CHARGER_STAT: 충전기 상태
> - STATUPDDT: 상태 갱신 일시
> - LASTTSDT: 마지막 충전 시작 일시
> - LASTTEDT: 마지막 충전 종료 일시
> - NOWTSDT: 충전중 시작 일시
> - OUTPUT: 충전 용량
> - METHOD: 충전 방식
> 
> 【9. 따릉이 현황 (SBIKE_STTS)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> - SBIKE_SPOT_NM: 따릉이 대여소명
> - SBIKE_SPOT_ID: 따릉이 대여소 ID
> - SBIKE_SHARED: 따릉이 거치율 (%)
> - SBIKE_PARKING_CNT: 따릉이 주차 건수 (현재 자전거 수)
> - SBIKE_RACK_CNT: 따릉이 거치대 개수 (총 거치대)
> - SBIKE_X: 따릉이 대여소 X 좌표 (경도)
> - SBIKE_Y: 따릉이 대여소 Y 좌표 (위도)
> 
> 【10. 날씨 현황 (WEATHER_STTS)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 기본 기상:
> - TEMP: 기온
> - SENSIBLE_TEMP: 체감 온도
> - MAX_TEMP: 일 최고 온도
> - MIN_TEMP: 일 최저 온도
> - HUMIDITY: 습도
> - WIND_DIRCT: 풍향
> - WIND_SPD: 풍속
> - PRECIPITATION: 강수량
> - PRECPT_TYPE: 강수 형태
> - PCP_MSG: 강수 관련 메시지
> - SUNRISE: 일출 시각
> - SUNSET: 일몰 시각
> 
> 자외선/대기질:
> - UV_INDEX_LVL: 자외선 지수 단계
> - UV_INDEX: 자외선 지수
> - UV_MSG: 자외선 메시지
> - PM25_INDEX: 초미세먼지 지표
> - PM25: 초미세먼지 농도
> - PM10_INDEX: 미세먼지 지표
> - PM10: 미세먼지 농도
> - AIR_IDX: 통합 대기 환경 등급
> - AIR_IDX_MVL: 통합 대기 환경 지수
> - AIR_IDX_MAIN: 통합 대기 환경 지수 결정 물질
> - AIR_MSG: 통합 대기 환경 등급별 메시지
> - WEATHER_TIME: 데이터 업데이트 시간
> 
> 기상특보:
> - NEWS_LIST: 기상 관련 특보
> - WARN_VAL: 기상 특보 종류
> - WARN_STRESS: 기상 특보 강도
> - ANNOUNCE_TIME: 기상 특보 발효 시각
> - COMMAND: 기상 특보 발표 코드
> - CANCEL_YN: 기상 특보 취소 구분
> - WARN_MSG: 기상 특보별 행동 강령
> 
> 24시간 예보:
> - FCST24HOURS: 24시간 예보
> - FCST_DT: 예보 시간
> - RAIN_CHANCE: 강수 확률
> - SKY_STTS: 하늘 상태
> 
> 【11. 문화행사 현황 (CULTURALEVENTINFO)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> - EVENT_NM: 문화행사명
> - EVENT_PERIOD: 문화행사 기간
> - EVENT_PLACE: 문화행사 장소
> - EVENT_X/Y: 좌표 (경도/위도)
> - PAY_YN: 유무료 여부
> - THUMBNAIL: 문화행사 대표 이미지
> - URL: 문화행사 상세정보 URL
> - EVENT_ETC_DETAIL: 문화행사 기타 세부정보
> 
> 【12. 실시간 상권 현황 (LIVE_CMRCL_STTS)】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 장소 상권:
> - AREA_CMRCL_LVL: 장소 실시간 상권 현황
> - AREA_SH_PAYMENT_CNT: 장소 실시간 신한카드 결제 건수
> - AREA_SH_PAYMENT_AMT_MIN/MAX: 장소 실시간 신한카드 결제 금액
> 
> 업종별 상권:
> - RSB_LRG_CTGR: 업종 대분류
> - RSB_MID_CTGR: 업종 중분류
> - RSB_PAYMENT_LVL: 업종 실시간 상권 현황
> - RSB_SH_PAYMENT_CNT: 업종 실시간 신한카드 결제 건수
> - RSB_SH_PAYMENT_AMT_MIN/MAX: 업종 실시간 신한카드 결제 금액
> - RSB_MCT_CNT: 업종 가맹점 수
> - RSB_MCT_TIME: 업종 가맹점 수 업데이트 월
> 
> 소비자 분석:
> - CMRCL_MALE_RATE: 남성 소비 비율
> - CMRCL_FEMALE_RATE: 여성 소비 비율
> - CMRCL_10_RATE: 10대 이하 소비 비율
> - CMRCL_20~60_RATE: 20대~60대 이상 소비 비율
> - CMRCL_PERSONAL_RATE: 개인 소비 비율
> - CMRCL_CORPORATION_RATE: 법인 소비 비율
> - CMRCL_TIME: 데이터 업데이트 시간
> 
> 【응답 구조】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> [
>   {
>     "list_total_count": 1,
>     "RESULT": {
>       "RESULT.CODE": "INFO-000",
>       "RESULT.MESSAGE": "정상 처리되었습니다."
>     },
>     "CITYDATA": {
>       "AREA_NM": "강남 MICE 관광특구",
>       "AREA_CD": "POI001",
>       
>       "LIVE_PPLTN_STTS": [
>         {
>           "AREA_CONGEST_LVL": "여유",
>           "AREA_PPLTN_MIN": "2000",
>           "AREA_PPLTN_MAX": "2500",
>           "MALE_PPLTN_RATE": "55.9",
>           ...
>         }
>       ],
>       
>       "ROAD_TRAFFIC_STTS": [
>         {
>           "ROAD_TRAFFIC_SPD": "35.2",
>           "ROAD_NM": "테헤란로",
>           "SPD": "40",
>           ...
>         }
>       ],
>       
>       "PRK_STTS": [
>         {
>           "PRK_NM": "코엑스 주차장",
>           "CPCTY": "500",
>           "CUR_PRK_CNT": "120",
>           ...
>         }
>       ],
>       
>       "SUB_STTS": [
>         {
>           "SUB_STN_NM": "삼성역",
>           "SUB_ARVTIME": "3분",
>           ...
>         }
>       ],
>       
>       "BUS_STN_STTS": [
>         {
>           "BUS_STN_NM": "삼성역",
>           "RTE_NM": "140",
>           "RTE_ARRV_TM": "5분",
>           ...
>         }
>       ],
>       
>       "SBIKE_STTS": [
>         {
>           "SBIKE_SPOT_NM": "102. 광화문역 2번출구 앞",
>           "SBIKE_PARKING_CNT": 12,
>           "SBIKE_RACK_CNT": 20,
>           "SBIKE_SHARED": 60.0,
>           ...
>         }
>       ],
>       
>       "WEATHER_STTS": [
>         {
>           "TEMP": "5.2",
>           "SENSIBLE_TEMP": "3.1",
>           "PM10": "15",
>           "PM25": "8",
>           ...
>         }
>       ],
>       
>       "CHARGER_STTS": [
>         {
>           "STAT_NM": "코엑스 충전소",
>           "CHARGER_STAT": "충전가능",
>           ...
>         }
>       ],
>       
>       "CULTURALEVENTINFO": [
>         {
>           "EVENT_NM": "강남페스티벌",
>           "EVENT_PERIOD": "2025-01-10~2025-01-20",
>           ...
>         }
>       ],
>       
>       "LIVE_CMRCL_STTS": [
>         {
>           "AREA_CMRCL_LVL": "활발",
>           "AREA_SH_PAYMENT_CNT": "1500",
>           ...
>         }
>       ]
>     }
>   }
> ]
> 
> 【사용 예시】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> Q: "광화문 따릉이 있어?"
> → CITYDATA.SBIKE_STTS[].SBIKE_PARKING_CNT 확인
> 
> Q: "강남역 지금 혼잡해?"
> → CITYDATA.LIVE_PPLTN_STTS[0].AREA_CONGEST_LVL 확인
> 
> Q: "홍대 주차 가능해?"
> → CITYDATA.PRK_STTS[].CUR_PRK_CNT 확인
> 
> Q: "여의도 날씨 어때?"
> → CITYDATA.WEATHER_STTS[0].TEMP, PRECPT_TYPE 확인
> 
> Q: "잠실 지하철 언제 와?"
> → CITYDATA.SUB_STTS[].SUB_ARVTIME 확인
> 
> 【주의사항】
> - 응답은 배열 형태 [] 로 감싸져 있음
> - 실제 데이터는 CITYDATA 객체 안에 위치
> - 각 카테고리(SBIKE_STTS, SUB_STTS 등)는 배열 형태
> - 일부 지역은 특정 카테고리 데이터가 없을 수 있음 (빈 배열 [])
> ```

### <font color="#ffc000">5-4. Seoul Bicycle MCP Server</font>
- 노드 기능 - MCP Server Trigger
- 노드 이름 - Seoul Bicycle MCP Server
- 노드 설정
	- MCP URL - Production URL
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - Create new credential 
		- 계정 이름 - n8n Bearer account
	- Path - seoul-bicycle
### <font color="#ffc000">5-5. Get Bicycle Current</font>
- 툴 설정 - Supabase Tool
- 노드 이름 - Get Bicycle Current
- 계정 연결 - Supabase Bicycle
- 노드 설정
	- Tool Description - Set Automatically
	- Use Custom Schema - 🔴비활성화
	- Resource - Row
	- Operation - Get Many
	- Table Name or ID - bicycle_seoul
	- Return All - 🔴비활성화
	- Limit - `🌟Let the model define this parameter`
		- Add a description - 조회할 행의 개수입니다.
	- Filter - String
	- Filters (String) - `🌟Let the model define this parameter`
		- Add a description - ⬇️⬇️⬇️ 아래 내용 입력

> [!warning] Supabase PostgREST API 필터링 문법 (URL 파라미터)
> ```text
> Supabase PostgREST 필터 문법을 사용합니다.
> 
> 【사용 예시】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 1. 특정 자전거 대여소 조회 (ID 일치)
>    ?stationid=eq.ST-4015
> 
> 2. "광화문"이 포함된 대여소 검색 (패턴 매칭)
>    ?stationname=like.*광화문*
> 
> 3. 자전거가 10대 이상 있는 곳 (숫자 비교)
>    ?parkingbiketotcnt=gte.10
> 
> 4. 빈 거치대가 5개 이상인 곳
>    ?shared=gte.5
> 
> 5. 복합 조건 (광화문에 있고 AND 자전거 1대 이상)
>    ?stationname=like.*광화문*&parkingbiketotcnt=gte.1
> 
> 【주요 연산자 목록】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> [비교 연산자]
> - eq  : 같음 (Equal)           -> id=eq.1
> - neq : 다름 (Not Equal)       -> id=neq.1
> - gt  : 큼 (Greater Than)      -> price=gt.1000
> - gte : 크거나 같음 (>=)        -> price=gte.1000
> - lt  : 작음 (Less Than)       -> price=lt.500
> - lte : 작거나 같음 (<=)        -> price=lte.500
> 
> [패턴 매칭]
> - like  : 패턴 매칭 (대소문자 구분 O) -> name=like.*Korea*
> - ilike : 패턴 매칭 (대소문자 구분 X) -> name=ilike.*korea*
>           (*는 와일드카드: 모든 문자를 의미)
> 
> [집합/NULL 처리]
> - in  : 목록에 포함됨          -> status=in.(active,pending)
> - is  : NULL 여부 확인         -> deleted_at=is.null
> 
> 【정렬 및 페이지네이션】
> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> - order  : 정렬 (asc/desc)     -> order=stationid.desc
> - limit  : 개수 제한           -> limit=10
> - offset : 건너뛰기 (페이지네이션) -> offset=0
> 
> 【주의사항】
> - 모든 값은 URL 인코딩이 필요할 수 있습니다. (특히 한글/특수문자)
> - 클라이언트 라이브러리(JS/Python) 사용 시 문법이 다를 수 있습니다. (.eq(), .gt() 등 함수 형태)
> ```

### <font color="#ffc000">5-6. Postgres RPC 함수 생성</font>
- 왼쪽 사이드바 - SQL Editor - ⬇️⬇️⬇️ 아래 쿼리 실행

> [!note] RPC 함수 기능 매핑 (Function Mapping)
> ```text
> 1. get_station_detail
> - 기능: 특정 대여소 상세 조회 (지도 마커 클릭)
> - 설명: 지도에서 핀을 눌렀을 때, 그 대여소의 현재 자전거 수와 주소를 보여줍니다.
> 
> 2. get_nearby_stations
> - 기능: 내 주변 대여소 찾기 (GPS 기반)
> - 설명: "내 위치에서 500m 이내"에 있는 대여소 목록을 가까운 순서대로 가져옵니다.
> 
> 3. get_all_stations
> - 기능: 전체 대여소 목록 로딩 (초기 지도 세팅)
> - 설명: 앱을 켰을 때 서울시 전체 대여소 위치를 지도에 뿌려주기 위해 사용합니다.
> 
> 4. compare_routes
> - 기능: 최적 이동 경로 계산 (Route Planning)
> - 설명: 출발지와 도착지 좌표를 주면, "출발지에서 가장 가까운 대여소"와 "도착지와 가장 가까운 대여소"를 자동으로 짝지어줍니다.
> 
> 5. get_stations_along_route
> - 기능: 이동 경로상 대여소 검색 (환승/반납 추천)
> - 설명: A에서 B로 가는 직선 경로(Line) 주변에 있는 대여소들을 찾습니다. 가는 길에 힘들어서 반납하고 싶을 때 씁니다.
> 
> 6. find_nearby_bicycle
> - 기능: 주변 대여소 검색 (고급/안전 모드)
> - 설명: 2번 함수와 비슷하지만, 실시간 데이터가 잠깐 끊긴 정거장(Master 데이터 기준)까지 모두 보여주어 더 안정적입니다.
> 
> 7. find_nearby_subway
> - 기능: 근처 지하철역 찾기 (환승 정보)
> - 설명: 현재 자전거 위치에서 가장 가까운 지하철역이 어디인지, 몇 미터 떨어져 있는지 알려줍니다.
> ```

> [!success] Supabase RPC 함수 모음 (공간 연산 & 조회)
> ```sql
> -- ============================================================
> -- 0️⃣ [초기화] 기존 함수 삭제 (충돌 방지)
> -- ============================================================
> DROP FUNCTION IF EXISTS find_nearby_bicycle(FLOAT, FLOAT, INT);
> DROP FUNCTION IF EXISTS find_nearby_subway(FLOAT, FLOAT, INT);
> DROP FUNCTION IF EXISTS get_bicycle_route_stats(TEXT, TEXT);
> DROP FUNCTION IF EXISTS get_popular_stations(INT);
> DROP FUNCTION IF EXISTS get_station_detail(TEXT);
> DROP FUNCTION IF EXISTS compare_routes(FLOAT, FLOAT, FLOAT, FLOAT);
> DROP FUNCTION IF EXISTS get_nearby_stations(FLOAT, FLOAT, INT);
> DROP FUNCTION IF EXISTS get_all_stations();
> DROP FUNCTION IF EXISTS get_stations_along_route(FLOAT, FLOAT, FLOAT, FLOAT, INT);
> 
> -- ============================================================
> -- 1️⃣ get_station_detail: 특정 대여소 상세 정보 조회
> -- ============================================================
> CREATE OR REPLACE FUNCTION get_station_detail(station_id_input text)
> RETURNS TABLE(
>   station_id text,
>   station_name text,
>   current_bikes bigint,
>   empty_racks bigint,
>   total_racks bigint,
>   address text,
>   latitude double precision,
>   longitude double precision
> ) 
> LANGUAGE plpgsql
> AS $$
> BEGIN
>   RETURN QUERY
>   SELECT 
>     bc.stationid,
>     bc.stationname,
>     bc.parkingbiketotcnt,
>     bc.shared,
>     bc.racktotcnt,
>     bs.sta_add1 || ' ' || COALESCE(bs.sta_add2, '') as address,
>     bs.sta_lat,
>     bs.sta_long
>   FROM bicycle_seoul bc
>   JOIN bicycle_station bs ON bc.stationid = bs.rent_id
>   WHERE bc.stationid = station_id_input
>   LIMIT 1;
> END;
> $$;
> 
> -- ============================================================
> -- 2️⃣ get_nearby_stations: 내 위치 주변 대여소 검색 (PostGIS)
> -- ============================================================
> CREATE OR REPLACE FUNCTION get_nearby_stations(
>   lat double precision, 
>   lng double precision, 
>   radius_meters integer DEFAULT 500
> )
> RETURNS TABLE(
>   station_id text,
>   station_name text,
>   current_bikes bigint,
>   empty_racks bigint,
>   total_racks bigint,
>   address text,
>   latitude double precision,
>   longitude double precision,
>   distance_meters double precision
> ) 
> LANGUAGE plpgsql
> AS $$
> BEGIN
>   RETURN QUERY
>   SELECT 
>     bc.stationid,
>     bc.stationname,
>     bc.parkingbiketotcnt,
>     bc.shared,
>     bc.racktotcnt,
>     bs.sta_add1 || ' ' || COALESCE(bs.sta_add2, ''),
>     bs.sta_lat,
>     bs.sta_long,
>     ST_Distance(
>       ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
>       bs.location
>     ) as distance_meters
>   FROM bicycle_seoul bc
>   JOIN bicycle_station bs ON bc.stationid = bs.rent_id
>   WHERE ST_DWithin(
>     ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
>     bs.location,
>     radius_meters
>   )
>   AND bs.location IS NOT NULL
>   ORDER BY distance_meters
>   LIMIT 10;
> END;
> $$;
> 
> -- ============================================================
> -- 3️⃣ get_all_stations: 전체 대여소 목록 조회
> -- ============================================================
> CREATE OR REPLACE FUNCTION get_all_stations()
> RETURNS TABLE(
>   station_id text,
>   station_name text,
>   current_bikes bigint,
>   empty_racks bigint,
>   total_racks bigint,
>   address text,
>   latitude double precision,
>   longitude double precision
> ) 
> LANGUAGE plpgsql
> AS $$
> BEGIN
>   RETURN QUERY
>   SELECT 
>     bc.stationid,
>     bc.stationname,
>     bc.parkingbiketotcnt,
>     bc.shared,
>     bc.racktotcnt,
>     bs.sta_add1 || ' ' || COALESCE(bs.sta_add2, ''),
>     bs.sta_lat,
>     bs.sta_long
>   FROM bicycle_seoul bc
>   JOIN bicycle_station bs ON bc.stationid = bs.rent_id
>   ORDER BY bc.stationname;
> END;
> $$;
> 
> -- ============================================================
> -- 4️⃣ compare_routes: 출발지-도착지 최적 경로 비교
> -- ============================================================
> CREATE OR REPLACE FUNCTION compare_routes(
>   start_lat double precision,
>   start_lng double precision,
>   end_lat double precision,
>   end_lng double precision
> )
> RETURNS TABLE(
>   start_station_id text,
>   start_station_name text,
>   start_bikes bigint,
>   start_distance double precision,
>   end_station_id text,
>   end_station_name text,
>   end_racks bigint,
>   end_distance double precision,
>   total_distance double precision
> ) 
> LANGUAGE plpgsql
> AS $$
> BEGIN
>   RETURN QUERY
>   WITH start_stations AS (
>     SELECT 
>       bc.stationid,
>       bc.stationname,
>       bc.parkingbiketotcnt,
>       ST_Distance(
>         ST_SetSRID(ST_MakePoint(start_lng, start_lat), 4326)::geography,
>         bs.location
>       ) as dist
>     FROM bicycle_seoul bc
>     JOIN bicycle_station bs ON bc.stationid = bs.rent_id
>     WHERE bc.parkingbiketotcnt > 0
>       AND bs.location IS NOT NULL
>     ORDER BY dist
>     LIMIT 1
>   ),
>   end_stations AS (
>     SELECT 
>       bc.stationid,
>       bc.stationname,
>       bc.shared,
>       ST_Distance(
>         ST_SetSRID(ST_MakePoint(end_lng, end_lat), 4326)::geography,
>         bs.location
>       ) as dist
>     FROM bicycle_seoul bc
>     JOIN bicycle_station bs ON bc.stationid = bs.rent_id
>     WHERE bc.shared > 0
>       AND bs.location IS NOT NULL
>     ORDER BY dist
>     LIMIT 1
>   )
>   SELECT 
>     ss.stationid, 
>     ss.stationname, 
>     ss.parkingbiketotcnt, 
>     ss.dist,
>     es.stationid, 
>     es.stationname, 
>     es.shared, 
>     es.dist,
>     ss.dist + es.dist as total_dist
>   FROM start_stations ss
>   CROSS JOIN end_stations es;
> END;
> $$;
> 
> -- ============================================================
> -- 5️⃣ get_stations_along_route: 경로 상의 대여소 검색
> -- ============================================================
> CREATE OR REPLACE FUNCTION get_stations_along_route(
>   start_lat double precision,
>   start_lng double precision,
>   end_lat double precision,
>   end_lng double precision,
>   buffer_meters integer DEFAULT 300
> )
> RETURNS TABLE(
>   station_id text,
>   station_name text,
>   current_bikes bigint,
>   empty_racks bigint,
>   latitude double precision,
>   longitude double precision,
>   distance_from_start double precision
> ) 
> LANGUAGE plpgsql
> AS $$
> BEGIN
>   RETURN QUERY
>   SELECT 
>     bc.stationid,
>     bc.stationname,
>     bc.parkingbiketotcnt,
>     bc.shared,
>     bs.sta_lat,
>     bs.sta_long,
>     ST_Distance(
>       ST_SetSRID(ST_MakePoint(start_lng, start_lat), 4326)::geography,
>       bs.location
>     ) as dist
>   FROM bicycle_seoul bc
>   JOIN bicycle_station bs ON bc.stationid = bs.rent_id
>   WHERE bs.location IS NOT NULL
>     AND ST_DWithin(
>       ST_MakeLine(
>         ST_SetSRID(ST_MakePoint(start_lng, start_lat), 4326),
>         ST_SetSRID(ST_MakePoint(end_lng, end_lat), 4326)
>       )::geography,
>       bs.location,
>       buffer_meters
>     )
>   ORDER BY dist;
> END;
> $$;
> 
> -- ============================================================
> -- 6️⃣ find_nearby_bicycle: 추가 대여소 검색 (bicycle_station 우선)
> -- ============================================================
> CREATE OR REPLACE FUNCTION find_nearby_bicycle(
>   user_lat double precision,
>   user_lon double precision,
>   radius integer DEFAULT 500
> )
> RETURNS TABLE(
>   station_id text,
>   name text,
>   distance_m integer,
>   current_bikes bigint,
>   empty_racks bigint,
>   available_bikes bigint,
>   address text,
>   latitude double precision,
>   longitude double precision
> ) 
> LANGUAGE plpgsql
> AS $$
> BEGIN
>   RETURN QUERY
>   SELECT 
>     bs.rent_id,
>     bs.rent_nm,
>     ROUND(ST_Distance(
>       bs.location,
>       ST_SetSRID(ST_MakePoint(user_lon, user_lat), 4326)::geography
>     ))::integer,
>     COALESCE(bc.parkingbiketotcnt, 0::bigint),
>     COALESCE(bc.shared, 0::bigint),
>     bs.hold_num,
>     bs.sta_add1 || ' ' || COALESCE(bs.sta_add2, ''),
>     bs.sta_lat,
>     bs.sta_long
>   FROM bicycle_station bs
>   LEFT JOIN bicycle_seoul bc ON bs.rent_id = bc.stationid
>   WHERE bs.location IS NOT NULL
>     AND ST_DWithin(
>       bs.location,
>       ST_SetSRID(ST_MakePoint(user_lon, user_lat), 4326)::geography,
>       radius
>     )
>   ORDER BY bs.location <-> ST_SetSRID(ST_MakePoint(user_lon, user_lat), 4326)::geography
>   LIMIT 10;
> END;
> $$;
> 
> -- ============================================================
> -- 7️⃣ find_nearby_subway: 지하철역 검색
> -- ============================================================
> CREATE OR REPLACE FUNCTION find_nearby_subway(
>   user_lat double precision,
>   user_lon double precision,
>   radius integer DEFAULT 500
> )
> RETURNS TABLE(
>   station_name text,
>   line_name text,
>   distance_m integer,
>   latitude double precision,
>   longitude double precision
> ) 
> LANGUAGE plpgsql
> AS $$
> BEGIN
>   RETURN QUERY
>   SELECT 
>     ss.station_nm,
>     ss.line_nm,
>     ROUND(ST_Distance(
>       ss.location,
>       ST_SetSRID(ST_MakePoint(user_lon, user_lat), 4326)::geography
>     ))::integer as distance_m,
>     ss.station_lat,
>     ss.station_long
>   FROM subway_station ss
>   WHERE ss.location IS NOT NULL
>     AND ST_DWithin(
>       ss.location,
>       ST_SetSRID(ST_MakePoint(user_lon, user_lat), 4326)::geography,
>       radius
>     )
>   ORDER BY ss.location <-> ST_SetSRID(ST_MakePoint(user_lon, user_lat), 4326)::geography
>   LIMIT 10;
> END;
> $$;
> 
> -- ============================================================
> -- ✅ 완료 메시지
> -- ============================================================
> DO $$
> BEGIN
>   RAISE NOTICE '✅ 7개 RPC 함수 생성 완료!';
>   RAISE NOTICE '   1. get_station_detail';
>   RAISE NOTICE '   2. get_nearby_stations';
>   RAISE NOTICE '   3. get_all_stations';
>   RAISE NOTICE '   4. compare_routes';
>   RAISE NOTICE '   5. get_stations_along_route';
>   RAISE NOTICE '   6. find_nearby_bicycle';
>   RAISE NOTICE '   7. find_nearby_subway';
> END $$;
> ```

### <font color="#ffc000">5-7. Get Bicycle Nearby</font>
- 툴 설정 - Postgres Tool
- 노드 이름 - Get Bicycle Nearby
- 계정 연결 - Postgres Bicycle
- 노드 설정
	- Tool Description - Set Manually
	- Description - ⬇️⬇️⬇️ 아래 내용 입력
	- Operation - Execute Query
	- Query - `SELECT * FROM find_nearby_bicycle({{ $fromAI('latitude', '위도', 'number') }}, {{ $fromAI('longitude', '경도', 'number') }}, {{ $fromAI('radius', '반경(m)', 'number', '', 500) }})`

> [!danger] 내 위치 주변 따릉이 대여소 검색 (RPC)
> ```text
> 【내 위치 주변 따릉이 대여소 검색】
> 사용자의 현재 위치(위도/경도)를 기준으로 지정된 반경 내의 대여소를 거리 순으로 최대 10개 반환합니다. PostGIS 지리 계산 사용.
> 
> 파라미터:
> - lat (double precision): 사용자 위도 (예: 37.5665)
> - lng (double precision): 사용자 경도 (예: 126.9780)
> - radius_meters (integer, 기본값: 500): 검색 반경(미터)
> 
> 반환값:
> - station_id, station_name, current_bikes, empty_racks, total_racks, address, latitude, longitude
> - distance_meters: 사용자로부터의 거리(미터)
> 
> 사용 예시:
> Q: "내 근처 따릉이 대여소 찾아줘" (위치 정보 필요)
> → get_nearby_stations(37.5665, 126.9780, 500)
> ```

### <font color="#ffc000">5-8. 그 외 Supbase 및 Postgres Tools</font>
- n8n 워크플로우 - ⬇️⬇️⬇️ 아래 스크립트 복사 및 붙여넣기

> [!important] n8n AI Agent Tools (Bicycle & Subway) JSON
> ```json
> {
>   "nodes": [
>     {
>       "parameters": {
>         "operation": "getAll",
>         "tableId": "bicycle_station",
>         "limit": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Limit', `조회할 행의 개수입니다. `, 'number') }}",
>         "filterType": "string",
>         "filterString": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Filters__String_', `Supabase PostgREST 필터 문법을 사용합니다.\n\n예시:\n- rent_nm=like.*광화문* (이름에 광화문 포함)\n- hold_num=gte.30 (거치대 30개 이상)\n- sta_add1=like.*종로구* (종로구 소재)\n- hold_num=gte.25&sta_add1=like.*강남구* (복합 조건, AND)\n\n연산자:\n- eq (같음), neq (다름)\n- gt (크다), gte (크거나 같다)\n- lt (작다), lte (작거나 같다)\n- like (패턴, .*는 와일드카드`, 'string') }}"
>       },
>       "type": "n8n-nodes-base.supabaseTool",
>       "typeVersion": 1,
>       "position": [
>         -864,
>         544
>       ],
>       "id": "dffd99cf-7865-4914-b2e4-99b7a039eed8",
>       "name": "Get Bicycle Station",
>       "credentials": {
>         "supabaseApi": {
>           "id": "3N1oaJrQ9pJNKmw5",
>           "name": "Supabase Bicycle"
>         }
>       }
>     },
>     {
>       "parameters": {
>         "operation": "getAll",
>         "tableId": "subway_station",
>         "limit": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Limit', `조회할 행의 개수입니다.`, 'number') }}",
>         "filterType": "string",
>         "filterString": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Filters__String_', `Supabase PostgREST 필터 문법을 사용합니다.\n\n예시:\n- line_nm=like.*2호선* (2호선 역들)\n- station_nm=like.*강남* (역명에 강남 포함)\n- line_nm=like.*2호선*&station_nm=like.*역삼* (복합 조건, AND)\n\n연산자:\n- eq (같음), neq (다름)\n- gt (크다), gte (크거나 같다)\n- lt (작다), lte (작거나 같다)\n- like (패턴, .*는 와일드카드)`, 'string') }}"
>       },
>       "type": "n8n-nodes-base.supabaseTool",
>       "typeVersion": 1,
>       "position": [
>         -224,
>         544
>       ],
>       "id": "3d9810d0-1d80-4898-a1d5-e30d3e1396b5",
>       "name": "Get Subway Station",
>       "credentials": {
>         "supabaseApi": {
>           "id": "3N1oaJrQ9pJNKmw5",
>           "name": "Supabase Bicycle"
>         }
>       }
>     },
>     {
>       "parameters": {
>         "descriptionType": "manual",
>         "toolDescription": "【특정 따릉이 대여소 상세 정보 조회】\n대여소 이름(예: \"102. 광화문역 2번출구 앞\")으로 해당 대여소의 현재 자전거 수, 빈 거치대 수, 주소, 좌표 정보를 반환합니다.\n\n파라미터:\n- station_id_input (text): 대여소 이름 또는 ID\n\n반환값:\n- station_id: 대여소 ID\n- station_name: 대여소 이름\n- current_bikes: 현재 이용 가능한 자전거 수\n- empty_racks: 빈 거치대 수\n- total_racks: 전체 거치대 수\n- address: 주소\n- latitude/longitude: 위도/경도\n\n사용 예시:\nQ: \"광화문역 2번출구 대여소 정보 알려줘\"\n→ get_station_detail('102. 광화문역 2번출구 앞')",
>         "operation": "executeQuery",
>         "query": "SELECT * FROM get_station_detail('{{ $fromAI('station_id', '대여소 ID', 'string') }}')",
>         "options": {}
>       },
>       "type": "n8n-nodes-base.postgresTool",
>       "typeVersion": 2.6,
>       "position": [
>         -384,
>         544
>       ],
>       "name": "Get Bicycle Detail",
>       "id": "42a3ec13-2ef0-45ea-a6ad-069bf464e20d",
>       "credentials": {
>         "postgres": {
>           "id": "NX5FuBJvOyaJIfMd",
>           "name": "Postgres Bicycle"
>         }
>       }
>     },
>     {
>       "parameters": {
>         "descriptionType": "manual",
>         "toolDescription": "【내 위치 주변 지하철역 검색】\n사용자의 현재 위치를 기준으로 지정된 반경 내의 지하철역을 거리 순으로 최대 10개 반환합니다.\n\n파라미터:\n- user_lat, user_lon: 사용자 위도/경도\n- radius (integer, 기본값: 500): 검색 반경(미터)\n\n반환값:\n- station_name: 지하철역 이름\n- line_name: 호선 정보\n- distance_m: 거리(미터)\n- latitude, longitude: 위도/경도\n\n사용 예시:\nQ: \"내 근처 지하철역 알려줘\"\n→ find_nearby_subway(37.5665, 126.9780, 500)\n\nQ: \"여기서 1km 이내 지하철역 찾아줘\"\n→ find_nearby_subway(37.5665, 126.9780, 1000)",
>         "operation": "executeQuery",
>         "query": "SELECT * FROM find_nearby_subway({{ $fromAI('latitude', '위도', 'number') }}, {{ $fromAI('longitude', '경도', 'number') }}, {{ $fromAI('radius', '반경(m)', 'number', '', 500) }})",
>         "options": {}
>       },
>       "type": "n8n-nodes-base.postgresTool",
>       "typeVersion": 2.6,
>       "position": [
>         -64,
>         544
>       ],
>       "name": "Get Subway Nearby",
>       "id": "b2dc2d3c-faca-47ee-844b-c5519cfbeb6e",
>       "credentials": {
>         "postgres": {
>           "id": "NX5FuBJvOyaJIfMd",
>           "name": "Postgres Bicycle"
>         }
>       }
>     },
>     {
>       "parameters": {
>         "descriptionType": "manual",
>         "toolDescription": "【출발지-도착지 최적 따릉이 경로 비교】\n출발지 좌표에서 가장 가까운 자전거 있는 대여소, 도착지 좌표에서 가장 가까운 빈 거치대 있는 대여소를 찾아 총 이동 거리와 함께 반환합니다.\n\n파라미터:\n- start_lat, start_lng: 출발지 위도/경도\n- end_lat, end_lng: 도착지 위도/경도\n\n반환값:\n- start_station_id, start_station_name, start_bikes, start_distance\n- end_station_id, end_station_name, end_racks, end_distance\n- total_distance: 총 거리(미터)\n\n사용 예시:\nQ: \"강남역에서 홍대입구까지 따릉이 경로 추천해줘\"\n→ compare_routes(37.4979, 127.0276, 37.5572, 126.9239)",
>         "operation": "executeQuery",
>         "query": "SELECT * FROM compare_routes({{ $fromAI('start_lat', '출발 위도', 'number') }}, {{ $fromAI('start_lon', '출발 경도', 'number') }}, {{ $fromAI('end_lat', '도착 위도', 'number') }}, {{ $fromAI('end_lon', '도착 경도', 'number') }})",
>         "options": {}
>       },
>       "type": "n8n-nodes-base.postgresTool",
>       "typeVersion": 2.6,
>       "position": [
>         112,
>         544
>       ],
>       "name": "Get Compare Routes",
>       "id": "ad31635e-9b2f-485b-8332-994dc1844ff0",
>       "credentials": {
>         "postgres": {
>           "id": "NX5FuBJvOyaJIfMd",
>           "name": "Postgres Bicycle"
>         }
>       }
>     },
>     {
>       "parameters": {
>         "descriptionType": "manual",
>         "toolDescription": "【경로 상의 따릉이 대여소 검색】\n출발지-도착지 직선 경로의 지정된 버퍼(기본 300m) 내에 있는 모든 대여소를 출발지로부터 거리 순으로 반환합니다.\n\n파라미터:\n- start_lat, start_lng: 출발지 위도/경도\n- end_lat, end_lng: 도착지 위도/경도\n- buffer_meters (integer, 기본값: 300): 경로로부터의 검색 버퍼(미터)\n\n반환값:\n- station_id, station_name, current_bikes, empty_racks, latitude, longitude\n- distance_from_start: 출발지로부터의 거리(미터)\n\n사용 예시:\nQ: \"A에서 B로 가는 길에 있는 따릉이 대여소 알려줘\"\n→ get_stations_along_route(37.5665, 126.9780, 37.5172, 127.0473, 300)",
>         "operation": "executeQuery",
>         "query": "SELECT * FROM get_stations_along_route({{ $fromAI('start_lat', '출발 위도', 'number') }}::double precision, {{ $fromAI('start_lng', '출발 경도', 'number') }}::double precision, {{ $fromAI('end_lat', '도착 위도', 'number') }}::double precision, {{ $fromAI('end_lng', '도착 경도', 'number') }}::double precision, {{ $fromAI('buffer_meters', '경로 버퍼(m)', 'number', '', 300) }})",
>         "options": {}
>       },
>       "type": "n8n-nodes-base.postgresTool",
>       "typeVersion": 2.6,
>       "position": [
>         272,
>         544
>       ],
>       "name": "Get Find Routes",
>       "id": "9ae597bf-e0e1-404d-af48-c412b61f0fe4",
>       "credentials": {
>         "postgres": {
>           "id": "NX5FuBJvOyaJIfMd",
>           "name": "Postgres Bicycle"
>         }
>       }
>     },
>     {
>       "parameters": {
>         "descriptionType": "manual",
>         "toolDescription": "고급 사용자를 위한 직접 SQL 쿼리 실행 도구입니다. \n복잡한 통계 분석, 다중 테이블 JOIN, 집계 함수가 필요한 경우에만 사용하세요.\n\n사용 가능한 테이블:\n- bicycle_seoul: 현재 대여소 상태 (stationid, stationname, parkingbiketotcnt, shared, racktotcnt)\n- bicycle_station: 대여소 기본 정보 (rent_id, rent_nm, sta_add1, sta_lat, sta_long, hold_num, location)\n- subway_station: 지하철역 정보 (station_nm, line_nm, sta_lat, sta_lon, sta_add, location)\n\n예시 쿼리:\n- SELECT stationname, parkingbiketotcnt FROM bicycle_seoul WHERE parkingbiketotcnt > 20 ORDER BY parkingbiketotcnt DESC LIMIT 10\n- SELECT bs.rent_nm, bc.parkingbiketotcnt, bc.shared FROM bicycle_station bs JOIN bicycle_seoul bc ON bs.rent_id::text = bc.stationid WHERE bc.shared >= 5\n\n⚠️ 주의: 일반 검색/필터는 다른 전용 도구를 사용하세요.",
>         "operation": "executeQuery",
>         "query": "{{ $fromAI('query', 'SQL statement', 'string') }}",
>         "options": {}
>       },
>       "type": "n8n-nodes-base.postgresTool",
>       "typeVersion": 2.6,
>       "position": [
>         400,
>         544
>       ],
>       "id": "118d0c38-0473-4667-9742-20dc2506e39b",
>       "name": "Get SQL Query",
>       "credentials": {
>         "postgres": {
>           "id": "NX5FuBJvOyaJIfMd",
>           "name": "Postgres Bicycle"
>         }
>       }
>     }
>   ],
>   "connections": {
>     "Get Bicycle Station": {
>       "ai_tool": [
>         []
>       ]
>     },
>     "Get Subway Station": {
>       "ai_tool": [
>         []
>       ]
>     },
>     "Get Bicycle Detail": {
>       "ai_tool": [
>         []
>       ]
>     },
>     "Get Subway Nearby": {
>       "ai_tool": [
>         []
>       ]
>     },
>     "Get Compare Routes": {
>       "ai_tool": [
>         []
>       ]
>     },
>     "Get Find Routes": {
>       "ai_tool": [
>         []
>       ]
>     },
>     "Get SQL Query": {
>       "ai_tool": [
>         []
>       ]
>     }
>   },
>   "pinData": {},
>   "meta": {
>     "templateCredsSetupCompleted": true,
>     "instanceId": "ed29603280f689e433d162d6eb2f4c0ef594feb614602d9f72d06ccb3a8d3e19"
>   }
> }
> ```

## <font color="#ffc000">Step 6: AI 에이전트 설정</font>
### <font color="#ffc000">6-1. When chat message received</font>
- 노드 기능 - Chat Trigger
- 노드 이름 - When chat message received
- 노드 설정
    - Make Chat Publicly Available - 🟢활성화
    - Mode - Embedded Chat
    - Authentication - None
    - Options - Add Field
	    - Allowed Origins (CORS) - `*`
### <font color="#ffc000">6-2. AI Agent</font>
- 노드 기능 - AI Agent
- 노드 이름 - AI Agent
- 노드 설정
	- Source for Prompt - Connected Chat Trigger Node
	- Prompt (User Message) - `{{ $json.chatInput }}`
	- Require Specific Output Format - 🔴비활성화
	- Enable Fallback Model - 🔴비활성화
	- Options - Add Option
		- System Message - [[서울시 UDT 우리 동네 에이전트 프롬프트]]
### <font color="#ffc000">6-3. Google Gemini Chat Model</font>
- 모델 설정 - Google Gemini Chat Model
- 노드 이름 - Google Gemini Chat Model
- 계정 연결 - Credential to connect with
    - Create new credential
        - Host - `https://generativelanguage.googleapis.com`
        - API Key - [구글 AI 스튜디오 API 키](https://aistudio.google.com/api-keys)
        - Get API key - 새 키 만들기 - 키 이름 지정
        - 프로젝트 선택 - Create project - 프로젝트 이름 지정
        - 할당량 등급 - 결제 설정 - 결제 계정 연결 혹은 관리
        - Allowed HTTP Request Domains - All
- 노드 설정
    - Model - models/gemini-3-pro-preview
### <font color="#ffc000">6-4. Simple Memory</font>
- 메모리 설정 - Simple Memory
- 노드 이름 - Simple Memory
- 노드 설정
	- Session ID - Connected Chat Trigger Node
	- Session Key From Previous Node - `{{ $json.sessionId }}`
	- Context Window Length - 10
### <font color="#ffc000">6-5. Think</font>
- 툴 설정 - Think Tool
- 노드 이름 - Think
- 노드 설정
    - Think Tool Description - 기본값 사용
### <font color="#ffc000">6-6. Seoul City Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Seoul City Tools
- 노드 설정
    - Endpoint
        - Seoul City MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All
### <font color="#ffc000">6-7. Seoul Bicycle Tools</font>
- 툴 설정 - MCP Client Tool
- 노드 이름 - Seoul Bicycle Tools
- 노드 설정
    - Endpoint
        - Seoul Bicycle MCP Server - MCP URL - Production URL
    - Server Transport - HTTP Streamable
	- Authentication - Bearer Auth
	- Credential for Bearer Auth - n8n Bearer account
	- Tools to Include - All

## <font color="#ffc000">Step 7: 웹훅 페이지 설정</font>
### <font color="#ffc000">7-1. Webhook</font>
- 노드 기능 - Webhook
- 노드 이름 - Webhook
- 노드 설정
	- Webhook URLs - Production URL
	- HTTP Method - GET
	- Path - seoul-udt
	- Authentication - None
	- Respond - Using 'Response to Wehbook' Node
	- Options - Add Option
	    - Allowed Origins (CORS) - `*
### <font color="#ffc000">7-2. Response to Webhook</font>
- 노드 기능 - Response to Webhok
- 노드 이름 - Response to Webhok
- 노드 설정
	- Respond With - Text
	- Response Body - [[서울시 UDT 우리 동네 에이전트 웹훅 스크립트]]
	- const N8N_WEBHOOK_URL =  'YOUR Webhook URL"; 
		- n8n Chat Trigger 노드 설정에서 "Webhook URL"을 복사해서 넣으세요.

# <font color="#ffc000">Step 8: Genspark MCP Server</font>
### <font color="#ffc000">8-1. 젠스파크 MCP 추가</font>
- 새로운 MCP 서버 추가
	- Genspark - 도구 선택 - 추가
	- 새로운 MCP 서버 추가
	- Seoul City MCP, Seoul Bicycle MCP 
		- 서버 이름 - 각 MCP 이름
		- 서버 유형 - SSE
		- 서버 URL - 각 MCP 엔드포인트
			- 예시 - `https://daniel8824.app.n8n.cloud/mcp/seoul-city`
		- 설명 - 각 MCP 설명
		- 요청 헤더 - `{"Authorization": "Bearer MY_N8N_AUTH_TOKEN"}`


