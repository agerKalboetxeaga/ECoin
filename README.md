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
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img max-width="50%" src="Web/ExpressCoin/ExpressCoin/src/assets/images/express_coin.png" alt="Logo">
  </a>

  <h3 align="center">EXPRESS COIN</h3>

  <p align="center">
    Functional Cryptocurrencies Web Page <br> Created on <b>ANGULAR 12</b> (Front-end) and <b>PYTHON 3</b> (Back-end)
    <br />
    <a href="https://github.com/agerKalboetxeaga/ECoin"><strong>Project main Repository »</strong></a>
    <br />
    <br />
    <a href="https://github.com/agerKalboetxeaga/ECoin/tree/main/Python">Python</a>
    ·
    <a href="https://github.com/agerKalboetxeaga/ECoin/tree/main/Web">Angular</a>
    ·
    <a href="https://github.com/agerKalboetxeaga/ERRONKA_3/tree/main/java">Executables</a>
     ·
    <a href="https://github.com/agerKalboetxeaga/ECoin/tree/main/exportarDB">Database DATA</a>
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


<p align="center">This is a working web page oriented to Cryptocurrency world.</p><br>
 
```
"Cryptos have become very popular in the last years and lot of businesmen wants to jump into the train."
```
This project will allow you to have your own Crypto Web Page.

This project also includes a [tool](https://github.com/agerKalboetxeaga/ECoin/blob/main/Executables/crypto_exe.exe) that gets all different cryptocurrency names stored in the DB, and searches its real values on the internet, finally it saves those records in the DB.

<!-- Use the `BLANK_README.md` to get started. -->

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

In this section we will say what programming languages are being used on this project:

* [Angular 12](https://angular.io/)
* [Javascript](https://www.javascript.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Html](https://www.w3schools.com/html/)
* [Bash](https://bioinf.comav.upv.es/courses/unix/scripts_bash.html)
* [Bootstrap](https://getbootstrap.com)
* [Python 3](https://www.python.org/downloads/)

<p align="right">(<a href="#top">back to top</a>)</p>



### Prerequisites

To begin with you must have installed our DB => 
 * [Mongo DB](https://www.mongodb.com/)
 
Then, we need to install:
* [Node.Js](https://nodejs.org/es/)

<!-- GETTING STARTED -->
## Getting Started
In order to get working our Angular project we will need to install the Angular/cli.
To do this open the command prompt (cmd) and type:
   Check Node Packet Manager version:
   ```
   npm -v
   ```
   if node is installed correctly we can install the angular client

   ```
   npm install -g @angular/cli
   ```
  Finally we can check installed angular version
  
   ```
   ng version
   ```
  
### Installation

_Clone GitHub repository first..._


1. Update Database : If is the first time, you can open _"[exportarDB](https://github.com/agerKalboetxeaga/ECoin/tree/main/exportarDB)"_ folder and execute _"importar.bat"_
      This will update your database adding new items 
  
2. Run the Rest API : if you are not interested in development you can start the service without having python installed.
      To do that you only have to go to _"[Executables](https://github.com/agerKalboetxeaga/ECoin/tree/main/Executables)"_ folder and run 
      ```
      RestAPI.exe
      ```

3. Next and finally, we need to start our Angular Web Page:<br>
    - *Go to project´s [root](https://github.com/agerKalboetxeaga/ECoin/tree/main/Web/ExpressCoin/ExpressCoin) folder and then, to launcher folder*<br>
    - *Run _launch.bat_*
  
 4. Enjoy! : You have successfuly deployed the project in your local device!<br><br>
  #### ! If there is some module error or the launcher doesnt work you will ned to do the following ¡

  1. Go back to the root folder and delete "node_modules" folder.
  2. Open the cmd on the same folder and type : 
  ```
  npm install
  ```
  This will install all required node.js modules.
  
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Web Usage
On this Web Page you can:
* Register/Log-in
* See listed all NFT/Cryptocurrencies with its Real-time values 
* Add new Cryptocurrencies
* Create new NFTs
* Buy Cryptocurrencies
* Use bought Cryptocurrencies to buy NFTs


### The "[crypto_exe.exe](https://github.com/agerKalboetxeaga/ECoin/blob/main/Python/Cryptos_Mongo_Auto.py)" Tool:
  This tool created by us will update database´s criptocurrency value data based in real World Data and its exported to exe in 
   _"[Executables](https://github.com/agerKalboetxeaga/ECoin/tree/main/Executables)"_ folder
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Add Role permissions
- [ ] Login fail attemp management
- [ ] Create non-existing Cryptocurrencies

See the [open issues](https://github.com/agerKalboetxeaga/ECoin/issues) for a full list of proposed features (and known issues).

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

Ager Kalboetxeaga - [kalboetxeaga.ager@uni.eus](https://mail.google.com/)<br>
Markel Salgado - [salgado.markel@uni.eus](https://mail.google.com/)

Project Link: [https://github.com/agerKalboetxeaga/ECoin](https://github.com/agerKalboetxeaga/ECoin)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Those are few website´s we used for learning:

* [Most of my knoweldge](https://youtube.com/)
* [Other useful tutorials](https://www.mastermind.ac/)
* [More media](https://elearning20.hezkuntza.net/012053/enrol/index.php?id=31)
* [For resolving errors](https://stackoverflow.com/)

Where we get the Cryptocurrencies data from?:
* [investing.com](https://es.investing.com)

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
