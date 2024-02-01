import Phaser from "phaser";

export default class GameInfoUI extends Phaser.Scene {
    constructor(){
        super('gameInfoUI')
    }

    init(data){
        this.musicInfo = data.musicInfo;
    };

    preload(){

    }

    create(){
        
    }

    update(){

    }
}