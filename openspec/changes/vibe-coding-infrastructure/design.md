# Design: Vibe Coding Infrastructure

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     AI Code Changes                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   GitHub Actions CI/CD                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Lint    │→ │  Type    │→ │   E2E    │→ │  Contract Test   │ │
│  │  Check   │  │  Check   │  │  Tests   │  │  (OpenAPI)       │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
        ✅ All Pass                      ❌ Any Fail
              │                               │
              ▼                               ▼
         Merge OK                     Block + Alert
```

---

## Component Design

### 1. E2E Test Structure

```
e2e/
├── fixtures/
│   ├── auth.ts           # 인증 관련 픽스처
│   └── test-data.ts      # 테스트 데이터
├── pages/
│   ├── home.page.ts      # 홈 페이지 POM
│   ├── article.page.ts   # 게시글 페이지 POM
│   ├── auth.page.ts      # 인증 페이지 POM
│   └── profile.page.ts   # 프로필 페이지 POM
├── tests/
│   ├── auth.spec.ts      # 인증 테스트
│   ├── article.spec.ts   # 게시글 테스트
│   ├── comment.spec.ts   # 댓글 테스트
│   ├── profile.spec.ts   # 프로필 테스트
│   └── i18n.spec.ts      # 국제화 테스트
├── utils/
│   └── helpers.ts        # 공통 헬퍼
└── playwright.config.ts  # Playwright 설정
```

### 2. CI/CD Pipeline Design

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

triggers:
  - pull_request
  - push (main)

jobs:
  lint-and-typecheck:
    steps:
      - npm ci
      - npm run lint
      - npm run typecheck

  e2e-tests:
    needs: lint-and-typecheck
    steps:
      - npm ci
      - npx playwright install
      - npm run test:e2e
      - upload coverage report

  contract-tests:
    needs: lint-and-typecheck
    steps:
      - npm ci
      - npm run test:contract
```

### 3. Code Generation Pipeline

```
specs/openapi.yaml
        │
        ▼
┌───────────────────┐
│  scripts/         │
│  generate-all.sh  │
└───────────────────┘
        │
        ├──────────────────┬──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ generated/   │   │ generated/   │   │ generated/   │
│ types/       │   │ zod/         │   │ api-client/  │
│ api.d.ts     │   │ schemas.ts   │   │ index.ts     │
└──────────────┘   └──────────────┘   └──────────────┘
```

---

## Key Design Decisions

### DD-1: Page Object Model (POM) for E2E Tests

**Decision**: Playwright 테스트에 Page Object Model 패턴 적용

**Rationale**:
- 테스트 코드 재사용성 향상
- UI 변경 시 한 곳만 수정
- 테스트 가독성 개선

**Example**:
```typescript
// e2e/pages/article.page.ts
export class ArticlePage {
  constructor(private page: Page) {}

  async createArticle(title: string, body: string) {
    await this.page.fill('[data-testid="title"]', title)
    await this.page.fill('[data-testid="body"]', body)
    await this.page.click('[data-testid="submit"]')
  }
}
```

### DD-2: Generated Code Isolation

**Decision**: 생성된 코드는 `generated/` 폴더에 격리, git ignore

**Rationale**:
- 소스 코드와 생성 코드 분리
- 빌드 시 항상 최신 상태 보장
- PR diff 노이즈 감소

### DD-3: Contract Testing with Prism

**Decision**: Prism을 사용한 OpenAPI 계약 테스트

**Rationale**:
- OpenAPI 스펙과 실제 응답 자동 비교
- 스펙 위반 즉시 감지
- Mock 서버로 프론트엔드 독립 개발 지원

### DD-4: Parallel CI Jobs

**Decision**: lint/typecheck와 테스트를 병렬 실행

**Rationale**:
- CI 실행 시간 단축
- 빠른 피드백 루프
- GitHub Actions 무료 티어 최적화

---

## Integration Points

### IP-1: OpenAPI ↔ Zod Schemas

```typescript
// src/app/api/articles/route.ts
import { ArticleInputSchema } from '@/generated/zod/schemas'

export async function POST(req: Request) {
  const body = await req.json()
  const result = ArticleInputSchema.safeParse(body)

  if (!result.success) {
    return ApiResponse.badRequest(result.error)
  }
  // ...
}
```

### IP-2: E2E Tests ↔ Test Database

```typescript
// e2e/fixtures/auth.ts
export async function setupTestUser() {
  // 테스트 전용 사용자 생성
  // 테스트 후 정리
}
```

### IP-3: CI ↔ Coverage Reports

```yaml
# Codecov 또는 GitHub Summary로 커버리지 리포트
- uses: actions/upload-artifact@v3
  with:
    name: coverage-report
    path: coverage/
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Flaky E2E 테스트 | 재시도 로직, 명시적 대기 사용 |
| CI 시간 초과 | 병렬 실행, 캐싱 최적화 |
| OpenAPI 스펙 불일치 | Pre-commit hook으로 검증 |
| 테스트 데이터 오염 | 테스트별 격리된 데이터 사용 |
