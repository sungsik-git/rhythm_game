import Phaser from "phaser";
import Mixing from "./Mixing";

export default class Test2 extends Phaser.Scene{
    constructor(){
        super('test2');

        this.isPause = false;
        this.numbers = [1,2,3,4,5,6,7,8,9];
    }

    create(){

         // Mixing 클래스 인스턴스 생성
    this.mixing = new Mixing(this, this.numbers);

    // 화면에 숫자를 출력할 텍스트 추가
    this.numbersText = this.add.text(100, 100, `Numbers: ${this.numbers.join(', ')}`, { fontSize: '24px', fill: '#ffffff' });

        this.mixing = new Mixing(this, this.numbers);
        this.mixing.startMixing(500); // 0.5초마다 실행

        this.pauseButton = this.add.text(800, 100, 'PAUSE').setInteractive();
        this.playButton = this.add.text(900, 100, 'PLAY').setInteractive();

        this.pauseButton.on('pointerdown', () => {
            this.isPause = true;
            this.mixing.stopMixing(); // 섞기 멈춤
            console.log("pause")
        });

        this.playButton.on('pointerdown', () =>{
            this.isPause = false;
            this.mixing.startMixing(500); // 다시 섞기 시작
            console.log("play")
        })
    }
    
    // update 메서드 등 필요한 메서드 추가

    clickPause(){

    }

    
}
