const data = require("./data.json");
const { knn } = require("./plinko/score");

let correct = 0;
for (let i = 0; i < data.length; i++) {
  const bucket = knn(data, 300);
  console.log(bucket);
}
