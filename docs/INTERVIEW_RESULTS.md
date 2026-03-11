# 프로젝트 전환 심층 인터뷰 결과

> **인터뷰 일시**: 2026-03-11
> **인터뷰 방식**: 구조화된 질의응답 (4단계)
> **목적**: 바이브 코딩 시연 프로젝트 전환을 위한 요구사항 수집

---

## 인터뷰 구조

```yaml
interview:
  stages: 4
  total_questions: 12
  format: "multiple_choice_with_multiselect"
  methodology: "structured_requirements_gathering"
```

---

## Stage 1: 프로젝트 목표 및 방향성

### Q1. 바이브 코딩 시연의 주요 목적과 타겟 청중은 누구인가요?

**질문 유형**: Single Select
**응답**:

```yaml
selected: "기술 블로그/포트폴리오용"
description: "개인 기술 역량 어필 및 학습 과정 공유를 위한 시연"

alternatives_considered:
  - "팀/회사 내부 교육용": "동료 개발자들에게 Next.js 풀스택 개발 방법론 전수"
  - "컨퍼런스/밋업 발표용": "외부 개발자 커뮤니티 대상 기술 세션 및 라이브 코딩"
  - "채용/면접 참고자료용": "실무 능력 증명을 위한 프로젝트 사례 및 코드 품질 시연"
```

**시사점**:
- 개인 포트폴리오에 최적화된 문서화 필요
- 학습 과정과 기술적 성장을 보여줄 수 있는 구조
- 외부 공개를 고려한 코드 품질 및 보안

---

### Q2. 현재 프로젝트에서 가장 강조하고 싶은 기술적 강점은 무엇인가요?

**질문 유형**: Multi Select
**응답**:

```yaml
selected:
  - option: "Next.js 14 App Router 아키텍처"
    priority: "primary"
    focus_areas:
      - "서버 컴포넌트 활용"
      - "라우트 핸들러 구조"
      - "미들웨어 패턴"
      - "App Router 최신 기능"

not_selected:
  - "타입 안정성 (TypeScript)": "기본 전제로 가정, 별도 강조 불필요"
  - "국제화(i18n) 구현": "부가 기능으로 간주"
  - "테스트 전략 및 품질 보증": "이번 작업에서 구축 예정"
```

**시사점**:
- Next.js 14 App Router를 핵심 차별점으로 포지셔닝
- 서버/클라이언트 컴포넌트 분리 전략 상세 문서화 필요
- 미들웨어 패턴의 실전 활용 사례 강조

---

## Stage 2: 문서화 및 테스트 전략

### Q3. 문서화 작업에서 우선순위가 높은 영역은 어디인가요?

**질문 유형**: Multi Select
**응답**:

```yaml
selected:
  - option: "아키텍처 문서"
    priority: "highest"
    rationale: "시스템 설계 및 기술 선택의 근거를 명확히 전달"

not_selected:
  - "API 문서": "중요하나 2순위"
  - "개발 환경 설정 가이드": "README에서 커버 가능"
  - "컴포넌트 스토리북/카탈로그": "시간 제약상 제외"
```

**시사점**:
- ARCHITECTURE.md가 가장 중요한 문서
- 시스템 구조, 디자인 패턴, 기술 스택 결정 배경 포함
- API 문서는 부가적으로 작성

---

### Q4. 문서화 작업의 형식과 위치는 어떻게 구성할까요?

**질문 유형**: Multi Select
**응답**:

```yaml
selected:
  - "루트 README.md 확장"
  - "/docs 폴더 분리"

documentation_structure:
  root:
    - file: "README.md"
      content:
        - "프로젝트 개요"
        - "Quick Start 가이드"
        - "핵심 기능 소개"
        - "기술 스택 요약"

  docs_folder:
    - file: "ARCHITECTURE.md"
      purpose: "시스템 아키텍처"
    - file: "API.md"
      purpose: "API 라우트 문서"
    - file: "TESTING.md"
      purpose: "테스트 전략"
    - file: "CI_CD.md"
      purpose: "CI/CD 파이프라인"
    - file: "PROJECT_REQUIREMENTS.md"
      purpose: "요구사항 분석"

not_selected:
  - "JSDoc/TSDoc 코드 주석": "시간 제약"
  - "Storybook/Docusaurus": "오버 엔지니어링"
```

**시사점**:
- 하이브리드 접근: README + 상세 문서 분리
- 빠른 접근성(README)과 깊이(docs 폴더) 병행

---

### Q5. 아키텍처 문서에 포함할 내용의 깊이는 어느 정도를 원하시나요?

**질문 유형**: Single Select
**응답**:

```yaml
selected: "중간 수준"
description: "코드 패턴 설명, 디자인 결정 배경, 컴포넌트 상호작용, 데이터 흐름"

content_scope:
  include:
    - "코드 패턴 설명"
    - "디자인 결정 배경"
    - "컴포넌트 상호작용"
    - "데이터 흐름"

  exclude:
    - "세부 구현 노하우 (상세 수준)"
    - "ADR/RFC 형식 (엔터프라이즈 수준)"

  level_comparison:
    개요: "너무 간략"
    중간: "✓ 선택됨 - 실용적 균형"
    상세: "시간 대비 효과 낮음"
    엔터프라이즈: "오버 엔지니어링"
```

**시사점**:
- 실용적인 깊이로 개발자가 이해하기 충분한 수준
- 과도한 문서화 지양, 코드와 함께 읽히는 문서

---

## Stage 3: 테스트 및 품질 관리

### Q6. 테스트 전략에서 어떤 레벨의 테스트를 구현하고 싶으신가요?

**질문 유형**: Multi Select
**응답**:

```yaml
selected:
  - option: "E2E 테스트"
    framework: "Playwright"
    priority: "primary"
    description: "사용자 시나리오 테스트"

test_scenarios:
  planned:
    - "사용자 회원가입/로그인"
    - "게시글 CRUD 작업"
    - "댓글 작성/수정/삭제"
    - "로케일 전환 (i18n)"
    - "프로필 페이지 탐색"

not_selected:
  - "단위 테스트 (Unit Tests)": "시간 제약, E2E로 커버 가능"
  - "통합 테스트 (Integration Tests)": "선택적으로 추가 가능"
  - "시각적 회귀 테스트": "고급 기능, 제외"
```

**시사점**:
- E2E 테스트로 핵심 사용자 플로우 검증
- Playwright 선택으로 크로스 브라우저 테스트 지원
- 실제 사용자 관점의 테스트 중심

---

### Q7. 커버리지 목표치와 품질 임계값을 어떻게 설정할까요?

**질문 유형**: Single Select
**응답**:

```yaml
selected: "표준 (70-80% 커버리지)"
description: "균형잡힌 품질 관리, 핵심 로직 커버"

quality_metrics:
  coverage_target: "70-80%"
  focus: "핵심 비즈니스 로직"
  approach: "균형잡힌 품질 관리"
  speed: "빠른 개발 속도 유지"

alternatives_considered:
  basic_60: "너무 낮음"
  standard_70_80: "✓ 선택됨 - 실용적 균형"
  strict_80_90: "시간 대비 효과 낮음"
  maximum_90_plus: "오버 엔지니어링"
```

**시사점**:
- 현실적이고 달성 가능한 목표
- 핵심 기능에 집중한 효율적 커버리지
- 품질과 속도의 균형

---

## Stage 4: CI/CD 및 실행 계획

### Q8. CI/CD 파이프라인 호스팅 플랫폼으로 무엇을 사용하실 계획인가요?

**질문 유형**: Single Select
**응답**:

```yaml
selected: "GitHub Actions"
rationale: "무료 티어로 PR별 테스트, 공개 리포에 이상적"

platform_comparison:
  github_actions:
    selected: true
    pros:
      - "무료 티어 충분"
      - "GitHub 통합 우수"
      - "공개 리포 지원"
    use_case: "PR별 자동 테스트"

  vercel_ci:
    selected: false
    note: "배포에는 활용 가능"

  gitlab_ci:
    selected: false
    note: "GitLab 호스팅 시 고려"

  hybrid:
    selected: false
    note: "불필요한 복잡성"
```

**시사점**:
- GitHub Actions 단일 플랫폼 사용
- CI와 배포 분리 가능성 열어둠
- 무료 티어로 충분한 기능

---

### Q9. CI/CD 파이프라인에서 필수적으로 포함되어야 할 단계는 무엇인가요?

**질문 유형**: Multi Select
**응답**:

```yaml
selected:
  - option: "자동 테스트 실행"
    priority: "critical"
    trigger: "커밋/PR 시"
    action: "실패 시 머지 차단"

additional_selected:
  - "코드 품질 검사": "ESLint, Prettier, TypeScript 타입 체크, 커버리지 검증"

pipeline_workflow:
  trigger: "PR 생성/업데이트, main 브랜치 push"
  steps:
    1: "린트 검사 (ESLint, Prettier)"
    2: "타입 체크 (TypeScript)"
    3: "유닛/통합 테스트 (선택적)"
    4: "E2E 테스트 (Playwright)"
    5: "커버리지 리포트"
    6: "배포 (Vercel/기타 플랫폼)"

not_selected:
  - "자동 배포": "선택적"
  - "성능 모니터링": "고급 기능"
```

**시사점**:
- 품질 게이트가 핵심
- 자동화된 검증으로 코드 품질 유지
- 배포는 선택적 단계

---

### Q10. 현재 프로젝트의 문제점이나 개선이 필요한 부분이 있나요?

**질문 유형**: Multi Select
**응답**:

```yaml
selected: "특별한 문제점 없음"

current_status:
  strengths:
    - "기존 코드 품질 양호"
    - "Next.js 14 App Router 구조 잘 갖춰짐"
    - "특별한 문제점 없음"

  maintenance_approach:
    - "기존 코드 구조 유지"
    - "현재 기능 그대로 활용"
    - "추가 작업에만 집중"

not_selected:
  - "코드 품질 개선": "불필요"
  - "테스트 커버리지 부족": "이번 작업에서 해결"
  - "문서화 부재": "이번 작업에서 해결"
```

**시사점**:
- 기존 코드베이스 안정적
- 리팩토링 없이 증강(augmentation) 방식
- 위험 최소화

---

### Q11. 작업 순서와 우선순위를 어떻게 설정할까요?

**질문 유형**: Single Select
**응답**:

```yaml
selected: "CI/CD 먼저"
execution_order:
  phase_1: "GitHub Actions 설정"
  phase_2: "테스트 작성"
  phase_3: "문서화"
  phase_4: "품질 검증"

rationale:
  - "CI/CD 파이프라인을 먼저 구축하면 이후 작업의 품질 보증"
  - "테스트는 CI/CD에 통합되어 자동 검증"
  - "문서화는 마지막에 전체 그림 정리"

alternatives_considered:
  tdd_first: "시간 제약"
  docs_first: "방향성 불확실"
  parallel: "복잡성 증가"
  cicd_first: "✓ 선택됨 - 품질 게이트 우선"
```

**시사점**:
- 인프라 먼저, 코드 나중에
- 자동화 기반 마련 후 개발
- 지속적 품질 검증

---

### Q12. 완료 후 바이브 코딩 시연 방식은 어떻게 할 계획인가요?

**질문 유형**: Single Select
**응답**:

```yaml
selected: "코드 워크스루"
description: "VSCode에서 코드 구조, 테스트, CI/CD 파이프라인 설명"

presentation_structure:
  duration: "20분"
  format: "VSCode 라이브 시연"

  sections:
    - name: "프로젝트 소개"
      duration: "2분"
      content: "README.md 기반 개요, 기술 스택 강조"

    - name: "아키텍처 설명"
      duration: "5분"
      content: "폴더 구조, App Router, 서버/클라이언트 컴포넌트"

    - name: "주요 기능 코드 리뷰"
      duration: "5분"
      content: "인증 플로우, API 라우트, i18n, 컴포넌트"

    - name: "테스트 전략"
      duration: "3분"
      content: "Playwright 테스트, 실행 데모, 커버리지"

    - name: "CI/CD 파이프라인"
      duration: "3분"
      content: "GitHub Actions, PR 자동 테스트, 배포"

    - name: "Q&A"
      duration: "2분"
      content: "기술적 질문, 트레이드오프"

alternatives_considered:
  runtime_demo: "기능 중심, 아키텍처 미흡"
  tech_presentation: "슬라이드 중심, 코드 부족"
  hybrid: "시간 제약"
  code_walkthrough: "✓ 선택됨 - 코드와 설계 모두 커버"
```

**시사점**:
- 실전 코드 중심 시연
- 아키텍처와 구현 동시 강조
- 20분 안에 핵심 전달

---

## 인터뷰 결과 요약 (OpenAPI 스타일)

```yaml
openapi: 3.1.0
info:
  title: "바이브 코딩 프로젝트 전환 요구사항"
  version: "1.0.0"
  description: "심층 인터뷰를 통한 구조화된 요구사항 수집"
  contact:
    name: "Project Owner"
    email: "imheejung@example.com"

paths:
  /project/objective:
    get:
      summary: "프로젝트 목표"
      responses:
        '200':
          description: "성공"
          content:
            application/json:
              schema:
                type: object
                properties:
                  target:
                    type: string
                    enum: ["기술 블로그/포트폴리오용"]
                  strengths:
                    type: array
                    items:
                      type: string
                    example: ["Next.js 14 App Router 아키텍처"]

  /documentation/strategy:
    get:
      summary: "문서화 전략"
      responses:
        '200':
          description: "성공"
          content:
            application/json:
              schema:
                type: object
                properties:
                  priority:
                    type: string
                    example: "아키텍처 문서"
                  depth:
                    type: string
                    enum: ["중간 수준"]
                  structure:
                    type: array
                    items:
                      type: string
                    example: ["루트 README.md", "/docs 폴더"]

  /testing/strategy:
    get:
      summary: "테스트 전략"
      responses:
        '200':
          description: "성공"
          content:
            application/json:
              schema:
                type: object
                properties:
                  primary:
                    type: string
                    enum: ["E2E 테스트"]
                  framework:
                    type: string
                    example: "Playwright"
                  coverage_target:
                    type: string
                    example: "70-80%"

  /cicd/configuration:
    get:
      summary: "CI/CD 구성"
      responses:
        '200':
          description: "성공"
          content:
            application/json:
              schema:
                type: object
                properties:
                  platform:
                    type: string
                    enum: ["GitHub Actions"]
                  required_steps:
                    type: array
                    items:
                      type: string
                    example:
                      - "자동 테스트 실행"
                      - "코드 품질 검사"

  /execution/plan:
    get:
      summary: "실행 계획"
      responses:
        '200':
          description: "성공"
          content:
            application/json:
              schema:
                type: object
                properties:
                  order:
                    type: string
                    enum: ["CI/CD 먼저"]
                  phases:
                    type: array
                    items:
                      type: object
                      properties:
                        phase:
                          type: integer
                        name:
                          type: string
                        duration:
                          type: string
                    example:
                      - phase: 1
                        name: "CI/CD 파이프라인 구축"
                        duration: "1-2시간"
                      - phase: 2
                        name: "E2E 테스트 작성"
                        duration: "3-4시간"
                      - phase: 3
                        name: "아키텍처 문서화"
                        duration: "2-3시간"
                      - phase: 4
                        name: "최종 검증 및 시연 준비"
                        duration: "1-2시간"

  /presentation/format:
    get:
      summary: "시연 방식"
      responses:
        '200':
          description: "성공"
          content:
            application/json:
              schema:
                type: object
                properties:
                  format:
                    type: string
                    enum: ["코드 워크스루"]
                  duration:
                    type: string
                    example: "20분"
                  sections:
                    type: array
                    items:
                      type: object
                      properties:
                        name:
                          type: string
                        duration:
                          type: string
                    example:
                      - name: "프로젝트 소개"
                        duration: "2분"
                      - name: "아키텍처 설명"
                        duration: "5분"

components:
  schemas:
    InterviewResponse:
      type: object
      properties:
        question_id:
          type: string
        question_type:
          type: string
          enum: ["single_select", "multi_select"]
        selected:
          oneOf:
            - type: string
            - type: array
              items:
                type: string
        rationale:
          type: string
        timestamp:
          type: string
          format: date-time
```

---

## 결론 및 다음 단계

### 핵심 결정 사항

1. **목표**: 기술 블로그/포트폴리오용 Next.js 14 App Router 시연
2. **문서화**: 아키텍처 중심, 중간 수준 깊이
3. **테스트**: Playwright E2E 테스트, 70-80% 커버리지
4. **CI/CD**: GitHub Actions 기반 자동화
5. **실행 순서**: CI/CD → 테스트 → 문서화 → 검증

### 다음 액션

```yaml
next_actions:
  - action: "문서 검토 및 승인"
    owner: "Project Owner"
    status: "pending"

  - action: "Phase 1 시작 (CI/CD)"
    dependencies: ["문서 승인"]
    estimated_time: "1-2시간"

  - action: "진행 상황 추적"
    frequency: "각 Phase 완료 시"
```

---

**인터뷰 진행**: Claude Code (SuperClaude Framework)
**문서 작성일**: 2026-03-11
**문서 형식**: OpenAPI 3.1.0 스타일 구조화
