import {Container, Graphics} from "pixi.js";
import {MoveField, MoveType} from "./MoveField";

export class MoveTile extends Container {
    private activeMoveID = MoveType.UNKNOWN;

    constructor(possibleMoves: number[], isActive: boolean) {
        super();
        const stashMove = new MoveField(MoveType.STASH);
        const trashMove = new MoveField(MoveType.TRASH);
        const offerThreeMove = new MoveField(MoveType.OFFER_3);
        const offerFourMove = new MoveField(MoveType.OFFER_4);

        this.addChild(stashMove);
        this.addChild(trashMove);
        this.addChild(offerThreeMove);
        this.addChild(offerFourMove);

        const offsetX = 10;
        const offsetY = 10;
        stashMove.position.set(0, 0);
        trashMove.position.set(stashMove.width + offsetX, 0);
        offerThreeMove.position.set(0, stashMove.height + offsetY);
        offerFourMove.position.set(stashMove.width + offsetX, stashMove.height + offsetY);

        for(let i=0; i<possibleMoves.length; i++) {
            if(possibleMoves[i] === 0) {
                if(i === 0) {
                    stashMove.deActivate();
                } else if(i === 1) {
                    trashMove.deActivate();
                } else if(i === 2) {
                    offerThreeMove.deActivate();
                } else if(i === 3) {
                    offerFourMove.deActivate();
                }
            }
        }

        const activePlayer = new Graphics();
        const width = 186;
        const offsetActivePlayerX = -48;
        const offsetActivePlayerY = -48;
        activePlayer.roundRect(offsetActivePlayerX, offsetActivePlayerY, width, width, 10);
        activePlayer.stroke({color: 0xE35314, width: 6});
        if(isActive) {
            this.addChild(activePlayer);
        }

        const moves = [stashMove, trashMove, offerThreeMove, offerFourMove];
        this.addListeners(moves);
    }

    private addListeners(moves: MoveField[]) {
        for(let i=0; i<moves.length; i++) {
            moves[i].addListener("click", () => {
                for(let j=0; j<moves.length; j++) {
                    moves[j].unSelect();
                }
                moves[i].select();
            })
        }
    }
}