# Playwright Timeouts — Recap Notes

## ASSERTION Timeout (expect)

Example used: expect(page.getByText('Success!')).toBeVisible();

Level - How to Set - Code

**Global**
(applies to all tests)playwright.config.ts

export default defineConfig({
expect: { timeout: 10000 }
});

**Test**
(applies to all assertions in one test only)expect.configure() inside the test

const slowExpect = expect.configure({ timeout: 10000 });
await slowExpect(locator).toBeVisible();

**Step**
(applies to just this one line)Pass timeout directly

await expect(page.getByText('Success!'))
.toBeVisible({ timeout: 10000 });

Default = 5s. Unrelated to test timeout — it's a separate clock.

## ACTION Timeout (click, fill, waitFor, etc.)

Example used: await page.getByText('Get Started').click();

Level - How to Set - Code

**Global**
(applies to all actions across suite)playwright.config.ts

export default defineConfig({
use: { actionTimeout: 10000 }
});

**Test**
(applies to all actions in one test) page.setDefaultTimeout()

page.setDefaultTimeout(10000);
await page.getByText('Get Started').click();

**Step**
(applies to just this one line) Pass timeout directly

await page.getByText('Get Started')
.click({ timeout: 10000 });

Default = 0 (no built-in limit — inherits whatever's left of the test's 30s).

## TEST Timeout (entire test function)

Example used: A test with multiple steps: goto → click → fill → click → assert.

Level - How to Set - Code

**Global**
(applies to every test in suite) playwright.config.ts

export default defineConfig({
timeout: 60000
});

**Test**
(applies to just one test) test.setTimeout() inside the test

test('checkout flow', async ({ page }) => {
test.setTimeout(60000);
// ...
});

**Step** ❌ Not applicable — test timeout has no per-line override; it's the ceiling for the whole test

📌 Default = 30s. This is one single cumulative clock — it does NOT reset between steps.
📌 Bonus shortcut: test.slow() triples the default (30s → 90s) without typing a number.

### Golden Rule to Remember

An explicit timeout (step or config) only shortens or lengthens that specific operation's own wait. It can never push execution beyond the overall Test Timeout. If the Test Timeout hits first, everything stops — regardless of what any action/assertion timeout was set to.
