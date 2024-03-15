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

        this.title = this.add.text(500, 600, this.musicInfo.title, {fill: '#fff'})

        // Load to button
        this.homeButton = this.add.text(this.game.config.width - 200,50,'Home!!',{ fill: '#ffffff' }).setInteractive();

        this.homeButton.on('pointerdown', () => {
            const gameScene = this.scene.get('game');
            gameScene.isPause= false;
            gameScene.nodeManager.updateIsPauseFalse();
            if(this.bgm){
                this.bgm.stop();
                this.bgm.destroy();

                if (gameScene.cache && gameScene.cache.audio) {
                    gameScene.cache.audio.remove('bgm');
                }
            }
            this.scene.stop('HomeModal');
            this.scene.start('main');
        });

        this.events.on('shutdown', () => {
            this.score = 0;
            this.combo = 0;
            this.judgementText = null;
        })

        window.onblur = () => {
            this.pauseTime = this.bgm.seek;
            this.scene.launch('FocusoutModal')
            this.scene.pause();
            this.bgm.pause()
        }

        window.onfocus = () => {
            this.scene.stop('FocusoutModal');
            this.bgm.play({ seek: this.pauseTime });
            this.scene.resume();
        }
    }

    update(){
        this.scoreObject.setText(this.score);
        this.comboObject.setText(this.combo);
        this.judgementTextObject.setText(this.judgementText);
    }

    resetGameState(){
        
    }

}