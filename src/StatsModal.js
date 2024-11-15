import "./StatsModal.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";

function StatsModal(props) {
  const [gamesWonPercentage, setGamesWonPercentage] = useState(0);
  const [highestGuessDistribution, setHighestGuessDistribution] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    if (props.gamesPlayed !== 0) {
      setGamesWonPercentage(
        Math.round((100 * props.gamesWon) / props.gamesPlayed)
      );
    }
    setHighestGuessDistribution(Math.max(...props.scores));
    var storedMaxStreak = localStorage.getItem("maxStreak");

    if (storedMaxStreak) {
      const maxStreak = JSON.parse(storedMaxStreak);
      setMaxStreak(maxStreak);
    }
  });

  return (
    <div
      className="modal fade"
      id="statsModal"
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
            <h3 className="title" id="exampleModalLabel">
              Statistics
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
            <div className="stats-wrapper">
              <div className="stats-games-played">
                <h6 className="games-played-title">Games Played</h6>
                <h6 className="games-played-box">{props.gamesPlayed}</h6>
              </div>
              <div className="stats-games-won">
                <h6 className="games-won-title">Win %</h6>
                <h6 className="games-won-box">{gamesWonPercentage}%</h6>
              </div>
            </div>
            <div className="stats-wrapper">
              <div className="stats-games-played">
                <h6 className="games-played-title">Current Streak</h6>
                <h6 className="games-played-box">{props.currentStreak}</h6>
              </div>
              <div className="stats-games-won">
                <h6 className="games-won-title">Max Streak</h6>
                <h6 className="games-won-box">{maxStreak}</h6>
              </div>
            </div>
            <h5 className="guess-distribution">
              <b>Guess Distribution</b>
            </h5>
            <ul className="bar-chart-wrapper-list">
              <li className="bar-chart-wrapper">
                <div>1</div>
                <div
                  className="bar-chart"
                  style={{
                    width:
                      (10 * props.scores[0]) / highestGuessDistribution +
                      3 +
                      "vh",
                  }}
                >
                  <span className="bar-score">{props.scores[0]}</span>
                </div>
              </li>
              <li className="bar-chart-wrapper">
                <div>2</div>
                <div
                  className="bar-chart"
                  style={{
                    width:
                      (10 * props.scores[1]) / highestGuessDistribution +
                      3 +
                      "vh",
                  }}
                >
                  <span className="bar-score">{props.scores[1]}</span>
                </div>
              </li>
              <li className="bar-chart-wrapper">
                <div>3</div>
                <div
                  className="bar-chart"
                  style={{
                    width:
                      10 * (props.scores[2] / highestGuessDistribution) +
                      3 +
                      "vh",
                  }}
                >
                  <span className="bar-score">{props.scores[2]}</span>
                </div>
              </li>
              <li className="bar-chart-wrapper">
                <div>4</div>
                <div
                  className="bar-chart"
                  style={{
                    width:
                      (10 * props.scores[3]) / highestGuessDistribution +
                      3 +
                      "vh",
                  }}
                >
                  <span className="bar-score">{props.scores[3]}</span>
                </div>
              </li>
              <li className="bar-chart-wrapper">
                <div>5</div>
                <div
                  className="bar-chart"
                  style={{
                    width:
                      (10 * props.scores[4]) / highestGuessDistribution +
                      3 +
                      "vh",
                  }}
                >
                  <span className="bar-score">{props.scores[4]}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsModal;
