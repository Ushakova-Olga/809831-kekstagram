'use strict';

/* Модуль для работы с окнами успеха и ошибки при загрузке изображения */
(function () {

  var closeSuccess = function () {
    /* Удалять обработчики для кнопок не стала, т.к. с удалением DOM- элемента
    так поняла что должны все обработчики удалиться
    Обработчик для ESC надо удалить, т.к. он вешается на document  и не исчезает
    при удалении дочернего окна  кнопками */
    document.removeEventListener('keydown', onSuccessEscPress);
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.success'));
  };
  var onSuccessEscPress = window.util.createKeydownHandler(closeSuccess, window.util.ESC_KEYCODE);

  var templateSuccess = document.querySelector('#success')
      .content
      .querySelector('.success');

  var templateError = document.querySelector('#error')
      .content
      .querySelector('.error');

  var closeError = function () {
    /* Удалять обработчики для кнопок не стала, т.к. с удалением DOM- элемента
    так поняла что должны все обработчики удалиться
    Обработчик для ESC надо удалить, т.к. он вешается на document  и не исчезает
    при удалении дочернего окна  кнопками */
    document.removeEventListener('keydown', onErrorEscPress);
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.error'));
  };
  var onErrorEscPress = window.util.createKeydownHandler(closeError, window.util.ESC_KEYCODE);

  window.popup = {
    openSuccess: function () {
      var openedSuccessWnd = templateSuccess.cloneNode(true);
      document.querySelector('main').appendChild(openedSuccessWnd);
      var openedBtn = openedSuccessWnd.querySelector('.success__button');

      openedBtn.addEventListener('click', function () {
        closeSuccess();
      });

      document.addEventListener('keydown', onSuccessEscPress);
    },
    openError: function () {
      var openedErrorWnd = templateError.cloneNode(true);
      document.querySelector('main').appendChild(openedErrorWnd);
      var openedBtn = openedErrorWnd.querySelectorAll('.error__button');

      for (var i = 0; i < openedBtn.length; i++) {
        openedBtn[i].addEventListener('click', function () {
          closeError();
        });
      }
      document.addEventListener('keydown', onErrorEscPress);
    }
  };
})();