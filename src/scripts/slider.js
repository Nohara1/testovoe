const mainBanner = document.querySelector(".main-banner__slider");
if (mainBanner) {
  new Swiper(mainBanner, {
    createElements: true,
    modules: [Navigation, Pagination, Autoplay, Thumbs],
    wrapperClass: "main-banner__slider-wrapper",
    slideClass: "main-banner__slide",
    navigation: {
      prevEl: ".main-banner__nav_prev",
      nextEl: ".main-banner__nav_next",
    },
    pagination: {
      el: ".main-banner__pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
    slidesPerView: "1",
    spaceBetween: 0,
    focusableElements: "input, select, option, textarea, video, label",
    // preventInteractionOnTransition: true,
    // touchMoveStopPropagation: true,
  });
}

// product card sliders swiper //
const pcsClass = "product-card-slider__",
  pcsSlidersClasses = ["pcs-slider-01", "pcs-slider-02"];
const pcsSlides = document.querySelectorAll(`.${pcsClass}swiper-wrapper > *`);
// let currentThumbsElement = null;

if (pcsSlides.length) {
  const pcsThumbsSwiperConfig = {
    direction: "vertical",
    autoHeight: true,
    spaceBetween: 10,
    slidesPerView: 3,
    centeredSlides: true,
    normalizeSlideIndex: false,
    centeredSlidesBounds: true,
    slideToClickedSlide: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    wrapperClass: pcsClass + "swiper-wrapper",
    slideClass: pcsClass + "slide",
    // breakpoints: {
    //   0: {
    //     spaceBetween: 15,
    //   },
    //   576: {
    //     spaceBetween: 20,
    //   },
    //   1200: {
    //     spaceBetween: 30,
    //   },
    //   1366: {
    //     spaceBetween: 46,
    //   },
    // },
  };
  const pcsThumbsSwiper01 = new Swiper(
    `.${pcsClass}swiper--thumbs.${pcsSlidersClasses[0]}`,
    pcsThumbsSwiperConfig
  );
  // const pcsThumbsSwiper02 = new Swiper(
  //   `.${pcsClass}swiper--thumbs.${pcsSlidersClasses[1]}`,
  //   pcsThumbsSwiperConfig
  // );

  const pcsMainSwiperConfig = {
    modules: [Thumbs],
    grabCursor: false,
    slidesPerView: 1,
    roundLengths: true,
    wrapperClass: pcsClass + "swiper-wrapper",
    slideClass: pcsClass + "slide",
    watchSlidesProgress: true,
    thumbs: {
      swiper: pcsThumbsSwiper01,
    },
  };
  // currentThumbsElement = pcsThumbsSwiper01;
  
  // eslint-disable-next-line no-unused-vars
  const pcsMainSwiper01 = new Swiper(
    `.${pcsClass}swiper--main.${pcsSlidersClasses[0]}`,
    pcsMainSwiperConfig
  );
  // currentThumbsElement = pcsThumbsSwiper02;
  // const pcsMainSwiper02 = new Swiper(
  //   `.${pcsClass}swiper--main.${pcsSlidersClasses[1]}`,
  //   pcsMainSwiperConfig
  // );
  // currentThumbsElement = null;

  // pcsMainSwiper01.on("slideChangeTransitionStart", function () {
  //   pcsThumbsSwiper01.slideTo(pcsMainSwiper01.activeIndex);
  // });
  // pcsThumbsSwiper01.on("transitionStart", function () {
  //   pcsMainSwiper01.slideTo(pcsThumbsSwiper01.activeIndex);
  // });
  // pcsMainSwiper02.on("slideChangeTransitionStart", function () {
  //   pcsThumbsSwiper02.slideTo(pcsMainSwiper02.activeIndex);
  // });
  // pcsThumbsSwiper02.on("transitionStart", function () {
  //   pcsMainSwiper02.slideTo(pcsThumbsSwiper02.activeIndex);
  // });
}

// custom slider swiper //
const csSlides = document.querySelectorAll(
  ".custom-slider__swiper-wrapper > *"
);

if (csSlides.length) {
  const csSwipers = document.querySelectorAll(".custom-slider__swiper");

  csSwipers.forEach((slider) => {
    const csNext = slider.querySelector(".custom-slider__nav-btn_next");
    const csPrev = slider.querySelector(".custom-slider__nav-btn_prev");
    const csPagination = slider.querySelector(".custom-slider__pagination");

    let modulesConfig = [];
    const mSlides = slider.dataset?.mobSlides
      ? slider.dataset.mobSlides === "auto"
        ? "auto"
        : +slider.dataset.mobSlides
      : false;
    const gap = slider.dataset?.gap ? +slider.dataset.gap : false;
    const slides = slider.dataset?.slides ? +slider.dataset.slides : false;

    csNext ? modulesConfig.push(Navigation) : null;
    // csPagination ? modulesConfig.push(Pagination) : null;

    // const csKeyboard = {
    //   keyboard: {
    //     enabled: true,
    //     // onlyInViewport: true,
    //   },
    // };

    // const csMousewheel = {
    //   mousewheel: {
    //     forceToAxis: true,
    //     thresholdDelta: 70,
    //   },
    // };

    const csNavigation = {
      navigation: {
        nextEl: csNext,
        prevEl: csPrev,
        lockClass: "custom-slider__nav-btn_lock",
        disabledClass: "custom-slider__nav-btn_disabled",
      },
    };

    const csPaginationConfig = {
      pagination: {
        el: csPagination,
        type: "bullets",
        clickable: true,
        dynamicBullets: false,
        modifierClass: "custom-slider__pagination-",
        lockClass: "custom-slider__pagination_lock",
      },
    };

    const csSwiperConfig = {
      modules: modulesConfig,
      loop: false,
      rewind: false,
      grabCursor: true,
      // centeredSlides: true,
      // centeredSlidesBounds: true,
      setWrapperSize: true,
      roundLengths: true,
      // edgeSwipeDetection: true,
      slideClass: "custom-slider__slide",
      watchSlidesProgress: true,
      slideVisibleClass: "custom-slider__slide_visible",
      containerModifierClass: "custom-slider__swiper-",
      wrapperClass: "custom-slider__swiper-wrapper",
      breakpoints: {
        0: {
          slidesPerView: mSlides ? mSlides : 2,
          spaceBetween: gap ? Math.floor(gap / 3) : 0,
        },
        576: {
          slidesPerView: slides ? Math.ceil(slides / 2) : "auto",
          spaceBetween: gap ? Math.floor(gap / 2) : 0,
        },
        992: {
          slidesPerView: slides ? Math.ceil(slides / 1.5) : "auto",
          spaceBetween: gap ? Math.floor(gap / 1.5) : 0,
        },
        1366: {
          slidesPerView: slides ? slides : "auto",
          spaceBetween: gap ? gap : 0,
        },
      },
      on: {
        init: function () {
          this.slides.forEach((slide) => addCategoryClass(slide));
          updateSliderLockedState(this);
        },
        update: function () {
          updateSliderLockedState(this);
        },
        resize: function () {
          updateSliderLockedState(this);
        },
        slideChange: function () {
          updateSliderCounter(this);
        },
        // activeIndexChange: function () {},
        // reachBeginning: function () {
        // },
        // reachEnd: function () {
        // },
      },
    };

    if (csNext) Object.assign(csSwiperConfig, csNavigation);
    if (csPagination) Object.assign(csSwiperConfig, csPaginationConfig);
    // if (csA11y) Object.assign(csSwiperConfig, csKeyboard, csMousewheel);

    new Swiper(slider, csSwiperConfig);
  });

  document.documentElement.addEventListener("click", function (event) {
    const button = event.target.closest("[data-switch-category]");
    if (button) showCorrectCategory(button);
    return;
  });
}

// our work category switcher //

// const owFilterButtons = document.querySelectorAll(".our-work__list-button");
// const owItems = document.querySelectorAll(".our-work__item");

// if (owFilterButtons.length && owItems.length) {
//   owFilterButtons.forEach((button) =>
//     button.addEventListener("click", () => {
//       showCorrectCategory(button.value, owItems);
//       switchCategoryButton(button, owFilterButtons);
//     })
//   );
// }

// our-goods swiper //

const ogFilterButtons = document.querySelectorAll(".our-goods__button");
let ogSlides = null;

if (ogFilterButtons.length) {
  ogFilterButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      showCorrectCategory(event.currentTarget.value, ogSlides);
      switchCategoryButton(event.currentTarget, ogFilterButtons);
      ogSwiper.update();
    })
  );
  // eslint-disable-next-line no-unused-vars
  const ogSwiper = new Swiper(".our-goods__swiper", {
    modules: [Navigation],
    loop: false,
    // loopAdditionalSlides: 2,
    rewind: false,
    grabCursor: true,
    slidesPerView: "auto", //5,
    spaceBetween: 40,
    //autoHeight: true,
    setWrapperSize: true,
    containerModifierClass: "our-goods__swiper-",
    wrapperClass: "our-goods__swiper-wrapper",

    //pagination: {
    //  el: '.swiper-pagination',
    //},

    navigation: {
      nextEl: ".our-goods__nav-btn_next",
      prevEl: ".our-goods__nav-btn_prev",
      lockClass: "our-goods__nav-btn_lock",
      disabledClass: "our-goods__nav-btn_disabled",
    },
    breakpoints: {
      0: {
        slidesPerView: "auto",
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1367: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
    // breakpoints: {
    //   320: {
    //     slidesPerView: 1,
    //   },
    //   576: {
    //     slidesPerView: 2,
    //   },
    //   768: {
    //     slidesPerView: 3,
    //   },
    //   992: {
    //     slidesPerView: 4,
    //   },
    //   1200: {
    //     slidesPerView: 5,
    //   },
    // },
    on: {
      init: function () {
        updateSliderLockedState(this);
        ogSlides = this.slides;
        showCorrectCategory("bestseller", ogSlides);
      },
      // observerUpdate: function () {
      //   console.log("observerUpdate");
      // },
      // lock: function () {
      //   console.log("lock");
      // },
      update: function () {
        updateSliderLockedState(this);
        // console.log('update');
      },
      resize: function () {
        updateSliderLockedState(this);
      },
    },
  });
}

// tabs overlapping handler
const tabsContainers = document.querySelectorAll("._nav-slider");
if (tabsContainers.length) {
  tabsContainers.forEach(function (container) {
    new Swiper(container, {
      createElements: true,
      wrapperClass: "_nav-slider__wrapper",
      slideClass: "_nav-slider__slide",
      slidesPerView: "auto",
      spaceBetween: 0,
      focusableElements: "input, select, option, textarea, video, label",
      // preventInteractionOnTransition: true,
      // touchMoveStopPropagation: true
    });
  });
}
// popular categories //

const popularCategories = document.querySelectorAll(".popular-categories");

if (popularCategories.length) {
  // eslint-disable-next-line no-unused-vars
  const pcSwiper = new Swiper(".popular-categories__items-wrapper", {
    modules: [Navigation],
    loop: false,
    rewind: false,
    grabCursor: true,
    slidesPerView: "auto",
    initialSlide: 0,
    spaceBetween: 30,
    autoHeight: false,
    setWrapperSize: true,
    wrapperClass: "popular-categories__items",
    slideClass: "popular-categories__item",
    navigation: {
      nextEl: ".popular-categories__nav-btn_next",
      prevEl: ".popular-categories__nav-btn_prev",
      lockClass: "popular-categories__nav-btn_lock",
      disabledClass: "popular-categories__nav-btn_disabled",
    },
    breakpoints: {
      0: {
        initialSlide: 1,
        spaceBetween: 10,
        centeredSlides: true,
      },
      576: {
        initialSlide: 0,
        spaceBetween: 30,
        centeredSlides: false,
      },
    },
    on: {
      init: function () {
        updateSliderLockedState(this);
      },
      update: function () {
        updateSliderLockedState(this);
      },
      resize: function () {
        updateSliderLockedState(this);
      },
    },
  });
}

function updateSliderLockedState(slider) {
  slider.isLocked
    ? slider.el.classList.add("locked")
    : slider.el.classList.remove("locked");
}
function updateSliderCounter(slider) {
  const counterEl = slider.el.querySelector(".custom-slider__counter");
  if (!counterEl) return;

  const counterCurrent = counterEl.querySelector(
      ".custom-slider__counter-current"
    ),
    counterTotal = counterEl.querySelector(".custom-slider__counter-total");

  counterCurrent.innerHTML = +slider.realIndex + 1;
  counterTotal.innerHTML = slider.slides.length;
}

function showCorrectCategory(category, slides) {
  if (slides === null) return;
  slides.forEach((slide) => addCategoryClass(slide, category));
}

function addCategoryClass(slide, buttonCategory) {
  if (!slide.dataset.slideCategory) return;
  const slideCategories = slide.dataset.slideCategory.split(",");
  if (buttonCategory === "")
    return slide.classList.add(`${slide.classList[0]}_show`);
  slide.classList.remove(`${slide.classList[0]}_show`);
  if (!slideCategories.includes(buttonCategory)) return;
  slide.classList.add(`${slide.classList[0]}_show`);
}

function switchCategoryButton(button, allButtons) {
  allButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
}

import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import Swiper from "swiper";
