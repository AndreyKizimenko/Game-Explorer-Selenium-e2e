import { Browser, Builder, WebDriver, WebElement } from "selenium-webdriver";
import "chai/register-should";
import { describe } from "mocha";
import {  
  getGameCardsTitles,
  getGenresArray,
  getPageHeader,
} from "../hooks/homePageHooks";

describe("Searching games by genre", () => {
  let driver: WebDriver;
  let genres: WebElement[];

  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://game-explorer-lac-sigma.vercel.app/");
    genres = await getGenresArray(driver);
  });
  afterEach(async () => {
    await driver.sleep(1000);
    await driver.quit();
  });

  it("Selected genre style", async () => {
    const defaultColor = await genres[genres.length - 1].getCssValue("color");
    const defaultSize = await genres[genres.length - 1].getCssValue("font-size");

    for (const genre of genres) {
      await genre.click();
      await driver.sleep(500);
      const selectedColor = await genre.getCssValue("color");
      const selectedSize = await genre.getCssValue("font-size");
      selectedColor.should.not.equal(defaultColor);
      selectedSize.should.not.equal(defaultSize);
    }
  });

  it("Page header updates with the selected genre title", async () => {
    for (const genre of genres) {
      await genre.click();
      const selectedGenre = await genre.getText();
      const pageHeader = await getPageHeader(driver);
      if (selectedGenre === "All Genres") pageHeader.should.equal("Games");
      else pageHeader.should.equal(selectedGenre);
      await driver.sleep(500);
    }
  });

  it("Game grid updates when genre is selected", async () => {
    for (const genre of genres) {
      if ((await genre.getText()) === "All Genres") continue;

      const gameTitles = await getGameCardsTitles(driver);
      await genre.click();
      const newGameTitles = await getGameCardsTitles(driver);

      gameTitles.should.not.have.same.deep.members(newGameTitles);

      await driver.sleep(500);
    }
  });
});
