const express = require("express");
const Post = require("../model/Post");
const multer = require("multer");
const { generateToken } = require("../jwt");
const router = express.Router();

// set up multer stor file in local

// const storage= multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads');

//     },
//     filename:(req,file,cb)=>{
//         const suffix=Date.now();
//         cb(null,suffix +'-'+file.originalname);
//     }
// })

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const data = req.body;
    const path = req.file ? req.file.buffer.toString('base64') : null;
    const newPost = new Post({
      ...data,
      photo: path,
    });



    const response = await newPost.save();
    const payload={
        id:response.id,
        username:response.username
    }
    const token=generateToken(payload)

    console.log("data saved");
    res.status(200).json({token,response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

// pagination logic

router.get("/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const perPage = 3;
    const totalPost = await Post.countDocuments();
    const totalPage = Math.ceil(totalPost / perPage);

    if (page > totalPage)
      return res.status(404).json({ message: "page not found" });

    const post = await Post.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).json({ post, page, totalPage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error.." });
  }
});

// pagination logic

router.get('/logic/:page',async(req,res)=>{
    try {
        const page=req.params.page ||1;
        const perPage=2;
        const totalPost=await Post.countDocuments();
        const totalPage=Math.ceil(totalPost/perPage);
        if(page>totalPage)
            return res.status(404).json({message:"page not found"})

        const post=await Post.find()
        .skip((page-1)*perPage)
        .limit(perPage)

        res.status(200).json({post,page,totalPage});


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
        
    }
})




router.get("/", async (req, res) => {
  try {
    const data = await Post.find();
    console.log("data  fetch");
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
