export default class Mixing {
    constructor(scene, numbers) {
        this.scene = scene; // scene 저장
        this.numbers = numbers;
        this.timerEvent = null;
    }

    startMixing(interval) {
        this.timerEvent = this.scene.time.addEvent({
            delay: interval,
            loop: true,
            callback: () => {
                const randomIndex = Math.floor(Math.random() * this.numbers.length);
                const randomNumber = Math.floor(Math.random() * 9) + 1;
                this.numbers[randomIndex] = randomNumber;
                this.updateNumbersDisplay(); // 숫자가 변경될 때마다 화면에 출력
            }
        });
    }

    stopMixing() {
        if (this.timerEvent) {
            this.timerEvent.destroy();
        }
    }

    updateNumbersDisplay() {
        // 숫자를 출력할 텍스트 업데이트
        this.scene.numbersText.setText(`Numbers: ${this.numbers.join(', ')}`);
    }
}
