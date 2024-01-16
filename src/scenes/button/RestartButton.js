import Phaser from 'phaser';

export default class RestartButton extends Phaser.Scene {
    constructor() {
        super('restartButton');
    }

    init(data) {
        this.bgm = data.bgm;
        this.nodeManager = data.nodeManager;
    }

    create() {
        const nodeManager = this.nodeManager;
        const restartButton = this.add.text(
            this.game.config.width - 300,
            50,
            'Restart!!',
            { fill: '#000000' }
        );

        restartButton.setInteractive().on('pointerdown', () => {
            this.bgm.stop();
            this.bgm.play();
            
            // 기존 노드들을 제거하고 새로운 노드들 생성
            nodeManager.clearNodes();
            nodeManager.makeNodes();
            nodeManager.nodeSlider();
        });
    }
}
