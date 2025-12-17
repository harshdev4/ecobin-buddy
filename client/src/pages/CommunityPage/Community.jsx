import React, { useEffect, useState } from "react";
import styles from "./Community.module.css";
import CreatePost from "../../components/CreatePost/CreatePost.jsx";
import PostCard from "../../components/PostCard/PostCard.jsx";
import { axiosInstance } from "../../utils/axiosInstance.js";
import { useAuth } from "../../context/AuthContext.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const {setUrlLocation} = useAuth();
  
  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get('/fetch-posts');
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  const {loading} = useAuth();

  useEffect(() => {
    setUrlLocation("community");
    fetchPosts();
  }, []);

  const addPost = (post) => {
    setPosts([post, ...posts]);
    fetchPosts();
  };

  return (
    <div className={styles.container}>
      {loading && <Loader/>}
      <h1 className={styles.heading}>Community</h1>
      <p className={styles.subheading}>
        See what other eco-warriors are up to and share your own journey 🌍
      </p>

      <CreatePost addPost={addPost} fetchPosts={fetchPosts}/>

      <div className={styles.lineBreak}/>
      <div className={styles.feed}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Community;
