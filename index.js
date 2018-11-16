const express = require("express");
const app = express();
const _ = require("lodash");
const parser = require("body-parser");
const { getShoeList } = require("./slugs");
const { nikeFlow } = require("./flow3");

app.set("view engine", "ejs");
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.get("/", async (req, res) => {
  const shoes = await getShoeList();
  // console.log(shoes)

  res.render("page/index", { shoes });
});

app.post("/post", async (req, res) => {
  await nikeFlow(
    req.body.shoe,
    req.body.size,
    req.body.fname,
    req.body.lname,
    req.body.my_address,
    req.body.my_city,
    req.body.state,
    req.body.my_zip,
    req.body.my_email,
    req.body.my_phone,
    req.body.my_cc,
    req.body.my_exp_date,
    req.body.my_sec_code,
    Number(req.body.month),
    Number(req.body.date),
    Number(req.body.year),
    Number(req.body.hour),
    Number(req.body.minute)
  );
  const shoes = await getShoeList();
  res.redirect("/")
  // res.render("page/index", { shoes });
});

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => console.log("listening on port ", PORT));
