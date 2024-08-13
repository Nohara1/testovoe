export const myPopupOverlay = new popupOverlay();
export const myGallery = new gallery();
export const mySetAnchorsEvents = new setAnchorsEvents();

export function toggleClassOnClick(itemsClick, classToItem, nameOfClass) {
  document.documentElement.addEventListener("click", function (event) {
    const button = event.target.closest(itemsClick);

    if (!button) return;

    toggle(button, classToItem, nameOfClass);
  });

  function toggle(button, toItem, className) {
    let closestItem = "";

    if (toItem.indexOf("closest") > -1) {
      closestItem = toItem.split(".")[1];
      toItem = "closest";
    }

    switch (toItem) {
      case "parent":
        button.parentElement.classList.toggle(className);
        break;
      case "previous":
        button.previousElementSibling.classList.toggle(className);
        break;
      case "closest":
        var closest = button.closest(`.${closestItem}`);
        if (!closest) return;
        closest.classList.toggle(className);
        break;
      default:
        document.querySelectorAll(toItem).forEach((item) => {
          item.classList.toggle(className);
        });
        break;
    }
  }
}

export function toggleClassOnScroll(selector, topOffset, type = "default") {
  const items = document.querySelectorAll(selector);
  const scrolledClass = "_scrolled",
    hiddenClass = "_hidden",
    animateClass = "_animate";
  let scrollState = null,
    hiddenState = null,
    animateState = null;

  window.addEventListener(
    "scroll",
    function () {
      if (scrollY > topOffset && scrollState !== "scrolled") {
        toggleClass(items, scrolledClass, "add");
        scrollState = "scrolled";
      }
      if (scrollY <= topOffset && scrollState !== "not-scrolled") {
        toggleClass(items, scrolledClass);
        scrollState = "not-scrolled";
      }
      if (scrollY > topOffset + 10 && animateState !== "animate") {
        toggleClass(items, animateClass, "add");
        animateState = "animate";
      }
      if (scrollY <= topOffset && animateState !== "not-animate") {
        toggleClass(items, animateClass);
        animateState = "not-animate";
      }
    },
    {
      passive: true,
    }
  );

  if (scrollY > topOffset && scrollState !== "scrolled") {
    toggleClass(items, scrolledClass, "add");
    scrollState = "scrolled";
  }
  if (scrollY > topOffset && animateState !== "animate") {
    toggleClass(items, animateClass, "add");
    animateState = "animate";
  }

  if (type === "hide") {
    let oldPosition = 0;

    window.addEventListener(
      "scroll",
      function () {
        if (
          scrollY > oldPosition &&
          scrollY > topOffset &&
          hiddenState !== "hidden"
        ) {
          toggleClass(items, hiddenClass, "add");
          hiddenState = "hidden";
        }
        if (
          (scrollY <= oldPosition && hiddenState !== "not-hidden") ||
          (scrollY < topOffset && hiddenState !== "not-hidden")
        ) {
          toggleClass(items, hiddenClass);
          hiddenState = "not-hidden";
        }
        oldPosition = scrollY <= 0 ? 0 : scrollY;
      },
      {
        passive: true,
      }
    );

    if (
      scrollY > oldPosition &&
      scrollY > topOffset &&
      hiddenState !== "hidden"
    ) {
      toggleClass(items, hiddenClass, "add");
      hiddenState = "hidden";
    }
  }

  function toggleClass(items, className, action = null) {
    items.forEach(function (item) {
      if (!item) return;

      if (action === "add") {
        item.classList.add(className);
        return;
      }

      item.classList.remove(className);
      return;
    });
  }
}

export function toggleElements() {
  const toggleContainers = document.querySelectorAll("[data-toggle-container]");
  if (!toggleContainers.length) return;

  toggleContainers.forEach((container) => {
    const toggleElements = container.querySelectorAll("[data-toggle]");
    const toggleTargets = container.querySelectorAll("[data-target]");
    if (!toggleElements.length && !toggleTargets.length) return;

    // toggle means element can make action when even active
    const isToggle = container.dataset.toggleContainer.includes("toggle")
      ? true
      : false;
    // self means element can't affect on others
    const isSelf = container.dataset.toggleContainer.includes("self")
      ? true
      : false;

    toggleElements.forEach((elem) => {
      switch (elem.tagName.toLowerCase()) {
        case "select":
          toggleContent({
            current: elem,
            targets: toggleTargets,
            select: true,
          });
          elem.addEventListener("change", (event) => {
            toggleContent({
              current: event.target,
              targets: toggleTargets,
              select: true,
            });
          });
          break;
        case "input":
          toggleContent({
            current: elem,
            targets: toggleTargets,
            checked: elem.checked,
          });
          elem.addEventListener("click", (event) => {
            toggleContent({ current: event.target, targets: toggleTargets });
          });
          break;
        default:
          elem.addEventListener("click", (event) => {
            toggleContent({
              current: event.currentTarget,
              targets: toggleTargets,
              buttons: toggleElements,
              toggle: isToggle,
              self: isSelf,
            });
          });
          break;
      }
    });
  });

  function toggleContent(obj) {
    let current = obj.current,
      targets = obj.targets,
      buttons = obj.buttons || null,
      toggle = obj.toggle || false,
      self = obj.self || false,
      checked = obj.checked !== undefined ? obj.checked : null,
      select = obj.select || false;

    const value = toggleValue(select, current);

    targets.forEach((target) =>
      toggleClass(target, value, toggle, self, checked)
    );

    if (buttons === null) return;
    toggleExpanded(current, buttons, toggle, self);
  }
  function toggleValue(select, element) {
    if (select === true) return element.value;
    return element.dataset.toggle;
  }
  function toggleClass(t, value, toggle, self, checked) {
    const tValue = t.dataset.target;

    if (checked === false || (self === true && tValue !== value)) return;

    if (self === true && tValue === value) return t.classList.toggle("active");

    if (toggle === true && t.classList.contains("active"))
      return t.classList.remove("active");

    if (tValue === value) return t.classList.add("active");

    return t.classList.remove("active");
  }
  function toggleExpanded(current, buttons, toggle, self) {
    let isAreaExpanded = current.getAttribute("aria-expanded") === "true";

    if (self) return current.setAttribute("aria-expanded", !isAreaExpanded);

    buttons.forEach((button) => button.setAttribute("aria-expanded", false));

    if (toggle) return current.setAttribute("aria-expanded", !isAreaExpanded);

    current.setAttribute("aria-expanded", true);
  }
}

function setAnchorsEvents() {
  let scrollElements = document.querySelectorAll("a[href*='#']");

  scrollElements.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      event.preventDefault();

      const link = event.currentTarget.getAttribute("href");
      if (link === "#" || link === undefined) return;

      const linkTarget = document.getElementById(link.split("#")[1]);
      if (!linkTarget) return;

      const actionBtn = document.querySelector('[data-toggle="' + link.split("#")[1] + '"]');
      if (actionBtn) actionBtn.click();

      const currentScrollTop = window.scrollY,
        targetScrollTop =
          linkTarget.getBoundingClientRect().top +
          document.documentElement.scrollTop -
          100;

      const burgerElem = document.querySelector("._menu-opened");
      if (burgerElem) burgerElem.classList.remove("_menu-opened");

      animate({
        duration: 1000,
        timing: easeOutQuart,
        draw: function (progress) {
          window.scrollTo(
            0,
            currentScrollTop - (currentScrollTop - targetScrollTop) * progress
          );
        },
      });
    });
  });
}

export function toHorizontalScroll(element) {
  element.addEventListener("wheel", (event) => {
    event.preventDefault();
    element.scrollLeft += event.deltaY / 2;
  });
}

export function onKeydownAction(element, customFunction) {
  element.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
      e.preventDefault();
      customFunction();
    }
  });
}

export function wheelToHide() {
  const elements = document.querySelectorAll("._wheel-to-hide");
  if (!elements.length) return;

  elements.forEach((element) => {
    if (
      element.scrollWidth <= element.clientWidth ||
      document.cookie.includes("wheelToHideHidden")
    ) {
      element.classList.remove("active");
      setTimeout(() => element.classList.remove("_wheel-to-hide"), 500);
      return;
    }

    element.scrollLeft = 0;
    element.classList.add("active");
    element.addEventListener("scroll", (event) => hide(event.target), {
      once: true,
      passive: true,
    });
    element.addEventListener("click", (event) => hide(event.target), {
      once: true,
    });
  });

  function hide(element) {
    element.classList.remove("active");
    document.cookie = "wheelToHideHidden=; max-age=604800; samesite=lax";
    setTimeout(() => element.classList.remove("_wheel-to-hide"), 500);
  }
}

export function mapOverlay() {
  const maps = document.querySelectorAll(".map");
  if (!maps.length) return;

  maps.forEach((map) => {
    const overlay = map.querySelector(".map__overlay");
    if (!overlay) return;

    let timer = null;
    overlay.addEventListener("wheel", () => toggleMapOverlay(timer, overlay), {
      passive: true,
    });
    overlay.addEventListener(
      "touchmove",
      () => toggleMapOverlay(timer, overlay),
      {
        passive: true,
      }
    );
    overlay.addEventListener("click", () => overlay.remove());
  });

  function toggleMapOverlay(timer, overlay) {
    if (timer !== null) return;

    overlay.classList.add("active");
    timer = setTimeout(function () {
      overlay.classList.remove("active");
      clearTimeout(timer);
      timer = null;
    }, 2000);
  }
}

export function scrollToTop() {
  const scrollTopElement = document.querySelector(".scroll-top");
  const scrollTopPath = scrollTopElement.querySelector(".scroll-top__path");
  let scrollTopPathLength = 0;
  let documentHeight = getDocumentHeight();

  if (scrollTopPath) {
    scrollTopPathLength = scrollTopPath.getTotalLength();
    const resizeObserver = new ResizeObserver(function () {
      documentHeight = getDocumentHeight();
    });

    window.addEventListener("load", function () {
      documentHeight = getDocumentHeight();
      setPathDashOffset(
        scrollTopPath,
        scrollTopPathLength,
        getScrollPositionPercentage()
      );
      setPathDashArray(
        scrollTopPath,
        scrollTopPathLength,
        getScrollPositionPercentage()
      );
    });
    window.addEventListener(
      "resize",
      function () {
        documentHeight = getDocumentHeight();
      },
      {
        passive: true,
      }
    );
    resizeObserver.observe(document.body);
  }
  let hasClass = scrollTopElement.classList.contains("_active"),
    isScrolled = scrollY > 35;
  window.addEventListener(
    "scroll",
    function () {
      hasClass = scrollTopElement.classList.contains("_active");
      isScrolled = scrollY > 35;
      if (isScrolled && !hasClass) {
        scrollTopElement.classList.add("_active");
      } else if (!isScrolled && hasClass) {
        scrollTopElement.classList.remove("_active");
      }

      if (!scrollTopPath) return;
      setPathDashOffset(
        scrollTopPath,
        scrollTopPathLength,
        getScrollPositionPercentage()
      );
    },
    {
      passive: true,
    }
  );
  scrollTopElement.addEventListener("click", () => {
    let currentScrollTop = window.scrollY;

    animate({
      duration: 1000,
      timing: easeOutQuart,
      draw: function (progress) {
        window.scrollTo(0, currentScrollTop - currentScrollTop * progress);
      },
    });
  });
  if (scrollY > 35 && !scrollTopElement.classList.contains("_active")) {
    scrollTopElement.classList.add("_active");
  }

  function setPathDashOffset(path, pathLength, value) {
    path.style.strokeDashoffset = pathLength + 0.01 * pathLength * value;
  }

  function setPathDashArray(path, pathLength) {
    path.style.strokeDasharray = pathLength;
  }

  function getDocumentHeight() {
    return document.documentElement.offsetHeight - window.innerHeight;
  }

  function getScrollPositionPercentage() {
    return (document.documentElement.scrollTop * 100) / documentHeight;
  }
}

function animate({ timing, draw, duration }) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction < 0) timeFraction = 0;
    if (timeFraction > 1) timeFraction = 1;
    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);
    draw(progress); // отрисовать её
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
// eslint-disable-next-line no-unused-vars
function linear(timeFraction) {
  return timeFraction;
}
// eslint-disable-next-line no-unused-vars
function easeOut(timeFraction) {
  return Math.pow(timeFraction, 1 / 1.99);
}
// eslint-disable-next-line no-unused-vars
function easeOutQuart(timeFraction) {
  return timeFraction === 1 ? 1 : 1 - Math.pow(2, -10 * timeFraction);
}

export function myLazyLoad() {
  const lazyObjects = document.querySelectorAll("img[data-srcset]");
  const lazyObservedContainers = document.querySelectorAll(
    "[data-lazy-observe]"
  );

  if (!lazyObjects.length) return;

  const mOptions = {
    childList: true,
    subtree: true,
  };
  const iOptions = {
    // root: document.querySelector( '#viewport' ),
    rootMargin: window.innerWidth >= 1200 ? "500px" : "250px",
    threshold: 0,
  };

  if ("MutationObserver" in window) {
    lazyObservedContainers.forEach(function (item) {
      const observer = new MutationObserver(manageMutation);
      observer.observe(item, mOptions);
    });
  }

  intersectionHandler(lazyObjects);

  function intersectionHandler(items) {
    if ("IntersectionObserver" in window) {
      items.forEach(function (item) {
        const observer = new IntersectionObserver(manageIntersection, iOptions);
        observer.observe(item);
      });

      return true;
    } else {
      items.forEach((item) => replaceAttributes(item));
      return true;
    }
  }

  function manageIntersection(entries, observer) {
    entries.forEach(function (item) {
      if (item.isIntersecting) {
        replaceAttributes(item.target);
        observer.disconnect();
      }
      return;
    });
  }

  // eslint-disable-next-line no-unused-vars
  function manageMutation(mutationList, observer) {
    mutationList.forEach(function (items) {
      if (!items.addedNodes.length) return;

      items.addedNodes.forEach(function (item) {
        if (item.nodeType !== Node.ELEMENT_NODE) return;

        const lazyImages = item.querySelectorAll("img[data-srcset]");

        if (!lazyImages.length) return;

        intersectionHandler(lazyImages);
      });
    });
  }

  function replaceAttributes(item) {
    item.setAttribute("srcset", item.getAttribute("data-srcset"));
    item.removeAttribute("data-srcset");
  }
}

export function validateFile(inputElement) {
  const fileErrorClass = "error";
  const inputLabel =
    inputElement.parentElement.querySelector(".form__label") ||
    inputElement.parentElement.querySelector("span");

  if (!inputElement.files.length) {
    inputElement.classList.add(fileErrorClass);
    inputLabel.textContent = "Файл не выбран.";
    return;
  }

  // init state //
  const maxFileSize = inputElement.dataset?.maxSize * Math.pow(1024, 2) || 5e6,
    filesCount = inputElement.files.length,
    firstFile = inputElement.files[0],
    fileName = firstFile.name,
    fileSize = firstFile.size;

  // clear validation //
  inputElement.classList.remove(fileErrorClass);
  inputLabel.textContent = "";

  const fileNameToShow =
      fileName.length > 25
        ? `${fileName.slice(0, 10)}...${fileName.slice(-10)}`
        : fileName,
    fileSizeToShow = formatBytes(fileSize);

  if (fileSize > maxFileSize) {
    inputElement.classList.add(fileErrorClass);
    inputLabel.textContent = `Файл больше ${formatBytes(maxFileSize)}`;
    return;
  }

  inputLabel.textContent = `Файл${
    filesCount > 1 ? `(${filesCount})` : ``
  }: ${fileNameToShow} (${fileSizeToShow})`;
}

// export function validatePhoneNumber(inputElement) {
//   const phoneFormat = (value) =>
//     value
//       .replace(/((?!\+)\D+)+/g, "")
//       .match(/^(\+375)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);

//   inputElement.addEventListener("click", (e) => {
//     if (e.target.value === "" || !phoneFormat(e.target.value))
//       e.target.value = "+375";
//   });
//   inputElement.addEventListener("input", (e) => {
//     const elem = e.target;
//     let cursorPosition = elem.selectionStart;
//     elem.value =
//       elem.value.slice(0, cursorPosition) +
//       elem.value.slice(cursorPosition + 1);
//     elem.selectionEnd = cursorPosition;

//     let x = phoneFormat(elem.value);
//     let phoneArray = "";

//     if (x === null || !x[1]) {
//       phoneArray = "";
//     } else if (x[1] && !x[2]) {
//       phoneArray = `${x[1]}`;
//     } else if (x[1] && x[2] && !x[3]) {
//       phoneArray = `${x[1]} (${x[2]}`;
//     } else if (x[1] && x[2] && x[3] && !x[4]) {
//       phoneArray = `${x[1]} (${x[2]}) ${x[3]}`;
//     } else if (x[1] && x[2] && x[3] && x[4] && !x[5]) {
//       phoneArray = `${x[1]} (${x[2]}) ${x[3]}-${x[4]}`;
//     } else {
//       phoneArray = `${x[1]} (${x[2]}) ${x[3]}-${x[4]}-${x[5]}`;
//     }
//     elem.value = phoneArray;
//   });
// }

function gallery() {
  const galleryObjects = document.querySelectorAll("[data-gallery]");

  if (!galleryObjects.length) return;

  // init
  const galleryWrapper = document.createElement("div");
  const closeButton = document.createElement("button");
  const prevButton = document.createElement("button");
  const nextButton = document.createElement("button");
  const galleryClassActive = "my-gallery_active";
  this.imageIndex = 0;
  this.activeIndexes = [];
  this.minImageIndex = 0;
  this.maxImageIndex = galleryObjects.length - 1;

  galleryWrapper.className = "my-gallery";
  closeButton.type = "button";
  closeButton.className = "my-gallery__close";
  closeButton.innerHTML = "<span class='sr-only'>Закрыть</span>";
  prevButton.type = "button";
  prevButton.className = "my-gallery__prev";
  prevButton.innerHTML = "<span class='sr-only'>Предыдущее</span>";
  nextButton.type = "button";
  nextButton.className = "my-gallery__next";
  nextButton.innerHTML = "<span class='sr-only'>Следующее</span>";

  document.body.appendChild(galleryWrapper);
  galleryWrapper.appendChild(closeButton);
  galleryWrapper.appendChild(prevButton);
  galleryWrapper.appendChild(nextButton);
  const galleryImage = new Image();

  this.show = () => {
    myPopupOverlay.element.style.zIndex = "1055";
    galleryWrapper.classList.add(galleryClassActive);
  };
  this.hide = () => {
    myPopupOverlay.element.style = "";
    galleryWrapper.classList.remove(galleryClassActive);
  };

  galleryWrapper.addEventListener("click", () => this.hideGalleryElement());
  closeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    this.hideGalleryElement();
  });
  prevButton.addEventListener("click", (e) => {
    e.stopPropagation();
    this.galleryPrev();
  });
  nextButton.addEventListener("click", (e) => {
    e.stopPropagation();
    this.galleryNext();
  });

  // eslint-disable-next-line no-unused-vars
  galleryObjects.forEach((elem, index) => {
    const imageElement = elem.querySelector("img");
    if (!imageElement) return;

    elem.addEventListener("click", (event) => {
      event.preventDefault();
      this.setActiveIndexes();
      this.showGalleryElement(imageElement, index);
    });
    elem.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
        e.preventDefault();
        this.setActiveIndexes();
        this.showGalleryElement(imageElement, index);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (!document.querySelector(`.${galleryClassActive}`)) return;
    if (e.key === "ArrowLeft") this.galleryPrev();
    if (e.key === "ArrowRight") this.galleryNext();
    if (e.key === "Escape") this.hideGalleryElement();
  });

  this.imageUrl = (image) => {
    return (
      image.getAttribute("data-src") ||
      image.getAttribute("src") ||
      "images/placeholder.png"
    ).replace("/thumbnails", "");
  };

  this.showGalleryElement = (imageElement, i) => {
    if (!imageElement) return;
    this.imageIndex = i;
    this.arrowsManage();
    myPopupOverlay.show();

    galleryWrapper.querySelector("img")?.remove();
    galleryImage.onload = () => galleryWrapper.appendChild(galleryImage);
    galleryImage.src = this.imageUrl(imageElement);
    galleryImage.alt = imageElement.alt;
    this.show();
  };

  this.hideGalleryElement = () => {
    this.hide();
    if (document.querySelectorAll(".popup_active").length) return;
    myPopupOverlay.hide();
  };

  this.galleryPrev = () => {
    const prevIndex = this.getIndex("prev");
    this.showGalleryElement(
      galleryObjects[prevIndex].querySelector("img"),
      prevIndex
    );
  };
  this.galleryNext = () => {
    const nextIndex = this.getIndex("next");
    this.showGalleryElement(
      galleryObjects[nextIndex].querySelector("img"),
      nextIndex
    );
  };

  this.arrowsManage = () => {
    if (this.imageIndex === this.minImageIndex)
      prevButton.classList.add("disabled");
    if (this.imageIndex !== this.minImageIndex)
      prevButton.classList.remove("disabled");
    if (this.imageIndex === this.maxImageIndex)
      nextButton.classList.add("disabled");
    if (this.imageIndex !== this.maxImageIndex)
      nextButton.classList.remove("disabled");
  };

  this.setActiveIndexes = () => {
    this.activeIndexes.length = 0;
    galleryObjects.forEach((obj, index) => {
      if (
        obj.offsetParent &&
        window.getComputedStyle(obj).visibility !== "hidden"
      )
        this.activeIndexes.push(index);
    });
    this.minImageIndex = this.activeIndexes[0];
    this.maxImageIndex = this.activeIndexes[this.activeIndexes.length - 1];
  };

  this.getIndex = (direction) => {
    if (!direction) return -1;
    if (direction === "prev") {
      if (this.imageIndex === this.minImageIndex) return -1;
      for (let i = this.imageIndex - 1; i >= this.minImageIndex; i--) {
        if (
          galleryObjects[i].offsetParent &&
          window.getComputedStyle(galleryObjects[i]).visibility !== "hidden"
        ) {
          return i;
        }
      }
    }
    if (direction === "next") {
      if (this.imageIndex === this.maxImageIndex) return -1;
      for (let i = this.imageIndex + 1; i <= this.maxImageIndex; i++) {
        if (
          galleryObjects[i].offsetParent &&
          window.getComputedStyle(galleryObjects[i]).visibility !== "hidden"
        ) {
          return i;
        }
      }
    }
  };
}

function popupOverlay() {
  const name = "popup-overlay";
  this.element = document.querySelector(`.${name}`);
  const elementClassActive = `${name}_active`;
  const bodyElement = document.body,
    headerElement = document.querySelector("header");

  this.show = () => {
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    this.element.classList.add(elementClassActive);
    bodyElement.style = `overflow: hidden; margin-right: ${scrollWidth}px`;
    headerElement.style = `padding-right: ${scrollWidth}px`;
  };
  this.hide = () => {
    this.element.classList.remove(elementClassActive);
    setTimeout(() => {
      bodyElement.style = "";
      headerElement.style = "";
    }, 300);
  };
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Байт";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Байт", "КБ", "МБ", "ГБ", "ТБ", "ПБ", "ЭБ", "ЗБ", "ЙБ"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
