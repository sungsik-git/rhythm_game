import Node from "./Node";

class NodeManager {
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
        classOfNodes.forEach(classOfNode => {
            const node = this.scene.add.rectangle(
                this.xPositionToKey(classOfNode.key),
                0,
                100,
                40,
                0x00ff00
            )
            node.setData('startTime', classOfNode.startTime);
            node.setData('pressTime', classOfNode.pressTime);
            node.setData('key', classOfNode.key);
            node.setData('index', classOfNode.index);

            nodes.push(node);
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

export default NodeManager;
