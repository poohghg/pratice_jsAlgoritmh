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
// console.log(
//   solution3(
//     [
//       [40, 10000],
//       [25, 10000],
//     ],
//     [7000, 9000],
//   ),
// );

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

// 3진법 뒤집기
function solution5(n) {
  n = n.toString(3);
  let answer = 0;
  for (let i = n.length - 1; 0 <= i; i--) answer += n[i] * 3 ** i;
  return answer;
}
// console.log(solution5(45));

// 배달
function solution6(N, road, K) {
  let answer = 0;
  const list = {};

  for (const [vertex1, vertex2, w] of road) {
    list[vertex1] = list[vertex1]?.concat([[vertex2, w]]) || [[vertex2, w]];
    list[vertex2] = list[vertex2]?.concat([[vertex1, w]]) || [[vertex1, w]];
  }

  const dfs = (s) => {
    const distances = {};
    const nodes = [[s, 0]];

    for (const node in list) {
      if (node === s) distances[node] = 0;
      else distances[node] = Infinity;
    }

    while (nodes.length) {
      const [currNode, currW] = nodes.shift();
      list[currNode].forEach(([next, w]) => {
        if (distances[next] > currW + w) {
          distances[next] = currW + w;
          nodes.push([next, currW + w]);
        }
      });
    }
    for (const key in distances) if (distances[key] <= K) answer++;
  };

  dfs('1');
  return answer;
}

// console.log(
//   solution6(
//     5,
//     [
//       [1, 2, 1],
//       [2, 3, 3],
//       [5, 2, 2],
//       [1, 4, 2],
//       [5, 3, 1],
//       [5, 4, 2],
//     ],
//     3,
//   ),
// );

//정수 제곱근 판별
function solution7(n) {
  const sqrt = Math.sqrt(n);
  if (sqrt % 1 === 0) return (sqrt + 1) ** 2;
  return -1;
}
// console.log(solution7(121));

function solution8(s) {
  return parseInt(s, 10);
}
// console.log(solution8(-1234));

// 표현 가능한 이진트리
function solution9(numbers) {
  const num = 58;
  console.log('0' + num.toString(2));
}

// console.log(solution9([5]));

// // 후위 우선탐색
// // 후위 순회는 왼쪽자식->오른쪽 자식-> 뿌리
// DFSpostORder() {
//   if (!this.root) return [];
//   const data = [];
//   const travers = (node) => {
//     if (node.left) travers(node.left);
//     if (node.rigth) travers(node.rigth);
//     return data.push(node.val);
//   };
//   travers(this.root);
//   return data;
// }

// 시소 짝꿍
function solution10(weights) {
  // 각몸무게의 사람수
  // 키[몸무게]:사람수
  const ch = {};
  for (let i = 0; i < weights.length; i++) {
    ch[weights[i]] = (ch[weights[i]] || 0) + 1;
  }

  let answer = 0;
  for (const key in ch) {
    const persons = ch[key];
    let curW;

    curW = +key * 2;
    if (curW % 3 === 0) answer += (ch[curW / 3] ?? 0) * persons;
    if (curW % 4 === 0) answer += (ch[curW / 4] ?? 0) * persons;

    curW = +key * 3;
    if (curW % 2 === 0) answer += (ch[curW / 2] ?? 0) * persons;
    if (curW % 4 === 0) answer += (ch[curW / 4] ?? 0) * persons;

    curW = +key * 4;
    if (curW % 2 === 0) answer += (ch[curW / 2] ?? 0) * persons;
    if (curW % 3 === 0) answer += (ch[curW / 3] ?? 0) * persons;

    // nc2
    if (persons > 1) answer += (persons * (persons - 1)) / 2;
    // 중복을 제거한다
    delete ch[key];
  }
  return answer;
}
console.log(solution10([100, 180, 360, 100, 270]));
