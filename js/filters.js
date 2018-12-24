'use strict';

/* Модуль для работы с фильтрамии */
(function () {
  var filtersContainerElement = document.querySelector('.img-filters');
  var filterPopularButtonElement = document.querySelector('#filter-popular');
  var filterNewButtonElement = document.querySelector('#filter-new');
  var filterDiscussedButtonElement = document.querySelector('#filter-discussed');
  var picturesSorting = [];

  var unactivateButtons = function () {
    filterPopularButtonElement.classList.remove('img-filters__button--active');
    filterNewButtonElement.classList.remove('img-filters__button--active');
    filterDiscussedButtonElement.classList.remove('img-filters__button--active');
  };

  filterPopularButtonElement.addEventListener('click', function () {
    unactivateButtons();
    filterPopularButtonElement.classList.add('img-filters__button--active');
    window.debounce(updatePictures(window.pictures.getInitialArray()));
  });

  var updatePictures = function (pictures) {
    window.pictures.remove();
    window.pictures.render(pictures);
  };

  filterNewButtonElement.addEventListener('click', function () {
    unactivateButtons();
    filterNewButtonElement.classList.add('img-filters__button--active');
    picturesSorting = window.pictures.getRandom();
    window.debounce(updatePictures(picturesSorting));
  });

  filterDiscussedButtonElement.addEventListener('click', function () {
    unactivateButtons();
    filterDiscussedButtonElement.classList.add('img-filters__button--active');
    picturesSorting = [];
    picturesSorting = window.pictures.getInitialArray();
    picturesSorting.sort(function (first, second) {
      if (first.comments < second.comments) {
        return 1;
      } else if (first.comments > second.comments) {
        return -1;
      } else {
        return 0;
      }
    });

    window.debounce(updatePictures(picturesSorting));
  });

  window.filters = {
    show: function () {
      filtersContainerElement.classList.remove('img-filters--inactive');
    }
  };
})();
