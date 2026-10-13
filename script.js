(() => {
  const search = document.querySelector('#search');
  const cards = [...document.querySelectorAll('.profile-card')];
  const count = document.querySelector('#count');
  const channelsCount = document.querySelector('#channels-count');
  const profilesCount = document.querySelector('#profiles-count');
  const channelsSection = document.querySelector('#channels-section');
  const profilesSection = document.querySelector('#profiles-section');
  const empty = document.querySelector('#empty');

  const normalize = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  function filterCards() {
    const query = normalize(search.value);
    let visibleChannels = 0;
    let visibleProfiles = 0;

    cards.forEach((card) => {
      const matches = normalize(card.innerText + ' ' + card.getAttribute('aria-label')).includes(query);
      card.hidden = !matches;
      if (matches) {
        if (card.closest('#channels')) visibleChannels++;
        else visibleProfiles++;
      }
    });

    channelsSection.hidden = visibleChannels === 0;
    profilesSection.hidden = visibleProfiles === 0;
    count.textContent = `${visibleChannels + visibleProfiles} ${visibleChannels + visibleProfiles === 1 ? 'resultado' : 'resultados'}`;
    channelsCount.textContent = `${visibleChannels} ${visibleChannels === 1 ? 'canal' : 'canais'}`;
    profilesCount.textContent = `${visibleProfiles} ${visibleProfiles === 1 ? 'perfil' : 'perfis'}`;
    empty.style.display = visibleChannels + visibleProfiles === 0 ? 'block' : 'none';
  }

  search.addEventListener('input', filterCards);
  filterCards();
})();
