import Phaser from "phaser";

export default class Test5 extends Phaser.Scene{
    constructor(){
        super('test5');
        this.nodes = [];

    }

    create(){
        this.pushNode([
            this.createNode(100,'d'),
            this.createNode(100,'f'),
            this.createNode(100,'j'),
            this.createNode(100,'k'),
            this.createNode(100,'f'),
            this.createNode(100,'d'),
            this.createNode(100,'f'),
            this.createNode(100,'j'),
            this.createNode(100,'k'),
            this.createNode(100,'d'),
            this.createNode(100,'f')
        ]);
        console.log("before destroy " + this.nodes.length)
        
        this.nodes.splice(0,1)

        console.log("after destroy " + this.nodes.length)
    }

    update(){

    }

    createNode(startTime, key){
        const node = this.add.rectangle(
            100,
            100,
            100,
            40,
            0xfff00a
        )
        node.setData('startTime', startTime)
        return node;
    }

    pushNode(nodeList){
        nodeList.map(node => {
            this.nodes.push(node)
        });
    }

}