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
            100,
            'Home!!',
            { fill:'#000000'});
        
        homeButton.setInteractive().on('pointerdown', ()=>{
            //실행되고 있는 scene이 모두 종료되어야함
            this.scene.stop('game1')
            this.scene.stop('game2')
            this.scene.stop('game3')
            this.scene.stop('game4')
            this.scene.stop('game5')
            this.scene.stop('gameUI');
            this.scene.start('main');
        });
    }

    update(){

    }
}
