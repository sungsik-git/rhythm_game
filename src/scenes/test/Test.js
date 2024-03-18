import Phaser from "phaser"

import effect from "../../asset/img/effect.png";
import Coordinate from "../theme/Coordinate";

export default class Test extends Phaser.Scene{
    constructor(){
        super('test');

        this.coordinate = new Coordinate();
    }

    preload(){
        this.load.image('effect', effect)


    }

    create(){
        this.effect = this.add.image(200,100,'effect')
            .setDisplaySize(this.coordinate.width.node, this.coordinate.height.node);
        
        this.effect.setVisible(false)
        

        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyD.on('down', () => {
            this.effect.setVisible(true)
            this.effect.alpha = 1;
            
            this.tweens.add({
                targets: this.effect,
                alpha: 0, // 투명도를 0으로 변경
                duration: 1000, // 1000밀리초(1초) 동안 진행
                ease: 'Linear', // 변화율(easing)은 일정하게
                onComplete: () => {
                    // 트윈이 완료되면 이미지를 완전히 숨김
                    this.effect.setVisible(false);
                }
            });
        });
        
    }

    update(){
        
    }
}