import * as React from "react";
import { useEffect } from "react";
import LessonCard from "../components/LessonCard";
import "../styling/lessons.css"

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
    <div className="lessons-container">
      <div className="lessons-scroll-box">
        {lessonData.map((lesson, index) => (
          <LessonCard key={index} lesson={lesson} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
