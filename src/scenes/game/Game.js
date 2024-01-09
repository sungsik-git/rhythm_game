import Phaser from "phaser";
import GameScore from "./GameScore";

export default class Game extends Phaser.Scene {
    constructor(){
        super('game');
        this.gameScore = new GameScore(0);
        this.keyS = null;
        this.keyD = null;
        this.keyF = null;
        this.keySpace = null;
        this.keyJ = null;
        this.keyK = null;
        this.keyL = null;
        
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

        //create key property
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    }

    update(){
        if(this.keyS.isDown){
            console.log('SSS!!')
        }
        if(this.keyD.isDown){
            console.log('DDD!!')
        }
        if(this.keyF.isDown){
            console.log('FFF!!')
        }
        if(this.keySpace.isDown){
            console.log('space!!')
        }
        if(this.keyJ.isDown){
            console.log('JJJ!!')
        }
        if(this.keyK.isDown){
            console.log('KKK!!')
        }
        if(this.keyL.isDown){
            console.log('LLL!!')
        }
    }
}
