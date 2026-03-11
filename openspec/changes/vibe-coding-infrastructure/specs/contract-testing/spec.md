# Contract Testing Capability

## ADDED Requirements

### Requirement: OpenAPI Contract Validation

The system MUST validate API responses against OpenAPI spec.

#### Scenario: Validate Response Schema
- Given API 서버가 실행 중이다
- And OpenAPI 스펙이 정의되어 있다
- When API 엔드포인트를 호출한다
- Then 응답이 OpenAPI 스펙과 일치하는지 검증된다
- And 불일치 시 상세한 에러 리포트가 생성된다

#### Scenario: Detect Missing Fields
- Given API 응답에 필수 필드가 누락되었다
- When 계약 테스트를 실행한다
- Then 누락된 필드가 감지된다
- And 테스트가 실패한다

#### Scenario: Detect Extra Fields
- Given API 응답에 스펙에 없는 필드가 포함되었다
- When 계약 테스트를 실행한다
- Then 추가 필드가 경고로 리포트된다

---

### Requirement: Request Validation

The system MUST validate API requests against OpenAPI spec.

#### Scenario: Validate Request Body
- Given 잘못된 형식의 요청 바디가 전송된다
- When API가 요청을 처리한다
- Then 400 Bad Request가 반환된다
- And 검증 에러 상세가 응답에 포함된다

#### Scenario: Validate Path Parameters
- Given 잘못된 형식의 경로 파라미터가 전송된다
- When API가 요청을 처리한다
- Then 적절한 에러 응답이 반환된다

---

### Requirement: CI Integration

The system MUST integrate contract tests into CI pipeline.

#### Scenario: Contract Tests in CI
- Given PR이 생성된다
- When CI 파이프라인이 실행된다
- Then 계약 테스트가 자동으로 실행된다
- And 스펙 위반 시 PR이 차단된다

#### Scenario: Contract Test Report
- Given 계약 테스트가 완료된다
- Then 테스트 결과 리포트가 생성된다
- And PR 코멘트로 요약이 표시된다
