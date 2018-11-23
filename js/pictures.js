// Файл pictures.js
'use strict';

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

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/* Генерация массива JS объектов */
var generate = function (numObjects) {
  var arrayObjects = [];

  for (var i = 0; i < numObjects; i++) {
    var objectUrl = 'photos/' + (i + 1) + '.jpg';
    var objectLikes = 15 + Math.floor(Math.random() * 186);

    var objectDescription = getRandomItem(DESCRIPT);
    var numberComments = Math.floor(Math.random() * 10);
    var objectComments = [];

    for (var j = 0; j < numberComments; j++) {
      objectComments [j] = getRandomItem(COMMENT);
    }

    arrayObjects[i] = {
      url: objectUrl,
      likes: objectLikes,
      comments: objectComments,
      description: objectDescription
    };
  }
  return arrayObjects;
};

/* создание DOM-элемента на основе JS-объекта */
var createObject = function (object, template) {
  var objectElement = template.cloneNode(true);
  objectElement.querySelector('.picture__img').src = object.url;
  objectElement.querySelector('.picture__likes').textContent = object.likes;
  objectElement.querySelector('.picture__comments').textContent = object.comments.length;

  return objectElement;
};

/* функция заполнения блока DOM-элементами на основе массива JS-объектов */
var appendObjects = function (arr, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createObject(arr[i], template));
  }
  return fragment;
};


/* Создайте массив, состоящий из 25 сгенерированных JS объектов,
которые будут описывать фотографии, размещённые другими пользователями*/
var arrObjectsPicture = generate(25);


/* На основе данных, созданных в предыдущем пункте
и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и
заполните их данными из массива: */
var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

/* 3. Отрисуйте сгенерированные DOM-элементы в блок .pictures */
var fragmentObjects = appendObjects(arrObjectsPicture, pictureTemplate);
var listPictureElements = document.querySelector('.pictures');
listPictureElements.appendChild(fragmentObjects);

/* 4. Покажите элемент .big-picture */
var blockBigPicture = document.querySelector('.big-picture');
blockBigPicture.classList.remove('hidden');


blockBigPicture.querySelector('.big-picture__img img').src = arrObjectsPicture[0].url;
blockBigPicture.querySelector('.likes-count').textContent = arrObjectsPicture[0].likes;
blockBigPicture.querySelector('.comments-count').textContent = arrObjectsPicture[0].comments.length;

var comment = '';
for (var i = 0; i < arrObjectsPicture[0].comments.length; i++) {
  comment += '<li class="social__comment"><img class="social__picture" src="img/avatar-'
    + Math.floor(1 + Math.random() * 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
    + arrObjectsPicture[0].comments[i] + '</p></li>';
}

blockBigPicture.querySelector('.social__comments').innerHTML = comment;
blockBigPicture.querySelector('.social__caption').textContent = arrObjectsPicture[0].description;

/* 5. Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев  */
blockBigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
blockBigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
