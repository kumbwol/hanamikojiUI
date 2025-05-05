import {MarkerPosition, Tile, TileType} from "../tile/Tile";
import {Text, TextStyle} from "pixi.js";
import {Player} from "../player/Player";
import {Main} from "../../Main";

export class Card extends Tile {
    private isSelected = false;
    private originalPosY: number;

    constructor(type: TileType, isInverse = false) {
        super(type, MarkerPosition.MID);
        if(isInverse) {
            this.rotation = Math.PI;
        }

        this.interactive = true;
        this.cursor = "pointer";
    }

    public setOriginalPos() {
        this.originalPosY = this.y;
    }

    public select(isReversed = false) {
        Main.STAGE.emit("change");
        this.isSelected = !this.isSelected;
        if(this.isSelected) {
            if(isReversed) {
                this.y = this.y + 20;
            } else {
                this.y = this.y - 20;
            }
            Player.cntSelectedCards++;
        } else {
            if(isReversed) {
                this.y = this.y - 20;
            } else {
                this.y = this.y + 20;
            }
            Player.cntSelectedCards--;
        }
    }

    public deSelect() {
        this.isSelected = false;
        this.y = this.originalPosY;
    }

    protected addMarker() {}

    protected addValue(type: TileType) {
        if(type === TileType.BACK) {
            return;
        }
        const style = new TextStyle({
            fontSize: 30
        });
        const textTop = new Text({ text: '3' , style});

        switch (type) {
            case TileType.YELLOW:
                textTop.text = 2;
                break;

            case TileType.RED:
                textTop.text = 2;
                break;

            case TileType.PURPLE:
                textTop.text = 2;
                break;

            case TileType.ORANGE:
                textTop.text = 3;
                break;

            case TileType.BLUE:
                textTop.text = 3;
                break;

            case TileType.GREEN:
                textTop.text = 4;
                break;

            case TileType.PINK:
                textTop.text = 5;
                break;
        }

        textTop.position.set(-54, -70);
        textTop.anchor.set(0.5);
        this.addChild(textTop);
    }

    protected getSprite(type: TileType): string {
        switch (type) {
            case TileType.YELLOW:
                return "cardYellow";
            case TileType.RED:
                return "cardRed";
            case TileType.PURPLE:
                return "cardPurple";
            case TileType.ORANGE:
                return "cardOrange";
            case TileType.BLUE:
                return "cardBlue";
            case TileType.GREEN:
                return "cardGreen";
            case TileType.PINK:
                return "cardPink";
            case TileType.BACK:
                return "cardBack";
        }
    }
}