import { test, expect } from '@playwright/test'
import { LoginPage, RegisterPage } from '../pages/auth.page'
import { generateUniqueEmail, generateUniqueUsername } from '../fixtures/test-data'

test.describe('Authentication', () => {
  test.describe('Registration', () => {
    test('should register a new user successfully', async ({ page }) => {
      const registerPage = new RegisterPage(page)
      await registerPage.goto()

      const username = generateUniqueUsername()
      const email = generateUniqueEmail()

      await registerPage.register(username, email, 'password123')

      await expect(page).toHaveURL(/\/(en|zh)\/?$/)
      await expect(page.locator('nav')).toContainText(username)
    })

    test('should show error for duplicate email', async ({ page }) => {
      const registerPage = new RegisterPage(page)
      await registerPage.goto()

      await registerPage.register('duplicateuser', 'duplicate@example.com', 'password123')
      await page.waitForTimeout(1000)

      await registerPage.goto()
      await registerPage.register('duplicateuser2', 'duplicate@example.com', 'password123')

      await expect(registerPage.errorMessage).toBeVisible()
    })
  })

  test.describe('Login', () => {
    test('should login with valid credentials', async ({ page }) => {
      const username = generateUniqueUsername()
      const email = generateUniqueEmail()

      const registerPage = new RegisterPage(page)
      await registerPage.goto()
      await registerPage.register(username, email, 'password123')
      await page.waitForURL(/\/(en|zh)\/?$/)

      await page.goto('/en/settings')
      await page.click('button:has-text("Logout"), button:has-text("Sign out")')
      await page.waitForURL(/\/login/)

      const loginPage = new LoginPage(page)
      await loginPage.login(email, 'password123')

      await expect(page).toHaveURL(/\/(en|zh)\/?$/)
      await expect(page.locator('nav')).toContainText(username)
    })

    test('should show error for invalid credentials', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()

      await loginPage.login('nonexistent@example.com', 'wrongpassword')

      await expect(loginPage.errorMessage).toBeVisible()
    })
  })

  test.describe('Logout', () => {
    test('should logout successfully', async ({ page }) => {
      const username = generateUniqueUsername()
      const email = generateUniqueEmail()

      const registerPage = new RegisterPage(page)
      await registerPage.goto()
      await registerPage.register(username, email, 'password123')
      await page.waitForURL(/\/(en|zh)\/?$/)

      await page.goto('/en/settings')
      await page.click('button:has-text("Logout"), button:has-text("Sign out")')

      await expect(page).toHaveURL(/\/login/)
    })
  })
})
