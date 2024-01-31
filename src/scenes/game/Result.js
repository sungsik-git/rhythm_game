import Phaser from "phaser";
import HomeButton from "../component/HomeButton";
import ResultBGM from "../../asset/music/result.mp3";

export default class Result extends Phaser.Scene{
    init(data){
        this.musicInfo = data.musicInfo;
        this.score = data.score;
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


        this.add.text(100,100,this.score,{fill:'#ffffff'});

        // Load to button
        this.homeButton = new HomeButton(this, this.bgm, this.score);
        this.homeButton.loadHomeButton();
    }

    update(){

    }


}