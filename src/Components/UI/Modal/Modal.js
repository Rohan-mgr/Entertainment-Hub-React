import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import YouTubeIcon from "@mui/icons-material/YouTube";

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
    axios
      .get(
        `${props.SelectedCard.media_type}/${props.SelectedCard.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        setMovieCast(data.cast);
      })
      .catch((err) => {
        throw new Error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    axios
      .get(
        `${props.SelectedCard.media_type}/${props.SelectedCard.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        setKey(data.results[0]?.key);
      })
      .catch((err) => {
        throw new Error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  return (
    <>
      <Backdrop
        show={props.showBackdrop}
        closeBackdrop={props.BackdropHandler}
      />
      <div
        className="Modal"
        style={{
          transform: props.showBackdrop ? "translateY(0)" : "translateY(-100%)",
          opacity: props.showBackdrop ? "1" : "0",
        }}
      >
        <img
          className="modal__img"
          src={
            props.SelectedCard.poster_path && props.SelectedCard.backdrop_path
              ? `${posterImg}${
                  imgSize
                    ? props.SelectedCard.poster_path
                    : props.SelectedCard.backdrop_path
                }`
              : noImgAvailable
          }
          alt={`${props.SelectedCard.title}` || `${props.SelectedCard.name}`}
        />
        <div className="laptop__only">
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
        </div>
      </div>
    </>
  );
};
export default Modal;
