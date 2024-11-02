import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import multer from "multer";
import bodyParser from "body-parser";
const upload = multer({ dest: "uploads/" });

const app = express();
const port = 3000;

app.use(express.static("public"));

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Use urlencoded middleware
app.use(bodyParser.json()); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

const uploadfile = multer({ storage });


const blogs=[];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/home", (req, res) => {
  res.render("home.ejs" , {blogs: blogs});
});

app.get("/blog", (req, res) => {
    res.render("blog.ejs", { blogs: blogs });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

// app.post("/upload-img", uploadfile.single("file"), (req, res) => {
//   console.log(req.body);
//   console.log(req.file);

//   return res.redirect("/create");
// });

app.post("/upload-form",uploadfile.single("file"),(req,res) =>{
    const { path } = req.file;
    const { textarea } = req.body;
    const title=textarea[0];
    const description=textarea[1];

    const newBlog={path: path.replace(/^public\//, ''),title,description};
    blogs.push(newBlog);
    console.log(blogs.length);
    console.log(path);

    res.render("blog.ejs", {blogs: blogs});
});

app.get("/know-more/:id", (req, res) => {
  const blogIndex = req.params.id;
  const blogData = blogs[blogIndex];

  if (blogData) {
    res.render("know-more.ejs", { blogData: blogData }); 
  } else {
    res.render("know-more.ejs", { blogData: null }); 
  }
});


app.get("/know-more",(req,res)=>{
  res.render("know-more.ejs");
});

app.get("/contact",(req,res)=>{
  res.render("contact.ejs");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
