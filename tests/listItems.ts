import { Browser, Builder, By, Key, WebDriver } from "selenium-webdriver";
import "chai/register-should";

const testInputText = ["1st new item", "2nd new item", "3rd new item", "4th new item"];

describe("Main page #2", () => {
  let driver: WebDriver;
  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });
  afterEach(async () => {
    await driver.sleep(1000);
    await driver.quit();
  });

  testInputText.forEach((inputText) => {
    it("Adding a single item", async () => {
      await driver.get("https://lambdatest.github.io/sample-todo-app/");
      await driver.findElement(By.id("sampletodotext")).sendKeys(inputText, Key.RETURN);
      const checkedTest = await driver.findElement(By.css("ul li:last-child")).getText();
      checkedTest.should.equal(inputText);
    });
  });

  it("Adding multiple items", async () => {
    await driver.get("https://lambdatest.github.io/sample-todo-app/");
    testInputText.forEach(async (inputText) => {
      await driver.findElement(By.id("sampletodotext")).sendKeys(inputText, Key.RETURN);
      const checkedTest = await driver.findElement(By.css("ul li:last-child")).getText();
      checkedTest.should.equal(inputText);
    });
  });
});
