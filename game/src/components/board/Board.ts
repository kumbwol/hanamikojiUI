import {Container} from "pixi.js";
import {Tile, TileType} from "../tile/Tile";

export class Board extends Container {
    constructor() {
        super();
        for(let i=0; i<Object.keys(TileType).length / 2; i++) {
            const offsetX = 15;
            const tile = new Tile(i);
            tile.x = i * (tile.width + offsetX);
            this.addChild(tile);
        }

        this.position.set(140, 350);
    }
}