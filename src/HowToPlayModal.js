import "./HowToPlayModal.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

function HowToPlayModal() {
  return (
    <div
      className="modal fade"
      id="howToPlayModal"
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
              How To Play
            </h3>
            <button
              data-dismiss="modal"
              className="icons-modal"
              aria-label="Close"
            >
              <i className="bi bi-x-circle-fill icons-modal"></i>
            </button>
          </div>

          <div className="modal-body">
            <p className="how-to-play-info">
              The objective of the game is to guess the bollywood movie based on
              the image(s) provided.
            </p>
            <p className="how-to-play-info">
              You have 5 tries to guess correctly. Each incorrect guess will
              unlock another still from the movie.
            </p>
            <p className="how-to-play-info">
              Pressing submit without guessing a movie counts as a try.
            </p>
            <p className="how-to-play-info">
              Happy Guessing! <i className="bi bi-emoji-smile"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToPlayModal;
