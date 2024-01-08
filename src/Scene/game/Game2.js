import Phaser from "phaser";

export default class Game2 extends Phaser.Scene {
    constructor(){
        super('game2');
    }

    preload(){

    }

    create(){
        this.add.text(100, 100 ,"Game2")
            .setFill('#3461eb')
        //Game UI scene load
        this.scene.launch('gameUI');
        //Home Button load
        this.scene.launch('homeButton');
    }

    update(){

    }
}