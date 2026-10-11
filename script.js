const search = document.querySelector("#search");
const cards = [...document.querySelectorAll(".profile-card")];
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");

function filterProfiles() {
  const term = search.value.trim().toLocaleLowerCase("pt-BR").replace(/^@/, "");
  let visible = 0;

  cards.forEach((card) => {
    const username = card
      .querySelector(".handle")
      .textContent.trim()
      .toLocaleLowerCase("pt-BR")
      .replace(/^@/, "");
    const matches = username.includes(term);
    card.hidden = !matches;
    if (matches) visible += 1;
  });

  count.textContent = `${visible} ${visible === 1 ? "perfil" : "perfis"}`;
  empty.style.display = visible === 0 ? "block" : "none";
}

search.addEventListener("input", filterProfiles);
search.addEventListener("search", filterProfiles);
filterProfiles();
