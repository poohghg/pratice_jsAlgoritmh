// 구명보트
function solution_1(people, limit) {
  people.sort((a, b) => a - b);
  let answer = 0;
  let lt = 0;
  let rt = people.length - 1;
  while (lt <= rt) {
    if (people[lt] + people[rt] <= limit) lt++;
    rt--;
    answer++;
  }
  return answer;
}
// console.log(solution_1([70, 50, 80, 50], 100));

function solution_2(n) {
  for (let x = 1; x <= 1000000; x++) {
    if (n % x === 1) return x;
  }
}

function solution_3(fees, records) {
  const [bT, bF, uT, uF] = fees;
  function calTime(t1, t2) {
    t1 = t1.split(':');
    let calT1 = Number(t1[0] * 60) + Number(t1[1]);

    t2 = t2.split(':');
    let calT2 = Number(t2[0] * 60) + Number(t2[1]);

    return calT2 - calT1;
  }

  const obj = {};
  for (const record of records) {
    const [time, no, active] = record.split(' ');
    if (active === 'IN') obj[no] = { ...obj[no], time, status: 'in' };
    else {
      const total = (obj[no].total || 0) + calTime(obj[no].time, time);
      obj[no] = { total, status: 'out' };
    }
  }

  // console.log(obj);
  return Object.entries(obj)
    .map(([key, value]) => {
      let totalT = value.total || 0;
      let fee = bF;
      if (value.status === 'in') totalT += calTime(value.time, '23:59');
      if (totalT > bT) fee += Math.ceil((totalT - bT) / uT) * uF;
      return [Number(key), fee];
    })
    .sort((a, b) => a[0] - b[0])
    .map((v) => v[1]);
}
// console.log(solution_3([1, 461, 1, 10], ['00:00 1234 IN']));

// 두 큐 합 같게 만들기
function solution_4(queue1, queue2) {
  const ilen = queue1.length + queue2.length;

  let q1Sum = queue1.reduce((a, b) => a + b, 0);
  let q2Sum = queue2.reduce((a, b) => a + b, 0);
  let cnt = 0;
  let q1Idx = 0;
  let q2Idx = 0;
  if ((q1Sum + q2Sum) % 2 !== 0) return -1;
  while (q1Idx < ilen && q2Idx < ilen) {
    if (q1Sum === q2Sum) return cnt;
    if (q1Sum > q2Sum) {
      const q1Value = queue1[q1Idx];
      queue2.push(q1Value);
      q1Sum -= q1Value;
      q2Sum += q1Value;
      q1Idx++;
    } else {
      const q2Value = queue2[q2Idx];
      queue1.push(q2Value);
      q1Sum += q2Value;
      q2Sum -= q2Value;
      q2Idx++;
    }
    cnt++;
  }
  return -1;
}
// console.log(
//   solution_4([1, 1, 1, 1, 1, 1, 1, 1, 1, 10], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
// );

// 숫자 짝꿍
function solution_5(X, Y) {
  const xObj = {};
  let common = [];

  for (let i = 0; i < X.length; i++) {
    const element = X[i];
    xObj[element] = (xObj[element] || 0) + 1;
  }

  for (let i = 0; i < Y.length; i++) {
    const element = Y[i];
    if (xObj[element]) {
      xObj[element] -= 1;
      common.push(element);
    }
  }

  if (!common.length) return '-1';
  common = common.sort((a, b) => b - a).join('');
  return common[0] === '0' ? '0' : common;
}
// console.log(solution_5('100', '2030450'));

// 없는 숫자 더하기
function solution_6(numbers) {
  const answer = 0;
  for (let i = 0; index < 10; i++) {
    if (numbers.indexOf(i) === -1) answer += i;
  }
  return answer;
}
