import {Container} from "pixi.js";
import {Hand} from "./Hand";
import {PlayerInfo} from "../../data/Data";
import {TrashedCards} from "./TrashedCards";
import {StashedCard} from "./StashedCard";
import {MoveTiles} from "./MoveTiles";
import {TileType} from "../tile/Tile";

export class Player extends Container {
    public static offeringCards3: TileType[] = [];
    public static offeringCards4: TileType[][] = [];
    public static selectedCards: TileType[] = [];
    public static doubleSelectedCards: TileType[] = [];

    constructor(stage: Container, isHuman: boolean, numOfCards: number, playerInfo: PlayerInfo) {
        super();
        const isTop = !isHuman;
        Player.offeringCards4.push([]);
        Player.offeringCards4.push([]);
        const hand = new Hand(numOfCards, playerInfo.handCards, isHuman);
        if(playerInfo.stashedCard !== -1) {
            const stashedCard = new StashedCard(isHuman ? playerInfo.stashedCard : TileType.BACK);
            this.addChild(stashedCard);
            stashedCard.position.set(0, 200);
            if(!isTop) {
                stashedCard.position.set(0, -200);
            }
        }
        const trashedCards = new TrashedCards(numOfCards, playerInfo.trashedCards, isHuman);
        const moveTiles = new MoveTiles(stage, playerInfo.possibleMoves, playerInfo.isActive);
        this.addChild(hand);
        this.addChild(trashedCards);
        this.addChild(moveTiles);
        this.position.set(1040, 100);
        this.scale.set(0.8);

        hand.position.set(20, 0);
        trashedCards.position.set(150, 200);
        moveTiles.scale.set(1);
        moveTiles.position.set(-210, -50);

        if(!isTop) {
            this.position.set(1040, 620);
            trashedCards.position.set(150, -200);
            moveTiles.position.set(-210, -40);
        }
    }
}