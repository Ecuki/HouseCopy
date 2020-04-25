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

function showWelcomeMessage() {
  let delay = 0;
  [...welcome.children].map((word) =>
    [...word.children].map((letter) => {
      delay += 0.05;
      return gsap.to(letter, {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        delay: delay,
        scale: 1,
      });
    })
  );

  gsap.to(welcome, {
    duration: 1,
    delay: (delay += 1),
    height: 0,
  });
  gsap.to(welcome, {
    duration: 0.3,
    delay: (delay += 0.7),
    autoAlpha: 0,
  });
  [...title.children].map((span) =>
    gsap.to(span, {
      duration: 0.3,
      delay: (delay += 0.1),
      scale: 1,
    })
  );
  // gsap.to(title, {
  //   duration: 0.3,
  //   delay: delay + 1.7,
  //   autoAlpha: 0,
  // });
}

function main() {
  showWelcomeMessage();
  AOS.init();
  // gsap.to("#title", { duration: 1, ease: "elastic.out(1, 0.3)", x: 100 });

  document.addEventListener("scroll", moveTitle);

  var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 2,
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
