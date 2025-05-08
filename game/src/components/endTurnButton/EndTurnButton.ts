import {Container, Sprite, Text, TextStyle} from "pixi.js";
import {GameLoader} from "../../loader/GameLoader";
import {MoveTiles} from "../player/MoveTiles";
import {Player} from "../player/Player";
import {MoveType} from "../player/MoveField";
import {Main} from "../../Main";
import {Gamer} from "../../logic/Gamer";

export class EndTurnButton extends Container {
    constructor(stage: Container, isRoundEnd: boolean, reset: (stage) => void) {
        super();
        const endTurnOff = new Sprite(GameLoader.TEXTURES.get("endTurnOff"));
        endTurnOff.anchor.set(0.5);
        const endTurnOn = new Sprite(GameLoader.TEXTURES.get("endTurnOn"));
        endTurnOn.anchor.set(0.5);

        this.addChild(endTurnOff);
        this.addChild(endTurnOn);
        this.position.set(1200, 360);

        const style = new TextStyle({
            fontSize: 28,
            align: "center",
            wordWrap: true,
            wordWrapWidth: 10
        });
        const endTurnText = new Text({ text: 'END TURN', style});
        endTurnText.anchor.set(0.5);
        this.addChild(endTurnText);
        endTurnText.interactive = false;
        endTurnText.eventMode = "none";

        endTurnOn.addEventListener("click", () => {
            if(isRoundEnd) {
                Main.ROUND_END_COFIRMED = true;
                reset(stage);
            } else {
                switch (MoveTiles.activeMoveID) {
                    case MoveType.STASH:
                        Main.sendMove("human_in.json", this.doStashMove());
                        break;

                    case MoveType.TRASH:
                        Main.sendMove("human_in.json", this.doTrashMove());
                        break;

                    case MoveType.OFFER_3:
                        Main.sendMove("human_in.json", this.doOffer3Move());
                        break;

                    case MoveType.OFFER_4:
                        Main.sendMove("human_in.json", this.doOffer4Move());
                        break;

                    case MoveType.SELECT_FROM_3:
                        Main.sendMove("human_in.json", this.doSelectFrom3Move());
                        break;

                    case MoveType.SELECT_FROM_4:
                        Main.sendMove("human_in.json", this.doSelectFrom4Move());
                        break;
                }
            }
            this.deActivate(endTurnOff, endTurnOn);
        });

        stage.addEventListener("change", () => {
            let isActive = false;
            console.log(Player.selectedCards);
            if(MoveTiles.activeMoveID === MoveType.OFFER_4 && Player.selectedCards.length === 4 && Player.doubleSelectedCards.length === 2) {
                isActive = true;
            } else if(MoveTiles.activeMoveID === MoveType.OFFER_3 && Player.selectedCards.length === 3) {
                isActive = true;
            } else if(MoveTiles.activeMoveID === MoveType.TRASH && Player.selectedCards.length === 2) {
                isActive = true;
            } else if(MoveTiles.activeMoveID === MoveType.STASH && Player.selectedCards.length === 1) {
                isActive = true;
            } else if(MoveTiles.activeMoveID === MoveType.SELECT_FROM_3 && Player.selectedCards.length === 1) {
                isActive = true;
            }  else if(MoveTiles.activeMoveID === MoveType.SELECT_FROM_4 && Player.selectedCards.length === 2) {
                isActive = true;
            }

            if(isActive) {
                this.activate(endTurnOff, endTurnOn);
            } else {
                this.deActivate(endTurnOff, endTurnOn);
            }
        });

        if(isRoundEnd && !Main.ROUND_END_COFIRMED) {
            this.activate(endTurnOff, endTurnOn);
        } else {
            this.deActivate(endTurnOff, endTurnOn);
        }
        Main.ROUND_END_COFIRMED = false;
    }

    private doStashMove(): string {
        const r = this.generateArrayFromSelectedCards();
        return `{"tick":${Gamer.ID},"type":0,"move":[${r}],"command":null}`;
    }

    private doTrashMove(): string {
        const r = this.generateArrayFromSelectedCards();
        return `{"tick":${Gamer.ID},"type":1,"move":[${r}],"command":null}`;
    }

    private doOffer3Move(): string {
        const r = this.generateArrayFromSelectedCards();
        return `{"tick":${Gamer.ID},"type":2,"move":[${r}],"command":null}`;
    }

    private doOffer4Move(): string {
        const r = this.generateArrayFromNotDoubleSelectedCards();
        const d = this.generateArrayFromDoubleSelectedCards();
        return `{"tick":${Gamer.ID},"type":3,"move":[[${r}],[${d}]],"command":null}`;
    }

    private doSelectFrom3Move(): string {
        const r = this.generateArrayFromSelectedCards();
        const n = this.generateArrayFromNotSelectedCards3();
        return `{"tick":${Gamer.ID},"type":4,"move":[[${r}],[${n}]],"command":null}`;
    }

    private doSelectFrom4Move(): string {
        const r = this.generateArrayFromSelectedCards();
        const n = this.generateArrayFromNotSelectedCards4();

        return `{"tick":${Gamer.ID},"type":5,"move":[[${r}],[${n}]],"command":null}`;
    }

    private generateArrayFromSelectedCards(): number[] {
        const r = [];

        for(let i=0; i<7; i++) {
            r.push(0);
        }

        for(let i=0; i<Player.selectedCards.length; i++) {
            r[Player.selectedCards[i]]++;
        }

        return r;
    }

    private generateArrayFromDoubleSelectedCards(): number[] {
        const r = [];

        for(let i=0; i<7; i++) {
            r.push(0);
        }

        for(let i=0; i<Player.doubleSelectedCards.length; i++) {
            r[Player.doubleSelectedCards[i]]++;
        }

        return r;
    }

    private generateArrayFromNotDoubleSelectedCards(): number[] {
        const r = this.generateArrayFromSelectedCards();
        const c = this.generateArrayFromDoubleSelectedCards();

        for(let i=0; i<r.length; i++) {
            r[i] -= c[i];
        }

        return r;
    }

    private generateArrayFromNotSelectedCards3(): number[] {
        for(let i=0; i<Player.offeringCards3.length; i++) {
            if(Player.offeringCards3[i] === Player.selectedCards[0]) {
                Player.offeringCards3.splice(i, 1);
                break;
            }
        }

        const r = [];

        for(let i=0; i<7; i++) {
            r.push(0);
        }

        for(let i=0; i<Player.offeringCards3.length; i++) {
            r[Player.offeringCards3[i]]++;
        }

        return r;
    }

    private generateArrayFromNotSelectedCards4(): number[] {
        const r = [];
        let s = [];

        if(Player.selectedCards[0] === Player.offeringCards4[0][0] && Player.selectedCards[1] === Player.offeringCards4[0][1]) {
            s = Player.offeringCards4[1];
        } else {
            s = Player.offeringCards4[0];
        }

        for(let i=0; i<7; i++) {
            r.push(0);
        }

        for(let i=0; i<s.length; i++) {
            r[s[i]]++;
        }

        return r;
    }

    private activate(endTurnOff: Sprite, endTurnOn: Sprite) {
        endTurnOff.visible = false;
        endTurnOn.visible = true;
        endTurnOn.interactive = true;
        endTurnOn.cursor = "pointer";
    }

    private deActivate(endTurnOff: Sprite, endTurnOn: Sprite) {
        endTurnOff.visible = true;
        endTurnOn.visible = false;
        endTurnOn.interactive = false;
        endTurnOn.cursor = "default";
    }
}