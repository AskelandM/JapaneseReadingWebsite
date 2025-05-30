import React, { useEffect, useState } from 'react';
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useLocation } from 'react-router';
import { Link } from "react-router-dom";
import supabase from "../supabaseclient.js";
import "../styling/quizoptions.css"

function QuizOptions () {
    // get lesson # from URL
    const location = useLocation();
    const searchParams = new URLSearchParams(
        location.search
    );
    const lesson = searchParams.get("lesson");

    const [qNum, setQNum] = useState("0"); // 0 is all questions
    // q(uestion), a(nswer), n(either) 
    const [kanji, setKanji] = useState("q");
    const [kana, setKana] = useState("q");
    const [en, setEn] = useState("a");
    const [missed, setMissed] = useState("f");

    // check if missedwords button should display
    const [showMissed, setShowM] = useState(false);
    // check if there are any
    useEffect(() => {
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
            if (filtered.length > 3) {
                setShowM(true);
            }
            else {
                setShowM(false);
            }
        }
        }

        getMissedWords();
    }, [lesson]);


    const handleQNum = (event, newQNum) => {
        setQNum(newQNum);
    };
    const handleKanji = (event, newKanji) => {
        setKanji(newKanji);
    };
    const handleKana = (event, newKana) => {
        setKana(newKana);
    };
    const handleEn = (event, newEn) => {
        setEn(newEn);
    };
    const handleMissed = (event, newMissed) => {
        setMissed(newMissed);
    };

    return (
        <div className="quiz-page">
            <div className="quiz-container">
                <h1 className='page-title'>Lesson {lesson} Quiz</h1>
                {showMissed && (
                    <div>
                        <ToggleButtonGroup
                            value={missed}
                            exclusive
                            onChange={handleMissed}
                            aria-label="missed"
                        >
                            <ToggleButton value="f" aria-label="all">
                                All
                            </ToggleButton>
                            <ToggleButton value="t" aria-label="missed">
                                Missed Questions Only
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                )}
    
                <div className="quiz-section">
                    <p>Number of Questions:</p>
                    <ToggleButtonGroup
                        value={qNum}
                        exclusive
                        onChange={handleQNum}
                        aria-label="number of questions"
                    >
                        <ToggleButton value="0" aria-label="all">All</ToggleButton>
                        <ToggleButton value="5" aria-label="five">5</ToggleButton>
                        <ToggleButton value="10" aria-label="ten">10</ToggleButton>
                    </ToggleButtonGroup>
                </div>
    
                <div className="quiz-section">
                    <p>Question Type:</p>
                    <p>Kanji</p>
                    <ToggleButtonGroup
                        value={kanji}
                        exclusive
                        onChange={handleKanji}
                        aria-label="kanji"
                    >
                        <ToggleButton value="q">question</ToggleButton>
                        <ToggleButton value="a">answer</ToggleButton>
                        <ToggleButton value="n">none</ToggleButton>
                    </ToggleButtonGroup>
    
                    <p>Kana</p>
                    <ToggleButtonGroup
                        value={kana}
                        exclusive
                        onChange={handleKana}
                        aria-label="kana"
                    >
                        <ToggleButton value="q">question</ToggleButton>
                        <ToggleButton value="a">answer</ToggleButton>
                        <ToggleButton value="n">none</ToggleButton>
                    </ToggleButtonGroup>
    
                    <p>English</p>
                    <ToggleButtonGroup
                        value={en}
                        exclusive
                        onChange={handleEn}
                        aria-label="english"
                    >
                        <ToggleButton value="q">question</ToggleButton>
                        <ToggleButton value="a">answer</ToggleButton>
                        <ToggleButton value="n">none</ToggleButton>
                    </ToggleButtonGroup>
                </div>
    
                <div className="quiz-button">
                    <Link to={{
                        pathname: "/quizzes",
                        search: `?lesson=${lesson}&qnum=${qNum}&kj=${kanji}&kn=${kana}&en=${en}&missed=${missed}`
                    }}>
                        <Button>Start Quiz</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
    
};

export default QuizOptions;