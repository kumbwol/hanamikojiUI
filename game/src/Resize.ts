import { Rectangle } from "pixi.js";

export class Resize
{
    constructor()
    {
    }

    public resize(screen: Rectangle)
    {
        let ratio = window.innerWidth / window.innerHeight;

        let html = document.getElementById("mainHTML");
        let canvas = document.getElementsByTagName("canvas");

        if(ratio < (screen.width / screen.height))
        {
            html.style.width = "100vw";
            html.style.height = "auto";

            canvas[0].style.width = "100vw";
            canvas[0].style.height = "auto";
        }
        else
        {
            html.style.width = "auto";
            html.style.height = "100vh";

            canvas[0].style.width = "auto";
            canvas[0].style.height = "100vh";
        }
    }
}
