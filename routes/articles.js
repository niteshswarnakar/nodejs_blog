const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Article = require("../models/article");

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:slug", async (req, res) => {
  console.log("slug -- ", req.params.slug);
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    console.log("article is - ", article);
    res.render("articles/show", { article: article });
    if (article == null) {
      // res.redirect("/");everything is fine
      return;
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res, next) => {
  // console.log(" this is request.body : ", req.body);
  try {
    let response = await Article.create({
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown,
    });
    console.log("response.id is -- ", response.id);
    res.redirect(`/articles/${response.slug}`);
    next();
  } catch (err) {
    console.log(err);
  }
  res.render("articles/new", { article: new Article() });
});

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
