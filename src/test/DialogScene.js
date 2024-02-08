import Phaser from "phaser";

export default class DialogScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DialogScene' });
    }

    create() {
        // 팝업 씬에서 표시할 내용을 생성합니다.
        const button = this.add.text(100, 100, '팝업 씬입니다.', { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.resume('MainScene'); // 메인 씬을 다시 재개합니다.
                this.scene.stop(); // 팝업 씬을 종료합니다.
            });
    }
}
