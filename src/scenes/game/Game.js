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
        this.nodes = this.nodeManager.makeRectFromClass(this.nodesClass);

        this.bgm = this.sound.add('bgm', { loop: false });
        this.bgm.play();
        this.pauseTime = 0;

        this.pauseButton = this.add.text( this.game.config.width - 180,50,'Pause','0xffffff')
        .setInteractive();

        this.pauseButton.on('pointerdown', () => {
            this.bgm.pause();
            this.pauseTime = this.bgm.seek;
            this.pauseButton.setVisible(false);
            this.playButton.setVisible(true);
        });

        this.playButton = this.add.text( this.game.config.width - 180,50,'Play','0xffffff')
        .setInteractive()
        .setVisible(false);

        this.playButton.on('pointerdown', () => {
            this.bgm.play({ seek: this.pauseTime });
            this.pauseTime = this.bgm.seek;
            this.playButton.setVisible(false);
            this.pauseButton.setVisible(true);
        });
        
        // Load to button
        this.homeButton = new HomeButton(this, this.bgm, this.score);
        this.homeButton.loadHomeButton();
        this.restartButton = new RestartButton(this, this.bgm, this.nodes);
        this.restartButton.loadRestartButton();
       
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
                    this.scene.start('result', { score: this.score, musicInfo: this.musicInfo, combo: this.combo, judgementText: this.judgementText });
                },
                callbackScope: this
            });
        });


    }

    update() {
        //drop the nodes

        if(!this.isPause){
            this.nodeSlider();
        
            this.updateJudgementText();
            this.updateCombo();
            this.updateScore();
        }   
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

    nodeSlider() {
        this.nodes.forEach(node => {
            if (node.y < 650) {
                node.y += this.speed;
            }

            if (node.y === 650){
                this.keyboardEvent.missJudgement();
                this.nodeManager.removeNode(node);
            }
        });
    }

    resetGameState() {
        this.score = 0;
        this.combo = 0;
        this.judgementText = null;
        this.nodesClass = null;
        this.nodes = null;
        

    }
}
