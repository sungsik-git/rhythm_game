import Phaser from "phaser";

//Game UI image import
// import NoteRoute from '../img/noteRoute.png';
// import NoteRouteLine from '../img/noteRouteLine.png';
import NoteRoutePressed from '../img/noteRoutePressed.png';
// import JudgementLine from '../img/judgementLine.png';

export default class GameUI extends Phaser.Scene {
    constructor(){
        super('gameUI');
    }

    preload(){
        // this.load.image('noteRoute',NoteRoute);
        // this.load.image('noteRouteLine',NoteRouteLine);
        this.load.image('noteRoutePressed', NoteRoutePressed);
        // this.load.image('judgementLine', JudgementLine);
    }

    create(){
        this.add.image(300,300,'noteRoutePressed').setOrigin(0.5)
        this.add.text(200, 200, 'gameUI' , { fill : '#9a91b5'})
    }

    update(){

    }
}