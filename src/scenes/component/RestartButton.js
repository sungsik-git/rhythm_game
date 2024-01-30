import NodeManager from "../node/NodeManager";

export default class RestartButton {

    constructor(scene, bgm) {
        this.scene = scene;
        this.bgm = bgm;
    }   

    loadRestartButton() {
        if(this.scene){
            const nodeManager = new NodeManager();

            const restartButton = this.scene.add.text(
                this.scene.game.config.width - 300,
                50,
                'Restart!!',
                { fill: '#ffffff' }
            );

            restartButton.setInteractive().on('pointerdown', () => {
                this.bgm.stop();
                this.bgm.play();
                
                // 기존 노드들을 제거하고 새로운 노드들 생성
                nodeManager.clearNodes();
                nodeManager.makeRectFromClass();
                nodeManager.nodeSlider();
            });
        }else{
            console.log("not scene")
        }
    }
}
