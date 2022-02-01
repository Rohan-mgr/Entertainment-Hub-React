import * as actionTypes from "./actionTypes";

export const startScroller = () => {
  return {
    type: actionTypes.START_SCROLLER,
    scrollerStatus: true,
  };
};

export const endScroller = () => {
  return {
    type: actionTypes.END_SCROLLER,
    scrollerStatus: false,
  };
};

export const startMovieSelection = (movie) => {
  return {
    type: actionTypes.START_MOVIE_SELECTION,
    selectedMovie: movie,
  };
};

export const showBackdrop = () => {
  return {
    type: actionTypes.SHOW_BACKDROP,
    handleBackdrop: true,
  };
};

export const hideBackdrop = () => {
  return {
    type: actionTypes.HIDE_BACKDROP,
    handleBackdrop: false,
  };
};

export const startHomePageScroller = () => {
  return {
    type: actionTypes.START_HOMEPAGE_SCROLLER,
    homePage: false,
  };
};

export const endHomePageScroller = () => {
  return {
    type: actionTypes.END_HOMEPAGE_SCROLLER,
    homePage: true,
  };
};
