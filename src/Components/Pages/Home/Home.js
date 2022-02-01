import React, { useState, useEffect } from "react";
import "./Home.css";
import request from "../../../request";
import axios from "../../../axios";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

const posterImg = "https://image.tmdb.org/t/p/original/";
const homeImgUrl = "https://i.imgur.com/9GyUbrB.jpg";
function Home(props) {
  const [homeMovie, setHomeMovie] = useState({});
  const [homeTv, setHomeTv] = useState({});

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  function handleHomePageScroll() {
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

  async function fetchSeries() {
    let { data } = await axios.get(request.fetchTvSeries);
    setHomeTv(data.results[0]);
  }
  async function fetchMovies() {
    let { data } = await axios.get(request.fetchMovies);
    setHomeMovie(data.results[0]);
  }
  useEffect(() => {
    window.onload = () => window.scroll(0, 0);
    fetchMovies();
    fetchSeries();
  }, []);

  return (
    <div className="home">
      <div className="home__contents">
        <img src={homeImgUrl} alt={"Logo.jpeg"} />
        <div className="hero__contents">
          <h3>
            ENTERTAINMENT HUB
            <sup style={{ color: "crimson" }}>The Movie App</sup>
          </h3>
          <p>
            <strong>ENTERTAINMENT HUB</strong> is the movie app where you can
            get the information about newly release Tv Series, Movies and
            Trendings(Movie or Tv Series). You can also search the movie or the
            Tv Series by their name(title). Futher Information of the Movie or
            Tv Series will be display by clicking the respective Movie or Tv
            Series and you can also watch the Trailer.
          </p>
        </div>
        <div className="homeImg__overlay"></div>
      </div>
      <div className="testimonials">
        <h3
          style={{ color: "#041562", fontWeight: "bolder", fontSize: "1.5rem" }}
        >
          Get The Latest Movies and Tv Series
        </h3>
        <div className="testimonials__content">
          <img
            src={`${posterImg}${homeMovie?.poster_path}`}
            alt={homeMovie?.title}
          />
          <img src={`${posterImg}${homeTv?.poster_path}`} alt={homeTv.name} />
        </div>
      </div>
      <footer className="footer">
        <div className="footer__contents">
          <div className="contact__us">
            <h3>Contact Us</h3>
            <p>Phone: +977 9845345895</p>
            <p>Email: entertainmenthub12@gmail.com</p>
            <p>Facebook Page: Entertainment Hub</p>
          </div>
          <div className="footer__link">
            <h3>Follow Us</h3>
            <a
              href="https://www.facebook.com/rohan.ranamagar.12"
              target="_blank"
              rel="noreferrer"
            >
              <BsFacebook />
            </a>
            <a
              href="https://www.instagram.com/rohan_magar_07/"
              target="_blank"
              rel="noreferrer"
            >
              <BsInstagram />
            </a>
            <a
              href="https://github.com/Rohan-mgr"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub />
            </a>
          </div>
        </div>
        <p style={{ textAlign: "center" }}>
          All Rights Reserved | Rohan &copy; copyright{" "}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStartScrolling: () => dispatch(actions.startHomePageScroller()),
    onEndScrolling: () => dispatch(actions.endHomePageScroller()),
  };
};

export default connect(null, mapDispatchToProps)(Home);
