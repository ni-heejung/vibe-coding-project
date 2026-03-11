# Specs: Vibe Coding Infrastructure

## Functional Requirements

### FR-1: E2E Testing

#### FR-1.1: Authentication Tests
- 회원가입 폼 입력 및 제출
- 로그인/로그아웃 플로우
- 인증 상태 유지 확인
- 잘못된 자격증명 에러 처리

#### FR-1.2: Article Tests
- 게시글 목록 조회
- 게시글 상세 페이지 진입
- 새 게시글 작성 (인증 필요)
- 게시글 수정/삭제 (작성자만)
- 게시글 즐겨찾기 토글

#### FR-1.3: Comment Tests
- 댓글 목록 조회
- 댓글 작성 (인증 필요)
- 댓글 삭제 (작성자만)

#### FR-1.4: Profile Tests
- 프로필 페이지 조회
- 팔로우/언팔로우
- 사용자 설정 수정

#### FR-1.5: i18n Tests
- 로케일 전환 (en ↔ zh)
- 번역 텍스트 표시 확인
- URL 로케일 프리픽스 확인

### FR-2: CI/CD Pipeline

#### FR-2.1: Lint & Type Check
- ESLint 규칙 검사
- Prettier 포맷 검증
- TypeScript 컴파일 에러 검사

#### FR-2.2: Test Execution
- E2E 테스트 자동 실행
- 테스트 실패 시 PR 머지 차단
- 커버리지 리포트 생성

#### FR-2.3: Triggers
- PR 생성/업데이트 시 실행
- main 브랜치 push 시 실행

### FR-3: Code Generation

#### FR-3.1: TypeScript Types
- OpenAPI 스키마 → TypeScript 인터페이스
- 요청/응답 타입 생성
- 경로 파라미터 타입 생성

#### FR-3.2: Zod Schemas
- OpenAPI 스키마 → Zod 검증 스키마
- 런타임 검증 지원
- 에러 메시지 한국어화

#### FR-3.3: API Client
- OpenAPI → TypeScript SDK
- 타입 안전 API 호출
- 에러 핸들링 포함

### FR-4: Contract Testing

#### FR-4.1: Response Validation
- 실제 API 응답 vs OpenAPI 스펙 비교
- 스키마 불일치 감지
- 필수 필드 누락 검사

#### FR-4.2: Request Validation
- 요청 바디 스키마 검증
- 경로 파라미터 검증
- 쿼리 파라미터 검증

---

## Non-Functional Requirements

### NFR-1: Performance
- E2E 테스트 전체 실행 시간 < 5분
- CI 파이프라인 전체 실행 시간 < 10분

### NFR-2: Coverage
- E2E 테스트 커버리지 ≥ 70%
- 핵심 비즈니스 로직 100% 커버

### NFR-3: Reliability
- CI 파이프라인 안정성 99%+
- Flaky 테스트 최소화

### NFR-4: Maintainability
- 테스트 코드 가독성
- 재사용 가능한 테스트 유틸리티
- 명확한 테스트 네이밍

---

## Technical Constraints

### TC-1: Framework Versions
- Next.js 14.x
- Playwright 1.40+
- Node.js 18+

### TC-2: OpenAPI
- OpenAPI 3.0.3 스펙 준수
- `specs/openapi.yaml` 단일 소스

### TC-3: CI/CD
- GitHub Actions 사용
- 무료 티어 한도 내 운영

### TC-4: Generated Code
- `generated/` 폴더는 git ignore
- 빌드 시 자동 재생성
