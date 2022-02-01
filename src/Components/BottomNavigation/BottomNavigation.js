import React from "react";
import "./BottomNavigation.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";

function BottomNavigation() {
  return (
    <div className="botton__Navigation">
      <div className="botton__Navigation__contents">
        <NavLink
          to="/trending"
          className={({ isActive }) =>
            isActive ? "botton__icons__active" : "botton__icons"
          }
        >
          <WhatshotIcon /> <br /> Trending
        </NavLink>
        <NavLink
          to="tvseries"
          className={({ isActive }) =>
            isActive ? "botton__icons__active" : "botton__icons"
          }
        >
          <PersonalVideoIcon /> <br /> Tv Series
        </NavLink>
        <NavLink
          to="movies"
          className={({ isActive }) =>
            isActive ? "botton__icons__active" : "botton__icons"
          }
        >
          <MovieIcon /> <br /> Movies
        </NavLink>
        <NavLink
          to="search"
          className={({ isActive }) =>
            isActive ? "botton__icons__active" : "botton__icons"
          }
        >
          <SearchIcon /> <br /> Search
        </NavLink>
      </div>
    </div>
  );
}

export default BottomNavigation;
