import {Container} from "pixi.js";
import {Tile, TileType} from "../tile/Tile";
import {Card} from "../card/Card";

export class Board extends Container {
    constructor() {
        super();
        this.createTiles();

        this.position.set(140, 350);
    }

    private createTiles() {
        for(let i=0; i<Object.keys(TileType).length / 2; i++) {
            const offsetTileX = 15;
            const tile = new Tile(i);
            tile.x = i * (tile.width + offsetTileX);
            this.addChild(tile);

            const offsetY = 195;
            const card = new Card(i);
            card.x = i * (tile.width + offsetTileX);
            card.y = offsetY;
            this.addChild(card);
        }
    }
}