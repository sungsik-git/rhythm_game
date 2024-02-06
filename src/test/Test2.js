import Phaser from "phaser";
import Reset from "./Reset";

export default class Test2 extends Phaser.Scene{
    constructor(){
        super('test2');
    }

    init(data){
        this.score = data.score;
        this.combo = data.combo;
        this.judgementText = data.judgementText;
    }

    create(){
        this.scoreObject = this.add.text(
            100,
            100,
            this.score,
            '0xffffff'
        )

        this.comboObject = this.add.text(
            100,
            200,
            this.combo,
            '0xffffff'
        )

        this.judgementTextObject = this.add.text(
            100,
            300,
            this.judgementText,
            '0xffffff'
        )

        this.resetButton = new Reset(this);
        this.resetButton.loadButton();
    }

    update(){
        this.scoreObject.setText(this.score);
        this.comboObject.setText(this.combo);
        this.judgementTextObject.setText(this.judgementText);
        console.log("test")
    }
    
}