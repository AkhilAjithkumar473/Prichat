import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaComments, FaUsers, FaPlay } from "react-icons/fa";

import logo from '../../icons/prichat_logo.png'
import frontImg from '../../icons/frontImg.png'
import "./LandingPage.css";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <nav>
        <div className="brand">
          <img src={logo} className="logo" alt="logo" />
          Prichat
        </div>
        <div>
          <a href="/">
            <FaUsers /> Register
          </a>
          <a href="/">
            <FaComments /> Get Support
          </a>
        </div>
      </nav>

      <main className="main-container">
        <section className="flex-container">
          <p className="biggest-heading">
            Wanna chat with
            <br />
            <span className="biggest-heading-orange">more privacy?</span>
          </p>
          <p className="second-heading">
            Have real time conversations with friends & family on Prichat!
          </p>
            <div className="form-group">
              <span className="form-label">
                <div className="triangle">
                  <FaPlay />
                </div>{" "}
                Username
              </span>
              <input
                type="text"
                className="form-input"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group form-group-2">
              <span className="form-label">
                <div className="triangle">
                  <FaPlay />
                </div>{" "}
                Room
              </span>
              <input
                type="text"
                className="form-input form-input-2"
                onChange={(e) => setRoom(e.target.value)}
                required
              />
            </div>
            <Link
              onClick={(e) => {
                if (!name || !room) e.preventDefault();
              }}
              to={`/chat?name=${name}&room=${room}`}
            >
              <button className="submit-btn" type="submit">
                <div className="triangle">
                  <FaPlay />
                </div>{" "}
                Join
              </button>
            </Link>
        </section>
        <section className="flex-container">
          <img src={frontImg} alt="front" />
        </section>
      </main>
    </>
  );
};

export default LandingPage;
