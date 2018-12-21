'use strict';

/* Модуль для работы с большой картинкой */
(function () {
  var LIMIT_COMMENTS = 5;
  var bigpictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = document.querySelector('.big-picture__cancel');
  var commentsLoaderElement = bigpictureElement.querySelector('.social__comments-loader');
  var commentListElement = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');
  var startIndexComment = 0;
  var picture = {};

  /*  Функция, которая осуществляет показ большой картинки */
  var show = function (pictureObject) {
    cleanComments();
    startIndexComment = 0;
    picture = pictureObject;
    /* Скрыть кнопку "Загрузить еще", если все комментарии уже показаны */
    if (pictureObject.comments.length <= (startIndexComment + LIMIT_COMMENTS)) {
      commentsLoaderElement.classList.add('visually-hidden');
    } else {
      commentsLoaderElement.classList.remove('visually-hidden');
    }

    bigpictureElement.classList.remove('hidden');
    bigpictureElement.querySelector('.big-picture__img img').src = pictureObject.url;
    bigpictureElement.querySelector('.likes-count').textContent = pictureObject.likes;

    showNextComments();
    document.addEventListener('keydown', onDocumentEscPress);
  };


  var createCommentElement = function (object) {
    var element = commentTemplate.cloneNode(true);
    element.querySelector('.social__picture').src = object.avatar;
    element.querySelector('.social__text').textContent = object.message;

    return element;
  };

  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.forEach(function (item) {
      fragment.appendChild(createCommentElement(item));
    });
    commentListElement.appendChild(fragment);
  };

  /* Удаляем комментарии из DOM */
  var cleanComments = function () {
    commentListElement.innerHTML = '';
  };

  var showNextComments = function () {
    var renderingComments = picture.comments.slice(startIndexComment, startIndexComment + LIMIT_COMMENTS);
    renderComments(renderingComments);
    startIndexComment += LIMIT_COMMENTS;

    var allComments = picture.comments.length;
    var showedComments = commentListElement.childNodes.length;
    bigpictureElement.querySelector('.social__comment-count').innerHTML = showedComments + ' из <span class="comments-count">' + allComments + '</span> комментариев</div>';
  };

  var closeBigPicture = function () {
    bigpictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentEscPress);
  };

  var onDocumentEscPress = window.util.createKeydownHandler(closeBigPicture, window.util.ESC_KEYCODE);

  var onCommentsLoaderClick = function () {
    showNextComments(picture);
    /* Скрыть кнопку "Загрузить еще", если все комментарии уже показаны */
    if (picture.comments.length <= (startIndexComment)) {
      commentsLoaderElement.classList.add('visually-hidden');
    }
  };

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  bigPictureCancelElement.addEventListener('click', closeBigPicture);

  window.bigPicture = {
    open: show
  };
})();
