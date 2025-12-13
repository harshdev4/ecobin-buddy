import React, { useEffect, useState, useRef } from 'react';
import styles from './Quiz.module.css';
import { useAuth } from '../../context/AuthContext';
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import { GiStarMedal } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import correctAnim from '../../animations/Confetti.json';
import wrongAnim from '../../animations/Error animation.json';
import Lottie from "lottie-react";

const Quiz = () => {
  const navigate = useNavigate();
  const { user, loading, setLoading, setUrlLocation } = useAuth();

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("Easy");
  const [quizArr, setQuizArr] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const [levelJumped, setLevelJumped] = useState(false);
  const [quizTimer, setQuizTimer] = useState(10);
  const [showAnim, setShowAnim] = useState(true);

  const continueBtnRef = useRef(null);

  const quiz = quizArr[questionIndex];

  /* ---------- AUTH GUARD ---------- */
  useEffect(() => {
    setUrlLocation("quiz");
    if (!loading && !user) navigate('/login');
  }, [user, loading]);

  /* ---------- FETCH DATA ---------- */
  useEffect(() => {
    if (!user?.id) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        const [quizRes, scoreRes, levelRes] = await Promise.all([
          axiosInstance.get(`/fetch-quiz/${user.id}`),
          axiosInstance.get(`/fetchScore/${user.id}`),
          axiosInstance.get(`/fetchLevel/${user.id}`)
        ]);

        setQuizArr(quizRes.data);
        setScore(scoreRes.data);
        setLevel(levelRes.data);
      } catch {
        toast.error('Failed to load quiz data');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user?.id]);

  /* ---------- LEVEL TIMER ---------- */
  useEffect(() => {
    if (!levelJumped) return;

    const timer = setInterval(() => {
      setQuizTimer(prev => {
        if (prev <= 1) {
          setLevelJumped(false);
          clearInterval(timer);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [levelJumped]);

  /* ---------- ANSWER CHECK ---------- */
  const checkAnswer = async (quizId, optionId) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedOptionId(optionId);
    setShowAnim(true);

    const correct = quiz.answer.id === optionId;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 5);
      try {
        await axiosInstance.post('/quiz/attempt', {
          userId: user.id,
          quizId,
          isCorrect: true
        });
      } catch {}
    }
  };

  /* ---------- LEVEL UP ---------- */
  const levelUp = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post('/level-up');
      setLevel(res.data.level);
      // fetch new quiz
      const quizRes = await axiosInstance.get(`/fetch-quiz/${user.id}`);
      setQuizArr(quizRes.data);
      setLevelJumped(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Level up failed');
    } finally {
      setLoading(false);
    }
  };

  /* ---------- NEXT QUESTION ---------- */
  const goToNextQuiz = async () => {
    setIsAnswered(false);
    setIsCorrect(null);
    setSelectedOptionId(null);

    if (questionIndex + 1 >= quizArr.length) {
      await levelUp();
      setQuestionIndex(0);
      return;
    }

    setQuestionIndex(prev => prev + 1);
  };

  if (loading || !quiz) {
    return <div style={{ minHeight: '100dvh' }}><Loader /></div>;
  }

  /* ---------- LEVEL SCREEN ---------- */
  if (levelJumped && !loading) {
    return (
      <div className={styles.quizPage}>
        <div className={styles.levelIncreasedHeadingContainer}>
          <Lottie className={styles.afterEffect} animationData={correctAnim} />
          <h2>Level Increased To {level}</h2>
          <h3>Your final score: {score}</h3>
          <h4>Next quiz starts in {quizTimer} seconds</h4>
        </div>
      </div>
    );
  }

  /* ---------- MAIN UI ---------- */
  return (
    <div className={styles.quizPage}>
      <h2 className={styles.quizHeading}>Quiz</h2>

      <div className={styles.userQuizData}>
        <h3 className={styles.levelHeading}>Level: {level}</h3>
        <h3 className={styles.scoreCountContainer} title="Score"><GiStarMedal /> {score}</h3>
      </div>

      {isCorrect && showAnim && (
        <Lottie
          className={styles.afterEffect}
          animationData={correctAnim}
          loop={false}
          onComplete={() => setShowAnim(false)}
        />
      )}

      {isCorrect === false && showAnim && (
        <Lottie
          className={styles.afterEffect}
          animationData={wrongAnim}
          loop={false}
          onComplete={() => setShowAnim(false)}
        />
      )}

      <div className={styles.quizArea}>
        <p>{quiz.question}</p>

        <ul className={styles.optionContainerUl}>
          {quiz.options.map(option => {
            const isSelected = selectedOptionId === option.id;
            const isAnswer = quiz.answer.id === option.id;

            let optionClass = styles.option;
            if (isAnswered) {
              if (isAnswer) optionClass += ` ${styles.correctAnswer}`;
              else if (isSelected) optionClass += ` ${styles.wrongAnswer}`;
            }

            return (
              <li
                key={option.id}
                className={optionClass}
                onClick={() => checkAnswer(quiz.id, option.id)}
              >
                {option.text}
              </li>
            );
          })}
        </ul>

        {isAnswered && (
          <button
            ref={continueBtnRef}
            className={styles.continueBtn}
            onClick={goToNextQuiz}
            style={{ background: isCorrect ? '#4CAF50' : '#F44336' }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
