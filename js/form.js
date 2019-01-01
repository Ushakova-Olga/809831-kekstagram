'use strict';

/* Модуль для работы с формой загрузки и редактирования картинки */
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  // диалоговое окно .img-upload__overlay
  var uploadDivElement = document.querySelector('.img-upload__overlay');
  // Поле ввода имени файла
  var uploadFileInputElement = document.querySelector('#upload-file');
  var closeUploadButtonElement = uploadDivElement.querySelector('.img-upload__cancel');
  // филдсет со скрытыми радиобаттонами, которыми выбирается тот или другой эффект
  var effectsFieldsetElement = uploadDivElement.querySelector('.img-upload__effects');
  var hashInputElement = document.querySelector('.text__hashtags');
  var descriptionTextareaElement = document.querySelector('.text__description');
  var previewImgElement = document.querySelector('.img-upload__preview img');

  /* Обработчик события изменение в поле - имя файла */
  uploadFileInputElement.addEventListener('change', function () {

    /* Предзагрузка изображения */
    var file = uploadFileInputElement.files[0];
    var fileName = file.name.toLowerCase();
    var preview = document.querySelector('.img-upload__preview img');

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      openPopup();
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    } else {
      window.popup.openError('Ошибка! Выбранный файл не является поддерживаемым изображением');
      uploadFileInputElement.value = '';
    }
  });

  /* Функция закрытия окна */
  var closePopup = function () {
    form.reset();
    uploadDivElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    previewImgElement.style = '';
    /* Сброс на значение по умолчанию для слайдера
    и эффектов 100% */
    window.slider.set(window.util.MAX_SLIDER_LENGTH);
    window.slider.deactivatePin();
  };

  /* Обработчик события - нажатие на ESC */
  var onPopupEscPress = window.util.createKeydownHandler(function () {
    /* если фокус находится в поле ввода хэш-тега или поле комментария, нажатие на Esc не должно приводить к
    закрытию формы редактирования изображения.*/
    if ((hashInputElement !== document.activeElement) && (descriptionTextareaElement !== document.activeElement)) {
      closePopup();
    }
  }, window.util.ESC_KEYCODE);

  /* Функция открытия окна */
  var openPopup = function () {
    uploadDivElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.slider.activatePin();
  };

  /* Обработчик события - клик на крестике */
  closeUploadButtonElement.addEventListener('click', function () {
    closePopup();
  });

  /* Обработчик события - нажатие Enter на крестике */
  closeUploadButtonElement.addEventListener('keydown', window.util.createKeydownHandler(closePopup, window.util.ENTER_KEYCODE));

  /* Установка эффектов и слайдера в первоначальное состояние 100% */
  window.slider.set(window.util.MAX_SLIDER_LENGTH);

  effectsFieldsetElement.addEventListener('change', function () {
    window.slider.set(window.util.MAX_SLIDER_LENGTH);
  });

  hashInputElement.addEventListener('input', function (evt) {
    var target = evt.target;
    /* Удалить повторяющиеся пробелы в строке, первый и последний пробел при наличии
    чтобы избежать создания пустых элементов в массиве */
    var value = target.value.replace(/\s+/g, ' ').trim().toLowerCase();
    var hashTags = value.split(' ');
    var hashSpacedSharpTags = value.split('#').slice(1);
    var errorMessage = '';

    if (hashTags.length > window.util.MAX_HASHTAGS) {
      /* нельзя указать больше пяти хэш-тегов; */
      errorMessage = 'Хеш-тегов может быть не более 5-ти';
    } else {
      for (var i = 0; i < hashTags.length; i++) {
        var hashtag = hashTags[i];
        var hashtagsBefore = hashTags.slice(0, Math.max(0, i));
        /* один и тот же хэш-тег не может быть использован дважды; */
        if (hashtagsBefore.indexOf(hashtag) > -1) {
          errorMessage = 'Не может быть двух одинаковых тегов';
          break;
        }
        if (hashtag.length > window.util.MAX_LENGTH_HASHTAG) {
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

      if ((hashTags.length !== hashSpacedSharpTags.length) && (hashTags[0] !== '') && (errorMessage === '')) {
        /* второе условие добавлено на тот случай когда пользователь
        сначала начал вводить теги, а потом удалил, в этом случае событие вызывается и массивы оказываются разной
        длины, в первом оказывается пустой элемент */
        /* хэш-теги разделяются пробелами; */
        errorMessage = 'Разделяйте хеш-теги пробелами';
      }
    }

    target.setCustomValidity(errorMessage);
    if (errorMessage) {
      /* Если есть ошибка надо показать красную рамку*/
      target.classList.add('border-red');
    } else {
      target.classList.remove('border-red');
    }
  });

  /* Закрыть форму после загрузки и задать поля по умолчанию */
  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      closePopup();
      /* Сообщение при успешной загрузке изображения */
      window.popup.openSuccess();
    },
    function () {
      closePopup();
      /* Сообщение при ошибке */
      window.popup.openError();
    });
    evt.preventDefault();
  });
})();
