import { Browser, Builder, By, Key, WebDriver } from "selenium-webdriver";
import "chai/register-should";
import { describe } from "mocha";

describe("Overall page layout test suite", () => {
  let driver: WebDriver;
  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
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
    const header = await driver.findElement(By.css("h2.chakra-heading")).getText();
    header.should.equal("Games");
  });
  /*   it("Page logo is present and interactable", async () => {});
  it("Dark / Light mode switch", async () => {});
  it("Game grid is populted", async () => {});
  it("Genres list is present", async () => {});
  it("Platform dropdown", async () => {});
  it("Ordering dropdown", async () => {});
  it("Search bar", async () => {}); */
});
