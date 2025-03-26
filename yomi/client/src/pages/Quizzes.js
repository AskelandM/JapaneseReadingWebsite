import React, { useState, useEffect } from 'react';
import Quiz from '../components/Quiz.js';
import { useLocation } from 'react-router';
import supabase from './supabaseclient.js';
import '../flashcard.css';

function Quizzes () {
    // get lesson # from URL
    const location = useLocation();
    const searchParams = new URLSearchParams(
        location.search
    );
    const lesson = searchParams.get("lesson");

    const [wordList, setWords] = React.useState([{kana: "loading...", kanji: "loading...", Enlgish: "loading..."}]);

    // get words from DB
    useEffect(() => {       
        async function getWords() {         
            const { data, error } = await supabase        
            .from('Words')        
            .select(`kana, kanji, English`)        
            .eq('lesson', lesson)               
            if (error) {          
                console.warn(error)        
            } else if (data) { 
                // wordList = data;   
                setWords(data);   
            }      
            console.log("from DB:");
            console.log(wordList);
        }

        getWords() 
    }, [])

    // keep track of current question and how many we've answered
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answeredQs, setAnsweredQs] = useState(0);

    const nextQ = () => {
        // only lets you advance if you got this Q right
        if (answeredQs > currentIndex) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % wordList.length);
        }
    };

    const prevQ = () => {
        // don't go back further than 0
        if (currentIndex !== 0) {
            setCurrentIndex((prevIndex) => prevIndex === 0 ? wordList.length - 1 : prevIndex - 1);
        }
    };

    const setFirstQ = () => {
        setCurrentIndex(0);
    }

    const setLastQ = () => {
        // only go to last Q if all questions are answered
        if (answeredQs >= (wordList.length - 1)) {
            setCurrentIndex(wordList.length - 1);
        }
    }

    // function to choose 3 random wordList that aren't the word in question + the word (for mult choice answers) 
    const getAnswerChoices = (index, wordList) => {
        if (wordList.length <= 1) {
            // not yet loaded
            return [];
        }
        let answerBank = wordList.slice();
        let answers = [answerBank[index].English];
        answerBank.splice(index, 1);
        let randInt = 0;
        for (let i = 0; i < 3; i++) {
            // choose a random word that's not the answer
            randInt = Math.floor(Math.random() * (answerBank.length));
            // either add it before or after in the list (to randomize order)
            if (Math.floor(Math.random() * 2)) {
                answers = [...answers, answerBank[randInt].English];
            }
            else {
                answers = [answerBank[randInt].English, ...answers];
            }
            answerBank.splice(randInt, 1);
        }
        return answers;
    }

    const onAnsweredQ = () => {
        if (answeredQs < wordList.length) {
            setAnsweredQs(answeredQs + 1);
        }
    }

    return (
        <div>
            <br/>
            <h1 className='page-title'>Lesson {lesson} Quiz</h1>
            <Quiz word={wordList[currentIndex]} 
                answers={getAnswerChoices(currentIndex, wordList)} 
                current_num={currentIndex}
                answeredQs={answeredQs} 
                onAnsweredQ={onAnsweredQ} 
            />
            <div>
                <button onClick={setFirstQ}>&lt;&lt;</button>
                <button onClick={prevQ}>&lt;</button>
                &nbsp;{currentIndex + 1} / {wordList.length}&nbsp;
                <button onClick={nextQ}>&gt;</button>
                <button onClick={setLastQ}>&gt;&gt;</button>
                &nbsp;answered Qs: {answeredQs} &nbsp;&nbsp; {answeredQs >= wordList.length ? "Complete!" : ""}
            </div>
        </div>
    );
};

export default Quizzes;
