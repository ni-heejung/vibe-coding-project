# Tasks: Vibe Coding Infrastructure

## Phase 1: CI/CD 파이프라인 구축 (1-2시간)

### Task 1.1: GitHub Actions 워크플로우 생성
- [ ] `.github/workflows/ci.yml` 업데이트
- [ ] PR 트리거 설정
- [ ] main 브랜치 push 트리거 설정

**File**: `.github/workflows/ci.yml`

### Task 1.2: Lint & Type Check Job
- [ ] ESLint 실행 단계 추가
- [ ] Prettier 검증 단계 추가
- [ ] TypeScript 컴파일 검사 추가

**Commands**:
```bash
npm run lint
npm run typecheck  # package.json에 추가 필요
```

### Task 1.3: package.json 스크립트 추가
- [ ] `typecheck` 스크립트 추가
- [ ] `test:e2e` 스크립트 추가
- [ ] `test:contract` 스크립트 추가
- [ ] `generate:all` 스크립트 확인/수정

**File**: `package.json`

---

## Phase 2: E2E 테스트 작성 (3-4시간)

### Task 2.1: Playwright 설정
- [ ] Playwright 설치 확인
- [ ] `playwright.config.ts` 생성/수정
- [ ] 테스트 폴더 구조 생성

**Commands**:
```bash
npm install -D @playwright/test
npx playwright install
```

### Task 2.2: 테스트 픽스처 작성
- [ ] `e2e/fixtures/auth.ts` - 인증 픽스처
- [ ] `e2e/fixtures/test-data.ts` - 테스트 데이터

### Task 2.3: Page Object Models 작성
- [ ] `e2e/pages/home.page.ts`
- [ ] `e2e/pages/auth.page.ts`
- [ ] `e2e/pages/article.page.ts`
- [ ] `e2e/pages/profile.page.ts`

### Task 2.4: 인증 테스트 작성
- [ ] `e2e/tests/auth.spec.ts`
  - [ ] 회원가입 테스트
  - [ ] 로그인 테스트
  - [ ] 로그아웃 테스트
  - [ ] 잘못된 자격증명 테스트

### Task 2.5: 게시글 테스트 작성
- [ ] `e2e/tests/article.spec.ts`
  - [ ] 게시글 목록 조회
  - [ ] 게시글 상세 보기
  - [ ] 게시글 작성
  - [ ] 게시글 수정
  - [ ] 게시글 삭제
  - [ ] 즐겨찾기 토글

### Task 2.6: 댓글 테스트 작성
- [ ] `e2e/tests/comment.spec.ts`
  - [ ] 댓글 목록 조회
  - [ ] 댓글 작성
  - [ ] 댓글 삭제

### Task 2.7: 프로필 테스트 작성
- [ ] `e2e/tests/profile.spec.ts`
  - [ ] 프로필 조회
  - [ ] 팔로우/언팔로우
  - [ ] 설정 수정

### Task 2.8: i18n 테스트 작성
- [ ] `e2e/tests/i18n.spec.ts`
  - [ ] 로케일 전환
  - [ ] 번역 텍스트 확인

---

## Phase 3: 코드 생성 스크립트 완성 (1-2시간)

### Task 3.1: TypeScript 타입 생성 설정
- [ ] `scripts/generate-types.sh` 생성/수정
- [ ] openapi-typescript 설치 확인
- [ ] `generated/types/` 출력 경로 설정

**Command**:
```bash
npx openapi-typescript specs/openapi.yaml -o generated/types/api.d.ts
```

### Task 3.2: Zod 스키마 생성 스크립트
- [ ] `scripts/generate-zod.js` 업데이트
- [ ] OpenAPI → Zod 변환 로직
- [ ] `generated/zod/schemas.ts` 출력

### Task 3.3: API 클라이언트 생성
- [ ] `scripts/generate-client.sh` 생성
- [ ] openapi-generator-cli 설정
- [ ] `generated/api-client/` 출력

### Task 3.4: 통합 생성 스크립트
- [ ] `scripts/generate-all.sh` 업데이트
- [ ] 모든 생성기 순차 실행
- [ ] prebuild hook에 연결

---

## Phase 4: 계약 테스트 및 검증 (1-2시간)

### Task 4.1: Prism 설정
- [ ] Prism 설치
- [ ] Mock 서버 스크립트 추가
- [ ] Proxy 모드 설정

**Commands**:
```bash
npm install -D @stoplight/prism-cli
```

### Task 4.2: 계약 테스트 스크립트
- [ ] `scripts/contract-test.sh` 생성
- [ ] Prism proxy 모드로 API 검증
- [ ] 실패 시 상세 리포트

### Task 4.3: CI 통합
- [ ] CI 워크플로우에 계약 테스트 추가
- [ ] E2E 테스트 job 추가
- [ ] 커버리지 리포트 업로드

### Task 4.4: 최종 검증
- [ ] 전체 CI 파이프라인 실행
- [ ] 모든 테스트 통과 확인
- [ ] 커버리지 70% 이상 확인

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

- [ ] CI 파이프라인이 PR마다 자동 실행
- [ ] E2E 테스트 5개 이상 통과
- [ ] OpenAPI에서 타입 자동 생성
- [ ] 계약 테스트 통과
- [ ] 커버리지 70% 이상
