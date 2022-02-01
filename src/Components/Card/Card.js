import React from "react";
import "./Card.css";
import Badge from "@mui/material/Badge";

const posterImg = "https://image.tmdb.org/t/p/w300/";
const noImgAvailable =
  "https://www.murcal.com/scs/extensions/Workdom/Summit_June_2021_2/1.0.0/img/no_image_available.jpeg";

function Card({ Name, ImgSrc, MediaType, ReleaseDate, clicked, Rating }) {
  return (
    <div className="card" onClick={clicked}>
      <Badge
        style={{ marginRight: "5px" }}
        badgeContent={Rating}
        color={Rating > 6 ? "secondary" : "primary"}
      >
        <img
          src={ImgSrc ? `${posterImg}${ImgSrc}` : noImgAvailable}
          alt={Name}
        />
      </Badge>
      <h4>{Name}</h4>
      <div className="card__subtitle">
        <p>{MediaType === "movie" ? "Movie" : "Tv Series"}</p>
        <p>{ReleaseDate}</p>
      </div>
    </div>
  );
}

export default Card;
