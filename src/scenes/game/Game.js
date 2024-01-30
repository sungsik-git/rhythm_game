import Phaser from "phaser";
import NodeManager from "../node/NodeManager";
import Coordinate from "../theme/Coordinate";
import KeyboardEvent from "../input/KeyboardEvent";
import HomeButton from "../component/HomeButton";
import RestartButton from "../component/RestartButton";

export default class Game extends Phaser.Scene {
    init(data) {
        this.musicInfo = data.musicInfo;
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
    }

    preload() {
        // Load the background music (BGM)
        this.load.audio('bgm', this.musicInfo.musicPath);
    
        // Load the node file
        this.load.text('nodeFile', this.musicInfo.nodeFilePath);
    }

    create() {
        /*   
        this.scene.launch('pauseButton', { bgm : bgm, nodeManager : nodeManager});
        this.scene.launch('restartButton', {bgm : bgm, nodeManager : nodeManager })
        // Game info -> title, artist
        this.scene.launch('gameInfoUI', { musicInfo: this.musicInfo });
        
        // add sound bar
        // this.scene.launch('soundBar', { bgm: bgm });

        // bgm.on('complete', () => {
        //     this.scene.stop('resultButton');
        //     this.scene.stop('pauseButton');
        //     this.scene.stop('gameInfoUI');
        //     this.scene.stop('soundBar');
        //     this.scene.stop('gameUI');
        
        //     // Transition to the result scene
        //     this.scene.start('result');
        // });
        */

        // Play the background music (BGM)
        this.bgm = this.sound.add('bgm', { loop: false });
        this.bgm.play();

        // Load to button
        this.homeButton = new HomeButton(this, this.bgm);
        this.homeButton.loadHomeButton();
        this.restartButton = new RestartButton(this, this.bgm);
        this.restartButton.loadRestartButton();

        // load to keyboard event
        this.keyboardEvent = new KeyboardEvent(this);
        this.keyboardEvent.loadGameKey();
        this.keyboardEvent.loadKeydownEvent();
        this.keyboardEvent.loadKeyUpEvent();
    
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
        this.add.rectangle(
            this.coordinate.xPosit.keyD,
            this.coordinate.yPosit.judgementLine,
            this.coordinate.width.judgementLine,
            this.coordinate.height.judgementLine,
            this.coordinate.color.judgementLine
        ).setOrigin(0);

        //load the nodes
        const nodeFile = this.cache.text.get('nodeFile');
        const nodeManager = new NodeManager(this);
        this.nodesClass = nodeManager.makeClassFromText(nodeFile);
        this.nodes = nodeManager.makeRectFromClass(this.nodesClass);

        //load Keyboard event
        this.keyboardEvent.loadKeydownEvent();
        this.keyboardEvent.loadKeyUpEvent();

        // show judgement text
        this.judgementTextObject = this.add.text(100,100,this.judgementText,{ fill: '#ffffaa' }).setOrigin(0.5);
        this.comboObject = this.add.text(100, 200, this.combo, {fill: '#ffffaa'}).setOrigin(0.5);
        this.scoreObject = this.add.text(100, 300, this.score, {fill: '#ffffaa'}).setOrigin(0.5);
    }

    update() {
        //drop the nodes
        this.nodeSlider();

        this.updateJudgementText();
        this.updateCombo();
        this.updateScore();

        if(this.nodes.length === 0){

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


            this.time.addEvent({
                delay: node.getData('startTime'),
                callback: () => {
                    if (node.y < 650) {
                        node.y += 5;
                    } 
                },
                loop: false,
                callbackScope: node
            });
        });
    }   


    
}
