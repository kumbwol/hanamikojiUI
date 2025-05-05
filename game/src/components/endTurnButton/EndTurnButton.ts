import {Container, Sprite, Text, TextStyle} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";
import {MoveTiles} from "../player/MoveTiles";
import {Player} from "../player/Player";

export class EndTurnButton extends Container {
    constructor() {
        super();
        const endTurnOff = new Sprite(GameLoader.TEXTURES.get("endTurnOff"));
        endTurnOff.anchor.set(0.5);
        const endTurnOn = new Sprite(GameLoader.TEXTURES.get("endTurnOn"));
        endTurnOn.anchor.set(0.5);

        this.addChild(endTurnOff);
        this.addChild(endTurnOn);
        this.position.set(1200, 360);

        endTurnOn.visible = false;

        endTurnOff.interactive = true;
        endTurnOn.interactive = true;

        endTurnOff.cursor = "pointer";
        endTurnOn.cursor = "pointer";

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

        endTurnOff.addEventListener("click", () => {
            console.log(MoveTiles.activeMoveID, Player.cntSelectedCards);
            endTurnOff.visible = false;
            endTurnOn.visible = true;
        });

        endTurnOn.addEventListener("click", () => {
            console.log(MoveTiles.activeMoveID, Player.cntSelectedCards);
            endTurnOff.visible = true;
            endTurnOn.visible = false;
        });
    }
}