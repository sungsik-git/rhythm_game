import Phaser from "phaser";
import GameScore from "../game/GameScore";

export default class Game extends Phaser.Scene {
    constructor(){
        super('game');
        this.gameScore = new GameScore(0);
    }
    
    init(data){
        this.musicInfo = data.musicInfo;
    }

    preload(){

    }

    create(){
        //Game UI scene load
        this.scene.launch('gameUI');
        //Home Button load
        this.scene.launch('homeButton');
        this.scene.launch('pauseButton');
        //game info -> title, artist
        this.scene.launch('gameInfoUI', { musicInfo: this.musicInfo });
        //game Score
        this.add.text(50, 50, this.gameScore.score,{ fill : '#000000'})
        .setFontSize(20);
    }

    update(){
        
    }
}
