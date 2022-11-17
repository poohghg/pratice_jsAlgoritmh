function solution_1(begin, end) {
  let idx = end - begin;
  const answer = Array(idx).fill(1);
  for (let i = end; begin <= i; i--) {
    if (i === 1) {
      answer[i - 1] = 0;
      break;
    }
    let tmp = 2;
    while (true) {
      if (tmp >= i / 2) break;
      if (i % tmp === 0 && i / tmp < 10000000) break;
      tmp++;
    }
    answer[idx--] = i % tmp !== 0 ? 1 : i / tmp;
  }
  return answer;
}
// console.log(solution_1(1, 10));

// 조이스틱
function solution2(name) {
  const len = name.length;
  const AIDx = 'A'.charCodeAt();
  const ZIDx = 'Z'.charCodeAt();

  let count = 0;
  let minMove = len - 1;

  const getStrDistance = (str) =>
    Math.min(
      Math.abs(str.charCodeAt() - AIDx),
      Math.abs(str.charCodeAt() - ZIDx) + 1,
    );

  for (let i = 0; i < len; i++) {
    count += getStrDistance(name[i]);
    let endAIdx = i + 1;
    while (endAIdx < len && name[endAIdx] === 'A') endAIdx++;
    const forwordSearch = i * 2 + (len - endAIdx);
    const backwardSearch = i + (len - endAIdx) * 2;
    minMove = Math.min(minMove, forwordSearch, backwardSearch);
  }
  return count + minMove;
}
// console.log(solution2('EEAAE'));

// 안전지대
function solution3(board) {
  const moves = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];

  const row = board.length;
  const col = board[0].length;
  let cnt = 0;
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      if (board[x][y] === 1) {
        cnt++;
        moves.forEach((move) => {
          const moveX = x + move[0];
          const moveY = y + move[1];
          if (moveX >= 0 && moveX < col && moveY >= 0 && moveY < row) {
            if (board[moveX][moveY] === 0) {
              board[moveX][moveY] = 2;
              cnt++;
            }
          }
        });
      }
    }
  }
  return row * col - cnt;
}
// console.log(
//   solution3([
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 1, 1, 0],
//     [0, 0, 0, 0, 0],
//   ]),
// );

// 가장 큰 수
function solution4(numbers) {
  const ch = [...numbers].fill(0);
  let max = Number.MIN_SAFE_INTEGER;
  function BFS(l, str) {
    if (l === ch.length) {
      max = Math.max(max, Number(str));
      return;
    }

    for (let i = 0; i < numbers.length; i++) {
      if (ch[i] === 0) {
        ch[i] = 1;
        BFS(l + 1, str + numbers[i]);
        ch[i] = 0;
      }
    }
  }
  BFS(0, '');
  return max.toString();
}
// console.log(solution4([6, 10, 2]));

// 가장 큰 수
function solution4_1(numbers) {
  numbers.sort((a, b) => {
    const aStr = a.toString();
    const bStr = b.toString();
    if (aStr[0] === bStr[0]) return Number(bStr + aStr) - Number(aStr + bStr);
    return Number(bStr[0]) - Number(aStr[0]);
  });
  if (numbers[0] === 0) return 0;
  return numbers.join('');
}

// console.log(solution4([555, 551, 550, 4]));
// console.log(solution4_1([110, 1110]));
// 소수찾기
function solution5(numbers) {
  // const set = [];
  const set = new Set();
  const ch = Array(numbers.length).fill(0);

  // 소수
  const isPrime = (n) => {
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return n >= 2;
  };

  const DFS = (l, s) => {
    if (!isNaN(s)) set.add(Number(s));
    if (l === numbers.length) return;
    for (let i = 0; i < numbers.length; i++) {
      if (ch[i] === 0) {
        ch[i] = 1;
        DFS(l + 1, s + numbers[i]);
        ch[i] = 0;
      }
    }
  };

  DFS(0, '');
  let cnt = 0;

  for (const v of set) if (isPrime(v)) cnt++;
  return cnt;
}
// console.log(solution5('143'));

// 과일 장수
function solution6(k, m, score) {
  let answer = 0;
  score.sort((a, b) => b - a);
  for (let i = 0; i < score.length; i += m) {
    const min = score[i + m - 1];
    if (min) answer += min * m;
  }
  return answer;
}
// console.log(solution6(3, 4, [1, 2, 3, 1, 2, 3, 1]));

//숫자 카드 나누기
function solution7(arrayA, arrayB) {
  // const arr =
  const minA = Math.min(...arrayA);
  const minB = Math.min(...arrayB);
  const leastCommon = Math.max(minA, minB);

  const comfrim = (a, b, num) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] % num !== 0 || b[i] % num === 0) return false;
    }
    return true;
  };

  for (let i = leastCommon; 2 <= i; i--) {
    if (minA % i === 0 && comfrim(arrayA, arrayB, i)) return i;
    if (minB % i === 0 && comfrim(arrayB, arrayA, i)) return i;
  }
  return 0;
}
// console.log(solution7([14, 35, 119], [18, 30, 102]));

// 행렬의 덧셈
function solution8(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      arr1[i][j] = arr1[i][j] + arr2[i][j];
    }
  }
  return arr1;
}

// console.log(
//   solution8(
//     [
//       [1, 2],
//       [2, 3],
//     ],
//     [
//       [3, 4],
//       [5, 6],
//     ],
//   ),
// );

// bfs 시간초과
// 게임 맵 최단거리
// 최단거리 bfs를 사용
function solution9(maps) {
  let min = -1;
  const end = [maps.length - 1, maps[0].length - 1];
  const moves = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const DFS = (x, y, cnt) => {
    if (min !== -1 && cnt + 1 > min) return;
    if (x === 0 && y === 0) {
      if (min === -1) min = cnt + 1;
      else min = Math.min(min, cnt + 1);
      return;
    }
    moves.forEach((move) => {
      const newX = x + move[0];
      const newY = y + move[1];
      if (newX >= 0 && newX <= end[0] && newY >= 0 && newY <= end[1]) {
        if (maps[newX][newY] === 1) {
          maps[newX][newY] = 0;
          DFS(newX, newY, cnt + 1);
          maps[newX][newY] = 1;
        }
      }
    });
  };
  DFS(end[0], end[1], 0);
  return min;
}

function solution9_1(maps) {
  const end = [maps.length - 1, maps[0].length - 1];
  const moves = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  // x,y,cnt
  const queue = [[0, 0, 0]];
  while (queue.length) {
    let [x, y, cnt] = queue.shift();
    if (x === end[0] && y === end[1]) return cnt + 1;
    moves.forEach((move) => {
      const newX = x + move[0];
      const newY = y + move[1];
      if (newX >= 0 && newX <= end[0] && newY >= 0 && newY <= end[1]) {
        if (maps[newX][newY] === 1) {
          maps[newX][newY] = 0;
          queue.push([newX, newY, cnt + 1]);
        }
      }
    });
  }
  return -1;
}

// console.log(
//   solution9_1([
//     [1, 0, 1, 1, 1],
//     [1, 0, 1, 0, 1],
//     [1, 0, 1, 1, 1],
//     [1, 1, 1, 0, 1],
//     [0, 0, 0, 0, 1],
//   ]),
// );

// 음양 더하기
function solution10(absolutes, signs) {
  let answer = 0;
  for (let i = 0; i < absolutes.length; i++) {
    signs[i] ? (answer += absolutes[i]) : (answer -= absolutes[i]);
  }
  return answer;
}
// console.log(solution10([4, 7, 12], [true, false, true]));

// 로또의 최고 순위와 최저 순위
function solution11(lottos, win_nums) {
  const rank = {
    0: 6,
    1: 6,
    2: 5,
    3: 4,
    4: 3,
    5: 2,
    6: 1,
  };

  // 현재 맞은갯수,0의갯수
  const info = lottos.reduce(
    (acc, num) => {
      if (num === 0) acc[1]++;
      else if (win_nums.indexOf(num) !== -1) acc[0]++;
      return acc;
    },
    [0, 0],
  );
  const [hits, zeros] = info;
  return [rank[hits + zeros], rank[hits]];
}
// console.log(solution11([0, 0, 0, 0, 0, 0], [38, 19, 20, 40, 15, 25]));

// https://mine-it-record.tistory.com/522
// 약수의 개수와 덧셈
function solution12(left, right) {
  // 제곱근이 정수면 약수의 개수가 홀수다.
  // 약수
  const getDivisors = (num) => {
    let cnt = 0;
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        cnt++;
        if (num / i !== i) cnt++;
      }
    }
    return cnt % 2 === 0 ? '+' : '-';
  };

  let answer = 0;
  for (left; left <= right; left++) {
    answer += getDivisors(left) === '+' ? +left : -left;
  }
  return answer;
}
// console.log(solution12(13, 17));

// 프린터
function solution13(priorities, location) {
  const stack = [];
  priorities = priorities.map((v, idx) => ({
    idx,
    v,
  }));

  while (priorities.length) {
    const curValue = priorities.shift();
    if (priorities.find((ele) => ele.v > curValue.v)) priorities.push(curValue);
    else {
      stack.push(curValue);
      if (curValue.idx === location) return stack.length;
    }
  }
}
// console.log(solution13([2, 1, 3, 2], 2));

// 스킬트리
function solution14(skill, skill_trees) {
  const skillArr = skill.split('');
  let cnt = 0;
  for (const tree of skill_trees) {
    let lastIdx = 0;
    let isBreak = false;
    for (let i = 0; i < tree.length; i++) {
      const idx = skillArr.indexOf(tree[i]);
      if (idx === -1) continue;
      if (lastIdx !== idx) {
        isBreak = true;
        break;
      }
      lastIdx++;
    }
    if (!isBreak) cnt++;
  }
  return cnt;
}
// console.log(solution14('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']));

function solution15(v) {
  const calVector = (v1, v2, v3) => {
    if (v1[1] === v3[1]) return [v3[0], v2[1]];
    if (v2[1] === v3[1]) return [v3[0], v1[1]];
  };

  const [initX, initY] = v[0];
  let sameIDx;
  let anotherIdx;

  for (let i = 1; i < v.length; i++) {
    const [x, y] = v[i];
    if (x === initX) sameIDx = i;
    else anotherIdx = i;
  }

  if (sameIDx) return calVector(v[0], v[sameIDx], v[anotherIdx]);
  else return calVector(v[1], v[2], v[0]);
}
// console.log(
//   solution15([
//     [3, 4],
//     [1, 4],
//     [3, 10],
//   ]),
// );

function solution16(number, limit, power) {
  const getMaxNum = (num) => {
    let cnt = 0;
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        cnt++;
        if (num / i !== i) cnt++;
        if (cnt > limit) return power;
      }
    }
    return cnt;
  };

  let answer = 0;
  for (let i = 1; i <= number; i++) answer += getMaxNum(i);
  return answer;
}
// console.log(solution16(5, 3, 2));

// 줄 서는 방법
function solution17(n, k) {
  let cnt = 0;
  let answer;
  const ch = Array(n).fill(0);
  const DFS = (l, arr) => {
    if (l === n) {
      if (++cnt === k) answer = arr;
      return;
    }

    for (let i = 1; i <= n; i++) {
      if (ch[i - 1] === 0 && !answer) {
        ch[i - 1] = 1;
        DFS(l + 1, arr.concat(i));
        ch[i - 1] = 0;
      }
    }
  };
  DFS(0, []);
  return answer;
}
// console.log(solution17(5, 23));
function solution17_1(n, k) {
  const factorial = (num) => {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
  };
  const answer = [];
  let searchArr = Array.from({ length: n }).map((_, idx) => idx + 1);

  while (n > 0) {
    const f = factorial(--n);
    const idx = k % f === 0 ? k / f - 1 : Math.floor(k / f);
    answer.push(searchArr[idx]);
    k = k - idx * f;
    searchArr = searchArr.filter((v) => v !== searchArr[idx]);
  }
  return answer;
}
// console.log(solution17_1(5, 23));
// console.log(24 / 24);
