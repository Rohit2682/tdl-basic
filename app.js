const express = require("express");
const app = express()
const bodyParser = require("body-parser")

// require mongoose
const mongoose = require("mongoose")


// connect to local db
mongoose.connect("mongodb://localhost:27017/itemsDB")


// mongoose schema
const itemSchema = new mongoose.Schema({
  item: String
})


// create collection 
const Item = new mongoose.model("Item", itemSchema)


// do not need to require




// use static files
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  Item.find({},(err,foundItems)=>{
if(!err){
  res.render("list",{
    allItems: foundItems
  })
}
  })
})

app.post("/", (req, res) => {
  var newItem = req.body.itemAdded

  const item = new Item({
    item: newItem
  })
  item.save()


  res.redirect("/")
})


app.listen(3000, () => {
  console.log("server started in port : 3000 ")
})