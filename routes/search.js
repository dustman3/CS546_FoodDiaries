var express = require('express');
var app = express();
const router = express.Router();
const data = require("../data/function")




router.get('/', function(req, res) {
  res.render("search")
})

// router.post('/',async function(req, res){
//   await data.createItem();
//   console.log("sucess")
// })

router.post('/', async function(req, res) {


    let title = req.body.search;
    // console.log(title)

    //this "resultAll" is an object,the index is the NO.index object; we just need "title" in it
    let resultAll = await data.getRecipesByName(title)
   
    // console.log(typeof resultAll)
    // console.log (resultAll[0].title)
    var resultTitle = [];
    for(let result of resultAll){
      console.log(result.title)
      resultTitle.push(result.title)   
    }
    console.log(resultTitle)
    console.log(resultTitle[0])
    let resultStringify = JSON.stringify(resultTitle);
    console.log(resultStringify)
    
    if(resultStringify == JSON.stringify([])){
      // let errMsg = "Recipes Not Found, you may upload your own instead!!!"
      // console.log("im in IF")
      res.render("search",{errMsg:"Recipes Not Found, you may upload your own recipe!!!"})
    }else{
      res.render("search",{resultTitle})
      // console.log('Else')
    }
});

module.exports = router;