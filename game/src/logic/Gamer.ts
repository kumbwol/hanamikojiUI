import {Container} from "pixi.js";
import {Data} from "../data/Data";
import {Background} from "../components/background/Background";
import {Player} from "../components/player/Player";
import {Board} from "../components/board/Board";
import {EndTurnButton} from "../components/endTurnButton/EndTurnButton";
import {MoveTiles} from "../components/player/MoveTiles";
import {MoveType} from "../components/player/MoveField";
import {Main} from "../Main";

export class Gamer {
    private maxId: number;
    private loadedData: any;
    private static socket: WebSocket;
    private isReadAllowed = true;

    constructor(stage: Container) {
        Gamer.socket = new WebSocket("ws://localhost:8764");

        Gamer.socket.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        Gamer.socket.onmessage = (event) => {
            this.loadedData = JSON.parse(event.data);
            const currData = (this.loadedData);

            if(this.loadedData.round_end_env !== null) {
                this.isReadAllowed = false;
                this.createGameState(stage);
            }

            if((((currData.players.first === "Human" && currData.state.acting_player_id === "first") ||
                (currData.players.second === "Human" && currData.state.acting_player_id === "second")) &&
                this.isReadAllowed) || currData.winner !== null
            ) {
                this.createGameState(stage);
            }
        };

        window.addEventListener("keydown", (e) => {
            if(e.key === "s") {
                Gamer.socket.send(`{"command" : "swap"}`);
            } else if(e.key === "r") {
                Gamer.socket.send(`{"command" : "reset"}`);
            }
        });

        Main.sendMove = this.saveFile;
    }

    private async saveFile(content: string) {
        MoveTiles.activeMoveID = MoveType.UNKNOWN;
        Player.selectedCards = [];
        Player.offeringCards3 = [];
        Player.offeringCards4 = [];
        Player.doubleSelectedCards = [];
        Gamer.socket.send(content);
    }

    private reset(stage: Container) {
        stage.removeAllListeners();
        stage.removeChildren();
    }

    private createGameState(stage: Container) {
        this.reset(stage);
        const data = new Data(this.loadedData);
        this.maxId = data.maxId;
        stage.addChild(new Background());
        const topPlayer = new Player(stage, data.isFirstHuman, data.numOfCards.first, data.playerInformations.first, data.isRoundEnd);
        const botPlayer = new Player(stage, !data.isFirstHuman, data.numOfCards.second, data.playerInformations.second, data.isRoundEnd);
        stage.addChild(topPlayer);
        stage.addChild(botPlayer);
        stage.addChild(new Board(data));
        stage.addChild(new EndTurnButton(stage, data.isRoundEnd, () => {
            this.isReadAllowed = true;
            this.createGameState(stage);
        }));
    }
}