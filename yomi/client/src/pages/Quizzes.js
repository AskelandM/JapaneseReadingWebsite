import React, { useState } from 'react';
import Quiz from '../components/Quiz.js';
import { useLocation } from 'react-router';
import '../flashcard.css';

function Quizzes () {
    // get lesson # from URL
    const location = useLocation();
    const searchParams = new URLSearchParams(
        location.search
    );
    const lesson = searchParams.get("lesson");

    const words = [
        { jp: "一", en: "one"},
        { jp: "二", en: "two"},
        { jp: "三", en: "three"},
        { jp: "四", en: "four"},
        { jp: "五", en: "five"},
    ];

    // keep track of current question and how many we've answered
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answeredQs, setAnsweredQs] = useState(0);

    const nextQ = () => {
        // only lets you advance if you got this Q right
        if (answeredQs > currentIndex) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
    };

    const prevQ = () => {
        // don't go back further than 0
        if (currentIndex !== 0) {
            setCurrentIndex((prevIndex) => prevIndex === 0 ? words.length - 1 : prevIndex - 1);
        }
    };

    const setFirstQ = () => {
        setCurrentIndex(0);
    }

    const setLastQ = () => {
        // only go to last Q if all questions are answered
        if (answeredQs >= (words.length - 1)) {
            setCurrentIndex(words.length - 1);
        }
    }

    // function to choose 3 random words that aren't the word in question + the word (for mult choice answers) 
    const getAnswerChoices = (index, words) => {
        let answerBank = words.slice();
        console.log(typeof(index));
        let answers = [answerBank[index].en];
        answerBank.splice(index, 1);
        let randInt = 0;
        for (let i = 0; i < 3; i++) {
            // choose a random word that's not the answer
            randInt = Math.floor(Math.random() * (answerBank.length));
            // either add it before or after in the list (to randomize order)
            if (Math.floor(Math.random() * 2)) {
                answers = [...answers, answerBank[randInt].en];
            }
            else {
                answers = [answerBank[randInt].en, ...answers];
            }
            answerBank.splice(randInt, 1);
        }
        return answers;
    }

    const onAnsweredQ = () => {
        if (answeredQs < words.length) {
            setAnsweredQs(answeredQs + 1);
        }
    }

    return (
        <div>
            <br/>
            <h1 className='page-title'>Lesson {lesson} Quiz</h1>
            <Quiz word={words[currentIndex]} 
                answers={getAnswerChoices(currentIndex, words)} 
                current_num={currentIndex}
                answeredQs={answeredQs} 
                onAnsweredQ={onAnsweredQ} 
            />
            <div>
                <button onClick={setFirstQ}>&lt;&lt;</button>
                <button onClick={prevQ}>&lt;</button>
                &nbsp;{currentIndex + 1} / {words.length}&nbsp;
                <button onClick={nextQ}>&gt;</button>
                <button onClick={setLastQ}>&gt;&gt;</button>
                &nbsp;answered Qs: {answeredQs} &nbsp;&nbsp; {answeredQs >= words.length ? "Complete!" : ""}
            </div>
        </div>
    );
};

export default Quizzes;
