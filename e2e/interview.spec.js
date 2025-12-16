import { test, expect } from '@playwright/test';

test.describe('Coding Interview Platform', () => {
    test('should load the application and display header', async ({ page }) => {
        await page.goto('/');

        // Check that the logo is visible
        await expect(page.locator('.logo')).toHaveText('CodeInterview');

        // Check that problem panel is visible
        await expect(page.locator('.problem-title')).toBeVisible();
    });

    test('should generate a session ID in the URL', async ({ page }) => {
        await page.goto('/');

        // URL should contain a UUID-like session ID
        const url = page.url();
        expect(url).toMatch(/\/[a-f0-9-]{36}$/);
    });

    test('should display the code editor', async ({ page }) => {
        await page.goto('/');

        // Wait for Monaco editor to load
        await page.waitForSelector('.monaco-editor', { timeout: 10000 });

        // Check that editor is visible
        await expect(page.locator('.editor-wrapper')).toBeVisible();
    });

    test('should allow language selection', async ({ page }) => {
        await page.goto('/');

        // Check language select exists
        const languageSelect = page.locator('.language-select');
        await expect(languageSelect).toBeVisible();

        // Change to Python
        await languageSelect.selectOption('python');

        // Verify selection changed
        await expect(languageSelect).toHaveValue('python');
    });

    test('should copy invite link', async ({ page, context }) => {
        await page.goto('/');

        // Grant clipboard permissions
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);

        // Click copy button
        await page.click('button:has-text("Copy Invite Link")');

        // Check that button text changed to indicate success
        await expect(page.locator('button:has-text("Copied")')).toBeVisible();
    });

    test('should execute JavaScript code', async ({ page }) => {
        await page.goto('/');

        // Wait for Monaco to load
        await page.waitForSelector('.monaco-editor', { timeout: 10000 });

        // Type some JavaScript code using Monaco's input
        await page.click('.monaco-editor');

        // Clear default content and type new code
        await page.keyboard.press('Control+a');
        await page.keyboard.type('console.log("Hello, World!")');

        // Click run button
        await page.click('button:has-text("Run Code")');

        // Wait for output
        await page.waitForTimeout(1000);

        // Check output
        await expect(page.locator('.output-content')).toContainText('Hello, World!');
    });

    test('should display problem description', async ({ page }) => {
        await page.goto('/');

        // Check problem title
        await expect(page.locator('.problem-title')).toHaveText('Two Sum');

        // Check problem description contains expected text
        await expect(page.locator('.problem-description')).toContainText('Given an array of integers');
    });
});
