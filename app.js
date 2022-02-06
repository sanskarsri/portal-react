const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

const saltRounds = 10;
const myPlaintextPassword = 'usedforhash';


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// IMPORTANT 
app.use(express.json());
app.use(cookieParser());


mongoose.connect('mongodb+srv://sanskar:database.find()@firstdatabase.5taea.mongodb.net/registerid',{useNewUrlParser: true});

  const registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String
 });

  const Post = mongoose.model("post",registerSchema);



app.post("/data",function(req,res){

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);  
   
    // console.log(req);
     const val = new Post ({ 
        name: req.body.fname,
        email: req.body.email,
        phone: req.body.phone,
        password: hash
      });

    val.save(function(err)
    {
        if(err)
        console.log(err);
    });
    res.status(201).json({message: "Thanks for your feedback"});

});

// const verifyJWT = async (res,req,next) =>{
  // try{
  //   const token = req.cookies.token;
  //   const verifyToken = jwt.verify(token,"secret");
  //   const user = await Post.findOne({_id:verifyToken});

  //   if(!user)
  //   { throw new Error("No User") }

  //   req.token=token;
  //   console.log("user" ,user); 
  //   next();
  // }
  // catch(err){
  //     res.status(401).send("UnAuthorized");
  //     console.log(err);
  // }
  // let token = req.cookies.token;

  //  if(!token)
  //  res.send("UnAuthorized");
  //  else
  //  {
  //    const verifyToken = jwt.verify(token,"secret");

  //    const user = await Post.findOne({_id:verifyToken});

  //    req.auth=user;
  //    console.log("user" ,user); 
  //    if(!user)
  //    {
  //     console.log("NO valid user");
  //     // res.status(201).json({auth: "false"});
  //    }
  //    else
  //    {
  //     //  req.token=token;
  //      next();
  //    }
  //  }
// };

app.get("/isUserAuth", function(req,res){
  console.log("hello auth");

  try{
    const token = req.cookies.token;
    const verifyToken = jwt.verify(token,"secret");
    const user = Post.findOne({_id:verifyToken});

    if(!user)
    { throw new Error("No User") }

    req.token=token;
    console.log("user" ,user); 
    res.status(201).json({message: "Authorized",auth: "true"});
  }
  catch(err){
      res.status(201).json({message: "UnAuthorized",auth: "false"});
      console.log(err);
  }
});

app.post("/login",function(req,res){

    // res.status(201).json({message: "Login tried"});
     Post.findOne({email: req.body.email}, function(err,foundUser){
    if(err)
    console.log(err);
    else
    {
      if(foundUser)
      {
        // console.log(foundUser);
        var token = jwt.sign({ id: foundUser._id}, 'secret',{expiresIn: '1h'});

        bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
          if(err)
          console.log(err);

          if(result === true){
            res.cookie("token",token,{
              httpOnly: true,
            });
          res.status(201).json({message: "Success"});

        }
          else 
          res.status(201).json({message: "Fail"});
      });
      }
      else
      res.status(201).json({message: "Fail"});

    }
  });
  

});


const PORT=process.env.PORT||5000;

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
});