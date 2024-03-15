import Phaser from "phaser";

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
        this.add.rectangle(400, 300, 400, 200, 0x666666);

        // 텍스트 추가
        this.add.text(400, 250, "게임을 재시작하시겠습니까?", { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

        // 닫기 버튼
        const closeButton = this.add.text(400, 350, '닫기', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5).setInteractive();

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