import Phaser from "phaser";
import NodeManager from "./NodeManager";
import textNodeFile from "../../asset/textNode/SampleNode1.txt"

export default class Test extends Phaser.Scene {
    constructor() {
        super('test');
        this.nodes = [];
    }

    preload() {
        // Load the node file
        this.load.text('nodeFile', textNodeFile);
    }

    create() {
        const nodeFile = this.cache.text.get('nodeFile');
        const routeXPosition = this.registry.get('routeXPosition')
        const nodeManager = new NodeManager(nodeFile, routeXPosition);
        this.nodes = nodeManager.makeNodes(); // node 객체

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
                    duration: 5000, // Tween에 걸리는 시간 (밀리초)
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
        // update 함수에서 아무것도 처리하지 않아도 됨
    }
}
