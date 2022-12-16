// Funzione per generare un numero random
function ageRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Main
const container = document.querySelector(".container");
// Fasce
const bands = document.querySelector(".bands");
// Finestra in cui appaiono le card
const modalWindow = document.querySelector(".modalWindow");
// Dettaglio con tutte le proprietà dell'array
const userModal = document.querySelector(".userModal");
// Anno in corso
const currentYear = new Date().getFullYear();
// Chiamo l'API che restituisce dieci oggetti (utenti) col metodo fetch
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) =>
    // Utilizzo il metodo map per generare una nuova proprietà 'image' per ogni oggetto, con foto random
    data.map((item) => ({
      ...item,
      image: `https://xsgames.co/randomusers/avatar.php?g=pixel`,
    }))
  )
  .then((data) =>
    // Utilizzo il metodo map per generare una nuova proprietà 'birthDate' per ogni oggetto, con gg/mm/aaaa random
    data.map((item) => ({
      ...item,
      birthDate: `${ageRandom(1, 28)}/${ageRandom(1, 12)}/${ageRandom(
        1940,
        2004
      )}`,
    }))
  )
  .then((data) =>
    // Utilizzo il metodo map per generare una nuova proprietà 'age' per ogni oggetto, con un numero random compreso tra 18 e 82
    data.map((item) => ({
      ...item,
      age: currentYear - parseInt(item.birthDate.slice(-4)),
    }))
  )
  .then((data) => {
    bands.addEventListener("click", function (event) {
      // Utilizzo il metodo filter per filtrare gli utenti di età compresa tra 18 e 35 anni
      const firstBand = data.filter((item) => item.age >= 18 && item.age <= 35);
      // Utilizzo il metodo filter per filtrare gli utenti di età compresa tra 36 e 64 anni
      const secondBand = data.filter((item) => item.age >= 36 && item.age <= 64);
      // Utilizzo il metodo filter per filtrare gli utenti di età superiore ai 64 anni
      const thirdBand = data.filter((item) => item.age > 64);
      // Icona per chiudere la finestra in cui appaiono le card
      const modalCloser = `<span class="closeModal"><i class="fas fa-times-circle"></i></span>`;
      // Proprietà 'display: block;' della finestra in cui appaiono le card
      const modalOpener = (modalWindow.style.display = "block");
      // Icona per tornare indietro alla finestra in cui appaiono le card
      const userModalCloser = `<span class="userModalCloser"><i class="fas fa-arrow-alt-circle-left"></i></span>`;
      // Messaggio nel caso in cui nessun utente appartenga a una determinata fascia d'età
      const userNotFound = `${modalCloser} <h3>Nessun utente rientra in questa fascia d'età</h3>`;

      if (event.target.closest(".firstBand")) {
        modalOpener;
        modalWindow.innerHTML = `
        ${modalCloser}
        <h3>Utenti d'età compresa tra i 18 e i 35 anni</h3>
        `;
        // Se l'utente ha un'età compresa tra i 18 e i 35 anni mostro i seguenti dati
        if (firstBand.length > 0) {
          firstBand.map((item) => {
            modalWindow.innerHTML += `
            <div class="userCard" id="${item.id}"><br>
            <img src="${item.image}" alt="${item.name}">
            <ul>
            <li>Nome: ${item.name}</li><br>
            <li>Data di nascita: ${item.birthDate}</li><br>
            <li>Età: ${item.age}</li><br>
            <li>Tel.: ${item.phone}</li><br>
            </ul>
            </div>
            `;
          });
        } else {
          // altrimenti mostro un messaggio che indica che nessun utente rientra in questa fascia d'età
          modalWindow.innerHTML = userNotFound;
        };
      };

      if (event.target.closest(".secondBand")) {
        modalOpener;
        modalWindow.innerHTML = `
        ${modalCloser}
        <h3>Utenti d'età compresa tra i 36 e i 64 anni</h3>
        `;
        // Se l'utente ha un'età compresa tra i 36 e i 64 anni mostro i seguenti dati
        if (secondBand.length > 0) {
          secondBand.map((item) => {
            modalWindow.innerHTML += `
            <div class="userCard" id="${item.id}"><br>
            <img src="${item.image}" alt="${item.name}">
            <ul>
            <li>Nome: ${item.name}</li><br>
            <li>Data di nascita: ${item.birthDate}</li><br>
            <li>Età: ${item.age}</li><br>
            <li>Tel.: ${item.phone}</li><br>
            </ul>
            </div>
            `;
          });
        } else {
          // altrimenti mostro un messaggio che indica che nessun utente rientra in questa fascia d'età
          modalWindow.innerHTML = userNotFound;
        };
      };

      if (event.target.closest(".thirdBand")) {
        modalOpener;
        modalWindow.innerHTML = `
        ${modalCloser}
        <h3>Utenti d'età superiore ai 64 anni</h3>
        `;
        // Se l'utente ha un'età superiore ai 64 anni mostro i seguenti dati
        if (thirdBand.length > 0) {
          thirdBand.map((item) => {
            modalWindow.innerHTML += `
            <div class="userCard" id="${item.id}"><br>
            <img src="${item.image}" alt="${item.name}">
            <ul>
            <li>Nome: ${item.name}</li><br>
            <li>Data di nascita: ${item.birthDate}</li><br>
            <li>Età: ${item.age}</li><br>
            <li>Tel.: ${item.phone}</li><br>
            </ul>
            </div>
            `;
          });
        } else {
          // altrimenti mostro un messaggio che indica che nessun utente rientra in questa fascia d'età
          modalWindow.innerHTML = userNotFound;
        };
      };
      // Se la card viene selezionata mostro tutti i dati contenuti nell'array sotto forma di elenco
      if (event.target.closest(".userCard")) {
        userModal.style.display = "block";
        const userID = event.target.id;
        const userInfo = JSON.stringify(data[userID - 1])
          .replaceAll(/({|})/g, " ")
          .replaceAll(/(?:\r\n|\r|\n|")/g, " ")
          .replaceAll(",", `<br>`);

        userModal.innerHTML = `
        ${userModalCloser}<br>
        ${userInfo}
        `;
      };
      // Proprietà 'display: none;' se si seleziona l'icona 'x' per chiudere la finestra con le card, in modo che non venga più visualizzata
      if (event.target.closest(".closeModal")) {
        modalWindow.style.display = "none";
      };
      // Proprietà 'display: none;' se si seleziona l'icona 'arrow' per tornare indietro, la finestra coi dettagli dell'oggetto (utente) non verrà più visualizzata
      if (event.target.closest(".userModalCloser")) {
        userModal.style.display = "none";
      };
    });
  })
  .catch((error) => {
    container.innerHTML = `
    <div class="error">
    <h2>Errore 404</h2><br>
    <h3>Ops! La pagina non è stata trovata :( </h3>
    </div>
    `;
    console.log(error);
  });
