# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignment3.spec.js >> @APP Banner is NOT visible when 4 events are returned
- Location: tests\Assignment3.spec.js:197:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://eventhub.rahulshettyacademy.com/events", waiting until "load"

```

# Test source

```ts
  113 |       eventDate: "2025-06-05T18:00:00.000Z",
  114 |       venue: "Palace Grounds",
  115 |       city: "Bangalore",
  116 |       price: "1500",
  117 |       totalSeats: 500,
  118 |       availableSeats: 300,
  119 |       imageUrl: null,
  120 |       isStatic: false,
  121 |     },
  122 |     {
  123 |       id: 3,
  124 |       title: "IPL Finals",
  125 |       category: "Sports",
  126 |       eventDate: "2025-06-10T19:30:00.000Z",
  127 |       venue: "Chinnaswamy",
  128 |       city: "Bangalore",
  129 |       price: "2000",
  130 |       totalSeats: 800,
  131 |       availableSeats: 50,
  132 |       imageUrl: null,
  133 |       isStatic: false,
  134 |     },
  135 |     {
  136 |       id: 4,
  137 |       title: "UX Design Workshop",
  138 |       category: "Workshop",
  139 |       eventDate: "2025-06-15T09:00:00.000Z",
  140 |       venue: "WeWork",
  141 |       city: "Mumbai",
  142 |       price: "500",
  143 |       totalSeats: 50,
  144 |       availableSeats: 20,
  145 |       imageUrl: null,
  146 |       isStatic: false,
  147 |     },
  148 |   ],
  149 |   pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
  150 | };
  151 | 
  152 | let webContext;
  153 | 
  154 | test.beforeAll(async ({ browser }) => {
  155 |   const context = await browser.newContext();
  156 |   const page = await context.newPage();
  157 | 
  158 |   await page.goto("https://eventhub.rahulshettyacademy.com/login");
  159 | 
  160 |   await page.getByLabel("Email").fill(loginCredentials.username);
  161 |   await page.getByLabel("Password").fill(loginCredentials.password);
  162 |   await page.getByRole("button", { name: "Sign In" }).click();
  163 |   await expect(page.getByText("Browse Events →")).toBeVisible();
  164 | 
  165 |   await context.storageState({ path: "state2.json" });
  166 | });
  167 | 
  168 | test("@APP Banner IS visible when 6 events are returned", async ({
  169 |   browser,
  170 | }) => {
  171 |   webContext = await browser.newContext({ storageState: "state2.json" });
  172 | 
  173 |   const page = await webContext.newPage();
  174 | 
  175 |   await page.route("**/api/events**", async (route) => {
  176 |     const response = await route.fetch();
  177 |     await route.fulfill({
  178 |       response: response,
  179 |       status: 200,
  180 |       contentType: "application/json",
  181 |       body: JSON.stringify(SIX_EVENTS_RESPONSE),
  182 |     });
  183 |   });
  184 | 
  185 |   await page.goto("https://eventhub.rahulshettyacademy.com/events");
  186 | 
  187 |   const eventCards = page.locator("article[data-testid='event-card']");
  188 | 
  189 |   await expect(eventCards.first()).toBeVisible();
  190 |   await expect(eventCards).toHaveCount(6);
  191 | 
  192 |   const bannerMessage = page.getByText(/sandbox holds up to/i);
  193 |   await expect(bannerMessage).toBeVisible();
  194 |   await expect(bannerMessage).toHaveText(/9 bookings/i);
  195 | });
  196 | 
  197 | test("@APP Banner is NOT visible when 4 events are returned", async ({
  198 |   browser,
  199 | }) => {
  200 |   webContext = await browser.newContext({ storageState: "state2.json" });
  201 |   const page = await webContext.newPage();
  202 | 
  203 |   await page.route("**/api/events**", async (route) => {
  204 |     const response = await route.fetch();
  205 |     await route.fulfill({
  206 |       response: response,
  207 |       status: 200,
  208 |       contentType: "application/json",
  209 |       body: JSON.stringify(FOUR_EVENTS_RESPONSE),
  210 |     });
  211 |   });
  212 | 
> 213 |   await page.goto("https://eventhub.rahulshettyacademy.com/events");
      |              ^ Error: page.goto: Target page, context or browser has been closed
  214 | 
  215 |   const eventCards = page.locator("article[data-testid='event-card']");
  216 | 
  217 |   await expect(eventCards.first()).toBeVisible();
  218 |   await expect(eventCards).toHaveCount(4);
  219 | 
  220 |   const bannerMessage = page.getByText(/sandbox holds up to/i);
  221 | 
  222 |   await expect(bannerMessage).toBeHidden();
  223 | });
  224 | 
```