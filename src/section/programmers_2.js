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
    console.log(info);
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

console.log(
  solution2(
    12,
    [
      [7, 8],
      [4, 6],
      [11, 10],
    ],
    [
      [2, 2],
      [2, 4],
      [3, 3],
    ],
  ),
);
