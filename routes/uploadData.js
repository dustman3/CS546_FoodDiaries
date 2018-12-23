const express = require("express");
const data = require("../data");
const datar = data.rData;
const router = express.Router();
const multer = require("multer");
// const path = require("path");
// const requireCookie = require("./users");
var xss = require("xss");

// For storing Images & Videos
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/bmp') {
      callback(null, './public/uploads/recipeImages/');
    } else if (file.mimetype == 'video/avi' || file.mimetype == 'video/flv' || file.mimetype == 'video/wmv'
      || file.mimetype == 'video/mov' || file.mimetype == 'video/mp4' || file.mimetype == 'video/mkv' || file.mimetype == 'video/webm') {
      callback(null, './public/uploads/recipeVideos/');
    } else {
      callback(null, false);
    }
  },
  filename: function (req, file, callback) {
    callback(null, (new Date().toISOString().replace(/:/g, '_') + file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/bmp' || file.mimetype == 'image/jpg'
    || file.mimetype == 'video/avi' || file.mimetype == 'video/flv' || file.mimetype == 'video/wmv'
    || file.mimetype == 'video/mov' || file.mimetype == 'video/mp4' || file.mimetype == 'video/mkv'
    || file.mimetype == 'video/webm')
    callback(null, true);
  else
    callback(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000024 * 10000024 * 60000
  },
  fileFilter: fileFilter
});


router.post("/", upload.single('file'), async (req, res) => {
  try {
    let filetype = xss(req.file.mimetype);
    if (filetype == 'video/mp4' || filetype == 'video/mov' || filetype == 'video/wmv'
      || filetype == 'video/avi' || filetype == 'video/flv' || filetype == 'video/mkv' || filetype.mimetype == 'video/webm') {
      try {
        const title = xss(req.body.title);
        const originalname = xss(req.file.originalname);
        const mimetype = xss(req.file.mimetype);
        const newRecipe = await datar.addrecipeVideo(
          title,
          originalname,
          mimetype,
          (req.file.path).replace(/\\/g, "/")
        );
      } catch (error) {
        res.status(500).render("error", { error: error, css: "error.css" });
      }
    } else if (filetype == 'image/png' || filetype == 'image/jpeg' || filetype == 'image/bmp' || filetype == 'image/jpg') {
      try {
        //upload.single('uploadtitleimage');
        const title = xss(req.body.title);
        const ingredients = xss(req.body.ingredients)
        const steps = xss(req.body.steps)
        const originalname = xss(req.file.originalname)
        const mimetype = xss(req.file.mimetype)
        const newRecipe = await datar.addrecipeData(
          title,
          ingredients,
          steps,
          originalname,
          mimetype,
          (req.file.path).replace(/\\/g, "/")
        );
      } catch (error) {
        res.status(500).render("error", { error: error, css: "error.css" });
      }
    } else {
      res.status(500).render("error", { error: "Error : Unsupported file format!", css: "error.css" });
    }
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).render("error", { error: "Error : Unsupported file format!", css: "error.css" });
  }

});
router.get("/:id", async (req, res) => {
  const xssId = xss(req.params.id);
  try {
    let getRecipe = await datar.getRecipeByID(xssId);
    let arrExt = getRecipe.rmimetype;
    if (arrExt == 'video/mp4' || arrExt == 'video/mov' || arrExt == 'video/wmv' || arrExt == 'video/avi' || arrExt == 'video/flv' || arrExt == 'video/mkv') {
      rRecipe = JSON.stringify(getRecipe);
      res.status(200).render("openRecipeVideo", { recipe: JSON.parse(rRecipe), css: "openrecipe.css" });
    } else if (arrExt == 'image/png' || arrExt == 'image/jpeg' || arrExt == 'image/bmp') {
      rRecipe = JSON.stringify(getRecipe);
      res.status(200).render("openRecipe", { recipe: JSON.parse(rRecipe), css: "openrecipe.css" });
    }
  } catch (error) {
    res.status(500).render("error", { error: "Error: Unable to find the recipe!", css: "error.css" });
  }
});


router.post("/comments", async (req, res) => {
  if (!req.cookies.AuthCookie) {
    res.redirect("/userlogin");
  } else {
    let username = req.cookies.AuthCookie;
    try {
      const recipeId = xss(req.body.recipeId);
      const comments = xss(req.body.comments);
      const getRecipe = await datar.addComments(
        recipeId,
        comments,
        username,
        username
      );
      let arrExt = getRecipe.rmimetype;
      if (arrExt == 'video/mp4' || arrExt == 'video/mov' || arrExt == 'video/wmv' || arrExt == 'video/avi' || arrExt == 'video/flv' || arrExt == 'video/mkv') {
        rRecipe = JSON.stringify(getRecipe);
        res.status(200).render("openRecipeVideo", { recipe: JSON.parse(rRecipe), css: "openrecipe.css" });
      } else if (arrExt == 'image/png' || arrExt == 'image/jpeg' || arrExt == 'image/bmp') {
        rRecipe = JSON.stringify(getRecipe);
        res.status(200).render("openRecipe", { recipe: JSON.parse(rRecipe), css: "openrecipe.css" });
      }
    } catch (e) {
      res.status(500).render("error", { error: "Error: Unable submit the comment!", css: "error.css" });
    }
  }
});
module.exports = router;