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
      .filter((testPoint) => knn(trainingSet, testPoint[0], k) === testPoint[3])
      .size()
      .divide(testSetSize)
      .value();
    console.log(`For 'k' of ${k}, accuracy is ${accuracy}`);
  });
}

function knn(data, point, k) {
  return _.chain(data)
    .sortBy((row) => row[1])
    .map((row) => [distance(row[0], point), row[3]])
    .slice(0, k)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();
}

function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

function splitDataset(data, testCount) {
  // randomise the data, if it was collected linearly
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}
