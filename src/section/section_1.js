const app = document.querySelector("#app");
console.log("app", app);

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
console.log("anser : ", solution_1(3, 4, 5));
