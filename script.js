(() => {
  const search = document.querySelector('#search');
  const cards = [...document.querySelectorAll('.profile-card[data-platform]')];
  const count = document.querySelector('#count');
  const empty = document.querySelector('#empty');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const sections = [...document.querySelectorAll('.directory-section')];
  const dividers = [...document.querySelectorAll('.section-divider')];
  let activeFilter = 'all';

  const normalize = (value = '') => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  function filterCards() {
    const query = normalize(search.value);
    let visible = 0;
    const sectionCounts = new Map();

    cards.forEach((card) => {
      const platform = card.dataset.platform;
      const searchable = normalize(`${card.innerText} ${card.getAttribute('aria-label') || ''} ${card.href || ''}`);
      const matches = (activeFilter === 'all' || platform === activeFilter) && searchable.includes(query);
      card.hidden = !matches;
      if (matches) {
        visible++;
        const section = card.closest('.directory-section');
        if (section) sectionCounts.set(section.id, (sectionCounts.get(section.id) || 0) + 1);
      }
    });

    sections.forEach((section) => {
      const n = sectionCounts.get(section.id) || 0;
      section.hidden = n === 0;
      const counter = section.querySelector('.section-count');
      if (!counter) return;
      const noun = section.id === 'channels-section' ? (n === 1 ? 'canal' : 'canais')
        : section.id === 'youtube-section' ? (n === 1 ? 'canal' : 'canais')
        : section.id === 'reddit-section' ? (n === 1 ? 'comunidade' : 'comunidades')
        : (n === 1 ? 'perfil' : 'perfis');
      counter.textContent = `${n} ${noun}`;
    });

    dividers.forEach((divider) => {
      const previousSection = divider.previousElementSibling;
      const nextSection = divider.nextElementSibling;
      divider.hidden = !previousSection?.classList.contains('directory-section')
        || !nextSection?.classList.contains('directory-section')
        || previousSection.hidden
        || nextSection.hidden;
    });

    count.textContent = `${visible} ${visible === 1 ? 'resultado' : 'resultados'}`;
    empty.style.display = visible === 0 ? 'block' : 'none';
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      filterCards();
    });
  });

  search.addEventListener('input', filterCards);
  filterCards();
})();
