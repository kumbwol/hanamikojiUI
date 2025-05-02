import {Container, Sprite} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";
import {Card} from "../card/Card";
import {FourWayOffering} from "../../data/Data";

export class OfferingFour extends Container {
    constructor(offering: FourWayOffering) {
        super();
        this.createBackground();
        this.position.set(1280, 0);
        this.createOffering(offering);
    }

    private createBackground() {
        const bg = new Sprite(GameLoader.TEXTURES.get("offeringBackground"));
        bg.anchor.set(0.5);
        this.addChild(bg);
    }

    private createOffering(offering: FourWayOffering) {
        const offsetSmallX = 40;
        const offsetLeftX = -120;
        let numOfCards = 0;
        for(let i=0; i<offering.first.length; i++) {
            for(let j=0; j<offering.first[i]; j++) {
                const card = new Card(i);
                card.position.set(offsetLeftX + numOfCards * offsetSmallX, 0);
                this.addChild(card);
                numOfCards++;
            }
        }

        const offsetRightX = 80;
        numOfCards = 0;
        for(let i=0; i<offering.second.length; i++) {
            for(let j=0; j<offering.second[i]; j++) {
                const card = new Card(i);
                card.position.set(offsetRightX + numOfCards * offsetSmallX, 0);
                this.addChild(card);
                numOfCards++;
            }
        }
    }
}