import Phaser from "phaser";
import HomeButton from "../component/HomeButton";
import ResultBGM from "../../asset/music/result.mp3";

export default class Result extends Phaser.Scene{
    init(data){
        this.musicInfo = data.musicInfo;
        this.score = data.score;
        this.combo = data.combo;
        this.judgementText = data.judgementText;
        this.bgm = null;
    }

    constructor(){
        super('result');
    }
    
    preload(){
        this.load.audio('resultBGM', ResultBGM);
    }

    create(){
        this.bgm = this.sound.add('resultBGM', {loop: true});
        this.bgm.play();


        this.scoreObject = this.add.text(100,100,this.score,{fill:'#ffffff'});
        this.comboObject = this.add.text(100,200,this.combo, '0xffffff');
        this.judgementTextObject = this.add.text(100,300,this.judgementText, '0xffffff');

        // Load to button
        this.homeButton = new HomeButton(this, this.bgm, this.score);
        this.homeButton.loadHomeButton();

        this.events.on('shutdown', () => {
            this.score = 0;
            this.combo = 0;
            this.judgementText = null;
        })
    }

    update(){
        this.scoreObject.setText(this.score);
        this.comboObject.setText(this.combo);
        this.judgementTextObject.setText(this.judgementText);
    }

    resetGameState(){
        
    }

}