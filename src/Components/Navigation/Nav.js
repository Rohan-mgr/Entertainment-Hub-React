import React from "react";
import "./Nav.css";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useNavigate } from "react-router-dom";

function Nav(props) {
  const Navigate = useNavigate();
  const handleLogoClick = () => {
    Navigate("/");
  };
  return (
    <div className="nav">
      <LocalMoviesIcon style={{ fontSize: "40px" }} />
      <p
        onClick={handleLogoClick}
        style={{ margin: "10px", fontWeight: "bolder", cursor: "pointer" }}
      >
        ENTERTAINMENT HUB
      </p>
      <LiveTvIcon style={{ fontSize: "40px" }} />
    </div>
  );
}

export default Nav;
