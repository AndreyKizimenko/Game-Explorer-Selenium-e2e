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
  await driver.findElement(By.css(".css-1y0dvn9")).click();
  return await driver.wait(until.elementsLocated(By.css(".css-1kfu8nn button")), 5000);
};

export const getOrderArray = async (driver: WebDriver) => {
  const dropdown = await driver.findElement(By.css(".chakra-menu__group"));
  await dropdown.click();

  return await dropdown.findElements(By.css(".css-1kfu8nn button"));
};

export const getSearchBar = async (driver: WebDriver) => {
  return await driver.findElement(By.css(".css-18z7r7u"));
};
