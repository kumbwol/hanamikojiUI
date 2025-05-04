import {Container, Sprite} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";
import {Card} from "../card/Card";

export class OfferingThree extends Container {
    constructor(offering: number[]) {
        super();
        this.createBackground();
        this.position.set(1280, 0);
        this.createOffering(offering);
    }

    private createBackground() {
        const bg = new Sprite(GameLoader.TEXTURES.get("offeringBackground"));
        bg.anchor.set(0.5);
        this.addChild(bg);
    }

    private createOffering(offering: number[]) {
        const cards = [];
        const offsetX = 120;
        let numOfCards = 0;
        for(let i=0; i<offering.length; i++) {
            for(let j=0; j<offering[i]; j++) {
                const card = new Card(i);
                card.position.set(-offsetX + numOfCards * offsetX, 0);
                this.addChild(card);
                numOfCards++;
                cards.push(card);
                this.addListeners(card, cards);
                card.setOriginalPos();
            }
        }
    }

    private addListeners(card: Card, cards: Card[]) {
        card.addListener("click", () => {
            for(let i=0; i<cards.length; i++) {
                cards[i].deSelect();
            }
            card.select(true);
        });
    }
}