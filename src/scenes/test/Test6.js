import Phaser from "phaser";

export default class Test6 extends Phaser.Scene {
    constructor() {
        super('test5');
        this.ndoesClass = [];
        this.nodes = [];
        this.keyD = null;
        this.keyF = null;
        this.keyJ = null;
        this.keyK = null;
        this.routeOfKeyD = null;
        this.routeOfKeyF = null;
        this.routeOfKeyJ = null;
        this.routeOfKeyK = null;
        this.judgementLineY = 600;
        this.keyD_Xposi = 400;
        this.keyF_Xposi = 505;
        this.keyJ_Xposi = 610;
        this.keyK_Xposi = 715;
        this.maxYNode = null;
    }

    create() {
        this.routeOfKeyD = this.add.rectangle(this.keyD_Xposi, 100, 100, 600, 0xffffff).setOrigin(0);
        this.routeOfKeyF = this.add.rectangle(this.keyF_Xposi, 100, 100, 600, 0xffffff).setOrigin(0);
        this.routeOfKeyJ = this.add.rectangle(this.keyJ_Xposi, 100, 100, 600, 0xffffff).setOrigin(0);
        this.routeOfKeyK = this.add.rectangle(this.keyK_Xposi, 100, 100, 600, 0xffffff).setOrigin(0);

        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        this.keyD.on('down', () => this.handleKeyDown('d'));
        this.keyF.on('down', () => this.handleKeyDown('f'));
        this.keyJ.on('down', () => this.handleKeyDown('j'));
        this.keyK.on('down', () => this.handleKeyDown('k'));

        this.keyD.on('up', () => this.handleKeyUp('d'));
        this.keyF.on('up', () => this.handleKeyUp('f'));
        this.keyJ.on('up', () => this.handleKeyUp('j'));
        this.keyK.on('up', () => this.handleKeyUp('k'));

        this.judgementLine = this.add.rectangle(400,this.judgementLineY,415,5,0xFF0066).setOrigin(0);
        this.physics.add.existing(this.judgementLine);

        /* make node class, parameter is startTime, key, pressTime */
        this.makeNodeToClass(500,'d',0);
        this.makeNodeToClass(1000,'f',0)
        this.makeNodeToClass(1500,'j',0)
        this.makeNodeToClass(1500,'k',0)
        this.makeNodeToClass(2000,'d',0)
        this.makeNodeToClass(2500,'f',0)
        this.makeNodeToClass(3000,'j',0)
        this.makeNodeToClass(3500,'k',0)
        this.makeNodeToClass(3500,'d',0)

        /* change class to rectangle */
        this.makeNodeToRectangle();
    }

    update() {
        this.nodeSlider()
        this.maxYNode = this.getMaxY();
    }

    /* additional function */

    handleKeyDown(key) {
        this.effectOfKeyPress(key);

        const matchingNote = this.nodes.find(node => node.getData('key') === key);
        if (matchingNote) {
            this.judgement(matchingNote);
        }
    }

    handleKeyUp(key) {
        this.effectOfKeyRelease(key);
    }

    effectOfKeyPress(key) {
        const route = this.getRouteByKey(key);
        if (route) {
            route.setFillStyle(0x00ff00);
        }
    }

    effectOfKeyRelease(key) {
        const route = this.getRouteByKey(key);
        if (route) {
            route.setFillStyle(0xffffff); 
        }
    }

    getRouteByKey(key) {
        switch (key) {
            case 'd':
                return this.routeOfKeyD;
            case 'f':
                return this.routeOfKeyF;
            case 'j':
                return this.routeOfKeyJ;
            case 'k':
                return this.routeOfKeyK;
            default:
                return null;
        }
    }

    getXpositionByKey(key){
        switch(key){
            case 'd':
                return this.keyD_Xposi;
            case 'f':
                return this.keyF_Xposi;
            case 'j':
                return this.keyJ_Xposi;
            case 'k':
                return this.keyK_Xposi;
            default:
                return null;
        }
    }


    makeNodeToClass(startTime, key, pressTime){
        var nodeClass = new Node(startTime, key, pressTime);
        this.ndoesClass.push(nodeClass);
    }

    makeNodeToRectangle() {
        this.ndoesClass.forEach(node => {
            this.time.addEvent({
                delay: node.startTime, 
                callback: () => {
                    var nodeRect = this.add.rectangle(
                        this.getXpositionByKey(node.key),
                        50,
                        100,
                        40 + (node.pressTime * 40),
                        0x00ffaa
                    )
                    nodeRect.setOrigin(0);
    
                    
                    nodeRect.setData('startTime', node.startTime);
                    nodeRect.setData('key', node.key);
    
                    this.nodes.push(nodeRect);
                },
                loop: false, 
                callbackScope: this 
            });
        });
    }

    nodeSlider(){
        this.nodes.forEach(node => {
            setTimeout(() => {
                if(node.y < 600){
                    node.y += 5;
                }else{
                    this.removeNode(node)
                }
            }, node.getData('startTime'));    
        })
        
    }

    judgement(node) {
        const nodesAtMaxY = this.getNodesAtMaxY();

        if (nodesAtMaxY.length > 0) {
            console.log("Nodes at Max Y:", nodesAtMaxY);
    
            nodesAtMaxY.forEach(node => {
                this.judgeNode(node);
                this.removeNode(node);
            });
        } else {
            console.log("No nodes at Max Y");
        }
    }

    getNodesAtMaxY() {
        const maxY = this.getMaxY();
        return this.nodes.filter(node => node.y === maxY);
    }
    

    getMaxY(){
        return Math.max(...this.nodes.map(node => node.y));
    }

    removeNode(node){
        const index = this.nodes.indexOf(node);
        if (index !== -1) {
            this.nodes.splice(index, 1);
        }
        node.destroy();
    }
    
    judgeNode(node) {
        const distance = Math.abs(node.y + node.height / 2 - this.judgementLine.y);
    
        if (distance <= 10) {
            console.log("Perfect");

        } else if (distance <= 20) {
            console.log("Great");

        } else if (distance <= 30) {
            console.log("Good");

        } else if (distance <= 40) {
            console.log("Early");

        } else {
            console.log("Miss");

        }
    }
}

class Node {
    constructor(startTime, key, pressTime){
        this.startTime = startTime;
        this.key = key;
        this.pressTime = pressTime;
    }
}