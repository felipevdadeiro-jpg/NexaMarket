const productCards = document.querySelectorAll('.product-card');
const catalogCards = document.querySelectorAll('.catalog-card');
const filterButtons = document.querySelectorAll('.filter-btn');

productCards.forEach((card) => {
  const button = card.querySelector('.btn');

  button?.addEventListener('click', () => {
    button.textContent = 'Adicionado';
    button.disabled = true;
    button.style.opacity = '0.9';
  });
});

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      catalogCards.forEach((card) => {
        const shouldShow = selected === 'all' || card.dataset.category === selected;
        card.style.display = shouldShow ? 'block' : 'none';
      });
    });
  });
}
