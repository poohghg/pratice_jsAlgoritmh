// 매칭 점수
function solution1(n, lost, reserve) {
  lost.sort((a, b) => a - b);
  const res = [];
  const reserveCnt = reserve.reduce((acc, curr) => {
    acc[curr] = acc[curr]++ || 1;
    return acc;
  }, {});
  n = n - lost.length;

  for (const x of lost) {
    if (reserveCnt[x]) {
      reserveCnt[x]--;
      n++;
      continue;
    }
    res.push(x);
  }

  for (const x of res) {
    if (reserveCnt[x - 1]) {
      reserveCnt[x - 1]--;
      n++;
    } else if (reserveCnt[x + 1]) {
      reserveCnt[x + 1]--;
      n++;
    }
  }
  return n;
}
// console.log(solution_1(8, [5, 6, 7], [4, 5]));

// 명예의 전당
function solution2(k, score) {
  const addElement = (ele) => {
    let isBreak = false;
    for (let i = rank.length - 1; i >= 0; i--) {
      if (rank[i] > ele) {
        rank.splice(i + 1, 0, ele);
        isBreak = true;
        break;
      }
    }
    if (!isBreak) rank.unshift(ele);
  };

  const answer = [];
  const rank = [];
  for (const s of score) {
    addElement(s);
    if (rank.length > k) rank.pop();
    answer.push(rank[rank.length - 1]);
  }
  return answer;
}
// console.log(solution_2(4, [0, 300, 40, 300, 20, 70, 150, 50, 500, 1000]));

// 귤 고르기
function solution3(k, tangerine) {
  const countObj = tangerine.reduce((acc, curr) => {
    acc[curr] = ++acc[curr] || 1;
    return acc;
  }, {});
  const sorted = Object.values(countObj).sort((a, b) => b - a);

  // let cnt = 0;
  for (let i = 0; i < sorted.length; i++) {
    k -= sorted[i];
    if (0 >= k) return i + 1;
  }
}
// console.log(solution_3(4, [1, 3, 2, 5, 4, 5, 2, 3]));

// 섬 연결하기
function solution4(n, costs) {
  const list = {};

  for (const [node1, node2, weigth] of costs) {
    list[node1] = list[node1]?.concat([[node2, weigth]]) || [[node2, weigth]];
    list[node2] = list[node2]?.concat([[node1, weigth]]) || [[node1, weigth]];
  }

  const BFS = (start) => {
    // console.log(start);
    // 방문해야할 리스트를 우선순위큐로 만들어 다음에 방문해야할 노드를 탐색
    const queue = [[start, 0]];
    // 시작점부터의 각노드의 거리를 표기한다.
    const distances = {};
    // 해당노드가 전 방문노드를 체크
    const previous = { [start]: start };

    for (const vertex in list) {
      if (start === vertex) distances[start] = 0;
      else distances[vertex] = Infinity;
    }

    while (queue.length) {
      // queue.sort((a, b) => b[1] - a[1]);
      const [curNode, dist] = queue.shift();
      // 갈수있는 방법이있고
      if (distances[curNode] !== Infinity) {
        list[curNode].forEach((next) => {
          const [nextNode, weigth] = next;
          const curDist = dist + weigth;
          if (distances[nextNode] > curDist) {
            distances[nextNode] = curDist;
            queue.push([nextNode, curDist]);
            previous[nextNode] = curNode;
          }
        });
      }
    }
    console.log('distances', distances);
    console.log('previous', previous);
    // console.log('list', list);

    // let cnt = 0;
    // for (const [cur, prev] of Object.entries(previous)) {
    //   console.log(cur, prev);
    //   cnt += distances[cur] - distances[prev];
    // }
    // return cnt;
  };
  return BFS(costs[0][0].toString());
}
// console.log(
//   solution_4(4, [
//     [0, 1, 5],
//     [1, 2, 3],
//     [2, 3, 3],
//     [1, 3, 2],
//     [0, 3, 4],
//   ]),
// );

// https://gmlwjd9405.github.io/2018/08/28/algorithm-mst.html
// https://velog.io/@longroadhome/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LV.3-%EC%84%AC-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0-JS
function solution4_1(n, costs) {
  const getParent = (parent, node) => {
    if (parent[node] === node) return node;
    return getParent(parent, parent[node]);
  };

  const unionParent = (parent, a, b) => {
    const n1 = getParent(parent, a);
    const n2 = getParent(parent, b);
    if (n1 < n2) parent[n2] = n1;
    else parent[n1] = n2;
  };

  const isSameParent = (parent, a, b) => {
    const n1 = getParent(parent, a);
    const n2 = getParent(parent, b);
    return n1 === n2;
  };

  let answer = 0;
  const parent = Array.from({ length: n }).map((_, i) => i);
  costs.sort((a, b) => a[2] - b[2]);
  for (const cost of costs) {
    if (!isSameParent(parent, cost[0], cost[1])) {
      answer += cost[2];
      unionParent(parent, cost[0], cost[1]);
      console.log(cost);
      console.log(parent);
    }
  }
  return answer;
}

console.log(
  solution4_1(4, [
    [0, 1, 5],
    [1, 2, 3],
    [2, 3, 3],
    [1, 3, 2],
    [0, 3, 4],
  ]),
);
