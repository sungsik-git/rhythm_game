import Coordinate from "../theme/Coordinate";

export default class GameInfoUI {
    
    coordinate = new Coordinate()

    constructor(scene, musicInfo){
        this.scene = scene;
        this.musicInfo = musicInfo;
    }

    loadGameInfoBar(){
        const gameInfoBar = this.scene.add.rectangle(
            0,
            this.coordinate.yPosit.height - 80,
            this.coordinate.xPosit.width,
            80,
            0x8c8c8c
        ).setOrigin(0);

        return gameInfoBar;
    }

    loadGameInfo(){
        const musicTitle = this.scene.add.text(
            300,
            700,
            this.musicInfo.title,
            {fill: '0x000000'}
        ).setOrigin(0);
        musicTitle.setFontSize(24).setAlign('center');

        const musicArtist = this.scene.add.text(
            300,
            740,
            this.musicInfo.artist,
            {fill: '0x000000'}
        ).setOrigin(0);
        musicArtist.setAlign('center');

        return [musicTitle, musicArtist];
    }
}