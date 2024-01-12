import Phaser from "phaser";
import GameScore from "./GameScore";
import NodeManager from "../node/NodeManager";
import Game1_node from "../../asset/textNode/SampleNode1.txt";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
        this.gameScore = new GameScore(0);
        this.keyS = null;
        this.keyD = null;
        this.keyF = null;
        this.keySpace = null;
        this.keyJ = null;
        this.keyK = null;
        this.keyL = null;
    }

    init(data) {
        this.musicInfo = data.musicInfo;
    }

    preload() {
        // Load the background music (BGM)
        this.load.audio('bgm', this.musicInfo.musicPath);

        // Load the node file
        this.load.text('nodeFile', this.musicInfo.nodeFilePath);

        // Listen for when the audio is loaded
        this.load.on('complete', () => {
            // Create key properties
            this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
            this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
            this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
            this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        });
    }

    create() {
        // Play the background music (BGM)
        const bgm = this.sound.add('bgm', { loop: false });
        bgm.play();
        // Game UI scene load
        this.scene.launch('gameUI');
        // load to Button 
        this.scene.launch('homeButton', { bgm: bgm });
        this.scene.launch('pauseButton');
        this.scene.launch('restartButton', {bgm : bgm})
        // Game info -> title, artist
        this.scene.launch('gameInfoUI', { musicInfo: this.musicInfo });
        // Game Score
        this.add.text(50, 50, this.gameScore.score, { fill: '#000000' })
            .setFontSize(20);
        // add sound bar
        this.scene.launch('soundBar', { bgm: bgm });

        // Get nodes in node file
        const gameNodes = this.cache.text.get('nodeFile');
        
        const nodeManager = new NodeManager(gameNodes);
        nodeManager.makeNodes();

    }
    

    update() {
        //node route property
        const nodeRoute = this.registry.get('nodeRoute');


        //Key Down
        if (this.keyS?.isDown) {
            nodeRoute.nodeRouteS.fillColor = 0xff0000;
        }
        if (this.keyD?.isDown) {
            nodeRoute.nodeRouteD.fillColor = 0xff0000;
        }
        if (this.keyF?.isDown) {
            nodeRoute.nodeRouteF.fillColor = 0xff0000;
        }
        if (this.keySpace?.isDown) {
            nodeRoute.nodeRouteSpace.fillColor = 0xff0000;
        }
        if (this.keyJ?.isDown) {
            nodeRoute.nodeRouteJ.fillColor = 0xff0000;
        }
        if (this.keyK?.isDown) {
            nodeRoute.nodeRouteK.fillColor = 0xff0000;
        }
        if (this.keyL?.isDown) {
            nodeRoute.nodeRouteL.fillColor = 0xff0000;
        }

        //Key Up
        if (this.keyS?.isUp) {
            nodeRoute.nodeRouteS.fillColor = 0x8662f0;
        }
        if (this.keyD?.isUp) {
            nodeRoute.nodeRouteD.fillColor = 0x8662f0;
        }
        if (this.keyF?.isUp) {
            nodeRoute.nodeRouteF.fillColor = 0x8662f0;
        }
        if (this.keySpace?.isUp) {
            nodeRoute.nodeRouteSpace.fillColor = 0x8662f0;
        }
        if (this.keyJ?.isUp) {
            nodeRoute.nodeRouteJ.fillColor = 0x8662f0;
        }
        if (this.keyK?.isUp) {
            nodeRoute.nodeRouteK.fillColor = 0x8662f0;
        }
        if (this.keyL?.isUp) {
            nodeRoute.nodeRouteL.fillColor = 0x8662f0;
        }
    }
}
