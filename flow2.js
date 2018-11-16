const puppeteer = require("puppeteer");

const FIRST_NAME_INPUT = "#firstName";
const LAST_NAME_INPUT = "#lastName";
const ADDRESS_INPUT = "#address1";
const CITY = "#city";
const STATE = "#state";
const ZIP = "#postalCode";
const EMAIL = "#email";
const PHONE = "#phoneNumber";
const CREDIT_CARD = "#creditCardNumber";
const EXP_DATE = "#expirationDate";
const SEC_CODE = "#cvNumber";
const CONTINUE_TO_ORDER_REVIEW =
  "#payment > div > div > div:nth-child(2) > div.ncss-col-sm-12.pb5-sm.prl5-sm.va-sm-t.ta-sm-r > button";
const PLACE_ORDER =
  "#placeorderAB3576 > div > div.ncss-col-sm-12.pt5-sm.pb5-sm.va-sm-t.ta-sm-r.test-desktop-button > button";

module.exports.newNikeFlow = async () => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(
      "https://www.nike.com/launch/t/air-vapormax-run-utility-white-tropical-twist/"
    );

    await page.waitFor(1000);

    await page.evaluate(() =>
      document.querySelectorAll(".size-grid-dropdown")[0].click()
    );
    await page.waitFor(1000);
    await page.evaluate(size => {
      let sizes = Array.from(document.querySelectorAll(size));
      let sizeIndex = sizes
        .map((s, i) => (s.innerHTML === "11" ? i : false))
        .filter(Boolean)[0];
      return sizes[sizeIndex].click();
    }, ".size-grid-button");

    await page.waitFor(1000);

    await page.evaluate(() =>
      document.querySelectorAll("button[data-qa=add-to-cart]")[0].click()
    );

    await page.goto("https://www.nike.com/us/en/checkout/tunnel");
    await page.waitFor(1000);
    await page.evaluate(() =>
      document.getElementById("qa-guest-checkout-mobile").click()
    );
    await page.waitFor(1000);
    // await page.evaluate(async () =>  Array.from(document.querySelectorAll(".saveAddressBtn"))[0].click());

    await page.waitForSelector(FIRST_NAME_INPUT);
    await page.click(FIRST_NAME_INPUT);
    await page.evaluate(
      () => (document.getElementById("firstName").value = "Jon")
    );
    await page.waitForSelector(LAST_NAME_INPUT);
    await page.click(LAST_NAME_INPUT);
    await page.evaluate(
      () => (document.getElementById("lastName").value = "Doe")
    );

    await page.waitForSelector(ADDRESS_INPUT);
    await page.click(ADDRESS_INPUT);
    await page.evaluate(
      () => (document.getElementById("address1").value = "123 fake st")
    );
    await page.waitForSelector(CITY);
    await page.click(CITY);
    await page.evaluate(
      () => (document.getElementById("city").value = "new york")
    );

    await page.select(STATE, "NY");
    // await page.evaluate(() => (document.getElementById("state").value = "NY"));
    await page.waitForSelector(ZIP);
    await page.click(ZIP);
    await page.evaluate(
      () => (document.getElementById("postalCode").value = "11385")
    );
    await page.waitForSelector(EMAIL);
    await page.click(EMAIL);
    await page.evaluate(
      () => (document.getElementById("email").value = "asdf@asdf.com")
    );

    await page.waitForSelector(PHONE);
    await page.click(PHONE);
    await page.evaluate(
      () => (document.getElementById("phoneNumber").value = "1231231123")
    );
    await page.waitForSelector(PHONE);
    await page.click(PHONE);
    // await page.evaluate(
    //   () => (document.getElementById("phoneNumber").value = "1231231123")
    // );
    await page.keyboard.type("1231231123");

    await page.waitFor(1000);
    await page.evaluate(async () =>
      Array.from(document.querySelectorAll(".saveAddressBtn"))[0].click()
    );
    await page.evaluate(() =>
      Array.from(document.querySelectorAll(".continuePaymentBtn"))[0].click()
    );

    await page.waitFor(1000);
    Promise.all(page.frames()).then(val =>
      val.forEach(async frame => {
        try {
          await frame.waitForSelector(CREDIT_CARD, { timeout: 2000 });
          await frame.click(CREDIT_CARD);
          // await page.keyboard.type("4266841253213514", { delay: 35 });
          await frame.evaluate(
            () =>
              (document.getElementById("creditCardNumber").value +=
                "4266841253213514")
          );

          await frame.click(EXP_DATE);
          await frame.evaluate(
            () => (document.getElementById("expirationDate").value = "11/21")
          );

          
          await frame.click(SEC_CODE);
          await page.keyboard.type("123");
        } catch (err) {
          console.log("nooo iframe found");
        }
      })
    );

    await page.waitFor(1000);
    if ((await page.$(CONTINUE_TO_ORDER_REVIEW)) !== null) {
      await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(".continueOrderReviewBtn")
        )[0].click()
      );
      // await page.evaluate(()=>Array.from(document.querySelectorAll(".placeOrderBtn"))[0].click());
      console.log("review order");
    } else {
      // await page.waitForSelector(PLACE_ORDER);
      // await page.click(PLACE_ORDER);
      console.log("no review, place order hererereerer");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.newNikeFlow();