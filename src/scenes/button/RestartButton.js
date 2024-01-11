import Phaser from 'phaser';

export default class RestartButton extends Phaser.Scene {
    constructor() {
        super('restartButton');
    }

    init(data) {
        this.bgm = data.bgm;
    }

    create() {
        const restartButton = this.add.text(
            this.game.config.width - 300,
            50,
            'Restart!!',
            { fill: '#000000' }
        );

        restartButton.setInteractive().on('pointerdown', () => {
            this.bgm.stop();
            this.bgm.play();
        });
    }
}
