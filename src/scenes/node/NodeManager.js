import Nodes from './Nodes';

class NodeManager {

    constructor(gameNodes, routeXPosition){
        this.gameNodes = gameNodes;
        this.routeXPosition = routeXPosition;
    }

    makeNodes(){
        const nodes = new Nodes();
        const lines = this.gameNodes.split('\n');
        
        lines.forEach(line => {
            const [startTime, key, pressTime] = line.replace(/[{}]/g, '').split(',').map(item => item.trim());
            nodes.createNode(parseInt(startTime), key, parseInt(pressTime));
        });

        return nodes;
    }

    //node에 기록된 key 값에 맞도록 node의 x 값을 조절함
    calcNodeXPosit(key) {
        switch(key){
            case 's' : 
                return this.routeXPosition.keyS_X_Posit -50;
            case 'd' :
                return this.routeXPosition.keyD_X_Posit-50
            case 'f' :
                return this.routeXPosition.keyF_X_Posit-50;
            case 'space' :
                return this.routeXPosition.keySpace_X_Posit-50;
            case 'j' :
                return this.routeXPosition.keyJ_X_Posit-50;
            case 'k' :
                return this.routeXPosition.keyK_X_Posit-50;
            case 'l' :
                return this.routeXPosition.keyL_X_Posit-50;
            default:
                console.error(`Unexpected key: ${key}`);
                return 0; 
        }
    }
}

export default NodeManager;