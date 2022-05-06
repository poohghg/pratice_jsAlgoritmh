const app = document.querySelector("#app");
// console.log("app", app);

/*
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

console.log("anser : ", solution_3(13));
