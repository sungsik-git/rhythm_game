import Phaser from "phaser";
import Sample from "../asset/music/that’s_not_how_this-works.mp3"

export default class Test extends Phaser.Scene{
    constructor(){
        super('test');
        this.isPause = false;
        this.bgm = null;
    }

    preload(){
        this.load.audio('sample', Sample);
    }

    create() {
        // 배경음악 로드
        this.bgm = this.sound.add('sample', { loop: true });
        this.pausedTime = 0; // 일시정지된 시간을 저장할 변수

        // 재생 버튼 생성
        this.playButton = this.add.text(100, 100, 'Play', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.playBGM());

        // 일시정지 버튼 생성
        this.pauseButton = this.add.text(100, 150, 'Pause', { fill: '#f00' })
            .setInteractive()
            .on('pointerdown', () => this.pauseBGM());
    }

    playBGM() {
        // 저장된 일시정지된 시간부터 재생
        this.bgm.play({ seek: this.pausedTime });

        // 재생 버튼 비활성화
        this.playButton.disableInteractive();
        this.playButton.setVisible(false);

        // 일시정지 버튼 활성화
        this.pauseButton.setInteractive();
        this.pauseButton.setVisible(true);
    }

    pauseBGM() {
        // 배경음악 일시정지
        this.bgm.pause();

        // 일시정지된 시간 저장
        this.pausedTime = this.bgm.seek;

        // 일시정지 버튼 비활성화
        this.pauseButton.disableInteractive();
        this.pauseButton.setVisible(false);

        // 재생 버튼 활성화
        this.playButton.setInteractive();
        this.playButton.setVisible(true);
    }
}