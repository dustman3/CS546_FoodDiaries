const express = require("express");
const router = express.Router();
const data = require("../data/function");
const datas = require("../data");
const datar = datas.rData;
var xss = require("xss")

router.get("/", async (req, res) => {
  try {
    let allrecipes = await datar.getAllRecipes();
    allrecipes.forEach(element => {
      let arrExt = element.rmimetype;
      if (arrExt == 'video/mp4' || arrExt == 'video/mov' || arrExt == 'video/wmv' || arrExt == 'video/avi' || arrExt == 'video/flv' || arrExt == 'video/mkv') {
        element.img = false;
        element.vid = true;
      } else if (arrExt == 'image/png' || arrExt == 'image/jpeg' || arrExt == 'image/bmp') {
        element.vid = false;
        element.img = true;
      }
    });
    res.status(200).render("home", { recipes: allrecipes, css: "some.css"});
  } catch (error) {
    res.status(500).render("error", { error: error, css: "error.css" });
  }
});

router.post('/', async function (req, res) {
  //get what you want to search
  let title = xss(req.body.search);
  try {
    let resultAll = await data.getRecipesByName(title)
    let recipes = resultAll
    let resultStringify = JSON.stringify(resultAll);
    recipes.forEach(element => {
      let arrExt = element.rmimetype;
      if (arrExt == 'video/mp4' || arrExt == 'video/mov' || arrExt == 'video/wmv' || arrExt == 'video/avi' || arrExt == 'video/flv' || arrExt == 'video/mkv') {
        element.img = false;
        element.vid = true;
      } else if (arrExt == 'image/png' || arrExt == 'image/jpeg' || arrExt == 'image/bmp') {
        element.vid = false;
        element.img = true;
      }
    });
    if (resultStringify == JSON.stringify([])) {
      res.status(200).render("home", { errMsg: "Recipes Not Found. Upload your own recipe!", css: "search-not.css" })
    } else {
      res.status(200).render("home", { recipes: recipes, css: "some.css" })
    }
  } catch (error) {
    res.status(500).render("error", { error: error, css: "error.css" });
  }
});




module.exports = router;