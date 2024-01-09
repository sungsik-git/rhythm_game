import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    constructor(){
        super('game')
    }
    
    init(data){
        this.musicInfo = data.musicInfo;
    }

    preload(){

    }

    create(){
        this.add.text(100, 100 ,"Game1")
            .setFill('#3461eb')
        //Game UI scene load
        this.scene.launch('gameUI');
        //Home Button load
        this.scene.launch('homeButton');
        //
        this.scene.launch('gameInfoUI', { musicInfo: this.musicInfo });
    }

    update(){

    }
}
