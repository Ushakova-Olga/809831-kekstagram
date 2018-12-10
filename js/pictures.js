'use strict';

/* Модуль для работы с картинками */
(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var listPictureElements = document.querySelector('.pictures');

  /* функция заполнения блока DOM-элементами на основе массива JS-объектов */
  var createFragmentPictures = function (arr, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(window.data.createElementPicture(arr[i], template, i));
    }
    return fragment;
  };

  /* Создайте массив, состоящий из 25 сгенерированных JS объектов,
  которые будут описывать фотографии, размещённые другими пользователями*/
  var arrObjectsPicture = window.data.generate(25);

  /* Отрисуйте сгенерированные DOM-элементы в блок .pictures */
  var fragmentPictures = createFragmentPictures(arrObjectsPicture, pictureTemplate);
  listPictureElements.appendChild(fragmentPictures);
})();
