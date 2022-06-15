const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const app = express();

mongoose.connect("mongodb://localhost/blog");
app.set("view engine", "ejs");
app.listen(8000);

app.use(express.static("/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const articles = await Article.find();
  articles.reverse();
  res.render("articles/index", { context: articles });
});
app.use("/articles", articleRouter);
