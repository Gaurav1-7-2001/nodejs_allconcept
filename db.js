const mongoose= require('mongoose');

const mongoUrl='mongodb://localhost:27017/pagination';

mongoose.connect(mongoUrl);

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to mongodb..");
    
})

db.on('error',(err)=>{
    console.log("error to mongodb..",err);
    
})

db.on('disconnected',()=>{
    console.log("DisConnected to mongodb..");
    
})

module.exports=db;