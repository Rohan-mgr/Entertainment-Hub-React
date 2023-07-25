import React from "react";
import "./App.css";
import Nav from "./Components/Navigation/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Movies from "./Components/Pages/Movies/Movies";
import Search from "./Components/Pages/Search/Search";
import Trending from "./Components/Pages/Trending/Trending";
import TvSeries from "./Components/Pages/TvSeries/TvSeries";
import { connect } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";

const override = css`
  z-index: 1;
  position: absolute;
`;

function App(props) {
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    console.log(preloader);
    preloader.classList.add("remove__preloader");
  });
  let routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/search" element={<Search />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/tvseries" element={<TvSeries />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
  return (
    <div className="app">
      <div className="preloader">
        <HashLoader color={"#353636"} css={override} loading={true} size={60} />
      </div>
      <>
        <Nav />
        {routes}
      </>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showScroller: state.showScroller,
    showBackdrop: state.showBackdrop,
    homeScroller: state.homeScroller,
  };
};

export default connect(mapStateToProps)(App);
