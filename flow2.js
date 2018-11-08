const puppeteer = require("puppeteer");

const FIRST_NAME_INPUT = "#firstName";
const LAST_NAME_INPUT = "#lastName";
const ADDRESS_INPUT = "#address1";
const CITY = "#city";
const STATE = "#state";
const ZIP = "#postalCode";
const EMAIL = "#email";
const PHONE = "#phoneNumber";

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
    // await page.evaluate(async () =>  Array.from(document.querySelectorAll(".saveAddressBtn"))[0].click());

    await page.waitForSelector(FIRST_NAME_INPUT);
    await page.click(FIRST_NAME_INPUT);
    await page.evaluate(()=>document.getElementById("firstName").value = "Jon")
    await page.waitForSelector(LAST_NAME_INPUT);
    await page.click(LAST_NAME_INPUT);
    await page.evaluate(()=>document.getElementById("lastName").value = "Doe")

    await page.waitForSelector(ADDRESS_INPUT);
    await page.click(ADDRESS_INPUT);
    await page.evaluate(()=>document.getElementById("address1").value = "123 fake st")
    await page.waitForSelector(CITY);
    await page.click(CITY);
    await page.evaluate(()=>document.getElementById("city").value = "new york")

    await page.select(STATE, "NY");
    await page.evaluate(()=>document.getElementById("state").value = "NY")
    await page.waitForSelector(ZIP);
    await page.click(ZIP);
    await page.evaluate(()=>document.getElementById("postalCode").value = "11385")
    await page.waitForSelector(EMAIL);
    await page.click(EMAIL);
    await page.evaluate(()=>document.getElementById("email").value = "asdf@asdf.com")
    await page.waitForSelector(PHONE);
    await page.click(PHONE);
    await page.keyboard.type("1231231123");
    // await page.evaluate(()=>document.getElementById("phoneNumber").value = "1231231123")



    // await page.evaluate(() => {
    //   let fname = document.getElementById("firstName");
    //   fname.value = "John";
    //   let lname = document.getElementById("lastName");
    //   lname.value = "Doe";
    //   let address = document.getElementById("address1");
    //   address.value = "123 fake st";
    //   let city = document.getElementById("city");
    //   city.value = "new york";
    //   // STATE
    //   document.getElementById("state").value = "NY";
    //   let zip = document.getElementById("postalCode");
    //   zip.value = 11385;
    //   let email = document.getElementById("email");
    //   email.value = "john.doe@fakeemail.com";
    //   let phone = document.getElementById("phoneNumber");
    //   phone.value = "2122345587";
    // });

    // await page.evaluate(()=> {
    //     let inputStatuses = Array.from(document.querySelectorAll(".inputStatus"));
    //     inputStatuses.forEach(x=>x.classList.add("valid"))
    // })

    await page.waitFor(1000);
    await page.evaluate(async () =>  Array.from(document.querySelectorAll(".saveAddressBtn"))[0].click());
    // {
    //   if (document.getElementById("phoneNumber").value) {
    // Array.from(document.querySelectorAll(".saveAddressBtn"))[0].click();
    //   }
    // }
    // );
  } catch (err) {
    console.log(err);
  }
};

module.exports.newNikeFlow();
