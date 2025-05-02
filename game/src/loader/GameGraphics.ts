export interface IAsset {
    name: string;
    src: string;
}

export class GameGraphics {
    public readonly assets: IAsset[] = [];

    constructor() {
        const dir = "./game/assets/gfx/";
        this.assets.push({name: "tileMarker", src: dir + "tiles/marker.png"});
        this.assets.push({name: "tileYellow", src: dir + "tiles/tileYellow.png"});
        this.assets.push({name: "tileRed", src: dir + "tiles/tileRed.png"});
        this.assets.push({name: "tilePurple", src: dir + "tiles/tilePurple.png"});
        this.assets.push({name: "tileOrange", src: dir + "tiles/tileOrange.png"});
        this.assets.push({name: "tileBlue", src: dir + "tiles/tileBlue.png"});
        this.assets.push({name: "tileGreen", src: dir + "tiles/tileGreen.png"});
        this.assets.push({name: "tilePink", src: dir + "tiles/tilePink.png"});
        this.assets.push({name: "cardYellow", src: dir + "cards/cardYellow.png"});
        this.assets.push({name: "cardRed", src: dir + "cards/cardRed.png"});
        this.assets.push({name: "cardPurple", src: dir + "cards/cardPurple.png"});
        this.assets.push({name: "cardOrange", src: dir + "cards/cardOrange.png"});
        this.assets.push({name: "cardBlue", src: dir + "cards/cardBlue.png"});
        this.assets.push({name: "cardGreen", src: dir + "cards/cardGreen.png"});
        this.assets.push({name: "cardPink", src: dir + "cards/cardPink.png"});
        this.assets.push({name: "cardBack", src: dir + "cards/cardBack.png"});
        this.assets.push({name: "background", src: dir + "background.png"});
    }
}