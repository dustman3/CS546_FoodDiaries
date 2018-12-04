const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const dbConnection = require("./mongoConnection");
const mongo = require("mongodb");
const settings= require("./settings");
const config = settings.config;

const main = async () => {

//const configRoutes = require("./routes");
const app = express();
const static = express.static(__dirname+"/public");

//middleware
app.use("/public",static);
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded());
app.engine("handlebars", exphbs({defaultLayout:"index"}));
app.set("view engine","handlebars");
//configRoutes(app);

//mongoURI
const mongoURI =config.serverURL+"fileUploads";

//mongo connection
//const conn = mongoose.createConnection(mongoURI);

//Initialize GFS
let gfs;

const conn = async () => {
    gfs = Grid(await dbConnection(),mongo);
    gfs.collection('uploads')
}
await conn(); 
console.log("MongoURI"+mongoURI);

//Creat Storage engine
//https://github.com/devconcept/multer-gridfs-storage
const storage = await new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }

});

const upload = await multer({storage});

//routes
await app.post("/upload", upload.single("file"), (req, res) => {
    //res.json({file:req.file})
    res.redirect("/")
})
await app.get("/", (req, res) => {
    //  res.render("layouts");
    gfs.files.find().toArray((err, files) => {
        //check files
        if (!files || files.length === 0) {
            res.render("layouts", { files: false })
        } else {
            files.map(file => {
                if (file.contentType === "image/jpeg" || file.contentType === "img/png" ) {
                    file.isImg = true
                } else if ( file.contentType === "video/mp4") {
                    file.isVid = true;
                } else {
                    file.isImg = false;
                    file.isVid= false;
                }
            })
            return res.render("layouts", { files: files })
        }

        //return res.json(file);
    });
})

app.get("/files", (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //check files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: "No files exist"
            });
        }
        console.log("Hello");
        console.log(files);
        return res.json(files);
    });
});


await app.get("/image/:filename", (req, res) => {
    const fname = req.params.filename;
    console.log(fname);
    gfs.files.findOne({ filename: fname }, (err, file) => {
        //check files
       
        if (!file || file.length == 0) {
            res.status(404).json({
                err: "No file exist"
            });
        }
        let readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res)
        //return res.json(file);
    });
});

//Display video file
await app.get("/files/:filename", (req, res) => {
    const fname = req.params.filename;
    console.log(fname);
    gfs.files.findOne({ filename: fname }, (err, file) => {
        //check files
       
        if (!file || file.length == 0) {
            res.status(404).json({
                err: "No file exist"
            });
        }
        return res.json(file);
    });
});
await app.listen(3000,()=> {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});

}

main().catch(error => {
    console.log(error);
  });