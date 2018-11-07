const puppeteer = require("puppeteer");
const schedule = require("node-schedule");
// const moment = require("moment");

const NOTIFY_ME =
  "#root > div > div > div.main-layout > div > div:nth-child(3) > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div.ncss-col-sm-12.mt9-sm > div > button";
const SIZE_BTN =
  "#root > div > div > div.main-layout > div > div:nth-child(3) > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div:nth-child(2) > div > div.buying-tools-container > div.size-dropdown-component.d-sm-b.mb5-sm.mb3-lg > div > button > div";
const ADD_TO_CART =
  "#root > div > div > div.main-layout > div > div:nth-child(3) > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div:nth-child(2) > div > div.buying-tools-container > div.mt2-sm.mb6-sm.prl0-lg.fs14-sm > button";
const CHECKOUT =
  "#root > div > div > div.js-modal.modal.show > div > div > div > div > div.ncss-row.cart-button-row > a.ncss-btn-black.ncss-brand.fs16-sm.pt3-sm.pr5-sm.pb3-sm.pl5-sm.mt4-sm.mr4-sm.u-uppercase.cart-link";
const GUEST_CHECKOUT = "#qa-guest-checkout-mobile";
const FIRST_NAME_INPUT = "#firstName";
const LAST_NAME_INPUT = "#lastName";
const ADDRESS_INPUT = "#address1";
const CITY = "#city";
const STATE = "#state";
const ZIP = "#postalCode";
const EMAIL = "#email";
const PHONE = "#phoneNumber";
const SAVE_N_CONTINUE =
  "#shipping > div > div > div > form > div > div > div > div.ncss-col-sm-12.mt5-sm.ncss-col-md-offset-6.ncss-col-md-6.va-sm-t.ta-sm-r > button";
const CONTINUE_TO_PAYMENT =
  "#shipping > div > div > div > div.ncss-col-sm-12.ncss-col-md-12.pb5-sm.prl5-sm.va-sm-t.ta-sm-r > button";
const CREDIT_CARD = "#creditCardNumber";
const EXP_DATE = "#expirationDate";
const SEC_CODE = "#cvNumber";
const CONTINUE_TO_ORDER_REVIEW = "#payment > div > div > div:nth-child(2) > div.ncss-col-sm-12.pb5-sm.prl5-sm.va-sm-t.ta-sm-r > button";
  // #payment > div > div > div:nth-child(2) > div.ncss-col-sm-12.pb5-sm.prl5-sm.va-sm-t.ta-sm-r > button
// const PLACE_ORDER = "#place-order > div > button";

const PLACE_ORDER = "#placeorderAB3576 > div > div.ncss-col-sm-12.pt5-sm.pb5-sm.va-sm-t.ta-sm-r.test-desktop-button > button";

const gogogo = async (
  page,
  browser,
  size,
  fname,
  lname,
  my_address,
  my_city,
  my_state,
  my_zip,
  my_email,
  my_phone,
  my_cc,
  my_exp_date,
  my_sec_code
) => {
  const select_size = `#root > div > div > div.main-layout > div > div:nth-child(3) > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div:nth-child(2) > div > div.buying-tools-container > div.size-dropdown-component.d-sm-b.mb5-sm.mb3-lg > div > span > ul > li:nth-child(${size}) > button`;
  await page.waitForSelector(SIZE_BTN, { timeout: 2000 });
  await page.click(SIZE_BTN);
  await page.evaluate;
  await page.waitForSelector(select_size);
  await page.click(select_size);
  await page.waitForSelector(ADD_TO_CART);
  await page.click(ADD_TO_CART, { delay: 100 });
  await page.waitForSelector(CHECKOUT);
  await page.click(CHECKOUT);
  await page.waitForSelector(GUEST_CHECKOUT);
  await page.goto("https://www.nike.com/us/en/checkout");
  await page.waitForSelector(FIRST_NAME_INPUT);
  await page.click(FIRST_NAME_INPUT);
  await page.keyboard.type(fname, { delay: 10 });
  await page.waitForSelector(FIRST_NAME_INPUT);
  await page.click(LAST_NAME_INPUT);
  await page.keyboard.type(lname);
  await page.waitForSelector(FIRST_NAME_INPUT);
  await page.click(ADDRESS_INPUT);
  await page.keyboard.type(my_address);
  await page.waitForSelector(FIRST_NAME_INPUT);
  await page.click(CITY);
  await page.keyboard.type("New York");
  await page.waitForSelector(STATE);
  await page.select(STATE, "NY");
  await page.waitForSelector(FIRST_NAME_INPUT);
  await page.click(ZIP);
  await page.keyboard.type(my_zip);
  await page.waitForSelector(FIRST_NAME_INPUT);
  await page.click(EMAIL);
  await page.keyboard.type(my_email);
  await page.waitForSelector(FIRST_NAME_INPUT);
  await page.click(PHONE);
  await page.keyboard.type(my_phone);
  await page.waitForSelector(SAVE_N_CONTINUE);
  await page.click(SAVE_N_CONTINUE);
  await page.waitForSelector(CONTINUE_TO_PAYMENT);
  await page.click(CONTINUE_TO_PAYMENT);
  await page.waitFor(100);
  Promise.all(page.frames()).then(val =>
    val.forEach(async frame => {
      try {
        await frame.waitForSelector(CREDIT_CARD, { timeout: 2000 });
        await frame.click(CREDIT_CARD);
        await page.keyboard.type(my_cc, { delay: 35 });
        await frame.click(EXP_DATE);
        await page.keyboard.type(my_exp_date, { delay: 40 });
        await frame.click(SEC_CODE);
        await page.keyboard.type(my_sec_code);
      } catch (err) {
        console.log("nooo iframe found");
      }
    })
  );

  if ((await page.$(CONTINUE_TO_ORDER_REVIEW)) !== null) {
    await page.$(CONTINUE_TO_ORDER_REVIEW, p=>p.click())
    // await console.log("continue to order revuew")
    // await page.waitForSelector(CONTINUE_TO_ORDER_REVIEW);
    // await console.log("start click continue to order review");
    // await page.click(CONTINUE_TO_ORDER_REVIEW);
    // await console.log("after click continue to order review")
    // await page.waitForSelector("#place-order > div > button");
    // await page.click("#place-order > div > button");
  }
  else if ((await page.$(PLACE_ORDER)) !== null) {
    console.log("place order")
    await page.waitForSelector(PLACE_ORDER);
    console.log("place order hererereerer");
    // await page.click(PLACE_ORDER);
  }

  // await browser.close();
};

module.exports.nikeFlow = async (
  goto,
  size,
  fname,
  lname,
  my_address,
  my_city,
  my_state,
  my_zip,
  my_email,
  my_phone,
  my_cc,
  my_exp_date,
  my_sec_code,
  month,
  date,
  year,
  hour,
  minute
) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(goto);
    if ((await page.$(NOTIFY_ME)) !== null) {
      let time = new Date(year, month - 1, date, hour, minute, 2);
      let j = schedule.scheduleJob(time, () =>
        gogogo(
          page,
          browser,
          size,
          fname,
          lname,
          my_address,
          my_city,
          my_state,
          my_zip,
          my_email,
          my_phone,
          my_cc,
          my_exp_date,
          my_sec_code
        )
      );
    } else {
      gogogo(
        page,
        browser,
        size,
        fname,
        lname,
        my_address,
        my_city,
        my_state,
        my_zip,
        my_email,
        my_phone,
        my_cc,
        my_exp_date,
        my_sec_code
      );
      return;
    }
  } catch (err) {
    // console.log(err);
    browser.close();
  }
};
