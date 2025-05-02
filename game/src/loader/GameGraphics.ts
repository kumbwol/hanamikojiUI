export interface IAsset {
    name: string;
    src: string;
}

export class GameGraphics {
    public readonly assets: IAsset[] = [];

    constructor() {
        const dir = "./game/assets/gfx/";
        this.assets.push({name: "tileYellow", src: dir + "tileYellow.png"});
        this.assets.push({name: "tileRed", src: dir + "tileRed.png"});
        this.assets.push({name: "tilePurple", src: dir + "tilePurple.png"});
        this.assets.push({name: "tileOrange", src: dir + "tileOrange.png"});
        this.assets.push({name: "tileBlue", src: dir + "tileBlue.png"});
        this.assets.push({name: "tileGreen", src: dir + "tileGreen.png"});
        this.assets.push({name: "tilePink", src: dir + "tilePink.png"});
        this.assets.push({name: "background", src: dir + "background.png"});
    }
}