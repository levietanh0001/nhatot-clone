function randomOption(options) {
  return options[Math.floor(Math.random()*options.length)];
}

function randomBetween0And1() {
  return Math.round(Math.random());
}

function randomInRange(min, max, step=1) {
  return Math.floor(Math.random() * (max - min + 1)) * step + min;
}

module.exports = {
  randomOption,
  randomBetween0And1,
  randomInRange,
}