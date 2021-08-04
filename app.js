const express=require("express");
const bodyParser=require("body-parser");

const app= express();

var items=["Play Chess","Learn Web Dev","Learn Data Structures"];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  

    var today=new Date();
    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    var day=today.toLocaleDateString("en-US",options);


    res.render("list",{
     kindOfDay: day,
     newListItems: items
    });


});

app.post("/",function(req,res){

   var item= req.body.newItem;
   items.push(item);
   res.redirect("/");
    

});

app.listen(process.env.PORT||3000,function(){
    console.log("Server started at port 3000");

});