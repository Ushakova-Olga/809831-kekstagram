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
  var valueString;
  var valueNumber;

  var initValues = function () {
    valueString = scaleControlInputElement.value;
    valueNumber = valueString.slice(0, scaleControlInputElement.value.length - 1);
  };

  var setValues = function () {
    valueString = valueNumber + '%';
    scaleControlInputElement.value = valueString;
    previewImgElement.style.transform = 'scale(' + valueNumber / 100 + ' )';
  };

  scaleSmallButtonElement.addEventListener('click', function () {
    initValues();

    valueNumber -= SCALE_STEP;
    if (valueNumber < MIN_SCALE_VALUE) {
      valueNumber = MIN_SCALE_VALUE;
    }
    setValues();
  });

  scaleBigButtonElement.addEventListener('click', function () {
    initValues();

    valueNumber = +valueNumber + SCALE_STEP;
    if (valueNumber > MAX_SCALE_VALUE) {
      valueNumber = MAX_SCALE_VALUE;
    }
    setValues();
  });
})();
