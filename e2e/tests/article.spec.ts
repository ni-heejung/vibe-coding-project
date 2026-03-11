import { test, expect } from '@playwright/test'
import { RegisterPage } from '../pages/auth.page'
import { HomePage } from '../pages/home.page'
import { ArticlePage, EditorPage } from '../pages/article.page'
import { generateUniqueEmail, generateUniqueUsername, generateUniqueTitle } from '../fixtures/test-data'

test.describe('Articles', () => {
  test.describe('Article List', () => {
    test('should display article list on home page', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await expect(page.locator('h1, h2').first()).toBeVisible()
    })
  })

  test.describe('Article CRUD', () => {
    let email: string
    let username: string

    test.beforeEach(async ({ page }) => {
      username = generateUniqueUsername()
      email = generateUniqueEmail()

      const registerPage = new RegisterPage(page)
      await registerPage.goto()
      await registerPage.register(username, email, 'password123')
      await page.waitForURL(/\/(en|zh)\/?$/)
    })

    test('should create a new article', async ({ page }) => {
      const editorPage = new EditorPage(page)
      await editorPage.goto()

      const title = generateUniqueTitle()
      await editorPage.createArticle(
        title,
        'Test description',
        'This is the article body content.'
      )

      await expect(page).toHaveURL(/\/article\//)
      await expect(page.locator('h1')).toContainText(title)
    })

    test('should view article details', async ({ page }) => {
      const editorPage = new EditorPage(page)
      await editorPage.goto()

      const title = generateUniqueTitle()
      await editorPage.createArticle(
        title,
        'Test description',
        'Article body for viewing test.'
      )

      await page.waitForURL(/\/article\//)

      const articlePage = new ArticlePage(page)
      await expect(articlePage.title).toContainText(title)
      await expect(articlePage.body).toContainText('Article body for viewing test')
    })

    test('should edit an existing article', async ({ page }) => {
      const editorPage = new EditorPage(page)
      await editorPage.goto()

      const title = generateUniqueTitle()
      await editorPage.createArticle(
        title,
        'Original description',
        'Original body content.'
      )

      await page.waitForURL(/\/article\//)

      await page.click('a:has-text("Edit"), button:has-text("Edit")')
      await page.waitForURL(/\/editor\//)

      const updatedTitle = generateUniqueTitle()
      await editorPage.updateArticle(updatedTitle, 'Updated description', 'Updated body content.')

      await expect(page).toHaveURL(/\/article\//)
      await expect(page.locator('h1')).toContainText(updatedTitle)
    })

    test('should delete an article', async ({ page }) => {
      const editorPage = new EditorPage(page)
      await editorPage.goto()

      const title = generateUniqueTitle()
      await editorPage.createArticle(
        title,
        'Description for delete test',
        'Body content for delete test.'
      )

      await page.waitForURL(/\/article\//)

      const articlePage = new ArticlePage(page)
      await articlePage.deleteArticle()

      await expect(page).toHaveURL(/\/(en|zh)\/?$/)
    })

    test('should toggle favorite on article', async ({ page }) => {
      const editorPage = new EditorPage(page)
      await editorPage.goto()

      const title = generateUniqueTitle()
      await editorPage.createArticle(
        title,
        'Description for favorite test',
        'Body content for favorite test.'
      )

      await page.waitForURL(/\/article\//)

      const articlePage = new ArticlePage(page)
      const initialText = await articlePage.favoriteButton.textContent()

      await articlePage.toggleFavorite()
      await page.waitForTimeout(500)

      const updatedText = await articlePage.favoriteButton.textContent()
      expect(updatedText).not.toBe(initialText)
    })
  })
})
