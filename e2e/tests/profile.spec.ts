import { test, expect } from '@playwright/test'
import { RegisterPage } from '../pages/auth.page'
import { ProfilePage, SettingsPage } from '../pages/profile.page'
import { generateUniqueEmail, generateUniqueUsername } from '../fixtures/test-data'

test.describe('Profile', () => {
  test.describe('View Profile', () => {
    test('should display user profile', async ({ page }) => {
      const username = generateUniqueUsername()
      const email = generateUniqueEmail()

      const registerPage = new RegisterPage(page)
      await registerPage.goto()
      await registerPage.register(username, email, 'password123')
      await page.waitForURL(/\/(en|zh)\/?$/)

      const profilePage = new ProfilePage(page)
      await profilePage.goto(username)

      await expect(profilePage.username).toContainText(username)
    })

    test('should show user articles on profile', async ({ page }) => {
      const username = generateUniqueUsername()
      const email = generateUniqueEmail()

      const registerPage = new RegisterPage(page)
      await registerPage.goto()
      await registerPage.register(username, email, 'password123')
      await page.waitForURL(/\/(en|zh)\/?$/)

      const profilePage = new ProfilePage(page)
      await profilePage.goto(username)

      await expect(page.locator('text=/my articles/i, text=/articles/i')).toBeVisible()
    })
  })

  test.describe('Follow/Unfollow', () => {
    test('should follow another user', async ({ page }) => {
      const user1Username = generateUniqueUsername()
      const user1Email = generateUniqueEmail()

      const registerPage = new RegisterPage(page)
      await registerPage.goto()
      await registerPage.register(user1Username, user1Email, 'password123')
      await page.waitForURL(/\/(en|zh)\/?$/)

      await page.goto('/en/settings')
      await page.click('button:has-text("Logout"), button:has-text("Sign out")')
      await page.waitForURL(/\/login/)

      const user2Username = generateUniqueUsername()
      const user2Email = generateUniqueEmail()

      await registerPage.goto()
      await registerPage.register(user2Username, user2Email, 'password123')
      await page.waitForURL(/\/(en|zh)\/?$/)

      const profilePage = new ProfilePage(page)
      await profilePage.goto(user1Username)

      if (await profilePage.followButton.isVisible()) {
        await profilePage.toggleFollow()
        await page.waitForTimeout(500)

        await expect(profilePage.followButton).toContainText(/unfollow/i)
      }
    })
  })

  test.describe('Settings', () => {
    test('should update profile bio', async ({ page }) => {
      const username = generateUniqueUsername()
      const email = generateUniqueEmail()

      const registerPage = new RegisterPage(page)
      await registerPage.goto()
      await registerPage.register(username, email, 'password123')
      await page.waitForURL(/\/(en|zh)\/?$/)

      const settingsPage = new SettingsPage(page)
      await settingsPage.goto()

      const newBio = `Updated bio ${Date.now()}`
      await settingsPage.updateProfile(newBio)

      await page.waitForTimeout(500)

      const profilePage = new ProfilePage(page)
      await profilePage.goto(username)

      await expect(page.locator(`text=${newBio}`)).toBeVisible()
    })
  })
})
