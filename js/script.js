const pagedown = document.querySelector(".pagedown");
const projectsWr = document.querySelector(".projects__wrapper");

//scroller
pagedown.addEventListener("click", function () {
  window.scrollTo({
    top: 2000,
    left: 0,
    behavior: "smooth",
  });
});

//smooth scroll
window.addEventListener("scroll", (e) => {
  document.documentElement.style.setProperty(
    "--scrollTop",
    `${this.scrollY}px`
  ); // Update method
});
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  wrapper: ".wrapper",
  content: ".content",
});

//blur (replaced with CSS)

// function hover(e, opacity) {
//   if (e.target.classList.contains("projects__item-text")) {
//     const link = e.target;
//     const siblings = link
//       .closest(".projects__wrapper")
//       .querySelectorAll(".projects__img");
//     siblings.forEach((el) => {
//       if (el !== link) {
//         el.style.opacity = this;
//       }
//     });
//   }
// }
// projectsWr.addEventListener("mouseover", hover.bind(0.5));
// projectsWr.addEventListener("mouseout", hover.bind(1));

//hidden text

// projectsItem.addEventListener("mouseover", none);
// projectsItem.addEventListener("mouseout", hidden);

// function none() {
//   hint.setAttribute("visibility", "none");
// }
// function hidden() {
//   hint.setAttribute("visibility", "hidden");
// }

// projectsItem.addEventListener("mouseover", function () {
//   projectsText.classList.remove("hint");
// });

// projectsItem.addEventListener("mouseout", function () {
//   projectsText.classList.remove("hint");
// });

// function hover(e, opacity) {
//   if (e.target.classList.contains("projects__item-img")) {
//     const link = e.target;
//     if (el === link) {
//       projectsText.classList.toggle("hint");
//     }
//   }
// }
// projectsImg.addEventListener("mouseover", hover.bind(0.5));
// projectsImg.addEventListener("mouseout", hover.bind(1));

// function hover(e, opacity) {
//   if (e.target.classList.contains("projects__item")) {
//     const link = e.target;
//     const siblings = link
//       .closest(".projects__wrapper")
//       .querySelectorAll(".projects__link");

//     siblings.forEach((el) => {
//       if (el !== link) {
//         el.style.opacity = this;
//       }
//     });
//   }
// }
