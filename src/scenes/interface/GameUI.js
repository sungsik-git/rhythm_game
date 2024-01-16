import Phaser from "phaser";
import GameScore from '../game/GameScore';

export default class GameUI extends Phaser.Scene {
    
    constructor() {
        super('gameUI');
        this.score = new GameScore(0);
    }

    preload() {

    }

    create() {
        const ratioWidth = this.game.config.width;
        const ratioHeight = this.game.config.height;

        //Route X Position
        const keyD_X_Posit = ratioWidth / 9 + this.calcRoute(2, 1);
        const keyF_X_Posit = ratioWidth / 9 + this.calcRoute(3, 2);
        const keyJ_X_Posit = ratioWidth / 9 + this.calcRoute(4, 3);
        const keyK_X_Posit = ratioWidth / 9 + this.calcRoute(5, 4);

        this.registry.set('routeXPosition', {
            keyD_X_Posit,
            keyF_X_Posit,
            keyJ_X_Posit,
            keyK_X_Posit,
        });

        //node가 떨어질 route
        const nodeRouteD = this.add.rectangle(keyD_X_Posit, ratioHeight / 2, 100, 600, 0x8662f0);
        const nodeRouteF = this.add.rectangle(keyF_X_Posit, ratioHeight / 2, 100, 600, 0x8662f0);
        const nodeRouteJ = this.add.rectangle(keyJ_X_Posit, ratioHeight / 2, 100, 600, 0x8662f0);
        const nodeRouteK = this.add.rectangle(keyK_X_Posit, ratioHeight / 2, 100, 600, 0x8662f0);

        //route 경계선

        this.add.rectangle(ratioWidth / 9 + this.calcRouteLine(1, 1), ratioHeight / 2, 2, 600, 0x000000);
        this.add.rectangle(ratioWidth / 9 + this.calcRouteLine(2, 2), ratioHeight / 2, 2, 600, 0x000000);
        this.add.rectangle(ratioWidth / 9 + this.calcRouteLine(3, 3), ratioHeight / 2, 2, 600, 0x000000);
        this.add.rectangle(ratioWidth / 9 + this.calcRouteLine(4, 4), ratioHeight / 2, 2, 600, 0x000000);
        this.add.rectangle(ratioWidth / 9 + this.calcRouteLine(5, 5), ratioHeight / 2, 2, 600, 0x000000);

        //judgement Line
        const judgementLine = this.add.graphics();
        judgementLine.lineStyle(2, 0x000000);
        judgementLine.beginPath();
        judgementLine.moveTo(ratioWidth / 9 ,ratioHeight * 4 / 5);
        judgementLine.lineTo(ratioWidth * 9 / 10 - 2 , ratioHeight * 4 / 5);
        judgementLine.strokePath();

        //Key Info
        this.add.text(ratioWidth * 2 / 12 - 5 + 100, ratioHeight * 5 / 6, 'D');
        this.add.text(ratioWidth * 2 / 12 - 5 + 200, ratioHeight * 5 / 6, 'F');
        this.add.text(ratioWidth * 2 / 12 - 5 + 305, ratioHeight * 5 / 6, 'J');
        this.add.text(ratioWidth * 2 / 12 - 5 + 405, ratioHeight * 5 / 6, 'K');

        //route를 다른 씬에서 사용할 수 있도록 registry에 저장
        this.registry.set('nodeRoute', {
            nodeRouteD,
            nodeRouteF,
            nodeRouteJ,
            nodeRouteK,
        });

        
    }
    
    
    //route의 경계선의 x좌표를 연산하는 함수 => 생성한 object의 cneter를 기준으로 위치를 잡기 때문에 cneter인 width의 절반을 더해줘야한다.
    calcRouteLine(lineCnt, routeCnt){
        const lineCenter = 1;
        const routeWidth = 100;
        return lineCenter * lineCnt + routeWidth * routeCnt
    }
    
    //route의 x좌표를 연산하믄 함수 => n번째 line의 x좌표를 기준, center인 width의 절반을 더해줘야 함
    calcRoute(lineCnt, routeCnt){
        const routeCenter  =  50;
        return this.calcRouteLine(lineCnt, routeCnt) + routeCenter;
    }

    lineStyle(target) {
        target.displayWidth = 2;
        target.displayHeight = 600;
    }

    routeStyle(target) {
        target.displayWidth = 120;
        target.displayHeight = 600;
    }

    update() {

    }
}