import Node from './Node'

class Nodes{
    constructor(){
        this.nodes = [];
    }

    createNode(startTime, key, pressTime){
        const newNode = new Node(startTime, key, pressTime);
        this.nodes.push(newNode);
        return this.nodes;
    }
    
    forEach(callback) {
        this.nodes.forEach(callback);
      }
}

export default Nodes