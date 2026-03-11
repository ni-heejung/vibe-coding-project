# CI/CD Pipeline Capability

## ADDED Requirements

### Requirement: Automated Lint and Type Check

The CI pipeline MUST run lint and type checks on all PRs and main branch pushes.

#### Scenario: PR Lint Check
- Given 개발자가 PR을 생성한다
- When CI 파이프라인이 트리거된다
- Then ESLint가 실행된다
- And Prettier 포맷 검증이 실행된다
- And TypeScript 타입 체크가 실행된다
- And 모든 검사 통과 시 녹색 체크가 표시된다

#### Scenario: Lint Failure Blocks Merge
- Given PR에서 린트 에러가 발생한다
- Then PR 머지가 차단된다
- And 실패한 검사 항목이 표시된다

---

### Requirement: Automated E2E Test Execution

The CI pipeline MUST run E2E tests automatically on every PR.

#### Scenario: E2E Tests on PR
- Given 개발자가 PR을 생성한다
- When 린트와 타입 체크가 통과한다
- Then Playwright E2E 테스트가 실행된다
- And 테스트 결과가 PR에 리포트된다

#### Scenario: E2E Test Failure
- Given E2E 테스트가 실패한다
- Then PR 머지가 차단된다
- And 실패한 테스트 목록이 표시된다
- And 스크린샷과 비디오가 아티팩트로 저장된다

---

### Requirement: Coverage Reporting

The CI pipeline MUST generate and report test coverage.

#### Scenario: Coverage Report Generation
- Given E2E 테스트가 완료된다
- Then 커버리지 리포트가 생성된다
- And PR 코멘트로 커버리지 요약이 표시된다

#### Scenario: Coverage Threshold
- Given 커버리지가 70퍼센트 미만이다
- Then 경고 메시지가 표시된다
