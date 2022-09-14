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
          return this;
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
  // 전위우선순위
  /**
   * 전위 순회
   * 부모노드 -> 왼쪽 자식 노드 -> 오른쪽 자식 노드
   */
  preOrder() {
    const data = [];
    if (!this.root) return data;
    function travers(node) {
      data.push(node.val);
      if (node.left) travers(node.left);
      if (node.rigth) travers(node.rigth);
    }
    travers(this.root);
    return data;
  }
  /**
   * 중위순위
   * 왼쪽 자식 노드  -> 부모노드 -> 오른쪽 자식 노드
   */
  inOrder() {
    const data = [];
    if (!this.root) return data;
    function travers(node) {
      if (node.left) travers(node.left);
      data.push(node.val);
      if (node.rigth) travers(node.rigth);
    }
    travers(this.root);
    return data;
  }
  /**
   * 후위순위
   * 왼쪽 자식 노드 -> 오른쪽 자식 노드 -> 부모노드
   */
  postOrder() {
    const data = [];
    if (!this.root) return data;
    function travers(node) {
      if (node.left) travers(node.left);
      if (node.rigth) travers(node.rigth);
      data.push(node.val);
    }
    travers(this.root);
    return data;
  }
}

//     10
//   6      15
// 3  8   12   17
const tree = new BST();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(12);
tree.insert(17);
// console.log(tree.preOrder());
// console.log(tree.inOrder());
// console.log(tree.postOrder());

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

/**
 * 자연수 N이 주어지면 1부터 N까지의 원소를 갖는 집합의 부분집합을 모두 출력하는 프로그램 을 작성하세요.
 */
function solution_3(n) {
  const ch = Array.from({ length: n + 1 }).map(() => 0);
  const answer = [];
  function travers(v) {
    if (v === n + 1) {
      let tmp = '';
      for (let i = 1; i <= ch.length; i++) {
        if (ch[i] === 1) tmp += ` ${i}`;
      }
      if (tmp.length) answer.push(tmp.trimStart());
      return;
    }
    ch[v] = 1;
    travers(v + 1);
    ch[v] = 0;
    travers(v + 1);
  }
  travers(1);
  return answer.join('\n');
  //        0
  //    1       1
  //  2   2   2   2
  // 3 3 3 3 3 3 3 3
  // travers(1);
  // return;
}
// console.log(solution_3(3));
/**
 * 철수는 그의 바둑이들을 데리고 시장에 가려고 한다. 그런데 그의 트럭은 C킬로그램 넘게 태 울수가 없다. 철수는 C를 넘지 않으면서 그의 바둑이들을 가장 무겁게 태우고 싶다.
 * N마리의 바둑이와 각 바둑이의 무게 W가 주어지면, 철수가 트럭에 태울 수 있는 가장 무거운 무게를 구하는 프로그램을 작성하세요.
 */
function solution_4(c, n, arr) {
  let max = Number.MIN_SAFE_INTEGER;
  // console.log(copy);
  function travers(l, sum) {
    if (sum > c) return;
    if (l === n) {
      max = Math.max(sum, max);
      return;
    }
    console.log(l);
    travers(l + 1, sum + arr[l]);
    travers(l + 1, sum);
  }
  travers(0, 0);
  return max;
}
console.log(solution_4(259, 3, [81, 58, 42]));
