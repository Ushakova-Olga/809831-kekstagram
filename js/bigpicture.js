'use strict';

/* Модуль для работы с большой картинкой */
(function () {
  var bigpictureElement = document.querySelector('.big-picture');
  var bigpicturecancelElement = document.querySelector('.big-picture__cancel');
  var loader = bigpictureElement.querySelector('.social__comments-loader');
  var listCommentElements = document.querySelector('.social__comments');

  var commentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');

  var show = function (pictureObject) {
    var numComments = 5;
    if (numComments > pictureObject.comments.length) {
      numComments = pictureObject.comments.length;
    }

    bigpictureElement.classList.remove('hidden');
    bigpictureElement.querySelector('.big-picture__img img').src = pictureObject.url;
    bigpictureElement.querySelector('.likes-count').textContent = pictureObject.likes;

    showNextComments(pictureObject, 5);
  };

  var createCommentElement = function (object, template) {
    var objectElement = template.cloneNode(true);
    objectElement.querySelector('.social__picture').src = object.avatar;
    objectElement.querySelector('.social__text').textContent = object.message;

    return objectElement;
  };

  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(createCommentElement(comments[i], commentTemplate));
    }
    listCommentElements.appendChild(fragment);
  };

  /* Удаляем комментарии из DOM */
  var cleanComments = function () {
    var delCom = listCommentElements.querySelectorAll('.social__comment');
    for (var i = 0; i < delCom.length; i++) {
      listCommentElements.removeChild(delCom[i]);
    }
  };

  var showNextComments = function (pictureObject, numComments) {
    if (numComments > pictureObject.comments.length) {
      numComments = pictureObject.comments.length;
    }

    var renderingComments = pictureObject.comments.slice(5 * Math.floor((numComments - 1) / 5), numComments);
    renderComments(renderingComments);

    /* Здесь строка n из m комментариев показывается только 1 раз для большой картинки, массива никакого нет
    и поэтому не вижу смысла под это делать одельный шаблон и функции create и render, мне кажется, так компактнее будет */
    var commentCount = '<div class="social__comment-count">' + numComments + ' из <span class="comments-count">' + pictureObject.comments.length + '</span> комментариев</div>';
    bigpictureElement.querySelector('.social__comment-count').innerHTML = commentCount;
  };

  var closeBigPicture = function () {
    bigpictureElement.classList.add('hidden');
    /* Призакрытии большой картинки удяляем обработчики */
    loader.removeEventListener('click', loaderHandler);
    bigpicturecancelElement.removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', window.util.createKeydownHandler(closeBigPicture, window.util.ESC_KEYCODE));
    cleanComments();
  };

  /* Пришлось обработчик выносить за пределы ф-ии open,
  для того чтобы потом можно было его удалить при закрытии большой картинки.
  Не смогла ничего лучше придумать, приходится объект сохранять через
  внешнюю переменную, чтобы она отработала в обработчике. */

  var currentCommentsNum = 5;
  var objectJ = {};
  var loaderHandler = function () {
    currentCommentsNum += 5;
    showNextComments(objectJ, currentCommentsNum);
    if (Math.ceil(objectJ.comments.length / 5) === (currentCommentsNum / 5)) {
      loader.classList.add('visually-hidden');
    }
  };

  /*  Функция, которая осуществляет показ большой картинки */
  window.bigPicture = {
    /* обработчик, который должен вызвать показ большой картинки */
    open: function (object) {
      currentCommentsNum = 5;
      /* Проверка длины комментариев, чтобы лишний раз зря не показывать
      кнопку "Загрузить еще", т.к. клики по ней приводят к лишнему
      выполнению обработчика */
      if (Math.ceil(object.comments.length / 5) === (currentCommentsNum / 5)) {
        loader.classList.add('visually-hidden');
      } else {
        loader.classList.remove('visually-hidden');
      }
      /* В качестве параметра передаем Js - объект, соответствующий данной маленькой картинке */
      show(object);
      objectJ = object;
      loader.addEventListener('click', loaderHandler);
      /* Закрытие большой картинки */
      bigpicturecancelElement.addEventListener('click', closeBigPicture);
      document.addEventListener('keydown', window.util.createKeydownHandler(closeBigPicture, window.util.ESC_KEYCODE));
    }
  };
})();
