'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // Select logic
  const ENTER_KEYCODE = 13;
  const select = document.querySelector('.feedback__select');
  const selectList = document.querySelector('.feedback__select-list');
  const selectBtn = document.querySelector('.feedback__select-btn');

  function onSelectToggleList() {
    if (select.classList.contains('feedback__select--active')) {
      select.classList.remove('feedback__select--active');
      selectList.removeEventListener('click', onSelectChange);
      selectList.removeEventListener('keydown', onEnterChangeSelect);
      document.body.removeEventListener('click', onBodyCLoseSelect);
    } else {
      select.classList.add('feedback__select--active');
      selectList.addEventListener('click', onSelectChange);
      selectList.addEventListener('keydown', onEnterChangeSelect);
      document.body.addEventListener('click', onBodyCLoseSelect);
    }
  }

  function onSelectChange(evt) {
    const target = evt.target;
    if (target.tagName === 'LI') {
      selectBtn.textContent = target.getAttribute('data-value');
    }
  }

  function onBodyCLoseSelect(evt) {
    const target = evt.target;
    if (!target.closest('.feedback__select')) {
      select.classList.remove('feedback__select--active');
    }
  }

  function onEnterChangeSelect(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onSelectChange(evt);
      select.classList.remove('feedback__select--active');
    }
  }

  if (select) {
    select.addEventListener('click', onSelectToggleList);
  }

  // Slider
  const similarPage = document.querySelector('.similar');

  const sliderOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      bulletClass: 'similar__bullet',
      bulletActiveClass: 'similar__bullet--active'
    }
  };

  let slider = new Swiper('.similar__slider', sliderOptions);

  function destroySlider() {
    if (slider) {
      slider.destroy();
      slider = null;
    }
  }

  function initSlider() {
    if (!slider) {
      slider = new Swiper('.similar__slider', sliderOptions);
    }
  }

  function changeSimilarPage() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      destroySlider();
    } else {
      initSlider();
    }
  }

  if (similarPage) {
    changeSimilarPage();
    window.addEventListener('resize', changeSimilarPage);
  }
});
