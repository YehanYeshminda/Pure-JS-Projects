'use strict';

// const { measureMemory } = require("vm");

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.nav__logo');
const section1 = document.getElementById('section--1'); // // SCROLL TO
const btnScrollTo = document.querySelector('.btn--scroll-to');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const contentAreas = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault(); // to stop the scroll to the top
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ! TO IMPLEMENT SMOOTH SCROLLING

btnScrollTo.addEventListener('click', function (e) {
  const sec1Coors = section1.getBoundingClientRect(); // COORDS FOR THE SECTION1
  const btnCoords = e.target.getBoundingClientRect(); // COORDINATES FOR THE BUTTON
  // SMOOTH SCROLLING
  section1.scrollIntoView({ behavior: 'smooth' });
});

// ! PAGE NAVIGATION WITH SMOOTH SCROLLING (WITHOUT EVENT DELIGATION)
// const pageNavigation = document
//   .querySelectorAll('.nav__link')
//   .forEach(function (ele) {
//     ele.addEventListener('click', function (ele) {
//       ele.preventDefault(); // to preventDefault behavior

//       // TO GET AN ID FROM AN SPECIFIC ELEMENT
//       const id = this.getAttribute('href');

//       // TO IMPLEMENT SMOOTH SCROLLING
//       document.querySelector(`${id}`).scrollIntoView({ behavior: 'smooth' });
//     });
//   });

// ! PAGE NAVIGATION WITH SMOOTH SCROLLING (WITH EVENT DELIGATION)
// THERE ARE 2 STEPS
// 1. ADD EVENT LISTNER TO COMMON PARENT ELEMENT
// 2. DETERMINE WHAT EVENT ORIGINATED THE EVENT
document.querySelector(
  'nav__links',
  addEventListener('click', function (e) {
    e.preventDefault(); // to preventDefault behavior
    // MATCHING
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(`${id}`).scrollIntoView({ behavior: 'smooth' });
    }
  })
);

// ! CREATING AN COOKIE MESSAGE - INSERTING ELEMENTS
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'we use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';
const header = document.querySelector('.header');

// header.prepend(message); // INSERTS AS THE FIRST CHILD

header.append(message); // INSERTS AS THE LAST CHILD
// header.prepend(message.cloneNode(true)); // CLONES THE CHILD CHILD IT IS ASSINGED AND INSERTS INTO THE BEGINNING

// header.before(message); // INSERTS BEFORE THE HEADER ELEMENT
// header.after(message); // INSERTS AFTER THE HEADER ELEMENT

// ! REMOVING AN ELEMENT FROM THE HTML
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function (e) {
    e.preventDefault();
    // THE MESSAGE NODE IS ALREADY SELECTED
    // TO REMOVE AN NODE FROM AN HTML
    message.remove();
  });

message.style.backgroundColor = '#37383d'; // to chnage the background
message.style.width = '120%'; // to change the width

// ! BUILDING THE TABBED COMPONENT

// ! USAGE OF EVENT DELEGATION
tabsContainer.addEventListener('click', function (e) {
  const clickedTab = e.target.closest('.operations__tab');

  // THE GUARD CLAUSE IN ORDER TO PREVENT THE EVENT WHICH HAPPEN IS THERE IS NOT TAB CLICKED
  if (!clickedTab) return;

  // ANOTHER ALTERNATIVE FOR TOGGLE AND IS USED MORE
  tabs.forEach(ele => {
    ele.classList.remove('operations__tab--active');
  });

  clickedTab.classList.add('operations__tab--active');

  //// MAKING THE CONTENT AREA
  // REMOVING THE ONES ACTIVE BEFORE WE ADD ANOTHER
  contentAreas.forEach(ele => {
    ele.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

// ! MENU FADE DELEGATION
const handleHover = function (event, opacity) {
  if (event.target.classList.contains('nav__link')) {
    // TO GET THE LINK CLICKED
    const linkClicked = event.target;

    // TO SEARCH THE NAV LINKS WHICH ARE AVAILABLE
    const siblings = linkClicked.closest('.nav').querySelectorAll('.nav__link');

    // TO SEARCH THE LOGO
    const logo = linkClicked.closest('.nav').querySelector('img');

    siblings.forEach(ele => {
      if (ele != linkClicked) ele.style.opacity = this; // usage of the this keyword is a must when using the bind method
    });

    logo.style.opacity = this; // usage of the this keyword is a must when using the bind method
  }
};

// PASSING IN AN ARGUMENT INTO AN HANDLER
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// TO GET THE EXACT COORDS OF THE PLACEMENT OF THIS SECTION
const initialCoors = section1.getBoundingClientRect();

// ! ADDING THE STICKY NAVIGATION HEADER USING AN API AS WELL
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoors.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// const observerCallBack = function (entries, observer) {
//   entries.forEach(ele => {
//     console.log(ele);
//   });
// };

// const observerOptions = {
//   root: null, // we are able to observe the entire view port
//   threshold: [0, 0.2], // intersecting at 10%
// };

// const observer = new IntersectionObserver(observerCallBack, observerOptions);
// observer.observe(section1);

// ! USAGE OF THE OBSERVER API IN ORDER TO CREATE THE HEADERS STICKY
const headerSection = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; // to make the nav bar more reponsive

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // when 0% of the header is not visible we want something to happen
  rootMargin: `-${navHeight}px`, // adds a margin outside of the tracking
});

headerObserver.observe(headerSection);

// ! CREATION OF THE FADE IN WHEN WE APPROACH SECTIONS
const selectionOfSections = document.querySelectorAll('.section');

const revealSections = function (entries, observerSet) {
  const [entry] = entries; // to get the coors in order to add stuff
  // console.log(entry);

  if (!entry.isIntersecting) {
    return;
  } // which means do nothing

  entry.target.classList.remove('section--hidden');

  observerSet.unobserve(entry.target); // to make sure we unobserve after we finish observing
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null, // if we want the rool to be the view port
  threshold: 0.15, // when the sections are visible at 15% it will then show
});

selectionOfSections.forEach(sections => {
  sectionObserver.observe(sections);
  // sections.classList.add('section--hidden'); // to add something at default
});

// ! LAZY LOAD IMAGES AND REPLACE VALUES
const selectionOfImages = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // to replace the SRC with the Dataset value
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // in order to make sure that the images are loaded in before the user is shown the image
});

selectionOfImages.forEach(img => imgObserver.observe(img));

// ! BUILDING THE SLIDER USING PURE JS
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//! SOMETHING TO DO WHEN THE WHOLE CONTENT IS LOADED
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML LOADED, CSS LOADED AND JS LOADED');
});

//! TO CREATE AN CONFIRMATION ON LEAVE
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
