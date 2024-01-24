import Phaser from "phaser";

export default class Test3 extends Phaser.Scene {
    constructor() {
        super('test3');
        this.notes = [];
        this.judgementTexts = [];
    }

    create() {
        this.judgementBar = this.add.rectangle(100, 600, 1000, 10, 0xffffff).setOrigin(0, 0);
        this.createMultipleNotes();
        this.createJudgementTexts();

        // 키보드 이벤트 핸들링을 위해 Phaser.Input.Keyboard.Key 객체 생성
        this.keys = this.input.keyboard.addKeys({
            D: Phaser.Input.Keyboard.KeyCodes.D,
            F: Phaser.Input.Keyboard.KeyCodes.F,
            J: Phaser.Input.Keyboard.KeyCodes.J,
            K: Phaser.Input.Keyboard.KeyCodes.K
        });
    }

    update() {
        this.updateNotes();
        this.checkNearbyNotes();
        this.handleKeyPress();
    }

    createMultipleNotes() {
        const noteCount = 10;
        const startTimeGap = 500; // 각 노트 사이의 간격

        for (let i = 0; i < noteCount; i++) {
            const startTime = 1000 + i * startTimeGap;
            const key = ['D', 'F', 'J', 'K'][i % 4]; // 각 노트에 대해 다양한 키 사용

            this.makeNotes(startTime, key);
        }
    }

    makeNotes(startTime, key) {
        setTimeout(() => {
            const note = this.add.rectangle(this.xPositionToKey(key), 30, 100, 40, 0xffffff);
            this.notes.push({ note, key });
        }, startTime);
    }

    xPositionToKey(keyName) {
        switch (keyName) {
            case 'D':
                return 123;
            case 'F':
                return 234;
            case 'J':
                return 456;
            case 'K':
                return 567;
            default:
                return 0;
        }
    }

    updateNotes() {
        const fallSpeed = 5; // 노트가 떨어지는 속도

        for (let i = 0; i < this.notes.length; i++) {
            const { note } = this.notes[i];
            note.y += fallSpeed;
        }
    }

    checkNearbyNotes() {
        const threshold = 20; // 600에 가까운지 확인할 임계값

        for (let i = 0; i < this.notes.length; i++) {
            const { note, key } = this.notes[i];

            // 노트의 y 값이 600에 가까우면 해당 노트의 처리를 수행
            if (note.y >= 600 - threshold && note.y <= 600 + threshold) {
                // 여기서 원하는 처리를 수행
                const judgementResult = this.checkJudgement(key, note.x);
                this.displayJudgement(judgementResult);
            }
        }
    }

    checkJudgement(key, noteX) {
        const keyPositions = {
            'D': 123,
            'F': 234,
            'J': 456,
            'K': 567
        };

        const positionDifference = Math.abs(keyPositions[key] - noteX);

        // 원하는 위치 판정 기준을 설정하고 조절하세요
        if (positionDifference < 20) {
            return 'Perfect';
        } else if (positionDifference < 40) {
            return 'Great';
        } else if (positionDifference < 60) {
            return 'Good';
        } else {
            return 'Miss';
        }
    }

    createJudgementTexts() {
        // 여러 판정 결과에 대한 텍스트 생성 및 초기화
        const textPositions = {
            'Perfect': { x: 100, y: 50 },
            'Great': { x: 100, y: 100 },
            'Good': { x: 100, y: 150 },
            'Miss': { x: 100, y: 200 }
        };

        for (const result in textPositions) {
            const { x, y } = textPositions[result];
            const judgementText = this.add.text(x, y, result, { fontSize: '24px', fill: '#ffffff' });
            judgementText.setVisible(false);
            this.judgementTexts.push(judgementText);
        }
    }

    displayJudgement(result) {
        // 판정 텍스트를 표시하고 몇 초 후에 감추기
        const judgementText = this.judgementTexts.find(text => text.text === result);

        judgementText.setVisible(true);

        setTimeout(() => {
            judgementText.setVisible(false);
        }, 1000);
    }

    handleKeyPress() {
        // 키보드 이벤트 핸들링
        if (this.keys.D.isDown) {
            this.checkKeyJudgement('D');
        } else if (this.keys.F.isDown) {
            this.checkKeyJudgement('F');
        } else if (this.keys.J.isDown) {
            this.checkKeyJudgement('J');
        } else if (this.keys.K.isDown) {
            this.checkKeyJudgement('K');
        }
    }

    checkKeyJudgement(key) {
        // 현재 떨어지는 노트 중에서 해당 키에 해당하는 노트가 있는지 확인하여 판정 수행
        const targetNote = this.notes.find(note => note.key === key && note.note.y >= 600);

        if (targetNote) {
            const judgementResult = this.checkJudgement(targetNote.key, targetNote.note.x);
            this.displayJudgement(judgementResult);

            // 노트 처리 후에 해당 노트 삭제
            const noteIndex = this.notes.indexOf(targetNote);
            this.notes.splice(noteIndex, 1);
            targetNote.note.destroy();
        }
    }
}
