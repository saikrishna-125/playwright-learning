# Playwright Tests in Azure Playwright Workspaces with GitHub Actions

This guide explains how to store Playwright tests in GitHub, trigger them with GitHub Actions, authenticate securely with Microsoft Azure, run browser sessions in an Azure Playwright Workspace, and publish reports to Azure storage.

It assumes no prior knowledge of GitHub, GitHub Actions, Microsoft Entra ID, Azure role assignments, or Playwright Workspaces.

---

## 1. What This Setup Does

After the setup is complete, the flow is:

```text
Developer changes Playwright tests locally
                |
                | git add, git commit, git push
                v
GitHub repository receives the commit
                |
                | GitHub Actions workflow starts
                v
GitHub creates a temporary Linux runner
                |
                | Runner installs Node.js dependencies
                | Runner authenticates to Azure with OIDC
                v
Playwright connects to Azure Playwright Workspaces
                |
                | Azure provides remote browser sessions
                v
Tests run and reports are uploaded
```

The responsibilities are split as follows:

| Component                       | Responsibility                                     |
| ------------------------------- | -------------------------------------------------- |
| Git                             | Tracks file changes and commits locally            |
| GitHub                          | Stores the repository online                       |
| GitHub Actions                  | Starts and coordinates the automated test run      |
| Microsoft Entra ID              | Authenticates the GitHub workflow                  |
| Azure role-based access control | Determines what the workflow may access            |
| Azure Playwright Workspace      | Provides remote cloud browsers                     |
| Azure Storage                   | Stores Playwright report artifacts and diagnostics |

A useful detail:

- The **Playwright test runner** executes on the GitHub Actions runner.
- The **browser sessions** execute remotely through Azure Playwright Workspaces.

---

## 2. Prerequisites

Before starting, make sure you have:

- A working Playwright project
- A GitHub repository
- An Azure subscription
- An Azure Playwright Workspace
- Permission to create Microsoft Entra app registrations
- Permission to assign roles on the Playwright Workspace and its storage account

A typical project might look like this:

```text
playwright-project/
├── tests/
│   ├── login.spec.ts
│   └── checkout.spec.ts
├── package.json
├── package-lock.json
├── playwright.config.ts
└── .gitignore
```

Verify that the tests run locally:

```bash
npm ci
npx playwright install
npx playwright test
```

If the project does not yet have a `package-lock.json`, run:

```bash
npm install
```

Then commit the generated lock file.

---

## 3. Put the Project in GitHub

### 3.1 Initialize Git

Only do this once inside the project folder:

```bash
git init
```

This tells Git to track changes in the folder.

### 3.2 Stage files

```bash
git add .
```

This selects all current changes for the next commit.

To stage only one file:

```bash
git add tests/login.spec.ts
```

### 3.3 Commit files

```bash
git commit -m "Add initial Playwright tests"
```

A commit is a saved checkpoint in the Git history.

### 3.4 Connect the local repository to GitHub

Example:

```bash
git remote add origin https://github.com/YOUR-GITHUB-OWNER/YOUR-REPOSITORY.git
```

Verify the connection:

```bash
git remote -v
```

### 3.5 Push the code

For the first push:

```bash
git branch -M main
git push -u origin main
```

For later changes:

```bash
git status
git add .
git commit -m "Describe the test changes"
git push
```

`git commit` saves changes locally. `git push` sends those commits to GitHub.

---

## 4. Create or Confirm the Azure Playwright Workspace

In the Azure portal:

1. Search for **Playwright Workspaces**.
2. Open the existing workspace or create one.
3. Open the workspace's **Get Started** page.
4. Locate the regional service endpoint.

The endpoint is saved in GitHub using this name:

```text
PLAYWRIGHT_SERVICE_URL
```

This URL tells the Azure Playwright integration which workspace region and endpoint to contact.

It does **not** grant access by itself. Authentication and authorization are configured separately.

---

## 5. Add the Azure Playwright Package and Service Configuration

A Playwright project that runs against Azure Playwright Workspaces normally has an additional service configuration file:

```text
playwright.service.config.ts
```

Microsoft's setup command can generate the required package and configuration:

```bash
npm init @azure/playwright@latest
```

Review the resulting changes:

```bash
git status
```

Typical changed files include:

```text
playwright.service.config.ts
package.json
package-lock.json
```

A simplified service configuration may look like this:

```ts
import { defineConfig } from "@playwright/test";
import { createAzurePlaywrightConfig, ServiceOS } from "@azure/playwright";
import { DefaultAzureCredential } from "@azure/identity";

import baseConfig from "./playwright.config";

export default defineConfig(
  baseConfig,
  createAzurePlaywrightConfig(baseConfig, {
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
    connectTimeout: 5 * 60 * 1000,
  }),
);
```

Keep any additional configuration generated by the Azure setup command.

The important distinction is:

```text
playwright.config.ts
```

contains the general test settings.

```text
playwright.service.config.ts
```

adds the Azure Playwright Workspace connection.

Local command:

```bash
npx playwright test
```

Azure Workspace command:

```bash
npx playwright test --config=playwright.service.config.ts
```

---

## 6. Create a Microsoft Entra App Registration

GitHub Actions needs an Azure identity. Create an app registration for this purpose.

In the Azure portal:

1. Open **Microsoft Entra ID**.
2. Select **App registrations**.
3. Select **New registration**.
4. Enter a name, for example:

```text
github-playwright-tests
```

5. Leave the default account type unless your organization requires something different.
6. Select **Register**.

On the app registration overview page, copy:

```text
Application (client) ID
Directory (tenant) ID
```

Also obtain the Azure subscription ID:

1. Open **Subscriptions** in the Azure portal.
2. Open the subscription containing the Playwright Workspace.
3. Copy the **Subscription ID**.

These values become:

| GitHub secret           | Azure value           |
| ----------------------- | --------------------- |
| `AZURE_CLIENT_ID`       | Application/client ID |
| `AZURE_TENANT_ID`       | Directory/tenant ID   |
| `AZURE_SUBSCRIPTION_ID` | Azure subscription ID |

These values identify the Azure application and tenant. They are not the same thing as an application password.

---

## 7. Understand App Registration and Service Principal

An app registration defines an application identity.

A service principal is the representation of that application inside the Microsoft Entra tenant. Azure role assignments are applied to the service principal.

A simple mental model is:

```text
App registration
    |
    | defines the application identity
    v
Service principal
    |
    | receives access roles
    v
Azure resources
```

The app registration answers:

> Which application is trying to sign in?

The service principal's role assignments answer:

> What is this application allowed to do?

---

## 8. Assign Access to the Playwright Workspace

Creating the application identity does not automatically grant it access.

Open the Azure Playwright Workspace:

```text
Azure portal
→ Playwright Workspace
→ Access control (IAM)
→ Add role assignment
```

Assign the role required by your organization and workspace setup. A common setup uses **Contributor** at the workspace scope.

For **Assign access to**, choose:

```text
User, group, or service principal
```

Search for the app registration/service principal name:

```text
github-playwright-tests
```

Select it and complete the assignment.

This is authorization. It tells Azure that this application identity may use the workspace.

Apply the role at the narrowest reasonable scope, such as the Playwright Workspace itself, rather than the entire Azure subscription.

---

## 9. Configure a Federated Credential for GitHub

The workflow should authenticate without storing a long-lived Azure password or client secret.

This is done with GitHub OpenID Connect, commonly called OIDC.

Open:

```text
Microsoft Entra ID
→ App registrations
→ github-playwright-tests
→ Certificates & secrets
→ Federated credentials
→ Add credential
```

Choose the GitHub Actions scenario.

Provide:

- GitHub owner or organization name
- GitHub owner or organization numeric ID, when requested
- Repository name
- Repository numeric ID, when requested
- Entity type
- Branch or environment details

For a personal repository such as:

```text
https://github.com/saikrishna-125/playwright-tests
```

use:

```text
Owner/organization: saikrishna-125
Repository: playwright-tests
```

The owner field may still be labeled **Organization**, even when the owner is an individual GitHub account.

### Get the numeric GitHub owner ID

Using GitHub CLI:

```bash
gh auth login
gh api users/YOUR-GITHUB-OWNER --jq '.id'
```

Example:

```bash
gh api users/saikrishna-125 --jq '.id'
```

### Get the numeric repository ID

```bash
gh api repos/YOUR-GITHUB-OWNER/YOUR-REPOSITORY --jq '.id'
```

Example:

```bash
gh api repos/saikrishna-125/playwright-tests --jq '.id'
```

Use the numeric `id`, not `node_id`.

### Choose the correct entity type

For workflows running from `main`:

```text
Entity type: Branch
Branch: main
```

For pull-request workflows, a separate federated credential may be required because pull-request OIDC claims differ from branch claims.

The federated credential means:

> A GitHub OIDC token from this exact repository and branch may authenticate as this Microsoft Entra application.

---

## 10. Add GitHub Repository Secrets

Open the GitHub repository:

```text
Settings
→ Secrets and variables
→ Actions
→ New repository secret
```

Create these secrets:

```text
AZURE_CLIENT_ID
AZURE_TENANT_ID
AZURE_SUBSCRIPTION_ID
PLAYWRIGHT_SERVICE_URL
```

Use the values gathered earlier.

GitHub workflows access a secret with this syntax:

```yaml
${{ secrets.SECRET_NAME }}
```

Example:

```yaml
client-id: ${{ secrets.AZURE_CLIENT_ID }}
```

Do not print secrets in workflow logs.

---

## 11. Create the GitHub Actions Workflow

Create this file:

```text
.github/workflows/playwright-azure.yml
```

Example workflow:

```yaml
name: Playwright Tests in Azure

on:
  push:
    branches:
      - main

  pull_request:
    branches:
      - main

  workflow_dispatch:

permissions:
  contents: read
  id-token: write

concurrency:
  group: playwright-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 60

    steps:
      - name: Download repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install project dependencies
        run: npm ci

      - name: Sign in to Azure
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Run Playwright tests in Azure
        env:
          CI: "true"
          PLAYWRIGHT_SERVICE_URL: ${{ secrets.PLAYWRIGHT_SERVICE_URL }}
        run: >
          npx playwright test
          --config=playwright.service.config.ts
          --workers=5

      - name: Upload Playwright HTML report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
```

---

## 12. Explanation of the Workflow

### Workflow triggers

```yaml
on:
  push:
    branches:
      - main
```

Starts the workflow when commits are pushed to `main`.

```yaml
pull_request:
  branches:
    - main
```

Starts the workflow for pull requests targeting `main`.

```yaml
workflow_dispatch:
```

Adds a **Run workflow** button in the GitHub Actions interface.

### OIDC permission

```yaml
permissions:
  contents: read
  id-token: write
```

`contents: read` lets the workflow read the repository.

`id-token: write` lets GitHub create a temporary OIDC token for Azure authentication.

### Concurrency

```yaml
concurrency:
  group: playwright-${{ github.ref }}
  cancel-in-progress: true
```

If a newer run starts for the same branch, GitHub cancels the older run.

This helps avoid multiple workflows consuming Azure browser capacity at the same time.

### GitHub runner

```yaml
runs-on: ubuntu-latest
```

GitHub creates a temporary Linux virtual machine.

It is not your laptop and it is not a permanent Azure VM.

### Checkout

```yaml
uses: actions/checkout@v4
```

Downloads the repository onto the GitHub runner.

### Node.js setup

```yaml
uses: actions/setup-node@v4
```

Installs Node.js and optionally enables npm caching.

### Dependency installation

```yaml
run: npm ci
```

Installs the exact package versions recorded in `package-lock.json`.

### Azure login

```yaml
uses: azure/login@v2
```

The login process is:

1. GitHub creates a short-lived OIDC token.
2. The token contains claims about the repository, branch, and workflow.
3. Microsoft Entra compares those claims with the federated credential.
4. If they match, Azure issues a temporary access token.
5. Azure role assignments determine what the service principal may access.

No permanent Azure client secret is required.

### Azure Playwright service URL

```yaml
env:
  PLAYWRIGHT_SERVICE_URL: ${{ secrets.PLAYWRIGHT_SERVICE_URL }}
```

Tells the Azure Playwright package which workspace endpoint to contact.

### Azure service config

```bash
npx playwright test --config=playwright.service.config.ts
```

Tells Playwright to use the Azure-specific configuration.

### Workers

```bash
--workers=5
```

Sets the maximum number of parallel Playwright worker processes.

Start with a conservative number such as 5. Increase it gradually after confirming that remote browser connections are stable.

---

## 13. Configure Playwright for CI

Example `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: Boolean(process.env.CI),

  retries: process.env.CI ? 2 : 0,

  reporter: [
    ["list", { printSteps: true }],
    ["html", { open: "never" }],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
```

### `forbidOnly`

```ts
forbidOnly: Boolean(process.env.CI);
```

Fails the CI run if `test.only()` was accidentally committed.

### Retries

```ts
retries: process.env.CI ? 2 : 0;
```

Retries failures twice in CI and does not retry locally.

Playwright categorizes tests as:

- **passed**: passed on the first attempt
- **flaky**: failed initially but passed on a retry
- **failed**: failed after all retries

### Reporters

```ts
reporter: [
  ["list", { printSteps: true }],
  ["html", { open: "never" }],
];
```

The `list` reporter produces readable GitHub Actions output such as:

```text
Running 25 tests using 5 workers
✓ login.spec.ts › user can sign in
✓ checkout.spec.ts › user can submit an order
```

The HTML reporter creates `playwright-report/`.

Do not casually override the reporter on the command line if the Azure reporter is configured in the service config, because a command-line reporter can replace configured reporters.

### Diagnostics

```ts
trace: "on-first-retry";
screenshot: "only-on-failure";
video: "retain-on-failure";
```

These settings preserve useful evidence when tests fail.

---

## 14. Add Azure Workspace Reporting

If Azure Playwright Workspace reporting is enabled, preserve the reporter configuration generated by Azure.

A conceptual example is:

```ts
reporter: [
  ["list", { printSteps: true }],
  ["html", { open: "never" }],
  ["@azure/playwright/reporter"],
];
```

The exact reporter configuration can depend on the installed Azure Playwright package version. Prefer the configuration generated by:

```bash
npm init @azure/playwright@latest
```

The reporting identity also needs access to the storage account used by the workspace.

---

## 15. Assign Storage Blob Data Contributor

If a workflow reports this error:

```text
The user is not authorized to perform this operation.
Please make sure you have the Storage Blob Data Contributor role assigned
to the storage account.
```

the Azure login succeeded, but the service principal cannot write report data to Azure Blob Storage.

Open the storage account named in the error:

```text
Azure portal
→ Storage account
→ Access control (IAM)
→ Add role assignment
```

Assign:

```text
Storage Blob Data Contributor
```

to the same service principal used by GitHub Actions:

```text
github-playwright-tests
```

The identity may therefore have two different role assignments:

| Resource               | Role                                   | Purpose                             |
| ---------------------- | -------------------------------------- | ----------------------------------- |
| Playwright Workspace   | Contributor or required workspace role | Use the workspace                   |
| Linked storage account | Storage Blob Data Contributor          | Upload and read reporting artifacts |

Do not confuse these roles:

- `Contributor` can manage many Azure resource settings.
- `Storage Blob Data Contributor` grants access to the actual blob data.

After assigning the role, allow several minutes for Azure permission propagation, then rerun the GitHub Actions workflow.

---

## 16. Push and Test the Workflow

Commit the new files:

```bash
git status
git add .
git commit -m "Configure Azure Playwright GitHub workflow"
git push
```

Then open:

```text
GitHub repository
→ Actions
→ Playwright Tests in Azure
```

Open the latest run and inspect each step.

Expected steps include:

```text
Download repository
Set up Node.js
Install project dependencies
Sign in to Azure
Run Playwright tests in Azure
Upload Playwright HTML report
```

---

## 17. Run the Workflow Without a New Commit

### Re-run an existing run

```text
GitHub repository
→ Actions
→ Select a workflow run
→ Re-run jobs
```

This is useful after changing:

- GitHub secrets
- Azure role assignments
- Federated credentials
- Storage permissions

### Start a manual run

Because the workflow includes:

```yaml
workflow_dispatch:
```

open:

```text
GitHub repository
→ Actions
→ Select the workflow
→ Run workflow
```

You can also use GitHub CLI:

```bash
gh workflow list
gh workflow run playwright-azure.yml
gh run watch
```

---

## 18. Troubleshooting

### Problem: Azure login fails

Check:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`
- `id-token: write`
- Federated credential repository owner
- Federated credential repository name
- Federated credential numeric IDs
- Federated credential branch or pull-request entity type

Verify that the client ID in GitHub points to the same app registration that received the Azure role assignments.

---

### Problem: Workspace access is denied

The service principal may have authenticated successfully but lacks authorization.

Check:

```text
Playwright Workspace
→ Access control (IAM)
→ Role assignments
```

Confirm that the correct service principal has the required workspace role.

---

### Problem: Reporting upload is denied

Error example:

```text
Storage Blob Data Contributor role required
```

Assign `Storage Blob Data Contributor` to the service principal on the storage account named in the error.

---

### Problem: GitHub logs do not show worker count or detailed tests

Playwright uses a concise reporter in CI by default.

Configure the list reporter:

```ts
reporter: [
  ["list", { printSteps: true }],
  ["html", { open: "never" }],
];
```

Expected output:

```text
Running 25 tests using 5 workers
```

---

### Problem: Remote browser connection timeout

Error:

```text
browserType.connect: Timeout 180000ms exceeded
```

This normally means Playwright could not connect to an Azure remote browser within three minutes.

Recommended order:

1. Reduce workers:

```yaml
--workers=5
```

2. Enable CI retries:

```ts
retries: process.env.CI ? 2 : 0;
```

3. Prevent overlapping workflow runs:

```yaml
concurrency:
  group: playwright-${{ github.ref }}
  cancel-in-progress: true
```

4. Increase the service connection timeout:

```ts
connectTimeout: 5 * 60 * 1000;
```

5. Check Azure workspace quotas, capacity, region availability, and simultaneous runs.

A connection timeout can appear under a particular test name even when that test's selectors and assertions are correct. The worker assigned to that test may simply have failed to obtain a remote browser.

---

### Problem: Tests run locally instead of in Azure

Confirm that the workflow uses:

```bash
npx playwright test --config=playwright.service.config.ts
```

and passes:

```yaml
PLAYWRIGHT_SERVICE_URL: ${{ secrets.PLAYWRIGHT_SERVICE_URL }}
```

A plain command such as:

```bash
npx playwright test
```

uses the normal Playwright configuration and may launch browsers on the GitHub runner.

---

### Problem: Pull-request runs cannot authenticate

A federated credential created for:

```text
Branch: main
```

may not match the OIDC subject used by a pull-request workflow.

Create a separate federated credential for pull-request events, or restrict the workflow to branch pushes until that credential is configured.

---

## 19. Security Notes

- Prefer OIDC over storing a client secret.
- Assign Azure roles at the narrowest practical scope.
- Do not store passwords, tokens, or application credentials in source code.
- Store application test credentials as GitHub secrets.
- Do not print secret values in workflow logs.
- Protect production environments with GitHub environments and required approvals where appropriate.
- Ignore Playwright authentication-state files.

Example `.gitignore` entry:

```gitignore
playwright/.auth/
```

Authentication-state files can contain cookies or tokens.

---

## 20. Everyday Development Workflow

After the initial setup, normal work is simple:

```bash
git status
git add .
git commit -m "Add checkout validation test"
git push
```

Then monitor:

```text
GitHub
→ Repository
→ Actions
→ Playwright Tests in Azure
```

For an Azure permission or secret change, rerun the workflow without committing new code.

---

## 21. Final Mental Model

### Authentication

Authentication answers:

> Who is this workflow?

GitHub provides a short-lived OIDC token. Microsoft Entra validates it against the federated credential.

### Authorization

Authorization answers:

> What is this identity allowed to do?

Azure role assignments grant the service principal access to the Playwright Workspace and storage account.

### Service endpoint

The service URL answers:

> Which Azure Playwright Workspace endpoint should Playwright contact?

### Test execution

GitHub Actions coordinates the run. Azure Playwright Workspaces hosts the remote browsers.

### Reporting

The Azure reporter writes diagnostic data to the workspace's Azure Storage account, provided the service principal has `Storage Blob Data Contributor`.

---

## 22. Official Documentation

- [Continuous end-to-end testing with Azure Playwright Workspaces](https://learn.microsoft.com/en-us/azure/app-testing/playwright-workspaces/quickstart-automate-end-to-end-testing)
- [Authenticate to Azure from GitHub Actions using OIDC](https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure-openid-connect)
- [GitHub Actions: Configure OpenID Connect in Azure](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-azure)
- [GitHub Actions: Use repository secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
- [Playwright test configuration](https://playwright.dev/docs/test-configuration)
- [Playwright reporters](https://playwright.dev/docs/test-reporters)
- [Playwright retries](https://playwright.dev/docs/test-retries)
- [Playwright parallel workers](https://playwright.dev/docs/test-parallel)

---

## 23. Setup Checklist

- [ ] Playwright tests run locally
- [ ] Code is stored in GitHub
- [ ] Azure Playwright Workspace exists
- [ ] `playwright.service.config.ts` exists
- [ ] `PLAYWRIGHT_SERVICE_URL` is stored in GitHub
- [ ] Microsoft Entra app registration exists
- [ ] Federated credential trusts the correct repository
- [ ] Service principal has workspace access
- [ ] Service principal has `Storage Blob Data Contributor`
- [ ] GitHub secrets are configured
- [ ] Workflow includes `id-token: write`
- [ ] Workflow uses `azure/login@v2`
- [ ] Workflow uses the Azure Playwright service config
- [ ] CI retries and diagnostics are configured
- [ ] Worker count is stable
- [ ] Manual workflow triggering is enabled
