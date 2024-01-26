export default class Coordinate {
    constructor() {
        this.xPosit = {
            width : window.game.config.width,
            center: window.game.config.width / 2,
            keyD: 400,
            keyF: 505,
            keyJ: 610,
            keyK: 715,
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
