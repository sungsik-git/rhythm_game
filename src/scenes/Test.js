import Phaser from "phaser";
import Nodes from "./node/Nodes";
import Node from "./node/Node";

export default class Test extends Phaser.Scene {
    constructor() {
        super('test');
        this.keyS = null;
        this.keyD = null;
        this.keyF = null;
        this.keySpace = null;
        this.keyJ = null;
        this.keyK = null;
        this.keyL = null;
        this.nodes = null;
    }

    preload() {
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
        // Game UI scene load
        this.scene.launch('gameUI');
        
        // Nodes 인스턴스 생성
        this.nodes = new Nodes();
        
        // 노드 추가
        this.nodes.createNode(1000, 's', 0);
        this.nodes.createNode(2000, 'd', 0);
        this.nodes.createNode(3000, 'f', 0);
        this.nodes.createNode(4000, 'space', 0);
    }

    calcNodeX(key) {
        switch (key) {
            case 's':
                return 123;
            case 'd':
                return 234;
            case 'f':
                return 345;
            case 'space':
                return 456;
            default:
                console.log("default");
                return 0;
        }
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

        // 노드 출력
        this.nodes.forEach(node => {
            setTimeout(() => {
                this.add.rectangle(
                    this.calcNodeX(node.key),
                    0,
                    100,
                    20,
                    0x3366CC
                );
            }, node.startTime);
        });
    }
}
