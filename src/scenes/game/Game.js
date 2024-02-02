import Phaser from "phaser";
import NodeManager from "../node/NodeManager";
import Coordinate from "../theme/Coordinate";
import KeyboardEvent from "../input/KeyboardEvent";
import HomeButton from "../component/HomeButton";
import RestartButton from "../component/RestartButton";
import PauseButton from "../component/PauseButton";

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
        // Play the background music (BGM)
        this.bgm = this.sound.add('bgm', { loop: false });
        this.bgm.play();

        // Load to button
        this.homeButton = new HomeButton(this, this.bgm, this.score);
        this.homeButton.loadHomeButton();
        this.restartButton = new RestartButton(this, this.bgm,);
        this.restartButton.loadRestartButton();
        this.pauseButton = new PauseButton(this, this.bgm, this.isPause);
        this.pauseButton.loadPauseButton();
        this.pauseButton.loadResumeButton();

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

        this.gameInfoBar = this.add.rectangle(
            0,
            this.game.config.height - 100,
            this.game.config.width,
            100,
            0xff00aa
        ).setOrigin(0);

        //load the nodes
        const nodeFile = this.cache.text.get('nodeFile');
        const nodeManager = new NodeManager(this, this.nodes);
        this.nodesClass = nodeManager.makeClassFromText(nodeFile);
        this.nodes = nodeManager.makeRectFromClass(this.nodesClass);

        // show judgement text
        this.judgementTextObject = this.add.text(100,100,this.judgementText,{ fill: '#ffffaa' }).setOrigin(0.5);
        this.comboObject = this.add.text(100, 200, this.combo, {fill: '#ffffaa'}).setOrigin(0.5);
        this.scoreObject = this.add.text(100, 300, this.score, {fill: '#ffffaa'})
        .setOrigin(0.5)
        .setFontSize(40);

        this.bgm.on('complete', () => {
            this.time.addEvent({
                delay: 3000,
                callback: () => {
                    this.scene.start('result', { score: this.score, musicInfo: this.musicInfo })
                },
                callbackScope: this
            });
        });
    }

    update() {
        //drop the nodes
        this.nodeSlider();

        this.updateJudgementText();
        this.updateCombo();
        this.updateScore();
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

    resetGameState() {
        this.score = 0;
        this.combo = 0;
        this.judgementText = null;
    }
}
