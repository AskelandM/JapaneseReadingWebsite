import Concentration from "../components/Concentration";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";

const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lesson = searchParams.get("lesson");
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Lesson {lesson}</h1>
      <Concentration lesson={lesson} />
    </div>
  );
};

export default Game;
