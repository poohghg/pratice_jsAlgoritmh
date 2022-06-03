/** 
문제1 
앞에서 읽을 때나 뒤에서 읽을 때나 같은 문자열을 회문 문자열이라고 합니다.
문자열이 입력되면 해당 문자열이 회문 문자열이면 "YES", 회문 문자열이 아니면 “NO"를 출력 하는 프로그램을 작성하세요.
단 회문을 검사할 때 대소문자를 구분하지 않습니다.
*/
function solution_1_my(_str) {
  let answer = "YES";
  let strLastLen = _str.length - 1;
  const str = String(_str).toLowerCase();

  for (let i = 0; i < Math.ceil(strLastLen / 2); i++) {
    if (str[i] !== str[strLastLen - i]) {
      answer = "NO";
      break;
    }
  }
  return answer;
}

function solution_1(_str) {
  const str = String(_str).toLowerCase();
  const reversStr = str.split("").reverse().join("");

  if (str === reversStr) return "YES";
  return "NO";
}

// console.log("solution_1_my", solution_1("gooG"));

/*
문제2
앞에서 읽을 때나 뒤에서 읽을 때나 같은 문자열을 팰린드롬이라고 합니다.
문자열이 입력되면 해당 문자열이 팰린드롬이면 "YES", 아니면 “NO"를 출력하는 프로그램을 작성하세요.
단 회문을 검사할 때 알파벳만 가지고 회문을 검사하며, 대소문자를 구분하지 않습니다. 알파벳 이외의 문자들의 무시합니다.
*/

function solution_2_my(_str) {
  // * 대괄호[] 안에서 앞에 ^를 쓰면, 부정(Not)의 기능을 합니다.
  ///[^a-zA-Z]/g
  const str = _str.toLowerCase().replace(/[^a-z]/g, "");
  if (str !== str.split("").reverse().join("")) return "NO";
  return "YES";
}

console.log(
  "solution_2_my",
  solution_2_my("found7,time: study; Yduts; emit, 7Dnuof")
);
