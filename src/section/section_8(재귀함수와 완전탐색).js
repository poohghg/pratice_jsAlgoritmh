class Node {
  left = null;
  rigth = null;
  count = 1;
  constructor(val) {
    this.val = val;
  }
}

class BST {
  root = null;
  insert(val) {
    const newNodw = new Node(val);
    if (!this.root) {
      this.root = newNodw;
      return this;
    } else {
      let curNode = this.root;
      while (true) {
        if (val < curNode.val) {
          if (!curNode.left) {
            curNode.left = newNodw;
            return this;
          }
          curNode = curNode.left;
        } else if (val > curNode.val) {
          if (!curNode.rigth) {
            curNode.rigth = newNodw;
            return this;
          }
          curNode = curNode.rigth;
        } else {
          curNode.count++;
        }
      }
    }
  }
  find(val) {
    let curNode = this.root;
    while (curNode) {
      if (curNode.val === val) return curNode;
      else if (curNode.val > val) curNode = curNode.left;
      else curNode = curNode.rigth;
    }
    return;
  }
}

const bst = new BST();
bst.insert(10);
bst.insert(11);
bst.insert(12);

console.log(bst.find(10));
console.log(bst.find(9));

// https://rond-o.tistory.com/304
/**
 * 자연수 N이 입력되면 재귀함수를 이용하여 1부터 N까지를 출력하는 프로그램을 작성하세요.
 */
function solution_1(n) {
  if (n === 0) return 0;
  solution_1(n - 1);
  console.log(n);
}
// console.log(solution_1(3));

/**
 * 10진수 N이 입력되면 2진수로 변환하여 출력하는 프로그램을 작성하세요.
 * 단 재귀함수를 이용 해서 출력해야 합니다.
 */
function solution_2(n) {
  if (Math.floor(n / 2) <= 1)
    return Math.floor(n / 2).toString() + (n % 2).toString();
  let answer = solution_2(Math.floor(n / 2));
  return answer.toString() + (n % 2);
}
// console.log(solution_2(27));
