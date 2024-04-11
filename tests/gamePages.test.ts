import { Browser, Builder, By, until, WebDriver } from "selenium-webdriver";
import "chai/register-should";
import { describe } from "mocha";
import { getGameCards } from "../hooks/homePageHooks";
import { GENRES, PLATFORMS } from "../staticData/listElements";
import initialChromeStartup from "../hooks/testStartup";

describe("Individual game pages", async () => {
  let driver: WebDriver;
  // number of games to check on each test case
  const gamesToCheck = 5;

  beforeEach(async () => {
    driver = await initialChromeStartup();
  });
  afterEach(async () => {
    await driver.sleep(1000);
    await driver.quit();
  });

  it("Navigating to a game page", async () => {
    let gameGrid = await getGameCards(driver);

    for (let i = 0; i < gamesToCheck; i++) {
      // selecting a game in the grid, saving its href and navigating to its page
      const href = await gameGrid[i].getAttribute("href");
      await gameGrid[i].click();
      await driver.wait(until.elementLocated(By.css("h2.css-1dklj6k"))).getText();
      // asserting that the url matches the card that was selected
      const currentURL = await driver.getCurrentUrl();
      currentURL.should.be.equal(href);
      // navigating back to the home page
      const logo = await driver.findElement(By.css("nav.css-134xcib a"));
      await logo.click();
      gameGrid = await driver.wait(until.elementsLocated(By.css(".css-1hmna4a a")), 20000);
    }
  });

  it("Game page title matches the page opened", async () => {
    let gameGrid = await getGameCards(driver);

    for (let i = 0; i < gamesToCheck; i++) {
      const gameTitle = await gameGrid[i].findElement(By.css("h2")).getText();
      await gameGrid[i].click();
      const currentGame = await driver
        .wait(until.elementLocated(By.css("h2.css-1dklj6k")))
        .getText();

      currentGame.should.be.equal(gameTitle);
      const logo = await driver.findElement(By.css("nav.css-134xcib a"));
      await logo.click();
      gameGrid = await driver.wait(until.elementsLocated(By.css(".css-1hmna4a a")), 20000);
    }
  });

  it("Game description is present and can be expanded/collapsed", async () => {
    let gameGrid = await getGameCards(driver);

    for (let i = 0; i < gamesToCheck; i++) {
      await gameGrid[i].click();
      const gameDescription = await driver
        .wait(until.elementLocated(By.css(".css-1v8my8o p")))
        .getText();

      // locating and expanding the text description
      await driver.findElement(By.css(".css-1v8my8o button")).click();
      const expandedDescription = await driver
        .wait(until.elementLocated(By.css(".css-1v8my8o p")))
        .getText();
      expandedDescription.length.should.be.greaterThan(gameDescription.length);

      // collapsing the text and comparing again
      await driver.findElement(By.css(".css-1v8my8o button")).click();
      const collapsedDescription = await driver
        .wait(until.elementLocated(By.css(".css-1v8my8o p")))
        .getText();
      collapsedDescription.length.should.be.equal(gameDescription.length);

      const logo = await driver.findElement(By.css("nav.css-134xcib a"));
      await logo.click();
      gameGrid = await driver.wait(until.elementsLocated(By.css(".css-1hmna4a a")), 20000);
    }
  });

  it("Available platforms are displayed", async () => {
    let gameGrid = await getGameCards(driver);

    for (let i = 0; i < gamesToCheck; i++) {
      await gameGrid[i].click();
      const dataList = await driver.wait(until.elementsLocated(By.css("dl > div:nth-child(1) p")));
      // itterating through a list of platforms
      let platforms: string[] = [];
      for (let plat of dataList) {
        platforms.push(await plat.getText());
      }
      // confirming that the displayed platforms match supported platforms
      PLATFORMS.should.include.members(platforms);

      const logo = await driver.findElement(By.css("nav.css-134xcib a"));
      await logo.click();
      gameGrid = await driver.wait(until.elementsLocated(By.css(".css-1hmna4a a")), 20000);
    }
  });

  it("Available genres are displayed", async () => {
    let gameGrid = await getGameCards(driver);

    for (let i = 0; i < gamesToCheck; i++) {
      await gameGrid[i].click();
      const dataList = await driver.wait(until.elementsLocated(By.css("dl > div:nth-child(3) p")));
      // itterating through a list of genres
      let genres: string[] = [];
      for (let genre of dataList) {
        genres.push(await genre.getText());
      }
      // confirming that the displayed genres match supported genres
      GENRES.should.include.members(genres);

      const logo = await driver.findElement(By.css("nav.css-134xcib a"));
      await logo.click();
      gameGrid = await driver.wait(until.elementsLocated(By.css(".css-1hmna4a a")), 20000);
    }
  });

  it("Applicable Metascore is displayed", async () => {
    let gameGrid = await getGameCards(driver);

    for (let i = 0; i < gamesToCheck; i++) {
      await gameGrid[i].click();
      // asserting that the score displayed is between 0 and 101
      const metaScore = await driver
        .wait(until.elementLocated(By.css("dl > div:nth-child(2) span")))
        .getText();
      parseInt(metaScore).should.be.greaterThan(0).and.lessThan(101);

      const logo = await driver.findElement(By.css("nav.css-134xcib a"));
      await logo.click();
      gameGrid = await driver.wait(until.elementsLocated(By.css(".css-1hmna4a a")), 20000);
    }
  });

  it("Publishers are displayed", async () => {
    let gameGrid = await getGameCards(driver);

    for (let i = 0; i < gamesToCheck; i++) {
      await gameGrid[i].click();
      const dataList = await driver.wait(until.elementsLocated(By.css("dl > div:nth-child(4) p")));

      let publishers: string[] = [];
      for (let publisher of dataList) {
        publishers.push(await publisher.getText());
      }
      // asserting that the publishers section is populated correctly
      publishers.should.not.be.empty;

      const logo = await driver.findElement(By.css("nav.css-134xcib a"));
      await logo.click();
      gameGrid = await driver.wait(until.elementsLocated(By.css(".css-1hmna4a a")), 20000);
    }
  });
});
