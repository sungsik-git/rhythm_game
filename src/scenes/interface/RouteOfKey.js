export default class RouteOfKey{
    constructor(scene, key){
        this.scene = scene;
        this.key = key;

        this.xPosition = this.scene.coordinate.xPosit[this.key];
    }

    createRoute() {
        
        const route = this.scene.add.rectangle(
            this.xPosition,
            this.scene.coordinate.yPosit.nodeRouteOrigin,
            this.scene.coordinate.width.node,
            this.scene.coordinate.height.nodeRoute,
            this.scene.coordinate.color.nodeRoute
        ).setOrigin(0);

        return route;
    }


    createKeyInfo(){
        this.scene.add.text(
            this.xPosition + 55,
            630,
            this.key.substring(3),
            { fill: '0x000000'}
        )
    }
}