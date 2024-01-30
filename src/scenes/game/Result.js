import Phaser from "phaser";

export default class Result extends Phaser.Scene{

    constructor(){
        super('result');
        
    }

    create(){
        this.add.text(100,100,"result",{fill:'#ffffff'})
    }
}