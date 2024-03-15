import Phaser from "phaser";
import NodeManager from "../node/NodeManager";
import Coordinate from "../theme/Coordinate";
import KeyboardEvent from "../input/KeyboardEvent";
import HomeButton from "../component/HomeButton";
import RestartButton from "../component/RestartButton";
import PauseButton from "../component/PauseButton";
import GameInfoUI from "../interface/GameInfoUI";
import RouteOfKey from "../interface/RouteOfKey";

import BlueFlare from "../../asset/img/blueFlare.jpeg";

export default class Game extends Phaser.Scene {
    init(data) {
        this.musicInfo = data.musicInfo;
        this.currentIndex = data.currentIndex;
    }

    constructor() {
        super('game');
        this.speed = 5;
        this.nodeDelay = 500;

        this.nodesClass = [];
        this.nodes = [];
        this.yOfJudgementLine = 600;
        this.maxYNode = null;
        this.combo = 0;
        this.score = 0;
        this.judgementText = null;
        this.bgm = null;


        //theme
        this.coordinate = new Coordinate();        

        this.isPause = false;
    }

    preload() {
        // Game Score, Combo, Judgement Reset
        this.resetGameState();
        
        // Load the background music (BGM)
        this.load.audio('bgm', this.musicInfo.musicPath);
    
        // Load the node file
        this.load.text('nodeFile', this.musicInfo.nodeFilePath);

        // Load the Flare img
        // this.load.image('blueFlare', BlueFlare);
    }

    create() {
        // Load the nodes
        let nodeFileKey = 'nodeFile';
        if (this.cache.text.has(nodeFileKey)) {
            this.nodeFile = this.cache.text.get(nodeFileKey);
            this.cache.text.remove(nodeFileKey);
        }
        this.nodeManager = new NodeManager(this, this.nodeFile, this.isPause);
        this.nodesClass = this.nodeManager.makeClassFromText();
        this.nodes = this.nodeManager.makeRectFromClass();

        this.bgm = this.sound.add('bgm', { loop: false });
        this.bgm.play();
        this.pauseTime = 0;

        this.pauseButton = this.add.text( this.game.config.width - 280,50,'Pause','0xffffff')
        .setInteractive();

        this.pauseButton.on('pointerdown', () => {
            this.bgm.pause();
            this.pauseTime = this.bgm.seek;
            this.isPause = true;
            this.nodeManager.updateIsPauseTrue();
            this.scene.launch('PauseModal', {scene : this.scene, bgm : this.bgm, nodeManager : this.nodeManager, pauseTime : this.bgm.seek });
        });

        
        // Load to button

        this.homeButton = this.add.text(this.game.config.width - 200,50,'Home!!',{ fill: '#ffffff' }).setInteractive()

        this.homeButton.on('pointerdown', () => {
            this.bgm.pause();
            this.pauseTime = this.bgm.seek;
            this.isPause = true;
            this.nodeManager.updateIsPauseTrue();
            this.scene.launch('HomeModal', {scene : this.scene, bgm : this.bgm, nodeManager : this.nodeManager});
        })

        this.restartButton = this.add.text(this.game.config.width - 400,50,'Restart!!',{ fill: '#ffffff' }).setInteractive()

        this.restartButton.on('pointerdown', () => {
            this.bgm.pause();
            this.pauseTime = this.bgm.seek;
            this.isPause = true;
            this.nodeManager.updateIsPauseTrue();
            this.scene.launch('RestartModal', {scene : this.scene, bgm : this.bgm, nodeManager : this.nodeManager, pauseTime : this.bgm.seek});
        })
       
        // Menu Button
        this.buttonsVisible = false; 

        this.pauseButton.setVisible(this.buttonsVisible);
        this.homeButton.setVisible(this.buttonsVisible);
        this.restartButton.setVisible(this.buttonsVisible);

        this.menuButton = this.add.text(this.game.config.width - 100, 50, 'menu!', { fill: '#ffffff' }).setInteractive();
        this.menuButton.on('pointerdown', () => {
            this.buttonsVisible = !this.buttonsVisible;
            
            this.pauseButton.setVisible(this.buttonsVisible);
            this.homeButton.setVisible(this.buttonsVisible);
            this.restartButton.setVisible(this.buttonsVisible);
        });
            


        // load to keyboard event
        this.keyboardEvent = new KeyboardEvent(this);
        this.keyboardEvent.loadGameKey();
    
        // make to nodeRoute 
        ['D', 'F', 'J', 'K'].forEach(key => {
            const route = new RouteOfKey(this, 'key' + key);
            this['routeOfKey' + key] = route.createRoute();
            route.createKeyInfo();
        });
        

        // make judgement line
        this.judgementLine = this.add.rectangle(
            this.coordinate.xPosit.keyD,
            this.coordinate.yPosit.judgementLine,
            this.coordinate.width.judgementLine,
            this.coordinate.height.judgementLine,
            this.coordinate.color.judgementLine
        ).setOrigin(0);

        // Load game info
        const gameInfoUI = new GameInfoUI(this, this.musicInfo);
        gameInfoUI.loadGameInfoBar();
        gameInfoUI.loadGameInfo();


        // show judgement text
        this.judgementTextObject = this.add.text(100,100,this.judgementText,{ fill: '#000000' }).setOrigin(0.5);
        this.comboObject = this.add.text(100, 200, this.combo, {fill: '#000000'}).setOrigin(0.5);
        this.scoreObject = this.add.text(100, 730, this.score, {fill: '#000000'})
        .setOrigin(0.5)
        .setFontSize(40);

        this.bgm.on('complete', () => {
            this.time.addEvent({
                delay: 3000,
                callback: () => {
                    this.scene.stop();
                    this.scene.start('result', { score: this.score, musicInfo: this.musicInfo, combo: this.combo, judgementText: this.judgementText });
                },
                callbackScope: this
            });
        });

        this.game.events.on('blur', this.onBlur, this);
        this.game.events.on('focus', this.onFocus, this);


    }

    update() {
        //drop the nodes
        if(!this.isPause){
            this.nodeManager.nodeSlider();
        
            this.updateJudgementText();
            this.updateCombo();
            this.updateScore();
        }   
    }

    shutdown() {
        this.game.events.off('blur', this.onBlur, this);
        this.game.events.off('focus', this.onFocus, this);
    }
    

    updateJudgementText(){
        this.judgementTextObject.setText(this.judgementText);
    }

    updateCombo(){
        this.comboObject.setText(this.combo);
    }

    updateScore(){
        this.scoreObject.setText(this.score);
    }

    resetGameState() {
        this.score = 0;
        this.combo = 0;
        this.judgementText = null;
        this.nodesClass = null;
        this.nodes = null;
        this.isPause = false;   
    }

    onBlur(){
        window.onblur = () => {
            this.pauseTime = this.bgm.seek;
            this.scene.launch('FocusoutModal')
            this.scene.pause();
            this.bgm.pause()
        }
    }

    onFocus(){
        window.onfocus = () => {
            this.scene.stop('FocusoutModal');
            this.bgm.play({ seek: this.pauseTime });
            this.scene.resume();
        }
    }
}
