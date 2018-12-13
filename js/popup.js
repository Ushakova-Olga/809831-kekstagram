'use strict';

/* Модуль для работы с окнами успеха и ошибки при загрузке изображения */
(function () {
  window.popup = {
    openSuccess: function () {
      var onSuccessEscPress = function (evt) {
        window.util.isEscEvent(evt, closeSuccessESC);
      };
      var closeSuccess = function () {
        /* Удалять обработчики для кнопок не стала, т.к. с удалением DOM- элемента
        так поняла что должны все обработчики удалиться*/
        document.querySelector('main').removeChild(node);
      };

      var closeSuccessESC = function () {
        /* Обработчик для ESC надо удалить, т.к. он вешается на document  и не исчезает
        при удалении дочернего окна  кнопками */
        document.removeEventListener('keydown', onSuccessEscPress);
        document.querySelector('main').removeChild(node);
      };

      var templateWnd = document.querySelector('#success')
            .content
            .querySelector('.success');

      var node = templateWnd.cloneNode(true);
      document.querySelector('main').appendChild(node);
      var openedWnd = document.querySelector('main').querySelector('.success');
      var openedBtn = openedWnd.querySelector('.success__button');

      openedBtn.addEventListener('click', function () {
        closeSuccess();
      });

      document.addEventListener('keydown', onSuccessEscPress);
    },
    openError: function () {
      var onErrorEscPress = function (evt) {
        window.util.isEscEvent(evt, closeErrorESC);
      };
      var closeError = function () {
        /* Удалять обработчики для кнопок не стала, т.к. с удалением DOM- элемента
        так поняла что должны все обработчики удалиться*/
        document.querySelector('main').removeChild(node);
      };

      var closeErrorESC = function () {
        /* Обработчик для ESC надо удалить, т.к. он вешается на document  и не исчезает
        при удалении дочернего окна  кнопками */
        document.removeEventListener('keydown', onErrorEscPress);
        document.querySelector('main').removeChild(node);
      };

      var templateWnd = document.querySelector('#error')
            .content
            .querySelector('.error');

      var node = templateWnd.cloneNode(true);
      document.querySelector('main').appendChild(node);
      var openedWnd = document.querySelector('main').querySelector('.error');
      var openedBtn = openedWnd.querySelectorAll('.error__button');

      for (var i = 0; i < openedBtn.length; i++) {
        openedBtn[i].addEventListener('click', function () {
          closeError();
        });
      }
      document.addEventListener('keydown', onErrorEscPress);
    }
  };
})();
