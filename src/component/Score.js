export default class Score {
    static instance = null;

    constructor(scene) {
        this.scene = scene
    }

    loadScore() {
        this.scoreObject = this.scene.add.text(100, 750, this.score, { fill: '#000000' })
            .setOrigin(0.5)
            .setFontSize(40);
    }

    addScore(input) {
        this.score += input;
    }

    resetScore() {
        this.score = 0;
    }
}
