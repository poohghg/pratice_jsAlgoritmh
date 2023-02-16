// 행렬의 곱셈
function solution1(arr1, arr2) {
  const answer = Array(3)
    .fill()
    .map((_, idx) => []);

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      let sum = 0;
      // [i][j]의 자리는?
      for (let k = 0; k < arr2.length; k++) sum += arr1[i][k] * arr2[k][j];
      answer[i][j] = sum;
    }
  }
  return answer;
}

// 10 6 6
// 8 12 2
// 6 3 2
// console.log(
//   solution1(
//     [
//       [2, 3, 2],
//       [4, 2, 4],
//       [3, 1, 4],
//     ],
//     [
//       [5, 4, 3],
//       [2, 4, 1],
//       [3, 1, 1],
//     ],
//   ),
// );

// 카드 뭉치
function solution2(cards1, cards2, goal) {
  for (const word of goal) {
    if (word === cards1[0]) cards1.shift();
    else if (word === cards2[0]) cards2.shift();
    else return 'No';
  }
  return 'Yes';
}
// console.log(solution2(['i'], ['want'], ['i', 'want']));

function solution3(maps) {
  const sMaps = maps.map((r) => r.split(''));
  const moves = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const XLen = sMaps.length;
  const YLen = sMaps[0].length;
  let S, L, E;
  sMaps.forEach((r, idx) => {
    if (!S && r.indexOf('S') !== -1) S = [idx, r.indexOf('S')];
    if (!L && r.indexOf('L') !== -1) L = [idx, r.indexOf('L')];
    if (!E && r.indexOf('E') !== -1) E = [idx, r.indexOf('E')];
  });

  const bfs = (s, e) => {
    const copyMaps = maps.map((r) => r.split(''));
    const q = [[s, 0]];
    copyMaps[s[0]][s[1]] === 'X';
    while (q.length) {
      const [[x, y], cnt] = q.shift();
      for (const [px, py] of moves) {
        const [nextX, nextY] = [x + px, y + py];
        if (nextX < 0 || nextX >= XLen || nextY < 0 || nextY >= YLen) continue;
        if (copyMaps[nextX][nextY] === 'X') continue;
        if (copyMaps[nextX][nextY] === e) return [[x, y], cnt + 1];

        copyMaps[nextX][nextY] = 'X';
        q.push([[nextX, nextY], cnt + 1]);
      }
    }
    return -1;
  };

  const toL = bfs(S, 'L');
  if (toL === -1) return -1;
  const toE = bfs(L, 'E');
  if (toE === -1) return -1;
  return toL[1] + toE[1];
}

console.log(solution3(['SOOOL', 'XXXXO', 'OOOOO', 'OXXXX', 'OOOOE']));
