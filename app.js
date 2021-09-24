const express=require("express");
const bodyParser=require("body-parser");

const mongoose=require("mongoose");

const app= express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});

const itemsSchema =new mongoose.Schema({
    _id:mongoose.Schema.ObjectId,
    name:String
});

const Item= mongoose.model("Item",itemsSchema); //singular version "Item" , btw this is the model name
Item._id = mongoose.Types.ObjectId('000000000000000000000001');


const item1=new Item({
  
    name:"Welcome to Pranab's todo list!!!"
});
const item2=new Item({
  
    name:"Hit the + Button to add a new item"
});
const item3=new Item({
   
    name:"<-----Hit this to delete an item"
});

const defaultItems=[item1,item2,item3];




app.get("/",function(req,res){
   
Item.find({},function(err,foundItems){

if(foundItems.length === 0){
             Item.insertMany(defaultItems,function(err){
    if(err)
    console.log(err);
    else
    console.log("Successfully saved default items to database");

});

res.redirect("/");
}

else{
     res.render("list",{   // this list is the list.ejs file not the button
     listTitle: "Today",
     newListItems: foundItems
    });

    }
});

});

app.post("/",function(req,res){
  
   let itemName= req.body.newItem;
   const item=new Item({
    name:itemName,
    _id: mongoose.Types.ObjectId()   

   }); 

   item.save();
   res.redirect("/");

});

app.post("/delete",function(req,res){
   const checkedItemId = req.body.checkbox;
   console.log(checkedItemId);
   Item.findByIdAndRemove(checkedItemId,function(err){
       if(!err){
           console.log("Successfully deleted checked item.");
           res.redirect("/");
       }


   });
   

});

app.get("/work",function(req,res){
     res.render("list",{                         //here list is the list.ejs file
         listTitle: "Work List",
         newListItems: workItems
    });
});

app.get("/about",function(req,res){
    res.render("about"); //rendering about.ejs



});



app.listen(process.env.PORT||3006,function(){
    console.log("Server started at port 4000");

});