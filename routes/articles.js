const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Article = require("../models/article");

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:id", async (req, res) => {
  console.log("id -- ", req.params.id);
  const article = await Article.findById(req.params.id);
  if (article == null) {
    // res.redirect("/");
    return;
  }
  console.log("article is - ", article);
  res.render("articles/show", { article: article });
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
    res.redirect(`/articles/${response.id}`);
    next();
  } catch (err) {
    console.log(err);
  }
  res.render("articles/new", { article: new Article() });
});

module.exports = router;
