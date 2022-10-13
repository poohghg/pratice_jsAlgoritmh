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
console.log(solution_3([1, 461, 1, 10], ['00:00 1234 IN']));
