import React, { lazy } from "react";
import { Link, useRoutes } from "react-router-dom";
// import Home from './pages/Home'
// import About from './pages/About'
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <>
    <Link to={"/"}>Home</Link>
      {useRoutes([
        { path: "/", element: <Home /> },
      ])}
    </>
  );
};

export default React.memo(App);
