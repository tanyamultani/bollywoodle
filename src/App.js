import bollywood from "./bollywood.png";
import filmsList from "./filmsList.json";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";
import StatsModal from "./StatsModal.js";
import AboutModal from "./AboutModal.js";
import HowToPlayModal from "./HowToPlayModal.js";
import ConfettiExplosion from "react-confetti-explosion";

function App() {
  const [secondImageDisabled, setSecondImageDisabled] = useState(true);
  const [thirdImageDisabled, setThirdImageDisabled] = useState(true);
  const [fourthImageDisabled, setFourthImageDisabled] = useState(true);
  const [fifthImageDisabled, setFifthImageDisabled] = useState(true);
  const [attempt, setAttempt] = useState(1);

  const movies = [...new Set(filmsList)];
  const movieOfTheDay = [
    "8 x 10 Tasveer",
    "Fiza",
    "Dil Bole Hadippa!",
    "Tribhanga",
    "Rangoon",
    "Humko Deewana Kar Gaye",
    "Ki & Ka",
  ];
  const options = [
    { number: 1, name: "first", disabled: false },
    { number: 2, name: "second", disabled: secondImageDisabled },
    { number: 3, name: "third", disabled: thirdImageDisabled },
    { number: 4, name: "fourth", disabled: fourthImageDisabled },
    { number: 5, name: "fifth", disabled: fifthImageDisabled },
  ];
  const [imageClicked, setImageClicked] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
  });
  const [movieSelected, setMovieSelected] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const source = {
    position: "absolute",
    right: "50%",
    left: "50%",
    top: 50,
  };

  const [gamesWon, setGamesWon] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showWinnerText, setShowWinnerText] = useState(false);
  const [showLoserText, setShowLoserText] = useState(false);
  const [hideInputBox, setHideInputBox] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [weekday, setWeekday] = useState(0);
  const bigExplodeProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 600,
  };

  function todayDate() {
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    return yourDate.toISOString().split("T")[0];
  }

  function getWeekday() {
    let now = new Date();
    setWeekday(now.getDay());
    return now.getDay();
  }

  useEffect(() => {
    getWeekday();
    var storedScores = localStorage.getItem("scores");
    var storedGamesPlayed = localStorage.getItem("gamesPlayed");
    var storedGamesWon = localStorage.getItem("gamesWon");
    var storedCurrentStreak = localStorage.getItem("currentStreak");

    if (storedCurrentStreak) {
      const currentStreak = JSON.parse(storedCurrentStreak);
      setCurrentStreak(currentStreak);
    }

    var storedLastPlayed = localStorage.getItem("lastPlayed");

    if (storedLastPlayed) {
      const lastPlayed = JSON.parse(storedLastPlayed);
      if (lastPlayed < todayDate()) {
        localStorage.removeItem("guesses");
        localStorage.removeItem("attempt");
      } else {
        var storedGuesses = localStorage.getItem("guesses");
        var storedAttempt = localStorage.getItem("attempt");
        if (storedGuesses) {
          const guesses = JSON.parse(storedGuesses);
          setGuesses(guesses);
        }
        if (storedAttempt) {
          const attempt = JSON.parse(storedAttempt);
          setAttempt(attempt);
          switch (attempt) {
            case 2:
              setSecondImageDisabled(false);
              onClickHandler("second");
              break;
            case 3:
              setSecondImageDisabled(false);
              setThirdImageDisabled(false);
              onClickHandler("third");
              break;
            case 4:
              setSecondImageDisabled(false);
              setThirdImageDisabled(false);
              setFourthImageDisabled(false);
              onClickHandler("fourth");
              break;
            case 5:
              setSecondImageDisabled(false);
              setThirdImageDisabled(false);
              setFourthImageDisabled(false);
              setFifthImageDisabled(false);
              onClickHandler("fifth");
              break;
            case 6:
              setSecondImageDisabled(false);
              setThirdImageDisabled(false);
              setFourthImageDisabled(false);
              setFifthImageDisabled(false);
              onClickHandler("fifth");
              setShowLoserText(true);
              setHideInputBox(true);
              break;
            case 0:
              setSecondImageDisabled(false);
              setThirdImageDisabled(false);
              setFourthImageDisabled(false);
              setFifthImageDisabled(false);
              onClickHandler("fifth");
              setShowWinnerText(true);
              setHideInputBox(true);
          }
          //if won or lost already, then show appropriate
        }
      }
    }

    if (storedScores) {
      const scoresStored = JSON.parse(storedScores);
      setScores(scoresStored);
    }
    if (storedGamesPlayed) {
      const gamesPlayed = JSON.parse(storedGamesPlayed);
      setGamesPlayed(gamesPlayed);
    }
    if (storedGamesWon) {
      const gamesWon = JSON.parse(storedGamesWon);
      setGamesWon(gamesWon);
    }

    window.addEventListener("click", function (e) {
      if (document.getElementById("input-box").contains(e.target)) {
        // Clicked in box
        setOpenDropdown(true);
      } else {
        // Clicked outside the box
        setOpenDropdown(false);
      }
    });
  }, [openDropdown]);

  const onClickHandler = (order) => {
    const resetImages = {
      first: false,
      second: false,
      third: false,
      fourth: false,
      fifth: false,
    };
    setImageClicked({
      ...resetImages,
      [order]: true,
    });
  };

  function onChange(props) {
    setMovieSelected(props);
  }

  function Submit() {
    if (movieSelected === movieOfTheDay[weekday]) {
      //winner
      //show all screenshots
      setSecondImageDisabled(false);
      setThirdImageDisabled(false);
      setFourthImageDisabled(false);
      setFifthImageDisabled(false);
      storeScore();
      setShowWinnerText(true);
      setHideInputBox(true);
      setIsExploding(true);
      localStorage.setItem("attempt", JSON.stringify(0));
      localStorage.setItem("currentStreak", JSON.stringify(currentStreak + 1));
      setCurrentStreak(currentStreak + 1);
      var storedMaxStreak = localStorage.getItem("maxStreak");

      if (storedMaxStreak) {
        const maxStreak = JSON.parse(storedMaxStreak);
        if (currentStreak > maxStreak) {
          localStorage.setItem("maxStreak", JSON.stringify(currentStreak + 1));
        }
      } else {
        localStorage.setItem("maxStreak", JSON.stringify(currentStreak + 1));
      }

      storedLastPlayed();
    } else {
      //show answer underneath
      //enable button
      if (attempt === 1) {
        setSecondImageDisabled(false);
        setAttempt(2);
        onClickHandler("second");
        storedLastPlayed();
      } else if (attempt === 2) {
        setThirdImageDisabled(false);
        setAttempt(3);
        onClickHandler("third");
      } else if (attempt === 3) {
        setFourthImageDisabled(false);
        setAttempt(4);
        onClickHandler("fourth");
      } else if (attempt === 4) {
        setFifthImageDisabled(false);
        setAttempt(5);
        onClickHandler("fifth");
      } else if (attempt === 5) {
        //loses
        setAttempt(6);
        storeScore();
        setShowLoserText(true);
        setHideInputBox(true);
        localStorage.setItem("currentStreak", JSON.stringify(0));
      }
      localStorage.setItem("attempt", JSON.stringify(attempt + 1));

      if (movieSelected.length !== 0) {
        setGuesses([...guesses, movieSelected]);
        localStorage.setItem(
          "guesses",
          JSON.stringify([...guesses, movieSelected])
        );
      }
      setMovieSelected("");
    }
    var input1 = document.getElementById("input-box");
    input1.value = "";
  }

  function redirectToKofi() {
    window.open("https://ko-fi.com/bollywoodle/", "_blank");
  }

  function storeScore() {
    if (attempt !== 6) {
      scores[attempt - 1] = scores[attempt - 1] + 1;
    }
    setScores(scores);
    setGamesPlayed(gamesPlayed + 1);
    setGamesWon(gamesWon + 1);
    localStorage.setItem("scores", JSON.stringify(scores));
    localStorage.setItem("gamesPlayed", JSON.stringify(gamesPlayed + 1));
    localStorage.setItem("gamesWon", JSON.stringify(gamesWon + 1));
  }

  function selectMovie(props) {
    setMovieSelected(props);
    setOpenDropdown(false);
    document.getElementById("input-box").value = movieSelected;
  }

  function storedLastPlayed() {
    localStorage.setItem("lastPlayed", JSON.stringify(todayDate()));
  }

  function filterMoviesList() {
    var input, filter, li, a, i, txtValue;
    input = document.getElementById("input-box");
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName("movie-list");
    for (i = 0; i < li.length; i++) {
      a = li[i];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  return (
    <div className="centered">
      <div className="main">
        <div className="header">
          <div>
            <h6 className="logo" style={{ float: "left" }}>
              BOLLYWOODLE
            </h6>
            <img src={bollywood} alt="bollywood" className="bollywood-icon" />
          </div>
          <div>
            <button className="icons" onClick={() => redirectToKofi()}>
              <i className="bi bi-heart-fill icons red"></i>
            </button>
            <button
              className="icons"
              data-toggle="modal"
              data-target="#statsModal"
            >
              <i className="bi bi-bar-chart-line icons blue"></i>
            </button>
            <StatsModal
              scores={scores}
              gamesPlayed={gamesPlayed}
              gamesWon={gamesWon}
              currentStreak={currentStreak}
            />
            <button
              className="icons"
              data-toggle="modal"
              data-target="#aboutModal"
            >
              <i className="bi bi-info-circle orange"></i>
            </button>
            <AboutModal />
            <button
              className="icons"
              data-toggle="modal"
              data-target="#howToPlayModal"
            >
              <i className="bi bi-question-circle yellow"></i>
            </button>
            <HowToPlayModal />
          </div>
        </div>

        <div className="divider-wrapper">
          <hr className="divider"></hr>
        </div>
        <div className="img-carousel-wrapper">
          {imageClicked.first && (
            <img
              src={require("./" + weekday + "/guess1.jpeg")}
              alt="first"
              className="img-carousel"
            />
          )}
          {imageClicked.second && (
            <img
              src={require("./" + weekday + "/guess2.jpeg")}
              alt="second"
              className="img-carousel"
            />
          )}
          {imageClicked.third && (
            <img
              src={require("./" + weekday + "/guess3.jpeg")}
              alt="third"
              className="img-carousel"
            />
          )}
          {imageClicked.fourth && (
            <img
              src={require("./" + weekday + "/guess4.jpeg")}
              alt="fourth"
              className="img-carousel"
            />
          )}
          {imageClicked.fifth && (
            <img
              src={require("./" + weekday + "/guess5.jpeg")}
              alt="fifth"
              className="img-carousel"
            />
          )}
        </div>
        <div className="buttons">
          {options.map((option) => (
            <button
              key={option.number}
              className="btn btn-danger img-carousel-button"
              onClick={() => onClickHandler(option.name)}
              disabled={option.disabled}
            >
              {option.number}
            </button>
          ))}
        </div>
        <div className={showWinnerText ? "winner-text-show" : "winner-text"}>
          <h6>
            You won! The answer was <strong>{movieOfTheDay[weekday]}</strong>!
          </h6>

          <>
            {isExploding && (
              <div style={source}>
                <ConfettiExplosion {...bigExplodeProps} />
              </div>
            )}
          </>
        </div>
        <div className={showLoserText ? "loser-text-show" : "loser-text-hide"}>
          <h6>
            Oh no, you've run out of tries! The answer was{" "}
            <strong>{movieOfTheDay[weekday]}</strong>!
          </h6>
        </div>
        <div className={hideInputBox ? "input-hide" : "search-option-wrapper"}>
          <div className="input-box-wrapper">
            <input
              type="text"
              list="movieList"
              className="form-control"
              onChange={(e) => onChange(e.target.value)}
              placeholder="Select movie or press submit to skip"
              id="input-box"
              value={movieSelected}
              onKeyUp={() => filterMoviesList()}
            />
            <button
              type="button"
              className="btn btn-danger submit-button"
              id="basic-addon2"
              onClick={() => Submit()}
            >
              Submit
            </button>
          </div>
          <div className={openDropdown ? "options-open" : "options"}>
            <ul className="movie-list-wrapper">
              {movies.map((movie) => (
                <li
                  key={movie}
                  onClick={() => selectMovie(movie)}
                  className="movie-list"
                >
                  {movie}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="guess-box-wrapper">
          {guesses.map((guess) => (
            <h6 className="guess-box">{guess}</h6>
          ))}
        </div>
      </div>
      <div className="footer-wrapper">
        <h6 className="footer">Bollywoodle - 2023</h6>
      </div>
    </div>
  );
}

export default App;
