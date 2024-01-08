import Phaser from "phaser";

export default class SceneLoader extends Phaser.Scene {
    constructor(){
        super('sceneLoader');
    }

    loadScene(currentIndex) {
        switch(currentIndex) {
            case 0 :
                this.scene.start('game1');
                break;
            case 1 :
                this.scene.start('game2')
            default :
                break;
        }
    }
}