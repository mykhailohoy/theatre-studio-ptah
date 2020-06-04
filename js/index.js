import "core-js/stable";
import "regenerator-runtime/runtime";

import '../styles/sass/index.scss';

import Glide from './glide.min.js';
import BackgroundCheck from './backgroundCheck.js';

let glide = new Glide(".glide", {
  type: "carousel",
  autoplay: 6000,
  gap: 100,
})

// background check for slider
glide.on("run.after", function () {
  BackgroundCheck.refresh()
})

glide.mount();

BackgroundCheck.init({
  targets: '.glide__arrow',
});
BackgroundCheck.refresh();

// styles

let width = window.innerWidth;
let projectorImage = document.querySelector(".s-section--purpose__img");
if (width < 900) {
  projectorImage.setAttribute("src", "img/projector-tablet.svg");
}


const supportsCSSTransformsOnSVG = (() => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 2 2');
  Object.assign(svg.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '2px',
    height: '2px',
  });
  svg.innerHTML = '<rect width="1" height="1" style="transform: translate(1px, 1px)"/>';
  document.body.appendChild(svg);
  const result = document.elementFromPoint(1, 1) !== svg;
  svg.parentNode.removeChild(svg);
  return result;
})();

console.log(supportsCSSTransformsOnSVG);

// handling form

let sendBtn = document.querySelector(".contact-box__btn");
sendBtn.addEventListener("click", function () {
  animateForm()
})

let arrow = document.querySelector(".arrow-layer")
let tick = document.querySelector(".tick-layer");
let input = document.querySelector(".contact-box__input");
let heading = document.querySelector(".contact-box__heading");
let form = document.querySelector(".contact-box__form");
let box = document.querySelector(".contact-box");

if (!supportsCSSTransformsOnSVG) {
  sendBtn.innerHTML = "<img class='contact-box__svg' src='img/send-arrow.svg' alt='надіслати'>"
}

let buttonImage = document.querySelector(".contact-box__svg");

function animateForm() {
  if (input.validity.valid) {
    if (supportsCSSTransformsOnSVG) {
      arrow.classList.remove("animate-arrow-reject");
      arrow.classList.add("animate-arrow-accept");
      tick.classList.add("animate-tick");
    } else {
      buttonImage.setAttribute("src", "img/send-tick.svg");
      buttonImage.setAttribute("alt", "надіслано");
    }
    let width = box.offsetWidth;
    box.style.width = width + "px";
    heading.innerHTML = "Дякуємо! <a role='button' class='contact-box__new-appl'>Подати ще одну заявку</a>";
    form.submit();
    input.value = '';
    form.reset();
    sendBtn.disabled = true;
    input.disabled = true;
    let newApplBtn = document.querySelector(".contact-box__new-appl");
    newApplBtn.addEventListener("click", function () {
      revert()
    })
  } else if (supportsCSSTransformsOnSVG) {
      arrow.classList.remove("animate-arrow-reject");
      void arrow.scrollBy(); // force DOM reflow
      arrow.classList.add("animate-arrow-reject");
  }
}

function revert() {
  input.disabled = false;
  sendBtn.disabled = false;
  heading.innerHTML = "Ваш номер телефону:";
  if (supportsCSSTransformsOnSVG) {
    arrow.classList.remove("animate-arrow-accept");
    tick.classList.remove("animate-tick");
  } else {
    buttonImage.setAttribute("src", "img/send-arrow.svg");
    buttonImage.setAttribute("alt", "надіслати");
  }
}