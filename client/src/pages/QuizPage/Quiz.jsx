import React, { useEffect, useRef, useState } from 'react';
import styles from './Quiz.module.css';
import { useAuth } from '../../context/AuthContext';
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [quizArr, setQuizArr] = useState([]);
  const [quesCount, setQuesCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [clickedOption, setClickedOption] = useState(null);
  const continueBtnRef = useRef(null);

  const { user, loading, setLoading } = useAuth();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/fetch-quiz/${user?.id}`);
        setQuizArr(res.data);
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };
    const fetchScore = async () => {
      try {
        const res = await axiosInstance.get(`/fetchScore/${user?.id}`);
        console.log(res.data);
        setScore(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (user?.id) {
      fetchQuiz();
      fetchScore();
    }
  }, [user?.id]);

  const quiz = quizArr[quesCount];

  const checkAnswer = async (quizId, optionId, e) => {
    if (!isAnswered) {
      setClickedOption(e.target);
      setIsAnswered(true);
      const continueBtn = continueBtnRef.current;
      const answerId = quiz.answer.id;

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
        e.target.classList.add(styles.wrongAnswer);
        continueBtn?.classList.add(styles.wrongAnswer);
      }
    }
  };

  const goToNextQuiz = () => {
    clickedOption?.classList.remove(styles.correctAnswer, styles.wrongAnswer);
    continueBtnRef.current?.classList.remove(styles.correctAnswer, styles.wrongAnswer);
    setIsAnswered(false);
    setIsCorrect(false);
    setClickedOption(null);
    setQuesCount(prev => prev + 1);
  };

  if (loading) return <Loader />;

  if (!quiz) {
    return (
      <div className={styles.quizPage}>
        <h2>Quiz Completed!</h2>
        <h3>Your final score: {score}</h3>
      </div>
    );
  }

  return (
    <div className={styles.quizPage}>
      <h2 className={styles.quizHeading}>Quiz</h2>
      <h3 className={styles.scoreCount}>Score: {score}</h3>

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
