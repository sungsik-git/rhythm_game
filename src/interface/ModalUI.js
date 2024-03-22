import Coordinate from "../theme/Coordinate"

export default class ModalUI{

    coordinate = new Coordinate();

    constructor(scene, notice, closeButton = false, functionButton = false){
        this.scene = scene;
        this.notice = notice;
        this.closeButton = closeButton;
        this.functionButton = functionButton;
        this.modalScene = this.scene.scene.scene;   
    }

    makeModal(){

        /* Modal back board */
        this.scene.add.rectangle(
            this.coordinate.xPosit.center,
            this.coordinate.yPosit.center, 
            this.coordinate.width.modal, 
            this.coordinate.height.modal, 
            this.coordinate.color.modal
        );

        /* Notice */
        this.scene.add.text(
            this.coordinate.xPosit.center, 
            this.coordinate.yPosit.center - 50, 
            this.notice, 
            { fontSize: '20px', fill: '#000' }
        ).setOrigin(0.5);

    }

    makeCloseButton(pauseTime) {
        if (this.closeButton) {
            const closeButton = this.scene.add.text(
                this.coordinate.xPosit.center + 100,
                this.coordinate.yPosit.center + 100,
                'Close', 
                { fontSize: '20px', fill: '#000' }
            )
            .setOrigin(0.5)
            .setInteractive();
    
            closeButton.on('pointerdown', () => {
                this.scene.bgm.play({ seek: pauseTime });
                const gameScene = this.modalScene.get('game');
                gameScene.isPause = false;
                gameScene.nodeManager.updateIsPauseFalse();
        
                this.modalScene.stop(this.scene); 
                this.modalScene.resume('game'); 
            });
        }
    }
    

    makeFunctionButton(){
        if(this.functionButton){
            return this.scene.add.text(
                this.coordinate.xPosit.center - 100, 
                this.coordinate.yPosit.center + 100, 
                '예', 
                { fontSize: '20px', fill: '#000' }
            )
            .setOrigin(0.5)
            .setInteractive();
        }
    }

    setupBackButton(){
        const backButton = this.makeFunctionButton()
        backButton.on('pointerdown', () => {            
            const gameScene = this.modalScene.get('game');
            gameScene.isPause= false;
            gameScene.nodeManager.updateIsPauseFalse();
            if(this.scene.bgm){
                this.scene.bgm.stop();
                this.scene.bgm.destroy();

                if (gameScene.cache && gameScene.cache.audio) {
                    gameScene.cache.audio.remove('bgm');
                }
            }
            this.modalScene.stop('HomeModal');
            this.modalScene.start('main');
        });
    }
    
    setupRestartButton(){
        const restartButton = this.makeFunctionButton();
        restartButton.on('pointerdown', () => {
            const gameScene = this.modalScene.get('game');
            gameScene.isPause= false;
            gameScene.nodeManager.updateIsPauseFalse();

            
            this.scene.bgm.stop();
            this.scene.bgm.destroy();
            
            if (gameScene.cache && gameScene.cache.audio) {
                gameScene.cache.audio.remove('bgm');
            }
            
            gameScene.nodeManager.clearNodes();
            this.modalScene.stop('RestartModal');
            this.modalScene.restart();
        });
    }
}