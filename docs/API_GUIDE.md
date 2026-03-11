# API 사용 가이드

## OpenAPI 명세

이 프로젝트는 OpenAPI 3.0 표준을 따르는 REST API를 제공합니다.

### 문서 위치

- **OpenAPI 스펙**: `openapi.yaml` (프로젝트 루트)
- **온라인 뷰어**: [Swagger Editor](https://editor.swagger.io/)

## API 문서 보기

### 방법 1: Swagger UI (권장)

```bash
# npx를 사용하여 즉시 실행 (설치 불필요)
npm run api:docs
```

브라우저에서 자동으로 Swagger UI가 열립니다 (기본: http://localhost:8080).

### 방법 2: 온라인 Swagger Editor

1. https://editor.swagger.io/ 접속
2. `openapi.yaml` 파일 내용을 복사
3. 에디터에 붙여넣기
4. 우측에 API 문서가 렌더링됨

### 방법 3: VS Code Extension

**Swagger Viewer 설치:**
```bash
code --install-extension Arjun.swagger-viewer
```

**사용법:**
1. VS Code에서 `openapi.yaml` 파일 열기
2. `Shift + Alt + P` (Windows/Linux) 또는 `Shift + Option + P` (Mac)
3. "Preview Swagger" 입력 후 선택
4. 미리보기 패널에서 API 문서 확인

### 방법 4: Redoc

더 깔끔한 문서를 원한다면:

```bash
npx @redocly/cli preview-docs openapi.yaml
```

## API 인증

### JWT 토큰 기반 인증

대부분의 API는 JWT 토큰 기반 인증이 필요합니다.

**1. 로그인으로 토큰 받기:**

```bash
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**2. 인증이 필요한 API 호출:**

```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "article": {
      "title": "My Article",
      "description": "Description",
      "body": "Article content",
      "tagList": ["tag1", "tag2"]
    }
  }'
```

## API 엔드포인트

### 인증 (Authentication)

| 메서드 | 엔드포인트 | 설명 | 인증 필요 |
|--------|-----------|------|----------|
| POST | `/api/users` | 회원가입 | ❌ |
| POST | `/api/auth/callback/credentials` | 로그인 | ❌ |

### 사용자 (User)

| 메서드 | 엔드포인트 | 설명 | 인증 필요 |
|--------|-----------|------|----------|
| PUT | `/api/user` | 사용자 정보 수정 | ✅ |

### 프로필 (Profile)

| 메서드 | 엔드포인트 | 설명 | 인증 필요 |
|--------|-----------|------|----------|
| POST | `/api/profiles/:username/follow` | 팔로우 | ✅ |
| DELETE | `/api/profiles/:username/follow` | 언팔로우 | ✅ |

### 게시글 (Articles)

| 메서드 | 엔드포인트 | 설명 | 인증 필요 |
|--------|-----------|------|----------|
| POST | `/api/articles` | 게시글 작성 | ✅ |
| PUT | `/api/articles/:slug` | 게시글 수정 | ✅ |
| DELETE | `/api/articles/:slug` | 게시글 삭제 | ✅ |

### 즐겨찾기 (Favorites)

| 메서드 | 엔드포인트 | 설명 | 인증 필요 |
|--------|-----------|------|----------|
| POST | `/api/articles/:slug/favorite` | 즐겨찾기 추가 | ✅ |
| DELETE | `/api/articles/:slug/favorite` | 즐겨찾기 제거 | ✅ |

### 댓글 (Comments)

| 메서드 | 엔드포인트 | 설명 | 인증 필요 |
|--------|-----------|------|----------|
| GET | `/api/articles/:slug/comments` | 댓글 목록 조회 | ❌ |
| POST | `/api/articles/:slug/comments` | 댓글 작성 | ✅ |
| DELETE | `/api/articles/:slug/comments/:id` | 댓글 삭제 | ✅ |

## API 사용 예제

### 1. 회원가입

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "username": "johndoe",
      "email": "john@example.com",
      "password": "password123"
    }
  }'
```

**응답:**
```json
{
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "bio": null,
    "image": "https://api.dicebear.com/7.x/identicon/svg?seed=johndoe",
    "following": false
  }
}
```

### 2. 게시글 작성

```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "article": {
      "title": "How to train your dragon",
      "description": "Ever wonder how?",
      "body": "It takes a Jacobian",
      "tagList": ["dragons", "training"]
    }
  }'
```

**응답:**
```json
{
  "article": {
    "id": "uuid",
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "johndoe",
      "bio": null,
      "image": "...",
      "following": false
    }
  }
}
```

### 3. 댓글 작성

```bash
curl -X POST http://localhost:3000/api/articles/how-to-train-your-dragon/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "comment": "Great article!"
  }'
```

### 4. 사용자 팔로우

```bash
curl -X POST http://localhost:3000/api/profiles/johndoe/follow \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 에러 응답

모든 API는 일관된 에러 형식을 사용합니다:

```json
{
  "errors": {
    "field": ["Error message 1", "Error message 2"]
  }
}
```

### HTTP 상태 코드

- `200 OK`: 성공
- `204 No Content`: 성공 (응답 본문 없음)
- `400 Bad Request`: 잘못된 요청 (검증 실패)
- `401 Unauthorized`: 인증 필요
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스를 찾을 수 없음

### 검증 에러 예제

```json
{
  "errors": {
    "email": ["Invalid email"],
    "password": ["Password is too short"]
  }
}
```

## 데이터 스키마

### User

```typescript
{
  id: string          // UUID
  username: string    // 최대 20자
  email: string       // 이메일 형식
  bio: string | null
  image: string       // URL
  following: boolean
}
```

### Article

```typescript
{
  id: string              // UUID
  slug: string            // URL-friendly
  title: string           // 1-100자
  description: string
  body: string            // 1-65535자
  tagList: string[]
  createdAt: string       // ISO 8601
  updatedAt: string       // ISO 8601
  favorited: boolean
  favoritesCount: number
  author: Profile
}
```

### Comment

```typescript
{
  id: string          // UUID
  body: string        // 1-65535자
  createdAt: string   // ISO 8601
  updatedAt: string   // ISO 8601
  author: Profile
}
```

## 개발 팁

### Postman 컬렉션

OpenAPI 스펙을 Postman으로 가져오기:

1. Postman 실행
2. Import → OpenAPI
3. `openapi.yaml` 파일 선택
4. 자동으로 컬렉션 생성됨

### curl 테스트

`.env.local`에 테스트 계정 설정:

```bash
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=password123
```

### API 클라이언트 생성

OpenAPI 스펙으로 클라이언트 코드 자동 생성:

```bash
# TypeScript 클라이언트
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-fetch \
  -o ./src/api-client

# Python 클라이언트
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g python \
  -o ./clients/python
```

## 추가 리소스

- [OpenAPI 3.0 명세](https://swagger.io/specification/)
- [RealWorld API 스펙](https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
