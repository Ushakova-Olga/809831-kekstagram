'use strict';

/* Модуль для работы с картинками */
(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var listPictureElements = document.querySelector('.pictures');

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

  /* В случае если данные успешно получены */
  var successHandler = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(window.data.createElementPicture(pictures[i], pictureTemplate));
    }
    listPictureElements.appendChild(fragment);
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

  window.backend.load(successHandler, errorHandler);
  /* window.backend.loadJsonp(successHandler, errorHandler);*/
})();
