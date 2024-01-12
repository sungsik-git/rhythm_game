class Nodes{
    constructor(){
        this.nodes = [];
    }

    createNode(startTime, key, pressTime){
        this.nodes.push(new Node(startTime, key, pressTime)); 
    }

    // playNodes(){
    //     return [...this.nodes];
    // }
}