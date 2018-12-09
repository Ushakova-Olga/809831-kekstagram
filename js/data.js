'use strict';

/* Модуль для работы с данными */
(function () {
  var COMMENT = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var DESCRIPT = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'];

  window.data = {
    getRandomItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    getRandomNumber: function (min, max) {
      if ((min >= 0) && (max > 0) && (max > min)) {
        return (min + Math.floor(Math.random() * (max - min + 1)));
      }
      return 0;
    },
    /* Генерация массива JS объектов */
    generate: function (numObjects) {
      var arrayObjects = [];
      for (var i = 0; i < numObjects; i++) {
        var objectUrl = 'photos/' + (i + 1) + '.jpg';
        var objectLikes = window.data.getRandomNumber(15, 200);
        var objectDescription = window.data.getRandomItem(DESCRIPT);
        var numberComments = window.data.getRandomNumber(0, 9);
        var objectComments = [];

        for (var j = 0; j < numberComments; j++) {
          objectComments [j] = window.data.getRandomItem(COMMENT);
        }

        arrayObjects[i] = {
          url: objectUrl,
          likes: objectLikes,
          comments: objectComments,
          description: objectDescription
        };
      }
      return arrayObjects;
    },
    createElementPicture: function (object, template) {
    /* создание DOM-элемента на основе JS-объекта */
      var objectElement = template.cloneNode(true);
      objectElement.querySelector('.picture__img').src = object.url;
      objectElement.querySelector('.picture__likes').textContent = object.likes;
      objectElement.querySelector('.picture__comments').textContent = object.comments.length;

      /* Здесь навешиваем на клик по маленькой картинке обработчик, который должен вызвать показ большой картинки */
      objectElement.addEventListener('click', function () {
        /* В качестве параметра передаем Js - объект, соответствующий данной маленькой картинке */
        window.bigpicture.showBigPicture(object);
      });
      return objectElement;
    }
  };
})();
