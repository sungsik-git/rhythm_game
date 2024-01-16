import Phaser from "phaser";

export default class PauseButton extends Phaser.Scene {
    constructor(){
        super('pauseButton');
        this.isPaused = false;
    }

   init(data){
    this.bgm = data.bgm;
    this.nodeManager = data.nodeManager;
    this.isPaused = false;

   }

   create() {
        const pauseButton = this.add.text(
            this.game.config.width - 150,
            50,
            'Pause',
            { fill: '#000000' }
        );

        pauseButton.setInteractive().on('pointerdown', () => {
            this.togglePause();
        });
    }

    togglePause() {
        if (this.isPaused) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }

        this.isPaused = !this.isPaused;
    }

    pauseGame() {
        // 일시 중지: 배경 음악 일시 중지, 노드 애니메이션 일시 중지
        this.bgm.pause();
        this.nodeManager.pauseNodes();
    }

    resumeGame() {
        // 재개: 배경 음악 재개, 노드 애니메이션 재개
        this.bgm.resume();
        this.nodeManager.resumeNodes();
    }
}