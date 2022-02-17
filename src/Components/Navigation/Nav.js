import React, { useState, useRef, useEffect } from "react";
import "./Nav.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions/actions";
import { NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

function Nav(props) {
  const Navigate = useNavigate();
  const [inputVisible, setInputVisible] = useState(false);
  const inputSearchRef = useRef(null);
  const handleLogoClick = () => {
    Navigate("/");
  };
  function handleChange(e) {
    props.onSearching(e.target.value);
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      if (props.searchText !== "") {
        Navigate("/search");
      }
    }
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          alert("You clicked outside of me!");
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(inputSearchRef);

  function showSearchField() {
    inputSearchRef.current.style = "width: 20%; opacity: 1";
    inputSearchRef.current.focus();
  }
  function hideSearchField() {
    setInputVisible(false);
    inputSearchRef.current.style = "width: 0%, opacity: 0";
  }
  return (
    <div className="nav">
      <p
        onClick={handleLogoClick}
        style={{
          margin: "0 auto",
          paddingBottom: "20px",
          cursor: "pointer",
          color: "#fff",
          fontWeight: "bolder",
        }}
      >
        ENTERTAINMENT HUB
      </p>
      <div className="nav__contents">
        <input
          ref={inputSearchRef}
          type="text"
          id="test"
          placeholder="Search Movie or Tv Series..."
          value={props.searchText}
          onChange={(e) => handleChange(e)}
          onKeyPress={(e) => handleKeyPress(e)}
          onBlur={hideSearchField}
        />

        <AiOutlineSearch className="search__icon" onClick={showSearchField} />

        <div className="nav__links">
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              isActive ? "botton__icons__active" : "botton__icons"
            }
          >
            Trendings
          </NavLink>
          <NavLink
            to="tvseries"
            className={({ isActive }) =>
              isActive ? "botton__icons__active" : "botton__icons"
            }
          >
            Tv Series
          </NavLink>
          <NavLink
            to="movies"
            className={({ isActive }) =>
              isActive ? "botton__icons__active" : "botton__icons"
            }
          >
            Movies
          </NavLink>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    searchText: state.searchText,
    searchField: state.searchField,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearching: (searchText) => dispatch(actions.startSearchText(searchText)),
    onShowSearchField: () => dispatch(actions.showSearchField()),
    onHideSearchField: () => dispatch(actions.hideSearchField()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
