import Nodes from './Nodes';

class NodeManager {

    constructor(gameNodes){
        this.gameNodes = gameNodes
    }

    makeNodes(){
        const lines = this.gameNodes.split('\n');
        console.log(lines)
    }
    // 곡 id에 맞는 노드파일을 가져와서 nodes 로 만들고, 게임 씬에 뿌려주는 역할까지
    // async makeNodes(filePath) {
    //     const response = await fetch(filePath);
    //     const data = await response.text();

    //     const nodes = new Nodes();
    //     const lines = data.split('\n');
        
    //     lines.forEach(line => {
    //         const [startTime, key, pressTime] = line.replace(/[{}]/g, '').split(',').map(item => item.trim());
    //         nodes.createNode(parseInt(startTime), key, parseInt(pressTime));
    //     });

    //     return nodes;
    // }
}

export default NodeManager;