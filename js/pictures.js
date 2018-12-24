'use strict';

/* Модуль для работы с картинками */
(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var picturesSectionElement = document.querySelector('.pictures');
  var picturesOrigin = [];

  /* Удаляем картинки из DOM */
  var cleanPictures = function () {
    var deletingPictures = picturesSectionElement.querySelectorAll('.picture');
    for (var i = 0; i < deletingPictures.length; i++) {
      picturesSectionElement.removeChild(deletingPictures[i]);
    }
  };

  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (item) {
      fragment.appendChild(createElementPicture(item, pictureTemplate));
    });

    picturesSectionElement.appendChild(fragment);
  };

  /* В случае если данные успешно получены */
  var successHandler = function (pictures) {
    picturesOrigin = pictures;
    renderPictures(pictures);
    /* В случае успешной загрузки надо показать фильтры */
    window.filters.show();
  };

  var errorHandler = function (errorMessage) {
    /* Создаем DOM - элемент с сообщением об ошибке */
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var getRandomElements = function (pictures, n) {
    var result;
    var picturesResult = [];
    picturesResult[0] = pictures[window.util.getRandomNumber(0, pictures.length - 1)];
    if (n >= 2) {
      for (var i = 1; i < n; i++) {
        result = pictures[window.util.getRandomNumber(0, pictures.length - 1)];
        while (picturesResult.indexOf(result) !== -1) {
          result = pictures[window.util.getRandomNumber(0, pictures.length - 1)];
        }
        picturesResult[i] = result;
      }
    }
    return picturesResult;
  };

  var createElementPicture = function (object, template) {
  /* создание DOM-элемента на основе JS-объекта */
    var objectElement = template.cloneNode(true);
    objectElement.querySelector('.picture__img').src = object.url;
    objectElement.querySelector('.picture__likes').textContent = object.likes;
    objectElement.querySelector('.picture__comments').textContent = object.comments.length;

    objectElement.addEventListener('click', function () {
      window.bigPicture.open(object);
    });
    return objectElement;
  };


  window.pictures = {
    remove: cleanPictures,
    render: function (pictures) {
      renderPictures(pictures);
    },
    getRandom: function () {
      return getRandomElements(picturesOrigin, 10);
    },
    getInitialArray: function () {
      var pictures = [];
      pictures = picturesOrigin.slice();
      return pictures;
    }
  };
  window.backend.load(successHandler, errorHandler);
})();
