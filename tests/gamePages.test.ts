import { Browser, Builder, By, until, WebDriver } from "selenium-webdriver";
import "chai/register-should";
import { describe } from "mocha";
import { getGameCards } from "../hooks/homePageHooks";
import { GENRES, PLATFORMS } from "../staticData/listElements";

describe("Individual game pages", async () => {
  let driver: WebDriver;
  const gamesToCheck = 1;

  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://game-hub-lac-sigma.vercel.app/");
  });
  afterEach(async () => {
    await driver.sleep(1000);
    await driver.quit();
  });

  it("Navigating to a game page", async () => {
    let gameGrid = await getGameCards(driver);

    for (let i = 0; i < gamesToCheck; i++) {
      const href = await gameGrid[i].getAttribute("href");
      await gameGrid[i].click();
      await driver.wait(until.elementLocated(By.css("h2.css-1dklj6k"))).getText();
      const currentURL = await driver.getCurrentUrl();
      currentURL.should.be.equal(href);
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

      await driver.findElement(By.css(".css-1v8my8o button")).click();
      const expandedDescription = await driver
        .wait(until.elementLocated(By.css(".css-1v8my8o p")))
        .getText();
      expandedDescription.length.should.be.greaterThan(gameDescription.length);

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

      let platforms: string[] = [];
      for (let plat of dataList) {
        platforms.push(await plat.getText());
      }

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

      let genres: string[] = [];
      for (let genre of dataList) {
        genres.push(await genre.getText());
      }

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
      const metaScore = await driver
        .wait(until.elementLocated(By.css("dl > div:nth-child(2) span")))
        .getText();
      parseInt(metaScore).should.be.greaterThan(0).and.lessThan(101);

      const logo = await driver.findElement(By.css("nav.css-134xcib a"));
      await logo.click();
      gameGrid = await driver.wait(until.elementsLocated(By.css(".css-1hmna4a a")), 20000);
    }
  });

  it.only("Publishers are displayed", async () => {
    let gameGrid = await getGameCards(driver);

    for (let i = 0; i < gamesToCheck; i++) {
      await gameGrid[i].click();
      const dataList = await driver.wait(until.elementsLocated(By.css("dl > div:nth-child(4) p")));

      let publishers: string[] = [];
      for (let publisher of dataList) {
        publishers.push(await publisher.getText());
      }

      publishers.should.not.be.empty

      const logo = await driver.findElement(By.css("nav.css-134xcib a"));
      await logo.click();
      gameGrid = await driver.wait(until.elementsLocated(By.css(".css-1hmna4a a")), 20000);
    }
  });
});
