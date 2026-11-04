const productCards = document.querySelectorAll('.product-card');
const catalogCards = document.querySelectorAll('.catalog-card');
const filterButtons = document.querySelectorAll('.filter-btn');

const showDemoMessage = (message) => {
  const notice = document.createElement('div');
  notice.className = 'demo-toast';
  notice.setAttribute('role', 'status');
  notice.textContent = message;
  document.body.appendChild(notice);
  window.setTimeout(() => notice.remove(), 3200);
};

document.querySelectorAll('.js-demo-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showDemoMessage('Dados validados. A publicação real será ativada quando o backend estiver conectado.');
  });
});

document.querySelectorAll('.js-save-settings').forEach((button) => {
  button.addEventListener('click', () => showDemoMessage('Configurações validadas e prontas para persistência no backend.'));
});

document.querySelectorAll('.js-toggle-listing').forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    const status = row?.querySelector('.status');
    if (!row || !status) return;
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
    const row = button.closest('tr');
    if (!row) return;
    row.remove();
    showDemoMessage('Anúncio removido da lista de demonstração.');
  });
});

const applyListingFilters = () => {
  const activeFilter = document.querySelector('[data-listing-filter].active')?.dataset.listingFilter || 'all';
  const query = document.querySelector('.seller-search')?.value.trim().toLowerCase() || '';
  document.querySelectorAll('[data-listing-status]').forEach((row) => {
    const matchesStatus = activeFilter === 'all' || row.dataset.listingStatus === activeFilter;
    const matchesQuery = !query || row.textContent.toLowerCase().includes(query);
    row.hidden = !matchesStatus || !matchesQuery;
  });
};

document.querySelectorAll('[data-listing-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-listing-filter]').forEach((item) => item.classList.toggle('active', item === button));
    applyListingFilters();
  });
});

document.querySelector('.seller-search')?.addEventListener('input', applyListingFilters);

document.querySelector('#listing-price')?.addEventListener('input', (event) => {
  const gross = Number(event.target.value || 0);
  const commission = gross * 0.1;
  const net = Math.max(0, gross - commission);
  const commissionTarget = document.querySelector('[data-commission-value]');
  const netTarget = document.querySelector('[data-net-value]');
  if (commissionTarget) commissionTarget.textContent = `R$ ${commission.toFixed(2).replace('.', ',')}`;
  if (netTarget) netTarget.textContent = `R$ ${net.toFixed(2).replace('.', ',')}`;
});

document.querySelector('.upload-box input[type="file"]')?.addEventListener('change', (event) => {
  const files = Array.from(event.target.files || []);
  const label = document.querySelector('[data-upload-label]');
  if (label && files.length) label.textContent = `${files.length} imagem(ns) selecionada(s)`;
});

productCards.forEach((card) => {
  card.querySelector('.btn')?.addEventListener('click', (event) => {
    event.currentTarget.textContent = 'Adicionado';
    event.currentTarget.disabled = true;
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    catalogCards.forEach((card) => { card.style.display = selected === 'all' || card.dataset.category === selected ? 'block' : 'none'; });
  });
});
