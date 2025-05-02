export interface IAsset {
    name: string;
    src: string;
}

export class GameGraphics {
    public readonly assets: IAsset[] = [];

    constructor() {
        const dir = "./game/assets/gfx/";
        this.assets.push({name: "section", src: dir + "section.png"});
        this.assets.push({name: "background", src: dir + "background.png"});
    }
}