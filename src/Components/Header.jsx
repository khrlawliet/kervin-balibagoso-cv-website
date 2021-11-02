import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = ({ data }) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [social, setSocial] = useState([]);
  const [profilepic, setProfilePic] = useState("");
  const [hashtag, setHashtag] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setProfilePic("images/" + data.image);
      setOccupation(data.occupation);
      setSocial(data.social);
      setHashtag(data.hashtag);
    }
  }, [data]);

  return (
    <header id="home">
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
          <li className="current">
            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#resume">
              Resume
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#portfolio">
              Works
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#testimonials">
              Testimonials
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner__img">
          <img
            className="profile-pic"
            src={profilepic}
            alt="Kervin Balibagoso Profile Pic"
          />
        </div>
        <div className="banner-text">
          <h1 className="responsive-headline">Hi! I'm {name}.</h1>
          <h3>
            <span>
              I'm a {occupation}
            </span>
            <br/>
            <span>{hashtag}</span>
          </h3>
          <hr />
          <ul className="social">
            {social.map((network) => (
              <li key={network.name}>
                <a href={network.url}>
                  <i className={network.className}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
};

export default Header;
