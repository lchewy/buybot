const puppeteer = require("puppeteer");
const _ = require("lodash");

const FEED_CONTAINER =
  "#root > div > div > div.main-layout > div > div:nth-child(3) > div.pt4-md.pt6-lg";

const getPageData = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.nike.com/launch");

    await page.waitForSelector(FEED_CONTAINER);

    const info = await page.evaluate(async () => {
      let data = [];
      let elements = await document.getElementsByClassName("card-link");
      for (let element of elements) {
        let link = await element.href;
        let name = await element.firstChild.title;
        data.push({ [name]: link });
      }
      return data;
    });

    return info;
  } catch (err) {
    console.log(err);
  }
};

// if (typeof document !== "undefined") {
//   getPageData().then(res => {
    // return _.forEach(res, el => {
    //   const x = document.getElementById("shoe_select");
    //   let option = document.createElement("option");
    //   option.text = Object.keys(el)[0];
    //   x.add(option);
//     });
//   });
// }