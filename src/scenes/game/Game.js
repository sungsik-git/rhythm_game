import Phaser from "phaser";
import NodeManager from "../node/NodeManager";
import Coordinate from "../theme/Coordinate";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
        this.speed = 5;
        this.nodes = [];
        this.judgementText = null;
        this.combo = 0;
        this.yOfJudgementLine = 600; // revise 
        this.maxYNode = null;
    }

    init(data) {
        this.musicInfo = data.musicInfo;
    }

    preload() {
        // Load the background music (BGM)
        this.load.audio('bgm', this.musicInfo.musicPath);
    
        // Load the node file
        this.load.text('nodeFile', this.musicInfo.nodeFilePath);
    
        // Load keyboard
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);


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
        /* load theme */
        const coordinate = new Coordinate();

        /* make nodeRoute */
        this.routeOfKeyD = this.add.rectangle(
            coordinate.xPosit.keyD,
            coordinate.yPosit.nodeRouteOrigin,
            coordinate.width.node,
            coordinate.height.node,
            coordinate.color.nodeRoute
        ).setOrigin(0);
        this.routeOfKeyF = this.add.rectangle(
            coordinate.xPosit.keyF,
            coordinate.yPosit.nodeRouteOrigin,
            coordinate.width.node,
            coordinate.height.node,
            coordinate.color.nodeRoute
        ).setOrigin(0);
        this.routeOfKeyJ = this.add.rectangle(
            coordinate.xPosit.keyJ,
            coordinate.yPosit.nodeRouteOrigin,
            coordinate.width.node,
            coordinate.height.node,
            coordinate.color.nodeRoute
        ).setOrigin(0);
        this.routeOfKeyK = this.add.rectangle(
            coordinate.xPosit.keyK,
            coordinate.yPosit.nodeRouteOrigin,
            coordinate.width.node,
            coordinate.height.node,
            coordinate.color.nodeRoute
        ).setOrigin(0);


        const nodeFile = this.cache.text.get('nodeFile');
        const nodeManager = new NodeManager(this);
        const classOfNodes = nodeManager.makeClassFromText(nodeFile);
        this.nodes = nodeManager.makeRectFromClass(classOfNodes);

        this.keyD.on('down', () => this.handleKeyDown('d'));
        this.keyF.on('down', () => this.handleKeyDown('f'));
        this.keyJ.on('down', () => this.handleKeyDown('j'));
        this.keyK.on('down', () => this.handleKeyDown('k'));

        this.keyD.on('up', () => this.handleKeyUp('d'));
        this.keyF.on('up', () => this.handleKeyUp('f'));
        this.keyJ.on('up', () => this.handleKeyUp('j'));
        this.keyK.on('up', () => this.handleKeyUp('k'));
        
        this.add.rectangle(100,600,1200,5,0xffffff)
    }

    update() {
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

    handleKeyDown(key){
        this.judgementNode(key)
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
