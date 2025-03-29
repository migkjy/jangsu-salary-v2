import { test, expect } from '@playwright/test'

test('기본 페이지 로드 테스트', async ({ page }) => {
  await page.goto('/')
  
  // 페이지가 정상적으로 로드되었는지 확인
  await expect(page).toHaveTitle(/Jangsu/)
})
