import {Container} from "pixi.js";
import {Data} from "../data/Data";
import {Background} from "../components/background/Background";
import {Board} from "../components/board/Board";
import {Player} from "../components/player/Player";

export class Stepper {
    private stepId = 1;
    private maxId: number;

    constructor(stage: Container) {
        window.addEventListener("keydown", (e) => {
            if(e.key === "ArrowLeft") {
                if(this.stepId > 1) {
                    this.stepId--;
                    this.createGameState(stage);
                }
            }

            if(e.key === "ArrowRight") {
                if(this.stepId < this.maxId - 1) {
                    this.stepId++;
                    this.createGameState(stage);
                }
            }

            if(e.key === "r") {
                this.reset(stage);
            }
        });

        this.createGameState(stage);
    }

    private reset(stage: Container) {
        stage.removeChildren();
    }

    private createGameState(stage: Container) {
        this.reset(stage);
        const data = new Data(this.stepId);
        this.maxId = data.maxId;
        stage.addChild(new Background());
        stage.addChild(new Board(data));
        const topPlayer = new Player(data.numOfCards.first, data.playerInformations.first);
        const botPlayer = new Player(data.numOfCards.second, data.playerInformations.second, false);
        stage.addChild(topPlayer);
        stage.addChild(botPlayer);
    }
}