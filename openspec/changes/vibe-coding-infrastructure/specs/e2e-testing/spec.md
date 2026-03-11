# E2E Testing Capability

## ADDED Requirements

### Requirement: Authentication E2E Tests

The system MUST implement Playwright E2E tests for authentication flows.

#### Scenario: User Registration
- Given 사용자가 회원가입 페이지에 접속한다
- When 유효한 이메일, 사용자명, 비밀번호를 입력한다
- And 회원가입 버튼을 클릭한다
- Then 홈 페이지로 리다이렉트된다
- And 네비게이션에 사용자명이 표시된다

#### Scenario: User Login
- Given 등록된 사용자가 로그인 페이지에 접속한다
- When 유효한 이메일과 비밀번호를 입력한다
- And 로그인 버튼을 클릭한다
- Then 홈 페이지로 리다이렉트된다
- And 세션이 유지된다

#### Scenario: Invalid Credentials
- Given 사용자가 로그인 페이지에 접속한다
- When 잘못된 이메일 또는 비밀번호를 입력한다
- And 로그인 버튼을 클릭한다
- Then 에러 메시지가 표시된다

---

### Requirement: Article CRUD E2E Tests

The system MUST implement E2E tests for article CRUD operations.

#### Scenario: View Article List
- Given 사용자가 홈 페이지에 접속한다
- Then 게시글 목록이 표시된다
- And 각 게시글에 제목, 작성자, 날짜가 표시된다

#### Scenario: Create Article
- Given 인증된 사용자가 새 게시글 페이지에 접속한다
- When 제목, 내용, 태그를 입력한다
- And 게시 버튼을 클릭한다
- Then 게시글 상세 페이지로 이동한다
- And 작성한 내용이 표시된다

#### Scenario: Edit Article
- Given 게시글 작성자가 자신의 게시글 페이지에 접속한다
- When 수정 버튼을 클릭한다
- And 내용을 수정하고 저장한다
- Then 수정된 내용이 표시된다

#### Scenario: Delete Article
- Given 게시글 작성자가 자신의 게시글 페이지에 접속한다
- When 삭제 버튼을 클릭한다
- Then 게시글이 삭제된다
- And 홈 페이지로 리다이렉트된다

---

### Requirement: Comment E2E Tests

The system MUST implement E2E tests for comment functionality.

#### Scenario: Add Comment
- Given 인증된 사용자가 게시글 상세 페이지에 접속한다
- When 댓글 내용을 입력한다
- And 댓글 작성 버튼을 클릭한다
- Then 댓글이 목록에 추가된다

#### Scenario: Delete Comment
- Given 댓글 작성자가 해당 게시글 페이지에 접속한다
- When 자신의 댓글에서 삭제 버튼을 클릭한다
- Then 댓글이 목록에서 제거된다

---

### Requirement: Profile E2E Tests

The system MUST implement E2E tests for profile functionality.

#### Scenario: View Profile
- Given 사용자가 다른 사용자의 프로필 페이지에 접속한다
- Then 사용자 정보가 표시된다
- And 해당 사용자의 게시글 목록이 표시된다

#### Scenario: Follow User
- Given 인증된 사용자가 다른 사용자의 프로필 페이지에 접속한다
- When 팔로우 버튼을 클릭한다
- Then 버튼이 언팔로우로 변경된다

---

### Requirement: i18n E2E Tests

The system MUST implement E2E tests for internationalization.

#### Scenario: Switch Locale
- Given 사용자가 영어 페이지에 접속한다
- When 언어 선택기에서 중국어를 선택한다
- Then 페이지가 중국어로 표시된다
- And URL에 zh 프리픽스가 추가된다
