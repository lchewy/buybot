const puppeteer = require("puppeteer");
// const _ = require("lodash");

const FEED_CONTAINER =
  "#root > div > div > div.main-layout > div > div:nth-child(3) > div.pt4-md.pt6-lg";

 module.exports.getShoeList = async () => {
  try {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto("https://www.nike.com/launch/");

    await page.waitForSelector(FEED_CONTAINER);

    const info = await page.evaluate(async () => {
      let data = [];
      let elements = await document.getElementsByClassName("card-link");

      for (let element of elements) {
        let link = await element.href;
        // let name = await element.firstChild.title;
        // data.push({ [name]: link });
        link = link.replace("/cn", "")
        data.push(link)
      }
      return data;
    });
    await browser.close();
    return info;
  } catch (err) {
    console.log(err);
  }
};
