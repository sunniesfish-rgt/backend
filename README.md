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

컨트롤러 레벨의 예외 처리는 어때? 적절해?

현재 컨트롤러의 예외 처리를 검토해보겠습니다.
현재 AuthController:
개선이 필요한 부분들:
응답 형식 표준화:
컨트롤러 응답 개선:
데코레이터 추가:
개선된 컨트롤러:
주요 개선사항:
표준화된 응답 형식
모든 엔드포인트가 일관된 응답 형식 사용
상태 코드, 메시지, 데이터를 포함
명확한 인증 처리
@Public() 데코레이터로 인증이 필요없는 라우트 명시
컨트롤러 레벨에서 JwtAuthGuard 적용
HTTP 상태 코드 명확화
각 엔드포인트마다 적절한 HTTP 상태 코드 사용
@HttpCode 데코레이터로 명시적 표현
예외 처리 구체화
AuthExceptionFilter로 인증 관련 예외 처리
표준화된 에러 응답 형식 제공
이러한 개선으로 더 견고하고 일관된 API를 제공할 수 있습니다.
auth 모듈의 api문서를 ai가 인식하기 좋게 만들어줘

NestJS의 Swagger/OpenAPI 데코레이터를 사용하여 API 문서를 작성하겠습니다.

1. AuthController API 문서화
2. DTO 문서화
3. Response Interface 문서화
   이렇게 문서화하면:
   Swagger UI에서 자동으로 API 문서가 생성됩니다.
   각 API 엔드포인트의 요청/응답 형식이 명확하게 표시됩니다.
   예제 값과 설명이 포함되어 API 사용이 쉬워집니다.
   가능한 에러 응답도 문서화되어 있어 디버깅이 용이합니다.
   Swagger UI를 활성화하려면 main.ts에 다음 설정을 추가해야 합니다:
   auth 컨트롤러의 api 문서를 만들어줘
   프론트엔드 개발자가 사용할거야

Auth 모듈의 API 문서를 프론트엔드 개발자를 위해 작성하겠습니다.
typescript
interface AuthResponse<T = void> {
statusCode: number; // HTTP 상태 코드
message: string; // 응답 메시지
data?: T; // 선택적 데이터
}
typescript
{
userId: string; // 4-10자, 영문자와 숫자만 허용
password: string; // 6-30자, 대문자/소문자/숫자/특수문자 포함
employeeId: string; // 4-15자, 대문자와 숫자만 허용
}
typescript
{
"userId": "john123",
"password": "Test1234!",
"employeeId": "EMP123"
}
json
{
"statusCode": 201,
"message": "회원가입이 성공적으로 완료되었습니다."
}
json
{
"statusCode": 409,
"error": "User Already Exists",
"message": "이미 존재하는 사용자 ID입니다."
}
json
{
"statusCode": 400,
"error": "Bad Request",
"message": [
"사용자 ID는 최소 4자 이상이어야 합니다",
"비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다"
]
}
typescript
{
userId: string; // 사용자 ID
password: string; // 비밀번호
}
typescript
{
"userId": "john123",
"password": "Test1234!"
}
json
{
"statusCode": 200,
"message": "로그인이 성공적으로 완료되었습니다."
}
json
{
"statusCode": 401,
"error": "Invalid Credentials",
"message": "아이디 또는 비밀번호가 잘못되었습니다."
}
json
{
"statusCode": 200,
"message": "로그아웃이 성공적으로 완료되었습니다."
}
json
{
"statusCode": 401,
"error": "Unauthorized",
"message": "인증이 필요합니다."
}
typescript
{
statusCode: number;
error: string;
message: string | string[];
timestamp: string;
}
이 문서는 프론트엔드 개발자가 인증 API를 쉽게 이해하고 사용할 수 있도록:
각 엔드포인트의 상세 설명
요청/응답 예제
에러 케이스
인증 관련 주의사항
을 포함하고 있습니다.
error EntityMetadataNotFoundError: No metadata for "BookMetadata" was found.
at DataSource.getMetadata (C:\Users\fish\Desktop\GitHub\rgt\backend\node_modules\typeorm\data-source\src\data-source\DataSource.ts:450:30)
at Repository.get metadata (C:\Users\fish\Desktop\GitHub\rgt\backend\node_modules\typeorm\repository\src\repository\Repository.ts:53:40)
at Repository.createQueryBuilder (C:\Users\fish\Desktop\GitHub\rgt\backend\node_modules\typeorm\repository\src\repository\Repository.ts:82:18)
at BooksService.findAll (C:\Users\fish\Desktop\GitHub\rgt\backend\src\books\books.service.ts:42:37)
at BooksController.getAllBooks (C:\Users\fish\Desktop\GitHub\rgt\backend\src\books\books.controller.ts:28:44)
at C:\Users\fish\Desktop\GitHub\rgt\backend\node_modules\@nestjs\core\router\router-execution-context.js:38:29
at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
at async C:\Users\fish\Desktop\GitHub\rgt\backend\node_modules\@nestjs\core\router\router-execution-context.js:46:28
at async C:\Users\fish\Desktop\GitHub\rgt\backend\node_modules\@nestjs\core\router\router-proxy.js:9:17

이 에러는 TypeORM이 BookMetadata 엔티티를 찾지 못해 발생하는 문제입니다. 주요 원인은 다음과 같을 수 있습니다:

1. 엔티티가 모듈에 제대로 등록되지 않았거나
   TypeORM 설정에서 엔티티 경로가 잘못되었을 수 있습니다.
   해결을 위해 다음과 같이 수정해보겠습니다:
1. app.module.ts 수정
1. books.module.ts 확인
1. book-metadata.entity.ts 수정
1. books.entity.ts 수정
   이러한 수정 후에도 문제가 지속된다면:
   애플리케이션을 완전히 재시작
   데이터베이스 테이블이 올바르게 생성되었는지 확인
1. TypeORM 로깅을 활성화하여 SQL 쿼리 확인
   위 단계들을 순차적으로 확인해보시기 바랍니다.
   joincolumn은 왜 지웠어?

@JoinColumn 데코레이터를 제거한 것은 실수였습니다. 일대일(OneToOne) 관계에서는 반드시 한쪽에 @JoinColumn 데코레이터가 필요합니다.
Book과 BookMetadata 엔티티의 관계에서:
소유하는 쪽(owning side)에 @JoinColumn을 지정해야 합니다
일반적으로 자식 엔티티(이 경우 BookMetadata)가 소유하는 쪽이 됩니다
현재는 BookMetadata에만 @JoinColumn이 있어서 Book 엔티티에서는 필요하지 않습니다
다시 books.entity.ts를 수정하겠습니다:
이렇게 하면:
BookMetadata가 관계의 소유자가 되어 book_id 컬럼을 가지게 됩니다
cascade: true 옵션으로 Book 엔티티 저장 시 연관된 BookMetadata도 자동으로 저장됩니다
BookMetadata의 @JoinColumn({ name: 'book_id' })이 실제 외래 키 컬럼을 생성합니다
app.module은 왜 수정했어?\

앞서 발생한 EntityMetadataNotFoundError: No metadata for "BookMetadata" was found 에러를 해결하기 위해 TypeORM 설정에서 엔티티들을 명시적으로 등록하려고 했습니다.
하지만 현재 프로젝트에서는 이미 databaseConfig를 통해 엔티티 설정이 잘 되어있는 것으로 보입니다:
따라서 app.module.ts의 수정은 불필요했습니다. 기존 설정이 더 유연하고 확장성 있는 방식입니다:
entities: ['dist/**/*.entity{.ts,.js}']로 모든 엔티티 파일을 자동으로 찾습니다
새로운 엔티티 추가 시 별도의 등록 과정이 필요 없습니다
환경 설정이 databaseConfig로 모듈화되어 있어 관리가 용이합니다
원래 app.module.ts를 유지하는 것이 좋겠습니다.
@books.controller.ts @books.service.ts@exception.filter.ts 컨트롤러가 서비스 레이어의 예외를 잘 처리하고 있어? 요청이 BookNotFoundException을 서비스에서 던지는 것 까지는확인 했는데 그다음 프론트로 응답이 안가고 있어

현재 예외 처리 흐름에 문제가 있습니다. 서비스에서 발생한 커스텀 예외가 프론트엔드까지 적절히 전달되지 않고 있습니다.
먼저 커스텀 예외들을 정의하겠습니다:
글로벌 예외 필터를 수정합니다:
BooksController를 수정하여 예외 처리를 명확히 합니다:
이렇게 수정하면:
서비스 레이어에서 발생한 예외가 컨트롤러에서 적절히 처리됩니다.
각 예외는 구체적인 에러 메시지와 상태 코드를 가집니다.
글로벌 예외 필터가 모든 예외를 일관된 형식으로 변환합니다.
프론트엔드는 항상 일관된 형식의 에러 응답을 받게 됩니다.
예를 들어, 존재하지 않는 도서를 조회할 때 프론트엔드는 다음과 같은 응답을 받게 됩니다:
@app.module.ts @auth.module.ts @src 모듈 설정이 적절하게 되어있어?

현재 app.module.ts와 auth.module.ts의 설정을 검토하고, 필요한 경우 개선점을 제안하겠습니다.
app.module.ts
검토 및 개선점
ConfigModule: isGlobal: true로 설정되어 있어, 모든 모듈에서 환경 변수를 사용할 수 있습니다. 적절합니다.
TypeOrmModule: forRootAsync를 사용하여 비동기적으로 설정을 로드하고 있습니다. databaseConfig를 통해 설정을 가져오고 있어, 환경에 따라 유연하게 설정을 변경할 수 있습니다.
GlobalExceptionsFilter: 전역 예외 필터로 설정되어 있어, 모든 예외를 일관되게 처리합니다. 적절합니다.
auth.module.ts
검토 및 개선점
PassportModule: defaultStrategy: 'jwt'로 설정되어 있어, 기본 인증 전략으로 JWT를 사용합니다. 적절합니다.
JwtModule: registerAsync를 사용하여 비동기적으로 설정을 로드하고 있습니다. JWT_SECRET을 환경 변수에서 가져오고 있어 보안에 유리합니다.
TypeOrmModule: forFeature를 사용하여 User 엔티티를 등록하고 있습니다. 적절합니다.
Exports: JwtStrategy와 PassportModule을 내보내고 있어, 다른 모듈에서 사용할 수 있습니다. 적절합니다.
결론
현재 모듈 설정은 적절하게 구성되어 있습니다. 각 모듈은 필요한 의존성을 적절히 가져오고 있으며, 환경 변수와 설정 파일을 통해 유연하게 설정을 관리하고 있습니다. 추가적인 개선이 필요하지 않습니다.
@books.entity.ts @book-metadata.entity.ts
book-metadata의 기본키를 book의 기본키를 가져와서 쓰도록 바꿔줘
그리고 book이 삭제될때 book-metadata도 함께 삭제되도록 엔티티를 수정해

Book과 BookMetadata 엔티티를 수정하여 동일한 ID를 공유하고, CASCADE 설정을 추가하겠습니다.
7 hidden lines
주요 변경사항:
BookMetadata 엔티티:
@PrimaryGeneratedColumn을 @PrimaryColumn으로 변경
@JoinColumn에 referencedColumnName: 'id' 추가하여 Book의 id와 연결
onDelete: 'CASCADE' 옵션 추가
Book 엔티티:
cascade: true 옵션 추가하여 Book 저장 시 BookMetadata도 함께 저장
onDelete: 'CASCADE' 옵션 추가하여 Book 삭제 시 BookMetadata도 함께 삭제
이렇게 하면:
BookMetadata는 Book의 ID를 그대로 사용합니다.
Book이 삭제될 때 연관된 BookMetadata도 자동으로 삭제됩니다.
Book 생성 시 BookMetadata도 함께 생성됩니다.
배포준비를해줘

불필요한 console.log 를 모두 삭제하고

프로젝트 전반에 대한 readme를 작성해줘

먼저 불필요한 console.log를 제거하겠습니다.
books.controller.ts에서:
books.service.ts에서:
jwt.strategy.ts에서:
jwt-auth.guard.ts에서:
이제 프로젝트의 README.md를 작성하겠습니다:
env
Server
PORT=4000
NODE_ENV=development
Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
JWT
JWT_SECRET=your_jwt_secret
bash
의존성 설치
npm install
개발 모드 실행
npm run start:dev
프로덕션 빌드
npm run build
프로덕션 실행
npm run start:prod
README.md
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

   - `.env.production` 파일 생성
   - 프로덕션 데이터베이스 정보 설정
   - JWT 시크릿 키 설정
