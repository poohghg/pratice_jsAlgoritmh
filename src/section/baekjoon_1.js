/**
 * 정수 4를 1, 2, 3의 합으로 나타내는 방법은 총 7가지가 있다. 합을 나타낼 때는 수를 1개 이상 사용해야 한다.
 * 정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하는 프로그램을 작성하시오.
 */
function solution_1(n) {
  const dy = [];
  dy[1] = 1;
  dy[2] = 2;
  dy[3] = 4;

  //  1,2,3을 더했을때 n이 되는 경우를 구한다.
  function dp(n) {
    if (n <= 3) return dy[n];
    return dp(n - 1) + dp(n - 2) + dp(n - 3);
  }
  console.log(dp(4));
}

console.log(solution_1(4));
