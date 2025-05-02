import {Container, Sprite, Text, TextStyle} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";

export class Tile extends Container {
    constructor(type: TileType, markerPos: MarkerPosition) {
        super();
        this.createBackground(type);
        this.addValue(type);
        this.addMarker(markerPos);
    }

    protected addMarker(markerPos: MarkerPosition) {
        const marker = new Sprite(GameLoader.TEXTURES.get("tileMarker"));
        marker.anchor.set(0.5);
        if(markerPos === MarkerPosition.TOP) {
            marker.position.set(0, -50);
        } else if(markerPos === MarkerPosition.BOT) {
            marker.position.set(0, 50);
        }
        this.addChild(marker);
    }

    protected createBackground(type: TileType) {
        const tile = new Sprite(GameLoader.TEXTURES.get(this.getSprite(type)));
        tile.anchor.set(0.5);
        this.addChild(tile);
    }

    protected addValue(type: TileType) {
        const style = new TextStyle({
            fontSize: 44
        });
        const textTop = new Text({ text: '3' , style});
        const textBot = new Text({ text: '3' , style});

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

        textTop.position.set(-55, -70);
        textTop.anchor.set(0.5);
        this.addChild(textTop);

        textBot.text = textTop.text;
        textBot.position.set(55, 70);
        textBot.anchor.set(0.5);
        textBot.rotation = Math.PI;
        this.addChild(textBot);
    }

    protected getSprite(type: TileType): string {
        switch (type) {
            case TileType.YELLOW:
                return "tileYellow";
            case TileType.RED:
                return "tileRed";
            case TileType.PURPLE:
                return "tilePurple";
            case TileType.ORANGE:
                return "tileOrange";
            case TileType.BLUE:
                return "tileBlue";
            case TileType.GREEN:
                return "tileGreen";
            case TileType.PINK:
                return "tilePink";
        }
    }
}

export enum TileType {
    YELLOW,
    RED,
    PURPLE,
    ORANGE,
    BLUE,
    GREEN,
    PINK,
    BACK
}

export enum MarkerPosition {
    TOP,
    MID,
    BOT
}