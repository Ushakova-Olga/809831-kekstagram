'use strict';

/* Модуль для работы с масшабированием в форме загрузки изображения */
(function () {
  /* При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться
  значение поля .scale__control--value.*/
  var MIN_SCALE_VALUE = 25;
  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;
  var scaleSmallButtonElement = document.querySelector('.scale__control--smaller');
  var scaleBigButtonElement = document.querySelector('.scale__control--bigger');
  var scaleControlInputElement = document.querySelector('.scale__control--value');
  var previewImgElement = document.querySelector('.img-upload__preview img');

  var getScaleValue = function () {
    var value = scaleControlInputElement.value;
    return parseInt(value.replace(/\D/, ''), 10);
  };

  var setScaleValue = function (value) {
    scaleControlInputElement.value = value + '%';
    previewImgElement.style.transform = 'scale(' + value / 100 + ' )';
  };

  var onClickSmallButton = function () {
    var value = getScaleValue();

    if (value > MIN_SCALE_VALUE) {
      value -= SCALE_STEP;
      setScaleValue(value);
    }
  };

  var onClickBigButton = function () {
    var value = getScaleValue();

    if (value < MAX_SCALE_VALUE) {
      value += SCALE_STEP;
      setScaleValue(value);
    }
  };

  window.scale = {
    activate: function () {
      scaleSmallButtonElement.addEventListener('click', onClickSmallButton);
      scaleBigButtonElement.addEventListener('click', onClickBigButton);
    },
    deactivate: function () {
      scaleSmallButtonElement.removeEventListener('click', onClickSmallButton);
      scaleBigButtonElement.removeEventListener('click', onClickBigButton);
    }
  };
})();
