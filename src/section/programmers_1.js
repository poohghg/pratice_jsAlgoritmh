function solution_1(people, limit) {
  people.sort((a, b) => a - b);
  let answer = 0;
  let lt = 0;
  let rt = people.length - 1;
  while (lt <= rt) {
    if (people[lt] + people[rt] <= limit) lt++;
    rt--;
    answer++;
  }
  return answer;
}
console.log(solution_1([70, 50, 80, 50], 100));
