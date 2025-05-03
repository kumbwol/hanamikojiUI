import {Container} from "pixi.js";
import {Data} from "../data/Data";
import {Background} from "../components/background/Background";
import {Board} from "../components/board/Board";
import {Player} from "../components/player/Player";

export class Stepper {
    private stepId = 1;
    private maxId: number;
    private loadedData: any;

    constructor(stage: Container) {
        document.getElementById("selectFiles").addEventListener("change", (event) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.stepId = 1;
                this.loadedData = JSON.parse(event.target.result as string);
                this.createGameState(stage);
            };
            reader.readAsText((event.target as HTMLInputElement).files[0]);
        })

        window.addEventListener("keydown", (e) => {
            if(e.key === "ArrowLeft") {
                if(this.stepId > 1) {
                    this.stepId--;
                    this.createGameState(stage);
                }
            }

            if(e.key === "ArrowRight") {
                if(this.stepId < this.maxId) {
                    this.stepId++;
                    this.createGameState(stage);
                }
            }

            if(e.key === "r") {
                this.reset(stage);
            }

            if(e.key === "o") {
                document.getElementById("selectFiles").click();
            }
        });
    }

    private reset(stage: Container) {
        stage.removeChildren();
    }

    private createGameState(stage: Container) {
        this.reset(stage);
        const data = new Data(this.stepId, this.loadedData);
        this.maxId = data.maxId;
        stage.addChild(new Background());
        const topPlayer = new Player(data.numOfCards.first, data.playerInformations.first);
        const botPlayer = new Player(data.numOfCards.second, data.playerInformations.second, false);
        stage.addChild(topPlayer);
        stage.addChild(botPlayer);
        stage.addChild(new Board(data));
    }
}