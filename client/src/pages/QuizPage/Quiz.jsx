import React, { useEffect, useRef, useState } from 'react'
import quizJson from '../../utils/waste_management_quiz.json'
import styles from './Quiz.module.css';

const Quiz = () => {
  const level = 'easy';
  const [score, setScore] = useState(0);
  const quizArr = quizJson.quiz.filter((quiz) => quiz.difficulty !== level);
  const [quesCount, setQuesCount] = useState(0);

  const [quiz, setQuiz] = useState(quizArr[quesCount]);
  const [isAnswered, setIsAnswered] = useState(false);
  const continueBtnRef = useRef(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [clickedOption, setClickedOption] = useState(null);

  const checkAnswer = (optionId, e) => {
    if (!isAnswered) {
      setClickedOption(e.target);
      setIsAnswered(true);
      const continueBtn = continueBtnRef.current;
      const answerId = quiz.answer.id;
      if (answerId == optionId) {
        setIsCorrect(true);
        setScore((prev) => prev + 5);
        e.target.classList.add(`${styles.correctAnswer}`);
        if (continueBtn) continueBtn.classList.add(`${styles.correctAnswer}`);
      }
      else {
        e.target.classList.add(`${styles.wrongAnswer}`);
        if (continueBtn) continueBtn.classList.add(`${styles.wrongAnswer}`);
      }
      setQuesCount((prev) => prev + 1);
    }
  }

  const goToNextQuiz = () => {
    setQuiz(quizArr[quesCount]);
  }

  useEffect(() => {
    if (continueBtnRef.current) {
      setClickedOption(false);
      setIsAnswered(false);
      setIsCorrect(false);
      clickedOption.classList.remove(styles.correctAnswer, styles.wrongAnswer);
      continueBtnRef.current.classList.remove(styles.correctAnswer, styles.wrongAnswer);
    }
  }, [quiz]);

  return (
    <div className={styles.quizPage}>
      <h2 className={styles.quizHeading}>Quiz</h2>
      <h3 className={styles.scoreCount}>Score: {score}</h3>

      <div className={styles.quizArea}>
        <p className={styles.quizQues}>{quiz.question}</p>
        <div className={styles.optionsDiv}>
          <ul className={styles.optionContainerUl}>
            {
              quiz.options.map((option, index) => (
                <li key={index} className={styles.option} onClick={(e) => checkAnswer(option.id, e)}>{option.text}</li>
              ))
            }
          </ul>
        </div>

        {
          isAnswered && <button ref={continueBtnRef} className={styles.continueBtn} style={{background: isCorrect ? '#4CAF50' : '#F44336'}} onClick={goToNextQuiz}>Continue</button>
        }
      </div>
    </div>
  )
}

export default Quiz
