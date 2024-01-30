import Coordinate from "../theme/Coordinate";
import Node from "./Node";

export default class NodeManager {
    
    coordinate = new Coordinate();
    
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
                        this.coordinate.yPosit.nodeRouteOrigin,
                        this.coordinate.width.node,
                        this.coordinate.height.node + (node.pressTime * 40),
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
                return this.coordinate.xPosit.keyD;
            case 'f':
                return this.coordinate.xPosit.keyF;
            case 'j':
                return this.coordinate.xPosit.keyJ;
            case 'k':
                return this.coordinate.xPosit.keyK;
            default :
                return null;
        }
    }

    clearNodes(){
        
    }

    removeNode(node){
        const index = this.scene.nodes.indexOf(node);
        if (index !== -1) {
            this.scene.nodes.splice(index, 1);
            node.destroy();
        }
        node = null;
    }
}

