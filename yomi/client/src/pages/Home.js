import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <table>
        <tr>
          <td></td>
          <th>Daily Leaderboard....</th>
          <th>Weekly Leaderboard</th>
        </tr>
        <tr>
          <td>1.</td>
          <td>
            Morgan Askeland
            <br />
            300 pts
          </td>
          <td>
            Morgan Askeland
            <br />
            300 pts
          </td>
        </tr>
        <tr>
          <td>2.</td>
          <td>
            Morgan Askeland
            <br />
            300 pts
          </td>
          <td>
            Morgan Askeland
            <br />
            300 pts
          </td>
        </tr>
        <tr>
          <td>3.</td>
          <td>
            Morgan Askeland
            <br />
            300 pts
          </td>
          <td>
            Morgan Askeland
            <br />
            300 pts
          </td>
        </tr>
      </table>
      <hr />
      <h2>
        <Link to="/leaderboard">Leaderboard</Link>
      </h2>
      <h2>
        <Link to="/katakana">Katakana Practice</Link>
      </h2>
      <h2>
        <Link to="/lessons">Lessons</Link>
      </h2>
    </>
  );
};

export default Home;
