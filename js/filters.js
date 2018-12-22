'use strict';

/* Модуль для работы с фильтрамии */
(function () {
  var filters = document.querySelector('.img-filters');

  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var picturesCopyArr = [];

  filterPopular.addEventListener('click', function () {
    window.debounce(updatePictures(window.pictures.getInitialArray()));
  });

  var updatePictures = function (pictures) {
    window.pictures.remove();
    window.pictures.render(pictures);
  };

  filterNew.addEventListener('click', function () {
    picturesCopyArr = window.pictures.getRandom();
    window.debounce(updatePictures(picturesCopyArr));
  });

  filterDiscussed.addEventListener('click', function () {
    picturesCopyArr = [];
    picturesCopyArr = window.pictures.getInitialArray();
    picturesCopyArr.sort(function (first, second) {
      if (first.comments < second.comments) {
        return 1;
      } else if (first.comments > second.comments) {
        return -1;
      } else {
        return 0;
      }
    });

    window.debounce(updatePictures(picturesCopyArr));
  });

  window.filters = {
    show: function () {
      filters.classList.remove('img-filters--inactive');
    }
  };
})();
