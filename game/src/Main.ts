import {Application} from "pixi.js";
import {Resize} from "./Resize";
import {GameLoader} from "./loader/GameLoader";
import {Background} from "./components/background/Background";

export class Main {
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


        app.stage.addChild(new Background());
        app.stage.interactive = true;
    }
}

new Main();