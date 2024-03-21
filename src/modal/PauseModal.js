import Phaser from "phaser";
import ModalUI from "../interface/ModalUI";

export default class PauseModal extends Phaser.Scene{
    init(data){
        this.scene = data.scene;
        this.bgm = data.bgm
        this.nodeManager = data.nodeManager;
        this.pauseTime = data.pauseTime;
    }

    constructor(){
        super('PauseModal');
    }

    create(){
        /* ModalUI(scene, notice, closebutton, functionbutton) */
        let modalUI = new ModalUI(
            this,
            "일시정지 \n\n 게임을 이어서 하시겠습니까?",
            true
        )
        modalUI.makeModal();

        /* Make close button and apply function */
        const closeButton = modalUI.makeCloseButton();
        closeButton.on('pointerdown', () => {
            this.bgm.play({ seek: this.pauseTime });
            const gameScene = this.scene.get('game');

            gameScene.isPause= false;
            gameScene.nodeManager.updateIsPauseFalse();

            this.scene.stop('PauseModal');
            this.scene.resume('game')
        });
    }
}