export default class ModalManager{
    constructor(scene){
        this.scene = scene;
        this.buttonVisible = false;
    }

    setupMenuButton(){
        this.menuButton = this.scene.add.text(
            this.scene.game.config.width - 100,
            50,
            'MENU',
            { fill : '#fff'}
        )
        .setInteractive();
        this.menuButton.on('pointerdown', () => {
           this.toggleButtonVisible(); 
        })
    }

    setupHomeButton(bgm, nodeManager){
        this.homeButton = this.scene.add.text(
            this.scene.game.config.width - 200,
            50,
            'Home!!',
            { fill: '#fff' }
        )
        .setInteractive()
        this.homeButton.on('pointerdown', () => {
            bgm.pause();
            const gameScene = this.scene.scene.get('game');
            gameScene.pauseTime = bgm.seek;
            gameScene.isPause = true;
            gameScene.onModal = true;
            nodeManager.updateIsPauseTrue();
            this.scene.scene.launch('HomeModal', {scene: this.scene, bgm: bgm, nodeManager: nodeManager, pauseTime: gameScene.pauseTime});
        });
    }

    setupRestartButton(bgm, nodeManager){
        this.restartButton = this.scene.add.text(
            this.scene.game.config.width - 400,
            50,
            'Restart!!',
            { fill: '#ffffff' }
        )
        .setInteractive();
        this.restartButton.on('pointerdown', () => {
            bgm.pause();
            const gameScene = this.scene.scene.get('game');
            gameScene.pauseTime = bgm.seek;
            gameScene.isPause = true;
            gameScene.onModal = true;
            nodeManager.updateIsPauseTrue();
            this.scene.scene.launch('RestartModal', {scene: this.scene, bgm: bgm, nodeManager: nodeManager, pauseTime: gameScene.pauseTime});
        });
    }

    setupPauseButton(bgm, nodeManager){
        this.pauseButton = this.scene.add.text(
            this.scene.game.config.width - 280,
            50,
            'Pause',
            { fill: '#fff'}
        )
        .setInteractive();
        this.pauseButton.on('pointerdown', () => {
            const gameScene = this.scene.scene.get('game');
            bgm.pause();
            gameScene.pauseTime = bgm.seek;
            gameScene.isPause = true;
            gameScene.onModal = true;
            nodeManager.updateIsPauseTrue();
            this.scene.scene.launch('PauseModal', {scene: this.scene, bgm: bgm, nodeManager: nodeManager, pauseTime: bgm.seek});
        });
    }

    toggleButtonVisible(){
        this.buttonVisible = !this.buttonVisible;

        this.pauseButton.setVisible(this.buttonVisible);
        this.homeButton.setVisible(this.buttonVisible);
        this.restartButton.setVisible(this.buttonVisible);
    }

    initialize(bgm, nodeManager){
        this.setupMenuButton();
        this.setupPauseButton(bgm, nodeManager);
        this.setupHomeButton(bgm, nodeManager);
        this.setupRestartButton(bgm, nodeManager);

        this.pauseButton.setVisible(this.buttonVisible);
        this.homeButton.setVisible(this.buttonVisible);
        this.restartButton.setVisible(this.buttonVisible);
    }
}