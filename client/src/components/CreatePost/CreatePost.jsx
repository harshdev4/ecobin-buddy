import React, { useRef, useState } from "react";
import styles from "./CreatePost.module.css";
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ addPost, fetchPosts}) => {
  const [text, setText] = useState("");
  const imageInputRef = useRef(null)
  const uploadedImageRef = useRef(null)
  const dragContentImageRef = useRef(null);
  const navigate = useNavigate(); 
  
  const { user, loading, setLoading } = useAuth();

  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  const handlePost = async () => {
    if(!user){
      navigate('/login');
    }

    if (!text && !file) return;

    setText("");
    setImagePreview(null);
    setFile(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', text);

    try {
      setLoading(true);
      const res = await axiosInstance.post('/submit-post', formData);
      await fetchPosts();
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }

  };

  const handleBrowseImage = () => {
    imageInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file)
    }
  }

  const handleAddDragOver = (e) => {
    e.preventDefault()
    dragContentImageRef.current.classList.add(styles.dragActive)
  }

  const handleRemoveDragOver = (e) => {
    e.preventDefault()
    dragContentImageRef.current.classList.remove(styles.dragActive)
  }

  const handleDropImage = (e) => {
    e.preventDefault()
    dragContentImageRef.current.classList.remove(styles.dragActive)
    const file = e.dataTransfer.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
      };

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Create Post</h3>


      <div className={styles.imageInfoDiv}>
        <div className={`${styles.imageFileContainer} ${styles.uploadedImageFileContainer}`}>
          <input
            ref={imageInputRef}
            type="file"
            name="uploadedImage"
            accept="image/*"
            className={`${styles.imageInput} ${styles.fileInput}`}
            onChange={handleImageChange}
          />

          {imagePreview ? (
            <div className={styles.previewImageContainer}>
              <img
                ref={uploadedImageRef}
                src={imagePreview}
                alt="Uploaded"
                className={styles.uploadedImage}
              />
              {/* <div className={styles.imageBtnWrapper}>
                <button
                  type="button"
                  className={`${styles.button} ${styles.changeImageButton}`}
                  onClick={handleBrowseImage}
                >
                  Change Image
                </button>
              </div> */}
            </div>
          ) : (
            <div
              ref={dragContentImageRef}
              className={styles.dragContent}
              onDragOver={handleAddDragOver}
              onDragLeave={handleRemoveDragOver}
              onDrop={handleDropImage}
            >
              <p className={styles.fileUploadText}>Drag & Drop to Upload File</p>
              <p className={styles.fileUploadTextOR}>OR</p>
              <button
                type="button"
                className={`${styles.addFile} ${styles.addImage}`}
                onClick={handleBrowseImage}
              >
                Browse File
              </button>
            </div>
          )}
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Share something with the community..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button className={styles.postBtn} onClick={handlePost}>Post</button>
    </div>
  );
};

export default CreatePost;
