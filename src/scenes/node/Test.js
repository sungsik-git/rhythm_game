import Phaser from "phaser";

export default class Test extends Phaser.Scene {
    constructor() {
        super('test');
        this.recs = []; 
    }

    create() {
        // 일정 시간이 지난 후에 코드 실행
        this.time.addEvent({
            delay: 1000,
            callback: this.createRectangle,
            callbackScope: this
        });
    }

    createRectangle() {
        const rec1 = this.add.rectangle(100, 100, 100, 40, 0x000000);
        const rec2 = this.add.rectangle(200, 100, 100, 40, 0x000000);
        const rec3 = this.add.rectangle(300, 100, 100, 40, 0x000000);
        const rec4 = this.add.rectangle(400, 100, 100, 40, 0x000000);
        console.log("Object created");
        this.recs.push(rec1)
        this.recs.push(rec2)
        this.recs.push(rec3)
        this.recs.push(rec4)

        this.recs.forEach(rec => {
            this.tweens.add({
                targets: rec,
                y: 600,
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {
                    rec.destroy();
                }
            });
        })
        
    }

    update() {
        if (this.recs.length > 0 && this.recs[0].y < 600) {
            console.log(this.recs[0].y);
        }
    }
}
