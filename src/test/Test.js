import Phaser from "phaser";
import Reset from "./Reset";

export default class Test extends Phaser.Scene{
    constructor(){
        super('test');
        this.score = 0;
        this.combo = 0;
        this.judgementText = null;
    }

    create(){
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        const mention = ['A', 'B', 'C', 'D', 'E'];

        this.keySpace.on('down', () => {
            this.score++;
            this.combo++;
            this.judgementText = mention[Math.floor(Math.random() * 5)];
        });

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

        if(this.score === 10){
            this.scene.start('test2', { score: this.score, combo: this.combo, judgementText: this.judgementText});
        }
    }
}