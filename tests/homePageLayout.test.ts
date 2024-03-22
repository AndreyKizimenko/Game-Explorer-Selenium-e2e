import { Browser, Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import "chai/register-should";
import { describe } from "mocha";
import { findPageHeader, getRGBcode } from "../locators/homePageLocators";

describe("Overall page layout test suite", () => {
  let driver: WebDriver;
  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://game-hub-lac-sigma.vercel.app/");
  });
  afterEach(async () => {
    await driver.sleep(1000);
    await driver.quit();
  });

  it("Page title is correct", async () => {
    const title = await driver.getTitle();
    title.should.equal("Game-Hub Part-Two");
  });
  it("Page header is correct", async () => {
    const header = await findPageHeader(driver);
    header.should.equal("Games");
  });
  it("Page logo is present and interactable", async () => {
    const logo = await driver.findElement(By.css("nav.css-134xcib a"));
    await driver.wait(until.elementIsVisible(logo), 10000);
    await logo.click();

    const currentURL = await driver.getCurrentUrl();
    currentURL.should.equal("https://game-hub-lac-sigma.vercel.app/");
  });
  it("Dark / Light mode switch", async () => {
    const modeSwitch = await driver.findElement(By.css("nav.css-134xcib button"));
    const initialColor = await getRGBcode(driver);
    await driver.wait(until.elementIsVisible(modeSwitch), 10000);
    await modeSwitch.click();
    const newColor = await getRGBcode(driver);

    if (initialColor === "26, 32, 44") newColor.should.equal("255, 255, 255");
    else newColor.should.equal("26, 32, 44");
  });
  it("Game grid is populted", async () => {
    const gameGrid = await driver.wait(until.elementLocated(By.css(".css-1hmna4a")), 20000);
    const gameCards = await gameGrid.findElements(By.css("a"));

    for (let card of gameCards) {
      const href = await card.getAttribute("href");
      href.should.not.equal("");
    }
  });
  it.only("Genres list is present", async () => {
    const genresList = await driver.wait(until.elementLocated(By.css(".css-19hjr83")), 5000);
    const genres = await genresList.findElements(By.css("li"));

    for (let genre of genres) {
      const genreText = await genre.getText();
      genreText.should.not.equal("");
    }
  });
  it("Platform dropdown", async () => {});
  it("Ordering dropdown", async () => {});
  it("Search bar", async () => {});
});
