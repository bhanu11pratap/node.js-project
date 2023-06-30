const express = require("express");
const router = express.Router();
const Author = require("../models/author");
//all authors route
router.get("/", async (req, res) => {
  let searchoptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchoptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchoptions);
    res.render("authors/index", { authors: authors, searchoptions: req.query });
  } catch {
    res.render("/");
  }
});

//new author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//create author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    // req.redirect(`authors/${newAuthor.id}`)
    req.redirect("authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

module.exports = router;
