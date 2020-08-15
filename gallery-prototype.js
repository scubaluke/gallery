function Gallery(gallery) {
  if (!gallery) {
    throw new Error('no gallery found!');
  }
  this.gallery = gallery;
  // select elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  // bind our methods to the instance when we need them
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);
  // EVENT LISTENERS //
  this.images.forEach(image =>
    image.addEventListener('click', event =>
      this.showImage(event.currentTarget)
    )
  );
  // loop over each image
  this.images.forEach(image => {
    // attach event listener for each image
    image.addEventListener('keyup', e => {
      // when that is keyup'd check if it was enter
      if (e.key === 'Enter') {
        // if it was, show that image
        this.showImage(e.currentTarget);
      }
    });
  });
  this.modal.addEventListener('click', this.handleClickOutside);
}

//  functions

Gallery.prototype.openModal = function() {
  console.info('opening Modal...');
  // check if modal is open
  if (this.modal.matches('.open')) {
    console.info('modal already open');
    return; // to stop it from running
  }
  this.modal.classList.add('open');

  // event listeners to be bound when we open modal
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');
  //  add event listeners for clicks and keyboard
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.handleClickOutside = function(e) {
  // console.log(e.target);
  // console.log(e.currentTarget);
  if (e.target === e.currentTarget) {
    this.closeModal();
  }
};

Gallery.prototype.showNextImage = function() {
  console.log(this);
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};
Gallery.prototype.showPrevImage = function() {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

Gallery.prototype.handleKeyUp = function(event) {
  if (event.key === 'Escape') return this.closeModal();
  if (event.key === 'ArrowRight') return this.showNextImage();
  if (event.key === 'ArrowLeft') return this.showPrevImage();
};

Gallery.prototype.showImage = function(element) {
  if (!element) {
    console.info('no image to show');
    return;
  }
  // update modal with the info
  console.log(element);
  this.modal.querySelector('img').src = element.src;
  this.modal.querySelector('h2').src = element.title;
  this.modal.querySelector('figure p').src = element.dataset.description;
  this.currentImage = element;
  this.openModal();
};

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);
