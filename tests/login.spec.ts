import { test, expect } from '@playwright/test';

test.describe('로그인 테스트', () => {
    test("올바른 아이디와 비밀번호 입력", async ({ page }) => {
        await page.goto('/');

        await page.fill('input[name="email"]', "mmm@gmail.com");

        await page.fill('input[name="password"]', "11111111");

        await page.click('button[type="submit"]');

        await expect(page).toHaveURL('/inputArea', { timeout: 10000 });
    })

    test("잘못된 아이디와 비밀번호 입력", async ({ page }) => {
        await page.goto('/');

        await page.fill('input[name="email"]', "wrong@example.com");

        await page.fill('input[name="password"]', "222222222");

        await page.click('button[type="submit"]');

        page.on("dialog", async (dialog) => {
            expect(dialog.message()).toBe("아이디와 비밀번호를 다시 확인해주세요.");
            await dialog.dismiss();
        })

        await expect(page).toHaveURL('/', { timeout: 10000 });
    })
})