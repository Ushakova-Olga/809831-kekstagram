'use strict';

/* Модуль для работы с большой картинкой */
(function () {
  var blockBigPicture = document.querySelector('.big-picture');
  var blockBigPictureCancel = document.querySelector('.big-picture__cancel');

  /*  Функция, которая осуществляет показ большой картинки */
  window.bigPicture = {
    show: function (pictureObject) {
      blockBigPicture.classList.remove('hidden');
      blockBigPicture.querySelector('.big-picture__img img').src = pictureObject.url;
      blockBigPicture.querySelector('.likes-count').textContent = pictureObject.likes;
      blockBigPicture.querySelector('.comments-count').textContent = pictureObject.comments.length;

      var comment = '';
      for (var i = 0; i < pictureObject.comments.length; i++) {
        comment += '<li class="social__comment"><img class="social__picture" src="img/avatar-'
          + window.util.getRandomNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
          + pictureObject.comments[i] + '</p></li>';
      }

      blockBigPicture.querySelector('.social__comments').innerHTML = comment;
      blockBigPicture.querySelector('.social__caption').textContent = pictureObject.description;
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
