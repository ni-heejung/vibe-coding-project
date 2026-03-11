# Code Generation Capability

## ADDED Requirements

### Requirement: TypeScript Type Generation

The system MUST generate TypeScript types from OpenAPI spec.

#### Scenario: Generate Types from OpenAPI
- Given specs/openapi.yaml 파일이 존재한다
- When npm run generate:types 명령을 실행한다
- Then generated/types/api.d.ts 파일이 생성된다
- And 모든 스키마에 대한 TypeScript 인터페이스가 포함된다

#### Scenario: Type Safety in API Routes
- Given TypeScript 타입이 생성되어 있다
- When API 라우트에서 타입을 import한다
- Then 컴파일 타임에 타입 검사가 수행된다

---

### Requirement: Zod Schema Generation

The system MUST generate Zod validation schemas from OpenAPI spec.

#### Scenario: Generate Zod Schemas
- Given specs/openapi.yaml 파일이 존재한다
- When npm run generate:zod 명령을 실행한다
- Then generated/zod/schemas.ts 파일이 생성된다
- And 모든 요청과 응답 스키마에 대한 Zod 검증기가 포함된다

#### Scenario: Runtime Validation
- Given Zod 스키마가 생성되어 있다
- When API 요청이 들어온다
- Then 런타임에 요청 바디가 검증된다
- And 검증 실패 시 상세한 에러 메시지가 반환된다

---

### Requirement: API Client Generation

The system MUST generate a type-safe API client from OpenAPI spec.

#### Scenario: Generate API Client
- Given specs/openapi.yaml 파일이 존재한다
- When npm run generate:client 명령을 실행한다
- Then generated/api-client 폴더에 SDK가 생성된다
- And 모든 엔드포인트에 대한 메서드가 포함된다

#### Scenario: Type-Safe API Calls
- Given API 클라이언트가 생성되어 있다
- When 클라이언트를 사용하여 API를 호출한다
- Then 요청과 응답 타입이 자동 추론된다

---

### Requirement: Unified Generation Script

The system MUST provide a unified script to run all code generation.

#### Scenario: Generate All
- Given OpenAPI 스펙이 업데이트되었다
- When npm run generate:all 명령을 실행한다
- Then 타입과 Zod 스키마와 API 클라이언트가 모두 생성된다
- And 빌드 전에 자동으로 실행된다
