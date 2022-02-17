import React from "react";
import "./Card.css";
import { motion } from "framer-motion";
import { genres } from "../../Genre/genre";
import { AiFillStar } from "react-icons/ai";

const trendingVarients = {
  hidden: {
    y: "100vh",
  },
  visible: (i) => ({
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.7,
    },
  }),
};

const posterImg = "https://image.tmdb.org/t/p/w300/";
const noImgAvailable =
  "https://www.murcal.com/scs/extensions/Workdom/Summit_June_2021_2/1.0.0/img/no_image_available.jpeg";

function Card({ Name, ImgSrc, GenreIds, ReleaseDate, clicked, Rating, i }) {
  function checkGenres(genreArray) {
    let genreList = genreArray?.map((num) => {
      return genres?.find((genre) => genre.id === num);
    });
    genreList = genreList.filter((i) => i !== undefined);
    if (window.innerWidth > 480) {
      return genreList.length !== 0
        ? genreList
            ?.slice(0, 2)
            .map((genre) => genre?.name)
            .join(", ")
        : "No Genres";
    } else {
      return genreList.length !== 0
        ? genreList
            ?.slice(0, 1)
            .map((genre) => genre?.name)
            .join(", ")
        : "No Genres";
    }
  }
  const checkName = (Name) => {
    let name = Name;
    if (window.innerWidth <= 480) {
      name = Name.length > 17 ? Name.substring(0, 13) + "..." : Name;
    }
    return name;
  };
  return (
    <motion.div
      variants={trendingVarients}
      initial="hidden"
      animate="visible"
      custom={i}
      className="card"
      onClick={clicked}
    >
      <img src={ImgSrc ? `${posterImg}${ImgSrc}` : noImgAvailable} alt={Name} />
      <h4>{checkName(Name)}</h4>
      <div className="card__subtitle">
        <p style={{ display: "flex", alignItems: "center" }}>
          <AiFillStar style={{ marginRight: "5px" }} />
          {Rating} / 10
        </p>
        <p>{checkGenres(GenreIds)}</p>
      </div>
    </motion.div>
  );
}

export default Card;
