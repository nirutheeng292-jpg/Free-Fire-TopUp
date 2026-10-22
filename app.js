const packages = [...document.querySelectorAll(".package")];
const summary = document.getElementById("selectedSummary");
const message = document.getElementById("message");
const buyButton = document.getElementById("buyButton");
let selected = { diamonds: 100, price: 130 };

document.getElementById("year").textContent = new Date().getFullYear();

function showMessage(text, type = "info") {
  message.textContent = text;
  message.className = `message show ${type}`;
}
packages.forEach(button => button.addEventListener("click", () => {
  packages.forEach(item => item.classList.remove("selected"));
  button.classList.add("selected");
  selected = { diamonds: Number(button.dataset.package), price: Number(button.dataset.price) };
  summary.textContent = `${selected.diamonds} Diamonds · Rs. ${selected.price.toLocaleString("en-IN")}`;
  message.className = "message";
}));

buyButton.addEventListener("click", async () => {
  const playerId = document.getElementById("playerId").value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  if (!/^[0-9]{5,20}$/.test(playerId)) {
    showMessage("कृपया सही Player UID (५–२० अंक) राख्नुहोस्।", "error");
    return;
  }
  buyButton.disabled = true;
  buyButton.textContent = "Creating secure order…";
  try {
    const response = await fetch("/.netlify/functions/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId, diamonds: selected.diamonds, paymentMethod })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Order बनाउन सकिएन।");
    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
      return;
    }
    showMessage(data.message || "Order endpoint तयार छ, तर live payment gateway credentials सेटअप गरिएको छैन।", "info");
  } catch (error) {
    showMessage(error.message || "Network error। फेरि प्रयास गर्नुहोस्।", "error");
  } finally {
    buyButton.disabled = false;
    buyButton.innerHTML = 'Continue to payment <span>→</span>';
  }
});
