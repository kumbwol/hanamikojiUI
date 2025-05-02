import {MarkerPosition} from "../components/tile/Tile";
// @ts-ignore
import * as PlayedGame from "../../games/game1.json";

export class Data {
    markerPos: MarkerPosition[] = [];

    constructor() {
        const playedGame = PlayedGame;
        console.log(playedGame);
        const geishaPreferences = playedGame.state.geisha_preferences;

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
}

export interface GeishaPreferences {
    first: number[];
    second: number[];
}