let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID = 0;
let currentIndex = 0;

const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.nav-item');

slides.forEach((slide, index) => {
  slide.addEventListener('click', () => {
    currentIndex = index;
    changeSlide();
  });
});

slider.addEventListener('mousedown', startDrag);
slider.addEventListener('touchstart', startDrag);

slider.addEventListener('mouseup', endDrag);
slider.addEventListener('touchend', endDrag);

slider.addEventListener('mousemove', drag);
slider.addEventListener('touchmove', drag);

function startDrag(event) {
  if (event.type === 'touchstart') {
    startPosition = event.touches[0].clientX;
  } else {
    startPosition = event.clientX;
  }
  isDragging = true;
  animationID = requestAnimationFrame(animation);
}

function drag(event) {
  if (!isDragging) return;

  let currentPosition;
  if (event.type === 'touchmove') {
    currentPosition = event.touches[0].clientX;
  } else {
    currentPosition = event.clientX;
  }

  const difference = currentPosition - startPosition;
  currentTranslate = previousTranslate + difference;

  slider.style.transform = `translateX(${currentTranslate}px)`;

  cancelAnimationFrame(animationID);
}

function endDrag() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const slideWidth = slides[0].offsetWidth;

  if (currentTranslate > 0) {
    currentTranslate = 0;
  } else if (currentTranslate < -slideWidth * (slides.length - 4)) {
    currentTranslate = -slideWidth * (slides.length - 4);
  }

  previousTranslate = currentTranslate;

  animationID = requestAnimationFrame(animation);
}

function animation() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
  animationID = requestAnimationFrame(animation);
}

function changeSlide() {
  const slideWidth = slides[0].offsetWidth;
  currentTranslate = -slideWidth * currentIndex;
  previousTranslate = currentTranslate;
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

window.addEventListener('resize', () => {
  const slideWidth = slides[0].offsetWidth;
  currentTranslate = -slideWidth * currentIndex;
  previousTranslate = currentTranslate;
  slider.style.transform = `translateX(${currentTranslate}px)`;
});
