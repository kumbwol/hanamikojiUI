import {Hand} from "./Hand";

export class TrashedCards extends Hand {
    constructor(numOfCards: number, trashedCards: number[], isHuman: boolean) {
        super(numOfCards, trashedCards, isHuman, true);
        this.alpha = 0.5;
    }
}