function randomOption(options) {
  return options[Math.floor(Math.random()*options.length)];
}

function randomBetween0And1() {
  return Math.round(Math.random());
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomInRange(min, max, step=1) {
  const range = (max - min) / step;
  return Math.floor(Math.random() * range) * step + min  
}

// function randomInRange(min, max, step=1) {
//   return Math.floor(Math.random() * (max - min + 1)) * step + min;
// }

module.exports = {
  randomOption,
  randomBetween0And1,
  randomInRange,
  randomNumber
}