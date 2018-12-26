'use strict';

/* Модуль для работы с окнами успеха и ошибки при загрузке изображения */
(function () {
  var closeSuccess = function () {
    /* Удалять обработчики для кнопок не стала, т.к. с удалением DOM- элемента должны все обработчики удалиться */
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', onSuccessAnotherClick);
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.success'));
  };
  var onSuccessEscPress = window.util.createKeydownHandler(closeSuccess, window.util.ESC_KEYCODE);

  /* Обработчик закрытия по клику на произвольную часть экрана */
  var onSuccessAnotherClick = function (evt) {
    var successInner = document.querySelector('main').querySelector('.success__inner');
    if (evt.target !== successInner) {
      closeSuccess();
    }
  };

  var templateSuccess = document.querySelector('#success')
      .content
      .querySelector('.success');

  var templateError = document.querySelector('#error')
      .content
      .querySelector('.error');

  var closeError = function () {
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('click', onErrorAnotherClick);
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.error'));
  };
  var onErrorEscPress = window.util.createKeydownHandler(closeError, window.util.ESC_KEYCODE);

  /* Обработчик закрытия по клику на произвольную часть экрана */
  var onErrorAnotherClick = function (evt) {
    var errorInner = document.querySelector('main').querySelector('.error__inner');
    if (evt.target !== errorInner) {
      closeError();
    }
  };

  window.popup = {
    openSuccess: function () {
      var openedSuccessWnd = templateSuccess.cloneNode(true);
      document.querySelector('main').appendChild(openedSuccessWnd);
      var openedBtn = openedSuccessWnd.querySelector('.success__button');
      openedBtn.focus();

      openedBtn.addEventListener('click', function () {
        closeSuccess();
      });

      document.addEventListener('keydown', onSuccessEscPress);
      /* Окно закрывается по клику на произвольную область экрана*/
      document.addEventListener('click', onSuccessAnotherClick);
    },
    openError: function (title) {
      var openedErrorWnd = templateError.cloneNode(true);
      document.querySelector('main').appendChild(openedErrorWnd);
      var openedBtn = openedErrorWnd.querySelectorAll('.error__button');
      openedBtn[0].focus();
      if (title) {
        openedErrorWnd.querySelector('.error__title').innerHTML = title;
        openedErrorWnd.querySelector('.error__title').style = 'font-size: 20px';
      }

      openedBtn.forEach(function (item) {
        item.addEventListener('click', function () {
          closeError();
        });
      });

      document.addEventListener('keydown', onErrorEscPress);
      /* Окно закрывается по клику на произвольную область экрана*/
      document.addEventListener('click', onErrorAnotherClick);
    }
  };
})();
