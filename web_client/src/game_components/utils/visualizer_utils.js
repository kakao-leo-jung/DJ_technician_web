
module.exports.getFrequencyAverage = (frequencyList) => {
  if(frequencyList.length !== 0) {
    let sum = 0;
    frequencyList.forEach(frequency => {
      sum += frequency;
    });
    return sum / frequencyList.length;
  }
  return 0;
}