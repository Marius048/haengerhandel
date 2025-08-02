fetch("angebote.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("angebote");
    data.entries.forEach((angebot) => {
      const el = document.createElement("div");
      el.className = "angebot-card";
      el.innerHTML = `
        <img src="${angebot.bild}" alt="${angebot.titel}" />
        <h3>${angebot.titel}</h3>
        <p>${angebot.details.replace(/\n/g, "<br>")}</p>
        <p class="preis">${angebot.preis}</p>
        <div class="btn-group">
          <a href="kontakt.html" class="btn">Jetzt anfragen</a>
          ${
            angebot.mehr
              ? `<a href="${angebot.mehr}" class="btn secondary-btn">Mehr Infos</a>`
              : ""
          }
        </div>
      `;
      container.appendChild(el);
    });
  });
