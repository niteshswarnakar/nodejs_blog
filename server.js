const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const app = express();
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/blog");
app.set("view engine", "ejs");
app.listen(8000);
app.use(methodOverride("_method"));
app.use(express.static("/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const articles = await Article.find();

    articles.reverse();
    if (articles.length > 0) {
      res.render("articles/index", { context: articles });
    } else {
      res.render("articles/Error");
    }
  } catch (err) {
    console.log(err);
  }
});
app.use("/articles", articleRouter);
