export default class Coordinate {
    constructor() {
        this.xPosit = {
            width : window.game.config.width,
            center: window.game.config.width / 2,
            keyD: window.game.config.width / 5,
            keyF: window.game.config.width * 1 / 5,
            keyJ: window.game.config.width * 2 / 5,
            keyK: window.game.config.width * 3 / 5,
            centerLeft: window.game.config.width / 2 - 100,
        };

        this.yPosit = {
            height : window.game.config.height,
            center: window.game.config.height / 2,
            centerBottom: window.game.config.height * 3 / 4,
            centerBottomMore: window.game.config.height * 5 / 6,
        }
    }
}
