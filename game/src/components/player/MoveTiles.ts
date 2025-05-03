import {Container, Sprite} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";

export class MoveTile extends Container {
    constructor(possibleMoves: number[]) {
        super();
        const stashMove = new Sprite(GameLoader.TEXTURES.get("moveStash"));
        const trashMove = new Sprite(GameLoader.TEXTURES.get("moveTrash"));
        const offerThreeMove = new Sprite(GameLoader.TEXTURES.get("moveOfferThree"));
        const offerFourMove = new Sprite(GameLoader.TEXTURES.get("moveOfferFour"));
        this.addChild(stashMove);
        this.addChild(trashMove);
        this.addChild(offerThreeMove);
        this.addChild(offerFourMove);

        const offsetX = 10;
        const offsetY = 10;
        stashMove.anchor.set(0.5);
        trashMove.anchor.set(0.5);
        offerThreeMove.anchor.set(0.5);
        offerFourMove.anchor.set(0.5);
        stashMove.position.set(0, 0);
        trashMove.position.set(stashMove.width + offsetX, 0);
        offerThreeMove.position.set(0, stashMove.height + offsetY);
        offerFourMove.position.set(stashMove.width + offsetX, stashMove.height + offsetY);

        const dimmedAlpha = 0.3
        for(let i=0; i<possibleMoves.length; i++) {
            if(possibleMoves[i] === 0) {
                if(i === 0) {
                    stashMove.alpha = dimmedAlpha;
                } else if(i === 1) {
                    trashMove.alpha = dimmedAlpha;
                } else if(i === 2) {
                    offerThreeMove.alpha = dimmedAlpha;
                } else if(i === 3) {
                    offerFourMove.alpha = dimmedAlpha;
                }
            }
        }
    }
}