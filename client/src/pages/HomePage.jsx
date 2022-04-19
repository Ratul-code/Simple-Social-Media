import React, { useEffect, useState } from "react";
import Axios from "../axios";
import Appbar from "../components/Appbar";
import CircularProgress from '@mui/material/CircularProgress';
import Post from "../components/Post";

const HomePage = () => {
  // const auth = useAuth();
  const [pageLoading,setPageLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    const authToken = localStorage.getItem("authToken");
    const data  = await Axios.get("/api/post", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setPosts(data.data.posts);
  };
  
  useEffect(() => {
    fetchPost();
    setPageLoading(false);
  }, []);
  return (
    <>
      <Appbar />
      {!pageLoading?<div className="shadow-lg shadow-[#002884] bg-white my-1 rounded-md relative postfeed w-[100vw] md:w-[60vw] min-h-[calc(100vh-69.5px)] overflow-y-scroll flex flex-col m-auto px-2 pt-2 pb-9">
        {posts.map((post) => (
          <Post key={post._id} post={post} getPost={fetchPost} />
        ))}
      </div>:((<div className='w-[100vw] h-[calc(100vh-69.5px)] flex justify-center items-center'><CircularProgress color="primary" /></div>))}
    </>
  );
};

export default HomePage;
