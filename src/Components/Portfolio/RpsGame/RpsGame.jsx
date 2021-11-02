import React, { useState } from 'react';
import Rock from '../../../assets/RpsImages/rock.jpg';
import Paper from '../../../assets/RpsImages/paper.jpg';
import Scissors from '../../../assets/RpsImages/scissors.jpg';
import './RpsGame.css'

const RpsGame = () => {

    const [isInitialState, setIsInitialState] = useState(true);
    const [imgHuman, setImgHuman] = useState(null);
    const [imgBot, setImgBot] = useState(null);
    const [prompt, setPrompt] = useState({});
    const [humanScore, setHumanScore] = useState(0);
    const [botScore, setBotScore] = useState(0);


    const rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0, 'img': Rock },
        'paper': { 'scissors': 0, 'rock': 1, 'paper': 0.5, 'img': Paper },
        'scissors': { 'scissors': 0.5, 'rock': 0, 'paper': 1, 'img': Scissors }
    }

    const randToRpsInt = () => {
        return Math.floor(Math.random() * 3);
    }

    const numberToChoice = (number) => {
        return ['rock', 'paper', 'scissors'][number];
    }

    const finalMessage = ([yourScore, botScore]) => {
        if (yourScore === 0) {
            return { 'message': 'You lost!', 'color': 'red' };
        } else if (yourScore === 0.5) {
            return { 'message': 'You tied!', 'color': 'yellow' };
        } else {
            return { 'message': 'You won!', 'color': 'green' };
        }
    }

    const decideWinner = (yourChoice, botChoice) => {

        var yourScore = rpsDatabase[yourChoice][botChoice];
        var botScore = rpsDatabase[botChoice][yourChoice];

        return [yourScore, botScore];
    }

    const setScore = (yourScore) => {
        console.log('your score ', yourScore[0])
        if (yourScore[0] === 1) {
            setHumanScore(humanScore + 1);
        } else if (yourScore[0] === 0) {
            setBotScore(botScore + 1)
        }
        if (humanScore === 10) {
            alert('Congratulations! you defeated bot 10 times');
        }

    }

    const newGame = (isReseting) => {
        setIsInitialState(true);
        if(isReseting){
            setHumanScore(0);
            setBotScore(0);
        }
    }

    const rpsGame = (humanChoice) => {
        let botChoice = numberToChoice(randToRpsInt());
        let result = decideWinner(humanChoice, botChoice);
        setImgHuman(rpsDatabase[humanChoice]['img']);
        setImgBot(rpsDatabase[botChoice]['img']);
        setIsInitialState(false);
        setPrompt(finalMessage(result));
        setScore(result);
    }

    return (
        <div className="rpsgame">
            <h2> Rock, Paper, Scissors</h2>
            <div className="rpsgame__component">
                {
                    isInitialState ? (
                        <div>
                            <img src={Rock} alt="" id="rock" onClick={() => rpsGame('rock')} />
                            <img src={Paper} alt="" id="paper" onClick={() => rpsGame('paper')} />
                            <img src={Scissors} alt="" id="scissors" onClick={() => rpsGame('scissors')} />
                        </div>
                    ) : (
                            <div>
                                <div className="rpsgame__human">
                                    <img src={imgHuman} className="rpsgame__imgHuman" alt="" />
                                </div>
                                <h1 style={{ color: prompt.color }}>{prompt.message}</h1>
                                <div className="rspgame__bot">
                                    <img src={imgBot} className="rpsgame__imgBot" alt="" />
                                </div>
                            </div>
                        )
                }

            </div>
            <div className="rpsgame__button">
            <h2>Your Score : {humanScore}</h2>
                <button className="rpsgame__btnNew" onClick={()=>newGame(false)}>New</button>
                <button className="rpsgame__btnReset"  onClick={()=>newGame(true)}> Reset</button>
                <h2>Bot Score : {botScore}</h2>
            </div>
        </div>
    )
}

export default RpsGame
