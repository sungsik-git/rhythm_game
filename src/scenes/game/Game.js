import Phaser from "phaser";
import GameScore from "./GameScore";
import NodeManager from "../node/NodeManager";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
        this.gameScore = new GameScore(0);
        this.keyD = null;
        this.keyF = null;
        this.keyJ = null;
        this.keyK = null;
        this.speed = 5;
        this.nodes = [];
    }

    init(data) {
        this.musicInfo = data.musicInfo;
    }

    preload() {
        // Load the background music (BGM)
        this.load.audio('bgm', this.musicInfo.musicPath);
    
        // Load the node file
        this.load.text('nodeFile', this.musicInfo.nodeFilePath);
    
        // Listen for preload complete event
        this.load.once('complete', this.create, this);

        // Listen for when the audio is loaded
        this.load.on('complete', () => {
            // Create key properties
            this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
            this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
            this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        });
    }

    create() {
        // Play the background music (BGM)
        const bgm = this.sound.add('bgm', { loop: false });
        bgm.play();
        // Game UI scene load
        this.scene.launch('gameUI')
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
        const nodeFile = this.cache.text.get('nodeFile');
        const routeXPosition = this.registry.get('routeXPosition')
        const nodeManager = new NodeManager(nodeFile, routeXPosition);
        this.nodes = nodeManager.makeNodes(); 

        this.nodes.forEach(node => {
        // 각 노드를 setTimeout을 이용하여 지연 생성
        setTimeout(() => {
            const rect = this.add.rectangle(
                this.keyChangeX(node.key),
                0,
                100,
                40,
                0x000000
            );

            // 노드에 Tween을 설정
            this.tweens.add({
                targets: rect,
                y: 600, // 최종적으로 이동하고자 하는 y 좌표
                duration: 1000, // Tween에 걸리는 시간 (밀리초)
                ease: 'Linear', // 이징 함수 (선택적)
                onComplete: () => {
                    // Tween이 완료되면 호출되는 콜백
                    rect.destroy(); // Tween이 완료되면 객체 파괴
                }
            });
        }, node.startTime);
        });
    }
    
    keyChangeX(key) {
        switch (key) {
            case 's':
                return 123;
            case 'd':
                return 234;
            case 'f':
                return 345;
            case 'space':
                return 456;
            case 'j':
                return 567;
            case 'k':
                return 678;
            case 'l':
                return 789;
        }
    }

    update() {
        //node route property
        const nodeRoute = this.registry.get('nodeRoute');

        //Key Down
        if (this.keyD?.isDown) {
            nodeRoute.nodeRouteD.fillColor = 0xff0000;
        }
        if (this.keyF?.isDown) {
            nodeRoute.nodeRouteF.fillColor = 0xff0000;
        }
        if (this.keyJ?.isDown) {
            nodeRoute.nodeRouteJ.fillColor = 0xff0000;
        }
        if (this.keyK?.isDown) {
            nodeRoute.nodeRouteK.fillColor = 0xff0000;
        }

        //Key Up
        if (this.keyD?.isUp) {
            nodeRoute.nodeRouteD.fillColor = 0x8662f0;
        }
        if (this.keyF?.isUp) {
            nodeRoute.nodeRouteF.fillColor = 0x8662f0;
        }
        if (this.keyJ?.isUp) {
            nodeRoute.nodeRouteJ.fillColor = 0x8662f0;
        }
        if (this.keyK?.isUp) {
            nodeRoute.nodeRouteK.fillColor = 0x8662f0;
        } 
    }
}
