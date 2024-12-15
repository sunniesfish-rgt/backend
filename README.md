# Book Management System API

## 프로젝트 개요

도서 관리 시스템의 백엔드 API 서버입니다. NestJS 프레임워크를 사용하여 개발되었으며, JWT 기반 인증과 MySQL 데이터베이스를 사용합니다.

## 기술 스택

- NestJS
- TypeScript
- MySQL (with TypeORM)
- JWT Authentication
- Class Validator
- Cookie Parser

## 시스템 요구사항

- Node.js 18.x 이상
- MySQL 8.x
- npm 또는 yarn

## 설치 및 실행

### 1. 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경변수를 설정합니다:

```bash
$ npm install
```

## 주요 기능

### 1. 인증 (Auth)

- 회원가입 `/api/auth/signup`
- 로그인 `/api/auth/signin`
- 로그아웃 `/api/auth/signout`
- 사용자 ID 중복 확인 `/api/auth/check-user-id`
- 인증 상태 확인 `/api/auth/check-auth`

### 2. 도서 관리 (Books)

- 도서 목록 조회 `/api/books`
- 도서 상세 조회 `/api/books/:id`
- 도서 등록 `/api/books`
- 도서 수정 `/api/books/:id`
- 도서 삭제 `/api/books/:id`

## 프로젝트 구조
src/
├── auth/ # 인증 관련 모듈
│ ├── controllers/
│ ├── services/
│ ├── guards/
│ ├── strategies/
│ └── entities/
├── books/ # 도서 관리 모듈
│ ├── controllers/
│ ├── services/
│ ├── entities/
│ └── dtos/
├── common/ # 공통 모듈
│ ├── filters/
│ ├── decorators/
│ └── utils/
└── config/ # 설정 파일

## 보안

- HTTP-only 쿠키를 사용한 JWT 토큰 관리
- CORS 설정을 통한 허용된 도메인만 접근 가능
- 비밀번호 암호화 저장
- 환경변수를 통한 민감 정보 관리

## 데이터베이스 스키마

### Users

- userId (PK)
- password (hashed)
- employeeId

### Books

- id (PK)
- title
- author
- publishedDate
- coverImage
- coverImageThumbnail
- description

### BookMetadata

- id (PK, FK from Books)
- title
- author
- stockQuantity
- price
- createdAt
- updatedAt

## API 문서

API 문서는 각 모듈의 README.md 파일에서 확인할 수 있습니다:

- [인증 API 문서](src/auth/README.md)
- [도서 관리 API 문서](src/books/README.md)

## 배포 가이드

1. 프로덕션 환경 변수 설정

   - `.env` 파일 생성
   - 프로덕션 데이터베이스 정보 설정
   - JWT 시크릿 키 설정
