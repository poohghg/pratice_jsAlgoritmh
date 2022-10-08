function solution(n, edge) {
  let answer = 0;
  const list = {};
  const distance = { 1: 0 };
  const q = [1];
  // const visited = { 1: true };

  for (const [v1, v2] of edge) {
    if (!list[v1]) list[v1] = [];
    if (!list[v2]) list[v2] = [];
    list[v1].push(v2);
    list[v2].push(v1);
  }

  for (const x in list) {
    if (x === '1') distance[x] = 0;
    else distance[x] = Infinity;
  }

  let curNode;
  while (q.length) {
    curNode = q.shift();
    for (const x of list[curNode]) {
      if (distance[x] > distance[curNode] + 1) {
        distance[x] = distance[curNode] + 1;
        q.push(x);
      }
    }
  }
  const values = Object.values(distance);
  const max = Math.max(...values);
  values.forEach((v) => {
    if (v === max) answer++;
  });
  return answer;
}

// console.log(
//   solution(6, [
//     [3, 6],
//     [4, 3],
//     [3, 2],
//     [1, 3],
//     [1, 2],
//     [2, 4],
//     [5, 2],
//   ]),
// );

function fibo(n) {
  const tmp = [];
  for (let i = 0; i <= n; i++) {
    if (i < 2) tmp[i] = i;
    else tmp[i] = (tmp[i - 1] + tmp[i - 2]) % 1234567;
  }
  console.log(tmp);
  return tmp[n];
}
// console.log('test', fibo(7));

function solution_2(s) {
  const stack = [];
  for (const x of s) {
    if (x === '(') stack.push(x);
    else {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  if (stack.length !== 0) return false;
  return true;
}
// console.log(solution_2('(())()'));
function solution_3(progresses, speeds) {
  const answer = [];
  while (progresses.length !== 0) {
    let cnt = 0;
    while (progresses[0] >= 100) {
      progresses.shift();
      speeds.shift();
      cnt++;
    }
    if (cnt) answer.push(cnt);
    for (let i = 0; i < speeds.length; i++) {
      progresses[i] = progresses[i] + speeds[i];
    }
  }
  return answer;
}
// 남은 일수를 계산해서 처리
function solution_3_1(progresses, speeds) {
  const answer = [];
  const days = progresses.map((progresse, idx) =>
    Math.ceil((100 - progresse) / speeds[idx]),
  );
  console.log(days);
  let count = 1;
  let maxDay = days[0];
  for (let i = 1; i < days.length; i++) {
    if (maxDay >= days[i]) {
      count++;
    } else {
      maxDay = days[i];
      answer.push(count);
      count = 1;
    }
  }
  if (count) answer.push(count);
  return answer;
}
// console.log(solution_3_1([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));

/**
 * 스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.
 * 예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면
 * 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.
 */
function solution_4(clothes) {
  let answer = 1;
  const obj = {};
  for (let i = 0; i < clothes.length; i++) {
    obj[clothes[i][1]] = (obj[clothes[i][1]] || 1) + 1;
  }

  console.log(obj);
  for (let key in obj) {
    answer *= obj[key];
  }

  return answer - 1;
}
// console.log(
//   solution_4([
//     ['yellow_hat', 'headgear'],
//     ['blue_sunglasses', 'eyewear'],
//     ['green_turban', 'headgear'],
//   ]),
// );
function solution_5(score) {
  const answer = Array.from({ length: score.length }).fill(1);
  let sum;
  for (let i = 0; i < score.length; i++) {
    sum = score[i].reduce((a, b) => a + b, 0);
    for (let j = 0; j < score.length; j++) {
      if (score[j].reduce((a, b) => a + b, 0) >= sum) {
        answer[i]++;
      }
    }
  }
  return answer;
}
// console.log(
//   solution_5([
//     [80, 70],
//     [70, 80],
//     [30, 50],
//     [90, 100],
//     [100, 90],
//     [100, 100],
//     [10, 30],
//   ]),
// );

/**
 * 캐쉬
 * LRU
 */
function solution_6(cacheSize, cities) {
  let answer = 0;
  const cache = new Set();
  for (let city of cities) {
    if (!cacheSize) return 5 * cities.length;
    city = city.toLowerCase();
    if (cache.has(city)) {
      cache.delete(city);
      answer += 1;
    } else {
      if (cache.size === cacheSize) cache.delete(cache.values().next().value);
      answer += 5;
    }
    cache.add(city);
  }
  return answer;
}
// console.log(
//   solution_6(3, [
//     'Jeju',
//     'Pangyo',
//     'Seoul',
//     'NewYork',
//     'LA',
//     'Jeju',
//     'Pangyo',
//     'Seoul',
//     'NewYork',
//     'LA',
//   ]),
// );

function solution_7(array, commands) {
  const answer = [];
  for (let [s, e, k] of commands) {
    let tmp = array.slice(s - 1, e).sort((a, b) => a - b)[k - 1];
    answer.push(tmp);
  }
  return answer;
}
// console.log(
//   solution_7(
//     [1, 5, 2, 6, 3, 7, 4],
//     [
//       [2, 5, 3],
//       [4, 4, 1],
//       [1, 7, 3],
//     ],
//   ),
// );
/**
 * 자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의 합니다.
 * 조건 1. n의 다음 큰 숫자는 n보다 큰 자연수 입니다.
 * 조건 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같습니다.
 * 조건 3. n의 다음 큰 숫자는 조건 1, 2를 만족하는 수 중 가장 작은 수 입니다.
 */
function solution_8(n) {
  const binaryCnt = Array.from(n.toString(2)).filter((v) => v === '1').length;
  let tmp;
  while (true) {
    n++;
    tmp = Array.from(n.toString(2)).filter((v) => v === '1').length;
    if (binaryCnt === tmp) return n;
  }
}
// console.log(solution_8(15));
// 포켓몬 해쉬
function solution_8(nums) {
  const getMaxCnt = Math.floor(nums.length / 2);
  const size = new Set(nums).size;
  return getMaxCnt > size ? size : getMaxCnt;
}
// console.log(solution_8([3, 1, 2, 3]));

// 피로도
function solution_9(k, dungeons) {
  let max = 0;
  const ch = Array.from({ length: dungeons.length }).fill(0);
  function DFS(l, k) {
    max = Math.max(max, l);
    for (let i = 0; i < dungeons.length; i++) {
      const [limitedNum, exhaustion] = dungeons[i];
      if (ch[i] === 0 && k >= limitedNum) {
        ch[i] = 1;
        DFS(l + 1, k - exhaustion);
        ch[i] = 0;
      }
    }
  }
  DFS(0, k);
  return max;
}
// console.log(
//   solution_9(80, [
//     [80, 20],
//     [50, 40],
//     [30, 10],
//   ]),
// );

// 같은 숫자는 싫어
function solution_10(arr) {
  const answer = [];
  let last = '';
  for (let i = 0; i < arr.length; i++) {
    if (last !== arr[i]) {
      answer.push(arr[i]);
      last = arr[i];
    }
  }
  return answer;
}

// 두 개 뽑아서 더하기
function solution_11(numbers) {
  const answer = new Set();
  function DFS(l, s, sum) {
    if (l === 2) {
      answer.add(sum);
    }
    for (let i = s; i < numbers.length; i++) {
      DFS(l + 1, i + 1, sum + numbers[i]);
    }
  }
  DFS(0, 0, 0);
  return Array.from(answer).sorat((a, b) => a - b);
}
console.log(solution_11([2, 1, 3, 4, 1]));