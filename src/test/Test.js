import Phaser from "phaser";

export default class Test extends Phaser.Scene{
    constructor(){
        super('test');
    }

    preload() {
        this.load.image('note', '../asset/img/loadingBackground2.jpg');
    }

    create() {
        // 노트를 생성합니다.
        this.note = this.add.sprite(400, 100, 'note');
        this.note.setScale(1, 5); // 노트의 길이를 설정합니다.
    
        // 판정을 나타내는 텍스트를 생성합니다.
        this.judgementText = this.add.text(400, 200, '', { fontSize: '32px', fill: '#ffffff' });
        this.judgementText.setOrigin(0.5);
    
        // 게임 입력을 받습니다. 여기서는 예시로 스페이스바를 사용합니다.
        this.input.keyboard.on('keydown-SPACE', this.checkInput, this);
    }
    
    update() {
        // 여기서는 게임 업데이트 로직을 추가할 수 있습니다.
    }
    
    checkInput() {
        // 노트와 플레이어 입력이 일치하는지 확인합니다.
        let overlap = Phaser.Geom.Intersects.RectangleToRectangle(this.note.getBounds(), this.input.activePointer.getBounds());
    
        if (overlap) {
            // 노트와 입력이 겹칠 경우, 판정을 보여줍니다.
            this.judgementText.setText('Perfect!'); // 판정에 따라 텍스트를 변경할 수 있습니다.
        } else {
            // 노트와 입력이 겹치지 않을 경우, 판정을 보여줍니다.
            this.judgementText.setText('Miss!');
        }
    }
}