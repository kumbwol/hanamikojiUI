import {Container} from "pixi.js";
import {Tile, TileType} from "../tile/Tile";
import {Card} from "../card/Card";

export class Board extends Container {
    constructor() {
        super();
        this.createTiles();
        this.position.set(140, 350);
        this.scale.set(0.8);
    }

    private createTiles() {
        for(let i=0; i<Object.keys(TileType).length / 2; i++) {
            const numberOfCards = Math.floor(Math.random() * 5) + 1;
            const offsetTileX = 15;
            const tile = new Tile(i);
            tile.x = i * (tile.width + offsetTileX);
            this.addChild(tile);
            this.createCards(i, tile.width, offsetTileX, numberOfCards);
            this.createTopPlayerCards(i, tile.width, offsetTileX, numberOfCards);
        }
    }

    private createCards(i: number, width: number, offset: number, numOfCards: number) {
        const offsetFromTileY = 195;
        const offsetFromCardsY = 35;
        for(let j=0; j<numOfCards; j++) {
            const card = new Card(i);
            card.x = i * (width + offset);
            card.y = offsetFromTileY + j * offsetFromCardsY;
            this.addChild(card);
        }
    }

    private createTopPlayerCards(i: number, width: number, offset: number, numOfCards: number) {
        const offsetFromTileY = -195;
        const offsetFromCardsY = -35;
        for(let j=0; j<numOfCards; j++) {
            const card = new Card(i, true);
            card.x = i * (width + offset);
            card.y = offsetFromTileY + j * offsetFromCardsY;
            this.addChild(card);
        }
    }
}