'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollto = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const operations = document.querySelector('.operations');
const nav = document.querySelector('.nav');
const logo = document.querySelector('#logo');
const header = document.querySelector('.header');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
btnScrollto.addEventListener('click', function (e) {
  let s1corts = section1.getBoundingClientRect();
  // console.log(23);
  // window.scrollTo(s1corts.left + window.scrollX, s1corts.top + window.scrollY);
  // window.scrollTo({
  //   left: s1corts.left + window.scrollX,
  //   top: s1corts.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     document.querySelector(el.getAttribute('href')).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });
// event dalegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains('nav__link'))
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
});
operations.addEventListener('click', function (e) {
  e.preventDefault();
  let click = e.target.closest('.operations__tab');
  let opNum = +click.dataset.tab;
  if (!click) return;
  // let arr = [1, 2, 3].filter(el => el != opNum);
  // document
  //   .querySelector(`.operations__tab--${arr[0]}`)
  //   .classList.remove('operations__tab--active');
  // document
  //   .querySelector(`.operations__content--${arr[0]}`)
  //   .classList.remove('operations__content--active');
  // document
  //   .querySelector(`.operations__tab--${arr[1]}`)
  //   .classList.remove('operations__tab--active');
  // document
  //   .querySelector(`.operations__content--${arr[1]}`)
  //   .classList.remove('operations__content--active');
  // console.log(opNum);
  document
    .querySelectorAll('.operations__content--active')
    .forEach(function (el) {
      el.classList.remove('operations__content--active');
    });
  document.querySelectorAll('.operations__tab--active').forEach(function (el) {
    el.classList.remove('operations__tab--active');
  });
  document
    .querySelector(`.operations__tab--${opNum}`)
    .classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${opNum}`)
    .classList.add('operations__content--active');
});
let links = document.querySelectorAll('.nav__link');
let navListener = function (e) {
  if (
    !e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__logo')
  )
    return;
  links.forEach(function (link) {
    if (link !== e.target) {
      link.style.opacity = 0.5;
    } else link.style.opacity = 1;
  });
  logo.style.opacity = 0.5;
};
nav.addEventListener('mouseover', function (e) {
  navListener(e);
});
nav.addEventListener('mouseout', function () {
  links.forEach(function (link) {
    link.style.opacity = 1;
    logo.style.opacity = 1;
  });
});
// window.addEventListener('scroll', function (e) {
//   let sec1Dim = section1.getBoundingClientRect();
//   if (this.scrollY > sec1Dim.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
let navheight = nav.getBoundingClientRect();
console.log(navheight);
let headerObs = new IntersectionObserver(
  function (entries, obs) {
    entries.forEach(function (ent, _) {
      console.log(ent);
      if (!ent.isIntersecting) nav.classList.add('sticky');
      else nav.classList.remove('sticky');
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navheight.height}px`,
  }
);

headerObs.observe(header);
//sections show up
let sections = document.querySelectorAll('.section');
let secObserver = new IntersectionObserver(
  function (entries, obs) {
    entries.forEach(sec => {
      if (sec.isIntersecting) sec.target.classList.remove('section--hidden');
      else sec.target.classList.add('section--hidden');
    });
  },
  {
    root: null,
    threshold: 0.15,
  }
);
sections.forEach(sec => secObserver.observe(sec));
/////////////////////////////////////////////
// console.log(document.documentElement);
// let body = document.body;
// let el = body.querySelector('.header');
// // el.style.backgroundColor = 'black';
// let btns = document.getElementsByTagName('button');
// console.log(btns);
// btns[0].textContent = '';

// let message = document.createElement('button');
// message.classList.add('btn--close-cookie');
// message.innerHTML = "<a href=''>Hiiiiiiii</a>";
// el.append(message);
// el.prepend(message);
// // message.remove();
// console.log(message);
// // console.log(getComputedStyle(message));
// message.style.setProperty('background-color', 'red');
// console.log(message.getAttribute('class'));
// console.log(message.class);
// let h1 = document.querySelector('h1');
// h1.addEventListener('click', function (e) {
//   e.preventDefault();
//   alert('hiiii');
// });
// setTimeout(
//   () =>
//     h1.removeEventListener('click', function (e) {
//       e.preventDefault();
//       alert('hiiii');
//     }),
//   1000
// );
// let headerTitle = document.querySelector('.header__title');
// console.log(headerTitle.parentElement);
// console.log(headerTitle.parentNode);
// console.log(headerTitle.childNodes);
// console.log(headerTitle.children);
// console.log(headerTitle.lastElementChild);
// console.log(headerTitle.firstElementChild);
// console.log(headerTitle.closest('h1'));
// console.log(headerTitle.previousElementSibling);
// console.log(headerTitle.nextElementSibling);
