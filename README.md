<div id="top"></div>

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Prenotazione Tamponi ULSS9</h3>

  <p align="center">
    Software automatico che permette la prenotazione del tampone in un qualsiasi punto tamponi della regione Veneto
    <br />
    <a href="https://github.com/cavazzatommaso/prenotazioneTamponeUlss9"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/cavazzatommaso/prenotazioneTamponeUlss9/issues">Report Bug</a>
    ·
    <a href="https://github.com/cavazzatommaso/prenotazioneTamponeUlss9/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <ul>
        <li><a href="#built-with">Progettato con</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Pre-requisiti</a></li>
        <li><a href="#installation">Installazione</a></li>
      </ul>
    </li>
    <li><a href="#usage">Utilizzo</a></li>
    <li><a href="#contact">Contatti</a></li>
  </ol>
</details>





### Progetto con

* [Node.js](https://nextjs.org/)
* [Puppeteer](https://reactjs.org/)
* [Player.js](https://vuejs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Pre-requisiti

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installazione

1. Clona la repo
   ```sh
   git clone https://github.com/cavazzatommaso/prenotazioneTamponeUlss9.git
   ```
2. Installa i pacchetti npm
   ```sh
   npm install
   ```
3. Rinomina il file `config.example.json` in `config.json` e sostituisci i valori al suo interno con quelli richiesti
   ```js
   {
        "luogo":"Legnago",
        "dataPrenotazione":"01-15",
        "fasciaOrariaInizio":6,
        "fasciaOrariaFine":20,
        "nome":"Mario",
        "cognome":"Rossi",
        "email":"mariorossi@gmail.com",
        "CF":"RSSMRA30A01H501I",
        "telefono":"1234567890",
        "autoConfirm":false
    }
   ```
   Fascia oraria Inizio indica l'ora del periodo in qui si vuole fare il tampone
   Nel esempio il tampone verra prenotato se disponibile tra le 06:00 alle 20:59.
   Cambia a piacere questi parametri.

   Il campo autoConfirm se messo a `true` una volta inserito i dati nel form il bot non chiederà nulla e verra immediatamente premuto il tasto conferma prenotazione. Nel caso sia `false` il bot non premerà il pulsante ma emetterà solo un suono per allertare l'utente. Controlla quindi i dati inseriti e premi conferma tampone

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Utilizzo

Una volta sostituito i valori nel file config.json avvia il bot con `npm run start`. A console verra stampato un riepilogo dei dati. Controlla i dati e lascia andare il bot.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contatti

Cavazza Tommaso - [@github](https://github.com/cavazzatommaso) - cavazzatommaso00@gmail.com

Project Link: [https://github.com/cavazzatommaso/prenotazioneTamponeUlss9](https://github.com/cavazzatommaso/prenotazioneTamponeUlss9)

<p align="right">(<a href="#top">back to top</a>)</p>
