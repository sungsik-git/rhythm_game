import Phaser from "phaser";
import Coordinate from "../theme/Coordinate";

export default class Test extends Phaser.Scene {
    constructor() {
        super('test');
        this.score = 0;
        this.colliders = [];
        this.notes = [];
        this.lastNoteIndex = 0;
        this.timeToFall = 1000;
        this.notesTimestamps = [{"timestamp":833},{"timestamp":859},{"timestamp":1053},{"timestamp":1108},{"timestamp":1242},{"timestamp":1299},{"timestamp":1448},{"timestamp":1480},{"timestamp":1616},{"timestamp":1649},{"timestamp":1805},{"timestamp":1865},{"timestamp":2010},{"timestamp":2092},{"timestamp":2223},{"timestamp":2253},{"timestamp":2405},{"timestamp":2494},{"timestamp":2593},{"timestamp":2684},{"timestamp":2786},{"timestamp":2839},{"timestamp":3009},{"timestamp":3122},{"timestamp":3281},{"timestamp":3407},{"timestamp":3525},{"timestamp":3623},{"timestamp":3723},{"timestamp":3867},{"timestamp":3980},{"timestamp":4031},{"timestamp":4173},{"timestamp":4259},{"timestamp":4415},{"timestamp":4476},{"timestamp":4689},{"timestamp":4723},{"timestamp":4892},{"timestamp":4926},{"timestamp":4975},{"timestamp":5483},{"timestamp":5559},{"timestamp":5644},{"timestamp":5730},{"timestamp":5815},{"timestamp":5899},{"timestamp":5980},{"timestamp":6064},{"timestamp":6147},{"timestamp":6232},{"timestamp":6313},{"timestamp":6398},{"timestamp":6482},{"timestamp":6565},{"timestamp":6648},{"timestamp":6733},{"timestamp":6816},{"timestamp":6898},{"timestamp":6982},{"timestamp":7065},{"timestamp":7148},{"timestamp":7232},{"timestamp":7317},{"timestamp":7402},{"timestamp":7483},{"timestamp":7569},{"timestamp":7652},{"timestamp":7733},{"timestamp":7821}];
        this.startTime = Date.now();
    }

    preload() {
        
    }

    create() {
        let coordinate = new Coordinate();
        
        // Create judgementBar
        let judgementBar = this.add.rectangle(this.game.config.width / 12, 600, 1000, 10, 0xffffff);
        judgementBar.setOrigin(0, 0);

        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        this.scoreText = this.add.text(100, 100, "SCORE", { fontFamily: "arial", fontSize: "20px" });
    }

    update() {
        this.spawnNotes();
        if (this.keyD.isDown) {
            this.handlePlayerInput(this.keyD)
        }
        if (this.keyF.isDown) {
            this.handlePlayerInput(this.keyF)
        }
        if (this.keyJ.isDown) {
            this.handlePlayerInput(this.keyJ)
        }
        if (this.keyK.isDown) {
            this.handlePlayerInput(this.keyK)
        }
    }

    handlePlayerInput(keyName){
        let collider = this.add.circle(this.game.config.width / 2, 1000, 30, 0xaaaaff)
        this.physics.add.existing(collider);

        this.tweens.add({
            targets: collider,
            scale: 4,
            duration: 100,
            alpha: 0,
            onComplete: () => {
                collider.destroy();
                if (collider.collided != true) {
                    this.cameras.main.shake(50, 0.005);
                    this.score -= 200;
                    this.updateScoreText();
                }
            }
        });
    }

    updateScoreText(){
        this.scoreText.text = this.score;
    }

    checkNoteCollisions(){
        this.physics.overlap(this.colliders, this.notes, (collider, note) => {
            // the collider collided
            collider.collided = true;

            // remove the collider from list
            this.colliders.splice(this.colliders.indexOf(collider), 1);

            // destroy the note and remove from list
            note.destroy();
            this.notes.splice(this.notes.indexOf(note), 1);

            // increase the score and update the text
            this.score += 100;
            this.updateScoreText();
        });
    }

    spawnNotes(keyName) {
        // lets look up to the 10 next notes and spawn if needed
        for (let i = this.lastNoteIndex; i < this.lastNoteIndex + 10; i++) {
            let note = this.notesTimestamps[i];
            if (!note) break;

            // Spawn note if: is not already spawned, and the timing is right. From the start of the song, we need to consider the time it takes for the note to fall so we start it at the timestamp minus the time to fall
            if (
                note.spawned != true
                && note.timestamp <= Date.now() - this.startTime + this.timeToFall
            ) {
                this.spawnNote(keyName);
                this.lastNoteIndex = i;
                note.spawned = true;
            }
        }
    }

    spawnNote(keyName) {
        // This is self explanatory. Spawn the note and let it fall to the bottom.
        let note = this.add.circle(100, 0, 20, 0xffff00).setOrigin(0.5, 0.5);
        this.notes.push(note);
        this.physics.add.existing(note);
        this.physics.moveTo(note, 100, 1000, null, this.timeToFall);
    }
    
    

    xPositionToKey(keyName){
        switch(keyName){
            case 'd' :
                return 123;
            case 'f' :
                return 234;
            case 'j' :
                return 456;
            case 'k' :
                return 567;
        }
    }
}
