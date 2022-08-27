/**
 * 오름차순으로 정렬이 된 두 배열이 주어지면 두 배열을 오름차순으로
 * 합쳐 출력하는 프로그램 을 작성하세요.
 */
// 배열은 오름차순으로 주어진다.
// 시간복잡도는  O(n)이다.
function merge(arr1, arr2) {
  let i = 0,
    j = 0;
  const arr = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      arr.push(arr1[i++]);
    } else {
      arr.push(arr2[j++]);
    }
  }
  while (i < arr1.length) {
    arr.push(arr1[i++]);
  }
  while (j < arr2.length) {
    arr.push(arr2[j++]);
  }
  return arr;
}
// console.log(merge([1, 3, 5], [2, 4, 6, 8, 10]));

// mergeSort
// 정렬되지 않은 배열의 일반적은 정렬의 시간복잡도는
// O(n logN)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const rigth = mergeSort(arr.slice(middle));
  return merge(left, rigth);
}

// console.log(mergeSort([3, 5, 6, 1, 2, 3, 41]));

/**
 * A, B 두 개의 집합이 주어지면 두 집합의 공통 원소를 추출하여
 * 오름차순으로 출력하는 프로 그램을 작성하세요.
 */

function solution_2(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return;
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  let arr = [],
    i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] === arr2[j]) {
      arr.push(arr1[i]);
      i++;
      j++;
    } else if (arr1[i] > arr2[j]) j++;
    else i++;
  }
  return arr;
}
// console.log(solution_2([1, 3, 5, 7], [1, 2, 3, 4, 5]));
/**
 * 연속 부분수열
 *수열에서 연속부분수열의 합이 특정숫자 M이 되는 경우가 몇 번 있는지 구하는 프로그램을 작성하세요
 */
function solution_3(arr, num) {
  if (!Array.isArray(arr) || isNaN(num)) return;
  let pointer = 0,
    sum = 0,
    anser = [];

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (sum === num) {
      anser.push(arr.slice(pointer, i + 1));
    }
    while (sum > num) {
      sum -= arr[pointer++];
      if (sum === num) anser.push(arr.slice(pointer, i + 1));
    }
  }
  return anser;
}

console.log(solution_3([1, 2, 1, 3, 0, 1, 1, 1, 2], 6));
