import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import supabase from "../supabaseclient.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../styling/vocab.css";

function Vocab () {
    // get lesson # from URL
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const lesson = searchParams.get("lesson");

    const [wordList, setWords] = useState([
        { id: 0, kana: "loading", kanji: "loading", English: "loading" }
    ]);

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
                addWordNum(data);
            }
        }

        getWords();
    }, [lesson]);

    function addWordNum(data) {
        const data2 = data.map((row, index) => ({
            index: index + 1,
            ...row
        }));
        setWords(data2);
    }

    return (
        <div className="vocab-container">
            <div className="vocab-scrollbox">
                <h1 className="vocab-title">Lesson {lesson} Vocabulary</h1>
                <TableContainer component={Paper} className="vocab-table-container">
                    <Table size="small" aria-label="vocab table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>English</TableCell>
                                <TableCell>漢字</TableCell>
                                <TableCell>カナ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {wordList.map((row) => (
                                <TableRow key={row.index}>
                                    <TableCell>{row.index}</TableCell>
                                    <TableCell>{row.English}</TableCell>
                                    <TableCell>{row.kanji}</TableCell>
                                    <TableCell>{row.kana}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Vocab;
