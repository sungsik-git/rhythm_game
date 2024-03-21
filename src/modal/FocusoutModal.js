import Phaser from "phaser";
import ModalUI from "../interface/ModalUI";

export default class FocusoutModal extends Phaser.Scene{
    init(data){
        this.scene = data.scene;
        this.bgm = data.bgm
        this.nodeManager = data.nodeManager;
        this.pauseTime = data.pauseTime;
    }

    constructor(){
        super('FocusoutModal');
    }

    create(){
        /* ModalUI(scene, notice, closebutton, functionbutton) */
        let modalUI = new ModalUI(
            this,
            "게임에서 포커스가 벗어났습니다. \n\n 게임화면을 터치하면 다시 시작합니다."
        )
        modalUI.makeModal();  
    }
}