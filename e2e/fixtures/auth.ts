import { test as base, Page } from '@playwright/test'

export const TEST_USER = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'password123',
}

export const TEST_USER_2 = {
  username: 'testuser2',
  email: 'testuser2@example.com',
  password: 'password123',
}

export async function login(page: Page, email: string, password: string) {
  await page.goto('/en/login')
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/(en|zh)\/?$/)
}

export async function logout(page: Page) {
  await page.goto('/en/settings')
  await page.click('button:has-text("Logout")')
  await page.waitForURL(/\/(en|zh)\/login/)
}

export async function register(page: Page, username: string, email: string, password: string) {
  await page.goto('/en/register')
  await page.fill('input[name="username"]', username)
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/(en|zh)\/?$/)
}

type AuthFixtures = {
  authenticatedPage: Page
}

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await login(page, TEST_USER.email, TEST_USER.password)
    await use(page)
  },
})

export { expect } from '@playwright/test'
