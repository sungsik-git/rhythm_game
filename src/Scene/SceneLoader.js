import Phaser from "phaser";


export default class SceneLoader extends Phaser.Scene {
    constructor(){
        super('sceneLoader');
    }

    loadScene(currentIndex) {
        //game을 선택하면 main scene은 종료됨
        this.scene.stop('main');

        //매개변수로 받아온 index에 맞는 game scene을 출력
        switch(currentIndex) {
            case 0 :
                this.scene.start('game1');
                break;
            case 1 :
                this.scene.start('game2');
                break;
            case 2 :
                this.scene.start('game3');
                break;
            case 3 : 
                this.scene.start('game4');
                break;
            case 4 : 
                this.scene.start('game5');
                break
            default :
                break;
        }
    }
}