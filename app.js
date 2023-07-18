//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash'); 

const homeStartingContent = "This is a a sample data to display. Please add you content on Home page, Thank you!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

let globalData = [];

app.get ("/", function(req,res) {
  res.render("home", { homeStartingContent : homeStartingContent, globalData:globalData,
  });
})


app.get ("/about", function(req,res) {
  res.render("about", { aboutContent : aboutContent });
})

app.get ("/contact-us", function(req,res) {
  res.render("contact", { contactContent : contactContent });
})


app.get ("/compose", function(req,res) {
  res.render("compose");
})

app.get("/globalData/:postName", function(req, res) {
  const reqTitle = _.lowerCase(req.params.postName);

  globalData.forEach(function(formData) {
    const storeTitle = _.lowerCase(formData.inputValue);

    if (storeTitle === reqTitle ) {
      res.render("post", {
        title: formData.inputValue,
        content: formData.inputContent
      });
    }
  })

})

app.post ("/compose", function(req,res) {
  const formData = {
    inputValue: req.body.inputValue,
    inputContent: req.body.inputContent
  }
  globalData.push(formData);
  res.redirect('/');
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});


