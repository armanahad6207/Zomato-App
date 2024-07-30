let [, , a, b] = process.argv;
console.log(a, b);

function sum(a, b) {
  return a + b;
}
console.log(sum(parseInt(a), parseInt(b)));

console.log(global);
