import Coordinate from "../theme/Coordinate";
import TestNode from "./TestNode";

export default class TestNodeManager {
    
    coordinate = new Coordinate();

    constructor(scene, nodeFile, isPause) {
        this.scene = scene;
        this.nodeFile = nodeFile;
        this.isPause = isPause;

        this.classOfNodes = [];
        this.nodes = [];
    }

    makeClassFromText(){
        let lines = this.nodeFile.split('\n');
        lines.forEach(line => {
            const [key, startTime, endTime] = line.replace(/[{}]/g, '').split(',').map(item => item.trim());
            this.classOfNodes.push(new Node(key, parseInt(startTime), parseInt(endTime)));
        });
    
        return this.classOfNodes;
    }
    

    makeRectFromClass(){
        this.classOfNodes.forEach(node => {
            this.scene.time.addEvent({
                delay: node.startTime, 
                callback: () => {
                    if (!this.isPause) {
                        var nodeRect = this.scene.add.rectangle(
                            this.xPositionToKey(node.key),
                            this.coordinate.yPosit.nodeRouteOrigin,
                            this.coordinate.width.node,
                            this.coordinate.height.node + (node.pressTime/1000 * 40),
                            0x00ffaa
                        );
                        nodeRect.setOrigin(0);
                        nodeRect.setData('startTime', node.startTime);
                        nodeRect.setData('key', node.key);
    
                        this.nodes.push(nodeRect);
                    }
                },
                loop: false, 
                callbackScope: this 
            });
        });
        
        return this.nodes;
    }
    
    

    nodeSlider() {
        this.scene.nodes.forEach(node => {
            if (node.y < 650) {
                node.y += this.scene.speed;
            }

            if (node.y === 650){
                this.scene.keyboardEvent.missJudgement();
                this.removeNode(node);
            }
        });
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
        if(this.scene.nodes){
            this.scene.nodes.forEach(node => {
                this.removeNode(node)
            });
            this.scene.nodes = [];
        }
    }

    removeNode(node){
        const index = this.scene.nodes.indexOf(node);
        if (index !== -1) {
            this.scene.nodes.splice(index, 1);
            node.destroy();
        }
        node = null;
    }

    updateIsPauseTrue(){
        this.isPause = true;
    }

    updateIsPauseFalse(){
        this.isPause = false;
    }
}

