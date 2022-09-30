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

// const t = Array.from(Array(5), () => Array(5).fill(0));
// console.log(t);

// https://sarah950716.tistory.com/12
// 노드의 수가많아지면 인접리스트를 사용
// 인접리스트의 경우 전체 노드를 순회할 필요가 없음
// 그러나 두 노드가 연결되어 있는지 확인시 좋지 않음

/**
 * 방향그래프가 주어지면 1번 정점에서 N번 정점으로 가는 모든 경로의 가지 수를 출력하는 프 로그램을 작성하세요.
 * 아래 그래프에서 1번 정점에서 5번 정점으로 가는 가지 수는
 */

// 인접리스트
function solution_1(N, M, info) {
  const list = {};
  for (let [vertex, edge] of info) {
    if (!list[vertex]) list[vertex] = [];
    list[vertex].push(edge);
  }
  let answer = [];
  const visited = {};
  const path = [];

  console.log(list);
  function travers(vertex) {
    path.push(vertex);
    visited[vertex] = true;
    if (vertex === 5) {
      answer.push(path.slice());
      return;
    }
    for (const x of list[vertex]) {
      if (!visited[x]) {
        travers(x);
        visited[x] = false;
        path.pop();
      }
    }
  }
  travers(1);
  console.log(answer);
}

// console.log(
//   solution_1(5, 9, [
//     [1, 2],
//     [1, 3],
//     [1, 4],
//     [2, 1],
//     [2, 3],
//     [2, 5],
//     [3, 4],
//     [4, 2],
//     [4, 5],
//   ]),
// );
// 인접행렬
function solution_2(N, M, info) {
  let answer = 0;
  const list = Array.from(Array(N + 1), () => Array(N + 1).fill(0));
  const visited = {};
  for (const [a, b] of info) {
    list[a][b] = 1;
  }
  console.log(list);
  function travers(vertex) {
    if (vertex === 5) {
      answer++;
      return;
    }
    for (let i = 1; i < N + 1; i++) {
      if (list[vertex][i] === 1 && !visited[vertex]) {
        visited[vertex] = true;
        travers(i);
        visited[vertex] = false;
      }
    }
  }
  travers(1);
  return answer;
}
console.log(
  solution_2(5, 9, [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 1],
    [2, 3],
    [2, 5],
    [3, 4],
    [4, 2],
    [4, 5],
  ]),
);

/**
 * 7*7 격자판 미로를 탈출하는 경로의 가지수를 출력하는 프로그램을 작성하세요.
 * 출발점은 격 자의 (1, 1) 좌표이고, 탈출 도착점은 (7, 7)좌표이다. 격자판의 1은 벽이고, 0은 통로이다.
 * 격 자판의 움직임은 상하좌우로만 움직인다. 미로가 다음과 같다면
 */

function solution_3(info, start = [1, 1], end = [7, 7]) {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const visited = Array.from(Array(info.length), () =>
    Array(info.length).fill(0),
  );
  let [endX, endY] = end;
  let answer = 0;
  const path = [];

  function travers(x, y) {
    visited[x][y] = 1;
    path.push({ x, y });
    if (endX - 1 === x && endY - 1 === y) {
      console.log(path);
      answer++;
      return;
    }
    for (let i = 0; i < 4; i++) {
      let cX = x - dx[i];
      let cY = y - dy[i];
      if (cX < 0 || cX >= info.length || cY < 0 || cY >= info.length) continue;
      if (info[cX][cY] === 0 && visited[cX][cY] === 0) {
        // console.log('cX', cX, 'cY', cY);
        travers(cX, cY);
        visited[cX][cY] = 0;
        path.pop();
      }
    }
  }
  let [startX, startY] = start;
  travers(startX - 1, startY - 1);
  console.log(answer);
}

console.log(
  solution_3([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
  ]),
);
