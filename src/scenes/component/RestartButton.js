import NodeManager from "../node/NodeManager";

export default class RestartButton {

    constructor(scene, bgm) {
        this.scene = scene;
        this.bgm = bgm;
        this.nodeManager = new NodeManager(scene);
    }   

    loadRestartButton() {
        if(this.scene){
            const restartButton = this.scene.add.text(
                this.scene.game.config.width - 300,
                50,
                'Restart!!',
                { fill: '#ffffff' }
            );

            restartButton.setInteractive().on('pointerdown', () => {
                this.bgm.stop();
                this.bgm.destroy();

                if (this.scene.cache && this.scene.cache.audio) {
                    this.scene.cache.audio.remove('bgm');
                }

                this.nodeManager.clearNodes();
                this.scene.scene.restart();
            });
        }else{
            console.log("Restart Button Error")
        }
    }
}
