import { Browser, Builder, By, until, WebDriver, WebElement } from "selenium-webdriver";
import "chai/register-should";
import { afterEach, describe } from "mocha";

describe("Filtering games by platform", () => {
  let driver: WebDriver;
  let platformDropdown: WebElement;

  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://game-hub-lac-sigma.vercel.app/");
    const filterDropdowns = await driver.wait(
      until.elementsLocated(By.css(".chakra-menu__group")),
      5000
    );
    platformDropdown = filterDropdowns[0];
  });
  afterEach(async () => {
    await driver.sleep(1000);
    await driver.quit();
  });

  it("Default platform", async () => {
    const defaultSelection = await platformDropdown.findElement(By.css(".css-xl71ch")).getText();
    defaultSelection.should.equal("All Platforms");
  });

  it.only("Menu can be expanded and collapsed", async () => {
    const platformButton = await platformDropdown.findElement(By.css("button"));

    let dropdownStatus = await platformButton.getAttribute("aria-expanded");
    dropdownStatus.should.equal("false");
    await platformButton.click();

    dropdownStatus = await platformButton.getAttribute("aria-expanded");
    dropdownStatus.should.equal("true");
    await platformButton.click();

    dropdownStatus = await platformButton.getAttribute("aria-expanded");
    dropdownStatus.should.equal("false");

  });

  it.only("Selected")
});
