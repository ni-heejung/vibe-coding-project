# 프로젝트 문서 인덱스

> **Next.js 14 RealWorld App 문서 허브**
>
> 이 디렉토리에는 프로젝트의 모든 기술 문서가 포함되어 있습니다.

---

## 📚 문서 목록

### 1. 아키텍처 & 설계

#### [ARCHITECTURE.md](./ARCHITECTURE.md) 📐
**시스템 아키텍처 및 설계 패턴**

프로젝트의 전체 아키텍처, 기술 스택, 디자인 패턴, 데이터 흐름을 상세히 설명합니다.

**주요 내용**:
- Next.js 14 App Router 패턴
- 서버/클라이언트 컴포넌트 전략
- API 라우트 핸들러 설계
- 미들웨어 체이닝
- 데이터베이스 스키마 (Prisma)
- 보안 고려사항
- 성능 최적화

**대상 독자**: 개발자, 아키텍트, 시니어 엔지니어

---

### 2. API 문서

#### [API.md](./API.md) 🔌
**REST API 엔드포인트 가이드**

모든 API 엔드포인트의 요청/응답 형식, 인증 방법, 에러 처리를 설명합니다.

**주요 내용**:
- 인증 (회원가입, 로그인)
- 게시글 CRUD
- 댓글 시스템
- 좋아요 기능
- 팔로우/언팔로우
- cURL & JavaScript 예제
- TypeScript 타입 정의

**대상 독자**: 프론트엔드 개발자, API 사용자

#### [openapi.yaml](./openapi.yaml) 📋
**OpenAPI 3.1.0 스펙**

표준화된 OpenAPI 스펙 문서. Swagger UI, Postman 등과 호환됩니다.

**사용 방법**:
```bash
# Swagger UI로 보기 (향후 추가 예정)
npm run docs

# Postman에서 import
File → Import → openapi.yaml
```

**대상 독자**: API 개발자, QA 엔지니어

---

### 3. 프로젝트 관리

#### [PROJECT_REQUIREMENTS.md](./PROJECT_REQUIREMENTS.md) 📝
**프로젝트 전환 요구사항 분석**

바이브 코딩 시연 프로젝트로 전환하기 위한 요구사항 문서입니다.

**주요 내용**:
- 프로젝트 목표 (기술 블로그/포트폴리오용)
- 문서화 전략 (아키텍처 중심)
- 테스트 전략 (E2E 테스트, 70-80% 커버리지)
- CI/CD 구성 (GitHub Actions)
- 4단계 실행 계획
- 20분 시연 시나리오

**대상 독자**: 프로젝트 매니저, 기술 리더

#### [INTERVIEW_RESULTS.md](./INTERVIEW_RESULTS.md) 💬
**심층 인터뷰 결과 (OpenAPI 스타일)**

프로젝트 전환을 위한 12개 질문의 심층 인터뷰 결과를 OpenAPI 3.1.0 스타일로 구조화한 문서입니다.

**주요 내용**:
- 4단계 인터뷰 (12개 질문)
- 각 질문별 YAML 형식 응답
- 선택 근거 및 시사점
- OpenAPI 스타일 요약
- 다음 단계 액션

**대상 독자**: 프로젝트 이해관계자, 기술 리더

---

## 📖 문서 읽기 순서

### 신규 개발자

프로젝트를 처음 접하는 개발자라면 다음 순서로 읽는 것을 권장합니다:

1. **[../README.md](../README.md)** - 프로젝트 개요 및 Quick Start
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 시스템 아키텍처 이해
3. **[API.md](./API.md)** - API 사용법 학습

### 프론트엔드 개발자

API 통합 작업을 하는 경우:

1. **[API.md](./API.md)** - API 엔드포인트 및 예제
2. **[openapi.yaml](./openapi.yaml)** - 상세 API 스펙
3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 서버/클라이언트 컴포넌트 패턴

### 백엔드 개발자

API 개발 및 유지보수:

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - API 라우트 핸들러 패턴
2. **[API.md](./API.md)** - API 설계 및 에러 처리
3. **[openapi.yaml](./openapi.yaml)** - OpenAPI 스펙 준수

### 프로젝트 매니저 / 기술 리더

프로젝트 계획 및 방향성:

1. **[PROJECT_REQUIREMENTS.md](./PROJECT_REQUIREMENTS.md)** - 프로젝트 전환 계획
2. **[INTERVIEW_RESULTS.md](./INTERVIEW_RESULTS.md)** - 요구사항 상세 분석
3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 기술적 아키텍처

---

## 🎯 문서 목적별 인덱스

### 학습 목적

Next.js 14 App Router를 학습하려면:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** → "아키텍처 패턴" 섹션
  - 서버/클라이언트 컴포넌트
  - API 라우트 핸들러
  - 미들웨어 체이닝

### API 개발

API를 개발하거나 사용하려면:

- **[API.md](./API.md)** → "엔드포인트" 섹션
- **[openapi.yaml](./openapi.yaml)** → OpenAPI 스펙
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** → "API 라우트 핸들러 패턴" 섹션

### 시스템 설계

아키텍처를 이해하려면:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** → "핵심 설계 결정" 섹션
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** → "데이터 흐름" 섹션
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** → "보안 고려사항" 섹션

### 프로젝트 계획

프로젝트 방향성을 이해하려면:

- **[PROJECT_REQUIREMENTS.md](./PROJECT_REQUIREMENTS.md)** → "실행 계획" 섹션
- **[INTERVIEW_RESULTS.md](./INTERVIEW_RESULTS.md)** → "인터뷰 결과 요약" 섹션

---

## 📊 문서 통계

| 문서 | 페이지 | 섹션 | 코드 예제 | 다이어그램 |
|------|--------|------|-----------|-----------|
| ARCHITECTURE.md | ~30 | 7 | 20+ | 4 |
| API.md | ~20 | 5 | 15+ | 0 |
| openapi.yaml | ~15 | - | - | - |
| PROJECT_REQUIREMENTS.md | ~10 | 9 | 5+ | 0 |
| INTERVIEW_RESULTS.md | ~15 | 13 | 10+ | 0 |

**총 문서 페이지**: ~90 페이지
**총 코드 예제**: 50+ 개
**다이어그램**: 4 개 (Mermaid)

---

## 🔄 문서 업데이트 주기

| 문서 | 업데이트 빈도 | 마지막 업데이트 |
|------|---------------|-----------------|
| ARCHITECTURE.md | 주요 아키텍처 변경 시 | 2026-03-11 |
| API.md | API 변경 시 | 2026-03-11 |
| openapi.yaml | API 변경 시 | 2026-03-11 |
| PROJECT_REQUIREMENTS.md | 프로젝트 방향 변경 시 | 2026-03-11 |
| INTERVIEW_RESULTS.md | 정적 문서 | 2026-03-11 |

---

## 🛠 문서 도구

### 로컬에서 문서 보기

#### Markdown 뷰어

```bash
# VSCode에서 Markdown 프리뷰
code docs/ARCHITECTURE.md

# Markdown을 HTML로 변환
npm install -g marked
marked docs/ARCHITECTURE.md > output.html
```

#### OpenAPI 뷰어

```bash
# Swagger UI (향후 추가 예정)
npm run docs

# 브라우저에서 openapi.yaml 보기
open docs/openapi.yaml
```

### 문서 생성 도구

이 문서는 다음 도구로 생성되었습니다:

- **Claude Code (SuperClaude Framework)**: AI 기반 문서 생성
- **OpenAPI Generator**: API 스펙 자동 생성 (향후)
- **TypeDoc**: TypeScript 타입 문서화 (향후)
- **Mermaid**: 다이어그램 생성

---

## ✅ 문서 체크리스트

프로젝트 문서가 완전한지 확인하세요:

- [x] README.md (프로젝트 개요)
- [x] ARCHITECTURE.md (아키텍처)
- [x] API.md (API 문서)
- [x] openapi.yaml (OpenAPI 스펙)
- [x] PROJECT_REQUIREMENTS.md (요구사항)
- [x] INTERVIEW_RESULTS.md (인터뷰)
- [ ] TESTING.md (테스트 전략) - 향후 추가
- [ ] CI_CD.md (CI/CD 파이프라인) - 향후 추가
- [ ] CONTRIBUTING.md (기여 가이드) - 향후 추가
- [ ] CHANGELOG.md (변경 이력) - 향후 추가

---

## 🤝 문서 기여

문서 개선에 기여하고 싶다면:

1. 오타나 불명확한 부분 발견 시 Issue 생성
2. 예제 코드 추가 제안
3. 다이어그램 개선 제안
4. 번역 기여 (영어 → 한국어)

### 문서 작성 가이드라인

- **명확성**: 기술 용어는 명확하게 설명
- **예제**: 실제 동작하는 코드 예제 포함
- **구조**: 목차와 섹션으로 구조화
- **업데이트**: 코드 변경 시 문서도 함께 업데이트

---

## 📞 문의

문서 관련 질문이나 제안이 있으면:

- **GitHub Issues**: [이슈 생성](https://github.com/yourusername/next-fullstack-realworld-app/issues)
- **Discussion**: [토론 시작](https://github.com/yourusername/next-fullstack-realworld-app/discussions)

---

## 📜 버전 이력

### v1.0.0 (2026-03-11)

**초기 문서 세트 완성**

- ✅ ARCHITECTURE.md 작성 완료
- ✅ API.md 작성 완료
- ✅ openapi.yaml 생성 완료
- ✅ PROJECT_REQUIREMENTS.md 작성 완료
- ✅ INTERVIEW_RESULTS.md 작성 완료
- ✅ README.md 업데이트 완료

**다음 계획**:
- 📝 TESTING.md 추가
- 📝 CI_CD.md 추가
- 🔧 Swagger UI 통합
- 🔧 자동 문서 생성 스크립트

---

**문서 생성 도구**: 🤖 Claude Code (SuperClaude Framework)

**최종 업데이트**: 2026-03-11

**문서 버전**: 1.0.0
