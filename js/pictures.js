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
var MAX_HASHTAGS = 5;
var MAX_LENGTH_HASHTAG = 20;

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var listPictureElements = document.querySelector('.pictures');
// Поле ввода имени файла
var uploadFileInput = document.querySelector('#upload-file');
// диалоговое окно .img-upload__overlay
var upload = document.querySelector('.img-upload__overlay');
var uploadClose = upload.querySelector('.img-upload__cancel');
// картинка с предпросмотром эффектов
var imgUploadPrev = upload.querySelector('.img-upload__preview img');
// филдсет со скрытыми радиобаттонами, которыми выбирается тот или другой эффект
var effectRadioButtons = upload.querySelector('.img-upload__effects');
var blockBigPicture = document.querySelector('.big-picture');
var blockBigPictureCancel = document.querySelector('.big-picture__cancel');
var inputHash = document.querySelector('.text__hashtags');

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

/*  Функция, которая осуществляет показ большой картинки */
var showBigPicture = function (pictureJsObject) {
  blockBigPicture.classList.remove('hidden');
  blockBigPicture.querySelector('.big-picture__img img').src = pictureJsObject.url;
  blockBigPicture.querySelector('.likes-count').textContent = pictureJsObject.likes;
  blockBigPicture.querySelector('.comments-count').textContent = pictureJsObject.comments.length;

  var comment = '';
  for (var i = 0; i < pictureJsObject.comments.length; i++) {
    comment += '<li class="social__comment"><img class="social__picture" src="img/avatar-'
      + getRandomNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
      + pictureJsObject.comments[i] + '</p></li>';
  }

  blockBigPicture.querySelector('.social__comments').innerHTML = comment;
  blockBigPicture.querySelector('.social__caption').textContent = pictureJsObject.description;
};


/* создание DOM-элемента на основе JS-объекта */
var createElementPicture = function (object, template) {
  var objectElement = template.cloneNode(true);
  objectElement.querySelector('.picture__img').src = object.url;
  objectElement.querySelector('.picture__likes').textContent = object.likes;
  objectElement.querySelector('.picture__comments').textContent = object.comments.length;

  /* Здесь навешиваем на клик по маленькой картинке обработчик, который должен вызвать показ большой картинки */
  objectElement.addEventListener('click', function () {
    /* В качестве параметра передаем Js - объект, соответствующий данной маленькой картинке */
    showBigPicture(object);
  });
  return objectElement;
};

/* функция заполнения блока DOM-элементами на основе массива JS-объектов */
var createFragmentPictures = function (arr, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createElementPicture(arr[i], template, i));
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
  /* если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к
  закрытию формы редактирования изображения.*/
  if ((evt.keyCode === ESC_KEYCODE) && (inputHash !== document.activeElement)) {
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
  imgUploadPrev.className = '';
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

effectRadioButtons.addEventListener('change', function () {
  var checked = effectRadioButtons.querySelector('input:checked');
  imgUploadPrev.className = 'effects__preview--' + checked.value;
});

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

inputHash.addEventListener('input', function (evt) {
  var target = evt.target;
  /* Удалить повторяющиеся пробелы в строке, первый и последний пробел при наличии
  чтобы избежать создания пустых элементов в массиве */
  var value = target.value.replace(/\s+/g, ' ').trim().toLowerCase();
  var hashArr = value.split(' ');
  var hashArr2 = value.split('#').slice(1);
  var errorMessage = '';

  if (hashArr.length > MAX_HASHTAGS) {
    /* нельзя указать больше пяти хэш-тегов; */
    errorMessage = 'Хеш-тегов может быть не более 5-ти';
  } else {
    for (var i = 0; i < hashArr.length; i++) {
      var hashtag = hashArr[i];
      var hashtagsBefore = hashArr.slice(0, Math.max(0, i));
      /* один и тот же хэш-тег не может быть использован дважды; */
      if (hashtagsBefore.indexOf(hashtag) > -1) {
        errorMessage = 'Не может быть двух одинаковых тегов';
        break;
      }
      if (hashtag.length > MAX_LENGTH_HASHTAG) {
        /* максимальная длина одного хэш-тега 20 символов, включая решётку;*/
        errorMessage = 'Хеш-теги не могут быть больше 20-ти символов';
        break;
      } else if ((hashtag.length === 1) && (hashtag[0] === '#')) {
        /* хеш-тег не может состоять только из одной решётки;*/
        errorMessage = 'Хеш-теги не могут состоять из одной решетки';
        break;
      } else if ((hashtag[0] !== '#') && (hashtag.length > 0)) {
        /* хэш-тег начинается с символа # (решётка);*/
        errorMessage = 'Первый символ у хеш-тега должен быть решеткой';
        break;
      }
    }

    if ((hashArr.length !== hashArr2.length) && (hashArr[0] !== '')) {
      /* второе условие добавлено на тот случай когда пользователь
      сначала начал вводить теги, а потом удалил, в этом случае событие вызывается и массивы оказываются разной
      длины, в первом оказывается пустой элемент */
      /* хэш-теги разделяются пробелами; */
      errorMessage = 'Разделяйте хеш-теги пробелами';
    }
  }

  target.setCustomValidity(errorMessage);
});
