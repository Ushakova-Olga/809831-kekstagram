'use strict';

/* Служебные функции и константы */
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    /* Константы вынесла сюда, т.к. требуется из других файлов к ним доступ
    Не знаю, правильно ли так делать. Просто для удобства, чтобы не переопределять
    в нескольких файлах одни и те же константы при необходимости.
    Или надо было делать для них ф-ии с return, например getMaxSliderLength,
    а сами константы сохранять в закрытую часть модуля?? */
    MAX_SLIDER_LENGTH: 453,
    MAX_HASHTAGS: 5,
    MAX_LENGTH_HASHTAG: 20,
    /* Некоторые части документа пристутсвуют в нескольких модулях JS,
    я добавила их в служебный файл, не знаю можно ли так делать.
    Не все из них удалось вынести, т.к. некоторые определены через предыдущие и здесь не удается объявить.
    Правильно ли и можно ли так делать?? */
    // диалоговое окно .img-upload__overlay
    upload: document.querySelector('.img-upload__overlay'),
    pin: document.querySelector('.effect-level__pin'),
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
