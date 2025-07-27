
  document.addEventListener('DOMContentLoaded', () => {
  // HERO Slideshow
  const hero = document.querySelector('.hero');
  const heroImages = [
    'pictures/hero-bg.jpg',
    'pictures/hero-bg2.jpg',
    'pictures/hero-bg3.jpg'
  ];
  let heroIndex = 0;
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    hero.style.backgroundImage = `url("${heroImages[heroIndex]}")`;
  }, 4000);

  // GALLERY Slideshow
  const galleryImages = document.querySelectorAll('.gallery img');
  let galleryIndex = 0;

  setInterval(() => {
    galleryImages.forEach((img, idx) => {
      img.style.display = idx === galleryIndex ? 'block' : 'none';
    });
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
  }, 3000);
  // Fade in sections on scroll
  const sections = document.querySelectorAll('section');
  const fadeOptions = { threshold: 0.2 };
  const fadeIn = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  };
  const fadeObserver = new IntersectionObserver(fadeIn, fadeOptions);
  sections.forEach(section => fadeObserver.observe(section));

  // Booking form logic
  const roomAvailability = { A: 3, B: 2, C: 4, D: 1 };
  const bookingForm = document.getElementById('bookingForm');
  const formStatus = document.getElementById('formStatus');

  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const type = document.getElementById('roomType').value;

    if (roomAvailability[type] > 0) {
      roomAvailability[type]--;
      document.getElementById(`${type.toLowerCase()}-count`).textContent = roomAvailability[type];
      formStatus.textContent = `Room Type ${type} booked successfully!`;
      formStatus.style.color = 'green';
    } else {
      formStatus.textContent = `Sorry, Room Type ${type} is fully booked.`;
      formStatus.style.color = 'red';
    }

    this.reset();
  });
});
function setupSlideshow(className) {
  const slides = document.querySelectorAll("." + className);
  let index = 0;

  if (slides.length === 0) return;

  slides[index].classList.add("active");

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3000); // 3 seconds
}

setupSlideshow("a-slide");
setupSlideshow("b-slide");
setupSlideshow("c-slide");
setupSlideshow("d-slide");
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("#stars span");
  const form = document.getElementById("review-form");
  const thankYou = document.getElementById("thank-you");
  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.getAttribute("data-star"));
      stars.forEach(s => {
        s.style.color = s.getAttribute("data-star") <= selectedRating ? "gold" : "gray";
      });
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (selectedRating > 0) {
      thankYou.style.display = "block";
      form.reset();
      stars.forEach(s => s.style.color = "gray");
    } else {
      alert("Please select a star rating before submitting.");
    }
  });
});
