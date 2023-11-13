document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const form = document.querySelector(".form");
  const openFormBtns = document.querySelectorAll(".open-form-btn");
  const closeFormBtn = form.querySelector(".close-form-btn");
  const emailForm = document.getElementById("email-form");
  const hamb = document.querySelector("#hamb");
  const popup = document.querySelector("#popup");
  const menu = document.querySelector("#menu").cloneNode(true);

  function openForm() {
    form.style.display = "block";
  }

  function closeForm() {
    form.style.display = "none";
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(emailForm);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "email.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          alert("Письмо успешно отправлено!");
          closeForm();
        } else {
          alert("Ошибка при отправке письма. Пожалуйста, попробуйте позже.");
        }
      }
    };

    xhr.send(new URLSearchParams(formData).toString());
  }

  function toggleMenu() {
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    body.classList.toggle("noscroll");

    if (popup.classList.contains("open")) {
      renderPopup();
    }
  }

  function renderPopup() {
    popup.appendChild(menu);
  }

  body.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("open-form-btn")) {
      openForm();
    }

    if (target.classList.contains("close-form-btn")) {
      closeForm();
    }

    if (target === hamb) {
      toggleMenu();
    }

    if (popup.classList.contains("open") && !popup.contains(target) && target !== hamb) {
      toggleMenu();
    }
  });

  openFormBtns.forEach(function (btn) {
    btn.addEventListener("click", openForm);
  });

  closeFormBtn.addEventListener("click", closeForm);
});

// slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const counter = document.querySelector('.counter');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let slideIndex = 0;

function updateCounter() {
  counter.textContent = `${slideIndex + 1}/${slides.length}`;
}

function showSlide(index) {
  if (index >= 0 && index < slides.length) {
    slideIndex = index;
  } else if (index >= slides.length) {
    slideIndex = 0;
  } else {
    slideIndex = slides.length - 1;
  }

  const translateValue = -100 * slideIndex + '%';
  slider.style.transform = `translateX(${translateValue})`;

  updateCounter();
}

showSlide(slideIndex);

function nextSlide() {
  showSlide(slideIndex + 1);
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
