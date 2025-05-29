window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  btn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});




// lightbox functionality for the hero images
// https://www.w3schools.com/howto/howto_js_lightbox.asp
const images = document.querySelectorAll('.hero-image');
let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  // Create overlay
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');

  // Create image
  const imgElement = document.createElement('img');
  imgElement.src = images[index].src;
  imgElement.alt = images[index].alt;
  lightbox.appendChild(imgElement);

  // Create arrows
  const leftArrow = document.createElement('button');
  leftArrow.classList.add('arrow', 'left-arrow');
  leftArrow.innerHTML = '◀';
  lightbox.appendChild(leftArrow);

  const rightArrow = document.createElement('button');
  rightArrow.classList.add('arrow', 'right-arrow');
  rightArrow.innerHTML = '▶';
  lightbox.appendChild(rightArrow);

  document.body.appendChild(lightbox);

  // Update image by index
  function updateImage(newIndex) {
    currentIndex = newIndex;
    imgElement.src = images[currentIndex].src;
    imgElement.alt = images[currentIndex].alt;
  }

  // Arrow click handlers
  leftArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex > 0) updateImage(currentIndex - 1);
  });

  rightArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex < images.length - 1) updateImage(currentIndex + 1);
  });

  // Close on click outside arrows
  lightbox.addEventListener('click', () => lightbox.remove());

  // Close on Escape
  document.addEventListener('keydown', function closeOnEscape(e) {
    if (e.key === 'Escape') {
      lightbox.remove();
      document.removeEventListener('keydown', closeOnEscape);
    }
  });

  // Touch swipe support
  let startX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < images.length - 1) {
        // Swiped left
        updateImage(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Swiped right
        updateImage(currentIndex - 1);
      }
    }
  });

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '✖';
    lightbox.appendChild(closeBtn);

    // Close on click
    closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    lightbox.remove();
    });

}

// backToTop button functionality

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 250 ? 'block' : 'none';
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// get the current year for the footer
document.getElementById("year").textContent = new Date().getFullYear();