import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <hr />
      <h2>
        <Link to="/leaderboard">Leaderboard</Link>
      </h2>
      <h2>
        <Link to="/quizzes">Quizzes</Link>
      </h2>
      <h2>
        <Link to="/lessons">Lessons</Link>
      </h2>
      <h2>
        <Link to="/profile">Profile</Link>
      </h2>
    </>
  );
};

export default Home;
