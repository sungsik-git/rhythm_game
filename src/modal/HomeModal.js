import Phaser from "phaser";
import ModalUI from "../interface/ModalUI";

export default class HomeModal extends Phaser.Scene{
    init(data){
        this.scene = data.scene;
        this.bgm = data.bgm
        this.nodeManager = data.nodeManager;
        this.pauseTime = data.pauseTime;
    }

    constructor(){
        super('HomeModal');
    }

    create(){
        /* ModalUI(scene, notice, closebutton, functionbutton) */
        let modalUI = new ModalUI(
            this,
            "게임을 종료하고 곡 선택창으로 이동하시겠습니까?",
            true,
            true
        );
        modalUI.makeModal();

        // /* Make close button and apply function */
        modalUI.makeCloseButton(this.pauseTime);
        modalUI.setupBackButton();
    }
}