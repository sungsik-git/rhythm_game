import Phaser from "phaser";
import NodeManager from "../node/NodeManager";
import Coordinate from "../theme/Coordinate";
import KeyboardEvent from "../input/KeyboardEvent";
import GameInfoUI from "../interface/GameInfoUI";
import RouteOfKey from "../interface/RouteOfKey";
import effect from "../asset/img/effect.png";
import VaildateDevice from "../theme/ValidateDevice";
import MobileTouchEvent from "../input/MobileTouchEvent";
import ModalManager from "../modal/ModalManager";


export default class Game extends Phaser.Scene {
    init(data) {
        this.musicInfo = data.musicInfo;
        this.currentIndex = data.currentIndex;
    }

    constructor() {
        super('game');
        this.speed = 5;
        this.nodeDelay = 500;

        this.nodesClass = [];
        this.nodes = [];
        this.yOfJudgementLine = 600;
        this.maxYNode = null;
        this.combo = 0;
        this.score = 0;
        this.judgementText = null;
        this.bgm = null;


        //theme
        this.coordinate = new Coordinate();        

        this.isPause = false;
        this.isGameStarted = false;
        this.isFever = false;
        this.onModal = false;
    }

    preload() {
        // Game Score, Combo, Judgement Reset
        this.resetGameState();
        
        // Load the background music (BGM)
        this.load.audio('bgm', this.musicInfo.musicPath);
    
        // Load the node file
        this.load.text('nodeFile', this.musicInfo.nodeFilePath);

        // Load the effec img
        this.load.image('effect', effect)
    }

    create() {
        // Countdown
        this.countdownText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '3', {
            fontSize: '64px',
            fill: '#FFFFFF'
        }).setOrigin(0.5, 0.5);
        this.startCountdown(3);

        // Load the nodes
        let nodeFileKey = 'nodeFile';
        if (this.cache.text.has(nodeFileKey)) {
            this.nodeFile = this.cache.text.get(nodeFileKey);
            this.cache.text.remove(nodeFileKey);
        }
        this.nodeManager = new NodeManager(this, this.nodeFile, this.isPause);
        this.nodesClass = this.nodeManager.makeClassFromText();
        this.nodes = this.nodeManager.makeRectFromClass();
        this.bgm = this.sound.add('bgm', { loop: false });
        this.pauseTime = 0;
       
        // Load mene button and modal popup function
        let modalManager = new ModalManager(this);
        modalManager.initialize(this.bgm, this.nodeManager);

        // load to keyboard event
        this.keyboardEvent = new KeyboardEvent(this);
        this.keyboardEvent.loadGameKey();
        
        const validateDevice = new VaildateDevice(this);
        this.isMobile = false;
        this.isMobile = validateDevice.isDevice()
        if(this.isMobile){
            const touchEvents = new MobileTouchEvent(this);
            touchEvents.loadTouchScreen();
        }
    
        // make to nodeRoute 
        ['D', 'F', 'J', 'K'].forEach(key => {
            const route = new RouteOfKey(this, 'key' + key);
            this['routeOfKey' + key] = route.createRoute();
            route.createKeyInfo();
        });
        

        // make judgement line
        this.judgementLine = this.add.rectangle(
            this.coordinate.xPosit.keyD,
            this.coordinate.yPosit.judgementLine,
            this.coordinate.width.judgementLine,
            this.coordinate.height.judgementLine,
            this.coordinate.color.judgementLine
        ).setOrigin(0);

        // Load game info
        const gameInfoUI = new GameInfoUI(this, this.musicInfo);
        gameInfoUI.loadGameInfoBar();
        gameInfoUI.loadGameInfo();


        // show judgement text
        this.judgementTextObject = this.add.text(100,100,this.judgementText,{ fill: '#000000' })
            .setOrigin(0.5);
        this.comboObject = this.add.text(100, 200, this.combo, {fill: '#000000'})
            .setOrigin(0.5);
        this.scoreObject = this.add.text(100, 730, this.score, {fill: '#000000'})
            .setOrigin(0.5)
            .setFontSize(40);
        this.feverObject = this.add.text(100, 300, "FEVER!", {fill: '#FF7F50'})
            .setOrigin(0.5)
            .setFontSize(30)
            .setVisible(false);

        this.bgm.on('complete', () => {
            this.time.addEvent({
                delay: 3000,
                callback: () => {
                    this.scene.stop();
                    this.scene.start('result', { score: this.score, musicInfo: this.musicInfo, combo: this.combo, judgementText: this.judgementText });
                },
                callbackScope: this
            });
        });

        this.game.events.on('blur', this.onBlur, this);
        this.game.events.on('focus', this.onFocus, this);


    }

    update() {
        //drop the nodes
        if(!this.isPause && this.isGameStarted){
            this.nodeManager.nodeSlider();
        
            this.updateJudgementText();
            this.updateCombo();
            this.updateScore();
            this.setFever();
        }   
    }

    shutdown() {
        this.game.events.off('blur', this.onBlur, this);
        this.game.events.off('focus', this.onFocus, this);
    }
    

    updateJudgementText(){
        this.judgementTextObject.setText(this.judgementText);
    }

    updateCombo(){
        this.comboObject.setText(this.combo);
        
        if(this.combo > 10){
            this.isFever = true;
        }else{
            this.isFever = false;
        }
    }

    updateScore(){
        this.scoreObject.setText(this.score);
    }

    resetGameState() {
        this.score = 0;
        this.combo = 0;
        this.judgementText = null;
        this.nodesClass = null;
        this.nodes = null;
        this.isPause = false;   
    }

    onBlur(){
        window.onblur = () => {
            if (!this.onModal) {
                this.pauseTime = this.bgm.seek;
                this.scene.launch('FocusoutModal', { scene: this, bgm: this.bgm, nodeManager: this.nodeManager, pauseTime: this.bgm.seek});
                this.scene.pause();
                this.bgm.pause();
            }
        }
    }

    onFocus(){
        window.onfocus = () => {
            if (!this.onModal) {
            this.scene.stop('FocusoutModal');
            this.bgm.play({ seek: this.pauseTime });
            this.scene.resume();
            }
        }
    }

    startCountdown(seconds) {
        let counter = seconds;

        // 타이머 이벤트 생성
        const timerEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.isGameStarted = false;
                counter--;
                this.countdownText.setText(counter.toString());
                if (counter === 0) {
                    timerEvent.remove(); 
                    this.startGame();
                    this.countdownText.setVisible(false)
                }
            },
            callbackScope: this,
            loop: true // 반복 설정
        });
    }

    startGame(){
        this.bgm.play();
        this.isGameStarted = true;
    }

    setFever(){
        if(this.isFever){
            this.feverObject.setVisible(true);
        }else{
            this.feverObject.setVisible(false);
        }
    }

    setOnModalTrue(){
        this.onModal = true;
    }

    setOnModalFalse(){
        this.onModal = false;
    }
} 
