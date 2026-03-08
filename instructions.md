# instruction.md — Playwright Test Automation Framework

This file defines:
- Architecture rules
- Folder responsibilities
- Coding conventions
- Execution model
- How Codex should operate in this repository

Goal: A scalable, stable, CI-ready automation framework.

---

# 1) Architecture Overview

This framework follows:

- Playwright Test (TypeScript)
- Page Object Model (POM)
- Component Object pattern
- Fixtures for setup/teardown
- Externalized test data
- Environment-driven configuration
- CI-first design

Dependency direction (MUST NOT BE VIOLATED):

tests → flows (if present) → pages/components → fixtures/core/utils

---

# 2) Folder Purpose (Source of Truth)

Below is the official responsibility of each folder.
Do not repurpose folders.

---

## Root Files

### playwright.config.ts
- Global Playwright configuration.
- Defines:
  - testDir
  - reporter
  - retries
  - projects (browser matrix)
  - base use settings (trace, video, screenshot policy)
- No business logic here.

### package.json
- Dependency management.
- Only approved scripts allowed.
- Do not add random scripts without documentation.

---

## /configs/

Environment-specific overrides.

Purpose:
- Override baseURL
- Override credentials
- Feature flags
- Environment tuning (timeouts if required)

Rules:
- Must not contain test logic.
- Must not duplicate entire base config unnecessarily.

---

## /tests/

Business-level specifications.

Purpose:
- Describe user journeys and expected outcomes.
- No selectors.
- No low-level Playwright calls.
- No data hardcoding.

Subfolders:

### /tests/smoke
- Fast, stable, high-value tests.
- Run on every PR.

### /tests/e2e
- Full user journeys.
- May include complex flows.

### /tests/api
- API-level tests using Playwright’s APIRequestContext.

Rules:
- Tests must be independent.
- Tests must not rely on execution order.
- No waitForTimeout() allowed.

---

## /pages/

UI abstraction layer.

Purpose:
- Encapsulate locators.
- Encapsulate screen-level actions.
- Provide domain-readable methods.

Example:
login(username, password)
addProductToCart(productName)

Rules:
- No assertions about business logic.
- No test orchestration.
- Keep pages small and focused.

---

## /pages/components/

Reusable UI fragments.

Purpose:
- Encapsulate shared UI widgets.
  - Header
  - Modal
  - Toast
  - DatePicker
  - Table

Rules:
- Components must not navigate.
- Components must not depend on specific page context.

---

## /flows/ (Optional but recommended)

Business workflow orchestration.

Purpose:
- Combine multiple page actions.
- Represent business flows.
- Keep tests ultra-clean.

Example:
placeOrder()
upgradeSubscription()
cancelPlan()

Rules:
- Flows may call multiple pages.
- Tests should prefer flows over manual page chaining.

---

## /fixtures/

Test setup and teardown layer.

Purpose:
- Authentication setup (storageState).
- Data seeding.
- Cleanup logic.
- Extend base test.

Rules:
- Must be deterministic.
- No UI logic unless auth testing.
- Shared fixtures must be isolated per test unless explicitly global.

---

## /utils/

Reusable helpers.

Purpose:
- API clients
- Assertion extensions
- Date generators
- Environment resolution
- Logging helpers

Rules:
- Not a dumping ground.
- Must be pure and reusable.
- Must not depend on tests.

---

## /test-data/

Static data.

Purpose:
- JSON files for users, products, configs.
- Avoid hardcoding in specs.

Rules:
- No secrets.
- No environment-specific data unless clearly separated.

---

## /reporters/

Custom reporters if needed.

Purpose:
- Extend Playwright reporting.
- Integrate with external systems.

Must:
- Not affect test stability.
- Be optional.

---

## /scripts/

Automation scripts.

Purpose:
- CI orchestration.
- Shard execution.
- Report merging.
- Local environment helpers.

Must:
- Be cross-platform if possible.
- Be documented.

---

## /artifacts/

Generated output.

Purpose:
- test-results
- traces
- videos
- screenshots

Must:
- Be gitignored.
- Never manually edited.

---

# 3) Locator Policy (Anti-Flake Strategy)

Preferred locator order:

1. getByRole()
2. getByLabel()
3. getByTestId()
4. locator('css=...') as last resort

Forbidden:
- XPath unless absolutely required.
- Deep CSS chains.
- Hardcoded nth-child selectors.

No waitForTimeout() without ticket reference.

---

# 4) Test Data Strategy

Preferred:
- API seed via fixtures.
- Authenticate via storageState.
- Validate UI.

Avoid:
- UI-driven setup in every test.

---

# 5) Environment Rules

Required env variables:
- ENV
- BASE_URL
- E2E_USER
- E2E_PASS

Environment validation must happen in utils/env.ts.
Fail fast if missing.

---

# 6) Reporting Policy

Default:
- HTML reporter enabled.
- Traces/videos on failure or retry only.

Do not enable heavy recording globally without reason.

---

# 7) CI Strategy

- Smoke runs on PR.
- Full regression nightly.
- Parallel execution enabled.
- No test order dependency.
- Deterministic state setup.

---

# 8) Definition of Done

A change is complete when:

- Tests pass locally.
- Tests are stable.
- No architectural rule violated.
- Folder responsibility respected.
- Documentation updated if behavior changed.

---

# 9) Where Should New Code Go?

New screen? → /pages  
Reusable widget? → /pages/components  
New workflow? → /flows  
Shared setup? → /fixtures  
Reusable helper? → /utils  
Static test data? → /test-data  
New test suite? → /tests  

---

End of instruction.md