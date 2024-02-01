export default class HomeButton {
    constructor(scene, bgm, score) {
        this.scene = scene;
        this.score = score;
        this.bgm = bgm;
    }

    loadHomeButton() {
        if (this.scene) {
            const homeButton = this.scene.add.text(
                this.scene.game.config.width - 100,
                50,
                'Home!!',
                { fill: '#ffffff' }
            );

            homeButton.setInteractive().on('pointerdown', () => {
                if(this.bgm){
                    this.bgm.stop();
                    this.bgm.destroy();

                    if (this.scene.cache && this.scene.cache.audio) {
                        this.scene.cache.audio.remove('bgm');
                    }
                }

                //점수, 콤보, 판정 초기화
                if (this.scene.resetGameState) {
                    this.scene.resetGameState();
                }

                this.scene.scene.start('main');
            });
        } else {
            console.log("Home Button Error");
        }
    }
}
