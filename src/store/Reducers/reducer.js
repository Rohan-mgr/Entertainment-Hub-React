import * as actionTypes from "../actions/actionTypes";

const initialState = {
  showScroller: false,
  showBackdrop: false,
  movie: {},
  homeScroller: true,
  searchText: "",
  searchField: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_SCROLLER:
      return {
        ...state,
        showScroller: action.scrollerStatus,
      };
    case actionTypes.END_SCROLLER:
      return {
        ...state,
        showScroller: action.scrollerStatus,
      };
    case actionTypes.SHOW_SEARCH_FIELD:
      return {
        ...state,
        searchField: action.searchField,
      };
    case actionTypes.HIDE_SEARCH_FIELD:
      return {
        ...state,
        searchField: action.searchField,
      };
    case actionTypes.START_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.inputText,
      };
    }
    case actionTypes.START_MOVIE_SELECTION:
      return {
        ...state,
        movie: action.selectedMovie,
      };
    case actionTypes.SHOW_BACKDROP:
      return {
        ...state,
        showBackdrop: action.handleBackdrop,
      };
    case actionTypes.HIDE_BACKDROP:
      return {
        ...state,
        showBackdrop: action.handleBackdrop,
      };
    case actionTypes.START_HOMEPAGE_SCROLLER:
      return {
        ...state,
        homeScroller: action.homePage,
      };
    case actionTypes.END_HOMEPAGE_SCROLLER:
      return {
        ...state,
        homeScroller: action.homePage,
      };
    default:
      return state;
  }
};
export default reducer;
