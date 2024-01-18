import Phaser from "phaser";
import NodeManager from "./NodeManager";
import NodeFile from "../../asset/textNode/SampleNode1.txt";

export default class Test extends Phaser.Scene {
    constructor() {
        super('test');
        this.notes = []; 
        this.judgementLine = 600;
        this.timeToFall = 1000;
        this.notesTimestamps = [
            { timestamp: 100 },
            { timestamp: 200 },
            { timestamp: 300 },
            { timestamp: 400 },
            { timestamp: 500 },
            { timestamp: 600 },
            { timestamp: 700 },
            { timestamp: 800 },
            { timestamp: 900 },
            { timestamp: 1000 }
        ];
        
        this.lastNoteIndex = 0;
        this.keySpace = null;
        this.colliders = []; 
        this.score = 0; 
    }

    preload() {
        this.load.text('nodeFile', NodeFile);
        
    }

    create() {
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.startTime = Date.now()
        this.noteBar = this.add.rectangle(1920 / 2, 1000, 1920, 10, 0xff0000);
        this.scoreText = this.add.text(100, 100, "SCORE", { fontFamily: "arial", fontSize: "100px", color: "0x000000"});
        this.helpText = this.add.text(1920 / 2, 1050, "Press SPACEBAR when yellow dots are on the red line", { fontFamily: "arial", fontSize: "50px" });
        this.helpText.setOrigin(0.5, 0.5);
    }


    update() {
        this.handlePlayerInput();
        this.spawnNotes();
        this.checkNoteCollisions();
       
    }
    checkNoteCollisions() {
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

    updateScoreText() {
        this.scoreText.text = this.score;
    }

    checkNoteCollisions() {
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

    handlePlayerInput() {
        if (this.keySpace.isDown) {
            // we create a new collider at the position of the red bar
            let collider = this.add.circle(1920 / 2, 1000, 30, 0xaaaaff);

            // attach physics
            this.physics.add.existing(collider);

            // little tween to grow
            this.tweens.add({
                targets: collider,
                scale: 4,
                duration: 100,
                alpha: 0,
                onComplete: () => {
                    collider.destroy();

                    // If the collider did not hit a note, its a miss, so lets lower the score
                    if (collider.collided != true) {
                        this.cameras.main.shake(100, 0.01);
                        this.score -= 200;
                        this.updateScoreText();
                    }
                }
            });

            // add the collider to the list
            this.colliders.push(collider);
        }
    }
    
    spawnNotes() {
        // lets look up to the 10 next notes and spawn if needed
        for (let i = this.lastNoteIndex; i < this.lastNoteIndex + 10; i++) {
            let note = this.notesTimestamps[i];
            if (!note) break;

            // Spawn note if: is not already spawned, and the timing is right. From the start of the song, we need to consider the time it takes for the note to fall so we start it at the timestamp minus the time to fall
            if (
                note.spawned != true
                && note.timestamp <= Date.now() - this.startTime + this.timeToFall
            ) {
                this.spawnNote();
                this.lastNoteIndex = i;
                note.spawned = true;
            }
        }
    }

    spawnNote() {
        // This is self explanatory. Spawn the note and let it fall to the bottom.
        let note = this.add.circle(1920 / 2, 0, 20, 0xffff00);
        this.notes.push(note);
        this.physics.add.existing(note);
        this.physics.moveTo(note, 1920 / 2, 1000, null, this.timeToFall);
    }
}
