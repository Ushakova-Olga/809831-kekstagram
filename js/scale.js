'use strict';

/* Модуль для работы с масшабированием в форме загрузки изображения */
(function () {
  /* При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться
  значение поля .scale__control--value.*/

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

  scaleSmallButtonElement.addEventListener('click', function () {
    var value = getScaleValue();

    if (value > 25) {
      value -= 25;
      setScaleValue(value);
    }
  });

  scaleBigButtonElement.addEventListener('click', function () {
    var value = getScaleValue();

    if (value < 100) {
      value += 25;
      setScaleValue(value);
    }
  });
})();
