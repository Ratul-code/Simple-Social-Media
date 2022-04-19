import React, { useEffect, useState } from "react";
import { IconButton, TextField, Button,CircularProgress } from "@mui/material";
import {
  FaRegThumbsUp,
  FaRegComment,
  FaThumbsUp,
  FaShare,
} from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import Axios from "../axios";
import moment from "moment";
import { useAuth } from "../context/AuthContext";
import Comment from "../components/Comment";

const Post = ({ post,getPost }) => {
  const { user } = useAuth();
  const authToken = localStorage.getItem("authToken");
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState();
  const [showBtn, setShowbtn] = useState(false);
  const [comment, setComment] = useState("");
  const [commentlist, setCommentList] = useState(post.comments);

  const likePost = async () => {
    setLiked((prevState) => !prevState);
    const { data } = await Axios.get(`/api/post/${post._id}/likepost`, {
      headers: {
        withCredentials: true,
        Authorization: `Bearer ${authToken}`,
      },
    });
    setLikeCount(data.likes);
  };
  const commentPost = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      setComment("");
      return;
    }
    setShowbtn(true);
    const {
      data: { comments },
    } = await Axios.post(
      `/api/post/${post._id}/comment`,
      {
        body: comment,
      },
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    setComment("");
    setCommentList(comments);
  };
  const [postLoading,setPostLoading] = useState(true);
  const deletePost = async ()=>{
    setPostLoading(true);
    try {
      await Axios.delete(`/api/post/delete/${post._id}`,{
        headers:{
          Authorization:`Bearer ${authToken}`
        }
      });
      getPost();
    } catch (error) {
      console.log(error.response);
    }
    setPostLoading(false);
  }

  useEffect(() => {
    const likedState = post.likes.filter(
      (like) => like?.username === user?.username
    );
    setLiked(likedState[0] ? true : false);
    setLikeCount(post.likes.length);
    setPostLoading(false);
  },[]);
  return postLoading?(<div className='w-[100%] h-[100%] flex justify-center items-center'><CircularProgress color="primary" /></div>):(
    <div className="w-[100%] p-3 flex flex-col gap-2">
      <div className="w-[100%] flex justify-between pr-2">
        <div>
          <p className="text-gray-700 font-extrabold">{post?.username===user?.username?"You":post?.username}</p>
          <p className="mt-[-4px] text-[#455a64] text-[13px] font-thin">
            {moment(post?.createdAt).fromNow()}
          </p>
        </div>
        {post?.username === user?.username && (
          <Button
            sx={{ color: "white" }}
            color="red"
            variant="contained"
            size="small"
            onClick={deletePost}
          >
            Delete Post
          </Button>
        )}
      </div>
      <h3 className="text-[#002884] font-bold italic tracking-wider text-xl" >{post.title}</h3>
      <h6>
        {post.body}
      </h6>
      <div className="flex justify-between" >
        {likeCount ? (
          <div className="text-gray-500 flex gap-[3px] items-center font-semibold">
            <FaThumbsUp />
            <p className="text-[18px] font-bold mt[-2px]">{likeCount}</p>
          </div>
        ) : (
          ""
        )}
        {commentlist.length?<div className="text-gray-500 flex gap-[3px] items-center font-semibold">
            <p className="text-[18px] font-bold mt[-2px]">{commentlist.length} comments </p>
          </div>:""}
      </div>

      <hr />
      <div className="w-[100%] flex justify-around">
        <IconButton
          // size="small"
          sx={{
            borderRadius: "8px",
            px: "%",
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            fontSize:"0.9rem",
            letterSpacing:"1px",
            '@media screen and (min-width: 768px)': {fontSize:"1.1rem",px:"10%"}
          }}
          onClick={likePost}
          color={liked ? "primary" : "darkgray"}
        >
          {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}Like
        </IconButton>
        <IconButton
          sx={{
            borderRadius: "8px",
            px: "%",
            display: "flex",
            gap: "5px",
            justifyContent: "center",
                        fontSize:"0.9rem",
            letterSpacing:"1px",
            '@media screen and (min-width: 768px)': {fontSize:"1.1rem",px:"10%"}
          }}
          color={showBtn ? "primary" : "darkgray"}
          onClick={() => setShowbtn((state) => !state)}
        >
          <FaRegComment /> Comments
        </IconButton>
        <IconButton
          disabled
          sx={{
            borderRadius: "8px",
            px: "%",
            display: "flex",
            gap: "5px",
            justifyContent: "center",
                        fontSize:"0.9rem",
            letterSpacing:"1px",
            '@media screen and (min-width: 768px)': {fontSize:"1.1rem",px:"10%"}
          }}
          color="darkgray"
        >
          <FaShare /> Share
        </IconButton>
      </div>
      <hr />
      <div className="w-[100%] flex flex-col gap-2">
        {showBtn
          ? commentlist.map((comment) => (
              <Comment
                setCommentList={setCommentList}
                key={comment._id}
                post={post}
                comment={comment}
              />
            ))
          : ""}
      </div>
      {showBtn&&<form className="px-2 relative" onSubmit={commentPost}>
        <TextField
          required
          sx={{ pr: "40px" }}
          autoComplete="off"
          id="standard-basic"
          label="Add a comment"
          fullWidth
          variant="standard"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type="submit"
          sx={{
            borderRadius: "20px",
            fontSize: "20px",
            position: "absolute",
            bottom: "8px",
            right: "0px",
          }}
          size="small"
          color="primary"
        >
          {comment.trim() !== "" && <AiOutlineSend />}
        </Button>
      </form>}
    </div>
  );
};

export default Post;
