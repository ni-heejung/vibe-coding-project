# ![RealWorld Example App](logo.png)

> **Next.js 14 App Router 기반 풀스택 소셜 블로깅 플랫폼**

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.6-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-336791?logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**Live Demo**: [https://next-fullstack-realworld-app.vercel.app/](https://next-fullstack-realworld-app.vercel.app/)

---

## 📋 목차

- [스크린샷](#-스크린샷)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 특징](#-프로젝트-특징)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [API 문서](#-api-문서)
- [배포](#-배포)
- [문서](#-문서)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)

---

## 📸 스크린샷

![RealWorld Example App](screenshot.png)

---

## ✨ 주요 기능

### 인증 및 사용자 관리
- ✅ NextAuth.js 기반 JWT 인증
- ✅ 회원가입 / 로그인
- ✅ 사용자 프로필 수정
- ✅ 사용자 팔로우 / 언팔로우

### 게시글 관리
- ✅ Markdown 지원 게시글 작성
- ✅ 게시글 수정 / 삭제 (작성자 권한)
- ✅ 태그 기반 필터링
- ✅ 작성자별 필터링
- ✅ 좋아요한 게시글 필터링
- ✅ 게시글 좋아요 / 좋아요 취소

### 댓글 시스템
- ✅ 게시글 댓글 작성
- ✅ 댓글 삭제 (작성자 권한)

### 국제화 (i18n)
- ✅ 영어 (English)
- ✅ 중국어 간체 (Chinese Simplified)
- ✅ 동적 로케일 전환

---

## 🛠 기술 스택

### Frontend
- **프레임워크**: Next.js 14.0.3 (App Router)
- **UI 라이브러리**: React 18
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS 3.3
- **국제화**: next-intl 3.4

### Backend
- **런타임**: Node.js (Next.js API Routes)
- **ORM**: Prisma 5.6
- **데이터베이스**: PostgreSQL
- **인증**: NextAuth.js 4.24
- **검증**: Zod 3.22

### 개발 도구
- **린터**: ESLint 8
- **포매터**: Prettier 3.1
- **패키지 매니저**: npm
- **컨테이너**: Docker & Docker Compose

---

## 🎯 프로젝트 특징

### Next.js 14 App Router 아키텍처

이 프로젝트는 **Next.js 14 App Router**의 핵심 기능을 활용한 현대적인 웹 애플리케이션입니다.

#### 서버 컴포넌트 (Server Components)
```typescript
// 기본적으로 모든 컴포넌트는 서버 컴포넌트
export default async function ArticlePage({ params }: Props) {
  // 서버에서 직접 데이터 페칭
  const article = await getArticle({ slug: params.slug })
  return <ArticleDetail article={article} />
}
```

**장점**:
- 초기 로딩 속도 향상
- SEO 최적화
- 번들 크기 감소

#### 클라이언트 컴포넌트 (Client Components)
```typescript
'use client'  // 명시적 선언

export function FavoriteButton() {
  const [favorited, setFavorited] = useState(false)
  // 클라이언트 상호작용
}
```

**사용 시나리오**:
- useState, useEffect 등 React Hooks
- 사용자 이벤트 처리
- 브라우저 API 접근

#### API 라우트 핸들러

```typescript
// src/app/api/articles/route.ts
export async function POST(req: NextRequest) {
  // 1. 인증 확인
  const user = await getCurrentUser()

  // 2. 입력 검증 (Zod)
  const result = schema.safeParse(await req.json())

  // 3. 비즈니스 로직 (Prisma)
  const article = await prisma.article.create({ data: result.data })

  // 4. 응답
  return ApiResponse.ok({ article })
}
```

#### 미들웨어 체이닝

```typescript
// src/middleware.ts
export default chain([
  withIntl,   // 로케일 감지
  withAuth,   // 인증 확인
  withFeed,   // 피드 필터링
])
```

### 타입 안정성

- **TypeScript**: 전체 프로젝트 타입 안전
- **Prisma**: 타입 안전한 데이터베이스 쿼리
- **Zod**: 런타임 스키마 검증

```typescript
// Zod 스키마로 입력 검증
const articleSchema = z.object({
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(65535),
  tagList: z.array(z.string()).optional(),
})

// TypeScript 타입 자동 추론
type ArticleInput = z.infer<typeof articleSchema>
```

### 보안

- 🔒 bcrypt 비밀번호 해싱
- 🔒 JWT 토큰 (httpOnly 쿠키)
- 🔒 NextAuth.js CSRF 보호
- 🔒 Zod 입력 검증
- 🔒 Prisma SQL 인젝션 방지

---

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- Docker & Docker Compose (개발 환경)
- PostgreSQL (프로덕션 환경)

### 설치

1. **저장소 클론**

```bash
git clone https://github.com/yourusername/next-fullstack-realworld-app.git
cd next-fullstack-realworld-app
```

2. **의존성 설치**

```bash
npm install
```

3. **환경 변수 설정**

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# 데이터베이스
DATABASE_URL="postgresql://postgres:password@localhost:5432/realworld"
POSTGRES_PRISMA_URL="postgresql://postgres:password@localhost:5432/realworld"
POSTGRES_URL_NON_POOLING="postgresql://postgres:password@localhost:5432/realworld"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 개발 환경 실행

#### Docker Compose 사용 (권장)

```bash
# PostgreSQL + Next.js 개발 서버 실행
docker-compose up --build --force-recreate
```

브라우저에서 http://localhost:3000 을 열어주세요.

#### 로컬 환경

```bash
# PostgreSQL이 이미 실행 중인 경우
npm run migrate    # Prisma 마이그레이션
npm run seed       # 시드 데이터 삽입
npm run dev        # 개발 서버 실행
```

### 프로덕션 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

또는 Docker Compose 사용:

```bash
# 프로덕션 이미지 빌드
docker compose -f docker-compose.production.yml build

# 프로덕션 컨테이너 실행 (detached mode)
docker compose -f docker-compose.production.yml up -d
```

### Prisma Studio

데이터베이스를 GUI로 탐색하려면:

```bash
npm run studio
```

브라우저에서 http://localhost:5555 가 열립니다.

---

## 📁 프로젝트 구조

```
next-fullstack-realworld-app/
├── prisma/                    # Prisma 스키마 및 마이그레이션
│   ├── schema.prisma         # 데이터베이스 스키마
│   └── seed.ts               # 시드 데이터
│
├── src/
│   ├── actions/              # Server Actions (데이터 페칭)
│   ├── app/                  # Next.js App Router
│   │   ├── (browse)/         # 브라우징 레이아웃 그룹
│   │   │   └── [locale]/     # 로케일별 라우트
│   │   └── api/              # API 라우트 핸들러
│   ├── components/           # React 컴포넌트
│   ├── libs/                 # 라이브러리 설정
│   ├── middlewares/          # 미들웨어 체인
│   ├── types/                # TypeScript 타입
│   ├── utils/                # 유틸리티 함수
│   ├── validation/           # Zod 스키마
│   └── middleware.ts         # 글로벌 미들웨어
│
├── docs/                     # 프로젝트 문서
│   ├── ARCHITECTURE.md       # 아키텍처 문서
│   ├── API.md                # API 문서
│   ├── openapi.yaml          # OpenAPI 스펙
│   ├── PROJECT_REQUIREMENTS.md
│   └── INTERVIEW_RESULTS.md
│
├── docker-compose.yml        # 개발 환경
├── next.config.js            # Next.js 설정
└── tsconfig.json             # TypeScript 설정
```

자세한 내용은 [아키텍처 문서](./docs/ARCHITECTURE.md)를 참조하세요.

---

## 📚 API 문서

### 🌟 OpenAPI-First Development

이 프로젝트는 **OpenAPI 스펙 기반 개발**을 채택하고 있습니다:

```
specs/openapi.yaml (진실의 원천)
    ↓
자동 코드 생성 (타입, 클라이언트, 검증 스키마)
    ↓
구현 & 테스트
    ↓
CI/CD 자동화
```

**자세한 가이드**: [OpenAPI-First Development Guide](./docs/OPENAPI_FIRST_DEVELOPMENT.md)

### 빠른 시작

```bash
# 1. OpenAPI 스펙 검증
npm run spec:validate

# 2. 모든 코드 자동 생성
npm run generate:all

# 3. 개발 서버 실행
npm run dev

# 4. API 문서 보기
npm run api:docs

# 5. Mock 서버 (프론트엔드 개발용)
npm run mock:server
```

### OpenAPI 스펙

완전한 API 문서는 [OpenAPI 스펙](./specs/openapi.yaml)을 참조하세요.

### 주요 엔드포인트

#### 인증
- `POST /api/users` - 회원가입
- `POST /api/auth/callback/credentials` - 로그인

#### 게시글
- `POST /api/articles` - 게시글 생성
- `PUT /api/articles/:slug` - 게시글 수정
- `DELETE /api/articles/:slug` - 게시글 삭제
- `POST /api/articles/:slug/favorite` - 좋아요
- `DELETE /api/articles/:slug/favorite` - 좋아요 취소

#### 댓글
- `GET /api/articles/:slug/comments` - 댓글 목록
- `POST /api/articles/:slug/comments` - 댓글 작성
- `DELETE /api/articles/:slug/comments/:id` - 댓글 삭제

#### 프로필
- `POST /api/profiles/:username/follow` - 팔로우
- `DELETE /api/profiles/:username/follow` - 언팔로우

### 예제

```bash
# 회원가입
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

더 많은 예제는 [API 문서](./docs/API.md)를 참조하세요.

---

## 🌐 배포

### Vercel (권장)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/next-fullstack-realworld-app)

1. Vercel에서 프로젝트 생성
2. 환경 변수 설정:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
3. 자동 배포 완료!

### 데이터베이스

권장 PostgreSQL 호스팅:
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)
- [Neon](https://neon.tech/)

---

## 📖 문서

### 프로젝트 문서

- **[아키텍처 문서](./docs/ARCHITECTURE.md)**: 시스템 아키텍처, 설계 패턴, 데이터 흐름
- **[API 문서](./docs/API.md)**: REST API 엔드포인트, 요청/응답 예제
- **[OpenAPI 스펙](./docs/openapi.yaml)**: 표준화된 API 스펙
- **[프로젝트 요구사항](./docs/PROJECT_REQUIREMENTS.md)**: 바이브 코딩 전환 계획
- **[인터뷰 결과](./docs/INTERVIEW_RESULTS.md)**: 요구사항 수집 인터뷰

### 주요 기술 문서

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🤝 기여하기

기여는 언제나 환영합니다! 다음 단계를 따라주세요:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 개발 가이드라인

- TypeScript 엄격 모드 준수
- ESLint/Prettier 규칙 따르기
- 커밋 메시지는 명확하게
- 테스트 작성 (향후 추가 예정)

---

## 🎓 학습 목적

이 프로젝트는 다음 기술을 학습하기 위한 실전 예제입니다:

- ✅ Next.js 14 App Router 아키텍처
- ✅ 서버/클라이언트 컴포넌트 분리 전략
- ✅ API 라우트 핸들러 설계
- ✅ 미들웨어 체이닝 패턴
- ✅ Prisma ORM & PostgreSQL
- ✅ NextAuth.js 인증
- ✅ TypeScript 타입 안정성
- ✅ Zod 스키마 검증
- ✅ 국제화 (i18n)

---

## 📝 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 🙏 감사의 말

이 프로젝트는 [RealWorld](https://github.com/gothinkster/realworld) 스펙을 구현한 것입니다.

### 참고 자료

- [vue3-realworld-example-app](https://github.com/gardenofdev/vue3-realworld-example-app)
- [realworld](https://github.com/gothinkster/realworld)
- [react-realworld-example-app](https://github.com/gardenofdev/react-realworld-example-app/)

---

## 📬 연락처

프로젝트에 대한 질문이나 제안이 있으시면:

- GitHub Issues: [이슈 생성](https://github.com/yourusername/next-fullstack-realworld-app/issues)
- Email: your.email@example.com

---

**Made with ❤️ using Next.js 14, React, TypeScript, and Prisma**

**Documentation generated with 🤖 Claude Code (SuperClaude Framework)**
