class Node {
  #next = null;
  #val;
  constructor(val) {
    this.#val = val;
  }

  get val() {
    return this.#val;
  }
  set val(value) {
    if (value == null) return;
    this.#val = value;
  }
  get next() {
    return this.#next;
  }
  set next(node) {
    if (!node instanceof Node) throw Error('node변수의 타입을 확인하세요');
    this.#next = node;
  }
}
class Stack {
  #first;
  #last;
  #size = 0;

  get size() {
    return this.#size;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.#first) {
      this.#first = newNode;
      this.#last = newNode;
    } else {
      newNode.next = this.#first;
      this.#first = newNode;
    }
    this.#size++;
  }

  pop() {
    if (!this.#first) return;
    const popNode = this.#first;
    if (this.#size === 1) this.#last = null;
    this.#first = popNode.next;
    this.#size--;
    return popNode.val;
  }
}
// const stack = new Stack();

/**
 * 괄호가 입력되면 올바른 괄호이면 “YES", 올바르지 않으면 ”NO"를 출력합니다.
 * (())() 이것은 괄호의 쌍이 올바르게 위치하는 거지만, (()()))은 올바른 괄호가 아니다.
 */
function solution_1(str) {
  if (str.length % 2 !== 0) return false;
  const stack = new Stack();
  for (let i = 0; i < str.length; i++) {
    const element = str[i];
    if (element === '(') stack.push(element);
    else if (element === ')') {
      if (stack.pop() === undefined) return false;
    } else return false;
  }
  return stack.size === 0 ? true : false;
}

// console.log(solution_1('(())()()'));
// console.log(solution_1('()))'));

/**
 * 입력된 문자열에서 소괄호 ( ) 사이에 존재하는 모든 문자를 제거하고
 * 남은 문자만 출력하는 프로그램을 작성하세요.
 */
function solution_2(str) {
  let answer = '';
  const stack = new Stack();
  for (let i = 0; i < str.length; i++) {
    const element = str[i];
    if (element === '(') stack.push(element);
    else if (element === ')') stack.pop();
    else if (stack.size === 0) answer += element;
  }
  return answer;
}
// console.log(solution_2('(A(BC)D)EF(G(H)(IJ)K)LM(N)(123))()123'));
