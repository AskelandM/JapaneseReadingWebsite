import React from "react";
import Concentration from "../components/Concentration";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";
import supabase from "../supabaseclient";
import "../styling/game.css";

const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lessonID = searchParams.get("lesson");
  const [lessonTitle, setLessonTitle] = React.useState("");

  React.useEffect(() => {
    const fetchTitle = async (id) => {
      const { data, error } = await supabase
        .from("lessons")
        .select("title")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching lesson title:", error);
        return "";
      }
      return data.title;
    };
    fetchTitle(lessonID).then((title) => {
      setLessonTitle(title);
    });
  }, [lessonID]);

  return (
    <div className="game-container">
      <h1 className="game-title">{lessonTitle}</h1>
      <div className="game-box">
        <Concentration lessonID={lessonID} />
      </div>
    </div>
  );
};

export default Game;
