'use strict';

/* Служебные функции и константы */
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    MAX_SLIDER_LENGTH: 453,
    MAX_HASHTAGS: 5,
    MAX_LENGTH_HASHTAG: 20,
    getRandomItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    getRandomNumber: function (min, max) {
      if ((min >= 0) && (max > 0) && (max > min)) {
        return (min + Math.floor(Math.random() * (max - min + 1)));
      }
      return 0;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();