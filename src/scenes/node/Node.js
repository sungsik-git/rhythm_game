export default class Node{
    static nodeNumber = 1;

    constructor(startTime, key, pressTime){
        this.nodeNumber = Node.nodeNumber++;
        this.startTime = startTime;
        this.key = key;
        this.pressTime = pressTime;
    }   
}