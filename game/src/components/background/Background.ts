import {Container, Sprite} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";

export class Background extends Container {
    constructor() {
        super();
        const bg = new Sprite(GameLoader.TEXTURES.get("background"));
        bg.anchor.set(0);
        this.addChild(bg);
    }
}