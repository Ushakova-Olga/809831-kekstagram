'use strict';

/* Модуль для работы с масшабированием в форме загрузки изображения */
(function () {
  /* При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться
  значение поля .scale__control--value.

Значение должно изменяться с шагом в 25. Например, если значение поля
установлено в 50%, после нажатия на «+», значение должно стать равным 75%.
Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%.

При изменении значения поля .scale__control--value изображению .img-upload__preview
должен добавляться соответствующий стиль CSS, который с помощью трансформации effect-level
задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть
написано transform: scale(0.75).*/

  var scaleSmallButton = document.querySelector('.scale__control--smaller');
  var scaleBigButton = document.querySelector('.scale__control--bigger');
  var scaleControl = document.querySelector('.scale__control--value');
  var imgPreview = document.querySelector('.img-upload__preview img');

  scaleSmallButton.addEventListener('click', function () {
    var valStr = scaleControl.value;
    var valNumber = valStr.slice(0, scaleControl.value.length - 1);

    valNumber -= 25;
    if (valNumber < 25) {
      valNumber = 25;
    }
    valStr = valNumber + '%';
    scaleControl.value = valStr;
    imgPreview.style.transform = 'scale(' + valNumber / 100 + ' )';
  });

  scaleBigButton.addEventListener('click', function () {
    var valStr = scaleControl.value;
    var valNumber = valStr.slice(0, scaleControl.value.length - 1);

    valNumber = +valNumber + 25;
    if (valNumber > 100) {
      valNumber = 100;
    }
    valStr = valNumber + '%';
    scaleControl.value = valStr;
    imgPreview.style.transform = 'scale(' + valNumber / 100 + ' )';
  });
})();
