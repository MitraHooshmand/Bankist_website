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

////////////
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const slides = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");
let currentSlide = 0;
const maxSlides = slides.length - 1;

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class='dots__dot' data-slide='${i}'></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((item) => item.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add("dots__dot--active");
};
const goToSlide = function (slide) {
  slides.forEach((sld, i) => {
    sld.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const nextFunction = function () {
  if (currentSlide === maxSlides) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};
const prevFunction = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlides;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

//// initialization
const init = function () {
  createDots();
  goToSlide(0);
  activateDot(0);
};
init();
///// all even handlers
btnRight.addEventListener("click", nextFunction);
btnLeft.addEventListener("click", prevFunction);
// navigatinh by keypress
document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && prevFunction();
  e.key === "ArrowRight" && nextFunction();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

////////////////////////  challenge

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// const car1 = new Car("bmw", 100);
// const car2 = new Car("bnz", 230);
// Car.prototype.accelerate = function () {
//   console.log((this.speed += 10));
// };

// Car.prototype.brake = function () {
//   console.log((this.speed -= 5));
// };

// car1.accelerate();
// car1.brake();
// car1.brake();
// car1.brake();

// car1.brake();
// car2.accelerate();
// car2.accelerate();

// const Car = {
//   make: "make",
//   speed: 222,
//   get spUs() {
//     return this.speed / 1.6;
//   },
//   set spUs(speed) {
//     return speed*1.6
//   },
// };

// console.log(Car.spUs(100));
// // const ford = new Car('ford',300)

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// const ali = new Person("ali", 1990);

// const hasan = new Person("hassan", 1920);
// console.log(ali, hasan);

// console.log(ali instanceof Person);

// Person.prototype.calcAge = function () {
//   console.log(2034 - this.birthYear);
// };
// console.log(Person.prototype);
// ali.calcAge();

// console.log(ali.__proto__.__proto__.__proto__);

// const Car = function (company, speed) {
//   this.company = company;
//   this.speed = speed;
//   console.log(`this is made by ${company} with the speed of ${speed}km/h`);
// };

// Car.prototype.accelerate = function () {
//   console.log((this.speed += 10));
// };

// Car.prototype.brake = function () {
//   console.log((this.speed -= 5));
// };

// const BMW = new Car("BMW", 3000);
// BMW.accelerate();
// BMW.accelerate();

// BMW.accelerate();
// BMW.brake();
// BMW.brake();

// //////////// ES6

// class personalCL {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge2() {
//     console.log(2038 - this.birthYear);
//   }
//   greet() {
//     console.log(`hi dear ${this.firstName}`);
//   }

//   static hey() {
//     console.log("hi🖐");
//   }

//   set fullName(name) {
//     if (name.includes(" ")) this._fullName = name;
//     else alert("it is not a full name ");
//   }

//   get fullName() {
//     return this._fullName;
//   }
// }

// const jessy = new personalCL("jessy akbari", 1995);
// console.log(jessy.__proto__);
// console.log(personalCL.prototype);
// jessy.calcAge2();
// personalCL.hey();
// jessy.greet();

// class Car {
//   constructor(factory, speed) {
//     (this.factory = factory), (this.speed = speed);
//   }
//   accelerate() {
//     return (this.speed += 10);
//   }
//   brake() {
//     return (this.speed -= 5);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(speed) {
//     return (this.speed = speed * 1.6);
//   }
// }

// const ford = new Car("Ford", 120);
// console.log(ford.speedUS);

// ford.accelerate();
// console.log(ford.accelerate());
// console.log(ford.accelerate());
// console.log(ford.brake());
// ford.speedUS = 50;
// console.log(ford);

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };
// Student.prototype = Object.create(Person.prototype);
// Student.prototype.introduction = function () {
//   console.log(`hi my name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student("Mike", 1970, "math");
// mike.introduction();
// mike.calcAge();
// Student.prototype.constructor = Student;
// ///////////////////////////////

// const Car = function (factory, speed) {
//   this.factory = factory;
//   this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`accelerate to ${this.speed}`);

// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//     console.log(`Decelerate to ${this.speed}`);

// };

// const EV = function (factory, speed, charge) {
//   Car.call(this, factory, speed);
//   this.charge = charge;
// };
// EV.prototype = Object.create(Car.prototype);
// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
//   console.log(
//     `this car is made by ${this.factory} chargetd up to ${chargeTo}%`
//   );
// };
// EV.prototype.accelerate = function(){
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.factory} is going at ${this.speed} km/h, with the charge of ${this.charge}%`
//   );
// }

// const tesla = new EV("Tesla", 120, 23);
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();

// tesla.chargeBattery(90);
// tesla.accelerate();
