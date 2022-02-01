import React, { useState, useEffect } from "react";
import "./Movies.css";
import axios from "../../../axios";
import request from "../../../request";
import Card from "../../Card/Card";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import Modal from "../../UI/Modal/Modal";

function Movies(props) {
  const [Movies, setMovies] = useState([]);

  function handleScroller() {
    if (window.scrollY >= 1200) {
      props.onStartScrolling();
    } else {
      props.onEndScrolling();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroller);
    return () => {
      window.removeEventListener("scroll", handleScroller);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMovies() {
    const { data } = await axios.get(request.fetchMovies);
    setMovies(data.results);
  }
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleCardClick = (movie) => {
    props.onShowBackdrop();
    props.onStartMovieSelection({ ...movie, media_type: "movie" });
  };

  const handleBackdrop = () => {
    props.onHideBackdrop();
  };

  return (
    <div className="movies">
      {Movies?.map((item) => {
        return (
          <Card
            key={item.id}
            Name={item.title}
            ImgSrc={item.poster_path}
            MediaType={item.media_type}
            Rating={item.vote_average}
            ReleaseDate={item.release_date}
            clicked={() => handleCardClick(item)}
          />
        );
      })}
      {props.showScroller ? (
        <ArrowCircleUpIcon
          onClick={() => window.scroll(0, 0)}
          className="top__scroller"
        />
      ) : null}
      {props.showBackdrop && (
        <Modal
          showBackdrop={props.showBackdrop}
          BackdropHandler={handleBackdrop}
          SelectedCard={props.movie}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showScroller: state.showScroller,
    movie: state.movie,
    showBackdrop: state.showBackdrop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartScrolling: () => dispatch(actions.startScroller()),
    onEndScrolling: () => dispatch(actions.endScroller()),
    onStartMovieSelection: (movie) =>
      dispatch(actions.startMovieSelection(movie)),
    onShowBackdrop: () => dispatch(actions.showBackdrop()),
    onHideBackdrop: () => dispatch(actions.hideBackdrop()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
