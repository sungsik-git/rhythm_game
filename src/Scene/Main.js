import Phaser from "phaser";

export default class Main extends Phaser.Scene {
  constructor() {
    super('main');
  }

  preload() {
    this.load.baseURL = 'https://yungjoong.github.io/';
    this.load.image('logo',  'angular.png');
  
    for (let i=0;  i<500; i++)  {
      this.load.image('logo'+i,  'angular.png');
    }
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();

    this.load.on('progress', (value) => {
  
        progressBar.clear();
        progressBar.fillStyle(0x00ff00, 1);
        progressBar.fillRoundedRect(250, 460, 300 * value, 30, 5);
      });
  

    progressBar.clear();
    progressBar.fillStyle(0x00ff00, 1);
    progressBox.fillRoundedRect(240,450,320,50,5);

    this.load.on('complete', () => {

        progressBar.destroy();
        progressBox.destroy();
    })
}

  create() {
    const logo = this.add.image(400,  300,  'logo');
  }

  update() {

  }
}
