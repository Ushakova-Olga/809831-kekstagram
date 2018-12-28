'use strict';

/* Модуль для работы с фильтрамии */
(function () {
  var filtersContainerElement = document.querySelector('.img-filters');
  var filterPopularButtonElement = document.querySelector('#filter-popular');
  var filterNewButtonElement = document.querySelector('#filter-new');
  var filterDiscussedButtonElement = document.querySelector('#filter-discussed');
  var picturesSorting = [];
  var currentFilter;

  var hasClass = function (element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  };

  var setCurrentFilter = function () {
    if (hasClass(filterPopularButtonElement, 'img-filters__button--active')) {
      currentFilter = '#filter-popular';
    } else if (hasClass(filterNewButtonElement, 'img-filters__button--active')) {
      currentFilter = '#filter-new';
    } else if (hasClass(filterDiscussedButtonElement, 'img-filters__button--active')) {
      currentFilter = '#filter-discussed';
    }
  };

  var unactivatePreviousButton = function () {
    if (currentFilter) {
      switch (currentFilter) {
        case '#filter-popular':
          filterPopularButtonElement.classList.remove('img-filters__button--active');
          break;
        case '#filter-new':
          filterNewButtonElement.classList.remove('img-filters__button--active');
          break;
        case '#filter-discussed':
          filterDiscussedButtonElement.classList.remove('img-filters__button--active');
          break;
      }
    }
  };

  var onPopularButtonPressed = window.debounce(function () {
    if (currentFilter !== '#filter-popular') {
      unactivatePreviousButton();
      filterPopularButtonElement.classList.add('img-filters__button--active');
      picturesSorting = window.pictures.getInitialArray();
      updatePictures(picturesSorting);
      currentFilter = '#filter-popular';
    }
  });

  var updatePictures = function (pictures) {
    window.pictures.remove();
    window.pictures.render(pictures);
  };

  var onNewButtonPressed = window.debounce(function () {
    if (currentFilter !== '#filter-new') {
      unactivatePreviousButton();
      filterNewButtonElement.classList.add('img-filters__button--active');
      picturesSorting = window.pictures.getRandom();
      updatePictures(picturesSorting);
      currentFilter = '#filter-new';
    }
  });

  var onDiscussedButtonPressed = window.debounce(function () {
    if (currentFilter !== '#filter-discussed') {
      unactivatePreviousButton();
      filterDiscussedButtonElement.classList.add('img-filters__button--active');
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

      updatePictures(picturesSorting);
      currentFilter = '#filter-discussed';
    }
  });

  setCurrentFilter();
  /* Эти обработчики навешиваются 1 раз на кнопки фильтров и живут до конца,
  пока пользователь не закрыл окно, поэтому их не удаляю. */
  filterPopularButtonElement.addEventListener('click', onPopularButtonPressed);
  filterNewButtonElement.addEventListener('click', onNewButtonPressed);
  filterDiscussedButtonElement.addEventListener('click', onDiscussedButtonPressed);

  window.filters = {
    show: function () {
      filtersContainerElement.classList.remove('img-filters--inactive');
    }
  };
})();
