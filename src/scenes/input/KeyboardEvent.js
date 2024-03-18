import Phaser from "phaser";
import Coordinate from "../theme/Coordinate";
import NodeManager from "../node/NodeManager";

export default class KeyboardEvent{

    coordinate = new Coordinate();

    constructor(scene){
        this.scene = scene;
        this.keyD = null;
        this.keyF = null;
        this.keyJ = null;
        this.keyK = null;

        this.nodeManager = new NodeManager(scene);
    }

    loadGameKey(){
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        this.keyD.on('down', () => this.handleKeyDown('d'));
        this.keyF.on('down', () => this.handleKeyDown('f'));
        this.keyJ.on('down', () => this.handleKeyDown('j'));
        this.keyK.on('down', () => this.handleKeyDown('k'));

        this.keyD.on('up', () => this.handleKeyUp('d'));
        this.keyF.on('up', () => this.handleKeyUp('f'));
        this.keyJ.on('up', () => this.handleKeyUp('j'));
        this.keyK.on('up', () => this.handleKeyUp('k'));

    }

    handleKeyDown(key) {
        var judgmentNodes = this.checkNodeOfJudgement(key);
        this.effectOfKeyPress(key);
    
        if (judgmentNodes.length > 0) { 
            judgmentNodes.forEach(node => {
                this.judgeNode(node, key);
            });
            this.nodeManager.removeNode(judgmentNodes);
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
    judgeNode(node, key) {
        const distance = Math.abs(this.coordinate.yPosit.judgementLine - node.y);
        this.showEffect(key);
        if (distance <= 10) {
            this.changeJudgementText("Perfect")
            this.addScore(200)
            this.addCombo()
        } else if (distance <= 20) {
            this.changeJudgementText("Great")
            this.addScore(150)
            this.addCombo()
        } else if (distance <= 30) {
            this.changeJudgementText("Good")
            this.addScore(100)
            this.addCombo()
        } else if (distance <= 40) {
            this.changeJudgementText("Early")
            this.resetCombo();
        }
        this.nodeManager.removeNode(node);
    }

    checkNodeOfJudgement(key){
        return this.scene.nodes.filter(node => node.y >= 550 && node.getData('key') === key);
    }

    missJudgement(node){
        this.changeJudgementText("Miss");
        this.resetCombo();
    }
    
    changeJudgementText(message){
        this.scene.judgementText = message;
    }

    addScore(score){
        if(this.scene.isFever){
            this.scene.score += score * 5;
        }
        this.scene.score += score;
    }

    addCombo(){
        this.scene.combo++;
    }

    resetCombo(){
        this.scene.combo = 0;
    }

    showEffect(key) {
        const upperKey = key.toUpperCase();
        const effect = this.scene.add.image(this.coordinate.xPosit[`centerRouteKey${upperKey}`], this.coordinate.yPosit.judgementLine, 'effect')
            .setAlpha(1)
            .setDisplaySize(this.coordinate.width.node,this.coordinate.height.node);
        effect.setVisible(true);
        this.animationEffect(effect);
    }
    

    animationEffect(effect){
        this.scene.tweens.add({
            targets: effect,
            alpha: 0,
            duration: 300,
            ease: 'Linear',
            onComplete: () => {
                effect.setVisible(false);
            }
        });
    }
}
