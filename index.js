import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let userName = "";
const blogs = [];
const foodImages = [

  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",

    "https://img.freepik.com/free-vector/hand-drawn-mexican-food-illustration_52683-89540.jpg",

    "https://i.pinimg.com/236x/28/41/da/2841da28e09495496335569c8bfff9dd.jpg",

  "https://celcliptipsprod.s3-ap-northeast-1.amazonaws.com/tips_article_body/3c96/925618/96140aad694e6209725819b555709f23",

  "https://static.vecteezy.com/system/resources/previews/004/922/866/non_2x/teriyaki-meat-steak-rice-bowl-with-a-branch-of-tomatoes-egg-and-asparagus-top-view-hand-drawing-in-realistic-cartoon-style-isolated-on-white-background-asian-food-illustration-vector.jpg",

  "https://myweekendplan.asia/wp-content/uploads/2021/05/Realistic-Food-Drawings-12-1024x683.jpg",

  "https://png.pngtree.com/png-clipart/20250805/original/pngtree-elegant-fried-rice-illustration-with-tofu-egg-and-fresh-garnish-png-image_19771657.png",

  "https://thumbs.dreamstime.com/b/watercolor-illustration-poke-bowl-salmon-avocado-pomegranate-painting-filled-fresh-ingredients-colorful-vibrant-372075703.jpg",

  "https://videocdn.cdnpk.net/videos/cca15d0e-88b6-4b64-943a-9448ae2052c0/horizontal/thumbnails/large.jpg",

  "https://media.istockphoto.com/id/1388982408/vector/bowl-topped-with-egg-tomato-avocado-and-string-beans.jpg?s=612x612&w=0&k=20&c=oU01W_XI1A30eaoONvS3yPoB_cFjwUBw3ZDDefqfR7E=",

  "https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Food_Illustration_19_1024x1024.webp?v=1752063350",

  "https://freepng.com/uploads/images/202311/Vector-healthy-food-in-hand-symbol-cartoon-illustration-png_1020x-3870.jpg",

  "https://media.gettyimages.com/id/2157231934/vector/south-indian-breakfast-masala-dosa-served-with-coconut-chutney-and-sambar.jpg?s=612x612&w=gi&k=20&c=8dciXLEIBL4iJTn_YmTWTgBygEJgYbfgd_VMHTsOB5Y=",

  "https://livwanillustration.com/portfolio/food/stuffed-chayote-food-illustration.jpg"

];

app.get("/", (req, res) => {
res.render("index", {
    name: userName,
    blogs: blogs
  });
});

app.post("/submit", (req, res) => {
userName = req.body.name;
res.render("index", {
    name: userName,
    blogs: blogs
  });
});

app.get("/create", (req, res) => {
res.render("create", {
    name: userName
  });
});

const randomImage = foodImages[
  Math.floor(Math.random() * foodImages.length)
];

app.post("/publish", (req, res) => {
const newBlog = {
id: Date.now(),
title: req.body.title,
content: req.body.content,
category: req.body.category,
author: userName,
image:randomImage
};

blogs.push(newBlog);
res.render("index", {
    name: userName,
    blogs: blogs
  });
});

app.get("/about", (req, res) => {
res.render("about");
});

app.get("/contact", (req, res) => {
 res.render("contact");
});

app.post("/delete/:id", (req, res) => {
const blogId = Number(req.params.id);
const filteredBlogs = blogs.filter(
    (blog) => blog.id !== blogId
  );
 blogs.length = 0;
 blogs.push(...filteredBlogs);
res.render("index", {
    name: userName,
    blogs: blogs
  });
});

app.get("/edit/:id", (req, res) => {
const blogId = Number(req.params.id);
const foundBlog = blogs.find(
 (blog) => blog.id === blogId
  );
 res.render("edit", {
    blog: foundBlog
  });
});

app.post("/update/:id", (req, res) => {
const blogId = Number(req.params.id);
const foundBlog = blogs.find(
    (blog) => blog.id === blogId
  );
if (!foundBlog) {
return res.send("Blog not found");
}
foundBlog.title = req.body.title;
foundBlog.content = req.body.content;
foundBlog.category = req.body.category;
res.render("index", {
    name: userName,
    blogs: blogs
  });
});

app.listen(port, () => {
console.log(`Listening on port ${port}`);
});