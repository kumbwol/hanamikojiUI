import {Application} from "pixi.js";
import {Resize} from "./Resize";
import {GameLoader} from "./loader/GameLoader";
import {Gamer} from "./logic/Gamer";

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


        app.stage.interactive = true;
        //new Stepper(app.stage);
        new Gamer(app.stage);

        window.addEventListener("keydown", (e) => {
            if(e.key === "s") {
                this.saveFile("human_in.json", `{"tick" : ${Gamer.ID}, "command" : "swap"}`);
            } else if(e.key === "r") {
                this.saveFile("human_in.json", `{"tick" : ${Gamer.ID}, "command" : "reset"}`);
            }
        })
    }

    private async saveFile(filename: string, content: string) {
        Gamer.ID++;
        await fetch('http://localhost:5000/write', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, content }),
        });
    }

}

new Main();