import {MarkerPosition, Tile, TileType} from "../tile/Tile";
import {Graphics, Text, TextStyle} from "pixi.js";
import {Player} from "../player/Player";
import {Main} from "../../Main";

export class Card extends Tile {
    private isSelected = false;
    private isDoubleSelected = false;
    private originalPosY: number;
    private selector: Graphics;
    private type: TileType;

    constructor(type: TileType, isTrashed: boolean, isInverse = false) {
        super(type, MarkerPosition.MID);
        if(isInverse) {
            this.rotation = Math.PI;
        }
        this.type = type;

        if(!isTrashed) {
            this.interactive = true;
            this.cursor = "pointer";
        }
        this.addDoubleSelector();
    }

    private addDoubleSelector() {
        this.selector = new Graphics();
        this.selector.rect(-70, -90, 140, 180);
        this.selector.stroke({color: 0xFFFF00, width: 6});
        this.selector.visible = false;
        this.addChild(this.selector);
    }

    public setOriginalPos() {
        this.originalPosY = this.y;
    }

    public doubleSelect() {
        if(!this.isSelected) {
            this.select();
        }

        this.isDoubleSelected = !this.isDoubleSelected;
        if(this.isDoubleSelected) {
            this.selector.visible = true;
            Player.doubleSelectedCards.push(this.type);
        } else {
            this.selector.visible = false;
            this.removeDoubleSelectedCard();
        }
        Main.STAGE.emit("change");
    }

    public select(isReversed = false) {
        this.isSelected = !this.isSelected;
        if(this.isSelected) {
            if(isReversed) {
                this.y = this.y + 20;
            } else {
                this.y = this.y - 20;
            }
            Player.selectedCards.push(this.type);
        } else {
            this.removeDoubleSelectedCard();
            this.isDoubleSelected = false;
            this.selector.visible = false;
            if(isReversed) {
                this.y = this.y - 20;
            } else {
                this.y = this.y + 20;
            }
            this.removeSelectedCard();
        }
        Main.STAGE.emit("change");
    }

    private removeDoubleSelectedCard() {
        for(let i=0; i<Player.doubleSelectedCards.length; i++) {
            if(Player.doubleSelectedCards[i] === this.type) {
                Player.doubleSelectedCards.splice(i, 1);
                break;
            }
        }
    }

    private removeSelectedCard() {
        for(let i=0; i<Player.selectedCards.length; i++) {
            if(Player.selectedCards[i] === this.type) {
                Player.selectedCards.splice(i, 1);
                break;
            }
        }
    }

    public deSelect() {
        this.isSelected = false;
        this.y = this.originalPosY;
        this.removeSelectedCard();
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