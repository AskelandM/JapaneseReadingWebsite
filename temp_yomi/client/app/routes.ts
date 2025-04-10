import {
    type RouteConfig,
    route,
    index,
    layout,
  } from "@react-router/dev/routes";
  
  export default [
    layout("./pages/Layout.jsx", [
        index("./pages/Home.jsx"),
        index("./pages/Leaderboard.jsx"),
        index("./pages/Profile.jsx"),
      //index("./pages/Home.js"),
      //route("quizzes", "./pages/Quizzes.js"),
      //route("flashcards", "./pages/Flashcards.jsx"),
      //route("leaderboard", "./pages/Leaderboard.jsx"),
      //route("lessons", "./pages/Lessons.jsx"),
      //route("profile", "./pages/Profile.jsx"),
      //route("404", "./pages/NoPage.js"),
    ]),
    // fallback route for users not signed in (logic handled in Layout or root)
    //route("*", "./pages/SignIn.jsx"),
  ] satisfies RouteConfig;
  