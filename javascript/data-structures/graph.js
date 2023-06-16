// Ref: https://ivov.dev/notes/revisiting-data-structures-in-javascript

class Graph {
    constructor() {
        this.adjList = {};
    }

    addVertex(vertex) {
        if (!this.adjList[vertex]) {
            this.adjList[vertex] = [];

            return true;
        }

        return false;
    }

    addEdge(vertex1, vertex2) {
        if (this.adjList[vertex1] && this.adjList[vertex2]) {
            this.adjList[vertex1].push(vertex2);
            this.adjList[vertex2].push(vertes1);

            return true;
        }

        return false;
    }

    removeEdge(vertex1, vertex2) {
        if (this.adjList[vertex1] && this.adjList[vertex2]) {
            this.adjList[vertex1] = this.adjList[vertex1].filter(
                (v) => v !== vertex2
            );
            this.adjList[vertex2] = this.adjList[vertex2].filter(
                (v) => v !== vertex1
            );

            return true;
        }

        return false;
    }

    removeVertex(vertex) {
        if (!this.adjList[vertex]) {
            return undefined;
        }

        // remove all edges
        while (this.adjList[vertex].length) {
            let current = this.adjList[vertex].pop();

            this.removeEdge(vertex, current);
        }

        // remove vertex
        delete this.adjList[vertex];

        return this;
    }
}
