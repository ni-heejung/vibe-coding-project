import { Page, Locator } from '@playwright/test'

export class ProfilePage {
  readonly page: Page
  readonly username: Locator
  readonly bio: Locator
  readonly followButton: Locator
  readonly settingsButton: Locator
  readonly myArticlesTab: Locator
  readonly favoritedArticlesTab: Locator
  readonly articleList: Locator

  constructor(page: Page) {
    this.page = page
    this.username = page.locator('h4, [class*="username"]')
    this.bio = page.locator('[class*="bio"], p').first()
    this.followButton = page.locator('button:has-text("Follow"), button:has-text("Unfollow")')
    this.settingsButton = page.getByRole('link', { name: /edit profile settings/i })
    this.myArticlesTab = page.getByRole('link', { name: /my articles/i })
    this.favoritedArticlesTab = page.getByRole('link', { name: /favorited articles/i })
    this.articleList = page.locator('article, [class*="article-preview"]')
  }

  async goto(username: string, locale: string = 'en') {
    await this.page.goto(`/${locale}/profile/${username}`)
  }

  async toggleFollow() {
    await this.followButton.click()
  }

  async clickMyArticles() {
    await this.myArticlesTab.click()
  }

  async clickFavoritedArticles() {
    await this.favoritedArticlesTab.click()
  }

  async isFollowing(): Promise<boolean> {
    const buttonText = await this.followButton.textContent()
    return buttonText?.includes('Unfollow') ?? false
  }
}

export class SettingsPage {
  readonly page: Page
  readonly imageInput: Locator
  readonly usernameInput: Locator
  readonly bioInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.imageInput = page.locator('input[name="image"], input[placeholder*="image" i]')
    this.usernameInput = page.locator('input[name="username"]')
    this.bioInput = page.locator('textarea[name="bio"]')
    this.emailInput = page.locator('input[name="email"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.submitButton = page.locator('button[type="submit"]')
    this.logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sign out")')
  }

  async goto(locale: string = 'en') {
    await this.page.goto(`/${locale}/settings`)
  }

  async updateProfile(bio?: string, username?: string) {
    if (bio) await this.bioInput.fill(bio)
    if (username) await this.usernameInput.fill(username)
    await this.submitButton.click()
  }

  async logout() {
    await this.logoutButton.click()
  }
}
