import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAuth } from "../context/AuthContext";
import { IconButton } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import BasicModal from "./Modal";
import Axios from "../axios";

const Comment = ({ comment, post, setCommentList }) => {
  const { user } = useAuth();
  const authToken = localStorage.getItem("authToken");
  const [open, setOpen] = useState(false);
  const deleteComment = async () => {
    const { data } = await Axios.delete(
      `/api/post/${post._id}/${comment._id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    setCommentList(data.post.comments);
  };
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  useEffect(() => {}, []);
  return (
    <>
      <BasicModal
        open={open}
        setOpen={setOpen}
        title="Xoxopuxo"
        body="Are you sure about deleting the comment?"
        task={deleteComment}
      />
      <div className="flex justify-between w-[100%]">
        <div className="flex gap-1 max-w-[90%]">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrb7XeVpElaj3yF0M2zBadpBwR1H32HQQumw&usqp=CAU" alt="R" className="w-[40px] h-[40px] rounded-[50%]" />
          <div className="max-w-[80%] lg:max-w-[90%]">
            <div className="bg-gray-300 rounded-2xl px-3 py-2">
            <h2 className="font-semibold">{comment.username===user.username?"You":comment.username}</h2>
            <p className="break-words" >{comment.body}</p>
            </div>
            <p className="ml-1 text-gray-500">{moment(comment.createdAt).fromNow()}</p>
          </div>

        </div>

        {comment.username === user.username ? (
          <IconButton onClick={handleClick} color="red" size="medium">
            <AiOutlineDelete />
          </IconButton>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Comment;
