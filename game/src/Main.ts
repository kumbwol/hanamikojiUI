import {Application, Container} from "pixi.js";
import {Resize} from "./Resize";
import {GameLoader} from "./loader/GameLoader";
import {Gamer} from "./logic/Gamer";
import {MoveTiles} from "./components/player/MoveTiles";
import {MoveType} from "./components/player/MoveField";
import {Player} from "./components/player/Player";

export class Main {
    public static ROUND_END_COFIRMED = false;
    public static STAGE: Container;
    public static sendMove: (content: string) => {};
    private loader: GameLoader;
    private resize: Resize;

    constructor() {
        this.resize = new Resize();
        this.loader = new GameLoader();
        this.createApplication();
    }

    private async createApplication() {
        const app = new Application();
        globalThis.__PIXI_APP__ = app;

        await app.init({
            width: 1280,
            height: 720,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(app.canvas);
        this.resize.resize(app.screen);
        window.onresize = () => this.resize.resize(app.screen);
        await this.loader.loadImages();
        app.view.addEventListener('contextmenu', (e) => e.preventDefault());

        Main.STAGE = app.stage;

        app.stage.interactive = true;
        //new Stepper(app.stage);
        new Gamer(app.stage);
    }
}

new Main();