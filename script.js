"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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
    console.log(targetCoordinate);
  });
