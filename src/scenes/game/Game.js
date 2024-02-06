import Phaser from "phaser";
import NodeManager from "../node/NodeManager";
import Coordinate from "../theme/Coordinate";
import KeyboardEvent from "../input/KeyboardEvent";
import HomeButton from "../component/HomeButton";
import RestartButton from "../component/RestartButton";
import PauseButton from "../component/PauseButton";
import GameInfoUI from "../interface/GameInfoUI";

export default class Game extends Phaser.Scene {
    init(data) {
        this.musicInfo = data.musicInfo;
        this.currentIndex = data.currentIndex;
    }

    constructor() {
        super('game');
        this.speed = 5;
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
    }

    create() {
        //load the nodes
        let nodeFileKey = 'nodeFile';

        if (this.cache.text.has(nodeFileKey)) {
            this.nodeFile = this.cache.text.get(nodeFileKey);
            this.cache.text.remove(nodeFileKey);
        }

        this.nodeManager = new NodeManager(this, this.nodeFile);
        this.nodesClass = this.nodeManager.makeClassFromText();
        this.nodes = this.nodeManager.makeRectFromClass(this.nodesClass);

        // Play the background music (BGM)
        this.bgm = this.sound.add('bgm', { loop: false });
        if(!this.isPause){
            this.bgm.play();
        }else{
            this.bgm.pause();
        }

        // Load to button
        this.homeButton = new HomeButton(this, this.bgm, this.score);
        this.homeButton.loadHomeButton();
        this.restartButton = new RestartButton(this, this.bgm, this.nodes);
        this.restartButton.loadRestartButton();
       
        this.pauseButton = this.add.text( this.game.config.width - 180,50,'Pause','0xffffff')
        .setInteractive();

        this.pauseButton.on('pointerdown', () => {
            if(this.isPause) this.isPause = false;
            else this.isPause = true;
        });


        // load to keyboard event
        this.keyboardEvent = new KeyboardEvent(this);
        this.keyboardEvent.loadGameKey();
    
        // make to nodeRoute 
        this.routeOfKeyD = this.add.rectangle(
            this.coordinate.xPosit.keyD,
            this.coordinate.yPosit.nodeRouteOrigin,
            this.coordinate.width.node,
            this.coordinate.height.nodeRoute,
            this.coordinate.color.nodeRoute
        ).setOrigin(0);
        this.routeOfKeyF = this.add.rectangle(
            this.coordinate.xPosit.keyF,
            this.coordinate.yPosit.nodeRouteOrigin,
            this.coordinate.width.node,
            this.coordinate.height.nodeRoute,
            this.coordinate.color.nodeRoute
        ).setOrigin(0);
        this.routeOfKeyJ = this.add.rectangle(
            this.coordinate.xPosit.keyJ,
            this.coordinate.yPosit.nodeRouteOrigin,
            this.coordinate.width.node,
            this.coordinate.height.nodeRoute,
            this.coordinate.color.nodeRoute
        ).setOrigin(0);
        this.routeOfKeyK = this.add.rectangle(
            this.coordinate.xPosit.keyK,
            this.coordinate.yPosit.nodeRouteOrigin,
            this.coordinate.width.node,
            this.coordinate.height.nodeRoute,
            this.coordinate.color.nodeRoute
        ).setOrigin(0);

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
        this.scoreObject = this.add.text(100, 300, this.score, {fill: '#000000'})
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
