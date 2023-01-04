// 이진 변환 반복하기
function solution1(s) {
  const answer = [0, 0];
  const dfs = (l, s) => {
    if (s === '1') {
      answer[0] = l;
      return;
    }
    let newS = '';
    for (const str of s) {
      if (str === '1') {
        newS += '1';
        continue;
      }
      answer[1]++;
    }
    dfs(l + 1, newS.length.toString(2));
  };
  dfs(0, s);
  return answer;
}

console.log(solution1('1111111'));
