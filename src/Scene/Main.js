import Phaser from "phaser";
import game1_thumbnail from "../img/game1_thumbnail.jpg";
import game2_thumbnail from "../img/game2_thumbnail.jpg";
import game3_thumbnail from "../img/game3_thumbnail.jpg";
import game4_thumbnail from "../img/game4_thumbnail.jpg";
import game5_thumbnail from "../img/game5_thumbnail.jpg";

export default class Main extends Phaser.Scene {
  constructor() {
    super('main');
  }

  preload() {
    this.load.image('game1_thumbnail', game1_thumbnail);
    this.load.image('game2_thumbnail', game2_thumbnail);
    this.load.image('game3_thumbnail', game3_thumbnail);
    this.load.image('game4_thumbnail', game4_thumbnail);
    this.load.image('game5_thumbnail', game5_thumbnail);
  }

  create() {
    const thumbnails = [
      'game1_thumbnail',
      'game2_thumbnail',
      'game3_thumbnail',
      'game4_thumbnail',
      'game5_thumbnail',
    ];

    let currentIndex = 0;

    const currentThumbnail = this.add.image(0, 0, thumbnails[currentIndex]).setOrigin(0);
    currentThumbnail.displayWidth = this.game.config.width;
    currentThumbnail.displayHeight = this.game.config.height;

    const nextButton = this.add.text(700, 500, 'Next', { fill: '#fff' }).setInteractive();
    const prevButton = this.add.text(100, 500, 'Prev', { fill: '#fff' }).setInteractive();

    const nextThumbnail = () => {
      currentIndex = (currentIndex + 1) % thumbnails.length;
      this.slideThumbnail(currentThumbnail, thumbnails, currentIndex, -this.game.config.width);
    };

    const prevThumbnail = () => {
      currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      this.slideThumbnail(currentThumbnail, thumbnails, currentIndex, this.game.config.width);
    };

    nextButton.on('pointerdown', nextThumbnail);
    prevButton.on('pointerdown', prevThumbnail);
  }

  slideThumbnail(target, thumbnails, index, targetX) {
    this.tweens.add({
      targets: target,
      x: targetX,
      duration: 500,
      onComplete: () => {
        target.setTexture(thumbnails[index]);
        target.x = 0;
      },
    });
  }

  update() {
    // 게임 업데이트 로직
  }
}
