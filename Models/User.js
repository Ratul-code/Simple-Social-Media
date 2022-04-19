const {model,Schema} = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:[true,"Username must not be empty"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email must not be empty"],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        required:[true,"Password must not be empty"]
    },
    createdAt:String
})

userSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
});

module.exports = model("User",userSchema);