'use strict';

/* Модуль для работы со слайдером */
(function () {
  // диалоговое окно .img-upload__overlay
  /* var upload = document.querySelector('.img-upload__overlay');*/
  // картинка с предпросмотром эффектов
  var imgUploadPrev = document.querySelector('.img-upload__preview img');
  // филдсет со скрытыми радиобаттонами, которыми выбирается тот или другой эффект
  var effectRadioButtons = window.util.upload.querySelector('.img-upload__effects');

  /* var pin = document.querySelector('.effect-level__pin');*/
  var levelDepth = document.querySelector('.effect-level__depth');
  var levelVal = document.querySelector('.effect-level__value');
  var slider = document.querySelector('.img-upload__effect-level.effect-level');

  /* Установка слайдера в зависимости от координаты маркера - xPin (центр маркера) */
  window.slider = {
    setSlider: function (xPin) {
      var checked = effectRadioButtons.querySelector('input:checked');
      imgUploadPrev.className = 'effects__preview--' + checked.value;

      var depth = Math.round(100 * xPin / window.util.MAX_SLIDER_LENGTH);
      window.util.pin.style.left = xPin + 'px';
      levelDepth.style.width = depth + '%';
      levelVal.value = depth;

      if (checked.value === 'none') {
        slider.classList.add('hidden');
        imgUploadPrev.style = '';
      } else {
        slider.classList.remove('hidden');
      }

      if (checked.value === 'chrome') {
        imgUploadPrev.style = 'filter: grayscale(' + depth / 100 + ');';
      } else if (checked.value === 'sepia') {
        imgUploadPrev.style = 'filter: sepia(' + depth / 100 + ');';
      } else if (checked.value === 'marvin') {
        imgUploadPrev.style = 'filter: invert(' + depth + '%);';
      } else if (checked.value === 'phobos') {
        imgUploadPrev.style = 'filter: blur(' + (3 * depth / 100) + 'px);';
      } else if (checked.value === 'heat') {
        imgUploadPrev.style = 'filter: brightness(' + (1 + 2 * depth / 100) + ');';
      }
    },

    onPinMoved: function (evt) {
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

        var pinX = window.util.pin.offsetLeft - shift.x;
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
    }
  };
})();
