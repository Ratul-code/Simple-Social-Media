const Post = require("../Models/Post");
const checkAuth = require("../utils/checkAuth");
const ErrorResponse = require("../utils/errorResponse");


exports.getPosts = async(req,res,next)=>{
    const user = checkAuth(req,next);
    if(user){
        const posts = await Post.find();
        // const posts = postlist.filter(post=>post.username!==user.username);
        // const posts = postlist;
        return res.json({
            postsCount:posts.length,
            posts
        })
    }
}


exports.createPost = async(req,res,next)=>{
    const user = checkAuth(req,next);
    try {
        const {title,body} = req.body
        if(user){
            const post = await Post.create({
                title,
                body,
                username:user.username,
                createdAt:new Date().toISOString()
            });
            return res.json({
                post
            })
        }        
    } catch (error) {
        next(error);
    }

}


exports.commentPost = async(req,res,next)=>{
    const user = checkAuth(req,next);
    try {
        const postId = req.params.postId;
        const {body} = req.body
        if(user){
            const post = await Post.findById(postId);
            if(post){
                
                post.comments.unshift({
                    body,
                    username:user.username,
                    createdAt:new Date().toISOString()
                })
                await post.save();
                return res.json({
                    comments:post.comments
                })
            }
            return next(new ErrorResponse("Post not found",404))
        }
    } catch (error) {
        next(error)
    }

}


exports.deleteComment = async(req,res,next)=>{
    const user = checkAuth(req,next);
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        if(user){
            const post = await Post.findById(postId);
            if(post){
                const commentIndex = post.comments.findIndex(comment=>comment.id===commentId);
                if(commentIndex===-1){
                    return next(new ErrorResponse("Comment not found",404));
                }       
                if(post.comments[commentIndex].username===user.username){
                    post.comments.splice(commentIndex,1);
                    await post.save();
                    return res.json({
                        post
                    })
                }
                return next(new ErrorResponse("Action not allowed",401));
            }
            return next(new ErrorResponse("Post not found",404));
        }
    } catch (error) {
        next(error)
    }

}


exports.likePost = async(req,res,next)=>{
    const user = checkAuth(req,next);
    try {
        const postId = req.params.postId;
        if(user){
            const post = await Post.findById(postId);
            if(post){
                if(post.likes.find(like=>like.username===user.username)){
                    post.likes = post.likes.filter(like=>like.username!==user.username)
                    await post.save();
                    return res.json({
                        likes:post.likes.length,
                        liked:false
                    })
                }
                post.likes.push({
                    username:user.username,
                    createdAt:new Date().toISOString()
                })
                await post.save();
                return res.json({
                    likes:post.likes.length,
                    liked:true
                })                
            }
            return next(new ErrorResponse("Post not found",404))
        }
    } catch (error) {
        next(error)
    }

}


exports.deletePost = async(req,res,next)=>{
    const user = checkAuth(req,next);
    try {
        const postId = req.params.postId
        if(user){
            const post = await Post.findById(postId);
            if(!post){
                return next(new ErrorResponse("Post not found",404))
            }
            if(post.username===user.username){
                await post.delete();
                return res.json({
                    success:true
                })
            }
            return next(new ErrorResponse("Action not allowed",400))
        }        
    } catch (error) {
        next(error);
    }
}