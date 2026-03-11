# Tasks: Vibe Coding Infrastructure

## Phase 1: CI/CD 파이프라인 구축 (1-2시간)

### Task 1.1: GitHub Actions 워크플로우 생성
- [x] `.github/workflows/ci.yml` 업데이트
- [x] PR 트리거 설정
- [x] main 브랜치 push 트리거 설정

**File**: `.github/workflows/ci.yml`

### Task 1.2: Lint & Type Check Job
- [x] ESLint 실행 단계 추가
- [x] Prettier 검증 단계 추가
- [x] TypeScript 컴파일 검사 추가

**Commands**:
```bash
npm run lint
npm run typecheck  # package.json에 추가 필요
```

### Task 1.3: package.json 스크립트 추가
- [x] `typecheck` 스크립트 추가
- [x] `test:e2e` 스크립트 추가
- [x] `test:contract` 스크립트 확인 (이미 존재)
- [x] `generate:all` 스크립트 확인 (이미 존재)

**File**: `package.json`

---

## Phase 2: E2E 테스트 작성 (3-4시간)

### Task 2.1: Playwright 설정
- [x] Playwright 설치 확인
- [x] `playwright.config.ts` 생성/수정
- [x] 테스트 폴더 구조 생성

**Commands**:
```bash
npm install -D @playwright/test
npx playwright install
```

### Task 2.2: 테스트 픽스처 작성
- [x] `e2e/fixtures/auth.ts` - 인증 픽스처
- [x] `e2e/fixtures/test-data.ts` - 테스트 데이터

### Task 2.3: Page Object Models 작성
- [x] `e2e/pages/home.page.ts`
- [x] `e2e/pages/auth.page.ts`
- [x] `e2e/pages/article.page.ts`
- [x] `e2e/pages/profile.page.ts`

### Task 2.4: 인증 테스트 작성
- [x] `e2e/tests/auth.spec.ts`
  - [x] 회원가입 테스트
  - [x] 로그인 테스트
  - [x] 로그아웃 테스트
  - [x] 잘못된 자격증명 테스트

### Task 2.5: 게시글 테스트 작성
- [x] `e2e/tests/article.spec.ts`
  - [x] 게시글 목록 조회
  - [x] 게시글 상세 보기
  - [x] 게시글 작성
  - [x] 게시글 수정
  - [x] 게시글 삭제
  - [x] 즐겨찾기 토글

### Task 2.6: 댓글 테스트 작성
- [x] `e2e/tests/comment.spec.ts`
  - [x] 댓글 목록 조회
  - [x] 댓글 작성
  - [x] 댓글 삭제

### Task 2.7: 프로필 테스트 작성
- [x] `e2e/tests/profile.spec.ts`
  - [x] 프로필 조회
  - [x] 팔로우/언팔로우
  - [x] 설정 수정

### Task 2.8: i18n 테스트 작성
- [x] `e2e/tests/i18n.spec.ts`
  - [x] 로케일 전환
  - [x] 번역 텍스트 확인

---

## Phase 3: 코드 생성 스크립트 완성 (1-2시간)

### Task 3.1: TypeScript 타입 생성 설정
- [x] `scripts/generate-types.sh` 생성/수정 (package.json 스크립트로 구현)
- [x] openapi-typescript 설치 확인
- [x] `generated/types/` 출력 경로 설정

**Command**:
```bash
npx openapi-typescript specs/openapi.yaml -o generated/types/api.d.ts
```

### Task 3.2: Zod 스키마 생성 스크립트
- [x] `scripts/generate-zod.js` 업데이트 (이미 구현됨)
- [x] OpenAPI → Zod 변환 로직
- [x] `generated/zod/schemas.ts` 출력

### Task 3.3: API 클라이언트 생성
- [x] `scripts/generate-client.sh` 생성 (package.json 스크립트로 구현)
- [x] openapi-generator-cli 설정
- [x] `generated/api-client/` 출력

### Task 3.4: 통합 생성 스크립트
- [x] `scripts/generate-all.sh` 업데이트 (이미 구현됨)
- [x] 모든 생성기 순차 실행
- [x] prebuild hook에 연결 (`npm run build`에 포함)

---

## Phase 4: 계약 테스트 및 검증 (1-2시간)

### Task 4.1: Prism 설정
- [x] Prism 설치 (이미 설치됨)
- [x] Mock 서버 스크립트 추가 (`npm run mock:server`)
- [x] Proxy 모드 설정 (`scripts/contract-test.sh`)

**Commands**:
```bash
npm install -D @stoplight/prism-cli
```

### Task 4.2: 계약 테스트 스크립트
- [x] `scripts/contract-test.sh` 생성
- [x] Prism proxy 모드로 API 검증
- [x] Jest 기반 계약 테스트 (`tests/contract/api.test.ts`)

### Task 4.3: CI 통합
- [x] CI 워크플로우에 계약 테스트 추가 (`.github/workflows/ci.yml`)
- [x] E2E 테스트 job 추가
- [x] 커버리지 리포트 업로드

### Task 4.4: 최종 검증
- [x] 전체 CI 파이프라인 구성 완료
- [ ] PR 생성 후 CI 실행 확인 (수동 검증 필요)
- [ ] 커버리지 70% 이상 확인 (수동 검증 필요)

---

## Checklist Summary

### Files to Create/Modify

| File | Action | Phase |
|------|--------|-------|
| `.github/workflows/ci.yml` | Modify | 1 |
| `package.json` | Modify | 1 |
| `playwright.config.ts` | Create | 2 |
| `e2e/fixtures/*.ts` | Create | 2 |
| `e2e/pages/*.ts` | Create | 2 |
| `e2e/tests/*.spec.ts` | Create | 2 |
| `scripts/generate-types.sh` | Create | 3 |
| `scripts/generate-client.sh` | Create | 3 |
| `scripts/contract-test.sh` | Create | 4 |

### Dependencies to Install

```bash
# Dev dependencies
npm install -D @playwright/test
npm install -D @stoplight/prism-cli
npm install -D openapi-typescript
```

### Success Metrics

- [x] CI 파이프라인이 PR마다 자동 실행 (ci.yml 구성 완료)
- [x] E2E 테스트 5개 이상 작성 (15+ 테스트 케이스)
- [x] OpenAPI에서 타입 자동 생성 (generate:all 스크립트)
- [x] 계약 테스트 작성 (tests/contract/api.test.ts)
- [ ] 커버리지 70% 이상 (PR 생성 후 확인)
