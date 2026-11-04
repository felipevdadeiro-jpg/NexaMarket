const productCards = document.querySelectorAll('.product-card');
const catalogCards = document.querySelectorAll('.catalog-card');
const filterButtons = document.querySelectorAll('.filter-btn');

const showDemoMessage = (message) => {
  const notice = document.createElement('div');
  notice.className = 'demo-toast';
  notice.textContent = message;
  document.body.appendChild(notice);
  window.setTimeout(() => notice.remove(), 3200);
};

document.querySelectorAll('.js-demo-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showDemoMessage('Anúncio validado no protótipo. Conecte o backend para publicar de verdade.');
  });
});

document.querySelectorAll('.js-save-settings').forEach((button) => {
  button.addEventListener('click', () => showDemoMessage('Alterações prontas para serem persistidas no backend.'));
});

document.querySelectorAll('.js-toggle-listing').forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    const status = row.querySelector('.status');
    const paused = status.classList.contains('pending');
    status.className = paused ? 'status paid' : 'status pending';
    status.textContent = paused ? 'Ativo' : 'Pausado';
    button.textContent = paused ? 'Pausar' : 'Reativar';
    row.dataset.listingStatus = paused ? 'active' : 'paused';
    showDemoMessage(paused ? 'Anúncio reativado no protótipo.' : 'Anúncio pausado no protótipo.');
  });
});

document.querySelectorAll('.js-delete-listing').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('tr').remove();
    showDemoMessage('Anúncio removido da lista de demonstração.');
  });
});

document.querySelectorAll('[data-listing-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-listing-filter]').forEach((item) => item.classList.toggle('active', item === button));
    const selected = button.dataset.listingFilter;
    document.querySelectorAll('[data-listing-status]').forEach((row) => {
      row.hidden = selected !== 'all' && row.dataset.listingStatus !== selected;
    });
  });
});

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
