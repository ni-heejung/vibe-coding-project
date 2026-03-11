export const TEST_ARTICLE = {
  title: 'Test Article Title',
  description: 'Test article description',
  body: 'This is the body of the test article. It contains some content for testing purposes.',
  tags: ['test', 'e2e'],
}

export const TEST_COMMENT = {
  body: 'This is a test comment for E2E testing.',
}

export function generateUniqueEmail(): string {
  return `test-${Date.now()}@example.com`
}

export function generateUniqueUsername(): string {
  return `user-${Date.now()}`
}

export function generateUniqueTitle(): string {
  return `Test Article ${Date.now()}`
}
