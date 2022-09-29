/**
 * 버텍스: 노드
 * 엣지: 간선(노드사이의 연걸선)
 * 가중치: 간선에 값을 부여
 * 방향: 단반향또는 양방향성
 */

class Grape {
  list = {};

  addVertex(vertex) {
    if (!this.list[vertex]) this.list[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    if (!this.list[vertex1] || !this.list[vertex2]) return;
    const setV1 = new Set(this.list[vertex1].concat(vertex2));
    const setV2 = new Set(this.list[vertex2].concat(vertex1));

    this.list[vertex1] = Array.from(setV1);
    this.list[vertex2] = Array.from(setV2);
  }

  removeEdge(vertex1, vertex2) {
    if (!this.list[vertex1] || !this.list[vertex2]) return;
    this.list[vertex1] = this.list[vertex1].filter((v) => v !== vertex2);
    this.list[vertex2] = this.list[vertex2].filter((v) => v !== vertex1);
  }

  removeVertex(vertex) {
    if (!this.list[vertex]) return;
    this.list[vertex].forEach((edge) => {
      this.removeEdge(vertex, edge);
    });
    delete this.list[vertex];
  }

  DFS(start) {
    if (!this.list[start]) return;
    const visited = {};
    const result = [];
    const t = this;
    function travers(vertex) {
      result.push(vertex);
      visited[vertex] = true;
      for (const neighbor of t.list[vertex]) {
        if (!visited[neighbor]) travers(neighbor);
      }
    }
    travers(start);
    // travers.call(Grape, start);
    return result;
  }
}

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F
const g = new Grape();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');
console.log(g.DFS('A'));

const t = Array.from(Array(5), () => Array(5).fill(0));
console.log(t);
