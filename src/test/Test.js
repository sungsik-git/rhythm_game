import Phaser from "phaser"
import VaildateDevice from "../theme/ValidateDevice";
import KeyboardEvent from "../input/KeyboardEvent";


export default class Test extends Phaser.Scene{
    constructor(){
        super('test');
    }

    preload(){
    }

    create(){

        var isMobile = false;

        let vaildate = new VaildateDevice(this);
        isMobile = vaildate.isDevice();

        console.log(isMobile);

        var setText = isMobile ? "Mobile" : "Desktop";

        this.add.text(100, 100, setText, {fill : '#fff'})     
        
        this.input.on('pointerdown', function(pointer){
            let width = this.game.config.width;
            let height = this.game.config.height;

            let x = pointer.x;
            let y = pointer.y;

            if (y > height * 2 / 3) { // 화면 하단을 터치했을 경우에만 반응
                if (x < width / 4) {
                    // 첫 번째 영역 (D 키에 해당)
                    this.pressKey('D');
                } else if (x < width / 2) {
                    // 두 번째 영역 (F 키에 해당)
                    this.pressKey('F');
                } else if (x < width * 3 / 4) {
                    // 세 번째 영역 (J 키에 해당)
                    this.pressKey('J');
                } else {
                    // 네 번째 영역 (K 키에 해당)
                    this.pressKey('K');
                }
            }
        }, this);
    }

    update(){
        
    }

    pressKey(key){
       this.add.text(500, 100, key, {fill : '#fff'}) 
    }

}