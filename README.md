<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="images/logo.png" alt="Logo">
  </a>

  <h3 align="center">GOD RUN PROJECT</h3>

  <p align="center">
    Androidentzako joko bat, Odoo modulo berri bat eta REST API Zerbitzua
    <br />
    <a href="https://github.com/agerKalboetxeaga/ERRONKA_3/tree/main/erronka_DOCS"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/agerKalboetxeaga/ERRONKA_3/tree/main/c%23">C#</a>
    ·
    <a href="https://github.com/agerKalboetxeaga/ERRONKA_3/tree/main/android">Android</a>
    ·
    <a href="https://github.com/agerKalboetxeaga/ERRONKA_3/tree/main/java">Java</a>
     ·
    <a href="https://github.com/agerKalboetxeaga/ERRONKA_3/tree/main/erronka_DOCS/odoo/partidak">Odoo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](images/juegoscreen.jpg)

Gure proiektuak oso konpletua da eta erabil erraza: [[Java classDiagram]](https://github.com/agerKalboetxeaga/ERRONKA_3/blob/main/java/GodRun_Java_Diagram.svg)

Horregatik:
* Joko ona (aleatorioki sortzen da partida bakoitza Rogue-like jokoen antzera pixel art itxurarekin)
* Konexio baldintza baxuak jokatzeko: nahiz eta aeroportuko wifia izan jokoa ondo funtzionatuko du
* Zerbitzari guztia konpaktatuta aplikazio batean :smile:

Noski, nahiz eta erraza izan hobe da gidatxoa jarraitzea:

<!-- Use the `BLANK_README.md` to get started. -->

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

Sekzio honetan proiektuarentzako erabili ditugun lengoaia desberdinak adierazten dira:

* [C#](https://docs.microsoft.com/es-es/dotnet/csharp/)
* [Javascript](https://www.javascript.com/)
* [Java](https://www.java.com/es/)
* [Html](https://www.w3schools.com/html/)
* [Bash](https://bioinf.comav.upv.es/courses/unix/scripts_bash.html)
* [Bootstrap](https://getbootstrap.com)

<p align="right">(<a href="#top">back to top</a>)</p>



### Prerequisites
Hasteko bi datubase eta zerbitzu bat izan behar dituzu:
 * [Odoo 14](https://www.odoo.com/es_ES/page/download) Zerbitzaria [PostgreSQL](https://www.postgresql.org/) abiarazita izan behar duzu
    (Gomendagarria da datu baseak DisunityOfPepe izena izatea). Ondoren employees modulua instalatu behar da.
  

* [MongoDB](https://www.mongodb.com/) Datubasea.
* [Java jdk 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
* [Java IDE bat](https://www.eclipse.org/downloads/)

<!-- GETTING STARTED -->
## Getting Started
Programa hasi baino lehenago zihurtatu Odoo eta MongoDB zerbitzuak abiarazita daudela. Ondoren kanpoko konexioak ahalbideratzeko joan zaitez:
   ```sh
  C:\Program Files\MongoDB\Server\5.0\bin\mongod.cfg
   ```
   eta bertan "bindIp" eremuan 0.0.0.0 ip-a ezarri.
  
Ostean postgreseko konfigurazioa aldatu:

   ```sh
  C:\Program Files\Odoo\PostgreSQL\data\pg_hba.conf
   ```
  fitxategia ireki eta ostean zuk nahi duzun ip-a gehitu:
  
   ```sh
   TYPE  DATABASE        USER            ADDRESS             METHOD
   host    all           all             <IP>/32              md5
   ```
  
### Installation

_Github errepositorioa klonatu hasteko..._

* Odoo modulua:
1. _erronka_DOCS/odoo/_ karpetako partidak kopiatu eta odoo instalatuta duzun karpetako moduluan itxatxi:
  ```sh
   C:\Program Files\Odoo\server\odoo\addons  (Windows 7 +)
   ```
2. Joan odoo serbitzarira web bidez administrari bezala eta ajusteetara joan. "General settings" en azpian "Developer Tools" atalean
    Developer mode -a aktibatu.

3. Orain aplikazioen kudeaketa horrira joan eta goiko aukeretatik "_Update Apps List_" aukera eman. 
  
4. Azkenik aplikazioetan partidak modulua bilatu eta instalatu. _Modulua instalatuta dago_
 
* Android jokoa:
1. Githubeko errepositorioko _joko.apk_ deskargatu mobilean eta instalatuta izango zenukete.
* Zerbitzaria:
1. Java paketean dagoen Main Server proiektua ireki zuk nahi duzun IDE arekin.
2. Baliteke Datubaseentzako konexioak aldatu behar izana: 
      Postgreserako (src/main/resources/) application.properties fitxategia (_db.url_ eremua)
      MongoDB-rako proiektuko karpetan, _mongolize.sh scriptak_ du mongo db ko konexioko ip a
4. Ondoren java proiektua exekutatu
5. Orain zerbitzaria martxan dago partidako fitxategiak interzeptatzen eta datu baseetara igotzen. Gainera 8080 portuko zerbitzua abiarazten du.
6. Azkenik C# proiektua exekutatu eta dena martxan izango duzu. Orain bakarrik jolastea geratzen da.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Jokoaren Tutoriala
Eskuineko geziak nora tiro egin nahi duzun aukeratzeko da. 
Ezkerreko geziak norabidea ezartzen du.
Sala bereziak daude (Horiak) eta hauek item batzuk ditu. Item bakoitzak abantail/desabantail desberdinak emango digute gameplay-a hobetzeko
Sala gorriak daude (Jefea) Behin jefea garaituta (negar egingo duzu 🥲) jokoa amaituko da.

### Zerbitzaria/Web Orria
Lehen esan bezala zabaldu visual eta eclipse. 
Proiektuak exekutatu (eclipseko proiektua lehenengo).
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Final Boss
- [x] Add back to top links
- [ ] Implement connections in the game
- [ ] Finish Web-Page

See the [open issues](https://github.com/agerKalboetxeaga/ERRONKA_3/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

dona dinerito anda que esto a costau
* _[PayPal](https://www.dafk.net/what/)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Ager Kalboetxeaga - [kalboetxeaga.ager@uni.eus](https://mail.google.com/)

Project Link: [https://github.com/agerKalboetxeaga/ERRONKA_3](https://github.com/agerKalboetxeaga/ERRONKA_3)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Some tutorials we used](https://openwebinars.net/)
* [Learning bash](https://www.mastermind.ac/)
* [Other useful tutorials](https://www.mastermind.ac/)
* [More media](https://elearning20.hezkuntza.net/012053/enrol/index.php?id=31)
* [For resolving errors](https://stackoverflow.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/agerKalboetxeaga/ECoin?style=for-the-badge
[contributors-url]: https://github.com/agerKalboetxeaga/ECoin/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/agerKalboetxeaga/ECoin?style=for-the-badge
[forks-url]:https://github.com/agerKalboetxeaga/ECoin/network/members
[stars-shield]: https://img.shields.io/github/stars/agerKalboetxeaga/ECoin?style=for-the-badge
[stars-url]:https://github.com/agerKalboetxeaga/ECoin/stargazers
[issues-shield]: https://img.shields.io/github/issues/agerKalboetxeaga/ECoin?style=for-the-badge
[issues-url]:https://github.com/agerKalboetxeaga/ECoin/issues
[license-shield]: https://img.shields.io/github/license/agerKalboetxeaga/ECoin?style=for-the-badge
[license-url]: https://github.com/agerKalboetxeaga/ECoin/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]:https://github.com/agerKalboetxeaga/ECoin
[product-screenshot]: images/juegoscreen.jpg
