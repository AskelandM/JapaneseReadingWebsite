import React, { useState } from 'react';
import Quiz from '../components/Quiz.js';
import '../flashcard.css';

const Quizzes = () => {
    const words = [
        { jp: "一", en: "one"},
        { jp: "二", en: "two"},
        { jp: "三", en: "three"},
        { jp: "四", en: "four"},
        { jp: "五", en: "five"},
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextQ = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    };

    const prevQ = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? words.length - 1 : prevIndex - 1);
    };

    const setFirstQ = () => {
        setCurrentIndex(0);
    }

    const setLastQ = () => {
        setCurrentIndex(words.length - 1);
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

    return (
        <div>
            <br/>
            <h1 className='page-title'>Quizzes</h1>
            <Quiz word={words[currentIndex]} answers={getAnswerChoices(currentIndex, words)} current_num={currentIndex} />
            <div>
                <button onClick={setFirstQ}>&lt;&lt;</button>
                <button onClick={prevQ}>&lt;</button>
                &nbsp;{currentIndex + 1} / {words.length}&nbsp;
                <button onClick={nextQ}>&gt;</button>
                <button onClick={setLastQ}>&gt;&gt;</button>
            </div>
        </div>
    );
};

export default Quizzes;
