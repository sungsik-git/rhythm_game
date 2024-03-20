import Phaser from "phaser";
import bg from "../../asset/img/loadingBackground2.jpg";
import Coordinate from "../theme/Coordinate";
import VaildateDevice from "../theme/ValidateDevice";

export default class Loading extends Phaser.Scene {
  constructor() {
    super('loading');
  }

  preload() {
    //background
    this.load.image('bg',bg);
  }

  create() {

    this.isMoblie = false;
    const isMoblieDevice = new VaildateDevice(this);
    this.isMoblie = isMoblieDevice.isDevice();
    console.log(this.isMoblie)

    const fontSize = this.isMobile? '1px' : '50px'
    const coordinate = new Coordinate();

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
    .setFontSize(fontSize)
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
