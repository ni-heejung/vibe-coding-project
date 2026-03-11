# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 14 풀스택 애플리케이션으로 RealWorld 명세를 구현한 프로젝트입니다. PostgreSQL, Prisma, Next-Auth를 사용하며, 영어와 중국어 간 국제화(i18n)를 지원합니다.

**핵심 기술 스택:**
- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth.js (JWT 기반 인증)
- next-intl (국제화)
- Tailwind CSS
- Zod (검증)

## Development Commands

```bash
# 개발 서버 실행 (Docker 환경)
docker-compose up --build --force-recreate

# 로컬 개발 서버 (Docker 없이)
npm run dev

# 빌드
npm run build

# 프로덕션 서버
npm start

# Linting
npm run lint

# Prisma 관련
npm run migrate        # 마이그레이션 실행
npm run studio        # Prisma Studio 열기
npm run seed          # 데이터베이스 시딩
```

**환경 변수 필수 설정:**
- `POSTGRES_PRISMA_URL`: PostgreSQL connection pool URL
- `POSTGRES_URL_NON_POOLING`: PostgreSQL direct connection URL
- `NEXTAUTH_SECRET`: NextAuth JWT 시크릿
- `NEXTAUTH_URL`: 애플리케이션 base URL

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── (browse)/[locale]/     # 국제화된 페이지 라우트
│   │   ├── (home)/            # 홈 피드
│   │   ├── article/           # 게시글 상세/편집
│   │   ├── profile/           # 사용자 프로필
│   │   ├── settings/          # 설정
│   │   ├── login/             # 로그인
│   │   └── register/          # 회원가입
│   └── api/                   # API 라우트
│       ├── articles/          # 게시글 CRUD
│       ├── profiles/          # 프로필/팔로우
│       ├── user/              # 사용자 정보
│       └── auth/              # NextAuth
├── actions/                   # 서버 액션 (데이터 페칭)
├── components/                # 재사용 가능한 컴포넌트
├── middlewares/               # Next.js 미들웨어
├── libs/                      # 라이브러리 설정 (auth, prisma)
├── utils/                     # 유틸리티 함수
└── validation/                # Zod 스키마

messages/                      # i18n 번역 파일
prisma/                       # Prisma 스키마 및 마이그레이션
```

### Core Architectural Patterns

**1. Middleware Chain Pattern**

`src/middleware.ts`는 3개의 미들웨어를 체이닝합니다:
- `withFeed`: 피드 관련 처리
- `withAuth`: 인증 상태 관리
- `withIntl`: 국제화 라우팅 (locale prefix 처리)

순서가 중요하며, `chain` 유틸리티로 구성됩니다.

**2. Internationalization (i18n)**

- `next-intl`을 사용한 국제화
- 지원 언어: `en` (영어), `zh` (중국어)
- 라우트 구조: `/[locale]/*` (예: `/en/article/...`, `/zh/profile/...`)
- 번역 파일: `messages/en.json`, `messages/zh.json`
- `src/navigation.ts`에서 typed navigation helpers 제공
- 기본 locale: `en` (prefix 없이 접근 가능)

**3. Authentication Flow**

- NextAuth.js + Prisma Adapter
- JWT 기반 세션 (`strategy: 'jwt'`)
- Credentials Provider (이메일/비밀번호)
- bcrypt로 비밀번호 해싱
- 인증 설정: `src/libs/auth.ts`
- 로그인 페이지: `/login`

**4. API Response Pattern**

모든 API 라우트는 `ApiResponse` 클래스 사용:
```typescript
ApiResponse.ok(data)           // 200
ApiResponse.badRequest(err)    // 400 (Zod 에러 처리)
ApiResponse.unauthorized()     // 401
ApiResponse.forbidden()        // 403
ApiResponse.notFound()         // 404
```

Zod 검증 에러는 자동으로 파싱되어 클라이언트에 전달됩니다.

**5. Database Schema Key Relationships**

- `User` ↔ `Follows` (self-referential many-to-many)
- `User` ↔ `Article` (one-to-many, author)
- `Article` ↔ `Favorites` ↔ `User` (many-to-many)
- `Article` ↔ `Comment` ↔ `User`
- `Article` ↔ `ArticlesTags` ↔ `Tag` (many-to-many)

소프트 삭제 패턴: `Article`과 `Comment`는 `del` boolean 필드 사용

**6. Server Actions vs API Routes**

- `src/actions/`: 서버 컴포넌트에서 데이터 페칭용 (읽기 전용)
  - `getArticle`, `getArticles`, `getComments`, `getCurrentUser`, `getUserProfile`
- `src/app/api/`: 클라이언트 측 mutations 및 인증이 필요한 작업
  - POST, PUT, DELETE 작업

## Important Conventions

### Path Aliases

`@/*`는 `src/*`로 매핑됩니다 (tsconfig.json).

### Prisma Client

싱글톤 패턴으로 Prisma Client를 재사용하세요 (`src/libs/prisma.ts`):
```typescript
import { prisma } from '@/libs/prisma'
```

### Validation

모든 사용자 입력은 Zod 스키마로 검증:
- `userRegisterSchema`: 회원가입
- `articleInputSchema`: 게시글 생성
- `articleUpdateSchema`: 게시글 수정
- `commentSchema`: 댓글 작성

### Internationalization

- 새로운 텍스트 추가 시 `messages/en.json`과 `messages/zh.json` 모두 업데이트
- 컴포넌트에서 번역 사용: `useTranslations()` 훅
- 라우트 변경 시 `src/navigation.ts`의 typed helpers 사용

### Middleware Development

새 미들웨어 추가 시:
1. `NextMiddlewareFactory` 타입 사용
2. `src/middleware.ts`의 chain 배열에 추가
3. 실행 순서 고려 (인증 전 i18n 필요)

### Docker Development

Docker 환경에서 개발 시 볼륨 마운트로 `src/`와 `public/` 변경 사항이 즉시 반영됩니다.

## Database Migrations

Prisma 스키마 변경 후:
1. `npm run migrate` 실행
2. 자동으로 `prisma generate` 실행됨 (postinstall)
3. 타입이 `.prisma/client`에 생성됨

## Known Issues & Gotchas

- `withFeed` 미들웨어는 비영어 환경에서 이슈가 있었습니다 (최근 커밋 참조)
- Prisma Client는 싱글톤으로 사용해야 합니다 (hot reload 이슈 방지)
- NextAuth JWT 세션은 서버 컴포넌트에서 `getServerSession(authOptions)` 사용
- 이미지는 `sharp`로 최적화됩니다
