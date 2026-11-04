const productCards = document.querySelectorAll('.product-card');

productCards.forEach((card) => {
  const button = card.querySelector('.btn');

  button?.addEventListener('click', () => {
    button.textContent = 'Adicionado';
    button.disabled = true;
    button.style.opacity = '0.9';
  });
});
