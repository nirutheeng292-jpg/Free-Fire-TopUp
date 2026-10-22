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

buyButton.addEventListener("click", () => {
  const playerId = document.getElementById("playerId").value.trim();
  const paymentMethod = document.querySelector(
    'input[name="payment"]:checked'
  )?.value || "";

  if (!/^[0-9]{5,20}$/.test(playerId)) {
    showMessage("कृपया सही Player UID राख्नुहोस्।", "error");
    return;
  }

  if (!paymentMethod.toLowerCase().includes("esewa")) {
    showMessage("QR payment अहिले eSewa का लागि मात्र उपलब्ध छ।", "error");
    return;
  }

  document.getElementById("esewaQrModal").style.display = "flex";
});
});
