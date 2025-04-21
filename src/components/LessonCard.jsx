import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { AccordionActions, Box, Button } from "@mui/material";
import * as React from "react";

const LessonCard = ({ lesson, index }) => {
  //Lesson ID < 100 are hardcode Genki Lessons, over 100 are custom lessons
  const [lessonID, setLessonID] = React.useState(lesson.id);
  return (
    <Accordion className="lesson-card">
      <AccordionSummary
        aria-controls={`lesson${lessonID}`}
        id={`panel${lessonID}-header`}
        className="lesson-summary"
        sx={{
          "& .MuiAccordionSummary-expandIconWrapper": {
            transform: "none",
          },
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "none",
          },
        }}
      >
        <Typography component="span" className="lesson-title">
          {lessonID > 100 ? "Bonus: " + lesson.title : lesson.title}
        </Typography>
      </AccordionSummary>

      <Box className="lesson-actions">
        <AccordionActions>
          <Link
            to={{
              pathname: "/Vocab",
              search: `?lesson=${lessonID}`,
            }}
          >
            <Button className="lesson-button">Vocabulary</Button>
          </Link>
          <Link
            to={{
              pathname: "/flashcards",
              search: `?lesson=${lessonID}`,
            }}
          >
            <Button className="lesson-button">Flashcards</Button>
          </Link>
          <Link
            to={{
              pathname: "/quizoptions",
              search: `?lesson=${lessonID}`,
            }}
          >
            <Button className="lesson-button">Quizzes</Button>
          </Link>
          <Link
            to={{
              pathname: "/game",
              search: `?lesson=${lessonID}`,
            }}
          >
            <Button className="lesson-button">Game</Button>
          </Link>
        </AccordionActions>
      </Box>
    </Accordion>
  );
};

export default LessonCard;
