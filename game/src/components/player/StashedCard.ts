import {TileType} from "../tile/Tile";
import {Card} from "../card/Card";

export class StashedCard extends Card {
    constructor(type: TileType) {
        super(type);
    }
}