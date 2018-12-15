const mongoCollections = require("./mongoCollections");
const uuid = require("node-uuid");
const recipesData = mongoCollections.recipesData;

let exportedMethods = {

    async getAllRecipes() {
        const rCollection = await recipesData();
        return await rCollection.find({}).toArray();
    },

    async getRecipeByID(id) {
        if (!id) throw "No Recipe found";
        console.log("Hello There..."+id);
        const recipeCollection = await recipesData();
        let rRecipe = await recipeCollection.findOne({
            _id: id
        });
        rRecipe = JSON.stringify(rRecipe);
        if (rRecipe === null) throw "No Recipe found";
        console.log("HEy ypu fasdjzbcx akdjxz,fhbcnaosjlx"+rRecipe);
        return rRecipe;
    },

    async addrecipeData(titile, ingredients, steps){
        const recipeCollection = await recipesData();
        let newRecipe = {
            _id: uuid.v4(),
            rtitle: titile,
            ringredients: ingredients,
            rsteps: steps
        }
        console.log(newRecipe);
        const insertRecipiesDB = await recipeCollection.insertOne(newRecipe);
        if (insertRecipiesDB.insertedCount === 0) throw "Could not add post";
        return newRecipe;
    }
    
  };
  




module.exports = exportedMethods;