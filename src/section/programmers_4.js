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
// console.log(solution_1(8, [5, 6, 7], [4, 5]));

// 명예의 전당
function solution_2(k, score) {
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
function solution_3(k, tangerine) {
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
console.log(solution_3(4, [1, 3, 2, 5, 4, 5, 2, 3]));
