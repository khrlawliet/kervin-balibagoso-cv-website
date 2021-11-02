

export const humanDataInit = {
    scoreSpan: "#your-blackjack-result",
    div: "#your-box",
    score: 0
}

export const botDataInit = {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0
}

export const resultInit = {
    wins: 0,
    draws: 0,
    losses: 0
}


export const actionTypes = {
    SET_SCORE_BOT: "SET_SCORE_BOT",
    RESET_SCORE_BOT: "RESET_SCORE_BOT",
    SET_SCORE_HUMAN: "SET_SCORE_HUMAN",
    RESET_SCORE_HUMAN: "RESET_SCORE_HUMAN",
    ADD_WINS: "ADD_WINS",
    ADD_DRAWS: "ADD_DRAWS",
    ADD_LOSSES: "ADD_LOSES"
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_SCORE_BOT || actionTypes.SET_SCORE_HUMAN:
            return {
                ...state,
                score: action.payload
            };
        case actionTypes.RESET_SCORE_HUMAN:
            return {
                ...state,
                score: 0
            };
        case actionTypes.RESET_SCORE_BOT:
            return {
                ...state,
                score: 0
            };
        case actionTypes.ADD_WINS:
            return {
                ...state,
                wins: resultInit.wins + 1
            }
        case actionTypes.ADD_DRAWS:
            return {
                ...state,
                draws: state.draws + 1
            }
        case actionTypes.ADD_LOSSES:
            return {
                ...state,
                losses: state.losses + 1
            }
        default:
            return state;
    }

}