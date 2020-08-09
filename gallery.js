function Gallery(gallery) {
  if (!gallery) {
    throw new Error('no gallery found!');
  }
  // select elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    console.info('opening Modal...');
    // check if modal is open
    if (modal.matches('.open')) {
      console.info('modal already open');
      return; // to stop it from running
    }
    modal.classList.add('open');

    // event listeners to be bound when we open modal
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    // TODO: add event listeners for clicks and keyboard
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    console.log(e.target);
    console.log(e.currentTarget);
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }
  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  function showImage(element) {
    if (!element) {
      console.info('no image to show');
      return;
    }
    // update modal with the info
    console.log(element);
    modal.querySelector('img').src = element.src;
    modal.querySelector('h2').src = element.title;
    modal.querySelector('figure p').src = element.dataset.description;
    currentImage = element;
    openModal();
  }
  // EVENT LISTENERS //
  images.forEach(image =>
    image.addEventListener('click', event => showImage(event.currentTarget))
  );
  // loop over each image
  images.forEach(image => {
    // attach event listener for each image
    image.addEventListener('keyup', e => {
      // when that is keyup'd check if it was enter
      if (e.key === 'Enter') {
        // if it was, show that image
        showImage(e.currentTarget);
      }
    });
  });
  modal.addEventListener('click', handleClickOutside);
}
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
