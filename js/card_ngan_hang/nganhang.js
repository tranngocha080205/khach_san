// Page fade-in animation
gsap.from("body", {
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
});

// Progress indicator animation
gsap.from("#progress-section .flex.items-center > *", {
  opacity: 0,
  x: -30,
  duration: 0.5,
  stagger: 0.15,
  ease: "power2.out",
  delay: 0.3,
});

// Main content animation
gsap.from("#payment-section > div", {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: "power2.out",
  delay: 0.6,
});

// Form submission handler
document
  .getElementById("payment-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic validation
    const cardNumber = document.getElementById("card-number").value;
    const cardholder = document.getElementById("cardholder").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    if (cardNumber && cardholder && expiry && cvv) {
      // Show loading animation
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Processing...";
      submitBtn.disabled = true;

      // Simulate payment processing
      setTimeout(() => {
        // Redirect to success page
        window.location.href = "../booking/confirm.html";
      }, 1500);
    }
  });

// Card number formatting
document.getElementById("card-number").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\s/g, "");
  let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
  e.target.value = formattedValue;
});

// Expiry date formatting
document.getElementById("expiry").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length >= 2) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4);
  }
  e.target.value = value;
});

// CVV numeric only
document.getElementById("cvv").addEventListener("input", function (e) {
  e.target.value = e.target.value.replace(/\D/g, "");
});
