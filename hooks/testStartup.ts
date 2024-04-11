import { Builder, Browser } from "selenium-webdriver";

const initialChromeStartup = async () => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.manage().window().maximize();
  await driver.get("https://game-explorer-lac-sigma.vercel.app/");

  return driver;
};

export default initialChromeStartup;
