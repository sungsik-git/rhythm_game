import Phaser from "phaser";

export default class GameUI extends Phaser.Scene {
    constructor() {
        super('gameUI');
    }

    preload() {

    }

    create() {
        //node가 떨어질 route
        const nodeRouteS = this.add.rectangle(this.game.config.width / 9 + this.calcRoute(1, 0), this.game.config.height / 2, 100, 600, 0x8662f0);
        const nodeRouteD = this.add.rectangle(this.game.config.width / 9 + this.calcRoute(2, 1), this.game.config.height / 2, 100, 600, 0x8662f0);
        const nodeRouteF = this.add.rectangle(this.game.config.width / 9 + this.calcRoute(3, 2), this.game.config.height / 2, 100, 600, 0x8662f0);
        const nodeRouteSpace = this.add.rectangle(this.game.config.width / 9 + this.calcRoute(4, 3), this.game.config.height / 2, 100, 600, 0x8662f0);
        const nodeRouteJ = this.add.rectangle(this.game.config.width / 9 + this.calcRoute(5, 4), this.game.config.height / 2, 100, 600, 0x8662f0);
        const nodeRouteK = this.add.rectangle(this.game.config.width / 9 + this.calcRoute(6, 5), this.game.config.height / 2, 100, 600, 0x8662f0);
        const nodeRouteL = this.add.rectangle(this.game.config.width / 9 + this.calcRoute(7, 6), this.game.config.height / 2, 100, 600, 0x8662f0);

        //route 경계선
        const nodeRouteLine1 = this.add.rectangle(this.game.config.width / 9 - 0.5, this.game.config.height / 2, 2, 600, 0x000000);
        const nodeRouteLine2 = this.add.rectangle(this.game.config.width / 9 + this.calcRouteLine(1, 1), this.game.config.height / 2, 2, 600, 0x000000);
        const nodeRouteLine3 = this.add.rectangle(this.game.config.width / 9 + this.calcRouteLine(2, 2), this.game.config.height / 2, 2, 600, 0x000000);
        const nodeRouteLine4 = this.add.rectangle(this.game.config.width / 9 + this.calcRouteLine(3, 3), this.game.config.height / 2, 2, 600, 0x000000);
        const nodeRouteLine5 = this.add.rectangle(this.game.config.width / 9 + this.calcRouteLine(4, 4), this.game.config.height / 2, 2, 600, 0x000000);
        const nodeRouteLine6 = this.add.rectangle(this.game.config.width / 9 + this.calcRouteLine(5, 5), this.game.config.height / 2, 2, 600, 0x000000);
        const nodeRouteLine7 = this.add.rectangle(this.game.config.width / 9 + this.calcRouteLine(6, 6), this.game.config.height / 2, 2, 600, 0x000000);
        const nodeRouteLine8 = this.add.rectangle(this.game.config.width / 9 + this.calcRouteLine(7, 7), this.game.config.height / 2, 2, 600, 0x000000);
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
        return this.calcRouteLine(lineCnt, routeCnt) + 50;
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
