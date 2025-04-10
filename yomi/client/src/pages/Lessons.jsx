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
            border: "1px solid #ddd",
            borderRadius: "15px", // More rounded
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
            marginBottom: "10px",
            transition: "all 0.3s ease", // Smooth transition for hover effects
            "&:hover": {
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)", // Hover shadow
              transform: "translateY(-5px)", // Lift the accordion on hover
            },
            "& .MuiAccordionSummary-root": {
              backgroundColor: "#f7f7f7", // Light background color
              borderRadius: "12px", // Rounded corners for the summary
            },
            "& .MuiAccordionSummary-content": {
              fontWeight: 600, // Bold text for the title
            },
            "& .MuiAccordionSummary-expandIconWrapper": {
              transform: "none",
            },
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<CircularProgressWithLabel value={10} />}
            aria-controls={`lesson${index + 1}`}
            id={`panel${index + 1}-header`}
            sx={{
              padding: "15px 20px", // Increased padding for a more spacious look
            }}
          >
            <Typography component="span" sx={{ fontSize: "18px" }}>
              {lesson.title}
            </Typography>
          </AccordionSummary>

          <Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ padding: "10px 20px" }}>
            <AccordionActions>
              <Link to="/404">
                <Button sx={styles.button}>Vocabulary</Button>
              </Link>
              <Link
                to={{
                  pathname: "/quizzes",
                  search: `?lesson=${index + 1}`,
                }}
              >
                <Button sx={styles.button}>Quizzes</Button>
              </Link>
              <Link
                to={{
                  pathname: "/flashcards",
                  search: `?lesson=${index + 1}`,
                }}
              >
                <Button sx={styles.button}>Flashcards</Button>
              </Link>
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
    padding: "20px", // Added padding to the container for a cleaner layout
  },
  button: {
    marginRight: "10px",
    backgroundColor: "#007bff", // Primary color for the buttons
    color: "#fff",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: "#0056b3", // Darker shade on hover
    },
  },
};

export default Lessons;
