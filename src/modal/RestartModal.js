import Phaser from "phaser";
import ModalUI from "../interface/ModalUI";

export default class RestartModal extends Phaser.Scene{
    init(data){
        this.scene = data.scene;
        this.bgm = data.bgm
        this.nodeManager = data.nodeManager;
        this.pauseTime = data.pauseTime;
    }

    constructor(){
        super('RestartModal');
    }

    create(){
        /* ModalUI(scene, notice, closebutton, functionbutton) */
        let modalUI = new ModalUI(
            this,
            "게임을 재시작하시겠습니까?",
            true,
            true
        )
        modalUI.makeModal();

        /* Make close button and apply function */
        const closeButton = modalUI.makeCloseButton(this.pauseTime);
        const restartButton = modalUI.setupRestartButton();        
    }
}