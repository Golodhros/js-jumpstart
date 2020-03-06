const STATE_UNDISCOVERED = 'undiscovered';
const STATE_DISCOVERED = 'discovered';
const STATE_PROCESSED = 'processed';


// Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
const breadthFirstSearch = (graph, startNode, endNode) {
    if (startNode === endNode) {
        return true;
    }

    let nodeQueue = [];
    graph.markNodesStateAs(STATE_UNDISCOVERED);
    nodeQueue.push(startNode);

    while(nodeQueue.length) {
        let node = nodeQueue.pop();

        if (node !== null) {
            let adjacentNodes = node.getAdjacentNodes();

            adjacentNodes.forEach((n) => {

                if (n.getState() === STATE_UNDISCOVERED) {
                    if (n === endNode) {
                        return true;
                    } else {
                        n.setState(STATE_DISCOVERED);
                        nodeQueue.push(n);
                    }
                }
            });
            node.setState(STATE_PROCESSED);
        }
    }

    return false;
}


class Graph {
    constructor(nodes = []) {
        this.nodes = nodes;
    }

    addNode(node) {
        this.nodes.push(node);
    }

    markNodesStateAs(newState) {
        this.nodes.forEach((n) => n.setState(newState));
    }
}

class GraphNode {
    constructor(name) {
        this.name = name;
        this.state = STATE_UNDISCOVERED;
        this.adjacents = [];
    }

    setState(newState) {
        this.state = newState;
    }

    getState() {
        return this.state;
    }

    getAdjacentNodes() {
        return this.adjacents;
    }
}


let g = new Graph();
let a = new GraphNode('a');
let b = new GraphNode('b');
let c = new GraphNode('c');
let d = new GraphNode('d');
let e = new GraphNode('e');

g.addNode()