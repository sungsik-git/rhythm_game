export default class HomeButton{
    
    constructor(scene, bgm){
        this.scene = scene;
        this.bgm = bgm
    }

    loadHomeButton(){
        if(this.scene){   
        const homeButton = this.scene.add.text(
            this.scene.game.config.width - 100,
            50,
            'Home!!',
            { fill: '#ffffff' }

            );
            homeButton.setInteractive().on('pointerdown', ()=>{
                this.bgm.stop();  
                this.scene.scene.start('main');
            });
        }else{
            console.log("HomeButton error")
        }   
    }
}
