import { Browser, Builder, WebDriver, WebElement } from "selenium-webdriver";
import "chai/register-should";
import { afterEach, describe } from "mocha";
import { getGameCardsTitles, getSearchBar } from "../hooks/homePageHooks";
import initialChromeStartup from "../hooks/testStartup";

describe("Filtering games by platform", () => {
  const searchInputs = ["Crown", "Gun", "Car", "Portal", "World", "Simulator"];
  let driver: WebDriver;
  let searchBar: WebElement;
  beforeEach(async () => {
    driver = await initialChromeStartup();
    searchBar = await getSearchBar(driver);
  });
  afterEach(async () => {
    await driver.sleep(1000);
    await driver.quit();
  });

  it("Default search field value should be null", async () => {
    const inputValue = await searchBar.getAttribute("value");
    inputValue.should.equal("");
  });

  it("Using search refetches the games", async () => {
    // itterating through an array of various text inputs, waiting for the list to update and comparing it against the original list
    for (const input of searchInputs) {
      const gameTitles = await getGameCardsTitles(driver);
      await searchBar.sendKeys(input);
      await driver.sleep(1000);
      const newGameTitles = await getGameCardsTitles(driver);
      gameTitles.should.not.have.same.deep.members(newGameTitles);
      await searchBar.clear();
    }
  });
  it("Search results match search input", async () => {
    // running multiple searches and asserting that each result contains the search keyword
    for (const input of searchInputs) {
      await searchBar.sendKeys(input);
      await driver.sleep(1000);

      const newGameTitles = await getGameCardsTitles(driver);
      const containsInputValue = newGameTitles.every((str) =>
        str.toLowerCase().includes(input.toLowerCase())
      );
      containsInputValue.should.be.true;
      await searchBar.clear();
    }
  });
});
