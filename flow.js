const puppeteer = require("puppeteer");
const schedule = require("node-schedule");
// const moment = require("moment");
// #placeorderAB3576 > div > div.ncss-col-sm-12.pt5-sm.pb5-sm.va-sm-t.ta-sm-r.test-desktop-button > button
const NOTIFY_ME =
  "#root > div > div > div.main-layout > div > div:nth-child(3) > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div.ncss-col-sm-12.mt9-sm > div > button";
const SIZE_BTN =
  // "#root > div > div > div.main-layout > div > div:nth-child(3) > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div:nth-child(2) > div > div.buying-tools-container > div.size-dropdown-component.d-sm-b.mb5-sm.mb3-lg > div > button"
  "#root > div > div > div.main-layout > div > div:nth-child(3) > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div.ncss-col-sm-12.mt9-sm > div > div > div > button";
// "#root > div > div > div.main-layout > div > div:nth-child(3) > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div:nth-child(2) > div > div.buying-tools-container > div.size-dropdown-component.d-sm-b.mb5-sm.mb3-lg > div > button > div";
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
const CONTINUE_TO_ORDER_REVIEW =
  "#payment > div > div > div:nth-child(2) > div.ncss-col-sm-12.pb5-sm.prl5-sm.va-sm-t.ta-sm-r > button";

const PLACE_ORDER =
  "#placeorderAB3576 > div > div.ncss-col-sm-12.pt5-sm.pb5-sm.va-sm-t.ta-sm-r.test-desktop-button > button";

  // THERE is a buy selector immediately after drop NOT an add to cart selector
  const BUY_SELECTOR = "#root > div > div > div.main-layout > div > div:nth-child(3) > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div.ncss-col-sm-12.mt9-sm > div > button" 

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
  my_sec_code,
  drop
) => {
  await page.evaluate(() =>
    document.querySelectorAll(".size-grid-dropdown")[0].click()
  );
  await page.evaluate(async  (selectYoSize)=> {
    let sizes = await Array.from(document.querySelectorAll(".size-grid-button"));
    let sizeIndex = sizes
      .map((s, i) => (s.innerHTML === selectYoSize ? i : false))
      .filter(Boolean)[0];
    return sizes[sizeIndex].click();
  }, size);

  await page.waitFor(1000);

  if(drop){
    await page.evaluate(() =>
    document.querySelectorAll("button[data-qa=feed-guy-cta]")[0].click()
  );
  }else{
    
    await page.evaluate(() =>
      document.querySelectorAll("button[data-qa=add-to-cart]")[0].click()
    );
  }


  await page.goto("https://www.nike.com/us/en/checkout/tunnel");
  await page.waitFor(1000);
  await page.evaluate(() =>
    document.getElementById("qa-guest-checkout-mobile").click()
  );
  await page.waitFor(1000);

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
  await page.keyboard.type(my_city);
  await page.waitForSelector(STATE);
  await page.select(STATE, my_state);
  await page.waitForSelector(FIRST_NAME_INPUT);
  await page.click(ZIP);
  await page.keyboard.type(my_zip);
  await page.waitForSelector(FIRST_NAME_INPUT);
  await page.click(EMAIL);
  await page.keyboard.type(my_email);
  await page.waitForSelector(FIRST_NAME_INPUT);
  await page.click(PHONE);
  await page.keyboard.type(my_phone);

  await page.evaluate(async () =>
    Array.from(document.querySelectorAll(".saveAddressBtn"))[0].click()
  );
  await page.waitFor(1000);
  await page.evaluate(() =>
    Array.from(document.querySelectorAll(".continuePaymentBtn"))[0].click()
  );

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
  await page.waitFor(2000);
  if ((await page.$(CONTINUE_TO_ORDER_REVIEW)) !== null) {
    console.log("review order");
    await page.evaluate(()=>Array.from(document.querySelectorAll(".continueOrderReviewBtn"))[0].click());
    await page.evaluate(()=>Array.from(document.querySelectorAll(".placeOrderBtn"))[0].click());
  } else {
    console.log("no review, place order hererereerer");
    await page.waitForSelector(PLACE_ORDER);
    await page.click(PLACE_ORDER);
  }

  await browser.close();
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
      let time = new Date(year, month - 1, date, hour, 0, 2);
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
          my_sec_code,
          true
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
        my_sec_code,
        false
      );
      return;
    }
  } catch (err) {
    // console.log(err);
    browser.close();
  }
};
