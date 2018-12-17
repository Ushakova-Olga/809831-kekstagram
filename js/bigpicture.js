'use strict';

/* Модуль для работы с большой картинкой */
(function () {
  var blockBigPicture = document.querySelector('.big-picture');
  var blockBigPictureCancel = document.querySelector('.big-picture__cancel');

  /*  Функция, которая осуществляет показ большой картинки */
  window.bigPicture = {
    show: function (pictureObject) {
      var numComments = 5;
      if (numComments > pictureObject.comments.length) {
        numComments = pictureObject.comments.length;
      }

      blockBigPicture.classList.remove('hidden');
      blockBigPicture.querySelector('.big-picture__img img').src = pictureObject.url;
      blockBigPicture.querySelector('.likes-count').textContent = pictureObject.likes;

      window.bigPicture.showNextComments(pictureObject, 5);
    },

    showNextComments: function (pictureObject, numComments) {
      if (numComments > pictureObject.comments.length) {
        numComments = pictureObject.comments.length;
      }

      var comment = '';
      for (var i = 0; i < numComments; i++) {
        comment += '<li class="social__comment"><img class="social__picture" src="' + pictureObject.comments[i].avatar + '" '
          + 'alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
          + pictureObject.comments[i].message + '</p></li>';
      }

      blockBigPicture.querySelector('.social__comments').innerHTML = comment;
      var commentCount = '<div class="social__comment-count">' + numComments + ' из <span class="comments-count">' + pictureObject.comments.length + '</span> комментариев</div>';
      blockBigPicture.querySelector('.social__comment-count').innerHTML = commentCount;
    }
  };

  var closeBigPicture = function () {
    blockBigPicture.classList.add('hidden');
  };

  /* Закрытие большой картинки */
  blockBigPictureCancel.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', window.util.createKeydownHandler(closeBigPicture, window.util.ESC_KEYCODE));

  /* Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев  */
  /* blockBigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  blockBigPicture.querySelector('.comments-loader').classList.add('visually-hidden');*/

})();
