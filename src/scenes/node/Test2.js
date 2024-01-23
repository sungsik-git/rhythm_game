/*
- [ ]  노드 생성
- [ ]  노드 움직임
- [ ]  판정선
- [ ]  노드 판정
    - [ ]  노드 소멸
    - [ ]  점수 반영
    - [ ]  콤보 적용
 */

import Phaser from "phaser";
import NodeFile from "../..//asset/textNode/SampleNode1.txt"


export default class Test2 extends Phaser.Scene {
    constructor() {
        super('test2');
        this.nodes = [];        //Array of node graphic
        this.maxYNode = null;   //Target of judgement
        this.keyD = null;
        this.keyF = null;
        this.keyJ = null;
        this.keyK = null;
        this.yOfJudgementLine = 600;
    }

    preload() {
        this.load.text('nodeFile', NodeFile);
    }

    create() {
        const nodeFile = this.cache.text.get('nodeFile');
        const nodeManager = new NodeManager(this);

        //Classify node file 
        const classOfNodes = nodeManager.makeClassFromText(nodeFile);

        //Graphicize a class
        this.nodes = nodeManager.makeRectFromClass(classOfNodes);

        //max node
        this.maxYNode = this.getMaxYNode();

        //Connect event keypress
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        this.keyD.on('down', this.handleKeyDown);
        this.keyF.on('down', this.handleKeyDown);
        this.keyJ.on('down', this.handleKeyDown);
        this.keyK.on('down', this.handleKeyDown);

    }

    update() {
        this.nodeSlider(); 
    }


    //Drop node
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

    //Get max y-position node
    getMaxYNode(){
        let maxNode = null;
        for(let i=0; i<this.nodes.length; i++){
            if(this.nodes[i].y !== 600){
                const currentRect = this.nodes[i];
                if(!maxNode || currentRect.y > maxNode.y){
                    maxNode = currentRect;
                }
            }
        }
        return maxNode;
    }
    
    //Once key down event
    handleKeyDown = () => {
        this.judgementNode()
        console.log(this.maxYNode.y)
    }

    //judgement Node to Line
    judgementNode() {
        let maxYNode = this.getMaxYNode();
    
        if (!maxYNode) {
            console.log("Miss");
            return;
        }
    
        const dist = Math.abs(this.yOfJudgementLine - this.maxYNode.y)
        
        if (dist === 0) {
            console.log("Miss");
        } else if (dist <= 20) {
            console.log("Perfect");
        } else if (dist <= 40) {
            console.log("Great");
        } else if (dist <= 60) {
            console.log("Good");
        } else if (dist <= 80) {
            console.log("Early");
        }
    
        maxYNode.destroy();
        this.rects.splice(i, 1)
        this.nodes = this.nodes.filter(node => node !== maxYNode);
    }
    
}

class Node {
    static index = 0;
    constructor(startTime, key, pressTime) {
        this.index = Node.index++;
        this.startTime = startTime;
        this.key = key;
        this.pressTime = pressTime;
    }
}

class NodeManager{
    constructor(scene){
        this.scene = scene
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

