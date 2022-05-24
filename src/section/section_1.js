const app = document.querySelector("#app");

/** 
문제1 
  100이하의 자연수 A, B, C를 입력받아 세 수 중 가장 작은 값을 출력하는 프로그램을 작성하 세요.(정렬을 사용하면 안됩니다)
*/
function solution_1(a, b, c) {
  let anser;
  if (a < b) {
    anser = a;
  } else {
    anser = b;
  }

  if (c < anser) anser = c;
  return anser;
}
// console.log("anser : ", solution_1(3, 4, 5));

/**
 * 문제 2
 * 길이가 서로 다른 A, B, C 세 개의 막대 길이가 주어지면
 * 이 세 막대로 삼각형을 만들 수 있 으면 “YES"를 출력하고, 만들 수 없으면 ”NO"를 출력한다.
 * 한변의 크기보다 두변의 크기의 합이 커야함.
 *
 */

function solution_2_my() {
  // 인자값들의 배열 arguments
  // (a, b) => a - b 오름차순
  // (a, b) => b - a 내림차순
  const args = Object.values(arguments).sort((a, b) => b - a);
  console.log("args", args);

  const maxValue = args[0];
  const lastValues = args[1] + args[2];

  if (lastValues >= maxValue) return "YES";
  return "NO";
}

// console.log("anser : ", solution_2_my(13, 33, 17));

function solution_2(a, b, c) {
  let anser = "NO",
    max;
  let sum = a + b + c;
  if (a > b) {
    max = a;
  } else {
    max = b;
  }
  if (c > max) max = c;
  if (sum - max >= max) anser = "YES";
  return anser;
}

// console.log("anser : ", solution_2(13, 33, 17));

/**
 * 문제3
 * 연필 1 다스는 12자루입니다.
 * 학생 1인당 연필을 1자루씩 나누어 준다고 할 때 N명이 학생수 를 입력하면
 * 필요한 연필의 다스 수를 계산하는 프로그램을 작성하세요.
 */

function solution_3_my(students) {
  let anser = parseInt(students / 12, 10);
  if (students % 12 !== 0) {
    anser = anser + 1;
  }
  return anser;
}

// console.log("anser : ", solution_3_my(11));

function solution_3(students) {
  // ceil 올림
  // floor 내림
  // round 반올림
  return Math.ceil(students / 12);
}

// console.log("anser : ", solution_3(13));

/**
 *자연수 N이 입력되면 1부터 N까지의 합을 출력하는 프로그램을 작성하세요.
▣ 입력설명
첫 번째 줄에 20이하의 자연수 N이 입력된다..
▣ 출력설명
첫 번째 줄에 1부터 N까지의 합을 출력한다.
 */

function solution_4_my(n) {
  let anser = 0;
  for (let index = 0; index < n; index++) {
    anser += index;
  }
  return anser;
}

// console.log("anser_4 : ", solution_4_my(5));

/**
 * 7개의 수가 주어지면 그 숫자 중 가장 작은 수를 출력하는 프로그램을 작성하세요.
 * 최솟값 구하기
 *▣ 입력예제 1
5 3 7 11 2 15 17
 */

function solution_5_my() {
  const agrsList = Object.values(arguments);
  const minValue = agrsList.reduce((prev, curr) => (prev < curr ? prev : curr));
  return minValue;
}

function solution_5(arr) {
  // 초기 최소값에 가장큰 정수값을 할당해 놓는다.
  let min = Number.MAX_SAFE_INTEGER;
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] < min) min = arr[index];
  }
  return min;
}

function solution_5_1(arr) {
  // const anser = Math.min(...arr);
  const anser = Math.min.apply(null, arr);
  return anser;
}

// console.log("anser_5 : ", solution_5_my(5, 3, 7, 11, 2, 15, 17));
// const arr = [5, 3, 7, 11, 2, 15, 17];
// console.log("anser_5_1 : ", solution_5_1(arr));

/**
 * 7개의 자연수가 주어질 때,
 * 이들 중 홀수인 자연수들을 모두 골라 그 합을 구하고,
 * 고른 홀수들 중 최소값을 찾는 프로그램을 작성하세요.
 */

function solution_6_my(arr) {
  let sumOddNumbers, minOddNumber;
  const oddNumbers = arr.filter((number) => number % 2 === 1);

  sumOddNumbers = oddNumbers.reduce((prev, curr) => prev + curr, 0);
  minOddNumber = Math.min(...oddNumbers);

  return [sumOddNumbers, minOddNumber];
}

function solution_6(arr) {
  let answer = [];
  let sum = 0,
    min = Number.MAX_SAFE_INTEGER;

  for (const number of arr) {
    if (number % 2 === 1) {
      sum += number;
      if (number < min) min = number;
    }
  }
  return [sum, min];
}

const arr = [12, 77, 38, 41, 53, 92, 85];
console.log("solution_6_my", solution_6(arr));
