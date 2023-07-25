import React, { useEffect } from "react";
import "./Home.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import Footer from "../Footer/Footer";
import Typewriter from "typewriter-effect";

const homeImgUrl = "https://i.imgur.com/9GyUbrB.jpg";
function Home(props) {
  useEffect(() => {
    window.scroll(0, 0);
    props.onSearching("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleHomePageScroll() {
    console.log(window.scrollY);
    if (window.scrollY >= 100) {
      props.onStartScrolling();
    } else {
      props.onEndScrolling();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleHomePageScroll);
    return () => {
      window.removeEventListener("scroll", handleHomePageScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      <div className="home__contents">
        <img src={homeImgUrl} alt={"Logo.jpeg"} />
        <div className="hero__contents">
          <div className="animate__text">
            <span>
              ENTERTAINMENT HUB is the movie app where you can get the
              information about
              <Typewriter
                options={{
                  strings: [
                    "<span><strong> Trendings.</strong></h4>",
                    "<span><strong> Popular Movies.<strong</span>",
                    "<span><strong> Popular Tv Series.</strong></span>",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </div>
        </div>
        <div className="homeImg__overlay"></div>
      </div>

      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStartScrolling: () => dispatch(actions.startHomePageScroller()),
    onEndScrolling: () => dispatch(actions.endHomePageScroller()),
    onSearching: (searchText) => dispatch(actions.startSearchText(searchText)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
