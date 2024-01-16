import Node from "./Node";

class NodeManager {
    constructor(scene, gameNodes) {
        this.scene = scene;
        this.gameNodes = gameNodes;
        this.nodes = [];
    }


    makeNodes() {
        const lines = this.gameNodes.split('\n');
        this.nodes = [];

        lines.forEach(line => {
            const [startTime, key, pressTime] = line.replace(/[{}]/g, '').split(',').map(item => item.trim());
            this.nodes.push(new Node(parseInt(startTime), key, parseInt(pressTime)));
        });

        return this.nodes;
    }

    clearNodes() {
        // 기존 노드들을 화면에서 제거
        this.nodes.forEach(node => {
            const rect = this.scene.children.getByName(node.key);
            if (rect) {
                rect.destroy();
            }
        });

        // 노드 배열 초기화
        this.nodes = [];
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
            default :
                console.log("not key..");
                break;
        }
    }

    nodeSlider() {
        this.nodes.forEach(node => {
            // 각 노드를 setTimeout을 이용하여 지연 생성
            setTimeout(() => {
                const rect = this.scene.add.rectangle(
                    this.keyChangeX(node.key),
                    0,
                    100,
                    40,
                    0x000000
                );

                // 노드에 Tween을 설정
                this.scene.tweens.add({
                    targets: rect,
                    y: 600,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () => {
                        rect.destroy();
                    }
                });
            }, node.startTime);
        });
    }
}

export default NodeManager;
