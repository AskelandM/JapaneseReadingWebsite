import * as React from "react";
import { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { AccordionActions, Box, Button, CircularProgress } from "@mui/material";

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        color={
          props.value < 25 ? "error" : props.value < 75 ? "warning" : "success"
        }
        variant="determinate"
        value={props.value}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {Math.round(props.value)}
        </Typography>
      </Box>
    </Box>
  );
}

//lessonData is an array of JSON objects with values "title" and "progress"
const Lessons = () => {
  const [lessonData, setLessons] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/lessons");
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {lessonData.map((lesson, index) => (
        <Accordion
          sx={{
            border: "1px solid black",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <AccordionSummary
            expandIcon={<CircularProgressWithLabel value={lesson.progress} />}
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
              <Button>Flashcards</Button>
              <Button>Quizzes</Button>
            </AccordionActions>
          </Box>
        </Accordion>
      ))}
    </div>
  );
};

export default Lessons;
