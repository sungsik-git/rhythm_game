import Node from './Node'

class Nodes{
    constructor(){
        this.nodes = [];
    }

    createNode(startTime, key, pressTime){
        this.nodes.push(new Node(startTime, key, pressTime)); 
    }
}

export default Nodes