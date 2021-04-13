const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  // Write code here to analyze stuff
  const testSetSize = 10;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  // ====== count the correct predictions with for-loop =========
  // let correct = 0;
  // for (let i = 0; i < testSet.length; i++) {
  //   const bucket = knn(trainingSet, testSet[i][0]);
  //   console.log({ i });
  //   if (bucket === testSet[i][3]) correct++;
  // }

  // count the correct predictions with lodash methods

  // write a range of numbers with lodash(range)
  // (1,15) gives [1,... ,14]
  _.range(1, 15).forEach((k) => {
    const accuracy = _.chain(testSet)
      .filter(
        (testPoint) =>
          knn(trainingSet, _.initial(testPoint), k) === testPoint[3]
      )
      .size()
      .divide(testSetSize)
      .value();
    console.log(`For 'k' of ${k}, accuracy is ${accuracy}`);
  });
}

function knn(data, point, k) {
  // point only has 3 values, which was parsed above at runAnalysise
  return _.chain(data)
    .map((row) => {
      return [distance(_.initial(row), point), _.last(row)];
    })
    .sortBy((row) => row[0])
    .slice(0, k)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();
}

// pre-pythagoras forumula
// function distance(pointA, pointB) {
//   return Math.abs(pointA - pointB);
// }

// pythagoras theorem adjusted:
// --- there can be additional variables into arrays ----
// const pointA = [1,1,2] to [1,1,2,1,3]
// const pointB = [4,5,6] to [4,5,6,7,8]

function distance(pointA, pointB) {
  _.chain(pointA)
    .zip(pointB) // put them into an array
    .map(([a, b]) => (a - b) ** 2)
    .sum()
    .value() ** 0.5;
}

function splitDataset(data, testCount) {
  // randomise the data, if it was collected linearly
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  console.log(testSet);
  const trainingSet = _.slice(shuffled, testCount);
  console.log(trainingSet);

  return [testSet, trainingSet];
}

module.exports = { knn };
