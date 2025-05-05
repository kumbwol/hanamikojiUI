import {Container, Sprite, Text, TextStyle} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";
import {MoveTiles} from "../player/MoveTiles";
import {Player} from "../player/Player";

export class EndTurnButton extends Container {
    constructor(stage: Container) {
        super();
        const endTurnOff = new Sprite(GameLoader.TEXTURES.get("endTurnOff"));
        endTurnOff.anchor.set(0.5);
        const endTurnOn = new Sprite(GameLoader.TEXTURES.get("endTurnOn"));
        endTurnOn.anchor.set(0.5);

        this.addChild(endTurnOff);
        this.addChild(endTurnOn);
        this.position.set(1200, 360);

        endTurnOn.visible = false;

        const style = new TextStyle({
            fontSize: 28,
            align: "center",
            wordWrap: true,
            wordWrapWidth: 10
        });
        const endTurnText = new Text({ text: 'END TURN', style});
        endTurnText.anchor.set(0.5);
        this.addChild(endTurnText);
        endTurnText.interactive = false;
        endTurnText.eventMode = "none";

        endTurnOn.addEventListener("click", () => {
            console.log("possible move");
        });

        stage.addEventListener("change", () => {
            console.log(MoveTiles.activeMoveID, Player.cntSelectedCards);
            if(MoveTiles.activeMoveID === Player.cntSelectedCards) {
                this.activate(endTurnOff, endTurnOn);
            } else {
                this.deActivate(endTurnOff, endTurnOn);
            }
        });
    }

    private activate(endTurnOff: Sprite, endTurnOn: Sprite) {
        endTurnOff.visible = false;
        endTurnOn.visible = true;
        endTurnOn.interactive = true;
    }

    private deActivate(endTurnOff: Sprite, endTurnOn: Sprite) {
        endTurnOff.visible = true;
        endTurnOn.visible = false;
        endTurnOn.interactive = false;
    }
}