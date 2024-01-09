import Phaser from "phaser";

export default class GameInfoUI extends Phaser.Scene {
    constructor(){
        super('gameInfoUI')
    }

    init(data){
        this.musicInfo = data.musicInfo;
    }1

    preload(){

    }

    create(){
        const ratioWidth = this.game.config.width;
        const ratioHeight = this.game.config.height;

        this.add.text(ratioWidth / 9, ratioHeight * 12 / 13, this.musicInfo.title, { fill: '#000000' })
            .setOrigin(0)
            .setFontSize(32);
        this.add.text(ratioWidth / 9  + 400, ratioHeight * 12 / 13, this.musicInfo.artist, { fill: '#000000'})
            .setOrigin(0)
            .setFontSize(32);
    }

    update(){

    }
}