import {Container, Sprite, Text, TextStyle} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";
import {MoveTiles} from "../player/MoveTiles";
import {Player} from "../player/Player";
import {MoveType} from "../player/MoveField";

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
            let isActive = false;
            if(MoveTiles.activeMoveID === MoveType.OFFER_4 && Player.selectedCards.length === 4 && Player.doubleSelectedCards.length === 2) {
                isActive = true;
            } else if(MoveTiles.activeMoveID === MoveType.OFFER_3 && Player.selectedCards.length === 3) {
                isActive = true;
            } else if(MoveTiles.activeMoveID === MoveType.TRASH && Player.selectedCards.length === 2) {
                isActive = true;
            } else if(MoveTiles.activeMoveID === MoveType.STASH && Player.selectedCards.length === 1) {
                isActive = true;
            }

            if(isActive) {
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