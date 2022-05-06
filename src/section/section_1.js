/*
문제1 
  100이하의 자연수 A, B, C를 입력받아 세 수 중 가장 작은 값을 출력하는 프로그램을 작성하 세요.(정렬을 사용하면 안됩니다)
*/
function solution(a, b, c) {
  let minNum;

  if (a < b) {
    minNum = a;
  } else {
    minNum = b;
  }

  if (minNum < c) {
    return minNum;
  }
  return c;
}
console.log("anser : ", solution(3, 4, 5));
