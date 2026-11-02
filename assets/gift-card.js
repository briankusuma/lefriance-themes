document.querySelectorAll("[data-gift-card-qr]").forEach((node) => {
  if (!node.dataset.identifier || typeof window.QRCode !== "function") return;
  new window.QRCode(node, {
    text: node.dataset.identifier,
    width: 160,
    height: 160,
  });
  node.querySelectorAll("img").forEach((image) => {
    image.alt = "";
  });
});
