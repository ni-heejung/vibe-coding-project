import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('input[name="email"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.submitButton = page.locator('button[type="submit"]')
    this.errorMessage = page.locator('[class*="error"], .error, [role="alert"]')
  }

  async goto(locale: string = 'en') {
    await this.page.goto(`/${locale}/login`)
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}

export class RegisterPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('input[name="username"]')
    this.emailInput = page.locator('input[name="email"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.submitButton = page.locator('button[type="submit"]')
    this.errorMessage = page.locator('[class*="error"], .error, [role="alert"]')
  }

  async goto(locale: string = 'en') {
    await this.page.goto(`/${locale}/register`)
  }

  async register(username: string, email: string, password: string) {
    await this.usernameInput.fill(username)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
