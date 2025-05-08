import {Container} from "pixi.js";
import {Data} from "../data/Data";
import {Background} from "../components/background/Background";
import {Player} from "../components/player/Player";
import {Board} from "../components/board/Board";
import {EndTurnButton} from "../components/endTurnButton/EndTurnButton";

export class Gamer {
    public static ID = Math.floor(Math.random() * 1000000);

    private lastId = -1;
    private stepId = 1;
    private maxId: number;
    private loadedData: any;

    constructor(stage: Container) {
        this.checkForOpponentMove(stage);
    }

    private async checkForOpponentMove(stage: Container) {
        setInterval(async () => {
            const res = await fetch('http://localhost:5000/file-content');
            const data = await res.json();
            this.loadedData = JSON.parse(data.content);
            this.stepId = parseInt(Object.keys(this.loadedData)[0]);

            if (this.loadedData && this.lastId !== this.stepId) {
                this.lastId = this.stepId;
                this.createGameState(stage);
            }
        }, 500);
    }

    private reset(stage: Container) {
        stage.removeAllListeners();
        stage.removeChildren();
    }

    private createGameState(stage: Container) {
        this.reset(stage);
        const data = new Data(this.stepId, this.loadedData);
        this.maxId = data.maxId;
        stage.addChild(new Background());
        const topPlayer = new Player(stage, data.isFirstHuman, data.numOfCards.first, data.playerInformations.first);
        const botPlayer = new Player(stage, !data.isFirstHuman, data.numOfCards.second, data.playerInformations.second);
        stage.addChild(topPlayer);
        stage.addChild(botPlayer);
        stage.addChild(new Board(data));
        stage.addChild(new EndTurnButton(stage));
    }
}