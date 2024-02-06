export default class routeOfKey{
    constructor(scene, xPos, yPos){
        this.scene = scene;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    createRoute(){
        this.route = this.scene.add.rectangle(
            this.xPos,
            this.scene.coordinate.yPosit.nodeRouteOrigin,
            this.scene.coordinate.width.node,
            this.scene.coordinate.height.nodeRoute,
            this.scene.coordinate.color.nodeRoute
        ).setOrigin(0);

        return this.route;
    }
}