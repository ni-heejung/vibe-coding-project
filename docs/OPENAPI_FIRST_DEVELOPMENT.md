# OpenAPI-First Development Guide

## 🎯 개요

이 프로젝트는 **OpenAPI-First Development** 방식을 사용합니다. OpenAPI 스펙이 "단일 진실의 원천(Single Source of Truth)"이며, 모든 코드, 문서, 테스트가 이 스펙으로부터 자동 생성됩니다.

## 📋 워크플로우

```
1. OpenAPI 스펙 작성/수정
   ↓
2. 스펙 검증 (Spectral + Redocly)
   ↓
3. 코드 자동 생성
   ├─ TypeScript 타입
   ├─ API 클라이언트 SDK
   ├─ Zod 검증 스키마
   └─ 테스트 케이스
   ↓
4. 구현 (생성된 코드 활용)
   ↓
5. 계약 테스트 실행
   ↓
6. CI/CD 파이프라인
```

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. OpenAPI 스펙 검증

```bash
# Spectral 린트
npm run spec:lint

# Redocly 검증
npm run spec:validate
```

### 3. 코드 생성

```bash
# 모든 코드 생성
npm run generate:all

# 또는 개별 생성
npm run generate:types    # TypeScript 타입
npm run generate:client   # API 클라이언트
npm run generate:zod      # Zod 스키마
npm run generate:tests    # 테스트 케이스
```

### 4. 개발 서버 실행

```bash
npm run dev
```

### 5. Mock 서버 실행 (프론트엔드 개발용)

```bash
npm run mock:server
```

## 📁 프로젝트 구조

```
next-fullstack-realworld-app/
├── specs/
│   ├── openapi.yaml           ⭐ Single Source of Truth
│   └── examples/              요청/응답 예제
│
├── generated/                 🤖 자동 생성 (git ignore)
│   ├── api-client/           TypeScript SDK
│   ├── types/                TypeScript 타입 정의
│   ├── zod/                  Zod 검증 스키마
│   └── tests/                테스트 스켈레톤
│
├── src/
│   ├── app/api/              Next.js API Routes
│   │   └── [...routes]/      생성된 타입/스키마 사용
│   └── lib/
│       ├── validators/       generated/zod 활용
│       └── api-client/       generated/api-client 활용
│
├── scripts/
│   ├── generate-all.sh       전체 생성 스크립트
│   ├── generate-zod.js       Zod 스키마 생성기
│   └── generate-tests.js     테스트 생성기
│
└── .github/workflows/
    └── openapi-ci.yml        CI/CD 파이프라인
```

## 🛠 개발 워크플로우

### A. API 수정 시 워크플로우

1. **OpenAPI 스펙 수정**
   ```bash
   # specs/openapi.yaml 편집
   code specs/openapi.yaml
   ```

2. **스펙 검증**
   ```bash
   npm run spec:validate
   npm run spec:lint
   ```

3. **코드 재생성**
   ```bash
   npm run generate:all
   ```

4. **구현 업데이트**
   - 생성된 타입 사용: `generated/types/api.d.ts`
   - 생성된 Zod 스키마 사용: `generated/zod/schemas.ts`

5. **테스트**
   ```bash
   npm run test:contract
   ```

### B. 새 엔드포인트 추가 워크플로우

1. **OpenAPI 스펙에 경로 추가**
   ```yaml
   paths:
     /api/new-endpoint:
       post:
         summary: 새로운 엔드포인트
         operationId: createNewResource
         requestBody:
           required: true
           content:
             application/json:
               schema:
                 $ref: '#/components/schemas/NewResource'
         responses:
           '200':
             description: 성공
   ```

2. **스키마 정의 추가**
   ```yaml
   components:
     schemas:
       NewResource:
         type: object
         required:
           - name
         properties:
           name:
             type: string
   ```

3. **코드 생성 및 구현**
   ```bash
   npm run generate:all
   ```

4. **Next.js API Route 구현**
   ```typescript
   // src/app/api/new-endpoint/route.ts
   import { NewResourceSchema } from '@/generated/zod/schemas'
   import type { NewResource } from '@/generated/types/api'

   export async function POST(req: Request) {
     const body = await req.json()
     const result = NewResourceSchema.safeParse(body)

     if (!result.success) {
       return ApiResponse.badRequest(result.error)
     }

     // 비즈니스 로직 구현
   }
   ```

## 📚 주요 명령어

### 스펙 관련
```bash
npm run spec:lint          # Spectral 린트
npm run spec:validate      # Redocly 검증
npm run api:docs           # Swagger UI 실행
```

### 코드 생성
```bash
npm run generate:all       # 전체 생성
npm run generate:types     # TypeScript 타입만
npm run generate:client    # API 클라이언트만
npm run generate:zod       # Zod 스키마만
npm run generate:tests     # 테스트 케이스만
```

### 개발
```bash
npm run dev                # 개발 서버
npm run build              # 프로덕션 빌드 (자동 코드 생성 포함)
npm run mock:server        # Prism Mock 서버
```

### 테스트
```bash
npm run test:contract      # 계약 테스트
```

## 🔍 생성된 코드 활용

### 1. TypeScript 타입 사용

```typescript
import type { Article, User, Comment } from '@/generated/types/api'

const article: Article = {
  id: 'uuid',
  slug: 'article-slug',
  title: 'Article Title',
  // ... 타입 안전성 보장
}
```

### 2. Zod 스키마로 검증

```typescript
import { ArticleInputSchema } from '@/generated/zod/schemas'

export async function POST(req: Request) {
  const body = await req.json()

  // 자동 생성된 Zod 스키마로 검증
  const result = ArticleInputSchema.safeParse(body)

  if (!result.success) {
    return ApiResponse.badRequest(result.error)
  }

  const validatedData = result.data
  // 타입 안전성 보장된 데이터 사용
}
```

### 3. API 클라이언트 사용

```typescript
import { ApiClient } from '@/generated/api-client'

const client = new ApiClient({
  BASE: 'http://localhost:3000',
})

// 타입 안전한 API 호출
const articles = await client.articles.getArticles()
const article = await client.articles.createArticle({
  title: 'New Article',
  body: 'Content',
})
```

## 🧪 테스트 전략

### 계약 테스트 (Contract Testing)

OpenAPI 스펙과 실제 API 응답이 일치하는지 검증합니다.

```bash
npm run test:contract
```

생성된 테스트는 `generated/tests/api.test.ts`에서 확인할 수 있습니다.

### Mock 서버로 프론트엔드 개발

백엔드 구현 전에 프론트엔드 개발이 가능합니다.

```bash
# Prism Mock 서버 실행
npm run mock:server

# 이제 http://localhost:4010 에서 Mock API 사용 가능
```

## 🔄 CI/CD 파이프라인

GitHub Actions가 자동으로 다음을 실행합니다:

1. **OpenAPI 스펙 검증**
   - Spectral 린트
   - Redocly 검증

2. **코드 생성**
   - TypeScript 타입
   - API 클라이언트
   - Zod 스키마

3. **계약 테스트**
   - OpenAPI 스펙 vs 실제 API

4. **빌드 및 배포**
   - Next.js 빌드
   - API 문서 배포 (GitHub Pages)

## 📖 추가 리소스

### OpenAPI 도구
- [Swagger Editor](https://editor.swagger.io/) - 온라인 편집기
- [Redocly](https://redocly.com/) - API 문서 플랫폼
- [Spectral](https://stoplight.io/open-source/spectral) - OpenAPI 린터
- [Prism](https://stoplight.io/open-source/prism) - Mock 서버

### 학습 자료
- [OpenAPI 3.0 스펙](https://swagger.io/specification/)
- [OpenAPI-First Development](https://swagger.io/resources/articles/adopting-an-api-first-approach/)
- [Contract Testing](https://martinfowler.com/bliki/ContractTest.html)

## ⚠️ 주의사항

### DO ✅
- OpenAPI 스펙을 먼저 수정한 후 코드 생성
- 생성된 코드는 수정하지 말고 참조만 사용
- 커밋 전 항상 `npm run spec:validate` 실행
- 생성된 타입과 스키마를 적극 활용

### DON'T ❌
- `generated/` 폴더의 파일을 직접 수정
- OpenAPI 스펙과 불일치하는 코드 작성
- 검증 없이 스펙 변경 커밋
- 생성된 코드를 Git에 커밋 (자동 생성되므로)

## 🤝 기여 가이드

1. OpenAPI 스펙 수정 시 예제도 함께 업데이트
2. breaking change는 버전 업데이트
3. 새 엔드포인트 추가 시 테스트도 함께 작성
4. PR에 API 문서 링크 포함

## 📝 체크리스트

새 API 추가 시:
- [ ] OpenAPI 스펙에 경로 추가
- [ ] 요청/응답 스키마 정의
- [ ] 예제 데이터 추가
- [ ] `npm run spec:validate` 통과
- [ ] `npm run generate:all` 실행
- [ ] API Route 구현
- [ ] 계약 테스트 작성
- [ ] 문서 업데이트
