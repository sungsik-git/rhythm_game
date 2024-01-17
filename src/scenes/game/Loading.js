import Phaser from "phaser";
import bg from "../../asset/img/loadingBackground2.jpg";
import Coordinate from "../theme/Coordinate";

export default class Loading extends Phaser.Scene {
  constructor() {
    super('loading');
  }

  preload() {
    //background
    this.load.image('bg',bg);
  }

  create() {
    const coordinate = new Coordinate()

    const bgImg = this.add.image(0, 0, 'bg').setOrigin(0);
    bgImg.displayWidth = coordinate.xPosit.width;
    bgImg.displayHeight = coordinate.yPosit.height;

    //Start Button
    this.clickToStart = this.add.text(
      coordinate.xPosit.center,
      coordinate.yPosit.centerBottomMore,
      'Click to Start'
    )
    .setFill("#fff")
    .setFontSize(50)
    .setOrigin(0.5)
    .setDepth(999)
    .setAlign('center')
    .setInteractive();

    //Font animation
    this.tweens.add({
        targets: this.clickToStart,
        alpha : 0,
        duration : 1000,
        ease : 'Powerl',
        yoyo : true,
        repeat : -1
    });

    this.clickToStart.once('pointerdown', () => {
      this.scene.start('main');
    });

  }
    
  update() {

  }
}
