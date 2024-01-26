export default class Coordinate {
    constructor() {
        this.xPosit = {
            width: window.game.config.width,
            center: window.game.config.width / 2,
            centerLeft: window.game.config.width / 2 - 100,

            // Position of node and node route
            keyD: 400,
            keyF: 505,
            keyJ: 610,
            keyK: 715,

        };

        this.yPosit = {
            height: window.game.config.height,
            center: window.game.config.height / 2,
            centerBottom: window.game.config.height * 3 / 4,
            centerBottomMore: window.game.config.height * 5 / 6,
            nodeRouteOrigin: 100,
            judgementLine: 600,
        }

        this.width = {
            node: 100,
        }

        this.height = {
            node: 40,
            nodeRoute: 600,
        }

        this.color = {
            nodeRoute: 0xffffff,
            pressednodeRoute: 0x00CCFF,
            node: 0x00ffaa,
        }
    }
}
