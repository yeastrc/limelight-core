# Limelight Project Context

Limelight is a web-based system for analyzing and sharing proteomics results.

## Project Structure

- `limelight_webapp/` - Main web application (Spring Boot + React)
  - `front_end/` - React/TypeScript frontend
  - `src/main/java/` - Java backend (Spring MVC controllers)
- `database_scripts/` - MySQL database setup scripts
- `docker/` - Docker configuration files
- `docker-compose.yml` - Full stack local development setup

## Running the Application

### Using Docker Compose (Recommended)

```bash
# Start all services (MySQL, Tomcat, etc.)
docker-compose up -d

# Application available at http://localhost:8080/limelight
```

Requires a `.env` file in the project root with:
```
MYSQL_ROOT_PASSWORD=<password>
MYSQL_USER=<user>
MYSQL_PASSWORD=<password>
```

### Building from Source

Requires: Java 8+ (11 recommended), Node v20, npm v10.3+, Ant

```bash
ant -f ant__build_all_limelight.xml
```

## Frontend Development

The frontend is in `limelight_webapp/front_end/`:

```bash
cd limelight_webapp/front_end
npm install
```

### E2E Testing with Playwright

```bash
# Install Playwright browsers (first time)
npx playwright install

# Run tests (requires server running at localhost:8080)
npm test

# Run with UI
npm run test:ui
```

Test files are in `limelight_webapp/front_end/tests/`.

## URL Routing

The webapp is deployed at `/limelight` context path. Key routes:

- `/limelight/user/login` - Login page
- `/limelight/d/pg/project-list` - Projects list (requires auth)
- `/limelight/d/pg/project/<id>` - Project view

Route constants are defined in:
- `AA_PageControllerPaths_Constants.java` - Page routes
- `AA_UserAccount_PageControllerPaths_Constants.java` - User account routes

## Commit Message Style

Follow the existing pattern:
```
Web: Short description of change
```

Examples from history:
- `Web: Chromatogram:MS1 Window Size: Add '15' and make default`
- `Web: PSM Download: Add new download that searches for APEX scan peak`
