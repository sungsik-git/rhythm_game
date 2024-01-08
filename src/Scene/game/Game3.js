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
    
    }

    update(){

    }
}