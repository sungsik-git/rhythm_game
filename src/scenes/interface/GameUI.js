import Coordinate from "../theme/Coordinate";

export default class GameUI {
    
    constructor(scene) {
        this.scene = scene;
        this.coordinate = new Coordinate()
    }

    loadGameUI(){
        // make to nodeRoute 
        this.routeOfKeyD = this.scene.add.rectangle(
            this.coordinate.xPosit.keyD,
            this.coordinate.yPosit.nodeRouteOrigin,
            this.coordinate.width.node,
            this.coordinate.height.nodeRoute,
            this.coordinate.color.nodeRoute
        ).setOrigin(0);
        this.routeOfKeyF = this.scene.add.rectangle(
            this.coordinate.xPosit.keyF,
            this.coordinate.yPosit.nodeRouteOrigin,
            this.coordinate.width.node,
            this.coordinate.height.nodeRoute,
            this.coordinate.color.nodeRoute
        ).setOrigin(0);
        this.routeOfKeyJ = this.scene.add.rectangle(
            this.coordinate.xPosit.keyJ,
            this.coordinate.yPosit.nodeRouteOrigin,
            this.coordinate.width.node,
            this.coordinate.height.nodeRoute,
            this.coordinate.color.nodeRoute
        ).setOrigin(0);
        this.routeOfKeyK = this.scene.add.rectangle(
            this.coordinate.xPosit.keyK,
            this.coordinate.yPosit.nodeRouteOrigin,
            this.coordinate.width.node,
            this.coordinate.height.nodeRoute,
            this.coordinate.color.nodeRoute
        ).setOrigin(0);

        // make judgement line
        this.judgementLine = this.scene.add.rectangle(
            this.coordinate.xPosit.keyD,
            this.coordinate.yPosit.judgementLine,
            this.coordinate.width.judgementLine,
            this.coordinate.height.judgementLine,
            this.coordinate.color.judgementLine
        ).setOrigin(0);


    }
    
    loadTest(){
        this.testText = this.scene.add.text(100,100,"test", {fill: '#ffffff'})
    }
   
}