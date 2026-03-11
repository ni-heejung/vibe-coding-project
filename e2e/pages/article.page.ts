import { Page, Locator } from '@playwright/test'

export class ArticlePage {
  readonly page: Page
  readonly title: Locator
  readonly body: Locator
  readonly author: Locator
  readonly editButton: Locator
  readonly deleteButton: Locator
  readonly favoriteButton: Locator
  readonly commentInput: Locator
  readonly commentSubmit: Locator
  readonly comments: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.locator('h1')
    this.body = page.locator('[class*="article-content"], article p')
    this.author = page.locator('[class*="author"], a[href*="/profile/"]').first()
    this.editButton = page.getByRole('link', { name: /edit/i })
    this.deleteButton = page.getByRole('button', { name: /delete/i })
    this.favoriteButton = page.locator('button:has-text("Favorite"), button:has-text("Unfavorite")')
    this.commentInput = page.locator('textarea[name="comment"], textarea[placeholder*="comment" i]')
    this.commentSubmit = page.locator('button:has-text("Post Comment"), button[type="submit"]').last()
    this.comments = page.locator('[class*="comment"]')
  }

  async goto(slug: string, locale: string = 'en') {
    await this.page.goto(`/${locale}/article/${slug}`)
  }

  async addComment(text: string) {
    await this.commentInput.fill(text)
    await this.commentSubmit.click()
  }

  async toggleFavorite() {
    await this.favoriteButton.click()
  }

  async deleteArticle() {
    await this.deleteButton.click()
  }
}

export class EditorPage {
  readonly page: Page
  readonly titleInput: Locator
  readonly descriptionInput: Locator
  readonly bodyInput: Locator
  readonly tagsInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.titleInput = page.locator('input[name="title"], input[placeholder*="title" i]')
    this.descriptionInput = page.locator('input[name="description"], input[placeholder*="about" i]')
    this.bodyInput = page.locator('textarea[name="body"], textarea[placeholder*="article" i]')
    this.tagsInput = page.locator('input[name="tags"], input[placeholder*="tag" i]')
    this.submitButton = page.locator('button[type="submit"]')
  }

  async goto(locale: string = 'en') {
    await this.page.goto(`/${locale}/editor`)
  }

  async gotoEdit(slug: string, locale: string = 'en') {
    await this.page.goto(`/${locale}/editor/${slug}`)
  }

  async createArticle(title: string, description: string, body: string, tags?: string[]) {
    await this.titleInput.fill(title)
    await this.descriptionInput.fill(description)
    await this.bodyInput.fill(body)
    if (tags && tags.length > 0) {
      await this.tagsInput.fill(tags.join(' '))
    }
    await this.submitButton.click()
  }

  async updateArticle(title?: string, description?: string, body?: string) {
    if (title) await this.titleInput.fill(title)
    if (description) await this.descriptionInput.fill(description)
    if (body) await this.bodyInput.fill(body)
    await this.submitButton.click()
  }
}
