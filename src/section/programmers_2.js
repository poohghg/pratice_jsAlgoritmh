function solution_1(ingredient) {
  ingredient = ingredient.join('');
  const initLen = ingredient.length;
  let lastLen = initLen;
  let cnt = 0;
  while (true) {
    // replace의 시간복잡도는 o(n)으로 실패
    ingredient = ingredient.replace('1231', '');
    if (ingredient.length === lastLen) break;
    lastLen = ingredient.length;
    cnt++;
  }
  return cnt;
  // return Math.floor((len - ingredient[0].length) / 4);
}
// 햄버거 만들기
function solution_1_1(ingredient) {
  const str = [1, 3, 2, 1];
  let cnt = 0;
  let stack = [];
  for (const x of ingredient) {
    stack.push(x);
    while (stack.length >= 4 && x === 1) {
      const lastIdx = stack.length - 1;
      let isContinue = true;
      for (let i = 0; i < 4; i++) {
        if (stack[lastIdx - i] !== str[i]) {
          isContinue = false;
          break;
        }
      }
      if (!isContinue) break;
      for (let i = 0; i < 4; i++) stack.pop();
      cnt++;
    }
  }
  return cnt;
}
// console.log(solution_1_1([1, 2, 1, 2, 3, 1, 3, 1, 2, 3, 1, 2, 3, 1]));

//야간 전술보행
function solution2(distance, scope, times) {
  let sortedInfo = scope
    .map((range, idx) => range.concat(times[idx]))
    .sort((a, b) => Math.min(a[0], a[1]) - Math.min(b[0], b[1]));

  for (const info of sortedInfo) {
    const [start, end, workTiem, breakTime] = info;
    const totalTime = workTiem + breakTime;
    let ls = Math.min(start, end);
    let rs = Math.max(start, end);
    while (ls <= rs) {
      let tmp = ls % totalTime;
      if (0 < tmp && tmp <= workTiem) return ls;
      ls++;
    }
  }
  return distance;
}
// console.log(
//   solution2(
//     12,
//     [
//       [7, 8],
//       [4, 6],
//       [11, 10],
//     ],
//     [
//       [2, 2],
//       [2, 4],
//       [3, 3],
//     ],
//   ),
// );

// if (list[curNode].length > 2) activeLigth.push(curNode);
// else if (list[curNode].length <= 2 && !activeLigth.includes(prev[curNode]))
//   activeLigth.push(curNode);

//등대
// 단방향에 홀수번째면 등불을 키고
// 연결된 노드가 많으면 등불을 킨다?
function solution3(n, lighthouse) {
  const list = lighthouse.reduce((prev, curr) => {
    const [node1, node2] = curr;
    prev[node1] = prev[node1]?.concat(node2) || [node2];
    prev[node2] = prev[node2]?.concat(node1) || [node1];
    return prev;
  }, {});

  const prev = Array(n + 1).fill(0);
  const path = [];
  const findPath = () => {
    const queue = [1];
    prev[1] = null;
    while (queue.length) {
      const curNode = queue.shift();
      list[curNode].forEach((node) => {
        if (prev[node] === 0) {
          prev[node] = curNode;
          queue.push(node);
        } else if (prev[node] !== 0 && list[curNode].length === 1) {
          let tmpNode = curNode;
          const tmp = [];
          while (tmpNode) {
            tmp.push(tmpNode);
            tmpNode = prev[tmpNode];
          }
          path.push(tmp);
        }
      });
    }
    return path;
  };
  findPath();
  const activeLigth = [];
  console.log(path);
}

// console.log(
//   solution3(12, [
//     [1, 2],
//     [1, 3],
//     [1, 4],
//     [1, 5],
//     [5, 6],
//     [5, 7],
//     [5, 8],
//     [4, 9],
//     [9, 10],
//     [10, 11],
//     [10, 12],
//   ]),
// );

// 크레인 인형뽑기 게임

function solution4(board, moves) {
  const stack = [];
  let cnt = 0;
  for (let move of moves) {
    move = move - 1;
    for (let i = 0; i < board.length; i++) {
      if (board[i][move] !== 0) {
        if (stack[stack.length - 1] === board[i][move]) {
          stack.pop();
          cnt += 2;
        } else {
          stack.push(board[i][move]);
        }
        board[i][move] = 0;
        break;
      }
    }
  }
  return cnt;
}

console.log(
  solution4(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4],
  ),
);
