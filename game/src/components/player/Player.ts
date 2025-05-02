import {Container} from "pixi.js";
import {Hand} from "./Hand";
import {PlayerInfo} from "../../data/Data";

export class Player extends Container {
    constructor(numOfCards: number, playerInfo: PlayerInfo, isTop = true) {
        super();
        const hand = new Hand(numOfCards, playerInfo.handCards);
        this.addChild(hand);
        this.position.set(1040, 100);
        this.scale.set(0.8);

        if(!isTop) {
            this.position.set(1040, 620);
        }
    }
}