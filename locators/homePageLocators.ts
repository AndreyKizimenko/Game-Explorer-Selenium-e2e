import { By, WebDriver } from "selenium-webdriver";

export const findPageHeader = async (driver: WebDriver) => {
  return await driver.findElement(By.css("h2.chakra-heading")).getText();
};

export const getRGBcode = async (driver: WebDriver) => {
  const backgroundColor = await driver.findElement(By.css("body")).getCssValue("background");
  const rgbStartIndex = backgroundColor.indexOf("(") + 1;
  const rgbEndIndex = backgroundColor.indexOf(")");
  return backgroundColor.slice(rgbStartIndex, rgbEndIndex);  
};
