import Phaser from "phaser";

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
        this.add.rectangle(400, 300, 400, 200, 0x666666);

        // 텍스트 추가
        this.add.text(400, 250, "게임에서 포커스가 벗어났습니다. \n 게임화면을 터치하면 다시 시작합니다", { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

       
    }
}