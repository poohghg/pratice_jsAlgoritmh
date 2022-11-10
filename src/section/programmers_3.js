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

console.log(solution7([14, 35, 119], [18, 30, 102]));
