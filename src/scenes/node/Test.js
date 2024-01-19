import Phaser from "phaser";
import Coordinate from "../theme/Coordinate";

export default class Test extends Phaser.Scene {
    constructor() {
        super('test');
    }

    preload() {
        
    }

    create() {
        let coordinate = new Coordinate();
        
        // Create judgementBar
        let judgementBar = this.add.rectangle(this.game.config.width / 12, 600, 1000, 10, 0xffffff);
        judgementBar.setOrigin(0, 0);

        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    }

    update() {
        if (this.keyD.isDown) {
            this.handlePlayerInput(this.keyD)
        }
        if (this.keyF.isDown) {
            this.handlePlayerInput(this.keyF)
        }
        if (this.keyJ.isDown) {
            this.handlePlayerInput(this.keyJ)
        }
        if (this.keyK.isDown) {
            this.handlePlayerInput(this.keyK)
        }
    }

    handlePlayerInput(keyName){
        let collider = this.add.circle(this.game.config.width / 2, 1000, 30, 0xaaaaff)
        this.physics.add.existing(collider);

        this.tweens.add({
            targets: collider,
            scale: 4,
            duration: 100,
            alpha: 0,
            onComplete: () => {
                collider.destroy();
                if (collider.collided != true) {
                    this.cameras.main.shake(50, 0.005);
                    // this.score -= 200;
                    // this.updateScoreText();
                }
            }
        })
    }
}
