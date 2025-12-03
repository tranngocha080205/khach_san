// Stay duration logic
let days = 3;
const ratePerNight = 120;
const daysCountEl = document.getElementById("days-count");
const nightsDisplayEl = document.getElementById("nights-display");
const totalPriceEl = document.getElementById("total-price");
const decreaseBtn = document.getElementById("decrease-days");
const increaseBtn = document.getElementById("increase-days");

function updatePrice() {
  daysCountEl.textContent = days;
  nightsDisplayEl.textContent = days;
  const total = days * ratePerNight;
  totalPriceEl.textContent = `$${total}`;
}

decreaseBtn.addEventListener("click", () => {
  if (days > 1) {
    days--;
    updatePrice();
  }
});

increaseBtn.addEventListener("click", () => {
  days++;
  updatePrice();
});

// Date picker logic
const dateInput = document.getElementById("date-input");
const checkinDateEl = document.getElementById("checkin-date");
const checkoutDateEl = document.getElementById("checkout-date");

dateInput.addEventListener("change", (e) => {
  const selectedDate = new Date(e.target.value);
  const checkoutDate = new Date(selectedDate);
  checkoutDate.setDate(checkoutDate.getDate() + days);

  const options = { year: "numeric", month: "short", day: "numeric" };
  checkinDateEl.textContent = selectedDate.toLocaleDateString("en-US", options);
  checkoutDateEl.textContent = checkoutDate.toLocaleDateString(
    "en-US",
    options,
  );
});
