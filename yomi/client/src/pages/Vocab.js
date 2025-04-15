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

function Vocab () {
    // get lesson # from URL
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const lesson = searchParams.get("lesson");

    // all words for this lesson
    const [wordList, setWords] = useState([{ id: 0, kana: "loading", kanji: "loading", English: "loading" }]);

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
            addWordNum(data); // sets words, but also adds indices
        }
        }

        getWords();
    }, [lesson]);

    function addWordNum(data) {
        let data2 = data.slice();
        data.map((row, index) => {
            data2[index] = {index: index, ...row};
        })
        setWords(data2);
    }

    // display in table (map function)
    return (
        <TableContainer component={Paper}>
        <Table sx={{ maxWidth: "sm", margin: "auto" }} size="small" aria-label="simple table">
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
                <TableRow
                key={row.kanji}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell>{row.index}</TableCell>
                <TableCell>{row.English}</TableCell>
                <TableCell component="th" scope="row">{row.kanji}</TableCell>
                <TableCell>{row.kana}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
};

export default Vocab;