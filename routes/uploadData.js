const express = require("express");
const data = require("../data");
const datar = data.rData;
const router = express.Router();
const usersdata = require("../data");

router.post("/", async (req, res) => {
    // res.render("uploadfull");
    const DATA = req.body;
    // console.log(DATA);
    // console.log(DATA.ingredients);
    try{
        const newRecipe = await datar.addrecipeData(
            DATA.title,
            DATA.ingredients,
            DATA.steps
        );
        
        var allrecipes = await datar.getAllRecipes();
        // console.log(allrecipes);
        // res.json({newRecipe});
        res.render("home",{recipes:allrecipes});
        // res.redirect("/home");
    }catch(e){
        res.status(500).json({
            error: e
        });
    }
    
});

router.get("/:id", async (req, res) => {
    console.log("zhingalala");
    let getRecipe = await datar.getRecipeByID(req.params.id);
    console.log("Hey Mahn Whats up " + getRecipe);
    // console.log(getRecipe);
    res.render("openRecipe", JSON.parse(getRecipe));
});

module.exports = router;