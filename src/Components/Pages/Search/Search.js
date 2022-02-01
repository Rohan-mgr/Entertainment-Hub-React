import React, { useState, useEffect } from "react";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "../../../axios";
import Card from "../../Card/Card";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Modal from "../../UI/Modal/Modal";

function Search(props) {
  const [searchType, setSearchType] = useState("movie");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isResultsFound, setResultsFound] = useState(false);
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleOptionChange = (e) => {
    if (searchText) {
      setResultsFound(true);
    }
    if (e.target.value === "tv") {
      setSearchType("tv");
    }
    if (e.target.value === "movie") {
      setSearchType("movie");
    }
  };

  async function searchContents() {
    let { data } = await axios.get(
      `search/${searchType}?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}&language=en-US`
    );
    setResultsFound(data?.results.length === 0);
    setSearchResults(data?.results);
    window.scroll(0, 0);
  }

  useEffect(() => {
    window.scroll(0, 0);
    searchContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchType]);

  function handleScroller() {
    if (window.scrollY >= 1200) {
      props.onStartScrolling();
    } else {
      props.onEndScrolling();
    }
  }

  useEffect(() => {
    window.scroll(0, 0);
    window.addEventListener("scroll", handleScroller);
    return () => {
      window.removeEventListener("scroll", handleScroller);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (movie) => {
    props.onShowBackdrop();
    props.onStartMovieSelection({ ...movie, media_type: searchType });
  };

  const handleBackdrop = () => {
    props.onHideBackdrop();
  };

  let searchCmp = (
    <h3 style={{ position: "absolute" }}>Search For Movies or Tv Series</h3>
  );
  if (isResultsFound) {
    searchCmp = (
      <h3 style={{ position: "absolute", color: "red" }}>
        {searchType === "movie"
          ? "No Movies Found 🚫"
          : "No Tv Series Found 🚫"}
      </h3>
    );
  }
  if (searchResults?.length > 0) {
    searchCmp = searchResults?.map((item) => {
      return (
        <Card
          key={item.id}
          Name={item.title || item.name}
          ImgSrc={item.poster_path}
          MediaType={searchType}
          Rating={item.vote_average}
          ReleaseDate={item.release_date || item.first_air_date}
          clicked={() => handleCardClick(item)}
        />
      );
    });
  }
  return (
    <div className="search">
      <div className="search__contents">
        <select onChange={(e) => handleOptionChange(e)}>
          <option value="movie">Movies</option>
          <option value="tv">Tv Series</option>
        </select>
        <input
          type="text"
          placeholder="Search Movies or Tv Series..."
          onChange={(e) => handleChange(e)}
        />
        <button className="search__btn" onClick={searchContents}>
          <SearchIcon />
        </button>
      </div>
      <div className="search__cards">{searchCmp}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
