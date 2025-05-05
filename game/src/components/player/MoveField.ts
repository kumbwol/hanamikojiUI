import {Container, Graphics, Sprite} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";
import {MoveTiles} from "./MoveTiles";

export class MoveField extends Container {
    private image: Sprite;
    private selector: Graphics;
    private readonly type: MoveType;

    constructor(type: MoveType) {
        super();
        this.type = type;
        this.createImage(type);
        this.createSelectFrame();
        this.interactive = true;
        this.cursor = "pointer";
    }

    public unSelect() {
        this.selector.visible = false;
    }

    public select() {
        MoveTiles.activeMoveID = this.type;
        this.selector.visible = true;
    }

    public deActivate() {
        this.image.alpha = 0.3;
        this.interactive = false;
    }

    private createSelectFrame() {
        this.selector = new Graphics();
        const offsetSelectorX = -38;
        const offsetSelectorY = -38;
        const selectorWidth = 76;
        this.selector.roundRect(offsetSelectorX, offsetSelectorY, selectorWidth, selectorWidth, 2);
        this.selector.stroke({color: 0x00FF00, width: 6});
        this.addChild(this.selector);
        this.selector.visible = false;
    }

    private createImage(type: MoveType) {
        switch(type) {
            case MoveType.STASH:
                this.image = new Sprite(GameLoader.TEXTURES.get("moveStash"));
                break;

            case MoveType.TRASH:
                this.image = new Sprite(GameLoader.TEXTURES.get("moveTrash"));
                break;

            case MoveType.OFFER_3:
                this.image = new Sprite(GameLoader.TEXTURES.get("moveOfferThree"));
                break;

            case MoveType.OFFER_4:
                this.image = new Sprite(GameLoader.TEXTURES.get("moveOfferFour"));
                break;
        }

        this.image.anchor.set(0.5);
        this.addChild(this.image);
    }
}

export enum MoveType {
    UNKNOWN,
    STASH,
    TRASH,
    OFFER_3,
    OFFER_4,
    SELECT_FROM_3,
    SELECT_FROM_4
}