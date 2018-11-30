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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var listPictureElements = document.querySelector('.pictures');
// Поле ввода имени файла
var uploadFileInput = document.querySelector('#upload-file');
// диалоговое окно .img-upload__overlay
var upload = document.querySelector('.img-upload__overlay');
var uploadClose = upload.querySelector('.img-upload__cancel');
var imgUploadPrev = upload.querySelector('.img-upload__preview');
var effectNone = upload.querySelector('.effects__preview--none');
var effectChrome = upload.querySelector('.effects__preview--chrome');
var effectSepia = upload.querySelector('.effects__preview--sepia');
var effectMarvin = upload.querySelector('.effects__preview--marvin');
var effectPhobos = upload.querySelector('.effects__preview--phobos');
var effectHeat = upload.querySelector('.effects__preview--heat');
var blockBigPicture = document.querySelector('.big-picture');
var blockBigPictureCancel = document.querySelector('.big-picture__cancel');

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function (min, max) {
  if ((min >= 0) && (max > 0) && (max > min)) {
    return (min + Math.floor(Math.random() * (max - min + 1)));
  }
  return 0;
};

/* Генерация массива JS объектов */
var generate = function (numObjects) {
  var arrayObjects = [];

  for (var i = 0; i < numObjects; i++) {
    var objectUrl = 'photos/' + (i + 1) + '.jpg';
    var objectLikes = getRandomNumber(15, 200);
    var objectDescription = getRandomItem(DESCRIPT);
    var numberComments = getRandomNumber(0, 9);
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
var createElementPicture = function (object, template) {
  var objectElement = template.cloneNode(true);
  objectElement.querySelector('.picture__img').src = object.url;
  objectElement.querySelector('.picture__likes').textContent = object.likes;
  objectElement.querySelector('.picture__comments').textContent = object.comments.length;

  return objectElement;
};

/* функция заполнения блока DOM-элементами на основе массива JS-объектов */
var createFragmentPictures = function (arr, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createElementPicture(arr[i], template));
  }
  return fragment;
};

/* Создайте массив, состоящий из 25 сгенерированных JS объектов,
которые будут описывать фотографии, размещённые другими пользователями*/
var arrObjectsPicture = generate(25);

/* Отрисуйте сгенерированные DOM-элементы в блок .pictures */
var fragmentPictures = createFragmentPictures(arrObjectsPicture, pictureTemplate);
listPictureElements.appendChild(fragmentPictures);

// Задание 4
/* Обработчик события изменеие в поле - имя файла */
uploadFileInput.addEventListener('change', function () {
  openPopup();
});

/* Обработчик события - нажатие на ESC */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

/* Функция открытия окна */
var openPopup = function () {
  upload.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

/* Функция закрытия окна */
var closePopup = function () {
  upload.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  uploadFileInput.value = '';
  effectListenerRemove(effectNone, 'effects__preview--none');
  effectListenerRemove(effectChrome, 'effects__preview--chrome');
  effectListenerRemove(effectSepia, 'effects__preview--sepia');
  effectListenerRemove(effectMarvin, 'effects__preview--marvin');
  effectListenerRemove(effectPhobos, 'effects__preview--phobos');
  effectListenerRemove(effectHeat, 'effects__preview--heat');
  imgUploadPrev.classList.remove(lastMethod);
  lastMethod = '';
};

/* Обработчик события - клик на крестике */
uploadClose.addEventListener('click', function () {
  closePopup();
});

/* Обработчик события - нажатие Enter на крестике */
uploadClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Пока не могла доделать и отладить потому что сегодня без мышки, с тач падом
/* var pin = document.querySelector('.effect-level__pin');
console.log(pin);
pin.addEventListener('mouseup', function(evt){
  var procent;
  console.log(evt);
  console.log(pin);
  procent= 100 * evt.offsetX / 455;
});*/

var lastMethod;
var effectListenerAdd = function (effectName, effectClass) {
  effectName.addEventListener('click', function () {
    if (lastMethod) {
      imgUploadPrev.classList.remove(lastMethod);
    }
    imgUploadPrev.classList.add(effectClass);
    lastMethod = effectClass;
  });
};

var effectListenerRemove = function (effectName, effectClass) {
  effectName.removeEventListener('click', function () {
    if (lastMethod) {
      imgUploadPrev.classList.remove(lastMethod);
    }
    imgUploadPrev.classList.add(effectClass);
    lastMethod = effectClass;
  });
};


effectListenerAdd(effectNone, 'effects__preview--none');
effectListenerAdd(effectChrome, 'effects__preview--chrome');
effectListenerAdd(effectSepia, 'effects__preview--sepia');
effectListenerAdd(effectMarvin, 'effects__preview--marvin');
effectListenerAdd(effectPhobos, 'effects__preview--phobos');
effectListenerAdd(effectHeat, 'effects__preview--heat');

/* Показать элемент .big-picture */
var picturesArr = listPictureElements.querySelectorAll('.picture');

var addEventPictures = function (index) {
  picturesArr[index].addEventListener('click', function () {
    blockBigPicture.classList.remove('hidden');
    blockBigPicture.querySelector('.big-picture__img img').src = arrObjectsPicture[index].url;
    blockBigPicture.querySelector('.likes-count').textContent = arrObjectsPicture[index].likes;
    blockBigPicture.querySelector('.comments-count').textContent = arrObjectsPicture[index].comments.length;

    var comment = '';
    for (var j = 0; j < arrObjectsPicture[index].comments.length; j++) {
      comment += '<li class="social__comment"><img class="social__picture" src="img/avatar-'
        + getRandomNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
        + arrObjectsPicture[index].comments[j] + '</p></li>';
    }

    blockBigPicture.querySelector('.social__comments').innerHTML = comment;
    blockBigPicture.querySelector('.social__caption').textContent = arrObjectsPicture[index].description;
  });
};

for (var i = 0; i < picturesArr.length; i++) {
  addEventPictures(i);
}

/* Закрытие большой картинки */
blockBigPictureCancel.addEventListener('click', function () {
  blockBigPicture.classList.add('hidden');
});


var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    blockBigPicture.classList.add('hidden');
  }
};
document.addEventListener('keydown', onBigPictureEscPress);

/* Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев  */
/* blockBigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
blockBigPicture.querySelector('.comments-loader').classList.add('visually-hidden');*/
