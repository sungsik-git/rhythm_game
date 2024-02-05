import Test from "./Test";
import Test2 from "./Test2";

export default class Reset{
    constructor(scene){
        this.scene = scene;
    }

    loadButton(){
        const resetButton = this.scene.add.text(
            600,
            100,
            "RESET",
            '0xffffff'
        );

        if(this.scene instanceof Test){
            resetButton.setInteractive().on('pointerdown', () => {
                this.scene.score = 0;
                this.scene.combo = 0;
                this.scene.judgementText = null;
            });
        }else if(this.scene instanceof Test2){
            resetButton.setInteractive().on('pointerdown', () => {
                this.scene.score = 0;
                this.scene.combo = 0;
                this.scene.judgementText = null;
                console.log('click')
            });
        }


    }

}