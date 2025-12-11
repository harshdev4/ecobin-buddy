import React from "react";
import styles from "./PostCard.module.css";

const PostCard = ({ post }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTextActionContainer}>
        <div className={styles.cardTextContainer}>
          <h3 className={styles.user}>{post.author.name}</h3>
          <p className={styles.text}>{post.text}</p>
        </div>

        <div className={styles.actions}>
          <span className={styles.like}>❤️ {post.likes.length}</span>
          <span className={styles.comment}>💬 Comment</span>
        </div>
      </div>

      {post.image && (
        <img src={post.image} alt="post" className={styles.image} />
      )}
    </div>
  );
};

export default PostCard;
