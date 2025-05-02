import {MarkerPosition, Tile, TileType} from "../tile/Tile";
import {Text, TextStyle} from "pixi.js";

export class Card extends Tile {
    constructor(type: TileType, isInverse = false) {
        super(type, MarkerPosition.MID);
        if(isInverse) {
            this.rotation = Math.PI;
        }
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

        textTop.position.set(-50, -70);
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