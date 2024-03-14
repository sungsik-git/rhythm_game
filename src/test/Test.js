import Phaser from "phaser"

export default class Test extends Phaser.Scene{
    constructor(){
        super('test')
    }

    preload(){

    }

    create(){
        const pauseButton = this.add.text(100, 100, "pause")
        .setFill('#fff')
        pauseButton.setInteractive()
        pauseButton.on('pointerdown', () => {
            this.scene.pause(); // 메인 Scene 일시정지
            this.scene.resume();
            this.scene.launch('PauseModal', {signal: "pause"}); // 모달 Scene 띄우기
        })


        const testButton = this.add.text(100, 200, "test")
        .setFill('#fff')
        testButton.setInteractive();
        testButton.on('pointerdown', () =>{
            this.scene.pause();
            this.scene.resume();
            this.scene.launch('PauseModal', {signal: "test"})
        })
        
    }

    update(){
        
    }
}