// 한루프에서 최소값을 구한후 루프가 끝나면 교환한다.
function selectionSort(arr) {
  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  let minIndex;
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) minIndex = j;
    }
    if (i !== minIndex) swap(i, minIndex);
  }
  return arr;
}
// console.log(selectionSort([13, 5, 11, 7, 23, 15, 1]));
function bubbleSort(arr) {
  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  for (let i = arr.length; 0 < i; i--) {
    let isSwap = false;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(j, j + 1);
        isSwap = true;
      }
    }
    if (!isSwap) break;
  }
  return arr;
}
// console.log(bubbleSort([13, 5, 11, 7, 23, 15, 1]));
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const selectedValue = arr[i];
    let lastJindex;
    for (let j = i - 1; j >= 0; j--) {
      if (selectedValue > arr[j]) break;
      else {
        arr[j + 1] = arr[j];
        lastJindex = j;
      }
    }
    if (lastJindex >= 0) arr[lastJindex] = selectedValue;
  }
  return arr;
}
// console.log(insertionSort([13, 5, 1, 7, 23, 15, 1]));
function mergeSort(arr) {
  function merge(arr1, arr2) {
    const arr = [];
    let i = 0,
      j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        arr.push(arr1[i]);
        i++;
      } else {
        arr.push(arr2[j]);
        j++;
      }
    }
    while (i < arr1.length) {
      arr.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      arr.push(arr2[j]);
      j++;
    }
    return arr;
  }
  function sort(arr) {
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    const left = sort(arr.slice(0, middle));
    const rigth = sort(arr.slice(middle));
    return merge(left, rigth);
  }
  return sort(arr);
}
// console.log(mergeSort([13, 5, 1, 7, 23, 15, 1]));

/**
 * N개의 정수가 입력되면 당신은 입력된 값을 정렬해야 한다.
 * 음의 정수는 앞쪽에 양의정수는 뒷쪽에 있어야 한다. 또한 양의정수와 음의정수의 순서에는 변함이 없어야 한다.
 *
 */
function specialmergeSort(arr) {
  function merge(arr1, arr2) {
    const arr = [];
    let i = 0,
      j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < 0 && arr2[j] < 0) {
        if (arr1[i] < arr2[j]) {
          arr.push(arr1[i]);
          i++;
        } else {
          arr.push(arr2[j]);
          j++;
        }
      } else {
        if (arr1[i] < arr2[j]) {
          arr.push(arr1[i]);
          i++;
        } else {
          arr.push(arr2[j]);
          j++;
        }
      }
    }
    while (i < arr1.length) {
      arr.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      arr.push(arr2[j]);
      j++;
    }
    return arr;
  }
  function sort(arr) {
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    const left = sort(arr.slice(0, middle));
    const rigth = sort(arr.slice(middle));
    return merge(left, rigth);
  }
  return sort(arr);
}

console.log(specialmergeSort([1, 2, 3, -3, -2, 5, 6, -6, 100, -10, 0]));
