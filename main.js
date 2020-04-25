const wrapper = document.querySelector(".wrapper");
const title = document.querySelector("#title");
const welcome = document.querySelector("#welcome");
const imageDescriptions = wrapper.querySelectorAll(".image__description");
const welcomeWords = ["Houses", "of the", "World"];
function moveTitle() {
  if (window.scrollY < 800) {
    title.style.transform = `translateX(${-window.scrollY}px)`;
  }
}
function changeImageDescriprion(swiper) {
  const activeIndex = swiper.activeIndex;

  [...imageDescriptions].forEach((description) => {
    if (description.id === `img_${activeIndex + 1}`) {
      gsap.fromTo(
        `#img_${activeIndex + 1}`,
        { scale: 1, autoAlpha: 0 },
        {
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          scale: 1.3,
          autoAlpha: 1,
        }
      );
    } else {
      gsap.fromTo(
        description,
        { scale: 1, autoAlpha: 1 },
        {
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          scale: 1.2,
          autoAlpha: 0,
        }
      );
    }
  });
}
function addNextLetter(element, word) {}

function main() {
  let word = 0;
  setTimeout(() => {
    addNextLetter(welcome.children[word], welcomeWords[word]);
  }, [welcomeWords[word].length * 1000]);

  gsap.to("#title", { duration: 1, ease: "elastic.out(1, 0.3)", x: 100 });

  document.addEventListener("scroll", moveTitle);

  var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
  swiper.on("slideChange", () => changeImageDescriprion(swiper));
}

window.addEventListener("DOMContentLoaded", main);
