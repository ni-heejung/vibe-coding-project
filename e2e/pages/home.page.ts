import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly articleList: Locator
  readonly globalFeedTab: Locator
  readonly yourFeedTab: Locator
  readonly tagList: Locator
  readonly navUsername: Locator

  constructor(page: Page) {
    this.page = page
    this.articleList = page.locator('article, [class*="article"]')
    this.globalFeedTab = page.getByRole('link', { name: /global feed/i })
    this.yourFeedTab = page.getByRole('link', { name: /your feed/i })
    this.tagList = page.locator('[class*="tag"]')
    this.navUsername = page.locator('nav >> a[href*="/profile/"]')
  }

  async goto(locale: string = 'en') {
    await this.page.goto(`/${locale}`)
  }

  async clickGlobalFeed() {
    await this.globalFeedTab.click()
  }

  async clickYourFeed() {
    await this.yourFeedTab.click()
  }

  async clickTag(tagName: string) {
    await this.page.click(`text=${tagName}`)
  }

  async getArticleCount(): Promise<number> {
    return await this.articleList.count()
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.navUsername.isVisible()
  }
}
