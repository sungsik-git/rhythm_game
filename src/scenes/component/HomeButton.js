export default class HomeButton {
    constructor(scene, bgm, nodes) {
        this.scene = scene;
        this.nodes = nodes;
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

                    this.scene.launch('HomeModal', {scene : this.scene, bgm : this.bgm, nodeManager : this.nodeManager, pauseTime : this.bgm.seek });
                }

                this.scene.scene.start('main');
            });
        } else {
            console.log("Home Button Error");
        }
    }
}
