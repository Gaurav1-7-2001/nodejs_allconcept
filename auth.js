const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Post = require('./model/Post');

passport.use(
    new LocalStrategy(
        async(username,password,done)=>{
            try {
                const user= await Post.findOne({username:username});
                if(!user)
                    return done(null,false,{message:"invalid email id"})
                const pass=await user.comparePassword(password);
                if(!pass){
                    return done(null,false,{message:"invalid password"});
                }else{
                    return done(null,user);
                }

            } catch (error) {
                return done(error);
            }
        }
    )
)

module.exports=passport;