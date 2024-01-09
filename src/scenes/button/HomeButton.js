import Phaser from "phaser";

export default class HomeButton extends Phaser.Scene {
    constructor(){
        super('homeButton');
    }

    preload(){

    }

    create(){
        //home 이동 버튼
        const homeButton = this.add.text(
            this.game.config.width - 100,
            50,
            'Home!!',
            { fill:'#000000'});
        
        homeButton.setInteractive().on('pointerdown', ()=>{
            //실행되고 있는 scene이 모두 종료되어야함
            this.scene.stop('game')
            this.scene.stop('gameUI');
            this.scene.stop('gameInfoUI');
            this.scene.stop('pauseButton')
            this.scene.start('main');
        });
    }

    update(){

    }
}
