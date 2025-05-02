import {Container} from "pixi.js";
import {Card} from "../card/Card";
import {TileType} from "../tile/Tile";

export class Hand extends Container {
    constructor(numOfCards: number) {
        super();
        this.addCards(numOfCards);
    }

    private addCards(numOfCards: number) {
        const offsetX = 30;
        for(let i=0; i<numOfCards; i++) {
            const card = new Card(TileType.BACK);
            card.x = offsetX * i;
            this.addChild(card);
        }
    }
}