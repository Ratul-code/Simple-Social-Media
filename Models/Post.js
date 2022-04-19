
const {model,Schema} = require("mongoose");

const postSchema = new Schema({
    title:{
        type:String,
        required:[true,"Title must not be empty"]
    },
    username:String,
    body:{
        type:String,
        required:[true,"Body must not be empty"]
    },
    createdAt:String,
    comments:[
        {
            username:String,
            body:String,
            createdAt:String,
        }
    ],
    likes:[
        {
            username:String,
            createdAt:String
        }
    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }

});

module.exports = model("Post",postSchema);