import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { AccordionActions, Box, Button } from "@mui/material";
import CircularProgressWithLabel from "../components/ProgressCircle";

//lessonData is an array of JSON objects with values "title" and "progress"
const Lessons = () => {
  const [lessonData, setLessons] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/lessons");
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={styles.lessons}>
      {lessonData.map((lesson, index) => (
        <Accordion
          sx={{
            border: "1px solid black",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <AccordionSummary
            expandIcon={<CircularProgressWithLabel value={10} />}
            aria-controls={`lesson${index + 1}`}
            id={`panel${index + 1}-header`}
            sx={{
              "& .MuiAccordionSummary-expandIconWrapper": {
                transform: "none",
              },
              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                transform: "none",
              },
            }}
          >
            <Typography component="span">{lesson.title}</Typography>
          </AccordionSummary>

          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <AccordionActions>
              <Button>Vocabulary</Button>
              <Link to={{
                  pathname: "/flashcards",
                  search: `?lesson=${index+1}`
                }}></Link><Button>Flashcards</Button>
              <Link to={{
                  pathname: "/quizoptions",
                  search: `?lesson=${index+1}`
                }}><Button>Quizzes</Button></Link>
            </AccordionActions>
          </Box>
        </Accordion>
      ))}
    </div>
  );
};

const styles = {
  lessons: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
};

export default Lessons;
