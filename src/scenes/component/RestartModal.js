import Phaser from "phaser";

export default class RestartModal extends Phaser.Scene{
    init(data){
        this.scene = data.scene;
        this.bgm = data.bgm
        this.nodeManager = data.nodeManager;
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
            const gameScene = this.scene.get('game');

            gameScene.isPause= false;
            gameScene.nodeManager.updateIsPauseFalse();

            this.scene.stop('RestartModal');
            // this.scene.resume('game')


            this.bgm.stop();
                this.bgm.destroy();

                if (this.scene.cache && this.scene.cache.audio) {
                    this.scene.cache.audio.remove('bgm');
                }

                this.nodeManager.clearNodes();
                this.scene.restart();
        });
    }
}