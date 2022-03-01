import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { motion, AnimatePresence } from "framer-motion";
import { genres } from "../../../Genre/genre";

const modalVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const posterImg = "https://image.tmdb.org/t/p/original/";
const noCastImg =
  "https://thumbs.dreamstime.com/b/no-image-available-icon-177641087.jpg";

const noImgAvailable =
  "https://www.murcal.com/scs/extensions/Workdom/Summit_June_2021_2/1.0.0/img/no_image_available.jpeg";

const Modal = (props) => {
  const [MovieCast, setMovieCast] = useState([]);
  const [key, setKey] = useState(null);
  const [imgSize, setImgSize] = useState(false);
  useEffect(() => {
    if (props.SelectedCard.media_type === 0) {
      props.SelectedCard.media_type = "movie";
    }
    if (props.SelectedCard.media_type === 1) {
      props.SelectedCard.media_type = "tv";
    }
    axios
      .get(
        `${props.SelectedCard.media_type}/${props.SelectedCard.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        console.log(data);
        setMovieCast(data.cast);
      })
      .catch((err) => {
        throw err;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.showBackdrop]);
  useEffect(() => {
    if (props.SelectedCard.media_type === 0) {
      props.SelectedCard.media_type = "movie";
    }
    if (props.SelectedCard.media_type === 1) {
      props.SelectedCard.media_type = "tv";
    }
    axios
      .get(
        `${props.SelectedCard.media_type}/${props.SelectedCard.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        console.log(props.SelectedCard);
        setKey(data.results[0]?.key);
      })
      .catch((err) => {
        throw err;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.showBackdrop]);

  function handleImgPath() {
    if (window.innerWidth >= 480) {
      setImgSize(true);
    } else {
      setImgSize(false);
    }
  }

  useEffect(() => {
    handleImgPath();
    window.addEventListener("resize", handleImgPath);
    return () => {
      window.removeEventListener("resize", handleImgPath);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function truncateOverview(overview) {
    return overview?.length >= 170
      ? overview.substring(0, 169) + " ..."
      : overview;
  }
  function checkGenres(genreArray) {
    let genreList = genreArray?.map((num) => {
      return genres?.find((genre) => genre.id === num);
    });
    genreList = genreList.filter((i) => i !== undefined);
    return genreList.map((genre) => (
      <p
        key={genre.id}
        style={{
          margin: "5px",
          borderRadius: "7px",
          background: "white",
          color: "#000",
          padding: "2px 10px",
          fontWeight: "bold",
        }}
      >
        {genre.name}
      </p>
    ));
  }
  return (
    <>
      <Backdrop
        show={props.showBackdrop}
        closeBackdrop={props.BackdropHandler}
      />
      <AnimatePresence exitBeforeEnter>
        {props.showBackdrop && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="Modal"
            style={{
              opacity: props.showBackdrop ? "1" : "0",
            }}
          >
            <h2>{`${props.SelectedCard.title || props.SelectedCard.name}`}</h2>
            <img
              className="modal__banner__img"
              src={
                props.SelectedCard.poster_path &&
                props.SelectedCard.backdrop_path
                  ? `${posterImg}${
                      imgSize
                        ? props.SelectedCard.poster_path
                        : props.SelectedCard.backdrop_path
                    }`
                  : noImgAvailable
              }
              alt={
                `${props.SelectedCard.title}` || `${props.SelectedCard.name}`
              }
            />
            <img
              src={`${posterImg}${props.SelectedCard.poster_path}`}
              className="modal__poster__img"
              alt={props.SelectedCard.name}
            />
            <a
              href={`https://www.youtube.com/watch?v=${key}`}
              target="_blank"
              rel="noreferrer"
              style={{
                position: "absolute",
                left: "10%",
                top: "38%",
                padding: "20px",
                clipPath: "circle()",
                cursor: "pointer",
              }}
            >
              <YouTubeIcon style={{ color: "red", fontSize: "2rem" }} />
            </a>
            <div className="movie__info">
              <div className="genre__section">
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {checkGenres(props.SelectedCard.genre_ids)}
                </div>
              </div>
              <div className="overview">
                <p>
                  {props.SelectedCard.overview
                    ? truncateOverview(props.SelectedCard.overview)
                    : "No Description Available"}
                </p>
                {MovieCast.length !== 0 ? (
                  <div className="movie__cast">
                    {MovieCast?.map((people) => {
                      return (
                        <img
                          key={people.id}
                          src={
                            people.profile_path
                              ? `${posterImg}${people?.profile_path}`
                              : noCastImg
                          }
                          alt={people.name}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <p>No Casts Available</p>
                )}
              </div>
            </div>
            {/* <div className="laptop__only">
              <h3>{props.SelectedCard.title || props.SelectedCard.name}</h3>
              <div className="movie__description">
                {props.SelectedCard.overview
                  ? props.SelectedCard.overview
                  : "No Description Available"}
              </div>
              {MovieCast.length !== 0 ? (
                <div className="cast__img">
                  {MovieCast?.map((people) => {
                    return (
                      <div
                        style={{ display: "flex", flexDirection: "column" }}
                        key={people.id}
                      >
                        <img
                          key={people.id}
                          src={
                            people.profile_path
                              ? `${posterImg}${people?.profile_path}`
                              : noCastImg
                          }
                          alt={people.name}
                        />
                        <p>{people.name}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No Casts Available</p>
              )}
              <button className="modal__btn">
                <a
                  href={`https://www.youtube.com/watch?v=${key}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <YouTubeIcon style={{ fontSize: "2.5rem" }} />{" "}
                  <span>Watch Trailer</span>
                </a>
              </button>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Modal;
