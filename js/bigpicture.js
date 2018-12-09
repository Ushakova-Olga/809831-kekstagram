'use strict';

/* Модуль для работы с большой картинкой */
(function () {
  var blockBigPicture = document.querySelector('.big-picture');
  var blockBigPictureCancel = document.querySelector('.big-picture__cancel');

  /*  Функция, которая осуществляет показ большой картинки */
  window.bigpicture = {
    showBigPicture: function (pictureJsObject) {
      blockBigPicture.classList.remove('hidden');
      blockBigPicture.querySelector('.big-picture__img img').src = pictureJsObject.url;
      blockBigPicture.querySelector('.likes-count').textContent = pictureJsObject.likes;
      blockBigPicture.querySelector('.comments-count').textContent = pictureJsObject.comments.length;

      var comment = '';
      for (var i = 0; i < pictureJsObject.comments.length; i++) {
        comment += '<li class="social__comment"><img class="social__picture" src="img/avatar-'
          + window.data.getRandomNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
          + pictureJsObject.comments[i] + '</p></li>';
      }

      blockBigPicture.querySelector('.social__comments').innerHTML = comment;
      blockBigPicture.querySelector('.social__caption').textContent = pictureJsObject.description;
    }
  };

  var closeBigPicture = function () {
    blockBigPicture.classList.add('hidden');
  };

  /* Закрытие большой картинки */
  blockBigPictureCancel.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  });

  /* Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев  */
  /* blockBigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  blockBigPicture.querySelector('.comments-loader').classList.add('visually-hidden');*/

})();
