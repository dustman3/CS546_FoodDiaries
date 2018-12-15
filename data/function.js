const mongoCollection = require("../config/mongoCollections");
const recipes = mongoCollection.recipes;

// *****This part description is from DataBase proposal*****
// 1._id:string, Unique id for each recipe
// 2.title: string, Title for each recipe
// 3.ingredients: array of object, Array of object for each ingredient
// 4.steps: string, Array of each steps of recipe
// 5.imageinfo: object, Object of each image information with its destination address
// 6.videoInfo: object, Stores video as a binary
// 7.comment: String
var obj ={
    _id: "",
    title: "",//"the title of the ", need change to title later
    ingredients:[],
    steps:[],
    imageinfo:{},
    videoInfo:{},
    comment:""
}

async function createRecipes(id, title, ingredients, steps, imageinfo, videoInfo, comment){
   
    const RE =  await recipes();
    
    // parameters Check
    if(typeof id !== "string"){throw "id's type should be string"}
    if(typeof title !== "string"){throw "title's type should be string"}
    if(typeof comment !== "string"){throw "comment's type should be string"}
    if(typeof imageinfo !== "object"){throw "imageinfo's type should be string"}
    if(typeof videoInfo !== "object"){throw "videoInfo's type should be string"}
    if(!(steps instanceof Array)){throw "steps should be an string array"}
    if(!(ingredients instanceof Array)){throw "ingredients should be an object array"}

    //update out object
    obj._id = id;
    obj.title =title;
    obj.ingredients = ingredients;
    obj.steps = steps;
    obj.imageinfo = imageinfo;
    obj.videoInfo = videoInfo;
    obj.comment = comment;
    await RE.insertOne(obj);//insert() abondoned, Use insertOne(), insertMany() or bulkWrite instead.
    return obj
};

async function getAllRecipes(){
    const RE =  await recipes();
    let all = await RE.find({}).toArray()
    return all
}

async function getRecipesByName(_title){
    if (!_title) throw "Please Input the title";
    const RE =  await recipes();
    //in case user input uppercase letters, or uploads in different case
    //same as "%like" in SQL
    //{title : 1} means I just need the title
    // searchContent = _title.toLowerCase();
    
    let recipesWanted = await RE.find({title : { $regex: _title, $options: 'i' }},{projection:["title"]}).toArray()
    if(recipesWanted == null){
        throw"not found"
    }
    console.log(recipesWanted);
    return recipesWanted
}

async function deleteRecipesById(id){
    const RE =  await recipes();
    var removeInfo = await RE.removeOne({_id: id})
    if(removeInfo.deleteCount === 0){throw `can't delete ${id}`} //???????????????deleteCount is what?**********************************************
    //     return `${id} removed successfully`
}

module.exports = {
    createRecipes,
    getAllRecipes,
    getRecipesByName,
    deleteRecipesById
}