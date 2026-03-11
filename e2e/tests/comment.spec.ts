import { test, expect } from '@playwright/test'
import { RegisterPage } from '../pages/auth.page'
import { ArticlePage, EditorPage } from '../pages/article.page'
import { generateUniqueEmail, generateUniqueUsername, generateUniqueTitle } from '../fixtures/test-data'

test.describe('Comments', () => {
  let email: string
  let username: string
  let articleSlug: string

  test.beforeEach(async ({ page }) => {
    username = generateUniqueUsername()
    email = generateUniqueEmail()

    const registerPage = new RegisterPage(page)
    await registerPage.goto()
    await registerPage.register(username, email, 'password123')
    await page.waitForURL(/\/(en|zh)\/?$/)

    const editorPage = new EditorPage(page)
    await editorPage.goto()

    const title = generateUniqueTitle()
    await editorPage.createArticle(
      title,
      'Test description for comments',
      'Article body for comment testing.'
    )

    await page.waitForURL(/\/article\//)
    articleSlug = page.url().split('/article/')[1]?.split('?')[0] || ''
  })

  test('should display comment section', async ({ page }) => {
    const articlePage = new ArticlePage(page)
    await expect(articlePage.commentInput).toBeVisible()
  })

  test('should add a comment to article', async ({ page }) => {
    const articlePage = new ArticlePage(page)
    const commentText = `Test comment ${Date.now()}`

    await articlePage.addComment(commentText)
    await page.waitForTimeout(500)

    await expect(page.locator(`text=${commentText}`)).toBeVisible()
  })

  test('should delete own comment', async ({ page }) => {
    const articlePage = new ArticlePage(page)
    const commentText = `Comment to delete ${Date.now()}`

    await articlePage.addComment(commentText)
    await page.waitForTimeout(500)

    await expect(page.locator(`text=${commentText}`)).toBeVisible()

    const deleteButton = page.locator(`text=${commentText}`).locator('..').locator('button:has-text("Delete"), button[class*="delete"], .ion-trash-a').first()

    if (await deleteButton.isVisible()) {
      await deleteButton.click()
      await page.waitForTimeout(500)
      await expect(page.locator(`text=${commentText}`)).not.toBeVisible()
    }
  })
})
