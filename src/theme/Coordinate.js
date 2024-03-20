export default class Coordinate {
    constructor() {
        this.xPosit = {
            width: window.game.config.width,
            center: window.game.config.width / 2,
            centerLeft: window.game.config.width / 2 - 100,

            // Position of node and node route
            keyD: 0,
            keyF: 125,
            keyJ: 250,
            keyK: 375,

            centerRouteKeyD: 60,
            centerRouteKeyF: 185, 
            centerRouteKeyJ: 310,
            centerRouteKeyK: 435,
        };

        this.yPosit = {
            height: window.game.config.height,
            center: window.game.config.height / 2,
            centerBottom: window.game.config.height * 3 / 4,
            centerBottomMore: window.game.config.height * 5 / 6,
            nodeRouteOrigin: 0,
            judgementLine: 600,
        }

        this.width = {
            node: 120,
            judgementLine: 495,
        }

        this.height = {
            node: 40,
            nodeRoute: 700,
            judgementLine: 4,
        }

        this.color = {
            nodeRoute: 0xffffff,
            pressednodeRoute: 0x00CCFF,
            node: 0x00ffaa,
            judgementLine: 0xFF0066,
            
        }
    }
}
