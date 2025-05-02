import {Container} from "pixi.js";
import {Hand} from "./Hand";

export class Player extends Container {
    constructor(numOfCards: number, isTop = true) {
        super();
        const hand = new Hand(numOfCards);
        this.addChild(hand);
        this.position.set(1040, 100);
        this.scale.set(0.8);

        if(!isTop) {
            this.position.set(1040, 620);
        }
    }
}