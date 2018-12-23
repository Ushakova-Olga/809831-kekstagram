'use strict';

/* Модуль для работы со слайдером */
(function () {
  // диалоговое окно .img-upload__overlay
  var uploadDivElement = document.querySelector('.img-upload__overlay');
  // картинка с предпросмотром эффектов
  var previewImgElement = document.querySelector('.img-upload__preview img');
  // филдсет со скрытыми радиобаттонами, которыми выбирается тот или другой эффект
  var effectsFieldsetElement = uploadDivElement.querySelector('.img-upload__effects');

  var pinDivElement = document.querySelector('.effect-level__pin');
  var levelDepthDivElement = document.querySelector('.effect-level__depth');
  var levelValueInputElement = document.querySelector('.effect-level__value');
  var sliderFieldsetElement = document.querySelector('.img-upload__effect-level.effect-level');

  var onPinMoved = function (evt) {
    evt.preventDefault();
    /* Запомнить точки, с которых начали перетаскивать */
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /* При каждом движении мыши надо обновить координаты */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinX = pinDivElement.offsetLeft - shift.x;
      if ((pinX < window.util.MAX_SLIDER_LENGTH) && (pinX > 0)) {
        window.slider.setSlider(pinX);
      }
    };

    /* При отпускании кнопки мыши надо перестать слушать события мыши */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    /* Обработчики перемещения мыши и отпускания мыши */
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /* Установка слайдера в зависимости от координаты маркера - xPin (центр маркера) */
  window.slider = {
    setSlider: function (xPin) {
      var checked = effectsFieldsetElement.querySelector('input:checked');
      previewImgElement.className = 'effects__preview--' + checked.value;

      var depth = Math.round(100 * xPin / window.util.MAX_SLIDER_LENGTH);
      pinDivElement.style.left = xPin + 'px';
      levelDepthDivElement.style.width = depth + '%';
      levelValueInputElement.value = depth;

      if (checked.value === 'none') {
        sliderFieldsetElement.classList.add('hidden');
        previewImgElement.style.filter = '';
      } else {
        sliderFieldsetElement.classList.remove('hidden');
      }

      if (checked.value === 'chrome') {
        previewImgElement.style.filter = 'grayscale(' + depth / 100 + ')';
      } else if (checked.value === 'sepia') {
        previewImgElement.style.filter = 'sepia(' + depth / 100 + ')';
      } else if (checked.value === 'marvin') {
        previewImgElement.style.filter = 'invert(' + depth + '%)';
      } else if (checked.value === 'phobos') {
        previewImgElement.style.filter = 'blur(' + (3 * depth / 100) + 'px)';
      } else if (checked.value === 'heat') {
        previewImgElement.style.filter = 'brightness(' + (1 + 2 * depth / 100) + ')';
      }
    },
  };

  /* Перемещение слайдера */
  pinDivElement.addEventListener('mousedown', onPinMoved);
})();
