import Phaser from "phaser";

export default class coordinate extends Phaser.Scene {
    constructor() {
        super('coordinate');

        this.xPosit = {
            keyD: window.game.config.width / 2,
            keyF: window.game.config.width / 2,
            keyJ: window.game.config.width / 2,
            keyK: window.game.config.width / 2
        };
    }
}
