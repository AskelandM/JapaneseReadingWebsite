import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "../index.css";
import supabase from "../supabaseclient.js";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressCircle";

function Quiz({ word, answers, current_num, answeredQs, onAnsweredQ, format, size, lesson, missedmode }) {
  const [message, setMessage] = useState(
    <h3>
      <br />
    </h3>
  );
  
  const[final, setFinal]= useState(false);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user || !word) return;
     
    // Check if the word already exists in missedPool
    const { data: existing } = await supabase
      .from("missedPool")
      .select("*")
      .eq("userName", user.email)
      .eq("missedword_id", word.id)
      .single();
  
    if (existing) {
      // Already missed before: increase fail_count, reset success_streak
      await supabase
        .from("missedPool")
        .update({
          failed_times: existing.failed_times + 1,
          success_updatedStreak: 0,
        })
        .eq("userName", user.email)
        .eq("missedword_id", word.id);
    } else {
      // First time this word was missed: insert new record
      await supabase.from("missedPool").insert([
        {
          userName: user.email,
          missedword_id: word.id,
          failed_times: 1,
          success_updatedStreak: 0,
        },
      ]);
    }
  };

  const storeCorrectWords = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    await supabase.from("correctPool").insert([
      {
        userName: user.email,
        correct_id: word.id,
        lesson: lesson
      },
    ]);
  }

  const updateStreaks = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    const { data: existing } = await supabase
    .from("missedPool")
    .select("*")
    .eq("userName", user.email)
    .eq("missedword_id", word.id)
    .single();


    await supabase
    .from("missedPool")
    .update({
      success_updatedStreak: existing.success_updatedStreak + 1,
    })
    .eq("userName", user.email)
    .eq("missedword_id", word.id);

  }

  // clicking an answer choice
  const handleClick = (ans) => {
    if (answeredQs <= current_num) {

      if (missedmode == true) {
        
        if (ans.id === word.id) {
          updateStreaks();
          setCorrect(ans);
          onAnsweredQ();
        } else {
          setMessage(
            <h3>
              <br />
              Wrong! Try Again
            </h3>
          );
        }
      } else {
        if (ans.id === word.id) {
          getWords();
          storeCorrectWords();
          setCorrect(ans);
          onAnsweredQ();
        } else {
          checkUser();
          setMessage(
            <h3>
              <br />
              Wrong! Try Again
            </h3>
          );
        }
      }
      // if current q is not finished
      
    }
  };

  const setEmpty = () => {
    setMessage(
      <h3>
        　<br />　
      </h3>
    );
  };

  const setCorrect = (ans) => {
    setMessage(
      <h3>
        {word.English}
        <br />
        Correct! Good Job
      </h3>
    ); // 1 is true
  };

  // reset the message when moving between questions (when current_num changes)
  useEffect(() => {
    answeredQs > current_num ? setCorrect() : setEmpty();
  }, [current_num]);

  const [progress, setProgress] = useState(0); 

  async function getWords() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: correctData, error } = await supabase
      .from("correctPool")
      .select("correct_id")
      .eq("userName", user.email)
      .eq("lesson", lesson);
    //   console.log(error)
    //   console.log(correctData)
    //  console.log(user.email)
    //  console.log(lesson)

      const correctCount = correctData?.length || 0;
      // console.log('correctCount')
      // console.log(correctCount)
     const { data: missedData, error: missedError } = await supabase
.from("missedPool")
.select("failed_times, success_updatedStreak")
.eq("userName", user.email);
//  console.log(missedData)

const recoveredCount = missedData
? missedData.filter(item => item.failed_times === item.success_updatedStreak).length
: 0;
const totalProgress = correctCount + recoveredCount;
setProgress(totalProgress);
setFinal(true);



  }
  useEffect(() => {
    

    getWords();
  }, [lesson]);


//calculate how many student already got it right here, need to trigger rerender if needed
// console.log('size')
//     console.log(size)
//     console.log('progress')
//     console.log(progress)

  // button component
  return (
       
        <div>
        <div>
          {
            final &&  <ProgressBar current={progress} total={size} />
          }
       
        </div>
          <div/>
    <div className="question">
      <h2>
        {format.kana == "q" ? word.kana + " " : ""}
        {format.kanji == "q" ? word.kanji + " " : ""}
        {format.en == "q" ? word.English + " " : ""}
      </h2>
      {answers.map((answer) => (
        <Button variant="contained" onClick={() => handleClick(answer)}>
          {format.kana == "a" ? answer.kana + " " : ""}
          {format.kanji == "a" ? answer.kanji + " " : ""}
          {format.en == "a" ? answer.English + " " : ""}
        </Button>
      ))}
      {message}
     
    </div>
    </div>
  );
}

export default Quiz;
