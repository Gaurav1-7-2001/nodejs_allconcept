const express=require('express');
const app =express();
const bodyParser=require('body-parser');
const passport =require('./auth')
app.use(bodyParser.json());

const db=require('./db');

app.use(passport.initialize());
const authMiddleware=passport.authenticate('local',{session:false})

const postRoutes=require('./routes/postRoutes');
app.use('/post',postRoutes);
//comment
app.get('/',(req,res)=>{
    res.send('Welcome to Pagination page');
})

app.listen(3000,()=>{
    console.log("Listening on port 3000....");
    
})