import Phaser from "phaser";

export default class Game3 extends Phaser.Scene {
    constructor(){
        super('game3');
    }

    preload(){

    }

    create(){
        this.add.text(100, 100 ,"Game3")
            .setFill('#3461eb')
        //Game UI scene load
        this.scene.launch('gameUI');
        //Home Button load
        this.scene.launch('homeButton');
    }

    update(){

    }
}