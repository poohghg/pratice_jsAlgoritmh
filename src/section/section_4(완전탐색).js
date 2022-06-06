/** 
자릿수의 합
문제1 
N개의 자연수가 입력되면 각 자연수의 자릿수의 합을 구하고, 
그 합이 최대인 자연수를 출력 하는 프로그램을 작성하세요. 
자릿수의 합이 같은 경우 원래 숫자가 큰 숫자를 답으로 합니다.
 만약 235 와 1234가 동시에 답이 될 수 있다면 1234를 답으로 출력해야 합니다.
*/
function solution_1_my(numbers) {
  // forEach return - >continue
  // forEach return false - >brake
  let answer,
    max = Number.MIN_SAFE_INTEGER; // let maxInfo = { max: Number.MIN_SAFE_INTEGER, index: 0 };
  numbers.forEach((v) => {
    const curV = String(v)
      .split("")
      .reduce((prev, curr) => prev + Number(curr), 0);
    if (curV >= max) {
      if (curV === max && answer > v) {
        return;
      }
      max = curV;
      answer = v;
    }
  });
  return answer;
}

function solution_1(numbers) {
  let answer,
    max = Number.MIN_SAFE_INTEGER;

  for (const x of numbers) {
    let sum = 0,
      tmp = x;
    while (tmp) {
      // 1의자리
      sum += tmp % 10;
      // 1의자리의 앞자리수
      tmp = parseInt(tmp / 10, 10);
    }
    if (sum >= max) {
      if (sum === max && answer > x) {
        continue;
      }
      max = sum;
      answer = x;
    }
  }
  return answer;
}
// console.log("solution_1_my", solution_1([128, 460, 603, 40, 521, 137, 123]));

/**
 실수 변환
 문제2
 N개의 자연수가 입력되면 각 자연수를 뒤집은 후 그 뒤집은 수가 소수이면 
 그 소수를 출력하 는 프로그램을 작성하세요. 예를 들어 32를 뒤집으면 23이고, 23은 소수이다. 
 그러면 23을 출 력한다. 단 910를 뒤집으면 19로 숫자화 해야 한다. 첫 자리부터의 연속된 0은 무시한다.
 */

function solution_2_my(numbers) {
  let answer = [];

  function isPrimeNumber(n) {
    if (n === 1) return false;
    for (let i = 2; i < n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  numbers.forEach((v) => {
    const reverseV = parseInt(v.toString().split("").reverse().join(""), 10);
    if (isPrimeNumber(reverseV)) answer.push(reverseV);
  });
  return answer;
}

function solution_2(numbers) {
  let answer = [];
  function isPrimeNumber(n) {
    if (n === 1) return false;
    for (let i = 2; i < parseInt(Math.sqrt(n), 10); i++) {
      // 약수
      if (n % i === 0) return false;
    }
    return true;
  }

  for (let x of numbers) {
    let res = 0,
      t;
    while (x) {
      // 마지막 자릿수를 구한다.
      t = x % 10;
      x = parseInt(x / 10, 10);
      // 한자리씩 늘린다.
      res = res * 10 + t;
    }
    if (isPrimeNumber(res)) answer.push(res);
  }
  return answer;
}

console.log(
  "solution_2_my",
  solution_2([32, 55, 62, 20, 250, 370, 200, 30, 100])
);
