import {Container} from "pixi.js";
import {Hand} from "./Hand";
import {PlayerInfo} from "../../data/Data";
import {TrashedCards} from "./TrashedCards";
import {StashedCard} from "./StashedCard";

export class Player extends Container {
    constructor(numOfCards: number, playerInfo: PlayerInfo, isTop = true) {
        super();
        const hand = new Hand(numOfCards, playerInfo.handCards);
        if(playerInfo.stashedCard !== -1) {
            const stashedCard = new StashedCard(playerInfo.stashedCard);
            this.addChild(stashedCard);
            stashedCard.position.set(0, 200);
            if(!isTop) {
                stashedCard.position.set(0, -200);
            }
        }
        const trashedCards = new TrashedCards(numOfCards, playerInfo.trashedCards);
        this.addChild(hand);
        this.addChild(trashedCards);
        this.position.set(1040, 100);
        this.scale.set(0.8);

        hand.position.set(0, 0);
        trashedCards.position.set(150, 200);

        if(!isTop) {
            this.position.set(1040, 620);
            trashedCards.position.set(150, -200);
        }
    }
}