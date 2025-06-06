import React, { useState, useEffect } from "react";
import Quiz from "../components/Quiz.js";
import { useLocation } from "react-router";
import supabase from "../supabaseclient.js";
import "../styling/quizzes.css";
import { FaFastBackward, FaBackward, FaForward,FaFastForward } from "react-icons/fa";


function Quizzes() {
  // get lesson # from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lesson = searchParams.get("lesson");
  const qNum = searchParams.get("qnum");
  const kanji = searchParams.get("kj");
  const kana = searchParams.get("kn");
  const en = searchParams.get("en");
  const missed = searchParams.get("missed");

  // all words for this lesson
  const [wordList, setWords] = useState([
    { id: 0, kana: "loading", kanji: "loading", English: "loading" },
  ]);
  // random 10 words for this quiz
  const [quizList, setQuiz] = useState([
    { id: 0, kana: "loading...", kanji: "loading...", English: "loading..." },
  ]);
  // all possible answers for this quiz
  const [answerList, setAnswer] = useState([
    [{ id: 0, kana: "loading...", kanji: "loading...", English: "loading..." },
      { id: 0, kana: "loading...", kanji: "loading...", English: "loading..." },
      { id: 0, kana: "loading...", kanji: "loading...", English: "loading..." },
      { id: 0, kana: "loading...", kanji: "loading...", English: "loading..." }],
  ]);
  const [size, setSize] = useState(0);
  const[missedmode, setMissedmode]= useState(false);
  // get this user
  const [Username, setUsername] = useState(null);
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUsername(user.email);
    };

    checkUser();
    console.log(Username);
  }, []);

  // get words from DB
  useEffect(() => {
    async function getWords() {
      const { data, error } = await supabase
        .from("Words")
        .select(`id, kana, kanji, English`)
        .eq("lesson", lesson);
      if (error) {
        console.warn(error);
      } else if (data) {
        setWords(data);
      }
    }

    async function getMissedWords() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
      .from("Words")
      .select('id, kana, kanji, English, missedPool!inner(userName, failed_times, success_updatedStreak)')
      .eq('missedPool.userName', user.email)
      .eq('lesson', lesson); // string is fine
    
      console.log("📦 Raw data from Supabase join:", data);
      console.log("👤 Username:", user.email);
      console.log("📘 Lesson:", lesson);


    if (error) {
      console.warn(error);
    } else if (data) {
      // Filter manually for failed > recovered
      const filtered = data.filter(item => {
        const pool = item.missedPool?.[0]; 
        return pool && pool.failed_times > pool.success_updatedStreak;
      });
    
      setWords(
        filtered.length > 0
          ? filtered
          : [{ id: 0, kana: "Empty", kanji: "(No missed words)", English: "Empty (No missed words)" }]
      );
    
      console.log("Filtered missed words:", filtered);
    }
    }

    if (missed === "t") {
      getMissedWords();
      setMissedmode(true);
      console.log("missed words");
    }
    else {
      getWords();
      console.log("not missed words");
    }
  }, [lesson, Username]);
    


  // get words into quizList
  useEffect(() => {
    setQuiz(getQuestionChoices(wordList, qNum));
  }, [wordList]);

  // get words into answerList
  useEffect(() => {
    let ansBank = [];
    quizList.map((row) => {
      ansBank = [...ansBank, getAnswerChoices(row, wordList)];
    })
    setAnswer(ansBank);
  }, [quizList])

  useEffect(() => {
    setSize(wordList.length);
  }, [wordList]);



  // keep track of current question and how many we've answered
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredQs, setAnsweredQs] = useState(0);

  const nextQ = () => {
    // only lets you advance if you got this Q right
    if (answeredQs > currentIndex) {
      // don't go past number of questions
      if (currentIndex < qNum - 1 || (qNum == 0 && currentIndex < quizList.length - 1)) {
        setCurrentIndex((prevIndex) => (prevIndex + 1));
      }
    }
  };

  const prevQ = () => {
    // don't go back further than 0
    if (currentIndex !== 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? quizList.length - 1 : prevIndex - 1
      );
    }
  };

  const setFirstQ = () => {
    setCurrentIndex(0);
  };

  const setLastQ = () => {
    // go to last answered question
    if (answeredQs < quizList.length) {
      setCurrentIndex(answeredQs);
    } else {
      setCurrentIndex(quizList.length - 1);
    }
  };



  // function to choose 10 random words for each quiz
  const getQuestionChoices = (wordList, quizLength) => {
    if (answeredQs > 0) {
      // already exists; do not recreate
      return quizList;
    }
    if (quizLength === 0 || quizLength === "0" || wordList.length < qNum) {
      // all questions
      quizLength = wordList.length;
    }
    let answerBank = wordList.slice(); // .slice is creating a copy so we don't modify the original
    let randInt = 0;
    let result = [];
    for (let i = 0; i < quizLength; i++) {
      // choose a unique word, add it to quizList
      randInt = Math.floor(Math.random() * answerBank.length);
      result = [...result, answerBank[randInt]];
      answerBank.splice(randInt, 1);
    }
    return result;
  };

  // function to choose 3 random wordList that aren't the word in question + the word (for mult choice answers)
  const getAnswerChoices = (correct_ans, wordList) => {
    if (wordList.length <= 1) {
      // not yet loaded
      return [];
    }
    let answerBank = wordList.slice();
    let answers = [correct_ans];
    // remove the correct answer from possible answers
    answerBank = answerBank.filter((val) => {
      return val.id !== correct_ans.id;
    });
    let randInt = 0;
    for (let i = 0; i < 3; i++) {
      // choose a random word that's not the answer
      randInt = Math.floor(Math.random() * answerBank.length);
      // either add it before or after in the list (to randomize order)
      if (Math.floor(Math.random() * 2)) {
        answers = [...answers, answerBank[randInt]];
      } else {
        answers = [answerBank[randInt], ...answers];
      }
      answerBank.splice(randInt, 1);
    }
    return answers;
  };

  const onAnsweredQ = () => {
    if (answeredQs < quizList.length) {
      setAnsweredQs(answeredQs + 1);
    }
  };

  return (
    <div className="quizzes-wrapper">
      <div className="quiz-card">
        <h1 className="page-title">Lesson {lesson} Quiz</h1>
  
        <Quiz
          word={quizList[currentIndex]}
          answers={answerList[currentIndex]}
          current_num={currentIndex}
          answeredQs={answeredQs}
          size={size}
          missedmode={missedmode}
          onAnsweredQ={onAnsweredQ}
          lesson={lesson}
          format={{ kanji: kanji, kana: kana, en: en }}
        />
  
        <div className="nav-controls">
          <button onClick={setFirstQ}><FaFastBackward></FaFastBackward></button>
          <button onClick={prevQ}><FaBackward></FaBackward></button>
          &nbsp;{currentIndex + 1} / {quizList.length}&nbsp;
          <button onClick={nextQ}><FaForward></FaForward></button>
          <button onClick={setLastQ}><FaFastForward></FaFastForward></button>
        </div>
  
        <div className="quiz-status">
          Questions Answered: {answeredQs} &nbsp;&nbsp;
          {answeredQs >= quizList.length ? "Complete!" : ""}
        </div>
      </div>
    </div>
  );
  
}

export default Quizzes;
