import KeyboardEvent from "./KeyboardEvent";

export default class MobileTouchEvent {
    constructor(scene) {
        this.scene = scene;
    }

    loadTouchScreen() {
        let keyboardEvent = new KeyboardEvent(this.scene);

        this.scene.input.on('pointerdown', function (pointer) {
            this.handleTouchEvent(pointer, keyboardEvent, 'down');
        }, this);
        this.scene.input.on('pointerup', function (pointer) {
            this.handleTouchEvent(pointer, keyboardEvent, 'up');
        }, this);
    }

    handleTouchEvent(pointer, keyboardEvent, eventType) {
        let width = this.scene.game.config.width;
        let height = this.scene.game.config.height;

        let x = pointer.x;
        let y = pointer.y;

        if (y > height * 2 / 3) {
            if (x < width / 4) {
                eventType === 'down' ? keyboardEvent.handleKeyDown('d') : keyboardEvent.handleKeyUp('d');
            } else if (x < width / 2) {
                eventType === 'down' ? keyboardEvent.handleKeyDown('f') : keyboardEvent.handleKeyUp('f');
            } else if (x < width * 3 / 4) {
                eventType === 'down' ? keyboardEvent.handleKeyDown('j') : keyboardEvent.handleKeyUp('j');
            } else {
                eventType === 'down' ? keyboardEvent.handleKeyDown('k') : keyboardEvent.handleKeyUp('k');
            }
        }
    }
}
