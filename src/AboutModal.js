import "./AboutModal.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

function AboutModal() {
  return (
    <div
      className="modal fade"
      id="aboutModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div
          className="modal-content modal-visual"
          style={{ backgroundColor: "#d1d2d3" }}
        >
          <div className="modal-header header-stats">
            <h3 className=" title" id="exampleModalLabel">
              About
            </h3>
            <button
              data-dismiss="modal"
              className="icons-modal"
              aria-label="Close"
            >
              <i className="bi bi-x-circle-fill icons-modal"></i>{" "}
            </button>
          </div>
          <div className="modal-body">
            <p className="about-info">
              Bollywoodle is inspired by{" "}
              <a
                className="external-link"
                href="https://www.nytimes.com/games/wordle/index.html"
              >
                Wordle
              </a>{" "}
              and its various other spinoffs like{" "}
              <a className="external-link" href="https://framed.wtf/">
                Framed
              </a>{" "}
              ,{" "}
              <a className="external-link" href="https://worldle.teuteuf.fr/">
                Worldle
              </a>{" "}
              and{" "}
              <a className="external-link" href="https://www.gamedle.wtf/">
                Gamedle
              </a>
              .
            </p>
            <p className="about-info">
              All rights go to the rightful owners - no copyright infringement
              intended. Logos are from{" "}
              <a className="external-link" href="https://www.flaticon.com/">
                Flaticon
              </a>
              .
            </p>
            <p className="about-info">
              Have any suggestions? Notice any bugs? Any other inquiries or
              simply want to get in touch? Feel free to reach out via{" "}
              <a
                className="external-link"
                href="mailto:bollywoodle.game@gmail.com"
              >
                email
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;
