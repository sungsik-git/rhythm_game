import Phaser from "phaser";
import GameScore from "./GameScore";
import NodeManager from "../node/NodeManager";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
        this.gameScore = new GameScore(0);
        this.speed = 5;
        this.nodes = [];
        this.judgementText = null;
        this.combo = 0;
        this.yOfJudgementLine = 600; // revise 
        this.maxYNode = null;

        // Load keyboard
        this.keyD = null;
        this.keyF = null;
        this.keyJ = null;
        this.keyK = null;
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

        const nodeFile = this.cache.text.get('nodeFile');
        const nodeManager = new NodeManager(this);
        const classOfNodes = nodeManager.makeClassFromText(nodeFile);
        this.nodes = nodeManager.makeRectFromClass(classOfNodes);

        // D 키에 대한 이벤트
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyD.on('down', () => {
            // D 키를 눌렀을 때 실행되는 코드
            this.handleKeyDown('d');
        });

        // F 키에 대한 이벤트
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyF.on('down', () => {
            // F 키를 눌렀을 때 실행되는 코드
            this.handleKeyDown('f');
        });

        // J 키에 대한 이벤트
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyJ.on('down', () => {
            // J 키를 눌렀을 때 실행되는 코드
            this.handleKeyDown('j');
        });

        // K 키에 대한 이벤트
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.keyK.on('down', () => {
            // K 키를 눌렀을 때 실행되는 코드
            this.handleKeyDown('k');
        });
        
        this.add.rectangle(100,600,1200,5,0xffffff)
        this.add.text(500,600,this.judgementText,{color:'0xffffff'})
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

        }else{
            this.judgementText = "Miss"
            this.combo = 0;
        }
    }

    //Get max y-position node
    getMaxYNode() {
        let maxNode = null;
        for (let i = 0; i < this.nodes.length; i++) {
            const currentRect = this.nodes[i];
            if (currentRect.y !== 600) {
                if (!maxNode || currentRect.y > maxNode.y) {
                    maxNode = currentRect;
                }
            }
        }
        return maxNode;
    }
}
