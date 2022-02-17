import React, { useState, useEffect } from "react";
import "./TvSeries.css";
import axios from "../../../axios";
import request from "../../../request";
import Card from "../../Card/Card";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import Modal from "../../UI/Modal/Modal";
import Footer from "../Footer/Footer";

function TvSeries(props) {
  const [TvSeries, setTvSeries] = useState([]);

  function handleScroller() {
    if (window.scrollY >= 1100) {
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

  async function fetchTvSeries() {
    const { data } = await axios.get(request.fetchTvSeries);
    setTvSeries(data.results);
  }
  useEffect(() => {
    props.onSearching("");
    window.onload = () => window.scroll(0, 0);
    fetchTvSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (movie) => {
    props.onShowBackdrop();
    props.onStartMovieSelection({ ...movie, media_type: "tv" });
  };

  const handleBackdrop = () => {
    props.onHideBackdrop();
  };

  return (
    <>
      <div className="tv__Series">
        {TvSeries?.map((item, index) => {
          return (
            <Card
              key={item.id}
              i={index}
              Name={item.name}
              ImgSrc={item.poster_path}
              GenreIds={item.genre_ids}
              Rating={item.vote_average}
              ReleaseDate={item.first_air_date}
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
        <Modal
          showBackdrop={props.showBackdrop}
          BackdropHandler={handleBackdrop}
          SelectedCard={props.movie}
        />
      </div>
      {TvSeries.length !== 0 ? <Footer /> : null}
    </>
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
    onSearching: (searchText) => dispatch(actions.startSearchText(searchText)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TvSeries);
