export default class Score{

    static score = 0;
    static instance = null;

    constructor(scene){
        if(Score.instance){
            return Score.instance;
        }

        this.scene = scene;
        this.score = this;

        return this;
    }

    loadScore(){
        this.scoreObject = this.scene.add.text(100, 750, this.score, {fill: '#000000'})
        .setOrigin(0.5)
        .setFontSize(40);

        return this.scoreObject;
    }

    addScroe(input){
        this.score += input;
    }

    resetScore(){
        this.score = 0;
    }
}