import { Browser, Builder, By, until, WebDriver } from "selenium-webdriver";
import "chai/register-should";
import { describe } from "mocha";
import {
  getGameCards,
  getGenresArray,
  getOrderArray,
  getPageHeader,
  getPlatformsArray,
  getSearchBar,
} from "../hooks/homePageHooks";
import { GENRES, ORDERING, PLATFORMS } from "../staticData/listElements";
import { getRGBcode } from "../utility/rgbParser";
import initialChromeStartup from "../hooks/testStartup";

describe("Overall page layout test suite", () => {
  let driver: WebDriver;

  beforeEach(async () => {
    driver = await initialChromeStartup()
  });
  afterEach(async () => {
    await driver.sleep(1000);
    await driver.quit();
  });

  it("Page title is correct", async () => {
    const title = await driver.getTitle();
    title.should.equal("Game Explorer");
  });
  it("Page header is correct", async () => {
    const header = await getPageHeader(driver);
    header.should.equal("Games");
  });
  it("Page logo is present and interactable", async () => {
    const logo = await driver.findElement(By.css("nav.css-134xcib a"));
    await driver.wait(until.elementIsVisible(logo), 10000);
    await logo.click();

    // verifying that the user remains on the homepage
    const currentURL = await driver.getCurrentUrl();
    currentURL.should.equal("https://game-explorer-lac-sigma.vercel.app/");
  });
  it("Dark / Light mode switch", async () => {
    const modeSwitch = await driver.findElement(By.css("nav.css-134xcib button"));
    // capturing the current body theme to later compare it against the dark mode
    const initialColor = await getRGBcode(driver);
    await driver.wait(until.elementIsVisible(modeSwitch), 10000);
    await modeSwitch.click();
    // capturing and comparing an updated color scheme
    const newColor = await getRGBcode(driver);
    if (initialColor === "26, 32, 44") newColor.should.equal("255, 255, 255");
    else newColor.should.equal("26, 32, 44");
  });
  it("Game grid is populated", async () => {
    // each game grid card should have an associated href on it
    const gameGrid = await getGameCards(driver);
    gameGrid.forEach(async (card) => {
      const href = await card.getAttribute("href");

      href.should.not.equal("");
    });
  });
  it("Genres list is present and includes all expected game genres", async () => {
    let genresArray: string[] = [];
    const genres = await getGenresArray(driver);

    for (let genre of genres) {
      const genreText = await genre.getText();
      genresArray.push(genreText);
    }

    genresArray.should.have.same.deep.members(GENRES);
  });
  it("Platform dropdown is interactable and contains all the expected platforms", async () => {
    let platforms: string[] = [];
    const platformList = await getPlatformsArray(driver);

    for (let platform of platformList) {
      if ((await platform.getText()) != "") platforms.push(await platform.getText());
    }
    platforms.should.have.same.deep.members(PLATFORMS);
  });
  it("Ordering dropdown is interactable and contains all the expected ordering options", async () => {
    let orders: string[] = [];
    const orderByList = await getOrderArray(driver);

    for (let order of orderByList) {
      orders.push(await order.getText());
    }

    orders.should.have.same.deep.members(ORDERING);
  });
  it("Search bar accepts user input and its value correctly updates", async () => {
    const searchBar = await getSearchBar(driver);
    await searchBar.sendKeys("Test string");
    const inputValue = await searchBar.getAttribute("value");
    inputValue.should.equal("Test string");
  });
  it("Infinite scrolling fetching", async () => {
    // function to wait until the game grid updates from scrolling
    async function scrollAndCheckGrid() {
      const timeout = 20000;   
      const initialGrid = await getGameCards(driver);
      await driver.executeScript("window.scrollBy(0, 2000);");
      await driver.wait(async function () {
        const afterScrollGrid = await getGameCards(driver);
        return initialGrid.length < afterScrollGrid.length;
      }, timeout);

      return true;
    }
    // Scrolling 4 times to make sure that the grid updates after each scroll
    for (let i = 0; i < 4; i++) {
      let countResult = await scrollAndCheckGrid();
      countResult.should.be.true;
      await driver.sleep(1000)
    }
  });
});
