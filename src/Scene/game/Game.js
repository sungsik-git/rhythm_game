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
        const ratioWidth = this.game.config.width;
        const ratioHeight = this.game.config.height;

        this.add.text(100, 100 ,"Game1")
            .setFill('#3461eb')
        //Game UI scene load
        this.scene.launch('gameUI');
        //Home Button load
        this.scene.launch('homeButton');

        this.add.text(100, ratioHeight * 12 / 13, this.musicInfo.title, { fill: '#000000' })
            .setOrigin(0)
            .setFontSize(32);
        this.add.text(100,0, this.musicInfo.artist, { fill: '#000000'})
            .setOrigin(0)
            .setFontSize(32);
    }

    update(){

    }
}
