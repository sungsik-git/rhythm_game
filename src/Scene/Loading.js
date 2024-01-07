import Phaser from "phaser";
import bg from "../img/loadingBackground.jpg";

export default class Loading extends Phaser.Scene {
  constructor() {
    super('loading');
  }

  preload() {
    this.load.image('bg',bg);

    //loading progress
    this.load.on('progress', (value) => {
      console.log(value);
    })

    this.load.on('complete', () => {
        console.log('complete')
    })
  }

  create() {
    const bgImg = this.add.image(0,0,'bg').setOrigin(0);
    bgImg.displayWidth = this.game.config.width
    bgImg.displayHeight = this.game.config.height

    this.add.text(100, 200, "Loading...", {fontSize: '32px', fill: '#fff'})

    this.time.delayedCall(2000, ()=> {
      this.scene.start('main');
    });
  }
    
  update() {

  }
}
