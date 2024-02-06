import Phaser from "phaser";

//썸네일 이미지 추가
import game1_thumbnail from "../../asset/img/game1_thumbnail.jpg";
import game2_thumbnail from "../../asset/img/game2_thumbnail.jpeg";
import game3_thumbnail from "../../asset/img/game3_thumbnail.jpeg";
import game4_thumbnail from "../../asset/img/game4_thumbnail.jpeg";
import game5_thumbnail from "../../asset/img/game5_thumbnail.png";
import game6_thumbnail from "../../asset/img/game6_thumbnail.jpeg";
import game7_thumbnail from "../../asset/img/game7_thumbnail.jpeg";

//음악 파일 추가
import game1_music from '../../asset/music/Dome_before30mins_231206.wav';
import game2_music from '../../asset/music/attention.mp3';
import game3_music from '../../asset/music/dangerously.mp3';
import game4_music from '../../asset/music/loser.mp3';
import game5_music from '../../asset/music/that’s_not_how_this-works.mp3';
import game6_music from '../../asset/music/thats_hilarious.mp3';
import game7_music from '../../asset/music/see_you_again.mp3';
import shortSample from '../../asset/music/short_sample.mp3';

//노트 파일 추가
import game1_node from '../../asset/textNode/SampleNode1.txt';
import game2_node from '../../asset/textNode/SampleNode2.txt';

import Music from "../music_info/Music";

export default class Main extends Phaser.Scene {
  constructor() {
    super('main');
    this.currentMusicTitle = null;
    this.currentIndex = 0;

    this.musics = [
      //Music('title', 'artist', 'thumbnailPath', 'musicPath', 'nodeFilePath')
      new Music('Attention', 'Charlie Puth', 'game2_thumbnail', shortSample, game1_node),
      new Music('Dangerously', 'Charlie Puth', 'game3_thumbnail', game3_music, game2_node),
      new Music('Loser', 'Charlie Puth', 'game4_thumbnail', game4_music, game1_node),
      new Music('That’s not how this', 'Charlie Puth', 'game5_thumbnail', game5_music, game1_node),
      new Music('Thats hilarious', 'Charlie Puth', 'game6_thumbnail', game6_music, game1_node),
      new Music('See you again', 'Charlie Puth', 'game7_thumbnail', game7_music, game1_node),
      new Music('Game1', 'Artist1', 'game1_thumbnail', game1_music, game1_node),
    ];
  }

  preload() {
    this.load.image('game1_thumbnail', game1_thumbnail);
    this.load.image('game2_thumbnail', game2_thumbnail);
    this.load.image('game3_thumbnail', game3_thumbnail);
    this.load.image('game4_thumbnail', game4_thumbnail);
    this.load.image('game5_thumbnail', game5_thumbnail);
    this.load.image('game6_thumbnail', game6_thumbnail);
    this.load.image('game7_thumbnail', game7_thumbnail);
  }

  create() {   
    // init background image
    const currentBackground = this.add.image(0, 0, this.musics[this.currentIndex].thumbnailPath)
    .setOrigin(0, 0)
    .setAlpha(0.3)
    currentBackground.displayWidth = this.game.config.width
    currentBackground.displayHeight = this.game.config.height
    
    // init thumbnail image
    const currentThumbnail = this.add.image(this.game.config.width / 2, this.game.config.height / 5, this.musics[this.currentIndex].thumbnailPath)
    .setOrigin(0.5, 0);
    this.scaleImage(currentThumbnail);
    
    // 버튼 위치 로드
    const nextButton = this.add.text(
      this.game.config.width * 4 / 5,
       this.game.config.height / 2,
        'Next',
          { 
            fill: '#7751e0',
            backgroundColor: '#fff',
            padding: { x : 10, y : 20},
            
          }
        ).setInteractive();

    const prevButton = this.add.text(
      this.game.config.width / 7,
      this.game.config.height / 2,
      'Prev',
        {
          fill: '#7751e0',
          backgroundColor: '#fff',
          padding: { x : 10, y : 20}
        }
      ).setInteractive();
    
    // 곡 정보 슬라이드 버튼
    const nextThumbnail = () => {
      this.currentIndex = (this.currentIndex + 1) % this.musics.length;
      this.slideThumbnail(currentThumbnail, this.musics[this.currentIndex].thumbnailPath, -this.game.config.width / 2);
      this.slideBackground(currentBackground, this.musics[this.currentIndex].thumbnailPath, -this.game.config.width);
    }

    const prevThumbnail = () => {
      this.currentIndex = (this.currentIndex - 1 + this.musics.length) % this.musics.length;
      this.slideThumbnail(currentThumbnail, this.musics[this.currentIndex].thumbnailPath, this.game.config.width / 2);
      this.slideBackground(currentBackground, this.musics[this.currentIndex].thumbnailPath, -this.game.config.width);
    }; 

    // thumbnail click시 해당되는 곡의 플레이 화면으로 이동
    const onThumbnailClick = () => {
      this.loadScene(this.currentIndex);
    }

    

    // button event 설정
    nextButton.on('pointerdown', nextThumbnail);
    prevButton.on('pointerdown', prevThumbnail);
    currentThumbnail.setInteractive().on('pointerdown', onThumbnailClick);

    // 출력되는 음악의 제목을 출력
    this.currentMusicTitle = this.add.text(
      this.game.config.width / 2,
      this.game.config.height * 4 / 5,
      this.musics[this.currentIndex].title,
      {
          fill: '#7751e0',
          backgroundColor: '#e7e4f0',
          padding: { x: 10, y: 5 }
      }
    );

    // 텍스트 가운데 맞춤을 위한 위치 조정
    const textWidth = this.currentMusicTitle.getBounds().width;
    this.currentMusicTitle.setX(this.game.config.width / 2 - textWidth / 2);
  }

  // 이미지 슬라이드 기능
  slideThumbnail(target, thumbnailPath, targetX) {
    this.tweens.add({
      targets: target,
      x: targetX,
      duration: 500,
      onComplete: () => {
        target.setTexture(thumbnailPath).setOrigin(0.5, 0);
        target.x = this.game.config.width / 2; 
        this.scaleImage(target);

        // 텍스트 값 변경
        this.currentMusicTitle.setText(this.musics[this.currentIndex].title);
        const textWidth = this.currentMusicTitle.getBounds().width;
        this.currentMusicTitle.setX(this.game.config.width / 2 - textWidth / 2);
      },
    });
  }
  slideBackground(target, thumbnailPath, targetX) {
    this.tweens.add({
      targets: target,
      x: targetX,
      duration: 400,
      onComplete: () => {
        target.setTexture(thumbnailPath).setOrigin(0, 0);
        target.x = 0; 
        target.displayHeight = this.game.config.height;
        target.displayWidth = this.game.config.width;
      },
    });
  }
  

  // 이미지 위치 고정을 위한 함수
  scaleImage(target) {
    target.displayWidth = 700;
    target.displayHeight = 500;
  }

  loadScene(currentIndex) {
    // game을 선택하면 main scene은 종료됨
    this.scene.stop('main');

    // 매개변수로 받아온 index에 맞는 game scene을 출력
    this.scene.start('game', {musicInfo : this.musics[currentIndex], currentIndex: this.currentIndex});
  }

  update() {

  }
}
