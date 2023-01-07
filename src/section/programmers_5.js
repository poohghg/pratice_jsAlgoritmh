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
  const discountRates = [40, 30, 20, 10];
  const rates = [];

  (function dfs(l, arr) {
    if (l === emoticons.length) return rates.push(arr);
    for (let i = 0; i < discountRates.length; i++)
      dfs(l + 1, arr.concat(discountRates[i]));
  })(0, []);

  // 유저는 일정이상의 할인율이 되면 이모티콘을 구매한다.
  let answer = [0, 0];
  for (const rate of rates) {
    const purchaseInfo = [0, 0];

    for (const user of users) {
      const [userRate, d] = user;
      const ratedPrices = emoticons.reduce((acc, curr, idx) => {
        if (rate[idx] >= userRate) return acc + curr * (1 - rate[idx] * 0.01);
        return acc;
      }, 0);

      if (ratedPrices >= d) purchaseInfo[0]++;
      else purchaseInfo[1] += ratedPrices;
    }

    if (purchaseInfo[0] > answer[0]) answer = purchaseInfo;
    else if (purchaseInfo[0] === answer[0] && purchaseInfo[1] >= answer[1])
      answer = purchaseInfo;
  }
  return answer;
}
// console.log(4 ** 7);
console.log(
  solution3(
    [
      [40, 10000],
      [25, 10000],
    ],
    [7000, 9000],
  ),
);

// 택배 배달과 수거하기
function solution4(cap, n, deliveries, pickups) {
  let answer = 0;
  let i = n - 1;
  let j = n - 1;
  let box;

  while (i >= 0 || j >= 0) {
    if (deliveries[i] === 0 && pickups[j] === 0) {
      i--;
      j--;
      continue;
    }
    answer += (Math.max(i, j) + 1) * 2;
    box = 0;

    while (i >= 0 && box <= cap) {
      if (box + deliveries[i] <= cap) {
        box += deliveries[i];
        i--;
      } else {
        deliveries[i] -= cap - box;
        break;
      }
    }

    box = 0;
    while (j >= 0 && box <= cap) {
      if (box + pickups[j] <= cap) {
        box += pickups[j];
        j--;
      } else {
        pickups[j] -= cap - box;
        break;
      }
    }
  }
  return answer;
}
// 3 - 3
// 4 + 4
// console.log(solution4(2, 2, [0, 0], [0, 0]));
