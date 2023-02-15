// 행렬의 곱셈
function solution1(arr1, arr2) {
  const answer = Array(3)
    .fill()
    .map((_, idx) => []);

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      let sum = 0;
      // [i][j]의 자리는?
      for (let k = 0; k < arr2.length; k++) sum += arr1[i][k] * arr2[k][j];
      answer[i][j] = sum;
    }
  }
  return answer;
}

// 10 6 6
// 8 12 2
// 6 3 2

console.log(
  solution1(
    [
      [2, 3, 2],
      [4, 2, 4],
      [3, 1, 4],
    ],
    [
      [5, 4, 3],
      [2, 4, 1],
      [3, 1, 1],
    ],
  ),
);
