import { Browser, Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import "chai/register-should";
import { describe } from "mocha";
import {
  getGameCards,
  getGenresArray,
  getOrderArray,
  getPageHeader,
  getPlatformsArray,
} from "../locators/homePageLocators";
import { GENRES, ORDERING, PLATFORMS } from "../staticData/listElements";
import { getRGBcode } from "../utility/rgbParser";

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
    const header = await getPageHeader(driver);
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
  it("Game grid is populated", async () => {
    const gameGrid = await getGameCards(driver);

    gameGrid.forEach(async (card) => {
      const href = await card.getAttribute("href");

      href.should.not.equal("");
    });
  });
  it("Genres list is present", async () => {
    let genresArray: string[] = [];
    const genres = await getGenresArray(driver);

    for (let genre of genres) {
      const genreText = await genre.getText();
      genresArray.push(genreText);
    }

    genresArray.should.have.same.deep.members(GENRES);
  });
  it("Platform dropdown", async () => {
    let platforms: string[] = [];
    const platformList = await getPlatformsArray(driver);

    for (let platform of platformList) {
      if ((await platform.getText()) != "") platforms.push(await platform.getText());
    }
    platforms.should.have.same.deep.members(PLATFORMS);
  });
  it("Ordering dropdown", async () => {
    let orders: string[] = [];
    const orderByList = await getOrderArray(driver);

    for (let order of orderByList) {
      orders.push(await order.getText());
    }

    orders.should.have.same.deep.members(ORDERING);
  });
  it("Search bar", async () => {});
});
