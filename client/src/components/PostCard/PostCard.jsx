import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import styles from "./PostCard.module.css";
import { useAuth } from "../../context/AuthContext";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { MdOutlineAddComment } from "react-icons/md";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const PostCard = ({ post }) => {
  const [postState, setPostState] = useState(post);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      const res = await axiosInstance.post(`/toggleLike/${postState?._id}`);
      setPostState(res.data.post);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTextActionContainer}>
        <div className={styles.cardTextContainer}>
          <h3 className={styles.user}>{user ? (user?.id == postState?.author?._id) ? 'You' : postState?.author.name : postState?.author.name}</h3>
          <p className={styles.text}>{postState?.text}</p>
        </div>

        <div className={styles.actions}>
          <div className={styles.like} onClick={handleLike}>{postState?.likes.includes(user.id) ? <IoMdHeart className={`${styles.heartIcon} ${styles.heartFull}`} /> : <IoMdHeartEmpty className={`${styles.heartIcon} ${styles.heartEmpty}`} />}<span>{postState?.likes.length}</span></div>
          <div className={styles.comment}><MdOutlineAddComment className={styles.commentIcon} /></div>
        </div>
      </div>

      {postState?.image && (
        <img src={postState?.image} alt="post" className={styles.image} />
      )}
    </div>
  );
};

export default PostCard;
