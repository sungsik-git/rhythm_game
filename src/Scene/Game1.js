import Phaser from "phaser";

export default class Game1 extends Phaser.Scene {
    constructor(){
        super('game1')
    }

    preload(){

    }

    create(){
        this.add.text(100, 100 ," GSDFASGAWERF")
    }

    update(){

    }
}