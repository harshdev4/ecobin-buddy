import React, { useEffect, useRef, useState } from 'react';
import styles from './Quiz.module.css';
import { useAuth } from '../../context/AuthContext';
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import { GiStarMedal } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import correctAnim from '../../animations/Confetti.json'
import wrongAnim from '../../animations/Error animation.json'
import Lottie from "lottie-react";

const Quiz = () => {
  const [score, setScore] = useState(0); 
  const [level, setLevel] = useState("Easy");
  const [quizArr, setQuizArr] = useState([]);
  const [quesCount, setQuesCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answer, setAnswer] = useState("fdsfds");
  const [clickedOption, setClickedOption] = useState(null);
  const continueBtnRef = useRef(null);
  const [quiz, setQuiz] = useState(null);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const { user, loading, setLoading } = useAuth();

  useEffect(()=>{
    if (loading) return;
    if (!user) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/fetch-quiz/${user?.id}`);
        setQuizArr(res.data);
        setQuiz(res.data[quesCount]);
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };
    const fetchScore = async () => {
      try {
        const res = await axiosInstance.get(`/fetchScore/${user?.id}`);
        setScore(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchLevel = async () => {
      try {
        const res = await axiosInstance.get(`/fetchLevel/${user?.id}`);
        setLevel(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (user?.id) {
      fetchQuiz();
      fetchScore();
      fetchLevel();
    }
  }, [user?.id]);

  useEffect(()=>{
    setQuiz(quizArr[quesCount]);
  }, [quesCount])

  const checkAnswer = async (quizId, optionId, e) => {
    if (!isAnswered) {
      setClickedOption(e.target);
      setIsAnswered(true);
      const continueBtn = continueBtnRef.current;
      const answerId = quiz.answer.id;
      setShow(true);
      if (answerId === optionId) {
        setIsCorrect(true);
        setScore(prev => prev + 5);
        e.target.classList.add(styles.correctAnswer);
        continueBtn?.classList.add(styles.correctAnswer);
        try {
          const res = await axiosInstance.post('/quiz/attempt', {userId: user.id, quizId, isCorrect: true});
        } catch (error) {
          
        }
      } else {
        setIsCorrect(false);
        setAnswer(quiz.answer.text);
        e.target.classList.add(styles.wrongAnswer);
        continueBtn?.classList.add(styles.wrongAnswer);
      }
    }
  };

  const goToNextQuiz = () => {
    clickedOption?.classList.remove(styles.correctAnswer, styles.wrongAnswer);
    continueBtnRef.current?.classList.remove(styles.correctAnswer, styles.wrongAnswer);
    setIsAnswered(false);
    setIsCorrect(null);
    setAnswer("");
    setClickedOption(null);
    setQuesCount(prev => prev + 1);
  };

  if (loading) return <div style={{minHeight: '100dvh'}}><Loader /></div>;

  if (!quiz && !loading) {
    return (
      <div className={styles.quizPage}>
        <h2>Level Increased</h2>
        <h3>Your final score: {score}</h3>
      </div>
    );
  }
 
  return (
    <div className={styles.quizPage}>
      <h2 className={styles.quizHeading}>Quiz</h2>
      <div className={styles.userQuizData}>
        <h3 className={styles.levelHeading}>Level: <span className={styles.level}>{level.slice(0,1).toUpperCase()+level.slice(1)}</span></h3>
        <h3 className={styles.scoreCountContainer} title='Score'><GiStarMedal /> <span className={styles.scoreCount}>{score}</span></h3>
      </div>

      {(isCorrect && show )&& <Lottie animationData={correctAnim} loop={false} onComplete={()=> setShow(false)} className={styles.afterEffect}/>}

      {(isCorrect === false && show) && <Lottie animationData={wrongAnim} loop={false} onComplete={()=> setShow(false)} className={styles.afterEffect}/>}
 
      <div className={styles.quizArea}>
        <p className={styles.quizQues}>{quiz.question}</p>
        <ul className={styles.optionContainerUl}>
          {quiz.options.map((option, index) => (
            <li
              key={index}
              className={styles.option}
              onClick={(e) => checkAnswer(quiz.id, option.id, e)}
            >
              {option.text}
            </li>
          ))}
        </ul>

        {
          isCorrect===false && <h3 className={styles.correct}>{answer}</h3>
        }

        {isAnswered && (
          <button
            ref={continueBtnRef}
            className={styles.continueBtn}
            style={{ background: isCorrect ? '#4CAF50' : '#F44336' }}
            onClick={goToNextQuiz}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
