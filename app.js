const express=require("express");
const bodyParser=require("body-parser");
const date= require(__dirname+"/date.js");

const app= express();

let items=["Play Chess","Learn Web Dev","Learn Data Structures"];
let workItems=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
   
    let day=date;   

    res.render("list",{
     listTitle: day,
     newListItems: items
    });


});

app.post("/",function(req,res){
  
   let item= req.body.newItem; 
   if(req.body.list === "Work") {
   workItems.push(item);
   res.redirect("/work");
   }
   else{
        items.push(item);
   res.redirect("/");
    

   }

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



app.listen(process.env.PORT||4000,function(){
    console.log("Server started at port 4000");

});