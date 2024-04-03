import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userScheme = mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
});


userScheme.pre('save', async function(next){
    if(!this.isModified('password')){
         next();
    }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
})

userScheme.methods.matchPasswords = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}



const userModel = mongoose.model('User',userScheme)

export default userModel;