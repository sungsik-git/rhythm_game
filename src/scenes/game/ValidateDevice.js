export default class VaildateDevice{
    constructor(scene){
        this.scene = scene;
    }

    vaildateDevice(){
        let device = this.scene.sys.game.device;

        if(device.os.desktop){
            console.log('desktop')
        }
    }
}