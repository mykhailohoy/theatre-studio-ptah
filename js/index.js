// make curtains

let glide = new Glide(".glide", {
    type: "carousel",
    // autoplay: 3000,
    gap: 100,
})

// background check for slider
glide.on("run.after", function() {
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
let innerDiv = document.querySelector(".s-section--purpose__inner");
let sectionHeading = document.querySelector(".s-section--purpose__heading");
let sectionDesc = document.querySelector(".s-section--purpose__list");
if (width < 900) {
  // innerDiv.style.top = "-5vw";
  // innerDiv.style.transform = "translate(-10%)"
  projectorImage.setAttribute("src", "img/projector-tablet.svg");
}
if (width < 700) {
  // sectionHeading.style.fontSize = "25px";
  // sectionDesc.style.fontSize = "14px";
  // innerDiv.style.top = "-3vw";
}
// < 500px dn


// handling form

let sendBtn = document.querySelector(".contact-box__btn");
sendBtn.addEventListener("click", function() {
  animateForm()
})

let arrow = document.querySelector(".arrow-layer")
let tick = document.querySelector(".tick-layer");
let button = document.querySelector(".contact-box__btn");
let input = document.querySelector(".contact-box__input");
let heading = document.querySelector(".contact-box__heading");
let form = document.querySelector(".contact-box__form");
let box = document.querySelector(".contact-box");

function animateForm() {
  if (input.validity.valid) {
    arrow.classList.remove("animate-arrow-reject");
    arrow.classList.add("animate-arrow-accept");
    tick.classList.add("animate-tick");
    let width = box.offsetWidth;
    box.style.width = width + "px";
    heading.innerHTML = "Дякуємо! <a role='button' class='contact-box__new-appl'>Подати ще одну заявку</a>";
    form.submit();
    form.reset();
    sendBtn.disabled = true;
    input.disabled = true;
    let newApplBtn = document.querySelector(".contact-box__new-appl");
    newApplBtn.addEventListener("click", function() {
      revert()
    })
  } else {
    arrow.classList.remove("animate-arrow-reject");
    void arrow.scrollBy(); // force DOM reflow
    arrow.classList.add("animate-arrow-reject");
  }
}

function revert() {
  arrow.classList.remove("animate-arrow-accept");
  tick.classList.remove("animate-tick");
  input.disabled = false;
  sendBtn.disabled = false;
  heading.innerHTML = "Ваш номер телефону:";
}