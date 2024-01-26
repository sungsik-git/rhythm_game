import Phaser from "phaser";
import Coordinate from "../theme/Coordinate";

export default class KeyboardEvent{

    coordinate = new Coordinate();

    constructor(scene){
        this.scene = scene
        this.keyD = null;
        this.keyF = null;
        this.keyJ = null;
        this.keyK = null;
    }

    loadGameKey(){
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    }

    loadKeydownEvent(){
        this.keyD.on('down', () => this.handleKeyDown('d'));
        this.keyF.on('down', () => this.handleKeyDown('f'));
        this.keyJ.on('down', () => this.handleKeyDown('j'));
        this.keyK.on('down', () => this.handleKeyDown('k'));
    }

    loadKeyUpEvent(){
        this.keyD.on('up', () => this.handleKeyUp('d'));
        this.keyF.on('up', () => this.handleKeyUp('f'));
        this.keyJ.on('up', () => this.handleKeyUp('j'));
        this.keyK.on('up', () => this.handleKeyUp('k'));
    }

    handleKeyDown(key) {
        var judgmentNodes = this.checkNodeOfJudgement();
        this.effectOfKeyPress(key);
    
        if (judgmentNodes.length > 0) {
            console.log("isnode true");
            judgmentNodes.forEach(node => {
                this.judgeNode(node);
            });
            this.removeNode(judgmentNodes);
        }
    }

    handleKeyUp(key) {
        this.effectOfKeyRelease(key);
    }

    getRouteByKey(key) {
        switch (key) {
            case 'd':
                return this.scene.routeOfKeyD;
            case 'f':
                return this.scene.routeOfKeyF;
            case 'j':
                return this.scene.routeOfKeyJ;
            case 'k':
                return this.scene.routeOfKeyK;
            default:
                return null;
        }
    }

    effectOfKeyPress(key) {
        const route = this.getRouteByKey(key);
        if (route) {
            route.setFillStyle(this.coordinate.color.pressednodeRoute);
        }
    }

    effectOfKeyRelease(key) {
        const route = this.getRouteByKey(key);
        if (route) {
            route.setFillStyle(this.coordinate.color.nodeRoute); 
        }
    }
    judgeNode(node) {
        console.log(node.y)
        const distance = Math.abs(node.y + node.height / 2 - this.coordinate.yPosit.judgementLine);
    
        if (distance <= 10) {
            console.log("Perfect");

        } else if (distance <= 20) {
            console.log("Great");

        } else if (distance <= 30) {
            console.log("Good");

        } else if (distance <= 40) {
            console.log("Early");

        } else {
            this.missJudgement();

        }
    }
    getNodesAtMaxY() {
        const maxY = this.getMaxY();
        return this.nodes.filter(node => node.y === maxY);
    }
    

    getMaxY(){
        return Math.max(...this.nodes.map(node => node.y));
    }

    checkNodeOfJudgement(){
        return this.scene.nodes.filter(node => node.y >= 570);
    }
    missJudgement(){
        console.log("Miss")
    }
    removeNode(node){
        const index = this.scene.nodes.indexOf(node);
        if (index !== -1) {
            this.scene.nodes.splice(index, 1);
            node.destroy();
        }
        
    }
}
