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


    // all words for this lesson
    const [wordList, setWords] = React.useState([{kana: "loading", kanji: "loading", English: "loading"}]);
    // random 10 words for this quiz
    const [quizList, setQuiz] = React.useState([{kana: "loading...", kanji: "loading...", English: "loading..."}]);

    // get words from DB
    useEffect(() => {       
        async function getWords() {         
            const { data, error } = await supabase        
            .from('Words')        
            .select(`id, kana, kanji, English`)        
            .eq('lesson', lesson)               
            if (error) {          
                console.warn(error)        
            } else if (data) {  
                setWords(data);
            } 
        }

        getWords();
    }, [lesson])

    // get words into quizList
    useEffect(() => {setQuiz(getQuestionChoices(wordList, 10));}, [wordList]);

    // keep track of current question and how many we've answered
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answeredQs, setAnsweredQs] = useState(0);

    const nextQ = () => {
        // only lets you advance if you got this Q right
        if (answeredQs > currentIndex) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % quizList.length);
        }
    };

    const prevQ = () => {
        // don't go back further than 0
        if (currentIndex !== 0) {
            setCurrentIndex((prevIndex) => prevIndex === 0 ? quizList.length - 1 : prevIndex - 1);
        }
    };

    const setFirstQ = () => {
        setCurrentIndex(0);
    }

    const setLastQ = () => {
        // go to last answered question
        if(answeredQs < quizList.length) {
            setCurrentIndex(answeredQs);
        }
        else {setCurrentIndex(quizList.length - 1);}
    }

    // function to choose 10 random words for each quiz
    const getQuestionChoices = (wordList, quizLength) => {
        if (answeredQs > 0) {
            // already exists; do not recreate
            return quizList;
        }
        let answerBank = wordList.slice(); // .slice is creating a copy so we don't modify the original
        let randInt = 0;
        let result = [];
        for (let i = 0; i < quizLength; i++) {
            // choose a unique word, add it to quizList
            randInt = Math.floor(Math.random() * (answerBank.length));
            result = [...result, answerBank[randInt]];
            answerBank.splice(randInt, 1);
        }
        return result;
    }

    // function to choose 3 random wordList that aren't the word in question + the word (for mult choice answers) 
    const getAnswerChoices = (index, wordList) => {
        if (wordList.length <= 1) {
            // not yet loaded
            return [];
        }
        let answerBank = wordList.slice();
        let answers = [quizList[index].English];
        // remove the correct answer from possible answers
        answerBank = answerBank.filter((val) => {return val.English !== quizList[index].English;});
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
        if (answeredQs < quizList.length) {
            setAnsweredQs(answeredQs + 1);
        }
    }

    return (
        <div>
            <br/>
            <h1 className='page-title'>Lesson {lesson} Quiz</h1>
            <Quiz word={quizList[currentIndex]} 
                answers={getAnswerChoices(currentIndex, wordList)} 
                current_num={currentIndex}
                answeredQs={answeredQs} 
                onAnsweredQ={onAnsweredQ} 
            />
            <div>
                js
                <button onClick={setFirstQ}>&lt;&lt;</button>
                <button onClick={prevQ}>&lt;</button>
                &nbsp;{currentIndex + 1} / {quizList.length}&nbsp;
                <button onClick={nextQ}>&gt;</button>
                <button onClick={setLastQ}>&gt;&gt;</button>

                &nbsp;answered Qs: {answeredQs} &nbsp;&nbsp; {answeredQs >= quizList.length ? "Complete!" : ""}

            </div>
        </div>
    );
};

export default Quizzes;
