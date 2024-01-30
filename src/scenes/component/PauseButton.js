import NodeManager from "../node/NodeManager";

export default class PauseButton {
    constructor(scene, bgm, isPaused) {
        this.scene = scene;
        this.bgm = bgm;
        this.isPaused = isPaused;
        this.nodeManager = new NodeManager(scene);
    }

    loadPauseButton() {
        const pauseButton = this.scene.add.text(
            this.scene.game.config.width - 180,
            50,
            'Pause',
            { fill: '#ffffff' }
        );

        pauseButton.setInteractive().on('pointerdown', () => {
            this.pauseGame();
        });
    }

    loadResumeButton(){
        const resumeButton = this.scene.add.text(
            this.scene.game.config.width - 180,
            100,
            'Resume',
            { fill: '#ffffff' }
        );

        resumeButton.setInteractive().on('pointerdown', () => {
            this.resumeGame();
        });
    }


    pauseGame() {
        this.bgm.pause();
        this.scene.scene.pause();
    }

    resumeGame() {
        console.log("resume")
        this.bgm.resume();
        this.scene.scene.get('game').resume();
    }
}
