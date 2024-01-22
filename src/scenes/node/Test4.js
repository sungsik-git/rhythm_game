import Phaser from "phaser";

export default class Test4 extends Phaser.Scene {
    constructor() {
        super('test4');
        this.rects = [];
        this.maxYRect = null; 
        this.keyD = null; 
    }

    create() {
        this.makeRectangle();
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyD.on('down', this.handleDKeyDown, this);
    }

    update() {
        this.rectangleSlider();
    }

    makeRectangle() {
        for (let i = 0; i < 100; i++) {
            const rect = this.add.rectangle(100 + i * 5, 100, 100, 40, 0x0ff933 + i);
            this.rects.push(rect);
        }
    }

    rectangleSlider() {
        for (let i = 0; i < this.rects.length; i++) {
            this.time.addEvent({
                delay: i * 100,
                callback: () => {
                    this.rects[i].y += 5;

                    this.rects[i].y = this.rects[i].y > 600 ? 0 : this.rects[i].y;

                    if (this.rects[i].y === 0) {
                        this.rects[i].destroy();
                    }
                },
                loop: false,
                callbackScope: this
            });
        }
    }

    handleDKeyDown() {
        this.maxYRect = this.getMaxYRect();

        if (this.maxYRect) {
            console.log(this.maxYRect);

            this.judgementRect();
        }

        this.keyD.reset();
    }

    getMaxYRect() {
        let maxYRect = null;

        for (let i = 0; i < this.rects.length; i++) {
            const currentRect = this.rects[i];

            if (currentRect) {
                if (!maxYRect || currentRect.y > maxYRect.y) {
                    maxYRect = currentRect;
                }
            }
        }

        return maxYRect;
    }

    judgementRect() {
        if (this.maxYRect) {
            const distance = Math.abs(600 - this.maxYRect.y);

            if (distance <= 10) {
                // Perfect
                console.log('Perfect!');
            } else if (distance <= 20) {
                // Good
                console.log('Good!');
            } else if (distance <= 30) {
                // Miss
                console.log('Miss!');
            }
        }
    }
}
