const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts =[
    {
        id:uuidv4(),
        username:"dishant",
        content: "I love Coding!"
    },

    { 
        id:uuidv4(),
        username: "Virat Kohli",
        content:"Greatest Player Of All Time!"
    },
    {
        id:uuidv4(),
        username:"Arvind Kejriwal",
        content:" Good Leader in Current Time"
    }
]

app.get("/posts",(req,res)=>{
   res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})


app.get("/posts/:id",(req,res)=>{
   let {id} = req.params;
   let post = posts.find((p)=> p.id===id);
   console.log(post);
   res.render("show.ejs",{post});
})

app.post("/posts/:id",(req,res)=>{
    res.redirect("show.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.patch("/posts/:id",(req,res)=>{
    let {id }= req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> p.id===id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id }= req.params;
    let post = posts.find((p)=> p.id===id);
    res.render("edit.ejs",{post});

})

app.delete("/posts/:id",(req,res)=>{
    let {id }= req.params;
     posts = posts.filter((p)=> id!==p.id);
     res.redirect("/posts");
})

app.get("/",(req,res)=>{
    res.send("server working well");
})


app.listen(port,()=>{
    console.log(`Server listen on Port ${port}`);
})