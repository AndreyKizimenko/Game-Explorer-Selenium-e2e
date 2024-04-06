## Game-Explorer Selenium TypeScript Test Suite

This repository contains a Selenium TypeScript test suite designed to automate testing of the core functionalities of the [Game-Explorer web application](https://game-explorer-lac-sigma.vercel.app/).

## Getting Started
**Prerequisites:**

**Node.js and npm:** Ensure you have Node.js and npm (or yarn) installed on your system. You can find download instructions at https://nodejs.org/en.

**Web Driver:** Download and install a compatible web driver for your chosen browser (e.g., ChromeDriver for Chrome).

**TypeScript:** Make sure you have TypeScript installed globally:

```bash
npm install -g typescript
```
Selenium WebDriver Library: Install the @types/selenium-webdriver and selenium-webdriver packages using npm:
```bash
npm install @types/selenium-webdriver selenium-webdriver
```

## Running the Tests

Start the test runner:
```bash
npm test
```

## Test Coverage

This test suite aims to cover core functionalities of Game-Explorer, including:

**Navigation:** Testing navigation between different sections of the website (e.g., home page, game details page).
**Search:** Verifying search functionality for finding games by title or genre.
**Game Details:** Checking the display of game information like title, description, images, and platform.
**Error Handling:** Validating error handling scenarios (e.g., invalid search terms, broken links).