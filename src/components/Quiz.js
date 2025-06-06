import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import supabase from "../supabaseclient.js";
import ProgressBar from "../components/ProgressCircle";
import "../styling/quizzes.css";

function Quiz({
  word,
  answers,
  current_num,
  answeredQs,
  onAnsweredQ,
  format,
  size,
  lesson,
  missedmode,
}) {
  const [message, setMessage] = useState(
    <h3>
      <br />
    </h3>
  );

  const [final, setFinal] = useState(false);

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

    await supabase
      .from("correctPool")
      .insert([
        {
          userName: user.email,
          correct_id: word.id,
          lesson: String(lesson),
        },
      ])
      .select();

    const { error } = await supabase
      .from("correctPool")
      .insert([
        {
          userName: user.email,
          correct_id: word.id,
          lesson: lesson,
        },
      ])
      .select();

    if (error) console.error("Insert error:", error.message);
  };

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
  };

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
    console.log("Lesson value being sent:", lesson);
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
      ? missedData.filter(
          (item) => item.failed_times === item.success_updatedStreak
        ).length
      : 0;
    const totalProgress = correctCount + recoveredCount;
    setProgress(totalProgress);
    setFinal(true);
  }
  useEffect(() => {
    getWords();
  }, [lesson]);

  //calculate how many student already got it right here, need to trigger rerender if needed
  console.log("size");
  console.log(size);
  console.log("progress");
  console.log(progress);

  return (
    <>
      <div className="progress-container">
        {final && <ProgressBar current={progress} total={size} />}
      </div>

      <div className="question-container">
        <h2 className="question-text">
          {format.kana === "q" ? word.kana + " " : ""}
          {format.kanji === "q" ? word.kanji + " " : ""}
          {format.en === "q" ? word.English + " " : ""}
        </h2>

        <div className="answers-grid">
          {answers.map((answer, idx) => (
            <Button
              key={idx}
              variant="contained"
              className="answer-button"
              onClick={() => handleClick(answer)}
            >
              {format.kana === "a" ? answer.kana + " " : ""}
              {format.kanji === "a" ? answer.kanji + " " : ""}
              {format.en === "a" ? answer.English + " " : ""}
            </Button>
          ))}
        </div>

        <div className="message">{message}</div>
      </div>
    </>
  );
}

export default Quiz;
