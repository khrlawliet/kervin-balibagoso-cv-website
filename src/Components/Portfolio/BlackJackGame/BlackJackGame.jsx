import React, { useReducer, useRef } from "react";
import "./BlackJackGame.css";
import { Button } from "@material-ui/core";
import hitSoundUrl from "../../../assets/sounds/swish.m4a";
import windSoundUrl from "../../../assets/sounds/cash.mp3";
import lostSoundUrl from "../../../assets/sounds/aww.mp3";
import {
  reducer,
  humanDataInit,
  botDataInit,
  resultInit,
  actionTypes,
} from "./playerReducer";

const BlackJackGame = () => {
  const cards = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "K",
    "Q",
    "J",
    "A",
  ];
  const cardMap = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11],
  };
  const hitSound = new Audio(hitSoundUrl);
  const winSound = new Audio(windSoundUrl);
  const lostSound = new Audio(lostSoundUrl);

  const [humanData, dispatchHuman] = useReducer(reducer, humanDataInit);
  const [botData, dispatchBot] = useReducer(reducer, botDataInit);
  const [result, dispatchResult] = useReducer(reducer, resultInit);

  const isTurnsOver = useRef(false);
  const isStand = useRef(false);

  const dealerLogic = async () => {
    isStand.current = true;
    while (botData.score < 16 && isStand.current) {
      let card = randomCard();
      showCard(card, botData);
      updateScore(card, botData);
      showScore(botData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    isTurnsOver.current = true;
    let winner = computeWinner();
    showResult(winner);
  };

  const blackjackHit = () => {
    if (!isStand.current) {
      let card = randomCard();
      showCard(card, humanData);
      updateScore(card, humanData);
      showScore(humanData);
    }
  };

  const randomCard = () => {
    let randomIndex = Math.floor(Math.random() * 13);
    return cards[randomIndex];
  };

  const showCard = (card, activePlayer) => {
    if (activePlayer.score <= 21) {
      let cardImg = document.createElement("img");
      cardImg.src = `images/${card}.png`;
      document.querySelector(activePlayer["div"]).appendChild(cardImg);
      hitSound.play();
    }
  };

  const updateScore = (card, activePlayer) => {
    if (card === "A") {
      if (activePlayer.score + cardMap[card][1] <= 21) {
        activePlayer.score += cardMap[card][1];
      } else {
        activePlayer.score += cardMap[card][0];
      }
    } else {
      activePlayer.score += cardMap[card];
    }
  };

  const showScore = (activePlayer) => {
    if (activePlayer.score > 21) {
      document.querySelector(activePlayer.scoreSpan).textContent = "BUST!";
      document.querySelector(activePlayer.scoreSpan).style.color = "red";
    } else {
      document.querySelector(activePlayer.scoreSpan).textContent =
        activePlayer.score;
    }
  };

  const blackjackDeal = () => {
    if (isTurnsOver.current) {
      let yourImages = document
        .querySelector("#your-box")
        .querySelectorAll("img");
      let dealerImages = document
        .querySelector("#dealer-box")
        .querySelectorAll("img");
      for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
      }
      for (let i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
      }

      dispatchHuman({ type: actionTypes.RESET_SCORE_HUMAN });
      dispatchBot({ type: actionTypes.RESET_SCORE_BOT });

      document.querySelector("#your-blackjack-result").textContent = 0;
      document.querySelector("#dealer-blackjack-result").textContent = 0;

      document.querySelector("#blackjack__result").textContent = "Let's play";
      document.querySelector("#blackjack__result").style.color = "black";
      document.querySelector(botData.scoreSpan).style.color = "black";
      document.querySelector(humanData.scoreSpan).style.color = "black";
      isTurnsOver.current = false;
      isStand.current = false;
    }
  };

  const computeWinner = () => {
    let winner;
    if (humanData.score <= 21) {
      if (humanData.score > botData.score || botData.score > 21) {
        dispatchResult({ type: actionTypes.ADD_WINS });
        winner = humanData;
      } else if (humanData.score < botData.score) {
        dispatchResult({ type: actionTypes.ADD_LOSSES });
        winner = botData;
      } else if (humanData.score === botData.score) {
        dispatchResult({ type: actionTypes.ADD_DRAWS });
      }
    } else if (humanData.score > 21 && botData.score <= 21) {
      dispatchResult({ type: actionTypes.ADD_LOSSES });
      winner = botData;
    } else if (humanData.score > 21 && botData.score > 21) {
      dispatchResult({ type: actionTypes.ADD_DRAWS });
    }

    return winner;
  };

  const showResult = (winner) => {
    let message, messageColor;
    if (isTurnsOver.current) {
      if (winner === humanData) {
        message = "You won!";
        messageColor = "green";
        winSound.play();
      } else if (winner === botData) {
        message = "You lost!";
        messageColor = "red";
        lostSound.play();
      } else {
        message = "You drew!";
        messageColor = "black";
      }
      document.querySelector("#blackjack__result").textContent = message;
      document.querySelector("#blackjack__result").style.color = messageColor;
    }
  };

  return (
    <div className="blackJack">
      <h1>
        {" "}
        <span id="blackjack__result">Let's play</span>{" "}
      </h1>
      <div className="blackjack__body">
        <div className="blackjack__human" style={{ backgroundColor: "wheat" }}>
          <h2>
            You: <span id="your-blackjack-result">0</span>{" "}
          </h2>
          <div className="blackjack__card" id="your-box"></div>
        </div>
        <div className="blackjack__bot" style={{ backgroundColor: "wheat" }}>
          <h2>
            Dealer: <span id="dealer-blackjack-result">0</span>
          </h2>
          <div className="blackjack__card" id="dealer-box"></div>
        </div>
      </div>
      <div className="blackjack__btn">
        <Button
          color="primary"
          variant="contained"
          className="btn__hit"
          onClick={blackjackHit}
        >
          Hit
        </Button>
        <Button
          color="default"
          variant="contained"
          className="btn__deal"
          onClick={dealerLogic}
        >
          Deal
        </Button>
        <Button
          color="secondary"
          variant="contained"
          className="btn__stand"
          onClick={blackjackDeal}
        >
          Stand
        </Button>
      </div>
      <div className="blackjack__result">
        <table>
          <thead>
            <tr>
              <th>Wins</th>
              <th>Losses</th>
              <th>Draws</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <span >{result.wins}</span>
              </th>
              <th>
                {" "}
                <span >{result.losses}</span>
              </th>
              <th>
                {" "}
                <span>{result.draws}</span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlackJackGame;
