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
        const newNote = this.classToRect(new Note(100, 'd', 0));
        this.notes.push(newNote);
    }

    update() {
        this.noteSlide(this.notes);
    }

    noteSlide(notes) {
        for (const note of notes) {
            if (note.rect.y < 600) {
                note.rect.y += 5;
            }
            if ( note.rect.y == 600){
                note.rect.destroy();
            }
        }
    }

    classToRect(note) {
        // 노트를 생성하고 노트의 정보를 보유한 객체를 반환합니다.
        const rect = this.add.rectangle(this.xPositionToKey(note.key), 0, 100, 40, 0xaaa000);
        return { note, rect };
    }

    xPositionToKey(keyName) {
        switch (keyName) {
            case 'd':
                return 123;
            case 'f':
                return 234;
            case 'j':
                return 456;
            case 'k':
                return 567;
        }
    }
}

class Note {
    constructor(startTime, key, pressTime) {
        this.index = Note.index++;
        this.startTime = startTime;
        this.key = key;
        this.pressTime = pressTime;
    }
}

// Note 클래스의 정적 속성으로 index를 추가
Note.index = 0;
