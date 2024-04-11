import { Browser, Builder, By, until, WebDriver, WebElement } from "selenium-webdriver";
import "chai/register-should";
import { afterEach, describe } from "mocha";
import { getGameCardsTitles } from "../hooks/homePageHooks";
import initialChromeStartup from "../hooks/testStartup";

describe("Filtering games by platform", () => {
  let driver: WebDriver;
  let platformDropdown: WebElement;
  let platformButton: WebElement;

  beforeEach(async () => {
    driver = await initialChromeStartup()
    const filterDropdowns = await driver.wait(
      until.elementsLocated(By.css(".chakra-menu__group")),
      5000
    );
    platformDropdown = filterDropdowns[0];
    platformButton = await platformDropdown.findElement(By.css("button"));
  });
  afterEach(async () => {
    await driver.sleep(1000);
    await driver.quit();
  });

  it("Default platform is set to All Platforms", async () => {
    const defaultSelection = await platformDropdown.findElement(By.css(".css-xl71ch")).getText();
    defaultSelection.should.equal("All Platforms");
  });

  it("Menu can be expanded and collapsed", async () => {
    let dropdownStatus = await platformButton.getAttribute("aria-expanded");
    dropdownStatus.should.equal("false");
    await platformButton.click();

    dropdownStatus = await platformButton.getAttribute("aria-expanded");
    dropdownStatus.should.equal("true");
    await platformButton.click();

    dropdownStatus = await platformButton.getAttribute("aria-expanded");
    dropdownStatus.should.equal("false");
  });

  it("Selected platform styling updates when selected", async () => {
    const platforms = await platformDropdown.findElements(By.css(".chakra-menu__menu-list button"));

    const defaultColor = await platforms[platforms.length - 1].getCssValue("color");
    const defaultSize = await platforms[platforms.length - 1].getCssValue("font-size");

    for (const platform of platforms) {
      await platformButton.click();
      await driver.sleep(200);
      await platform.click();
      await driver.sleep(200);
      await platformButton.click();

      const selectedColor = await platform.getCssValue("color");
      const selectedSize = await platform.getCssValue("font-size");
      selectedColor.should.not.equal(defaultColor);
      selectedSize.should.not.equal(defaultSize);
      await platformButton.click();
      await driver.sleep(200);
    }
  });

  it("Selecting a platform refetches the games", async () => {
    const platforms = await platformDropdown.findElements(By.css(".chakra-menu__menu-list button"));

    for (let index = 2; index < platforms.length; index++) {
      const gameTitles = await getGameCardsTitles(driver);
      await driver.sleep(500);
      await platformButton.click();
      await platforms[index].click();
      const newGameTitles = await getGameCardsTitles(driver);
      gameTitles.should.not.have.same.deep.members(newGameTitles);
      await driver.sleep(500);
    }
  });
});
