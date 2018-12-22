'use strict';

/* Модуль для работы с формой загрузки и редактирования картинки */
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  // диалоговое окно .img-upload__overlay
  var upload = document.querySelector('.img-upload__overlay');
  // Поле ввода имени файла
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadClose = upload.querySelector('.img-upload__cancel');
  // филдсет со скрытыми радиобаттонами, которыми выбирается тот или другой эффект
  var effectRadioButtons = upload.querySelector('.img-upload__effects');
  var inputHash = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');
  var imgPreview = document.querySelector('.img-upload__preview img');

  /* Обработчик события изменение в поле - имя файла */
  uploadFileInput.addEventListener('change', function () {
    openPopup();
    /* Предзагрузка изображения */
    var file = uploadFileInput.files[0];
    var fileName = file.name.toLowerCase();
    var preview = document.querySelector('.img-upload__preview img');

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  /* Функция закрытия окна */
  var closePopup = function () {
    /* если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к
    закрытию формы редактирования изображения.*/
    if ((inputHash !== document.activeElement) && (inputDescription !== document.activeElement)) {
      upload.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      uploadFileInput.value = '';
      imgPreview.style.transform = 'scale(1)';
      /* На всякий случай сброс на значение по умолчанию для слайдера
      и эффектов 100%, эффект берется из формы последний выбранный пользователем */
      window.slider.setSlider(window.util.MAX_SLIDER_LENGTH);
    }
  };

  /* Обработчик события - нажатие на ESC */
  var onPopupEscPress = window.util.createKeydownHandler(closePopup, window.util.ESC_KEYCODE);

  /* Функция открытия окна */
  var openPopup = function () {
    upload.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  /* Обработчик события - клик на крестике */
  uploadClose.addEventListener('click', function () {
    closePopup();
  });

  /* Обработчик события - нажатие Enter на крестике */
  uploadClose.addEventListener('keydown', window.util.createKeydownHandler(closePopup, window.util.ENTER_KEYCODE));

  /* Установка эффектов и слайдера в первоначальное состояние 100% */
  window.slider.setSlider(window.util.MAX_SLIDER_LENGTH);

  effectRadioButtons.addEventListener('change', function () {
    window.slider.setSlider(window.util.MAX_SLIDER_LENGTH);
  });

  inputHash.addEventListener('input', function (evt) {
    var target = evt.target;
    /* Удалить повторяющиеся пробелы в строке, первый и последний пробел при наличии
    чтобы избежать создания пустых элементов в массиве */
    var value = target.value.replace(/\s+/g, ' ').trim().toLowerCase();
    var hashArr = value.split(' ');
    var hashArr2 = value.split('#').slice(1);
    var errorMessage = '';

    if (hashArr.length > window.util.MAX_HASHTAGS) {
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

      if ((hashArr.length !== hashArr2.length) && (hashArr[0] !== '') && (errorMessage === '')) {
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
      form.reset();
      closePopup();
      /* Сообщение при успешной загрузке изображения */
      window.popup.openSuccess();
    },
    function () {
      form.reset();
      closePopup();
      /* Сообщение при ошибке */
      window.popup.openError();
    });
    evt.preventDefault();
  });
})();
