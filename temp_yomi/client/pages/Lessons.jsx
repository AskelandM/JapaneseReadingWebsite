import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Accordion,
  AccordionSummary,
  AccordionActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import CircularProgressWithLabel from "../components/ProgressCircle";

// lessonData is an array of JSON objects with values "title" and "progress"
const Lessons = () => {
  const [lessonData, setLessons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/lessons");
        const data = await response.json();
        setLessons(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <Box sx={styles.lessons}>
      {lessonData.map((lesson, index) => (
        <Accordion
          key={index}
          sx={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<CircularProgressWithLabel value={lesson.progress || 10} />}
            aria-controls={`lesson${index + 1}`}
            id={`panel${index + 1}-header`}
            sx={styles.accordionSummary}
          >
            <Typography fontSize={18} fontWeight={600}>
              {lesson.title}
            </Typography>
          </AccordionSummary>

          <Box display="flex" justifyContent="flex-start" px={2} pb={2}>
            <AccordionActions>
              <Link to="/404">
                <Button sx={styles.button}>Vocabulary</Button>
              </Link>
              <Link to={`/quizzes?lesson=${index + 1}`}>
                <Button sx={styles.button}>Quizzes</Button>
              </Link>
              <Link to={`/flashcards?lesson=${index + 1}`}>
                <Button sx={styles.button}>Flashcards</Button>
              </Link>
            </AccordionActions>
          </Box>
        </Accordion>
      ))}
    </Box>
  );
};

const styles = {
  lessons: {
    width: "100%",
    padding: 2,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  accordion: {
    border: "1px solid #ddd",
    borderRadius: 3,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
      transform: "translateY(-5px)",
    },
    "& .MuiAccordionSummary-root": {
      backgroundColor: "#f9f9f9",
      borderRadius: "12px",
    },
  },
  accordionSummary: {
    padding: "15px 20px",
  },
  button: {
    mr: 2,
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
};

export default Lessons;
