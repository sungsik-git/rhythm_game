import Phaser from "phaser";

export default class Test extends Phaser.Scene{
    constructor(){
        super('test');
    }

    create(){
        this.nodes = [
            new Node(this.game.config.width / 2, 1000, 1000),
        ]

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.keySpace.on('down', () => {
            this.judgement()
        });

        this.keySpace.on('up', () => {
            
        });

        console.log(this.nodes[0].key)
        // this.node = this.add.rectangle(
        //     this.ndoes[0].key,
        //     100, 
        //     100,
        //     40 + (this.nodes[0].endTime - this.nodes[0].startTime),
        //     '0xffffff'
        // ).setOrigin(0);

        this.judgementLine = this.add.rectangle(
            this.game.config.width/10,
            600,
            this.game.config.width * 8 / 10,
            4,
            '0xffffff'
        ).setOrigin(0);
    }

    update(){
        // if(this.node.y <650){
        //     this.node.y += 5;
        // }

        // if(this.node.y === 650){
        //     this.node.destroy();
        // }
    }

    judgement(){
        let dist = Math.abs(this.judgementLine.y - this.node.y);

        if(dist < 50){
            console.log(dist)
        }
    }
}

class Node{
    constructor(key, startTime, endTime){
        this.key = key;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}