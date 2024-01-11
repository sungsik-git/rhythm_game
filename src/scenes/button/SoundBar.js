import Phaser from "phaser";

export default class SoundBar extends Phaser.Scene {
    constructor() {
        super('soundBar');
        this.currentVolume = 1;
    }

    init(data) {
        this.bgm = data.bgm;
    }

    create() {
        this.volumeBar = this.add.rectangle(500, 50, 200, 20, 0x000000).setInteractive({ draggable: true });

        this.volumeText = this.add.text(
            430,
            50,
            `Volume: ${Math.round(this.currentVolume * 100)}%`,
            { fill: '#ffffff' }
        );

        // Set draggable area to volumeBar and limit the drag within its bounds
        this.input.setDraggable(this.volumeBar);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            console.log('Drag Event:', pointer, gameObject, dragX, dragY);

            // Calculate the volume based on the drag position within volumeBar
            this.currentVolume = Phaser.Math.Clamp(dragX / 100, 0, 1);

            // Check if bgm is initialized before attempting to set volume
            if (this.bgm) {
                this.bgm.setVolume(this.currentVolume);
            }

            this.volumeText.setText(`Volume: ${Math.round(this.currentVolume * 100)}%`);
        });

    }
}
