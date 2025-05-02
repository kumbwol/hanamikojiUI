import {MarkerPosition} from "../components/tile/Tile";
// @ts-ignore
import * as PlayedGame from "../../games/game1.json";

export class Data {
    markerPos: MarkerPosition[] = [];
    activeCards: ActiveCards;
    numOfCards: NumOfCards;
    maxId: number;
    playerInformations: PlayerInformations;
    offering3: number[];
    offering4: number[];

    constructor(stepId: number) {
        console.log(PlayedGame);
        const playedGame = PlayedGame[stepId];
        this.maxId = Object.values(PlayedGame).length;
        console.log(playedGame, this.maxId);

        this.parseMarkers(playedGame.state.geisha_preferences);
        this.parseActiveCards(playedGame.state.gift_cards);
        this.numOfCards = playedGame.state.num_cards;
        this.parsePlayerInformations(playedGame.private_info_sets.first, playedGame.private_info_sets.second);
        this.offering3 = playedGame.state.decision_cards_1_2;
        this.offering4 = playedGame.state.decision_cards_2_2;
    }

    private parsePlayerInformations(firstPlayerData: PlayerInfo, secondPlayerData: PlayerInfo) {
        this.playerInformations = {
            first: {
                handCards: [],
                trashedCards: [],
                stashedCard: 0,
            },
            second: {
                handCards: [],
                trashedCards: [],
                stashedCard: 0,
            },
        }
        this.playerInformations.first.handCards = [1,1,1,1,1,1,1];
        this.playerInformations.first.trashedCards = [];
        this.playerInformations.first.stashedCard = 0;

        this.playerInformations.second.handCards = [1,1,1,1,1,1,1];
        this.playerInformations.second.trashedCards = [];
        this.playerInformations.second.stashedCard = 0;

        // @ts-ignore
        this.playerInformations.first.handCards = firstPlayerData.hand_cards; // @ts-ignore
        this.playerInformations.first.trashedCards = firstPlayerData.trashed_cards ? firstPlayerData.trashed_cards : []; // @ts-ignore
        this.playerInformations.first.stashedCard = firstPlayerData.stashed_card;

        // @ts-ignore
        this.playerInformations.second.handCards = secondPlayerData.hand_cards; // @ts-ignore
        this.playerInformations.second.trashedCards = secondPlayerData.trashed_cards ? secondPlayerData.trashed_cards : []; // @ts-ignore
        this.playerInformations.second.stashedCard = secondPlayerData.stashed_card;
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

export interface NumOfCards {
    first: number;
    second: number;
}

export interface PlayerInformations {
    first: PlayerInfo;
    second: PlayerInfo;
}

export interface PlayerInfo {
    handCards: number[];
    stashedCard: number;
    trashedCards: number[];
}