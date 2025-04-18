import * as React from "react";
import { useEffect } from "react";
import LessonCard from "../components/LessonCard";

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
        <LessonCard lesson={lesson} index={index}></LessonCard>
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
