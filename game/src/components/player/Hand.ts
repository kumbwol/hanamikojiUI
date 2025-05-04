import {Container} from "pixi.js";
import {Card} from "../card/Card";

export class Hand extends Container {
    constructor(numOfCards: number, playerCards: number[]) {
        super();
        this.addCards(numOfCards, playerCards);
    }

    private addCards(numOfCards: number, playerCards: number[]) {
        const offsetX = 30;
        let numCards = 0;
        for(let i=0; i<playerCards.length; i++) {
            for(let j=0; j<playerCards[i]; j++) {
                const card = new Card(i);
                card.x = offsetX * numCards;
                this.addChild(card);
                numCards++;
                this.addListeners(card);
            }
        }
    }

    private addListeners(card: Card) {
        card.addListener("click", () => {
            card.select();
        });
    }
}