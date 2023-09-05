const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const closer = document.querySelector(".menu__close");
const btnOpenModal = document.querySelectorAll(".show-modal");
const modalWindow = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const menuOverlay = document.querySelector(".menu__overlay");
const portfolioWr = document.querySelector(".portfolio__wrapper");
const portfolioLink = document.querySelector(".portfolio__item");
const menuLink = document.querySelectorAll(".menu__link");
// hamburger.addEventListener("click", function () {
//   menu.classList.add("active");
// });

// closer.addEventListener("click", function () {
//   menu.classList.remove("active");
// });

//hamburger
hamburger.addEventListener("click", function () {
  menu.classList.add("active");
  menuOverlay.classList.remove("hidden");
});

closer.addEventListener("click", function () {
  menu.classList.remove("active");
  menuOverlay.classList.add("hidden");
});

menuOverlay.addEventListener("click", function () {
  menu.classList.remove("active");
  menuOverlay.classList.add("hidden");
});

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && menu.classList.contains("active")) {
    menu.classList.remove("active");
    menuOverlay.classList.add("hidden");
  }
});

menuLink.forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.remove("active");
    menuOverlay.classList.add("hidden");
  });
});

//scroll

const allSections = document.querySelectorAll(".section");
function revealSection(entries, observe) {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove("section--hidden");
    observe.unobserve(entries[0].target);
  }
}

const sectionsObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionsObserver.observe(section);
  section.classList.add("section--hidden");
});

//blur

function hover(e, opacity) {
  if (e.target.classList.contains("portfolio__item-text")) {
    const link = e.target;
    const siblings = link
      .closest(".portfolio__wrapper")
      .querySelectorAll(".portfolio__img");
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
}

portfolioWr.addEventListener("mouseover", hover.bind(0.5));

portfolioWr.addEventListener("mouseout", hover.bind(1));

//privacy

// for (let value of btnOpenModal) {
//   value.addEventListener("click", function () {
//     overlay.classList.toggle("hidden");
//     modalWindow.classList.toggle("hidden");
//   });
// }

// btnCloseModal.addEventListener("click", function () {
//   overlay.classList.toggle("hidden");
//   modalWindow.classList.toggle("hidden");
// });

// overlay.addEventListener("click", function () {
//   overlay.classList.toggle("hidden");
//   modalWindow.classList.toggle("hidden");
// });

// document.addEventListener("keydown", function (e) {
//   if (e.key == "Escape" && !modalWindow.classList.contains("hidden")) {
//     overlay.classList.toggle("hidden");
//     modalWindow.classList.toggle("hidden");
//   }
// });
