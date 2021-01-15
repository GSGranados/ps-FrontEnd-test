"use-strict";
//const values and selectors
const BASE_URL = "backend/tours.json";
let toursArray = [];
//selectors
const products = document.querySelector(".product");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

//listeners
document.addEventListener("DOMContentLoaded", imageFetchAndRender);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
products.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

//Initial Image fetch using the JSON file
async function imageFetchAndRender() {
  const response = await fetch(BASE_URL);
  const tours = await response.json();
  toursArray = tours;
  const markup = tours.map((tour, i) => generateMarkup(tour, i)).join("");
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
        <a href="#" class="product__btn">Book it!</a>
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

function openModal(e) {
  e.preventDefault();
  const link = e.target.closest(".product__btn");
  if (!link) return;
  const card = link.closest(".product__card").getAttribute("data-product");
  const productObject = toursArray.find((_, i) => i === +card);
  console.log(productObject);
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}

function closeModal() {
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}
