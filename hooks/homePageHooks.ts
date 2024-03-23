import { By, until, WebDriver } from "selenium-webdriver";

export const getPageHeader = async (driver: WebDriver) => {
  return await driver.findElement(By.css("h2.chakra-heading")).getText();
};

export const getGameCards = async (driver: WebDriver) => {
  return await driver.wait(until.elementsLocated(By.css(".css-1hmna4a a")), 20000);
};
export const getGameCardsTitles = async (driver: WebDriver) => {
  let gameCardsText: string[] = [];
  const originalGameCards = await driver.wait(
    until.elementsLocated(By.css(".css-1hmna4a a h2")),
    20000
  );
  for (const game of originalGameCards) {
    gameCardsText.push(await game.getText());
  }
  return gameCardsText;
};

export const getGenresArray = async (driver: WebDriver) => {
  return await driver.wait(until.elementsLocated(By.css(".css-19hjr83 button")), 5000);
};

export const getPlatformsArray = async (driver: WebDriver) => {
  const filterDropdowns = await driver.wait(
    until.elementsLocated(By.css(".chakra-menu__group")),
    5000
  );
  await filterDropdowns[0].findElement(By.css("button")).click();
  return await filterDropdowns[0].findElements(By.css(".css-r6z5ec button"));
};

export const getOrderArray = async (driver: WebDriver) => {
  const filterDropdowns = await driver.wait(
    until.elementsLocated(By.css(".chakra-menu__group")),
    5000
  );
  await filterDropdowns[1].findElement(By.css("button")).click();
  return await filterDropdowns[1].findElements(By.css(".css-r6z5ec button"));
};

export const getSearchBar = async (driver: WebDriver) => {
  return await driver.findElement(By.css(".css-18z7r7u"));
};
