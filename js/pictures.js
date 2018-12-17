'use strict';

/* Модуль для работы с картинками */
(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var listPictureElements = document.querySelector('.pictures');
  var picturesArr = [];
  var picturesCopyArr = [];

  /* функция заполнения блока DOM-элементами на основе массива JS-объектов */
  /* var createFragmentPictures = function (arr, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {

      fragment.appendChild(window.data.createElementPicture(arr[i], template));
    }
    return fragment;
  };*/

  /* Создайте массив, состоящий из 25 сгенерированных JS объектов,
  которые будут описывать фотографии, размещённые другими пользователями*/
  /* var arrObjectsPicture = window.data.generate(25);*/

  /* Отрисуйте сгенерированные DOM-элементы в блок .pictures */
  /* var fragmentPictures = createFragmentPictures(arrObjectsPicture, pictureTemplate);
  listPictureElements.appendChild(fragmentPictures);*/

  /* Задание 6 */
  var clean = function () {

    for (var i = 0; i < picturesCopyArr.length; i++) {
      listPictureElements.removeChild(listPictureElements.querySelector('.picture'));
    }
  };

  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(window.data.createElementPicture(pictures[i], pictureTemplate));
    }
    listPictureElements.appendChild(fragment);
  };

  /* В случае если данные успешно получены */
  var successHandler = function (pictures) {
    picturesArr = pictures;
    renderPictures(pictures);
    picturesCopyArr = picturesArr.slice();
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
    picturesResult[0] = pictures[window.util.getRandomNumber(0, pictures.length)];
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

  window.backend.load(successHandler, errorHandler);

  var filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');

  filterPopular.addEventListener('click', function () {
    clean();
    picturesCopyArr = [];
    picturesCopyArr = picturesArr.slice();
    renderPictures(picturesArr);
  });

  filterNew.addEventListener('click', function () {
    clean();
    picturesCopyArr = getRandomElements(picturesArr, 10);
    renderPictures(picturesCopyArr);
  });

  filterDiscussed.addEventListener('click', function () {
    clean();
    picturesCopyArr = [];
    picturesCopyArr = picturesArr.slice();
    picturesCopyArr.sort(function (first, second) {
      if (first.comments < second.comments) {
        return 1;
      } else if (first.comments > second.comments) {
        return -1;
      } else {
        return 0;
      }
    });
    renderPictures(picturesCopyArr);
  });


})();
