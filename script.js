"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const section1 = document.querySelector("#section--1");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
//////////////////////////////////////////////////////////////
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
/////////////////////////////////////// smooth scroll
/////////////////////////////////// learn more link
document
  .querySelector(".btn--scroll-to")
  .addEventListener("click", function (e) {
    const targetCoordinate = document
      .getElementById("section--1")
      .getBoundingClientRect();

    window.scrollTo({
      left: targetCoordinate.left + window.scrollX,
      top: targetCoordinate.top + window.scrollY,
      behavior: "smooth",
    });
    // document.getElementById("section--1").scrollIntoView({ behavior: 'smooth' });
  });

////////// scroll in nav bar

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////// Tapped component

tabContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  if (clicked) {
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    tabsContent.forEach((t) =>
      t.classList.remove("operations__content--active")
    );
    clicked.classList.add("operations__tab--active");
    /////////// content
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }
});

////////////////////////// menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest("nav").querySelector("img");
    siblings.forEach((item) => {
      if (item !== link) {
        item.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

/////////// Sticky nav using Intersection Observer API

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

////////////////////////////////////////////// Reveal sections

const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  //   console.log(entry);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  //   section.classList.add("section--hidden");
});

/////////////////////////////////////////////// Lazy image loading

const imgTargets = document.querySelectorAll("img[data-src]");
const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach((item) => imgObserver.observe(item));

///////////////////////////////// Slider
const slider = document.querySelector(".slider");
slider.style.transform = "scale(0.5)";
slider.style.overflow = "visible";

////////////
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const maxSlides = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach((sld, i) => {
    sld.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);
const nextFunction = function () {
  if (currentSlide === maxSlides) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};
const prevFunction = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlides;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

btnRight.addEventListener("click", nextFunction);
btnLeft.addEventListener("click", prevFunction);
