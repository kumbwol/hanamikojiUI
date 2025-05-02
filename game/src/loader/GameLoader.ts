import {Assets} from "pixi.js";
import {GameGraphics} from "./GameGraphics";

export class GameLoader {
    private graphics: GameGraphics;
    static TEXTURES = new Map<string, any>();

    constructor() {
        this.createGraphicsLoader();
    }

    private createGraphicsLoader() {
        this.graphics = new GameGraphics();
    }

    public async loadImages() {
        for(let i=0; i<this.graphics.assets.length; i++) {
            const asset = this.graphics.assets[i];
            const texture = await Assets.load(asset);
            GameLoader.TEXTURES.set(asset.name, texture);
        }
    }
}