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
        const recipeCollection = await recipesData();
        let rRecipe = await recipeCollection.findOne({
            _id: id
        })
        if (rRecipe === null || rRecipe === undefined) throw "No Recipe found";
        return rRecipe;
    },

    async addrecipeData(titile, ingredients, steps, imagename, mimetype, imagepath) {
        const recipeCollection = await recipesData();
        let newRecipe = {
            _id: uuid.v4(),
            rtitle: titile,
            ringredients: ingredients,
            rsteps: steps,
            rimagename: imagename,
            rmimetype: mimetype,
            rcomments: {},
            rimagepath: imagepath
        }
        const insertRecipiesDB = await recipeCollection.insertOne(newRecipe);
        if (insertRecipiesDB.insertedCount === 0) throw "Could not add post";
        return newRecipe;
    },

    async addrecipeVideo(title, videoname, mimetype, videopath) {
        try {
            const recipeCollection = await recipesData();
            let newRecipe = {
                _id: uuid.v4(),
                rtitle: title,
                rimagename: videoname,
                rmimetype: mimetype,
                rcomments: {},
                rvideopath: videopath
            }
            const insertRecipiesDB = await recipeCollection.insertOne(newRecipe);
            if (insertRecipiesDB.insertedCount === 0) throw "Could not add post";
            return newRecipe;
        } catch (error) {
            throw "Internal Server Error";
        }
    },

    async addComments(id, comment, username, user) {
        // const usersDetail = username;
        try {
            if (!id) {
                throw `id is not provided`
            }
            if (!id) {
                throw `Comment is empty`
            }

            const recipeCollection = await recipesData();
            const recipe = await recipeCollection.findOne({ _id: id });
            if (!recipe) {
                throw `No recipe with this recipe id`
            }
            let commentsArr = recipe.rcomments;
            let size = 0;
            for (username in commentsArr) {
                if (commentsArr.hasOwnProperty(username)) {
                    size++;
                }
            }
            let currentDate = new Date();
            let date = currentDate.getDate();
            let month = currentDate.getMonth(); //Be careful! January is 0 not 1
            let year = currentDate.getFullYear();
            let time = currentDate.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })

            let dateString = date + "/" + (month + 1) + "/" + year + " " + time;
            if (size > 0) {
                commentsArr[username + size] = user + "[" + dateString + "]" + " : " + comment;
            } else {
                commentsArr[username] = user + "[" + dateString + "]" + " : " + comment;
            }
            const comments = {
                rcomments: commentsArr
            };
            const updateInfo = await recipeCollection.updateOne({ _id: id }, { $set: comments });
            if (updateInfo.modifiedCount === 0) {
                throw `could not update the Comments`;
            }
            try {
                return await module.exports.getRecipeByID(id);
            } catch (error) {
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }
};

module.exports = exportedMethods;