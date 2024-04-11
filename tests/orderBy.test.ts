import { Browser, Builder, By, until, WebDriver, WebElement } from "selenium-webdriver";
import "chai/register-should";
import { afterEach, describe } from "mocha";
import { getGameCardsTitles } from "../hooks/homePageHooks";
import initialChromeStartup from "../hooks/testStartup";

describe("Filtering games by order", () => {
  let driver: WebDriver;
  let orderDropdown: WebElement;
  let orderButton: WebElement;

  beforeEach(async () => {
    driver = await initialChromeStartup()
    const filterDropdowns = await driver.wait(
      until.elementsLocated(By.css(".chakra-menu__group")),
      5000
    );
    orderDropdown = filterDropdowns[1];
    orderButton = await orderDropdown.findElement(By.css("button"));
  });
  afterEach(async () => {
    await driver.sleep(1000);
    await driver.quit();
  });

  it("Default order", async () => {
    const defaultSelection = await orderDropdown.findElement(By.css(".css-xl71ch")).getText();
    defaultSelection.should.equal("Order by: Relevance");
  });

  it("Menu can be expanded and collapsed", async () => {
    let dropdownStatus = await orderButton.getAttribute("aria-expanded");
    dropdownStatus.should.equal("false");
    await orderButton.click();

    dropdownStatus = await orderButton.getAttribute("aria-expanded");
    dropdownStatus.should.equal("true");
    await orderButton.click();

    dropdownStatus = await orderButton.getAttribute("aria-expanded");
    dropdownStatus.should.equal("false");
  });

  it("Selected order styling updates when selected", async () => {
    const orders = await orderDropdown.findElements(By.css(".chakra-menu__menu-list button"));
    const defaultColor = await orders[orders.length - 1].getCssValue("color");
    const defaultSize = await orders[orders.length - 1].getCssValue("font-size");

    for (const order of orders) {      
      await driver.sleep(500)
      await orderButton.click();      
      await order.click();
      await orderButton.click();
      const selectedColor = await order.getCssValue("color");
      const selectedSize = await order.getCssValue("font-size");
      selectedColor.should.not.equal(defaultColor);
      selectedSize.should.not.equal(defaultSize);      
      await orderButton.click();
    }
  });

  it("Selecting a order refetches the games", async () => {
    const orders = await orderDropdown.findElements(By.css(".chakra-menu__menu-list button"));

    for (let index = 1; index < orders.length; index++) {
      const gameTitles = await getGameCardsTitles(driver);
      await driver.sleep(500);
      await orderButton.click();
      await orders[index].click();
      const newGameTitles = await getGameCardsTitles(driver);
      gameTitles.should.not.have.same.deep.members(newGameTitles);
      
    }
  });
});
