import {Container} from "pixi.js";
import {Tile} from "../tile/Tile";
import {Card} from "../card/Card";
import {Data, FourWayOffering} from "../../data/Data";
import {OfferingThree} from "../offering/OfferingThree";
import {OfferingFour} from "../offering/OfferingFour";
import {MoveTiles} from "../player/MoveTiles";
import {MoveType} from "../player/MoveField";

export class Board extends Container {
    constructor(data: Data) {
        super();
        this.createTiles(data);
        this.createOffering(data.offering3, data.offering4);
        this.position.set(80, 360);
        this.scale.set(0.7);
    }

    private createOffering(offering3: number[], offering4: FourWayOffering) {
        if(offering3) {
            MoveTiles.activeMoveID = MoveType.SELECT_FROM_3;
            this.addChild(new OfferingThree(offering3));
        } else if(offering4.first.length > 0) {
            MoveTiles.activeMoveID = MoveType.SELECT_FROM_4;
            this.addChild(new OfferingFour(offering4));
        }
    }

    private createTiles(data: Data) {
        for(let i=0; i<7; i++) {
            const offsetTileX = 15;
            const tile = new Tile(i, data.markerPos[i]);
            tile.x = i * (tile.width + offsetTileX);
            this.addChild(tile);
            this.createCards(i, tile.width, offsetTileX, data.activeCards.second[i]);
            this.createTopPlayerCards(i, tile.width, offsetTileX, data.activeCards.first[i]);
        }
    }

    private createCards(i: number, width: number, offset: number, numOfCards: number) {
        const offsetFromTileY = 195;
        const offsetFromCardsY = 35;
        for(let j=0; j<numOfCards; j++) {
            const card = new Card(i);
            card.x = i * (width + offset);
            card.y = offsetFromTileY + j * offsetFromCardsY;
            this.addChild(card);
        }
    }

    private createTopPlayerCards(i: number, width: number, offset: number, numOfCards: number) {
        const offsetFromTileY = -195;
        const offsetFromCardsY = -35;
        for(let j=0; j<numOfCards; j++) {
            const card = new Card(i, true);
            card.x = i * (width + offset);
            card.y = offsetFromTileY + j * offsetFromCardsY;
            this.addChild(card);
        }
    }
}