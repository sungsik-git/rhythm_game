import Phaser from "phaser";

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
        this.add.rectangle(400, 300, 400, 200, 0x666666);

        // 텍스트 추가
        this.add.text(400, 250, "게임을 종료하고 곡 선택창으로 이동하시겠습니까?", { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

        // 닫기 버튼
        const backButton = this.add.text(500, 350, '예', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {            
            const gameScene = this.scene.get('game');
            gameScene.isPause= false;
            gameScene.nodeManager.updateIsPauseFalse();
            if(this.bgm){
                this.bgm.stop();
                this.bgm.destroy();

                if (gameScene.cache && gameScene.cache.audio) {
                    gameScene.cache.audio.remove('bgm');
                }
            }
            this.scene.stop('HomeModal');
            this.scene.start('main');
        });

         // 닫기 버튼
         const closeButton = this.add.text(300, 350, '닫기', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5).setInteractive();

         closeButton.on('pointerdown', () => {
             this.bgm.play({ seek: this.pauseTime });
             const gameScene = this.scene.get('game');
 
             gameScene.isPause= false;
             gameScene.nodeManager.updateIsPauseFalse();
 
             this.scene.stop('HomeModal');
             this.scene.resume('game')
         });
    }
}