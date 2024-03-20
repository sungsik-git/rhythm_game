export default class VaildateDevice{
    constructor(scene){
        this.scene = scene;
    }

    isDevice(){
        let device = this.scene.sys.game.device;
        var isMobile = false;

        if(!device.os.desktop){
            isMobile = true;
        }

        return isMobile;
    }
}