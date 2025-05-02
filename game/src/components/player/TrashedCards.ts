import {Hand} from "./Hand";

export class TrashedCards extends Hand {
    constructor(numOfCards: number, trashedCards: number[]) {
        super(numOfCards, trashedCards);
        this.alpha = 0.5;
    }
}