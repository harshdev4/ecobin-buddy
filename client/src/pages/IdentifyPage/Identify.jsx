import React, { useEffect, useRef, useState } from 'react'
import styles from './Identify.module.css'
import { axiosInstance } from '../../utils/axiosInstance'
import Loader from '../../components/Loader/Loader'
import { ImBin } from "react-icons/im";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Identify = () => {
  const imageInputRef = useRef(null)
  const uploadedImageRef = useRef(null)
  const dragContentImageRef = useRef(null);
  const navigate = useNavigate();
  const {user, setUrlLocation} = useAuth();

  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [mimeType, setMimeType] = useState(null);
  const [pending, setIsPending] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(()=>{
    setUrlLocation("analyse-image");
  }, []);

  const colorMap = {
    blue: '#3B82F6',   // Tailwind bg-blue-500
    green: '#22C55E',  // Tailwind bg-green-500
    yellow: '#EAB308', // Tailwind bg-yellow-500
    black: '#1F2937',  // Tailwind bg-gray-800
    red: '#EF4444',    // Tailwind bg-red-500
    brown: '#B45309',  // Tailwind bg-amber-700
    null: '#9CA3AF'    // Tailwind bg-gray-400
  };

  const binColorHex = colorMap[result?.disposal_instruction?.recycling_bin?.color || 'null'] || colorMap['null'];


  const handleBrowseImage = () => {
    imageInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setMimeType(file.type);
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
    setMimeType(file.type);
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
      };

      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if(!user){
      navigate('/login');
    }

    if (!file || !mimeType) {
      return;
    }
    setIsPending(true)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mimeType', mimeType);
    try {
      const response = await axiosInstance.post('/analyse-image', formData);
      setResult(response.data.message);
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsPending(false);
    }
  }

  return (
    <>
      {pending && <Loader></Loader>}
      <div className={styles.identifyPage}>
        <h1 className={styles.heading}>Identify Waste Type</h1>
        <p className={styles.subheading}>
          Upload an image of waste and let AI identify its category.
        </p>
 
        {/* image uploading section */}
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
                <div className={styles.imageBtnWrapper}>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.changeImageButton}`}
                    onClick={handleBrowseImage}
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.changeImageButton}`}
                    onClick={handleSubmit}
                  >
                    Analyse Image
                  </button>
                </div>
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
        </div>


        {/* result displaying section */}
        {
          result && <div className={styles.resultDisplayDiv}>
            {
              result?.is_garbage ?
                <div className={styles.garbageAnalysisDiv}>
                  <h2 className={styles.analysisHeading}>Analysis Complete</h2>
                  <div className={styles.separater}></div>

                  <div className={`${styles.analysisMeta}`}>
                    <div className={`${styles.materialUsedDiv}  ${styles.metaDataDiv}`}>
                      <h4>Material Used</h4>
                      <h3>{result.material_used}</h3>
                    </div>

                    <div className={`${styles.compositionDiv} ${styles.metaDataDiv}`}>
                      <h4>Composition/Structure</h4>
                      <h3>{result.composition}</h3>
                    </div>

                    <div className={`${styles.decompositionTimeDiv} ${styles.metaDataDiv}`}>
                      <h4>Decomposition Time</h4>
                      <h3>{result.decomposition_time}</h3>
                    </div>
                  </div>

                  <div className={styles.disposalGuideDiv}>
                    <h2 className={styles.disposalHeading}>Disposal Guide</h2>
                    <div className={styles.separater}></div>
                    <div className={styles.recylingBinWrapper}>
                      <div className={styles.recylingBinIconWrapper}>
                        <ImBin className={`${styles.recylingBinIcon}`} style={{background: binColorHex}}/>
                      </div>
                      <div className={styles.recylingBinText}>
                        <h3>Recommended Bin</h3>
                        <h2>{result?.disposal_instruction?.recycling_bin?.text}</h2>
                      </div>
                    </div>

                    <div className={styles.disposalSteps}>
                      <h2 className={styles.disposalStepsHeading}>Disposal Steps</h2>
                      <ol type='1' className={styles.disposalStepUl}>
                        {
                          result.disposal_instruction.steps_to_dispose.map((step, index) => (
                            <li key={index} className={styles.disposalStep}>{step}</li>
                          ))
                        }
                      </ol>
                    </div>

                    <div className={styles.alternativeSteps}>
                      <h2 className={styles.alternativeStepsHeading}>Alternative Steps</h2>
                      <ol type='1' className={styles.alternativeStepUl}>
                        {
                          result.disposal_instruction.alternative_options.map((step, index) => (
                            <li key={index} className={styles.alternativeStep}>{step}</li>
                          ))
                        }
                      </ol>
                    </div>
                  </div>

                </div> :
                <div className={styles.noObjectFoundDiv}>
                  <h2>Item Identified!</h2>
                  <p>The item in the image does not appear to be typical waste or trash. No disposal instructions are needed.</p>
                </div>
            }
          </div>
        }
      </div>


    </>
  )
}

export default Identify
