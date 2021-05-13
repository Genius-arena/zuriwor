var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
// var expressSanitizer = require("express-sanitizer")
var express = require("express");
var app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_crud_appo", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// // MONGOOSE MODEL CONFIG
// var blogSchema = new mongoose.Schema({
//     title: String,
//     image: String,
//     body: String,
//     created: { type: Date, default: Date.now }
// });
// var Blog = mongoose.model("Blog", blogSchema);

var crudSchema = new mongoose.Schema({
    message: String,
    data: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            // ref: "User"
        },
        name: String,
        email: String,
        country: String
    },
});

var Crud = mongoose.model("Crud", crudSchema);

Crud.create({
    name: "Peter Chinedu",
    email: "amaka418@gmail,com",
    country: "Nigeria"
});


// RESTFUL ROUTES


app.get("/", function (req, res) {
    res.redirect("/cruds");
});

app.get("/cruds", function (req, res) {
    Blog.find({}, function (err, cruds) {
        if (err) {
            console.log("ERROR");
        } else {
            if (res.status == 200) {
                res.send({ meassage: "request was succesful" });
            } else {
                res.send({ meassage: "request was not succesful" });
            }
            res.send({
                name,
                email,
                country
            })
        }
    });
});

// UPDATE ROUTE
app.put("/cruds/:id", function (req, res) {
    req.body.blog.body = req.sanitize(req.body.crud.body);
    Crud.findByIdAndUpdate(req.params.id, req.body.crud, function (err, updatedCrud) {
        if (err) {
            res.redirect("/cruds");
        } else {
            res.redirect("/cruds/" + req.params.id);
        }
    });
});

// Delete Route
app.delete("/cruds/:id", function (req, res) {
    Crud.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/cruds");
        } else {
            res.redirect("/cruds");
        }
    });
});

app.listen(process.env.PoRT || 3000, function () {
    console.log("SERVER IS RUNNING FOR CRUD APP");
});
