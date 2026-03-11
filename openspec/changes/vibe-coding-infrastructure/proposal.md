# Proposal: Vibe Coding Infrastructure

## Summary

AI를 믿고 맡길 수 있는 바이브 코딩 환경을 구축합니다. AI가 코드를 수정할 때 자동으로 품질을 검증하고, 문제가 있으면 즉시 감지하는 안전장치를 마련합니다.

## Problem Statement

현재 프로젝트는 다음과 같은 문제가 있습니다:

1. **테스트 부재**: AI가 코드를 수정해도 동작 검증 방법이 없음
2. **CI/CD 미비**: 코드 품질 게이트가 없어 문제가 있는 코드가 머지될 수 있음
3. **타입/스키마 수동 관리**: OpenAPI 스펙과 실제 코드의 불일치 가능성
4. **계약 테스트 부재**: API 스펙 준수 여부를 자동 검증하지 않음

## Proposed Solution

### 1. E2E 테스트 (Playwright)

핵심 사용자 시나리오를 자동으로 검증:
- 회원가입/로그인 플로우
- 게시글 CRUD
- 댓글 작성/삭제
- 로케일 전환 (i18n)
- 프로필 페이지

### 2. CI/CD 파이프라인 (GitHub Actions)

모든 PR에서 자동 실행:
- ESLint/Prettier 린트
- TypeScript 타입 체크
- E2E 테스트 실행
- 커버리지 리포트 (목표: 70-80%)

### 3. OpenAPI 기반 코드 생성

`specs/openapi.yaml`에서 자동 생성:
- TypeScript 타입 (`generated/types/`)
- Zod 검증 스키마 (`generated/zod/`)
- API 클라이언트 SDK (`generated/api-client/`)

### 4. 계약 테스트

OpenAPI 스펙 vs 실제 API 응답 자동 검증

## Success Criteria

- [ ] E2E 테스트 커버리지 70% 이상
- [ ] 모든 PR에서 CI 파이프라인 자동 실행
- [ ] OpenAPI 스펙에서 타입/스키마 자동 생성
- [ ] 계약 테스트 통과율 100%
- [ ] AI 변경 후 자동 검증으로 안전하게 머지 가능

## Scope

### In Scope
- Playwright E2E 테스트
- GitHub Actions CI/CD
- OpenAPI 코드 생성 스크립트
- 계약 테스트

### Out of Scope
- 단위 테스트 (시간 제약상 제외)
- Storybook/컴포넌트 문서화
- 자동 배포 (Vercel)

## Timeline

| Phase | Task | Duration |
|-------|------|----------|
| 1 | CI/CD 파이프라인 구축 | 1-2시간 |
| 2 | E2E 테스트 작성 | 3-4시간 |
| 3 | 코드 생성 스크립트 완성 | 1-2시간 |
| 4 | 계약 테스트 및 검증 | 1-2시간 |

**총 예상 시간**: 6-10시간

## Dependencies

- Node.js 18+
- Playwright
- GitHub Actions
- OpenAPI Generator CLI
