import React, { useState, useEffect } from "react";
import "./Search.css";
import axios from "../../../axios";
import Card from "../../Card/Card";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Modal from "../../UI/Modal/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../Footer/Footer";

const outerTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

function Search(props) {
  const [searchType, setSearchType] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isResultsFound, setResultsFound] = useState(false);

  async function searchContents() {
    let { data } = await axios.get(
      `search/${searchType === 0 ? "movie" : "tv"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&query=${props.searchText}&language=en-US`
    );
    setResultsFound(data?.results.length === 0);
    setSearchResults(data?.results);
    window.scroll(0, 0);
  }

  useEffect(() => {
    window.scroll(0, 0);
    searchContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchType, props.searchText]);

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
      <h3 style={{ textAlign: "center", position: "absolute", color: "red" }}>
        {searchType === 0 ? "No Movies Found 🚫" : "No Tv Series Found 🚫"}
      </h3>
    );
  }
  if (searchResults?.length > 0) {
    searchCmp = searchResults?.map((item, index) => {
      return (
        <Card
          key={item.id}
          i={index}
          Name={item.title || item.name}
          ImgSrc={item.poster_path}
          GenreIds={item.genre_ids}
          Rating={item.vote_average}
          ReleaseDate={item.release_date || item.first_air_date}
          clicked={() => handleCardClick(item)}
        />
      );
    });
  }
  return (
    <>
      <ThemeProvider theme={outerTheme}>
        <Tabs
          className="search__contents"
          value={searchType}
          indicatorColor="primary"
          variant="fullWidth"
          textColor="primary"
          onChange={(e, newValue) => {
            setSearchType(newValue);
          }}
        >
          <Tab style={{ color: "#fff" }} label="Movies" />
          <Tab style={{ color: "#fff" }} label="Tv Series" />
        </Tabs>
      </ThemeProvider>
      <div className="search__cards">
        {searchCmp}
        <Modal
          showBackdrop={props.showBackdrop}
          BackdropHandler={handleBackdrop}
          SelectedCard={props.movie}
        />
      </div>
      {props.showScroller ? (
        <ArrowCircleUpIcon
          onClick={() => window.scroll(0, 0)}
          className="top__scroller"
        />
      ) : null}

      {searchResults.length !== 0 ? <Footer /> : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    showScroller: state.showScroller,
    movie: state.movie,
    showBackdrop: state.showBackdrop,
    searchText: state.searchText,
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
