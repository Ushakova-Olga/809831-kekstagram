'use strict';

/* Модуль для работы с фильтрамии */
(function () {
  var filtersContainerElement = document.querySelector('.img-filters');
  var filterPopularButtonElement = document.querySelector('#filter-popular');
  var filterNewButtonElement = document.querySelector('#filter-new');
  var filterDiscussedButtonElement = document.querySelector('#filter-discussed');
  var picturesSorting = [];

  var unactivateLastButton = function () {
    var activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
  };

  /* Эти обработчики навешиваются 1 раз на кнопки фильтров и живут до конца,
  пока пользователь не закрыл окно, поэтому их не удаляю. */
  filterPopularButtonElement.addEventListener('click', function () {
    unactivateLastButton();
    filterPopularButtonElement.classList.add('img-filters__button--active');
    picturesSorting = window.pictures.getInitialArray();
    window.debounce(updatePictures);
  });

  var updatePictures = function () {
    window.pictures.remove();
    window.pictures.render(picturesSorting);
  };

  filterNewButtonElement.addEventListener('click', function () {
    unactivateLastButton();
    filterNewButtonElement.classList.add('img-filters__button--active');
    picturesSorting = window.pictures.getRandom();
    window.debounce(updatePictures);
  });

  filterDiscussedButtonElement.addEventListener('click', function () {
    unactivateLastButton();
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

    window.debounce(updatePictures);
  });

  window.filters = {
    show: function () {
      filtersContainerElement.classList.remove('img-filters--inactive');
    }
  };
})();
