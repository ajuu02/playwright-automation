# Playwright Automation Framework Starter

## Setup

1. Install dependencies:
   - `npm ci`
2. Create `.env` with:
   - `ENV=dev`
   - `BASE_URL=https://your-app-url`
   - `E2E_USER=your-user`
   - `E2E_PASS=your-pass`
3. Install browsers:
   - `npx playwright install`

## Run

- All tests: `npm test`
- Smoke tests: `npm run test:smoke`
- E2E tests: `npm run test:e2e`
- API tests: `npm run test:api`

## Architecture

- `tests` -> specs only
- `flows` -> workflow orchestration
- `pages/components` -> UI abstraction
- `fixtures` -> setup/teardown
- `utils` -> reusable helpers
- `test-data` -> static JSON
