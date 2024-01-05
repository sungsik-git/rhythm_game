import Phaser from "phaser";
import bgImg from "../img/background(title).png";

export default class Loding extends Phaser.Scene {
  constructor() {
    super('loding'); // 식별자 설정
  }

  preload() {
    this.load.image("background", bgImg);
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0);

    this.add.text(100, 100, "Hello, Phaser!", { fontSize: '32px', fill: '#fff' });
  }

  update() {

  }
}
