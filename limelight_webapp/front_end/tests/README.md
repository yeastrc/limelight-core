# Playwright E2E Tests

End-to-end tests for the Limelight web frontend using [Playwright](https://playwright.dev/).

## Prerequisites

1. **Node.js** v20+ and npm v10.3+
2. **Playwright browsers** installed (see Setup)
3. **Limelight server** running at `http://localhost:8080/limelight`

## Setup

Install dependencies and Playwright browsers:

```bash
cd limelight_webapp/front_end
npm install
npx playwright install
```

## Running Tests

Start the Limelight server first (e.g., via Docker Compose from the project root):

```bash
docker-compose up -d
```

Then run tests:

```bash
# Run all tests (Chromium, Firefox, WebKit)
npm test

# Run with interactive UI
npm run test:ui

# Run in debug mode
npm run test:debug

# View HTML report after test run
npm run test:report
```

### Running Specific Tests

```bash
# Run only Chromium tests
npx playwright test --project=chromium

# Run a specific test file
npx playwright test tests/login.spec.ts

# Run tests matching a pattern
npx playwright test -g "login"
```

## Test Files

| File | Description |
|------|-------------|
| `login.spec.ts` | Login page smoke test - verifies page loads with expected elements |
| `projects-list.spec.ts` | Projects list page - verifies unauthenticated redirect to login |

## Configuration

Test configuration is in `playwright.config.ts`:

- **Base URL**: `http://127.0.0.1:8080/limelight/`
- **Browsers**: Chromium, Firefox, WebKit
- **Timeouts**: 30s test timeout, 10s expect timeout
- **Reports**: HTML reporter (view with `npm run test:report`)

## Writing New Tests

Create new test files in the `tests/` directory with the `.spec.ts` extension:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('path/relative/to/limelight');
    await expect(page).toHaveTitle(/Expected Title/);
  });
});
```

Note: Use relative paths without leading slash (e.g., `user/login` not `/user/login`).
