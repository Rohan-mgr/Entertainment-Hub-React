import React from "react";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";
import "./footer.css";

const Footer = () => {
  return (
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
        All Rights Reserved | Rohan &copy; copyright {new Date().getFullYear()}
      </p>
    </footer>
  );
};
export default Footer;
