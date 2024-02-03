import Phaser from "phaser";

export default class Test extends Phaser.Scene{
    constructor(){
        super('test');        
        this.startReachedTop = false;
    }

    create(){
        this.star = this.add.text(this.game.config.width/2,100,'*');

        this.pauseButton = this.add.rectangle(
            this.game.config.width - 100,
            100,
            50,
            30,
            0xffffff
        ).setInteractive();

        this.pauseButton.on('pointerdown', () => {
            this.scene.enabled = false;
        });
    }

    update() {
        if (this.star.y < 650 && !this.starReachedTop) {
            this.star.y += 10;
        }

        if (this.star.y === 650 && !this.starReachedTop) {
            // let print = () => {
            //     console.log("!");
            //     this.starReachedTop = true;
            // }
            // print();
            console.log("!")
        }
    }


}