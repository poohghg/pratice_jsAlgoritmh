// 매칭 점수
function solution_1(n, lost, reserve) {
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
console.log(solution_1(8, [5, 6, 7], [4, 5]));
