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
        this.judgementText = null;
        this.yOfJudgementLine = 600; // revise 
        this.maxYNode = null;
        this.combo = 0;
        this.score = 0;
        //theme
        this.coordinate = new Coordinate();

        this.gameKeys = ['D', 'F', 'J', 'K'];
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

        //load the nodes
        const nodeFile = this.cache.text.get('nodeFile');
        const nodeManager = new NodeManager(this);
        this.nodesClass = nodeManager.makeClassFromText(nodeFile);
        this.nodes = nodeManager.makeRectFromClass(this.nodesClass);

        //load Keyboard event
        this.keyboardEvent.loadKeydownEvent();
        this.keyboardEvent.loadKeyUpEvent();

        
    }

    update() {
        //drop the nodes
        this.nodeSlider();
        
    }

    nodeSlider(){
        this.nodes.forEach(node => 
            setTimeout(() => {
                
                if(node.y < 600){
                    node.y += 5;
                }
                if(node.y === 600){
                    node.destroy();
                }
            }, node.getData('startTime'))
        );
    }



    judgementNode(key){
        const maxYNode = this.getMaxYNode();

        if(key === maxYNode.getData('key')){
            const dist = Math.abs(this.yOfJudgementLine - maxYNode.y)
            
            if (dist === 0) {
                console.log("Miss");
            } else if (dist <= 20) {
                console.log("Perfect");
            } else if (dist <= 40) {
                console.log("Great");
            } else if (dist <= 60) {
                console.log("Good");
            } else {
                console.log("Early");
            }
        
            maxYNode.destroy();
            this.nodes.splice(maxYNode.getData('index'),1)
            console.log(this.nodes.length)
        }
    }

    //Get max y-position node
    getMaxYNode() {
        var maxNode = null;
        for (let i = 0; i < this.nodes.length; i++) {
            if(!maxNode || maxNode.y < this.nodes[i].y){
                maxNode = this.nodes[i];
            }
        }
        return maxNode;
    }
}
