import Node from "./Node"

class NodeManager {

    constructor(gameNodes, routeXPosition){
        this.gameNodes = gameNodes;
        this.routeXPosition = routeXPosition;
        this.nodes = [];
    }

    makeNodes(gameNodes){
        const lines = this.gameNodes.split('\n');
        
        lines.forEach(line => {
            const [startTime, key, pressTime] = line.replace(/[{}]/g, '').split(',').map(item => item.trim());
            this.nodes.push(new Node(parseInt(startTime), key, parseInt(pressTime)));
        });

        return this.nodes;
    }

        //node에 기록된 key 값에 맞도록 node의 x 값을 조절함
        calcNodeXPosit(key) {
            const halfNodeWidth = 50;
            switch(key){
                case 'd' :
                    return this.routeXPosition.keyD_X_Posit - halfNodeWidth
                case 'f' :
                    return this.routeXPosition.keyF_X_Posit - halfNodeWidth;
                case 'j' :
                    return this.routeXPosition.keyJ_X_Posit - halfNodeWidth;
                case 'k' :
                    return this.routeXPosition.keyK_X_Posit - halfNodeWidth;
                default:
                    console.error(`Unexpected key: ${key}`);
                    return 0; 
            }
        }
}

export default NodeManager;