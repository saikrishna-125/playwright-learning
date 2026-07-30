# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignment3.spec.js >> @APP Banner is NOT visible when 4 events are returned
- Location: tests\Assignment3.spec.js:197:5

# Error details

```
Error: route.fetch: socket hang up
Call log:
  - → GET https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.7827.55 Safari/537.36
    - accept: application/json, text/plain, */*
    - accept-encoding: gzip,deflate,br
    - accept-language: en-US
    - authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzMjk5LCJlbWFpbCI6InRlc3RtYWlsc2sxMjU5QHlvcG1haWwuY29tIiwiaWF0IjoxNzg0ODYzNTA3LCJleHAiOjE3ODU0NjgzMDd9.cDEM34HcuPNN8yYWXvQG3xFqocefCXeZeYrrokqoAVs
    - origin: https://eventhub.rahulshettyacademy.com
    - referer: https://eventhub.rahulshettyacademy.com/
    - sec-ch-ua: "HeadlessChrome";v="149", "Chromium";v="149", "Not)A;Brand";v="24"
    - sec-ch-ua-mobile: ?0
    - sec-ch-ua-platform: "Windows"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e4]:
      - link "EventHub" [ref=e5] [cursor=pointer]:
        - /url: /
        - img [ref=e7]
        - generic [ref=e9]: EventHub
      - generic [ref=e10]:
        - link "Home" [ref=e11] [cursor=pointer]:
          - /url: /
        - link "Events" [ref=e12] [cursor=pointer]:
          - /url: /events
        - link "My Bookings" [ref=e13] [cursor=pointer]:
          - /url: /bookings
        - link "API Docs" [ref=e14] [cursor=pointer]:
          - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
        - button "Admin" [ref=e16] [cursor=pointer]:
          - text: Admin
          - img [ref=e17]
        - generic [ref=e19]:
          - generic "testmailsk1259@yopmail.com" [ref=e20]
          - button "Logout" [ref=e21] [cursor=pointer]
  - main [ref=e22]:
    - generic [ref=e23]:
      - generic [ref=e26]:
        - heading "Discover & Book Amazing Events" [level=1] [ref=e27]:
          - text: Discover & Book
          - text: Amazing Events
        - paragraph [ref=e28]: From tech conferences to live concerts, sports events to cultural festivals — find experiences that inspire you.
        - generic [ref=e29]:
          - link "Browse Events →" [ref=e30] [cursor=pointer]:
            - /url: /events
            - generic [ref=e31]: Browse Events →
          - link "My Bookings" [ref=e32] [cursor=pointer]:
            - /url: /bookings
            - button "My Bookings" [ref=e33]
      - generic [ref=e34]:
        - generic [ref=e35]:
          - generic [ref=e36]:
            - heading "Featured Events" [level=2] [ref=e37]
            - paragraph [ref=e38]: Hand-picked upcoming events just for you
          - link "View all →" [ref=e39] [cursor=pointer]:
            - /url: /events
        - generic [ref=e40]:
          - article [ref=e41]:
            - generic [ref=e42]:
              - img "Dilli Diwali Mela" [ref=e43]
              - generic [ref=e45]: Festival
              - generic [ref=e46]: Featured
            - generic [ref=e47]:
              - link "Dilli Diwali Mela" [ref=e48] [cursor=pointer]:
                - /url: /events/3
                - heading "Dilli Diwali Mela" [level=3] [ref=e49]
              - generic [ref=e50]:
                - generic [ref=e51]:
                  - img [ref=e52]
                  - generic [ref=e54]: Tue, 20 Oct
                - generic [ref=e55]:
                  - img [ref=e56]
                  - generic [ref=e58]: Pragati Maidan Exhibition Grounds, Delhi
              - generic [ref=e59]:
                - generic [ref=e60]:
                  - paragraph [ref=e61]: $300
                  - generic [ref=e62]: 7 seats left!
                - link "Book Now" [ref=e63] [cursor=pointer]:
                  - /url: /events/3
          - article [ref=e64]:
            - generic [ref=e65]:
              - img "Hollywood Monsoon Night — Los Angeles" [ref=e66]
              - generic [ref=e68]: Concert
              - generic [ref=e69]: Featured
            - generic [ref=e70]:
              - link "Hollywood Monsoon Night — Los Angeles" [ref=e71] [cursor=pointer]:
                - /url: /events/2
                - heading "Hollywood Monsoon Night — Los Angeles" [level=3] [ref=e72]
              - generic [ref=e73]:
                - generic [ref=e74]:
                  - img [ref=e75]
                  - generic [ref=e77]: Sat, 11 Jul
                - generic [ref=e78]:
                  - img [ref=e79]
                  - generic [ref=e81]: Dome, NSCI SVP Stadium, Worli, Los Angeles
              - generic [ref=e82]:
                - generic [ref=e83]:
                  - paragraph [ref=e84]: $2,500
                  - generic [ref=e85]: 8 seats left!
                - link "Book Now" [ref=e86] [cursor=pointer]:
                  - /url: /events/2
          - article [ref=e87]:
            - generic [ref=e88]:
              - img "World Tech Summit" [ref=e89]
              - generic [ref=e91]: Conference
              - generic [ref=e92]: Featured
            - generic [ref=e93]:
              - link "World Tech Summit" [ref=e94] [cursor=pointer]:
                - /url: /events/1
                - heading "World Tech Summit" [level=3] [ref=e95]
              - generic [ref=e96]:
                - generic [ref=e97]:
                  - img [ref=e98]
                  - generic [ref=e100]: Sat, 18 Apr
                - generic [ref=e101]:
                  - img [ref=e102]
                  - generic [ref=e104]: Hyderabad, Hitech city, Hyderabad
              - generic [ref=e105]:
                - generic [ref=e106]:
                  - paragraph [ref=e107]: $1,500
                  - generic [ref=e108]: 8 seats left!
                - link "Book Now" [ref=e109] [cursor=pointer]:
                  - /url: /events/1
          - article [ref=e110]:
            - generic [ref=e111]:
              - img [ref=e113]
              - generic [ref=e116]: Conference
            - generic [ref=e117]:
              - link "Event Title 1784862159137" [ref=e118] [cursor=pointer]:
                - /url: /events/80729
                - heading "Event Title 1784862159137" [level=3] [ref=e119]
              - generic [ref=e120]:
                - generic [ref=e121]:
                  - img [ref=e122]
                  - generic [ref=e124]: Sat, 12 Dec
                - generic [ref=e125]:
                  - img [ref=e126]
                  - generic [ref=e128]: 1234 St, bangalore, India, Bangalore
              - generic [ref=e129]:
                - generic [ref=e130]:
                  - paragraph [ref=e131]: $100
                  - generic [ref=e132]: 50 seats available
                - link "Book Now" [ref=e133] [cursor=pointer]:
                  - /url: /events/80729
          - article [ref=e134]:
            - generic [ref=e135]:
              - img [ref=e137]
              - generic [ref=e140]: Conference
            - generic [ref=e141]:
              - link "Event Title 1784852552105" [ref=e142] [cursor=pointer]:
                - /url: /events/80704
                - heading "Event Title 1784852552105" [level=3] [ref=e143]
              - generic [ref=e144]:
                - generic [ref=e145]:
                  - img [ref=e146]
                  - generic [ref=e148]: Sat, 12 Dec
                - generic [ref=e149]:
                  - img [ref=e150]
                  - generic [ref=e152]: 1234 St, bangalore, India, Bangalore
              - generic [ref=e153]:
                - generic [ref=e154]:
                  - paragraph [ref=e155]: $100
                  - generic [ref=e156]: 50 seats available
                - link "Book Now" [ref=e157] [cursor=pointer]:
                  - /url: /events/80704
          - article [ref=e158]:
            - generic [ref=e159]:
              - img [ref=e161]
              - generic [ref=e164]: Conference
            - generic [ref=e165]:
              - link "Event Title 1784689627336" [ref=e166] [cursor=pointer]:
                - /url: /events/78714
                - heading "Event Title 1784689627336" [level=3] [ref=e167]
              - generic [ref=e168]:
                - generic [ref=e169]:
                  - img [ref=e170]
                  - generic [ref=e172]: Sat, 12 Dec
                - generic [ref=e173]:
                  - img [ref=e174]
                  - generic [ref=e176]: 1234 St, bangalore, India, Bangalore
              - generic [ref=e177]:
                - generic [ref=e178]:
                  - paragraph [ref=e179]: $100
                  - generic [ref=e180]: 50 seats available
                - link "Book Now" [ref=e181] [cursor=pointer]:
                  - /url: /events/78714
      - generic [ref=e183]:
        - heading "Ready to experience something new?" [level=2] [ref=e184]
        - paragraph [ref=e185]: Browse thousands of events across India. Book tickets in seconds.
        - link "Explore All Events" [ref=e186] [cursor=pointer]:
          - /url: /events
          - button "Explore All Events" [ref=e187]
  - contentinfo [ref=e188]:
    - generic [ref=e189]:
      - generic [ref=e190]:
        - generic [ref=e191]:
          - heading "Rahul Shetty Academy" [level=3] [ref=e192]
          - paragraph [ref=e193]: India's leading QA automation training academy — empowering engineers to build real-world testing skills.
        - generic [ref=e194]:
          - heading "Popular Courses" [level=3] [ref=e195]
          - list [ref=e196]:
            - listitem [ref=e197]:
              - link "Selenium WebDriver with Java" [ref=e198] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e199]:
              - link "Playwright with JavaScript" [ref=e200] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e201]:
              - link "RestAssured API Testing" [ref=e202] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e203]:
              - link "Cypress End-to-End Testing" [ref=e204] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e205]:
              - link "Appium Mobile Testing" [ref=e206] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
        - generic [ref=e207]:
          - heading "QA Job Hiring Platform" [level=3] [ref=e208]
          - paragraph [ref=e209]: Get hired faster — take skill assessments trusted by top QA employers worldwide.
          - link "techsmarthire.com →" [ref=e210] [cursor=pointer]:
            - /url: https://techsmarthire.com
        - generic [ref=e211]:
          - heading "EventHub Practice App" [level=3] [ref=e212]
          - list [ref=e213]:
            - listitem [ref=e214]:
              - link "Browse Events" [ref=e215] [cursor=pointer]:
                - /url: /events
            - listitem [ref=e216]:
              - link "My Bookings" [ref=e217] [cursor=pointer]:
                - /url: /bookings
            - listitem [ref=e218]:
              - link "Manage Events" [ref=e219] [cursor=pointer]:
                - /url: /admin/events
            - listitem [ref=e220]:
              - link "API Documentation" [ref=e221] [cursor=pointer]:
                - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
      - generic [ref=e222]:
        - paragraph [ref=e223]: © 2026 Rahul Shetty Academy. All rights reserved.
        - generic [ref=e224]:
          - link "rahulshettyacademy.com →" [ref=e225] [cursor=pointer]:
            - /url: https://rahulshettyacademy.com
          - link "techsmarthire.com →" [ref=e226] [cursor=pointer]:
            - /url: https://techsmarthire.com
  - alert [ref=e227]
```

# Test source

```ts
  104 |       totalSeats: 200,
  105 |       availableSeats: 150,
  106 |       imageUrl: null,
  107 |       isStatic: false,
  108 |     },
  109 |     {
  110 |       id: 2,
  111 |       title: "Rock Night Live",
  112 |       category: "Concert",
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
> 204 |     const response = await route.fetch();
      |                                  ^ Error: route.fetch: socket hang up
  205 |     await route.fulfill({
  206 |       response: response,
  207 |       status: 200,
  208 |       contentType: "application/json",
  209 |       body: JSON.stringify(FOUR_EVENTS_RESPONSE),
  210 |     });
  211 |   });
  212 | 
  213 |   await page.goto("https://eventhub.rahulshettyacademy.com/events");
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