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
 * 수열에서 연속부분수열의 합이 특정숫자 M이 되는 경우가 몇 번 있는지 구하는 프로그램을 작성하세요
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

// console.log(solution_3([1, 2, 1, 3, 0, 1, 1, 1, 2], 6));

/**
 * 연속수열
 * N개의 수로 이루어진 수열이 주어집니다.
 * 이 수열에서 연속부분수열의 합이 특정숫자 M이하가 되는 경우가 몇 번 있는지 구하는 프로그 램을 작성하세요.
 */
function solution_4(arr, num) {
  if (!Array.isArray(arr) || isNaN(num)) return;
  let anser = 0,
    pointer = 0,
    sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    while (sum > num) {
      sum -= arr[pointer++];
    }
    anser += i - pointer + 1;
  }
  return anser;
}

// console.log(solution_4([1, 2, 3, 4, 5], 5));

/**
 *  현수 아빠는 현수에게 N일 동안의 매출기록을 주고
 * 연속 된 K일 동안의 최대 매출액이 얼마인지 구하라고 했습니다.
 */

function solution_5(arr, k) {
  if (!Array.isArray(arr) || isNaN(k)) return;
  let sum = 0,
    max = -Infinity;
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  max = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i];
    sum -= arr[i - k];
    max = Math.max(sum, max);
  }
  return max;
}

// console.log(solution_5([12, 15, 11, 20, 25, 10, 20, 19, 13, 15], 3));

/**
 * 학급 회장을 뽑는데 후보로 기호 A, B, C, D, E 후보가 등록을 했습니다.
 * 투표용지에는 반 학생들이 자기가 선택한 후보의 기호(알파벳)가 쓰여져 있으며 선생님은 그 기호를 발표하고 있습니다.
 * 선생님의 발표가 끝난 후 어떤 기호의 후보가 학급 회장이 되었는지 출력하는 프로그램을 작 성하세요.
 * 반드시 한 명의 학급회장이 선출되도록 투표결과가 나왔다고 가정합니다.
 */
function solution_6(arr) {
  if (!Array.isArray(arr)) return;
  const anser = {};
  const maxInfo = [arr[0], 1];
  for (const x of arr) {
    let cnt = (anser[x] || 0) + 1;
    anser[x] = cnt;
    if (cnt > maxInfo[1]) {
      maxInfo[0] = x;
      maxInfo[1] = cnt;
    }
  }
  return maxInfo;
}

console.log(
  solution_6([
    'B',
    'A',
    'C',
    'B',
    'A',
    'C',
    'C',
    'A',
    'C',
    'C',
    'B',
    'D',
    'E',
    'D',
    'E',
  ]),
);
