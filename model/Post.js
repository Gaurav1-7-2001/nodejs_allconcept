const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const postSchema= mongoose.Schema({
    postTitle:{
        type:String,
        required:true
    },
    postDescription:{
        type:String,
        require:true
    },
    photo:{
        type:String
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});


postSchema.pre('save',async function(next){
    if(!this.isModified('password'))next();
    try {
        const salt =await bcrypt.genSalt(10);
        const hash =await bcrypt.hash(this.password,salt);
        this.password=hash;
        next();

    } catch (error) {
        return next(error);
    }

})


postSchema.methods.comparePassword=async function(inputPass){
    try {
        const verifypass = await bcrypt.compare(inputPass,this.password);
        return verifypass
    } catch (error) {
        throw(error)
    }
}



const Post=mongoose.model('Post',postSchema)

module.exports=Post;