import {Container} from "pixi.js";
import {Card} from "../card/Card";
import {TileType} from "../tile/Tile";

export class Hand extends Container {
    constructor(numOfCards: number, playerCards: number[], isHuman: boolean, isTrashed = false) {
        super();
        this.addCards(numOfCards, playerCards, isHuman, isTrashed);
    }

    private addCards(numOfCards: number, playerCards: number[], isHuman: boolean, isTrashed = false) {
        const offsetX = 30;
        let numCards = 0;
        for(let i=0; i<playerCards.length; i++) {
            for(let j=0; j<playerCards[i]; j++) {
                const card = new Card(isHuman ? i : TileType.BACK, isTrashed);
                card.x = offsetX * numCards;
                this.addChild(card);
                numCards++;
                this.addListeners(card);
            }
        }
    }

    private addListeners(card: Card) {
        card.on("pointertap", (e) => {
            if(e.button === 0) {
                card.select();
            } else {
                card.doubleSelect();
            }
        });
    }
}