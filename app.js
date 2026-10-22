)];

  document.getElementById("esewaQrModal").style.display = "flex";
});
});
const buyButton = document.getElementById("buyButton");

if (buyButton) {
  buyButton.addEventListener("click", function (event) {
    event.preventDefault();

    const uidInput =
      document.getElementById("playerId") ||
      document.getElementById("playerUID") ||
      document.getElementById("uid");

    const uid = uidInput ? uidInput.value.trim() : "";

    if (!uid) {
      alert("Please enter your Free Fire Player UID.");
      if (uidInput) uidInput.focus();
      return;
    }

    const qrModal = document.getElementById("esewaQrModal");

    if (!qrModal) {
      alert("QR popup not found. Please check index.html.");
      return;
    }

    qrModal.style.display = "flex
