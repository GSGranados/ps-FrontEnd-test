//const values and selectors
const BASE_URL = "backend/tours.json"; //BASE URL used to retrieve the tours object (Array)
let toursArray = []; // Array used to store all the tours retrieved and not rely on fetching the JSON again.

//selectors
const products = document.querySelector(".product");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const menuBtn = document.querySelector(".header__nav-menu");
const mobileMenu = document.querySelector(".mobile__list");

//listeners
document.addEventListener("DOMContentLoaded", imageFetchAndRender);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
products.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
menuBtn.addEventListener("click", openMenu);

//Initial Image fetch using the JSON file (Only 1 fetch performed)
async function imageFetchAndRender() {
  const response = await fetch(BASE_URL);
  const tours = await response.json();
  toursArray = tours;
  const markup = toursArray.map((tour, i) => generateMarkup(tour, i)).join("");
  products.insertAdjacentHTML("afterbegin", markup);
}

//initial function to generate Product Markup
function generateMarkup(data, index) {
  return `<div class="product__card" data-product="${index}">
      <div class="product__cta">
        <span class="product__price"
          >from <strong class="high">&#36;${data.Price}</strong></span
        >
        <span class="product__deal"
          >you save <strong class="deal-high">10%</strong></span
        >
        <a href="#" title="${data.TourName}" class="product__btn">Book it!</a>
      </div>
      <figure class="product__shape">
        <img
          class="product__img"
          src="${data.Photo}"
          alt="${data.TourName}"
        />
        <figcaption class="product__caption">More Info</figcaption>
      </figure>
      ${
        index === 0 || index === 2
          ? `<p class="product__hot">
          Hot <br />
          <strong class="hot-high">deal</strong>
      </p>`
          : ``
      }
      <div class="product__details">
        <p class="product__title">${data.TourName}</p>
        <p class="product__date">Daily from ${data.schedule.from} to ${
    data.schedule.to
  }</p>
      </div>
    </div>`;
}

//Function to generate the Markup for the Modal component
function generateModal(data) {
  return `
      <div class="modal__content">
      <div class="modal__main">
        <img src="${data.Photo}" alt="${data.TourName}" class="modal__img" />
        <h2 class="modal__title">${data.TourName}</h2>
        <span class="modal__price">from &#36;${data.Price}</span>
      </div>
      <div class="modal__details">
        <button class="modal__close">&times;</button>
        <h2
          class="heading-secondary u-margin-bottom-small heading-secondary--modal"
        >
          Tour Highlights
        </h2>
        <p class="modal__description u-margin-bottom-small">
        ${data.Description}
        </p>
        <form class="modal__form">
          <div class="modal__form-container">
            <div class="modal__group">
              <input
                class="modal__input"
                type="number"
                name="passengers"
                id="passengers"
                placeholder="passengers"
              />
              <label class="modal__label" for="passengers">Passengers</label>
            </div>
            <div class="modal__group">
              <input
                class="modal__input"
                type="number"
                name="days"
                id="days"
                placeholder="Tour days"
              />
              <label class="modal__label" for="days">Tour Days</label>
            </div>
          </div>
          <div class="modal__group">
            <input class="modal__input" type="date" name="date" id="date" />
          </div>
          <button class="modal__button">Next Steps &rarr;</button>
        </form>
      </div>
    </div>
  `;
}

async function openModal(e) {
  e.preventDefault();
  const link = e.target.closest(".product__btn");
  if (!link) return;
  const card = link.closest(".product__card").getAttribute("data-product");
  const productObject = toursArray.find((_, i) => i === +card);
  //Showing the Modal
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
  //Creating the HTML
  const markup = await generateModal(productObject);
  //Injecting the Element on the Modal
  modal.insertAdjacentHTML("afterbegin", markup);
  //Adding the event listener to the X button
  const modalClose = document.querySelector(".modal__close");
  modalClose.addEventListener("click", closeModal);
}

//Close modal method
function closeModal() {
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
  modal.innerHTML = "";
}

//Function to handle the clicks of the Mobile Menu button
function openMenu() {
  if (
    mobileMenu.style.opacity === "1" ||
    mobileMenu.style.visibility === "visible"
  ) {
    mobileMenu.style.opacity = "0";
    mobileMenu.style.visibility = "hidden";
    return;
  }
  mobileMenu.style.opacity = "1";
  mobileMenu.style.visibility = "visible";
}
