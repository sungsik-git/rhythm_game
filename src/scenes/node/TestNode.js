export default class TestNode{
    static nodeNumber = 1;

    constructor(key, startTime, endTime){
        this.nodeNumber = Node.nodeNumber++;
        this.key = key;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isPressed = false;
    }   
}