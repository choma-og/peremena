import { g as gsapWithCSS, S as ScrollTrigger, a as Swiper, N as Navigation, P as Pagination, I as IMask, b as axios } from "./vendor.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
window.onload = function() {
  moveTextBlock();
};
window.onresize = function() {
  moveTextBlock();
};
function moveTextBlock() {
  var screenWidth = window.innerWidth;
  if (screenWidth <= 800) {
    var aboutBox = document.querySelector(".about__box");
    var infoText = document.querySelector(".info-about__text");
    if (aboutBox && infoText) {
      aboutBox.insertBefore(infoText, aboutBox.firstChild);
    }
  } else {
    var aboutInfo = document.querySelector(".about__info");
    var infoText = document.querySelector(".info-about__text");
    if (aboutInfo && infoText && infoText.parentNode !== aboutInfo) {
      aboutInfo.insertBefore(infoText, aboutInfo.firstChild);
    }
  }
}
const headerIcon = document.querySelector(".header__icon");
const jsHeaderMenu = document.querySelector(".js-header-menu");
const wrapper = document.querySelector(".wrapper");
const header = document.querySelector(".header");
headerIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  document.body.classList.toggle("_lock");
  headerIcon.classList.toggle("active");
  jsHeaderMenu.classList.toggle("active");
  wrapper.classList.toggle("active");
  header.classList.toggle("burger-open");
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".js-header-menu") && !modalBody.contains(event.target) && !Array.from(modalButtons).some((button) => button.contains(event.target))) {
    document.body.classList.remove("_lock");
    jsHeaderMenu.classList.remove("active");
    headerIcon.classList.remove("active");
    wrapper.classList.remove("active");
    header.classList.remove("burger-open");
    if (modalBody.classList.contains("active")) {
      modalBody.classList.remove("active");
      errorBlock.forEach((item) => {
        item.classList.remove("_active");
      });
      modalInputs.forEach((input) => {
        input.value = "";
      });
    }
  }
});
const modalBody = document.querySelector(".modal-main");
const modalButtons = document.querySelectorAll(".js-open-modal-main");
const modalClose = document.querySelector(".modal-main__close");
const errorBlock = document.querySelectorAll(".js-error");
const modalInputs = document.querySelectorAll("input");
if (modalButtons) {
  modalButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      document.body.classList.add("_lock");
      wrapper.classList.add("active");
      modalBody.classList.add("active");
    });
  });
}
if (modalClose) {
  modalClose.addEventListener("click", (e) => {
    document.body.classList.remove("_lock");
    modalBody.classList.remove("active");
    wrapper.classList.remove("active");
    errorBlock.forEach((item) => {
      item.classList.remove("_active");
    });
    modalInputs.forEach((input) => {
      input.value = "";
    });
  });
}
window.addEventListener("scroll", function() {
  let header2 = document.querySelector(".header");
  let scrollPosition = window.scrollY;
  if (scrollPosition > 0) {
    header2.classList.add("active");
  } else {
    header2.classList.remove("active");
  }
});
gsapWithCSS.registerPlugin(ScrollTrigger);
const toggleActiveClass = () => {
  const scrollUpButton = document.getElementById("modalscroll-btn");
  const contactsSection = document.getElementById("contacts");
  document.getElementById("scroll-up");
  const footer = document.querySelector(".footer");
  footer.offsetHeight;
  ScrollTrigger.create({
    trigger: scrollUpButton,
    start: "bottom center",
    endTrigger: contactsSection,
    end: "top bottom",
    toggleClass: { targets: "#modalscroll-btn", className: "active" }
  });
  ScrollTrigger.create({
    trigger: contactsSection,
    start: "top top",
    end: "top top",
    onEnter: () => {
      scrollUpButton.classList.remove("active");
    }
  });
  ScrollTrigger.create({
    trigger: footer,
    start: "30% bottom",
    // Начинаем отслеживать, когда пользователь входит в footer
    end: "bottom top",
    // Завершаем отслеживание, когда пользователь выходит из footer
    toggleClass: { targets: "#scroll-up", className: "active" }
  });
};
window.addEventListener("load", toggleActiveClass);
document.addEventListener("DOMContentLoaded", function() {
  var gallerySwiper = new Swiper(".gallery-swiper", {
    loop: false,
    spaceBetween: 20,
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: ".gallery-next",
      prevEl: ".gallery-prev"
    },
    pagination: {
      el: ".gallery-progress",
      type: "progressbar"
    },
    on: {
      init: function() {
        updateCounter(this);
      },
      slideChange: function() {
        updateCounter(this);
      }
    }
  });
  function updateCounter(swiper) {
    let currentSlide = swiper.activeIndex + 1;
    document.querySelector(".counter").innerHTML = `
    <span class="counter__current">
    ${currentSlide < 10 ? "0" + currentSlide : currentSlide}
    </span> `;
    let totalSlides = swiper.slides.length;
    document.querySelector(".counter2").innerHTML = `
		<span class="counter__total">
		${totalSlides < 10 ? "0" + totalSlides : totalSlides}
		</span> `;
  }
  if (gallerySwiper.initialized) {
    updateCounter(gallerySwiper);
  } else {
    gallerySwiper.on("init", function() {
      updateCounter(gallerySwiper);
    });
  }
  const galleryInfo = document.querySelectorAll(".info-gallery__descr");
  gallerySwiper.on("slideChange", function(swiper) {
    let activeSlideIndex = swiper.realIndex;
    let activeSlide = swiper.slides[activeSlideIndex];
    activeSlide.classList.add("_show");
    let previousSlide = swiper.slides[activeSlideIndex - 1];
    if (previousSlide) {
      previousSlide.classList.remove("_show");
    }
    let nextSlide = swiper.slides[activeSlideIndex + 1];
    if (nextSlide) {
      nextSlide.classList.remove("_show");
    }
    galleryInfo.forEach((info) => {
      info.classList.remove("_showEffect");
    });
    let activeInfo = galleryInfo[activeSlideIndex];
    activeInfo.classList.add("_showEffect");
    let previousInfo = galleryInfo[activeSlideIndex - 1];
    if (previousInfo) {
      previousInfo.classList.remove("_showEffect");
    }
    let nextInfo = galleryInfo[activeSlideIndex + 1];
    if (nextInfo) {
      nextInfo.classList.remove("_showEffect");
    }
  });
});
new Swiper(".modal-gallery__slider", {
  spaceBetween: 20
});
const openModalGallery = document.querySelectorAll(".js-open-modal-gallery");
const modalGallery = document.querySelector(".modal-gallery");
const modalGalleryClose = document.querySelector(".modal-gallery__close");
openModalGallery.forEach((button) => {
  button.addEventListener("click", function() {
    modalGallery.classList.add("active");
    document.body.classList.add("_lock");
  });
});
modalGalleryClose.addEventListener("click", function() {
  modalGallery.classList.remove("active");
  document.body.classList.remove("_lock");
});
const LOCATION = {
  center: [37.623082, 55.75254],
  // starting position [lng, lat]
  zoom: 9
  // starting zoom
};
const LONG_TEXT = "Popup on the custom marker (scrollable)\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let map = null;
main();
async function main() {
  await ymaps3.ready;
  const { YMapComplexEntity, YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;
  const { YMapDefaultMarker } = await ymaps3.import("@yandex/ymaps3-markers@0.0.1");
  class CustomMarkerWithPopup extends YMapComplexEntity {
    constructor(props) {
      super(props);
      this._marker = null;
      this._popup = null;
    }
    _onAttach() {
      this._createMarker();
    }
    _onDetach() {
      this._marker = null;
    }
    _onUpdate(props) {
      var _a, _b;
      if (props.zIndex !== void 0) {
        (_a = this._marker) == null ? void 0 : _a.update({ zIndex: props.zIndex });
      }
      if (props.coordinates !== void 0) {
        (_b = this._marker) == null ? void 0 : _b.update({ coordinates: props.coordinates });
      }
    }
    _createMarker() {
      const element = document.createElement("div");
      element.className = "marker";
      element.onclick = () => {
        this._openPopup();
      };
      this._marker = new YMapMarker({ coordinates: this._props.coordinates }, element);
      this.addChild(this._marker);
    }
    _openPopup() {
      if (this._popup) {
        return;
      }
      const element = document.createElement("div");
      element.className = "popup";
      const textElement = document.createElement("div");
      textElement.className = "popup__text";
      textElement.textContent = this._props.popupContent;
      const closeBtn = document.createElement("button");
      closeBtn.className = "popup__close";
      closeBtn.textContent = "Close Popup";
      closeBtn.onclick = () => this._closePopup();
      element.append(textElement, closeBtn);
      const zIndex = (this._props.zIndex ?? YMapMarker.defaultProps.zIndex) + 1e3;
      this._popup = new YMapMarker({
        coordinates: this._props.coordinates,
        zIndex,
        blockBehaviors: this._props.blockBehaviors
      }, element);
      this.addChild(this._popup);
    }
    _closePopup() {
      if (!this._popup) {
        return;
      }
      this.removeChild(this._popup);
      this._popup = null;
    }
  }
  map = new YMap(
    // Pass the link to the HTMLElement of the container
    document.getElementById("map-peremena"),
    // Pass the map initialization parameters
    { location: LOCATION, showScaleInCopyrights: true },
    [
      // Add a map scheme layer
      new YMapDefaultSchemeLayer({}),
      // Add a layer of geo objects to display the markers
      new YMapDefaultFeaturesLayer({})
    ]
  );
  map.addChild(
    new YMapDefaultMarker({
      coordinates: [37.9, 55.85],
      color: "#006efc",
      popup: { content: "Popup on the default marker", position: "left" }
    })
  ).addChild(new CustomMarkerWithPopup({ coordinates: [37.32, 55.57], popupContent: "Popup on the custom marker (not scrollable)" })).addChild(new CustomMarkerWithPopup({ coordinates: [37.74, 55.43], popupContent: LONG_TEXT, blockBehaviors: true }));
}
const progressLinks = document.querySelectorAll(".progress-detail__link");
progressLinks.forEach((link) => {
  link.addEventListener("click", function(event) {
    event.preventDefault();
    progressLinks.forEach((link2) => {
      link2.classList.remove("active");
    });
    this.classList.add("active");
  });
});
let phones = document.querySelectorAll('[data-mask="phone"]');
phones.forEach(function(element) {
  new IMask(element, {
    mask: "+{7}(000)000-00-00"
  });
});
function validatePhone(phone) {
  const cleanedPhone = phone.replace(/\D/g, "");
  console.log(new String(cleanedPhone).length);
  console.log(cleanedPhone.length === 11, "partial");
  if (cleanedPhone.length === 11) {
    return true;
  } else {
    return false;
  }
}
function validateText(text) {
  const trimmedText = text.trim();
  if (trimmedText.length >= 2) {
    return true;
  } else {
    return false;
  }
}
const validate = (input) => {
  const dataType = input.getAttribute("data-type");
  let res = true;
  switch (dataType) {
    case "phone":
      res = validatePhone(input.value);
      break;
    case "text":
      res = validateText(input.value);
      break;
  }
  console.log(input, res, dataType);
  return res;
};
let forms = document.querySelectorAll(".js-form");
console.log(forms);
forms.forEach((form) => {
  let formButton = form.querySelector(".js-form-submit");
  console.log(formButton);
  if (formButton) {
    formButton.addEventListener("click", (e) => {
      e.preventDefault();
      formButton.disabled = true;
      const inputs = form.querySelectorAll("input");
      const method = form.method;
      const action = form.action;
      let isValidated = true;
      let formData = [];
      inputs.forEach((input) => {
        formData.push({
          name: input.name,
          value: input.value,
          isValidate: validate(input)
        });
      });
      formData.forEach((item) => {
        const input = form.querySelector(`[name="${item.name}"]`);
        const wrapper2 = input.parentNode;
        const errorBlock2 = wrapper2.querySelector(".js-error");
        if (!item.isValidate) {
          isValidated = false;
          errorBlock2.classList.add("_active");
          wrapper2.classList.add("_active");
        } else {
          errorBlock2.classList.remove("_active");
          wrapper2.classList.remove("_active");
        }
      });
      if (!isValidated) {
        formButton.disabled = false;
        return false;
      }
      axios({
        method,
        url: action,
        data: formData
      }).then((response) => {
        sucesOpen();
        console.log("success");
        formButton.disabled = false;
        inputs.forEach((input) => {
          input.value = "";
        });
      }).catch((error) => {
        console.log("error");
        document.body.classList.remove("_lock");
        sucesOpen();
        formButton.disabled = false;
        inputs.forEach((input) => {
          input.value = "";
        });
      });
    });
  }
});
const genplanLinks = document.querySelectorAll(".genplan__link");
const genplanModal = document.querySelector(".genplan-modal");
const apartmentsImage = document.querySelector(".apartments__image");
genplanLinks.forEach((genplanLink) => {
  genplanLink.addEventListener("mouseenter", showGenplanModal);
  genplanLink.addEventListener("mouseleave", hideGenplanModal);
  apartmentsImage.addEventListener("mousemove", moveGenplanModal);
});
function showGenplanModal() {
  genplanModal.classList.add("active");
}
function moveGenplanModal(event) {
  if (genplanModal.classList.contains("active")) {
    const rect = apartmentsImage.getBoundingClientRect();
    const modalRect = genplanModal.getBoundingClientRect();
    let mouseX = event.clientX - 10 - rect.left - modalRect.width;
    let mouseY = event.clientY - 10 - rect.top - modalRect.height;
    mouseX = Math.max(0, Math.min(mouseX, rect.width - modalRect.width));
    mouseY = Math.max(0, Math.min(mouseY, rect.height - modalRect.height));
    gsapWithCSS.to(genplanModal, {
      duration: 0.2,
      x: mouseX,
      y: mouseY,
      ease: "power1.out"
    });
  }
}
function hideGenplanModal() {
  genplanModal.classList.remove("active");
}
