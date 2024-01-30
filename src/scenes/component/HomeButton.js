import Phaser from "phaser";

export default class HomeButton{
    constructor(scene, bgm){
        this.scene = scene;
        this.bgm = bgm
    }
    loadHomeButton(){
        if(this.scene){
        //home 이동 버튼
        const homeButton = this.scene.add.text(
            this.scene.game.config.width - 100,
            50,
            'Home!!',
            { fill: '#ffffff' }

            );
            homeButton.setInteractive().on('pointerdown', ()=>{
                //실행되고 있는 scene이 모두 종료되어야함
                // this.scene.bgm.stop();
                
                this.bgm.stop();  
                this.scene.scene.start('main');
            });
    }else{
        console.log("HomeButton error")
    }
        
        
    }
}
