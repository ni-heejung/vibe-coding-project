# API 문서

> **작성일**: 2026-03-11
> **OpenAPI 스펙**: [openapi.yaml](./openapi.yaml)

## 목차

1. [개요](#개요)
2. [인증](#인증)
3. [엔드포인트](#엔드포인트)
4. [에러 처리](#에러-처리)
5. [예제](#예제)

---

## 개요

### 기본 정보

```yaml
base_url:
  development: "http://localhost:3000/api"
  production: "https://next-fullstack-realworld-app.vercel.app/api"

content_type: "application/json"
authentication: "Bearer Token (JWT)"
```

### API 설계 원칙

- **RESTful**: 표준 HTTP 메서드 사용 (GET, POST, PUT, DELETE)
- **JSON**: 모든 요청/응답은 JSON 형식
- **상태 코드**: 표준 HTTP 상태 코드 사용
- **에러 일관성**: 통일된 에러 응답 형식

---

## 인증

### NextAuth JWT 토큰

모든 보호된 엔드포인트는 JWT 토큰이 필요합니다.

#### 토큰 획득

```bash
# 로그인
POST /api/auth/callback/credentials
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

# 응답: httpOnly 쿠키에 토큰 저장
Set-Cookie: next-auth.session-token=...
```

#### 토큰 사용

브라우저는 자동으로 쿠키를 포함시킵니다.

```bash
GET /api/articles
Cookie: next-auth.session-token=...
```

---

## 엔드포인트

### 인증 (Authentication)

#### 회원가입

```http
POST /api/users
Content-Type: application/json

{
  "user": {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
}
```

**응답 (200 OK)**:

```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "email": "john@example.com",
    "bio": null,
    "image": null
  }
}
```

**에러 (400 Bad Request)**:

```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["Invalid email format"],
    "password": ["Password is too short"]
  }
}
```

---

### 사용자 (Users)

#### 사용자 정보 업데이트

```http
PUT /api/user
Content-Type: application/json
Cookie: next-auth.session-token=...

{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe_updated",
    "email": "john.new@example.com",
    "bio": "Full-stack developer",
    "image": "https://example.com/avatar.jpg",
    "password": "newpassword123"  // 선택적
  }
}
```

**응답 (200 OK)**:

```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe_updated",
    "email": "john.new@example.com",
    "bio": "Full-stack developer",
    "image": "https://example.com/avatar.jpg"
  }
}
```

---

### 게시글 (Articles)

#### 게시글 생성

```http
POST /api/articles
Content-Type: application/json
Cookie: next-auth.session-token=...

{
  "article": {
    "title": "How to build a Next.js app",
    "description": "A comprehensive guide",
    "body": "# Introduction\n\nThis is a detailed guide...",
    "tagList": ["nextjs", "react", "tutorial"]
  }
}
```

**응답 (200 OK)**:

```json
{
  "article": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "how-to-build-nextjs-app",
    "title": "How to build a Next.js app",
    "description": "A comprehensive guide",
    "body": "# Introduction\n\nThis is a detailed guide...",
    "tagList": ["nextjs", "react", "tutorial"],
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z",
    "author": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe",
      "bio": "Full-stack developer",
      "image": "https://example.com/avatar.jpg",
      "email": "john@example.com",
      "following": false
    },
    "favorited": false,
    "favoritesCount": 0
  }
}
```

#### 게시글 수정

```http
PUT /api/articles/{slug}
Content-Type: application/json
Cookie: next-auth.session-token=...

{
  "article": {
    "title": "How to build a Next.js app (Updated)",
    "description": "An updated comprehensive guide",
    "body": "# Introduction (Updated)\n\n...",
    "tagList": ["nextjs", "react", "tutorial", "advanced"]
  }
}
```

**응답 (200 OK)**: 업데이트된 게시글 반환

**에러 (403 Forbidden)**:

```json
{
  "message": "You don't have permission to perform this action"
}
```

#### 게시글 삭제

```http
DELETE /api/articles/{slug}
Cookie: next-auth.session-token=...
```

**응답 (204 No Content)**: 본문 없음

---

### 댓글 (Comments)

#### 댓글 목록 조회

```http
GET /api/articles/{slug}/comments
```

**응답 (200 OK)**:

```json
{
  "comments": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "body": "Great article!",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z",
      "author": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "username": "janedoe",
        "bio": "Software engineer",
        "image": "https://example.com/avatar.jpg",
        "following": false
      }
    }
  ]
}
```

#### 댓글 작성

```http
POST /api/articles/{slug}/comments
Content-Type: application/json
Cookie: next-auth.session-token=...

{
  "comment": "This is a great article! Thanks for sharing."
}
```

**응답 (200 OK)**:

```json
{
  "comment": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "body": "This is a great article! Thanks for sharing.",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z",
    "author": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe",
      "bio": "Full-stack developer",
      "image": "https://example.com/avatar.jpg",
      "following": false
    }
  }
}
```

#### 댓글 삭제

```http
DELETE /api/articles/{slug}/comments/{commentId}
Cookie: next-auth.session-token=...
```

**응답 (204 No Content)**: 본문 없음

---

### 좋아요 (Favorites)

#### 게시글 좋아요

```http
POST /api/articles/{slug}/favorite
Cookie: next-auth.session-token=...
```

**응답 (200 OK)**:

```json
{
  "article": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "how-to-build-nextjs-app",
    "title": "How to build a Next.js app",
    "favorited": true,
    "favoritesCount": 43,
    ...
  }
}
```

#### 게시글 좋아요 취소

```http
DELETE /api/articles/{slug}/favorite
Cookie: next-auth.session-token=...
```

**응답 (200 OK)**: 업데이트된 게시글 (favorited: false)

---

### 프로필 (Profiles)

#### 사용자 팔로우

```http
POST /api/profiles/{username}/follow
Cookie: next-auth.session-token=...
```

**응답 (200 OK)**:

```json
{
  "profile": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "janedoe",
    "bio": "Software engineer",
    "image": "https://example.com/avatar.jpg",
    "email": "jane@example.com",
    "following": true
  }
}
```

#### 사용자 언팔로우

```http
DELETE /api/profiles/{username}/follow
Cookie: next-auth.session-token=...
```

**응답 (200 OK)**: following: false로 업데이트된 프로필

---

## 에러 처리

### HTTP 상태 코드

| 코드 | 의미 | 설명 |
|------|------|------|
| 200 | OK | 요청 성공 |
| 204 | No Content | 성공 (응답 본문 없음) |
| 400 | Bad Request | 잘못된 요청 (검증 실패) |
| 401 | Unauthorized | 인증 필요 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스 없음 |
| 422 | Unprocessable Entity | 검증 실패 |
| 500 | Internal Server Error | 서버 오류 |

### 에러 응답 형식

```json
{
  "message": "에러 메시지",
  "errors": {
    "field1": ["에러 설명 1", "에러 설명 2"],
    "field2": ["에러 설명"]
  }
}
```

### 에러 예시

#### 400 Bad Request

```json
{
  "message": "Validation failed",
  "errors": {
    "title": ["Title is required"],
    "body": ["Body is too long"]
  }
}
```

#### 401 Unauthorized

```json
{
  "message": "Authentication required"
}
```

#### 403 Forbidden

```json
{
  "message": "You don't have permission to perform this action"
}
```

#### 404 Not Found

```json
{
  "message": "Article not found"
}
```

---

## 예제

### cURL 예제

#### 회원가입

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

#### 게시글 생성 (인증 필요)

```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{
    "article": {
      "title": "My First Article",
      "description": "This is my first article",
      "body": "# Hello World",
      "tagList": ["introduction"]
    }
  }'
```

#### 댓글 조회

```bash
curl http://localhost:3000/api/articles/my-first-article/comments
```

### JavaScript Fetch 예제

#### 회원가입

```javascript
const response = await fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user: {
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
    },
  }),
})

const data = await response.json()
console.log(data.user)
```

#### 게시글 생성 (인증 필요)

```javascript
const response = await fetch('http://localhost:3000/api/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // 쿠키 포함
  body: JSON.stringify({
    article: {
      title: 'My First Article',
      description: 'This is my first article',
      body: '# Hello World',
      tagList: ['introduction'],
    },
  }),
})

const data = await response.json()
console.log(data.article)
```

#### 게시글 좋아요

```javascript
const slug = 'my-first-article'

const response = await fetch(`http://localhost:3000/api/articles/${slug}/favorite`, {
  method: 'POST',
  credentials: 'include',
})

const data = await response.json()
console.log(data.article.favoritesCount)
```

### TypeScript 타입 정의

```typescript
// 사용자
interface User {
  id: string
  username: string
  email: string
  bio: string | null
  image: string | null
}

// 프로필
interface Profile extends User {
  following: boolean
}

// 게시글
interface Article {
  id: string
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  author: Profile
  favorited: boolean
  favoritesCount: number
}

// 댓글
interface Comment {
  id: string
  body: string
  createdAt: string
  updatedAt: string
  author: Omit<Profile, 'email'>
}

// API 응답
interface ApiResponse<T> {
  [key: string]: T
}

// 에러 응답
interface ErrorResponse {
  message: string
  errors?: Record<string, string[]>
}
```

---

## API 클라이언트 예제

### 재사용 가능한 API 클라이언트

```typescript
// src/utils/api-client.ts
class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  }

  // 게시글
  async createArticle(data: ArticleInput) {
    return this.request<{ article: Article }>('/articles', {
      method: 'POST',
      body: JSON.stringify({ article: data }),
    })
  }

  async updateArticle(slug: string, data: ArticleInput) {
    return this.request<{ article: Article }>(`/articles/${slug}`, {
      method: 'PUT',
      body: JSON.stringify({ article: data }),
    })
  }

  async deleteArticle(slug: string) {
    return this.request<void>(`/articles/${slug}`, {
      method: 'DELETE',
    })
  }

  // 댓글
  async getComments(slug: string) {
    return this.request<{ comments: Comment[] }>(`/articles/${slug}/comments`)
  }

  async createComment(slug: string, body: string) {
    return this.request<{ comment: Comment }>(`/articles/${slug}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment: body }),
    })
  }

  // 좋아요
  async favoriteArticle(slug: string) {
    return this.request<{ article: Article }>(`/articles/${slug}/favorite`, {
      method: 'POST',
    })
  }

  async unfavoriteArticle(slug: string) {
    return this.request<{ article: Article }>(`/articles/${slug}/favorite`, {
      method: 'DELETE',
    })
  }

  // 팔로우
  async followUser(username: string) {
    return this.request<{ profile: Profile }>(`/profiles/${username}/follow`, {
      method: 'POST',
    })
  }

  async unfollowUser(username: string) {
    return this.request<{ profile: Profile }>(`/profiles/${username}/follow`, {
      method: 'DELETE',
    })
  }
}

// 사용 예시
const api = new ApiClient('http://localhost:3000/api')

// 게시글 생성
const { article } = await api.createArticle({
  title: 'My Article',
  description: 'Description',
  body: 'Content',
  tagList: ['tag1', 'tag2'],
})
```

---

## 참고 자료

- **OpenAPI 스펙**: [openapi.yaml](./openapi.yaml)
- **아키텍처 문서**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Swagger UI**: `npm run docs` (향후 추가 예정)

---

**작성자**: Claude Code (SuperClaude Framework)
**최종 업데이트**: 2026-03-11
**버전**: 1.0.0
