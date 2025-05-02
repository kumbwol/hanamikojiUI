import {MarkerPosition} from "../components/tile/Tile";
// @ts-ignore
import * as PlayedGame from "../../games/game1.json";

export class Data {
    markerPos: MarkerPosition[] = [];
    activeCards: ActiveCards;

    constructor() {
        console.log(PlayedGame);
        const playedGame = PlayedGame[4];
        console.log(playedGame);

        this.parseMarkers(playedGame.state.geisha_preferences);
        this.parseActiveCards(playedGame.state.gift_cards);
    }

    private parseActiveCards(activeCards: ActiveCards) {
        this.activeCards = activeCards;
    }

    private parseMarkers(geishaPreferences: GeishaPreferences) {
        for(let i=0; i<7; i++) {
            this.markerPos.push(MarkerPosition.MID);
        }

        for(let i=0; i<geishaPreferences.first.length; i++){
            if(geishaPreferences.first[i] === 1) {
                this.markerPos[i] = MarkerPosition.TOP;
            }
        }

        for(let i=0; i<geishaPreferences.second.length; i++){
            if(geishaPreferences.second[i] === 1) {
                this.markerPos[i] = MarkerPosition.BOT;
            }
        }
    }
}

export interface BoardState {
    geishaPreferences: GeishaPreferences;
    giftCards: ActiveCards;
}

export interface GeishaPreferences {
    first: number[];
    second: number[];
}

export interface ActiveCards {
    first: number[];
    second: number[];
}