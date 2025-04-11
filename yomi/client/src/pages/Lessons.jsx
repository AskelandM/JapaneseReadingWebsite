import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { AccordionActions, Box, Button, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgressWithLabel from "../components/ProgressCircle";

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
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.pageTitle}>
        Your Lessons
      </Typography>
  
      {/* Scrollable accordion container */}
      <Box sx={styles.scrollBox}>
        {lessonData.map((lesson, index) => (
          <Accordion
            key={index}
            sx={{
              borderRadius: "18px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
              marginBottom: "16px",
              overflow: "hidden",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`lesson${index + 1}`}
              id={`panel${index + 1}-header`}
              sx={{
                bgcolor: "#fafafa",
                padding: "16px 24px",
                "& .MuiTypography-root": {
                  fontWeight: 600,
                  fontSize: "20px",
                },
                "& .MuiAccordionSummary-content": {
                  alignItems: "center",
                  gap: 2,
                },
              }}
            >
              <Box sx={{ flexGrow: 1 }}>{lesson.title}</Box>
              <CircularProgressWithLabel value={lesson.progress || 10} />
            </AccordionSummary>
  
            <Divider />
  
            <AccordionActions sx={{ justifyContent: "left", padding: "16px" }}>
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
          </Accordion>
        ))}
      </Box>
    </Box>
  );
  
};

const styles = {
  container: {
    padding: "40px 24px",
    width: "100%",
  },
  pageTitle: {
    fontWeight: 700,
    marginBottom: "24px",
    textAlign: "center",
  },
  scrollBox: {
    maxHeight: "70vh", // Or set a specific height like '500px'
    overflowY: "auto",
    paddingRight: "10px", // Optional: space for scrollbar
  },
  accordion: {
    border: "1px solid #ddd",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
      transform: "translateY(-5px)",
    },
    "& .MuiAccordionSummary-root": {
      backgroundColor: "#f7f7f7",
      borderRadius: "12px",
    },
    "& .MuiAccordionSummary-content": {
      fontWeight: 600,
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      transform: "none",
    },
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "none",
    },
  },
  button: {
    marginRight: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
};


export default Lessons;
