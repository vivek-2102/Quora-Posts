const express=require("express");
const app=express();
const path=require("path");
const port=8080;
const {v4:uuidv4}=require('uuid');
const methodOverride=require("method-override");
 
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});

let posts=[
    {
        id:uuidv4(),
        username:"apna college",
        content:"i love coding"
    },
    {
        id:uuidv4(),
        username:"vivek chaurasia",
        content:"i love "
    },
    {
        id:uuidv4(),
        username:"vishnu",
        content:"i love somebody"
    },
];//const bnayenge to delete nhi kr payenge

app.get("/",(req,res)=>{
    res.send("server working well");
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    // console.log(post);
    if(post)
res.render("show.ejs",{post});
else
res.send("not found");
})

app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username , content});
    // res.send("post request working");
    res.redirect("/posts");
})


app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
let newContent=req.body.content;
let post=posts.find((p)=>id===p.id);
if(post)
post.content=newContent;
console.log(post);
    // res.send("patch working");
res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
     
    let post=posts.find((p)=>id===p.id);
    if(post)
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     
     posts=posts.filter((p)=>id!=p.id);
    
    // res.render("edit.ejs",{post});
// res.send("delete success");
res.redirect("/posts");
})

