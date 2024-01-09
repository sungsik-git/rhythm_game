import Phaser from "phaser";

export default class PauseButton extends Phaser.Scene {
    constructor(){
        super('pauseButton');
        this.isPaused = false;
    }

    preload(){

    }

    create(){
        const pauseButton = this.add.text(
            this.game.config.width - 200,
            50,
            'Pause!!',
            { fill:'#000000'}
        ).setInteractive();
        

        //게임 구현 후 작동여부 확인 필요
        pauseButton.on('pointerdown', () => {
            this.togglePause();
        });
    }

    togglePause(){
        if(this.isPaused){
            this.scene.resume();
            this.isPaused = false;
            console.log("restart");
        }else{
            this.scene.pause();
            this.isPaused = true;
        }
    }

    update(){

    }
}