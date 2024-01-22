/*
- [ ]  노드 생성
- [ ]  노드 움직임
- [ ]  노드 소멸
- [ ]  판정선
- [ ]  노드 판정
- [ ]  점수 반영 */

import Phaser from "phaser";

export default class Test2 extends Phaser.Scene {
    constructor() {
        super('test2');
        this.notes = [];
    }

    preload() {
        // 필요한 경우에 preload 코드 추가
    }

    create() {
        this.notes.push(this.classToRect(new Note(100, 'd', 0)));
        this.notes.push(this.classToRect(new Note(300, 'f', 0)));
        this.notes.push(this.classToRect(new Note(500, 'd', 0)));
        this.notes.push(this.classToRect(new Note(700, 'j', 0)));
        this.notes.push(this.classToRect(new Note(900, 'k', 0)));
        this.notes.push(this.classToRect(new Note(1100, 'd', 0)));

        this.judgementLine = this.add.rectangle(100, 600, 1000, 10, 0xffffff)
        this.judgementLine.setOrigin(0, 0);

        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {

        this.noteSlide(this.notes);

        for(const note of this.notes){
            if(this.keyD.isDown){
                this.judgementNote(note)
            }
        }
    }

    noteSlide(notes) {
        for (const note of notes) {
            setTimeout(() => {
                if (note.rect.y < 600) {
                    note.rect.y += 5;
                }
            }, note.note.startTime);


            if ( note.rect.y == 600){
                note.rect.destroy();
            }
        }
    }

    classToRect(note) {
        const rect = this.add.rectangle(this.xPositionToKey(note.key), 0, 100, 40, 0xaaa000);
        return { note, rect };
    }

    xPositionToKey(keyName) {
        switch (keyName) {
            case 'd':
                return 223;
            case 'f':
                return 334;
            case 'j':
                return 556;
            case 'k':
                return 667;
        }
    }

    judgementNote(note){
        if(note.rect.y >= 600){

        }
    }
}

class Note {
    static index = 0;
    constructor(startTime, key, pressTime) {
        this.index = Note.index++;
        this.startTime = startTime;
        this.key = key;
        this.pressTime = pressTime;
    }
}


