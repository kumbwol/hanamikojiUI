import {Container, Sprite} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";
import {Card} from "../card/Card";
import {TileType} from "../tile/Tile";

export class OfferingFour extends Container {
    constructor(offering: number[]) {
        super();
        this.createBackground();
        this.position.set(1280, 0);

        const c1 = new Card(TileType.GREEN);
        const c2 = new Card(TileType.PINK);
        const c3 = new Card(TileType.GREEN);
        const c4 = new Card(TileType.PINK);

        c1.position.set(-120, 0);
        c2.position.set(-80, 0);
        c3.position.set(80, 0);
        c4.position.set(120, 0);

        this.addChild(c1);
        this.addChild(c2);
        this.addChild(c3);
        this.addChild(c4);
    }

    private createBackground() {
        const bg = new Sprite(GameLoader.TEXTURES.get("offeringBackground"));
        bg.anchor.set(0.5);
        this.addChild(bg);
    }
}