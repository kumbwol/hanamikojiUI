import {MarkerPosition} from "../components/tile/Tile";
import {Main} from "../Main";

export class Data {
    markerPos: MarkerPosition[] = [];
    activeCards: ActiveCards;
    numOfCards: NumOfCards;
    maxId: number;
    playerInformations: PlayerInformations;
    offering3: number[];
    offering4: FourWayOffering = {
        first: [],
        second: []
    };
    isFirstHuman: boolean;
    isRoundEnd = false;

    constructor(stepId: number, loadedData: any) {
        console.log(loadedData);
        let playedGame = loadedData[stepId];
        this.isRoundEnd = (playedGame.round_end_env !== null && !Main.ROUND_END_COFIRMED);
        playedGame = (this.isRoundEnd) ? playedGame.round_end_env : playedGame;
        this.maxId = Object.values(loadedData).length;
        this.isFirstHuman = playedGame.players.first === "Human";

        this.parseMarkers(playedGame.state.geisha_preferences);
        this.parseActiveCards(playedGame.state.gift_cards);
        this.numOfCards = playedGame.state.num_cards;
        this.parsePlayerInformations(playedGame.private_info_sets.first, playedGame.private_info_sets.second);
        this.offering3 = playedGame.state.decision_cards_1_2;
        this.offering4.first = playedGame.state.decision_cards_2_2 ? playedGame.state.decision_cards_2_2[0] : [];
        this.offering4.second = playedGame.state.decision_cards_2_2 ? playedGame.state.decision_cards_2_2[1] : [];

        this.playerInformations.first.possibleMoves = playedGame.state.action_cards.first;
        this.playerInformations.second.possibleMoves = playedGame.state.action_cards.second;
        this.playerInformations.first.isActive = playedGame.state.acting_player_id === "first";
        this.playerInformations.second.isActive = playedGame.state.acting_player_id === "second";
        Main.ROUND_END_COFIRMED = false;
    }

    private extendDataWithRoundEndSteps(loadedData: any): any {
        const r = {};
        let id = 1;
        for(let i=1; i<=Object.values(loadedData).length; i++) {
            if(loadedData[i].round_end_env) {
                r[id] = loadedData[i].round_end_env;
                id++;
            }
            r[id] = loadedData[i];
            id++;
        }

        return r;
    }

    private parsePlayerInformations(firstPlayerData: PlayerInfo, secondPlayerData: PlayerInfo) {
        this.playerInformations = {
            first: {
                handCards: [],
                trashedCards: [],
                stashedCard: 0,
                possibleMoves: [],
                isActive: false
            },
            second: {
                handCards: [],
                trashedCards: [],
                stashedCard: 0,
                possibleMoves: [],
                isActive: false
            },
        }
        this.playerInformations.first.handCards = [1,1,1,1,1,1,1];
        this.playerInformations.first.trashedCards = [];
        this.playerInformations.first.stashedCard = -1;

        this.playerInformations.second.handCards = [1,1,1,1,1,1,1];
        this.playerInformations.second.trashedCards = [];
        this.playerInformations.second.stashedCard = -1;

        // @ts-ignore
        this.playerInformations.first.handCards = firstPlayerData.hand_cards; // @ts-ignore
        this.playerInformations.first.trashedCards = firstPlayerData.trashed_cards ? firstPlayerData.trashed_cards : []; // @ts-ignore
        let stashCards = firstPlayerData.stashed_card;
        if(stashCards) {
            for(let i=0; i<stashCards.length; i++) {
                if(stashCards[i] === 1) {
                    this.playerInformations.first.stashedCard = i;
                }
            }
        }

        // @ts-ignore
        this.playerInformations.second.handCards = secondPlayerData.hand_cards; // @ts-ignore
        this.playerInformations.second.trashedCards = secondPlayerData.trashed_cards ? secondPlayerData.trashed_cards : []; // @ts-ignore
        stashCards = secondPlayerData.stashed_card;
        if(stashCards) {
            for(let i=0; i<stashCards.length; i++) {
                if(stashCards[i] === 1) {
                    this.playerInformations.second.stashedCard = i;
                }
            }
        }
    }

    private parseActiveCards(activeCards: ActiveCards) {
        this.activeCards = activeCards;
    }

    private parseMarkers(geishaPreferences: GeishaPreferences) {
        for(let i=0; i<7; i++) {
            this.markerPos.push(MarkerPosition.MID);
        }

        for(let i=0; i<geishaPreferences.first.length; i++){
            if(this.isFirstHuman ? geishaPreferences.second[i] : geishaPreferences.first[i] === 1) {
                this.markerPos[i] = MarkerPosition.TOP;
            }
        }

        for(let i=0; i<geishaPreferences.second.length; i++){
            if(this.isFirstHuman ? geishaPreferences.first[i] : geishaPreferences.second[i] === 1) {
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

export interface FourWayOffering {
    first: number[];
    second: number[];
}

export interface PlayerInfo {
    handCards: number[];
    stashedCard: number;
    trashedCards: number[];
    possibleMoves: number[];
    isActive: boolean;
}