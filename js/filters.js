'use strict';

/* Модуль для работы с фильтрамии */
(function () {
  var filtersContainerElement = document.querySelector('.img-filters');
  var filterPopularButtonElement = document.querySelector('#filter-popular');
  var filterNewButtonElement = document.querySelector('#filter-new');
  var filterDiscussedButtonElement = document.querySelector('#filter-discussed');

  var unactivateButtons = function () {
    filterPopularButtonElement.classList.remove('img-filters__button--active');
    filterNewButtonElement.classList.remove('img-filters__button--active');
    filterDiscussedButtonElement.classList.remove('img-filters__button--active');
  };

  /* Эти обработчики навешиваются 1 раз на кнопки фильтров и живут до конца,
  пока пользователь не закрыл окно, поэтому их не удаляю. */
  /* filterPopularButtonElement.addEventListener('click', window.debounce(function () {
    unactivateButtons();
    filterPopularButtonElement.classList.add('img-filters__button--active');
    window.pictures.showOriginal();
  }));*/

  filterPopularButtonElement.addEventListener('click', function () {
    unactivateButtons();
    filterPopularButtonElement.classList.add('img-filters__button--active');
    window.debounce(window.pictures.showOriginal);
  });


  /* filterNewButtonElement.addEventListener('click', window.debounce(function () {
    unactivateButtons();
    filterNewButtonElement.classList.add('img-filters__button--active');
    window.pictures.showRandom();
  }));*/

  filterNewButtonElement.addEventListener('click', function () {
    unactivateButtons();
    filterNewButtonElement.classList.add('img-filters__button--active');
    window.debounce(window.pictures.showRandom);
  });

  /* filterDiscussedButtonElement.addEventListener('click', window.debounce(function () {
    unactivateButtons();
    filterDiscussedButtonElement.classList.add('img-filters__button--active');
    window.pictures.showMostDiscussed();
  }));*/

  filterDiscussedButtonElement.addEventListener('click', function () {
    unactivateButtons();
    filterDiscussedButtonElement.classList.add('img-filters__button--active');
    window.debounce(window.pictures.showMostDiscussed);
  });

  window.filters = {
    show: function () {
      filtersContainerElement.classList.remove('img-filters--inactive');
    }
  };
})();
