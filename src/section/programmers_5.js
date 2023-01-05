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

// console.log(solution1('1111111'));

// 개인정보 수집 유효기간
function solution2(today, terms, privacies) {
  const calDay = (strDay, limit = 0) => {
    const [y, m, d] = strDay.split('.');
    return +y * 12 * 28 + +m * 28 + +d + limit * 28;
  };

  const termsInfo = terms.reduce((acc, curr) => {
    curr = curr.split(' ');
    acc[curr[0]] = curr[1];
    return acc;
  }, {});
  const answer = [];
  const todayDays = calDay(today);
  for (let i = 0; i < privacies.length; i++) {
    const [endDay, no] = privacies[i].split(' ');
    if (todayDays >= calDay(endDay, termsInfo[no])) answer.push(i + 1);
  }
  return answer;
}

// console.log(
//   solution2(
//     '2022.05.19',
//     ['A 6', 'B 12', 'C 3'],
//     ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C'],
//   ),
// );
// console.log(4 ** 7);

// 이모티콘 할인행사
function solution3(users, emoticons) {
  const discountRate = [40, 30, 20, 10];

  // 유저는 일정이상의 가격을 다소비하여야 이모티콘 플러스를 구매한다.
}

console.log(
  solution3(
    [
      [40, 2900],
      [23, 10000],
      [11, 5200],
      [5, 5900],
      [40, 3100],
      [27, 9200],
      [32, 6900],
    ],
    [1300, 1500, 1600, 4900],
  ),
);
