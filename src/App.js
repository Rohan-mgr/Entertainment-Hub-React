import React, { useState, useEffect } from "react";
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

function App(props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
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
      {loading ? (
        <HashLoader color={"353636"} loading={loading} size={60} />
      ) : (
        <>
          <Nav />
          {routes}
        </>
      )}
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
