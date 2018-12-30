'use strict';

/* Модуль для работы с фильтрамии */
(function () {
  var ACTIVE_CLASS_NAME = 'img-filters__button--active';
  var filtersContainerElement = document.querySelector('.img-filters');
  var filterPopularButtonElement = document.querySelector('#filter-popular');
  var filterNewButtonElement = document.querySelector('#filter-new');
  var filterDiscussedButtonElement = document.querySelector('#filter-discussed');
  var picturesSorting = [];

  var unactivateLastButton = function () {
    var activeButton = document.querySelector('.' + ACTIVE_CLASS_NAME);
    activeButton.classList.remove(ACTIVE_CLASS_NAME);
  };

  /* Эти обработчики навешиваются 1 раз на кнопки фильтров и живут до конца,
  пока пользователь не закрыл окно, поэтому их не удаляю. */
  filterPopularButtonElement.addEventListener('click', function () {
    unactivateLastButton();
    filterPopularButtonElement.classList.add(ACTIVE_CLASS_NAME);
    picturesSorting = window.pictures.getInitialArray();
    updatePictures();
  });

  var updatePictures = window.debounce(function () {
    window.pictures.remove();
    window.pictures.render(picturesSorting);
  });

  filterNewButtonElement.addEventListener('click', function () {
    unactivateLastButton();
    filterNewButtonElement.classList.add(ACTIVE_CLASS_NAME);
    picturesSorting = window.pictures.getRandom();
    updatePictures();
  });

  filterDiscussedButtonElement.addEventListener('click', function () {
    unactivateLastButton();
    filterDiscussedButtonElement.classList.add(ACTIVE_CLASS_NAME);
    picturesSorting = [];
    picturesSorting = window.pictures.getInitialArray();
    picturesSorting.sort(function (first, second) {
      if (first.comments < second.comments) {
        return 1;
      } else if (first.comments > second.comments) {
        return -1;
      }
      return 0;
    });

    updatePictures();
  });

  window.filters = {
    show: function () {
      filtersContainerElement.classList.remove('img-filters--inactive');
    }
  };
})();
