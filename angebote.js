fetch("angebote.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("angebote");
    data.entries.forEach((angebot) => {
      const el = document.createElement("div");
      el.innerHTML = `
        <div class="angebot">
          <h3>${angebot.titel}</h3>
          <img src="${angebot.bild}" alt="${angebot.titel}" />
          <p>${angebot.details}</p>
          <p><strong>Preis:</strong> ${angebot.preis}</p>
          ${angebot.mehr ? `<a href="${angebot.mehr}">Mehr erfahren</a>` : ""}
        </div>
      `;
      container.appendChild(el);
    });
  });

