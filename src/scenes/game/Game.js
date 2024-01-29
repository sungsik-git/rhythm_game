import Phaser from "phaser";
import NodeManager from "../node/NodeManager";
import Coordinate from "../theme/Coordinate";
import KeyboardEvent from "../input/KeyboardEvent";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
        this.speed = 5;
        this.nodesClass = [];
        this.nodes = [];
        this.yOfJudgementLine = 600; // revise 
        this.maxYNode = null;
        this.combo = 0;
        this.score = 0;
        this.judgementText = null;
        
        
        //theme
        this.coordinate = new Coordinate();
    }

    init(data) {
        this.musicInfo = data.musicInfo;
    }

    preload() {
        // Load the background music (BGM)
        this.load.audio('bgm', this.musicInfo.musicPath);
    
        // Load the node file
        this.load.text('nodeFile', this.musicInfo.nodeFilePath);
         
    }

    create() {
        /*
        // Play the background music (BGM)
        const bgm = this.sound.add('bgm', { loop: false });
        bgm.play();
        // Game UI scene load
        // this.scene.launch('gameUI')
        // Get nodes in node file
        const nodeFile = this.cache.text.get('nodeFile');
        const nodeManager = new NodeManager(this, nodeFile);
        this.nodes = nodeManager.makeNodes();
        nodeManager.nodeSlider();
        // load to Button 
        this.scene.launch('homeButton', { bgm: bgm });
        this.scene.launch('pauseButton', { bgm : bgm, nodeManager : nodeManager});
        this.scene.launch('restartButton', {bgm : bgm, nodeManager : nodeManager })
        // Game info -> title, artist
        this.scene.launch('gameInfoUI', { musicInfo: this.musicInfo });
        // Game Score
        this.add.text(50, 50, this.gameScore.score, { fill: '#000000' })
            .setFontSize(20);
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

        // load keyboard event
        this.keyboardEvent = new KeyboardEvent(this);
        this.keyboardEvent.loadGameKey();
        this.keyboardEvent.loadKeydownEvent();
        this.keyboardEvent.loadKeyUpEvent();
    
        // make nodeRoute 
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
        this.add.text(100,100,this.judgementText,{ fill: '#ffff' }).setOrigin(0.5);
    }

    update() {
        //drop the nodes
        this.nodeSlider();
    }

    nodeSlider() {
        this.nodes.forEach(node => {
            this.time.addEvent({
                delay: node.getData('startTime'),
                callback: () => {
                    if (node.y < 650) {
                        node.y += 5;
                    }
                    if (node.y === 650) {
                        this.keyboardEvent.missJudgement();
                        this.keyboardEvent.removeNode(node);
                    }
                },
                loop: false,
                callbackScope: this
            });
        });
    }
    
}
