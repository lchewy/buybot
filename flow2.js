const puppeteer = require("puppeteer");

const CONTINUE_TO_ORDER_REVIEW =
  "#payment > div > div > div:nth-child(2) > div.ncss-col-sm-12.pb5-sm.prl5-sm.va-sm-t.ta-sm-r > button";
const PLACE_ORDER =
  "#placeorderAB3576 > div > div.ncss-col-sm-12.pt5-sm.pb5-sm.va-sm-t.ta-sm-r.test-desktop-button > button";

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

module.exports.newNikeFlow = async () => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(
      "https://www.nike.com/launch/t/air-vapormax-run-utility-white-tropical-twist/"
    );

    page.waitFor(1000);

    await page.evaluate(() =>
      document.querySelectorAll(".size-grid-dropdown")[0].click()
    );

    await page.evaluate(size => {
      let sizes = Array.from(document.querySelectorAll(size));
      let sizeIndex = sizes
        .map((s, i) => (s.innerHTML === "12" ? i : false))
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
    await page.waitForSelector(FIRST_NAME_INPUT);
    await page.click(FIRST_NAME_INPUT);
    await page.keyboard.type("fname", { delay: 10 });
    await page.waitForSelector(LAST_NAME_INPUT);
    await page.click(LAST_NAME_INPUT);
    await page.keyboard.type("lname");
    await page.waitForSelector(ADDRESS_INPUT);
    await page.click(ADDRESS_INPUT);
    await page.keyboard.type("123 fake strret");
    await page.waitForSelector(CITY);
    await page.click(CITY);
    await page.keyboard.type("New York");
    await page.waitForSelector(STATE);
    await page.select(STATE, "NY");
    await page.waitForSelector(ZIP);
    await page.click(ZIP);
    await page.keyboard.type("11385");
    await page.waitForSelector(EMAIL);
    await page.click(EMAIL);
    await page.keyboard.type("asdfa@asdfads.asdf");
    await page.waitForSelector(PHONE);
    await page.click(PHONE);
    await page.keyboard.type("1231231123");
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
          await page.keyboard.type("123123123123123", { delay: 35 });
          await frame.click(EXP_DATE);
          await page.keyboard.type("11/21", { delay: 40 });
          await frame.click(SEC_CODE);
          await page.keyboard.type("123");
        } catch (err) {
          console.log("nooo iframe found");
        }
      })
    );
    await page.waitFor(2000);
    if ((await page.$(CONTINUE_TO_ORDER_REVIEW)) !== null) {
      console.log("review order");
      // await page.evaluate(()=>Array.from(document.querySelectorAll(".continueOrderReviewBtn"))[0].click());
      // await page.evaluate(()=>Array.from(document.querySelectorAll(".placeOrderBtn"))[0].click());
    } else {
      // await page.waitForSelector(PLACE_ORDER);
      console.log("no review, place order hererereerer");
      // await page.click(PLACE_ORDER);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.newNikeFlow();


// await page.evaluate(()=>document.getElementById("firstName").click());
// await page.evaluate(() => {
//   let fname = document.getElementById("firstName");
//   fname.click()
//   fname.value += "John";
//   let lname = document.getElementById("lastName");
//   lname.value += "Doe";
//   let address = document.getElementById("address1");
//   address.value += "123 fake st";
//   let city = document.getElementById("city");
//   city.value += "new york";
//   // STATE
//   document.getElementById("state").value = "NY";
//   let zip = document.getElementById("postalCode");
//   zip.value += 11385;
//   let email = document.getElementById("email");
//   email.value += "john.doe@fakeemail.com";
//   let phone = document.getElementById("phoneNumber");
//   phone.value += "2122345587";
//   //   if (
//   //     Array.from(document.querySelectorAll(".saveAddressBtn"))[0]
//   //       .innerHTML === "Save &amp; Continue"
//   //   ) {
//   //     // return Array.from(document.querySelectorAll(".saveAddressBtn"))[0];
//   //     return true;
//   //   }
// });

// await page.waitFor(1000);

// {
//   if (document.getElementById("phoneNumber").value) {
// Array.from(document.querySelectorAll(".saveAddressBtn"))[0].click();
//   }
// }
// );
