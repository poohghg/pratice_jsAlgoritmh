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
  // 넓이 우선탐색
  BFS(start) {
    if (!this.list[start]) return;
    const visited = {};
    const queue = [];
    queue.push(start);

    let currVertex;
    while (queue.length) {
      currVertex = queue.shift();
      if (!visited[currVertex]) {
        visited[currVertex] = true;
        for (const neighbor of this.list[currVertex]) {
          queue.push(neighbor);
        }
      }
      // currVertex.forEach
    }
    return Object.keys(visited);
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
// console.log(g.DFS('A'));
console.log(g.BFS('A'));
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
// console.log(
//   solution_2(5, 9, [
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
// console.log(
//   solution_3([
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 1, 1, 0],
//     [0, 0, 0, 1, 0, 0, 0],
//     [1, 1, 0, 1, 0, 1, 1],
//     [1, 1, 0, 0, 0, 0, 1],
//     [1, 1, 0, 1, 1, 0, 0],
//     [1, 0, 0, 0, 0, 0, 0],
//   ]),
// );
/**
 * 현수는 송아지를 잃어버렸다. 다행히 송아지에는 위치추적기가 달려 있다.
 * 현수의 위치와 송아 지의 위치가 수직선상의 좌표 점으로 주어지면 현수는 현재 위치에서 송아지의 위치까지 다음 과 같은 방법으로 이동한다.
 * 송아지는 움직이지 않고 제자리에 있다.현수는 스카이 콩콩을 타고 가는데 한 번의 점프로 앞으로 1, 뒤로 1, 앞으로 5를 이동할 수 있다.
 * 최소 몇 번의 점프로 현수가 송아지의 위치까지 갈 수 있는지 구하는 프로그램을 작성 하세요.
 */
function solution_4(s, e) {
  // let answer = 0;
  const moves = [-1, 1, 5];
  const distance = Array.from({ length: 10001 });

  distance[s] = 0;
  const visited = { s: true };
  const queue = [s];

  let currValue;
  let newDistance;
  while (queue.length) {
    currValue = queue.shift();
    for (const x of moves) {
      newDistance = currValue + x;
      if (newDistance === e) {
        return distance[currValue] + 1;
      }
      if (!visited[newDistance]) {
        visited[newDistance] = true;
        distance[newDistance] = distance[currValue] + 1;
        queue.push(newDistance);
      }
    }
    // break;
  }
}
// console.log(solution_4(5, 14));

/**
 * N*N의 섬나라 아일랜드의 지도가 격자판의 정보로 주어집니다.
 * 각 섬은 1로 표시되어 상하좌 우와 대각선으로 연결되어 있으며, 0은 바다입니다.
 * 섬나라 아일랜드에 몇 개의 섬이 있는지 구하는 프로그램을 작성하세요.
 */
// BFS
function solution_5(n, arr) {
  let answer = 0;
  const dx = [-1, 0, 1, 0, -1, 1, 1, -1];
  const dy = [0, 1, 0, -1, -1, 1, -1, 1];
  const queue = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === 1) {
        arr[i][j] = 0;
        queue.push([i, j]);
        while (queue.length) {
          let [tmpx, tmpy] = queue.shift();
          for (let k = 0; k < dx.length; k++) {
            let nx = tmpx + dx[k];
            let ny = tmpy + dy[k];
            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
            if (arr[nx][ny] === 1) {
              arr[nx][ny] = 0;
              queue.push([nx, ny]);
            }
          }
        }
        answer++;
      }
    }
  }
  return answer;
}

// DFS
function solution_6(n, arr) {
  let answer = 0;
  const dx = [-1, 0, 1, 0, -1, 1, 1, -1];
  const dy = [0, 1, 0, -1, -1, 1, -1, 1];

  function travers(x, y) {
    for (let i = 0; i < dx.length; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      if (arr[nx][ny] === 1) {
        arr[nx][ny] = 0;
        travers(nx, ny);
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === 1) {
        arr[i][j] = 0;
        travers(i, j);
        answer++;
      }
    }
  }
  return answer;
}

console.log(
  solution_6(7, [
    [1, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
  ]),
);
