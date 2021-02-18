function throttle(func, wait, ...rest) {
  let time;
  return function () {
      if (!time) {
          time = setTimeout(() => {
              func.apply(this, rest);
              time = null;
          }, wait);
      }
  };
}

function debounce(callback, delay, ...rest) {
  let timer = 0;

  return function () {
      clearTimeout(timer);

      timer = setTimeout(() => {
          Reflect.apply(callback, this, rest);
      }, delay);
  };
}

module.exports = {
  throttle,
  debounce,
}
