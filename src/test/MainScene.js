import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        // 메인 씬에서는 버튼을 만들어서 팝업 씬을 띄울 수 있도록 합니다.
        const button = this.add.text(400, 300, '팝업 열기', { fontSize: '24px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.launch('DialogScene'); // 팝업 씬을 띄웁니다.
                this.scene.pause(); // 메인 씬을 일시정지합니다.
            });

        // 팝업 씬이 종료되면 메인 씬을 재개합니다.
        this.events.on('resume', () => {
            button.setAlpha(1); // 버튼을 다시 활성화합니다.
        });
    }
}