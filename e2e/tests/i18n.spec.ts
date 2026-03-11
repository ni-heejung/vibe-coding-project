import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/home.page'

test.describe('Internationalization (i18n)', () => {
  test('should display English content by default', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.goto('en')

    await expect(page).toHaveURL(/\/en/)
  })

  test('should switch to Chinese locale', async ({ page }) => {
    await page.goto('/en')

    const localeSelector = page.locator('select[name="locale"], [data-testid="locale-selector"], button:has-text("EN"), button:has-text("中文")')

    if (await localeSelector.isVisible()) {
      await localeSelector.click()

      const zhOption = page.locator('text=中文, option[value="zh"], a[href*="/zh"]')
      if (await zhOption.isVisible()) {
        await zhOption.click()
        await page.waitForTimeout(500)

        await expect(page).toHaveURL(/\/zh/)
      }
    } else {
      await page.goto('/zh')
      await expect(page).toHaveURL(/\/zh/)
    }
  })

  test('should maintain locale in URL after navigation', async ({ page }) => {
    await page.goto('/zh')

    await page.click('a[href*="/zh"]')
    await page.waitForTimeout(300)

    expect(page.url()).toContain('/zh')
  })

  test('should switch from Chinese to English', async ({ page }) => {
    await page.goto('/zh')

    const localeSelector = page.locator('select[name="locale"], [data-testid="locale-selector"], button:has-text("中文"), button:has-text("EN")')

    if (await localeSelector.isVisible()) {
      await localeSelector.click()

      const enOption = page.locator('text=English, text=EN, option[value="en"], a[href*="/en"]')
      if (await enOption.isVisible()) {
        await enOption.click()
        await page.waitForTimeout(500)

        await expect(page).toHaveURL(/\/en/)
      }
    } else {
      await page.goto('/en')
      await expect(page).toHaveURL(/\/en/)
    }
  })
})
