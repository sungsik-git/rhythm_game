import Node from "./Node";

export default class NodeManager {
    constructor(scene) {
        this.scene = scene;
    }

    makeClassFromText(nodeFile){
        const lines = nodeFile.split('\n');
        const classOfNodes = [];

        lines.forEach(line => {
            const [startTime, key, pressTime] = line.replace(/[{}]/g, '').split(',').map(item => item.trim());
            classOfNodes.push(new Node(parseInt(startTime), key, parseInt(pressTime)));
        });

        return classOfNodes;
    }

    makeRectFromClass(classOfNodes){
        const nodes = [];
        classOfNodes.forEach(node => {
            this.scene.time.addEvent({
                delay: node.startTime, 
                callback: () => {
                    var nodeRect = this.scene.add.rectangle(
                        this.xPositionToKey(node.key),
                        50,
                        100,
                        40 + (node.pressTime * 40),
                        0x00ffaa
                    )
                    nodeRect.setOrigin(0);
    
                    
                    nodeRect.setData('startTime', node.startTime);
                    nodeRect.setData('key', node.key);
    
                    nodes.push(nodeRect);
                },
                loop: false, 
                callbackScope: this 
            });
        });

        return nodes;
    }

    xPositionToKey(keyName) {
        switch (keyName) {
            case 'd':
                return 223;
            case 'f':
                return 334;
            case 'j':
                return 556;
            case 'k':
                return 667;
        }
    }

}

