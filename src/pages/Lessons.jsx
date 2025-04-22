import * as React from "react";
import { useEffect } from "react";
import LessonCard from "../components/LessonCard";
import "../styling/lessons.css";
import supabase from "../supabaseclient";

//lessonData is an array of JSON objects with values "title" and "progress"
const Lessons = () => {
  const [lessonData, setLessons] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const lessons = await supabase.from("lessons").select("*");
        if (lessons.error) {
          console.error("Error fetching lessons:", lessons.error);
          return;
        }
        const data = lessons.data;
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
