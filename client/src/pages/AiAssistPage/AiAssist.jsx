import React, { useEffect, useRef, useState } from 'react'
import styles from './AiAssist.module.css';
import { BsArrowRight } from "react-icons/bs";
import { axiosInstance } from '../../utils/axiosInstance.js'
import TypingIndicator from '../../components/TypingIndicator/TypingIndicator.jsx';

const AiAssist = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [pending, setIsPending] = useState(false);
  const dummyDivRef = useRef(null);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = { text: userInput, fromAi: false };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput("");

    try {
      setIsPending(true);
      const res = await axiosInstance.post("/ai-chat", { messages: updatedMessages });
      const aiResponse = { text: res.data.reply, fromAi: true };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.log(error);
      const errorMsg = { text: "Something went wrong.", fromAi: true };
      setMessages((prev) => [...prev, errorMsg]);
    }
    finally{
      setIsPending(false);
    }
  };

  useEffect(() => {
    dummyDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  return (
    <div className={styles.aiAssistPage}>
      <h1 className={styles.mainHeading}><span className={styles.mainHeadingSpan}>Eco </span>Chat Assistant</h1>

      <div className={styles.chatArea}>
        {messages.length > 0 && messages.map((message, index) => (
          <p key={index} className={`${styles.chatMessage} ${message.fromAi ? styles.fromAI : styles.fromUser}`}>{message.text}</p>
        ))
        }
        {pending && <TypingIndicator/>}
        <div ref={dummyDivRef} className={styles.dummyDiv}></div>
      </div>

      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <input type="text" value={userInput} name="userInput" placeholder='Type your message here...' className={styles.userInput} onChange={(e) => handleUserInput(e)} />
        <button disabled={!userInput} type='submit' className={styles.inputSubmitBtn}><BsArrowRight /></button>
      </form>
    </div>
  )
}

export default AiAssist
