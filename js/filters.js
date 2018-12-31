'use strict';

/* Модуль для работы с фильтрамии */
(function () {
  var ACTIVE_CLASS_NAME = 'img-filters__button--active';
  var filtersContainerElement = document.querySelector('.img-filters');
  var filterPopularButtonElement = document.querySelector('#filter-popular');
  var filterNewButtonElement = document.querySelector('#filter-new');
  var filterDiscussedButtonElement = document.querySelector('#filter-discussed');

  var unsetActiveButton = function () {
    var activeButton = document.querySelector('.' + ACTIVE_CLASS_NAME);
    activeButton.classList.remove(ACTIVE_CLASS_NAME);
  };

  var updatePictures = window.debounce(function (value) {
    switch (value) {
      case 'filter-popular':
        window.pictures.showOriginal();
        break;
      case 'filter-new':
        window.pictures.showRandom();
        break;
      case 'filter-discussed':
        window.pictures.showMostDiscussed();
        break;
    }
  });

  /* Эти обработчики навешиваются 1 раз на кнопки фильтров и живут до конца,
  пока пользователь не закрыл окно, поэтому их не удаляю. */
  filterPopularButtonElement.addEventListener('click', function () {
    unsetActiveButton();
    filterPopularButtonElement.classList.add(ACTIVE_CLASS_NAME);
    updatePictures('filter-popular');
  });

  filterNewButtonElement.addEventListener('click', function () {
    unsetActiveButton();
    filterNewButtonElement.classList.add(ACTIVE_CLASS_NAME);
    updatePictures('filter-new');
  });

  filterDiscussedButtonElement.addEventListener('click', function () {
    unsetActiveButton();
    filterDiscussedButtonElement.classList.add(ACTIVE_CLASS_NAME);
    updatePictures('filter-discussed');
  });

  window.filters = {
    show: function () {
      filtersContainerElement.classList.remove('img-filters--inactive');
    }
  };
})();
