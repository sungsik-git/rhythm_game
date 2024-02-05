import Phaser from "phaser";

export default class Test extends Phaser.Scene{
    constructor(){
        super('test');
        this.isPause = false;
    }

    create(){
        this.star = this.add.text(this.game.config.width/2, 100, "*", '0xffffff');

        this.PuaseButton = this.add.text(600, 100, "PAUSE", '0xffffff').setInteractive();
        this.PuaseButton.on('pointerdown', () => {
            this.togglePause();
            console.log(this.isPause)
        });
    }

    update(){
        this.dropStar();
    }

    dropStar(){
        if(this.isPause){
            if(this.star.y < 650){
                this.star.y += 5;
            }
        }
    }

    togglePause(){
        if(this.isPause){
            this.isPause = false;
        }else{
            this.isPause = true;
        }
    }   
}