import Phaser from "phaser";
import bg from "../img/loadingBackground.jpg";

export default class Loading extends Phaser.Scene {
  constructor() {
    super('loading');
  }

  preload() {
    //background
    this.load.image('bg',bg);
  }

  create() {
    const bgImg = this.add.image(0, 0, 'bg').setOrigin(0);
    bgImg.displayWidth = this.game.config.width;
    bgImg.displayHeight = this.game.config.height;

    //start button 
    this.clickToStart = this.add.text(
      this.game.config.width / 2,
      this.game.config.height * 3 / 4,
      'Click to Start'
    )
    .setFill("#fff")
    .setFontSize(50)
    .setOrigin(0.5)
    .setDepth(999)
    .setAlign('center')
    .setInteractive();

    this.input.once('pointerdown', ()=> {
      console.log("click Start")
      this.scene.transition({target:'main', duration:"500"})
    });

  }
    
  update() {

  }
}
