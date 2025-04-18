import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { AccordionActions, Box, Button } from "@mui/material";
import CircularProgressWithLabel from "../components/ProgressCircle";
import * as React from "react";

const LessonCard = ({ lesson, index }) => {
  //Lesson ID < 100 are hardcode Genki Lessons, over 100 are custom lessons
  const [lessonID, setLessonID] = React.useState(lesson.id);
  return (
    <Accordion
      sx={{
        border: "1px solid black",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <AccordionSummary
        expandIcon={<CircularProgressWithLabel value={10} />}
        aria-controls={`lesson${lessonID}`}
        id={`panel${lessonID}-header`}
        sx={{
          "& .MuiAccordionSummary-expandIconWrapper": {
            transform: "none",
          },
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "none",
          },
        }}
      >
        <Typography component="span">
          {lessonID > 100 ? "Bonus: " + lesson.title : lesson.title}
        </Typography>
      </AccordionSummary>

      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <AccordionActions>
          <Link
            to={{
              pathname: "/Vocab",
              search: `?lesson=${lessonID}`,
            }}
          >
            <Button>Vocabulary</Button>
          </Link>
          <Link
            to={{
              pathname: "/flashcards",
              search: `?lesson=${lessonID}`,
            }}
          >
            <Button>Flashcards</Button>
          </Link>
          <Link
            to={{
              pathname: "/quizoptions",
              search: `?lesson=${lessonID}`,
            }}
          >
            <Button>Quizzes</Button>
          </Link>
          <Link
            to={{
              pathname: "/game",
              search: `?lesson=${lessonID}`,
            }}
          >
            <Button>Game</Button>
          </Link>
        </AccordionActions>
      </Box>
    </Accordion>
  );
};

export default LessonCard;
