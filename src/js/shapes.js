// Draw from shuffled bags so every approved variant is used before a repeat.
window.createPortfolioShapePicker = function (count, random = Math.random) {
  let bag = [];
  return function (previous = -1) {
    if (!bag.length) {
      bag = Array.from({ length: count }, (_, index) => index);
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
    }
    if (count > 1 && bag[bag.length - 1] === previous && bag.length > 1) {
      [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
    }
    return bag.pop();
  };
};
