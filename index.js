const express = require("express");
const app = express();
const _ = require("lodash");
const parser = require("body-parser");
const { getShoeList } = require("./slugs");
const {nikeFlow} = require("./flow");

app.set("view engine", "ejs");
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.get("/", async (req, res) => {
  const shoes = await getShoeList();
  // console.log(shoes)

  res.render("page/index", { shoes, nikeFlow });
});

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => console.log("listening on port ", PORT));
